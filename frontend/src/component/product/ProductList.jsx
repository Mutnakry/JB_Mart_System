
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Pagination from '../pagination/Pagination';
import { FaClipboardList, FaFileCsv, FaFileExcel, FaPencilAlt } from "react-icons/fa";
import { MdDelete, MdClose } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import { formatDateToKhmer } from '../ForMartDateToKHmer';


const Dashboard = () => {
  const [ProNames, setProNames] = useState('');
  const [category_ID, setCategory_ID] = useState(null);
  const [brand_ID, setBrand_ID] = useState(null);
  const [unit_ID, setUnit_ID] = useState('');
  const [note_QTY, setNote_Qty] = useState(1);
  const [product_type, setProduct_type] = useState('មួយ');
  const [include_Tax, setInclude_Tax] = useState(null);
  const [type_Tax, setType_Tax] = useState('ផ្ដាច់មុខ');
  const [description, setDescription] = useState(null);
  const [expiry, setExpiry] = useState(null);

  const [existingImage, setExistingImage] = useState(null);
  const [file, setFile] = useState(null);
  const [cost_Price, setCost_Price] = useState('');
  const [exclude_Tax, setExclude_Tax] = useState('');
  const [profit, setProfit] = useState('');
  const [error, setError] = useState('');
  const today = new Date().toISOString().split('T')[0];

  const [userLoginNames, setUserLoginNames] = useState('');
  const [categorys, setCategorys] = useState([]);
  const [Brands, setBrands] = useState([]);
  const [Units, setUnits] = useState([]);

  //// paginate and search data
  const [product, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);


  useEffect(() => {
    setUserLoginNames(localStorage.getItem('user_names') || '');
    getAllProduct();
    getALLCategorys();
    getALLBrands();
    getALLUnits();
  }, [page, limit, searchQuery]);

  //// get all product add paginate and search
  const getAllProduct = async () => {
    setLoading(true);  // Set loading state to true
    try {
      const response = await axios.get('http://localhost:6700/api/product', {
        params: {
          page,
          limit,
          search_query: searchQuery
        }
      });
      setProducts(response.data.product);
      setTotalPages(response.data.totalPages);
      setError(null);  // Reset error state if request is successful
    } catch (error) {
      setError('Error fetching api/product data');  // Set error state if request fails
    } finally {
      setLoading(false);  // Set loading state to false
    }
  };

  //// get all category
  const getALLCategorys = async () => {
    try {
      const response = await axios.get('http://localhost:6700/categories');
      setCategorys(response.data.categories);
      console.log(response.data)
    } catch (error) {
      setError('Error fetching categories data');
    }
  };
  //// get all brands
  const getALLBrands = async () => {
    try {
      const response = await axios.get('http://localhost:6700/api/brands');
      setBrands(response.data.brands);
      console.log(response.data)
    } catch (error) {
      setError('Error fetching categories data');
    }
  };
  //// get all unit
  const getALLUnits = async () => {
    try {
      const response = await axios.get('http://localhost:6700/api/unit');
      setUnits(response.data.unit);
      console.log(response.data)
    } catch (error) {
      setError('Error fetching categories data');
    }
  };


  /// page total
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };
  //// search data
  const handleSearch = (event) => {
    if (setPage(0)) {
      alert('not found!')
    } else {
      setSearchQuery(event.target.value);
      setPage(1); // Reset to the first page on search 
    }

  };


  // Handle exclude_Tax change and recalculate profit
  const handleExcludeTaxChange = (e) => {
    const newExcludeTax = parseFloat(e.target.value);
    const newProfit = newExcludeTax - cost_Price;
    setExclude_Tax(newExcludeTax);
    setProfit(newProfit);
  };

  // Handle profit change and recalculate exclude_Tax
  const handleProfitChange = (e) => {
    const newProfit = parseFloat(e.target.value);
    const newExcludeTax = cost_Price + newProfit;
    setProfit(newProfit);
    setExclude_Tax(newExcludeTax);
  };

  // Handle cost_Price change and recalculate both exclude_Tax and profit
  const handleCostPriceChange = (e) => {
    const newCostPrice = parseFloat(e.target.value);
    const newProfit = exclude_Tax - newCostPrice;
    const newExcludeTax = newCostPrice + profit;
    setCost_Price(newCostPrice);
    setProfit(newProfit);
    setExclude_Tax(newExcludeTax);
  };

  /// show modal insert
  const [isInsertModalOpen, setIsInsertModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedproductId, setSelectedproductId] = useState(null);
  // modal insert
  const openInsertModal = () => {
    setIsInsertModalOpen(true);
  };

  const ClearData = () => {
    // setBrand_ID("");
    setProNames("");
    setBrand_ID("");
    setUnit_ID("");
    setCategory_ID("");
    setNote_Qty("");
    setCost_Price("");
    setInclude_Tax("");
    setExclude_Tax("");
    setType_Tax("");
    setProfit("");
    setExpiry("");
    setFile(null);
    setError('');
  };

  // modal update 
  const openUpdateModal = cat => {
    setSelectedproductId(cat.id);
    setProNames(cat.pro_names);
    setCategory_ID(cat.category_id);
    setBrand_ID(cat.brand_id);
    setUnit_ID(cat.unit_id);
    setNote_Qty(cat.note_qty);
    setCost_Price(cat.cost_price);
    setInclude_Tax(cat.include_tax);
    setExclude_Tax(cat.exclude_tax);
    setProfit(cat.profit);
    setExpiry(cat.expiry);
    setType_Tax(cat.type_of_tax);
    setProduct_type(cat.product_type);
    setExistingImage(cat.image);
    setIsUpdateModalOpen(true);
  };
  // modal update 
  const UpdateProduct = async e => {
    e.preventDefault();
    setError('');
    const fileTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
    if (file && !fileTypes.includes(file.type)) {
      setError('Error: Images Only (jpeg, jpg, png, gif)');
      return;
    }
    // Optionally, check file size
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file && file.size > maxSize) {
      setError('Error: File size exceeds 5MB');
      return;
    }
    const values = {
      pro_names: ProNames,
      category_id: category_ID,
      brand_id: brand_ID,
      unit_id: unit_ID,
      note_qty: note_QTY,
      cost_price: cost_Price,
      include_tax: include_Tax,
      exclude_tax: exclude_Tax,
      profit: profit,
      expiry: expiry,
      type_of_tax: type_Tax,
      product_type: product_type,
      file: file,
      description: description,
      user_at: userLoginNames,
    }
    try {
      await axios.put(`http://localhost:6700/api/product/${selectedproductId}`, values, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      toast.success('កែប្រែបានដោយជោគជ័យ!', { autoClose: 3000 });
      getAllProduct();
      setIsUpdateModalOpen(false);
      setSelectedproductId(null);
      ClearData();
    } catch (err) {
      console.error(err);
      toast.error('សូមលោកព្យាយាមម្ដងទៀត ស្មោះមានរួចហើយ !', { autoClose: 3000 });
    }
  };

  // modal delete
  const openDeleteModal = cat => {
    setSelectedproductId(cat.id);
    setIsDeleteModalOpen(true);
  };

  // modale delete
  const deleteproduct = async () => {
    if (selectedproductId) {
      try {
        await axios.delete(`http://localhost:6700/api/product/${selectedproductId}`);
        toast.success('លុបបានដោយជោគជ័យ!', { autoClose: 3000 });
        getAllProduct();
        setIsDeleteModalOpen(false);
        setSelectedproductId(null);
      } catch (err) {
        console.error(err);
        toast.error('សូមលោកព្យាយាមម្ដងទៀត ស្មោះមានរួចហើយ !', { autoClose: 3000 });
      }
    }
  };


  // greate product
  const Createproduct = async (e) => {
    e.preventDefault();
    setError('');
    const fileTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
    if (file && !fileTypes.includes(file.type)) {
      setError('Error: Images Only (jpeg, jpg, png, gif)');
      return;
    }
    // Optionally, check file size
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file && file.size > maxSize) {
      setError('Error: File size exceeds 5MB');
      return;
    }
    const values = {
      pro_names: ProNames,
      category_id: category_ID,
      brand_id: brand_ID,
      unit_id: unit_ID,
      note_qty: note_QTY,
      cost_price: cost_Price,
      include_tax: include_Tax,
      exclude_tax: exclude_Tax,
      profit: profit,
      expiry: expiry,
      type_of_tax: type_Tax,
      product_type: product_type,
      file: file,
      description: description,
      user_at: userLoginNames,
    }
    try {

      const res = await axios.post('http://localhost:6700/api/product', values,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        }
      );
      console.log(res.data);
      toast.success('បង្កើតបានដោយជោគជ័យ!', { autoClose: 3000 });
      getAllProduct();
      ClearData();
      setIsInsertModalOpen(false);
    } catch (err) {
      console.error(err);
      toast.error('សូមលោកព្យាយាមម្ដងទៀត ស្មោះមានរួចហើយ !', { autoClose: 3000 });
    }
  };

  const rowAnimation = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 }
  };


 
  return (
    <div>
      <div className=''>
        <div className="flex items-center gap-2 ">
          <p><FaClipboardList className="text-lg " /></p>
          <p className="font-NotoSansKhmer font-bold ">តារាងបញ្ជីប្រភេទទំនិញ</p>
        </div>
        <div className="flex justify-end">
          <button onClick={openInsertModal} className="button_only_submit">+ បង្កើតប្រភេទថ្មី</button>
        </div>
        <div className="flex justify-between items-center my-3">
          <div className="flex flex-col gap-2 font-bold font-NotoSansKhmer">
            <label htmlFor="">ច្រោះតាមចំនួន</label>
            <select
              value={limit}
              onChange={(e) => setLimit(Number(e.target.value))}
              className="input_text w-[100px]">
              {[25, 50, 100, 500].map(value => (
                <option key={value} value={value}>{value}</option>
              ))}
            </select>
          </div>
          <div class="flex-col hidden md:block">
            <div className='flex'>
              <button class="button_export">
                <p><FaFileCsv /></p>
                Export to CSV
              </button>
              <button class="button_export">
                <p><FaFileExcel /></p>
                Export to Excel
              </button>
            </div>
          </div>
          <div>
            <input type="text"
              value={searchQuery}
              onChange={handleSearch}
              className="input_text w-[300px]" placeholder="ស្វែងរកអ្នកផ្គត់ផ្គង់..." />
          </div>
        </div>
        <div class="relative overflow-x-auto h-screen scrollbar-hidden">
          <AnimatePresence>
            <table className="min-w-full table-auto">
              <thead className="bg-blue-600/95 text-white">
                <tr className="font-NotoSansKhmer font-bold">
                  <th className=" px-4 py-2">លេខរៀង</th>
                  <th className=" px-4 py-2 whitespace-nowrap">រូបភាព</th>
                  <th className=" px-4 py-2 whitespace-nowrap">ឈ្មោះផលិតផល</th>
                  <th className=" px-4 py-2">តម្លៃទិញឯកតា</th>
                  <th className=" px-4 py-2">តម្លៃលក់</th>
                  <th className=" px-4 py-2">ពន្ធ</th>
                  <th className=" px-4 py-2">តម្លៃចំនេញ</th>
                  <th className=" px-4 py-2">បច្ចុប្បន្នភាពស្តុក</th>
                  <th className=" px-4 py-2">ប្រភេទផលិតផល</th>
                  <th className=" px-4 py-2">ប្រភេទទំនិញ</th>
                  <th className=" px-4 py-2">ម៉ាលយីយោ</th>
                  <th className=" px-4 py-2">ស្ថានភាព</th>

                  <th className=" px-4 py-2">ការណិពណ័នា</th>
                  <th className=" px-4 py-2">បង្កើត</th>
                  <th className=" px-4 py-2">បន្ថែមដោយ</th>
                  <th className=" px-4 py-2">សកម្មភាព</th>

                </tr>
              </thead>
              {loading ? (
                <p>Loading...</p>
              ) : error ? (
                <p>{error}</p>
              ) : product.length === 0 ? (
                <p className="text-start py-4 px-10 text-red-500">រកមិនឃើញប្រភេទ ? {searchQuery}</p>
              ) : (
                <tbody>
                  {product.map((product, index) => (
                    <motion.tr
                      key={product.id}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      variants={rowAnimation}
                      transition={{ duration: 0.3 }}
                      className="text-sm font-NotoSansKhmer hover:scale-y-110 duration-100">
                      <td className=" px-4 py-1">{index + 1}</td>
                      <td>
                        <img src={`http://localhost:6700/image/${product.image}`} alt="Character" class="w-12 h-12 rounded-lg object-contain" />
                      </td>
                      <td className="px-4 py-1">{product.pro_names}</td>
                      <td className=" px-4 py-1">{product.cost_price}</td>
                      <td className=" px-4 py-1">{product.exclude_tax}</td>
                      <td className=" px-4 py-1">{product.include_tax || 'N/A'} </td>
                      <td className=" px-4 py-1">{product.profit}</td>
                      <td className="px-4 py-1">{product.qty} {product.unit_names}</td>
                      <td className=" px-4 py-1">{product.product_type || 'N/A'}</td>
                      <td className=" px-4 py-1">{product.cat_names || 'N/A'}</td>
                      <td className="px-4 py-1">{product.brand_names || 'N/A'}</td>
                      <td className=" px-4 py-1 whitespace-nowrap">
                        {product.status === 'active' ? (
                          <span className='bg-green-500 py-1 px-4 rounded-lg hover:bg-green-300 dark:bg-green-300 text-white'>លក់</span>
                        ) : (
                          <span className='bg-red-500 py-1 px-4 rounded-lg hover:bg-red-300 text-white dark:bg-red-300'>បិទការលក់</span>
                        )}
                      </td>
                      <td className=" px-4 py-1">{product.description || 'N/A'}</td>
                      <td className=" px-4 whitespace-nowrap py-1">{formatDateToKhmer(new Date(product.create_at))}</td>
                      <td className=" px-4 py-1">{product.user_at}</td>
                      <td className="px-4  space-x-2 flex">
                        <button
                          onClick={() => openDeleteModal(product)}
                          className='bg-red-50 rounded-full p-2 '
                        >
                          <MdDelete className='text-red-500' />
                        </button>
                        <button
                          onClick={() => openUpdateModal(product)}
                          className='bg-blue-50 rounded-full p-2 '                        >
                          <FaPencilAlt className='text-blue-500' />
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              )}
            </table>
          </AnimatePresence>
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            limit={limit}
            setLimit={setLimit}
          />

        </div>

      </div>



      {/* Insert Modal */}
      <AnimatePresence>
        {isInsertModalOpen && (
          <motion.div
            className="modal"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
          >

            <div className="modal_center max-w-6xl mt-10">
              <div className="modal_title">
                <h3 className="">ប្រភេទទំនិញ</h3>
                <MdClose className='text-2xl cursor-pointer' onClick={() => setIsInsertModalOpen(false)} />
              </div>
              <div className="modal_form">
                <form class="" onSubmit={Createproduct}>
                  <div className="">
                    <div className='grid gap-4 mb-4 md:grid-cols-3 grid-cols-2'>
                      <div class="col-span-1 space-y-2">
                        <label className="font-NotoSansKhmer font-bold">ឈ្មោះផលិតផល: *</label>
                        <input
                          type="text"
                          value={ProNames}
                          onChange={e => setProNames(e.target.value)}
                          id="price"
                          class="input_text "
                          placeholder="ឈ្មោះទំនិញ" required
                        />
                      </div>
                    </div>
                    <div className='border-t-2 border-yellow-600 shadow p-4 mb-4 rounded-lg'>
                      <div class="grid gap-4 mb-4 md:grid-cols-3 grid-cols-2">
                        <div class="col-span-1  space-y-2">
                          <label className="font-NotoSansKhmer font-bold">ឯកតា:* </label>
                          <select
                            className='input_text'
                            id="unit_ID"
                            value={unit_ID}
                            required
                            onChange={e => setUnit_ID(e.target.value)}
                          >
                            <option value="">ជ្រើសរើសប្រភេទគណនី</option>
                            {Units?.map((items) => (
                              <option key={items.id} value={items.id}>
                                {items.names}
                              </option>
                            ))}

                          </select>
                        </div>
                        <div class="col-span-1  space-y-2">
                          <label className="font-NotoSansKhmer font-bold">ម៉ាកយីហោ:</label>
                          <select
                            className='input_text'
                            id="brand_ID"
                            value={brand_ID}

                            onChange={e => setBrand_ID(e.target.value)}
                          >
                            <option value="">ជ្រើសរើសម៉ាកយីហោ</option>
                            {Brands?.map((items) => (
                              <option key={items.id} value={items.id}>
                                {items.brand_names}
                              </option>
                            ))}

                          </select>
                        </div>
                        <div class="col-span-1  space-y-2">
                          <label className="font-NotoSansKhmer font-bold">ប្រភេទទំនេញ:</label>
                          <select
                            className='input_text'
                            value={category_ID}
                            onChange={e => setCategory_ID(e.target.value)}
                          >
                            <option value=''>ជ្រើសរើសប្រភេទទំនេញ</option>
                            {categorys?.map((items) => (
                              <option key={items.id} value={items.id}>
                                {items.cat_names}
                              </option>
                            ))}

                          </select>
                        </div>
                        <div class="col-span-1 space-y-2">
                          <label className="font-NotoSansKhmer font-bold">ជូនដំណឹងពីបរិមាណៈ</label>
                          <input
                            type="number"
                            value={note_QTY}
                            min={0}
                            onChange={e => setNote_Qty(e.target.value)}
                            id="price"
                            class="input_text "
                            placeholder="ជូនដំណឹងពីបរិមាណ"
                          />
                        </div>
                        <div class="col-span-1  space-y-2">
                          <label className="font-NotoSansKhmer font-bold">ថ្ងៃផុតកំណត់</label>
                          <input
                            type="date"
                            value={expiry}
                            onChange={e => setExpiry(e.target.value)}
                            id="price"
                            min={today}
                            class="input_text "
                          />
                        </div>
                        <div class="col-span-2">
                          <label className="font-NotoSansKhmer font-bold">ការណិពណ័នា</label>
                          <textarea id="description"
                            rows="2"
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            class="input_text"
                            placeholder="ការណិពណ័នា">
                          </textarea>
                        </div>

                      </div>
                    </div>

                    <div className='border-t-2 border-blue-600 shadow p-4 mb-4 rounded-lg'>
                      <div className='grid gap-4 mb-4 md:grid-cols-3 grid-cols-2'>
                        <div class="col-span-1  space-y-2">
                          <label className="font-NotoSansKhmer font-bold">ពន្ធដែលអាចអនុវត្តបាន: </label>
                          <select
                            className='input_text'
                            value={include_Tax}
                            onChange={e => setInclude_Tax(e.target.value)}
                          >
                            <option value="">មិនមាន</option>
                            <option value="Rank">Rank</option>
                            <option value="AB">AB</option>
                            <option value="Big Rate">Big Rate</option>

                          </select>
                        </div>
                        <div class="col-span-1  space-y-2">
                          <label className="font-NotoSansKhmer font-bold">ប្រភេទពន្ធលើតម្លៃលក់: *</label>
                          <select
                            className='input_text'
                            value={type_Tax}
                            onChange={e => setType_Tax(e.target.value)}
                          >
                            <option value="ផ្ដាច់មុខ">ផ្ដាច់មុខ</option>
                            <option value="រួមបញ្ចូលគ្នា">រួមបញ្ចូលគ្នា</option>

                          </select>
                        </div>
                        <div class="col-span-1  space-y-2">
                          <label className="font-NotoSansKhmer font-bold">ប្រភេទផលិតផល: *</label>
                          <select
                            className='input_text'
                            value={product_type}
                            onChange={e => setProduct_type(e.target.value)}
                          >
                            <option value="មួយ">មួយ</option>
                            <option value="អថេរ">អថេរ</option>
                            <option value="បណ្ដុំ">បណ្ដុំ</option>
                          </select>
                        </div>
                        <div class="col-span-1 space-y-2">
                          <label for="category"
                            className="font-NotoSansKhmer font-bold">រូបភាពផលិតផល</label>
                          <input
                            type="file"
                            className='form-control'
                            onChange={(e) => setFile(e.target.files[0])}
                          />
                          {error && <p className="text-red-700">{error}</p>}
                        </div>

                      </div>

                      <div className='bg-white'>
                        <table className='bg-white'>
                          <tr className='bg-blue-300'>
                            <th colSpan={2}>តម្លៃទិញដើម</th>
                            <th>ចំណេញ</th>
                            <th>តម្លៃលក់ដើម</th>
                          </tr>
                          <tr className='bg-blue-800'>
                            <td>
                              <div class="col-span-1 space-y-2">
                                <label className="font-NotoSansKhmer text-sm font-bold">មិនរួមបញ្ចូលពន្ធ: *</label>
                                <input
                                  type="number"
                                  value={cost_Price}
                                  min={1}
                                  step={0.10}
                                  onChange={handleCostPriceChange}

                                  // onChange={e => setCost_Price(e.target.value)}
                                  id="price"
                                  class="input_text bg-white "
                                  placeholder="មិនរួមបញ្ចូលពន្ធ" required
                                />
                              </div>
                            </td>
                            <td>
                              <div class="col-span-1 space-y-2">
                                <label className="font-NotoSansKhmer text-sm font-bold">រួមបញ្ចូលពន្ធ: *</label>
                                <input
                                  type="number"
                                  id="price"
                                  step={0.10}
                                  value={cost_Price}
                                  min={1}
                                  onChange={handleCostPriceChange}
                                  // onChange={e => setCost_Price(e.target.value)}
                                  class="input_text bg-white "
                                  placeholder="រួមបញ្ចូលពន្ធ" required
                                />
                              </div>
                            </td>
                            <td>
                              <div class="col-span-1 space-y-2">
                                <input
                                  type="number"
                                  value={profit}
                                  onChange={handleProfitChange}
                                  // onChange={e => setProfit(e.target.value)}
                                  min={0}
                                  step={0.10}
                                  class="input_text bg-white "
                                  placeholder="0.00 $" required
                                />
                              </div>
                            </td>
                            <td>
                              <div class="col-span-1 space-y-2">
                                <label className="font-NotoSansKhmer text-sm font-bold">តម្លៃលក់ដើម: *</label>
                                <input
                                  type="number"
                                  value={exclude_Tax}
                                  min={1}
                                  step={0.10}
                                  onChange={handleExcludeTaxChange}
                                  // onChange={e => setExclude_Tax(e.target.value)}
                                  id="price"
                                  class="input_text bg-white"
                                  placeholder="មិនរួមបញ្ចូលពន្ធ" required
                                />
                              </div>
                            </td>

                          </tr>
                        </table>
                      </div>
                    </div>
                    <div className='flex justify-end mb-10'>
                      <button
                        type="submit"

                        className="button_only_submit "
                      >
                        រក្សាទុក្ខ
                      </button>
                    </div>
                  </div>
                </form>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Modal */}
      <AnimatePresence>
        {isDeleteModalOpen && (
          <motion.div
            className="modal"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
          >
            <div className="modal_center max-w-sm">
              <div className="modal_title">
                <h3 className="">លុបប្រភេទទំនិញ</h3>

                <MdClose className='text-2xl cursor-pointer' onClick={() => setIsDeleteModalOpen(false)} />
              </div>
              <div className="p-4 space-y-4">
                <p className="text-sm ">
                  Are you sure you want to delete this product? This action cannot be undone.
                </p>
                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    className="button_only_close"
                    onClick={() => setIsDeleteModalOpen(false)}
                  >
                    មិនលុប
                  </button>
                  <button
                    type="button"
                    className="button_only_submit"
                    onClick={deleteproduct}
                  >
                    លុប
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Update Modal */}
      <AnimatePresence>
        {isUpdateModalOpen && (
          <motion.div
            className="modal"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
          >
            <div className="modal_center max-w-6xl">
              <div className="modal_title">
                <h3 className="">កែប្រែប្រភេទទំនិញ</h3>
                <MdClose className='text-2xl cursor-pointer' onClick={() => setIsUpdateModalOpen(false)} />

              </div>
              <div className="modal_form">
                <form class="" onSubmit={UpdateProduct}>

                  <div className="">
                    <div className='grid gap-4 mb-4 md:grid-cols-3 grid-cols-2'>
                      <div class="col-span-1 space-y-2">
                        <label className="font-NotoSansKhmer font-bold">ឈ្មោះផលិតផល: *</label>
                        <input
                          type="text"
                          value={ProNames}
                          onChange={e => setProNames(e.target.value)}
                          id="price"
                          class="input_text "
                          placeholder="ឈ្មោះទំនិញ" required
                        />
                      </div>
                    </div>
                    <div className='border-t-2 border-yellow-600 shadow p-4 mb-4 rounded-lg'>
                      <div class="grid gap-4 mb-4 md:grid-cols-3 grid-cols-2">
                        <div class="col-span-1  space-y-2">
                          <label className="font-NotoSansKhmer font-bold">ឯកតា:* </label>
                          <select
                            className='input_text'
                            id="unit_ID"
                            value={unit_ID}
                            required
                            onChange={e => setUnit_ID(e.target.value)}
                          >
                            <option value="">ជ្រើសរើសប្រភេទគណនី</option>
                            {Units?.map((items) => (
                              <option key={items.id} value={items.id}>
                                {items.names}
                              </option>
                            ))}

                          </select>
                        </div>
                        <div class="col-span-1  space-y-2">
                          <label className="font-NotoSansKhmer font-bold">ម៉ាកយីហោ:</label>
                          <select
                            className='input_text'
                            id="brand_ID"
                            value={brand_ID}

                            onChange={e => setBrand_ID(e.target.value)}
                          >
                            <option value="">ជ្រើសរើសម៉ាកយីហោ</option>
                            {Brands?.map((items) => (
                              <option key={items.id} value={items.id}>
                                {items.brand_names}
                              </option>
                            ))}

                          </select>
                        </div>
                        <div class="col-span-1  space-y-2">
                          <label className="font-NotoSansKhmer font-bold">ប្រភេទទំនេញ:</label>
                          <select
                            className='input_text'
                            value={category_ID}
                            onChange={e => setCategory_ID(e.target.value)}
                          >
                            <option value=''>ជ្រើសរើសប្រភេទទំនេញ</option>
                            {categorys?.map((items) => (
                              <option key={items.id} value={items.id}>
                                {items.cat_names}
                              </option>
                            ))}

                          </select>
                        </div>
                        <div class="col-span-1 space-y-2">
                          <label className="font-NotoSansKhmer font-bold">ជូនដំណឹងពីបរិមាណៈ</label>
                          <input
                            type="number"
                            value={note_QTY}
                            min={0}
                            onChange={e => setNote_Qty(e.target.value)}
                            id="price"
                            class="input_text "
                            placeholder="ជូនដំណឹងពីបរិមាណ"
                          />
                        </div>
                        <div class="col-span-1  space-y-2">
                          <label className="font-NotoSansKhmer font-bold">ថ្ងៃផុតកំណត់</label>
                          <input
                            type="date"
                            value={expiry}
                            onChange={e => setExpiry(e.target.value)}
                            id="price"
                            min={today}
                            class="input_text "
                          />
                        </div>
                        <div class="col-span-2">
                          <label className="font-NotoSansKhmer font-bold">ការណិពណ័នា</label>
                          <textarea id="description"
                            rows="2"
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            class="input_text"
                            placeholder="ការណិពណ័នា">
                          </textarea>
                        </div>

                      </div>
                    </div>

                    <div className='border-t-2 border-blue-600 shadow p-4 mb-4 rounded-lg'>
                      <div className='grid gap-4 mb-4 md:grid-cols-3 grid-cols-2'>
                        <div class="col-span-1  space-y-2">
                          <label className="font-NotoSansKhmer font-bold">ពន្ធដែលអាចអនុវត្តបាន: </label>
                          <select
                            className='input_text'
                            value={include_Tax}
                            onChange={e => setInclude_Tax(e.target.value)}
                          >
                            <option value="">មិនមាន</option>
                            <option value="Rank">Rank</option>
                            <option value="AB">AB</option>
                            <option value="Big Rate">Big Rate</option>

                          </select>
                        </div>
                        <div class="col-span-1  space-y-2">
                          <label className="font-NotoSansKhmer font-bold">ប្រភេទពន្ធលើតម្លៃលក់: *</label>
                          <select
                            className='input_text'
                            value={type_Tax}
                            onChange={e => setType_Tax(e.target.value)}
                          >
                            <option value="GST">ផ្ដាច់មុខ</option>
                            <option value="VAT">រួមបញ្ចូលគ្នា</option>

                          </select>
                        </div>
                        <div class="col-span-1  space-y-2">
                          <label className="font-NotoSansKhmer font-bold">ប្រភេទផលិតផល: *</label>
                          <select
                            className='input_text'
                            value={product_type}
                            onChange={e => setProduct_type(e.target.value)}
                          >
                            <option value="មួយ">មួយ</option>
                            <option value="អថេរ">អថេរ</option>
                            <option value="បណ្ដុំ">បណ្ដុំ</option>
                          </select>
                        </div>
                        <div class="col-span-1 space-y-2 ">
                          <label for="category"
                            class="font-NotoSansKhmer font-bold">រូបភាព</label>

                          <input
                            type="file"
                            className='input_text h-12'
                            onChange={(e) => setFile(e.target.files[0])}
                          />
                          {error && <p className="text-red-600">{error}</p>}
                        </div>

                        <div>
                          {existingImage && !file && <img src={`http://localhost:6700/image/${existingImage}`} className='my-4 h-24 object-contain' alt="Current" />}
                        </div>
                      </div>

                      <div className='bg-white'>
                        <table className='bg-white'>
                          <tr className='bg-blue-300'>
                            <th colSpan={2}>តម្លៃទិញដើម</th>
                            <th>ចំណេញ</th>
                            <th>តម្លៃលក់ដើម</th>
                          </tr>
                          <tr className='bg-blue-800'>
                            <td>
                              <div class="col-span-1 space-y-2">
                                <label className="font-NotoSansKhmer text-sm font-bold">មិនរួមបញ្ចូលពន្ធ: *</label>
                                <input
                                  type="number"
                                  value={cost_Price}
                                  min={1}
                                  step={0.10}
                                  onChange={handleCostPriceChange}

                                  // onChange={e => setCost_Price(e.target.value)}
                                  id="price"
                                  class="input_text bg-white "
                                  placeholder="មិនរួមបញ្ចូលពន្ធ" required
                                />
                              </div>
                            </td>
                            <td>
                              <div class="col-span-1 space-y-2">
                                <label className="font-NotoSansKhmer text-sm font-bold">រួមបញ្ចូលពន្ធ: *</label>
                                <input
                                  type="number"
                                  id="price"
                                  step={0.10}
                                  value={cost_Price}
                                  min={1}
                                  onChange={handleCostPriceChange}
                                  // onChange={e => setCost_Price(e.target.value)}
                                  class="input_text bg-white "
                                  placeholder="រួមបញ្ចូលពន្ធ" required
                                />
                              </div>
                            </td>
                            <td>
                              <div class="col-span-1 space-y-2">
                                <input
                                  type="number"
                                  value={profit}
                                  onChange={handleProfitChange}
                                  // onChange={e => setProfit(e.target.value)}
                                  min={0}
                                  step={0.10}
                                  class="input_text bg-white "
                                  placeholder="0.00 $" required
                                />
                              </div>
                            </td>
                            <td>
                              <div class="col-span-1 space-y-2">
                                <label className="font-NotoSansKhmer text-sm font-bold">តម្លៃលក់ដើម: *</label>
                                <input
                                  type="number"
                                  value={exclude_Tax}
                                  min={1}
                                  step={0.10}
                                  onChange={handleExcludeTaxChange}
                                  // onChange={e => setExclude_Tax(e.target.value)}
                                  id="price"
                                  class="input_text bg-white"
                                  placeholder="មិនរួមបញ្ចូលពន្ធ" required
                                />
                              </div>
                            </td>

                          </tr>
                        </table>
                      </div>
                    </div>
                    <div className='flex justify-end mb-10'>
                      <button
                        type="submit"

                        className="button_only_submit "
                      >
                        រក្សាទុក្ខ
                      </button>
                    </div>
                  </div>

                </form>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dashboard;
