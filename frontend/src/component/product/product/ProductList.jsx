
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Pagination from '../../pagination/Pagination';
import { FaClipboardList, FaFileCsv, FaFileExcel, FaPencilAlt } from "react-icons/fa";
import { MdDelete, MdClose } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import { formatDateToKhmer } from '../../ForMartDateToKHmer';
import { IoPrint } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import NullImage from '../../../assets/image.png';



const Dashboard = () => {
    const [error, setError] = useState('');
    const [userLoginNames, setUserLoginNames] = useState('');

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

    /// show modal insert
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedproductId, setSelectedproductId] = useState(null);

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


    /// show modal insert
    const [IsModalUpdateStatus, setIsModalUpdateStatus] = useState(false);
    const [status, setStatus] = useState('');

    // modal update 
    const openUpdateModal = cat => {
        setSelectedproductId(cat.id);
        setStatus(cat.status);
        console.log(cat.status);
        setIsModalUpdateStatus(true);
    };

    // modal update  statis
    const UpdateProduct = async (e) => {
        e.preventDefault();
        setError('');
        const values = {
            status: status,
        };
        try {
            await axios.put(`http://localhost:6700/api/product/updateproduct_status/${selectedproductId}`, values);
            toast.success('កែប្រែបានដោយជោគជ័យ', { autoClose: 3000 });
            console.log(status);
            getAllProduct();
            setIsModalUpdateStatus(false);
            setSelectedproductId(null);
        } catch (err) {
            console.error(err);
            toast.error('សូមលោកព្យាយាមម្ដងទៀត!', { autoClose: 3000 });
        }
    };


    const rowAnimation = {
        hidden: { opacity: 0, y: -20 },
        visible: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: 20 }
    };


    return (
        <div>
            <div>
                <div className="flex items-center gap-2 ">
                    <p><FaClipboardList className="text-lg " /></p>
                    <p className="font-NotoSansKhmer font-bold ">តារាងបញ្ជីប្រភេទទំនិញ</p>
                </div>
                <div className="flex justify-end">
                    <Link to={'/createproduct'} className="button_only_submit">+ បង្កើតប្រភេទថ្មី</Link>
                </div>
                <div className="md:flex justify-between items-center my-3 overflow-hidden space-y-2">
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
                    {/* <div class="flex-col hidden md:block">
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
                    </div> */}
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
                                    <th className=" px-4 py-2">ថ្ងៃផុតកំណត់</th>
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
                                <p className="text-start py-4 px-10 text-red-500 whitespace-nowrap ">រកមិនឃើញប្រភេទ ? {searchQuery}</p>
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
                                                {product.image ? (
                                                    <div className="flex items-center justify-center h-12">
                                                        <img
                                                            src={`http://localhost:6700/image/${product.image}`}
                                                            alt={product.pro_names}
                                                            className="object-contain h-full w-full rounded mb-2"
                                                        />
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center justify-center h-12">
                                                        <img
                                                            src={NullImage}
                                                            alt={product.pro_names}
                                                            className="object-contain h-full w-full rounded mb-2"
                                                        />
                                                    </div>
                                                )}
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
                                                <button onClick={() => openUpdateModal(product)}>
                                                    {product.status === 'active' ? (
                                                        <span className='bg-green-500 py-1 px-4 rounded hover:bg-green-300 dark:bg-green-300 text-white'>កំពុងលក់</span>
                                                    ) : (
                                                        <span className='bg-red-500 py-1 px-4 rounded hover:bg-red-300 text-white dark:bg-red-300'>បិទការលក់</span>
                                                    )}
                                                </button>
                                            </td>
                                            <td className='whitespace-nowrap'>
                                                {(() => {
                                                    if (!product.expiry) {
                                                        return <span className="">មិនមាន</span>;
                                                    }

                                                    const expiryDate = new Date(product.expiry);
                                                    if (isNaN(expiryDate.getTime())) {
                                                        return <span className="">មិនមាន</span>;
                                                    }

                                                    const today = new Date();
                                                    const next7Days = new Date(today);
                                                    const next15Days = new Date(today);

                                                    next7Days.setDate(today.getDate() + 7);
                                                    next15Days.setDate(today.getDate() + 15);

                                                    if (expiryDate < today) {
                                                        return <span className="text-red-500">{formatDateToKhmer(new Date(product.expiry))}</span>;
                                                    } else if (expiryDate <= next7Days) {
                                                        return <span className="text-blue-500">{formatDateToKhmer(new Date(product.expiry))}</span>;
                                                    } else if (expiryDate <= next15Days) {
                                                        return <span className="text-green-500">{formatDateToKhmer(new Date(product.expiry))}</span>;
                                                    } else {
                                                        return <span>{formatDateToKhmer(new Date(product.expiry))}</span>;
                                                    }
                                                })()}

                                            </td>
                                            <td className=" px-4 py-1">{product.description || 'N/A'}</td>
                                            <td className=" px-4 whitespace-nowrap py-1">{formatDateToKhmer(new Date(product.create_at))}</td>
                                            <td className=" px-4 py-1">{product.user_at}</td>
                                            <td className="px-4  space-x-2 flex">
                                                <button
                                                    onClick={() => openDeleteModal(product)}
                                                    className='bg-red-200  p-2 '
                                                >
                                                    <MdDelete className='text-red-500' />
                                                </button>
                                                <Link
                                                    to={`/updateproduct/${product.id}`}
                                                    className="flex items-center gap-1 p-2 font-bold text-white bg-green-300 hover:bg-green-400"

                                                >
                                                    <FaPencilAlt className='text-blue-500' />
                                                </Link>
                                                <Link
                                                    to={`/product/${product.id}`}
                                                    className="flex items-center gap-1 p-2 font-bold text-white bg-green-300 hover:bg-green-400"

                                                >
                                                    <IoPrint />
                                                </Link>
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
                                <h3 className="">លុបទំនិញ</h3>

                                <MdClose className='text-2xl cursor-pointer' onClick={() => setIsDeleteModalOpen(false)} />
                            </div>
                            <div className="p-4 space-y-4">
                                <p className="text-md ">
                                    តើអ្នកប្រាកដថាចង់លុបផលិតផលនេះទេ? សកម្មភាពនេះមិនអាចត្រឡប់វិញបានទេ។
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
            {/* update  Modal Status */}
            <AnimatePresence>
                {IsModalUpdateStatus && (
                    <motion.div
                        className="fixed top-0 left-0 right-0 z-50 flex items-start justify-center w-full h-full bg-black bg-opacity-30"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.2 }}
                    >
                        <div className="relative w-full bg-white shadow mt-20 dark:bg-gray-700 max-w-lg">
                            <div className="modal_title">
                                <h3 className="">កែប្រែផលិតផលមកដល់ស្តុក</h3>
                                <MdClose className='text-2xl cursor-pointer' onClick={() => setIsModalUpdateStatus(false)} />
                            </div>
                            <div className="modal_form">
                                <form class="py-6" onSubmit={UpdateProduct}>
                                    <div class="grid gap-4 mb-4 grid-cols-1">
                                        <div className="col-span-1 space-y-2">
                                            <label htmlFor="" className="font-bold font-NotoSansKhmer">ស្ថានភាព: *</label>
                                            <select
                                                required
                                                value={status}
                                                onChange={(e) => setStatus(e.target.value)}
                                                className="input_text font-NotoSansKhmer"
                                            >
                                                <option value="inactive">បិទការលក់</option>
                                                <option value="active">កំពុងលក់</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className='flex justify-end'>

                                        <button
                                            type="submit"
                                            className="button_only_submit "
                                        >
                                            រក្សាទុក្ខ
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            <div className='flex space-x-8 py-2'>
                <p className='text-red-500'>ថ្ងៃទីពណ័ « ក្រហម » ថ្ងៃផុតកំណត់</p>
                <p className='text-blue-500'>ថ្ងៃទីពណ័ « ខៀវ » នៅសល់៧ថ្ងៃផុតកំណត់</p>
                <p className='text-green-500'>ថ្ងៃទីពណ័ « បៃតង » នៅសល់15ថ្ងៃផុតកំណត់</p>
            </div>
        </div>
    );
};

export default Dashboard;
