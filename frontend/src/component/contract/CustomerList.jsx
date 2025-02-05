
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Pagination from '../pagination/Pagination';
import { FaClipboardList, FaPencilAlt, FaMoneyBillAlt, FaBookOpen, FaPowerOff } from "react-icons/fa";
import { MdDelete, MdClose, MdOutlineMoneyOff } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";



const Supplier = () => {
    const [isTypwCustomer, setIsTypwCustomer] = useState("");
    const [customeNames, setCustomeNames] = useState(null);
    const [halfcustomeNames, setHalfSupplierName] = useState(null);
    const [groupCustomer, setGroupCustomer] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState(null);
    const [businessName, setBussinessName] = useState(null);
    const [businessPhone, setBussinessPhone] = useState(null);
    const [supplierId, setSupplierId] = useState(null);
    const [email, setEmail] = useState(null);
    const [description, setDescription] = useState(null);
    const [userLoginNames, setUserLoginNames] = useState('');
    const [userRol, setUserRol] = useState('');

    const [error, setError] = useState('');

    //// paginate and search data
    const [group_Customer, setGroup_Customer] = useState([]);
    const [customers, setcustomer] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(20);

    useEffect(() => {
        setUserLoginNames(localStorage.getItem('user_names') || '');
        setUserRol(localStorage.getItem('user_rol') || '');

        GetAllCustomer();
        getGroup_Customer();

    }, [page, limit, searchQuery]);


    //// get all bank type
    const getGroup_Customer = async () => {
        try {
            const response = await axios.get('http://localhost:6700/api/group_customer');
            setGroup_Customer(response.data.group_customer);
            console.log(response.data)
        } catch (error) {
            setError('Error fetching categories data');
        }
    };

    // get all customer add paginate and search
    const GetAllCustomer = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:6700/api/customer', {
                params: {
                    page,
                    limit,
                    search_query: searchQuery
                }
            });
            setcustomer(response.data.customer);
            console.log(response.data)
            setTotalPages(response.data.totalPages);
            setError(null);
        } catch (error) {
            setError('Error fetching categories data');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (event) => {
        setIsTypwCustomer(event.target.value);
        setCustomeNames("");
        setBussinessName("");
        // cleardata();
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
            setPage(1);
        }

    };


    /// show modal insert
    const [isInsertModalOpen, setIsInsertModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [selectedcustomerId, setSelectedcustomerId] = useState(null);
    // modal insert
    const openInsertModal = () => {
        setIsInsertModalOpen(true);
        cleardata();
    };
    // Clear Data 
    const cleardata = async () => {
        setIsTypwCustomer("");
        setCustomeNames("");
        setHalfSupplierName("");
        setGroupCustomer("");
        setPhoneNumber("");
        setBussinessName("");
        setBussinessPhone("");
        setSupplierId("");
        setEmail("");
        setDescription("");
    }
    // modal update 
    const openUpdateModal = cat => {
        setSelectedcustomerId(cat.id);
        setIsTypwCustomer(cat.contect_type);
        setCustomeNames(cat.full_names);
        setHalfSupplierName(cat.half_names);
        setGroupCustomer(cat.group_id);
        setPhoneNumber(cat.mobile_phone);
        setBussinessName(cat.business_names);
        setBussinessPhone(cat.contect_phone);
        setEmail(cat.email);
        setDescription(cat.description);
        setIsUpdateModalOpen(true);
    };
    // modal update 
    const UpdateCustomer = async e => {
        e.preventDefault();
        setError('');
        const values = {
            contect_type: isTypwCustomer,
            group_id: groupCustomer,
            contect_phone: businessPhone,
            mobile_phone: phoneNumber,
            business_names: businessName,
            full_names: customeNames,
            half_names: halfcustomeNames,
            description: description,
            email: email,
            user_at: userLoginNames
        };
        try {
            await axios.put(`http://localhost:6700/api/customer/${selectedcustomerId}`, values);
            toast.success('កែប្រែអតិជនបានដោយជោគជ័យ', { autoClose: 3000 });
            GetAllCustomer();
            setIsUpdateModalOpen(false);
            setSelectedcustomerId(null);
            cleardata();
        } catch (err) {
            // console.error(err);
            // toast.error('សូមលោកព្យាយាមម្ដងទៀត!', { autoClose: 3000 });
            console.error(err);
            const errorMessage = err.response?.data?.message || 'សូមលោកព្យាយាមម្ដងទៀត !';
            toast.error(errorMessage, { autoClose: 3000 });
        }
    };




    // modal delete
    const openDeleteModal = cat => {
        setSelectedcustomerId(cat.id);
        setIsDeleteModalOpen(true);
    };
    //   delete data
    const deletecustomer = async () => {
        if (selectedcustomerId) {
            try {
                await axios.delete(`http://localhost:6700/api/customer/${selectedcustomerId}`);
                toast.success('លុបអតិជនបានដោយជោគជ័យ', { autoClose: 3000 });
                GetAllCustomer();
                setIsDeleteModalOpen(false);
                setSelectedcustomerId(null);
            } catch (err) {
                console.error(err);
                toast.error('សូមលោកព្យាយាមម្ដងទៀត !', { autoClose: 3000 });
            }
        }
    };




    // greate customer
    const createCustomer = async (e) => {
        e.preventDefault();
        setError('');

        const values = {
            contect_type: isTypwCustomer,
            group_id: groupCustomer,
            contect_phone: businessPhone,
            mobile_phone: phoneNumber,
            business_names: businessName,
            full_names: customeNames,
            half_names: halfcustomeNames,
            description: description,
            email: email,
            user_at: userLoginNames
        };

        try {
            const { data } = await axios.post('http://localhost:6700/api/customer', values);
            console.log(data);
            toast.success('បង្កើតអតិជនបានដោយជោគជ័យ ', { autoClose: 3000 });

            // Call function to refresh customer list
            GetAllCustomer();
            setIsInsertModalOpen(false);
            cleardata();
        } catch (err) {
            console.error(err);
            const errorMessage = err.response?.data?.message || 'សូមលោកព្យាយាមម្ដងទៀត !';
            toast.error(errorMessage, { autoClose: 3000 });
        }
    };

    const rowAnimation = {
        hidden: { opacity: 0, y: -20 },
        visible: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: 20 }
    };

    return (
        <div>
            <div className="flex items-center mb-3 gap-2 ">
                <p><FaClipboardList className="text-lg " /></p>
                <p className="font-NotoSansKhmer font-bold ">តារាងបញ្ជីអតិជន</p>
            </div>
            <div className="flex justify-end">
                <button className="button_only_submit" onClick={openInsertModal}>+ បង្កើតអតិជនថ្មី</button>
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
                <div>
                    <input type="text"
                        value={searchQuery}
                        onChange={handleSearch}
                        className="input_text w-[300px]" placeholder="ស្វែងរកឈ្មោះអជីវកម្ម និង អតិជន......." />
                </div>
            </div>
            <div class="relative overflow-x-auto h-screen scrollbar-hidden">
                <AnimatePresence>
                    <table className="min-w-full table-auto">
                        <thead className="bg-blue-600/95 text-white">
                            <tr className="font-NotoSansKhmer font-bold">
                                <th className="px-4 py-2">លេខរៀង</th>
                                <th className="px-4 py-2">ឈ្មោះអជីវកម្ម</th>
                                <th className="px-4 py-2">ឈ្មោះអតិជន</th>
                                <th className="px-4 py-2">ឈ្មោះកាត់</th>
                                <th className="px-4 py-2">អ៊ីម៉ែល</th>
                                <th className="px-4 py-2">បញ្ចុះតម្លៃជាថេរ</th>
                                <th className="px-4 py-2">ក្រុមអតិជន</th>
                                <th className="px-4 py-2">លេខទូរស័ព្ទ</th>
                                <th className="px-4 py-2">លេខសម្គាល់ទំនាក់ទំនង</th>
                                <th className="px-4 py-2">អាស័យដ្ឋាន</th>
                                <th className="px-4 py-2">បានបន្ថែមដោយ</th>
                                <th className="px-4 py-2 text-center">សកម្មភាព</th>
                            </tr>
                        </thead>

                        {loading ? (
                            <p>Loading...</p>
                        ) : error ? (
                            <p>{error}</p>
                        ) : customers.length === 0 ? (
                            <p className="text-start py-4 px-10 text-red-500">រកមិនឃើញប្រភេទ ? {searchQuery}</p>
                        ) : (
                            <tbody>
                                {customers.map((customer, index) => (
                                    <motion.tr
                                        key={customer.id}
                                        initial="hidden"
                                        animate="visible"
                                        exit="exit"
                                        variants={rowAnimation}
                                        transition={{ duration: 0.3 }}
                                        className="text-sm font-NotoSansKhmer hover:scale-y-110 duration-100">
                                        <td className="px-4 py-1">{index + 1}</td>
                                        <td className="px-4 py-1">{customer.business_names}</td>
                                        <td className="px-4 py-1">{customer.full_names}</td>
                                        <td className="px-4 py-1">{customer.half_names}</td>
                                        <td className="px-4 py-1">{customer.email || 'N/A'}</td>
                                        <td className="px-4 py-1">{(customer.discount) || '0.00'} $</td>
                                        <td className="px-4 py-1">{customer.group_names || 'N/A'}</td>
                                        <td className="px-4 py-1">{customer.mobile_phone || 'N/A'}</td>
                                        <td className="px-4 py-1">{customer.contect_phone || 'N/A'}</td>
                                        <td className="px-4 py-1">{customer.description || 'N/A'}</td>
                                        <td className="px-4 py-1">{customer.user_at || 'Unknown'}</td>
                                        <td className="px-4 space-x-2 flex">
                                            {/* Conditional rendering for buttons */}
                                            {customer.full_names !== 'Walk-In Customer' && (
                                                <>
                                                    <button
                                                        onClick={() => openUpdateModal(customer)}
                                                        className="bg-blue-300 p-2 flex text-xs text-white"
                                                    >
                                                        <FaPencilAlt className="text-blue-600 mr-2" /> កែសម្រួល
                                                    </button>
                                                    {(userRol === 'superadmin' || userRol === 'admin') ? (
                                                        <button
                                                            onClick={() => openDeleteModal(customer)}
                                                            className="bg-red-300 p-2 flex text-xs text-white"
                                                        >
                                                            <FaPowerOff className="text-red-500 mr-2" /> លុប
                                                        </button>
                                                    ) : (
                                                        <button
                                                            className="bg-red-300 p-2 flex text-xs text-white opacity-50 cursor-not-allowed"
                                                        >
                                                            <FaPowerOff className="text-red-500 mr-2" /> លុប
                                                        </button>
                                                    )}
                                                </>
                                            )}
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
                        <div className="modal_center max-w-2xl">
                            <div className="modal_title">
                                <h3 className="">អតិជន</h3>
                                <MdClose className='text-2xl cursor-pointer' onClick={() => setIsInsertModalOpen(false)} />
                            </div>
                            <div className="modal_form">
                                <form onSubmit={createCustomer}>
                                    <div className="my-2">
                                        <div className="flex flex-col gap-2">
                                            <label htmlFor="supplierType" className="font-NotoSansKhmer font-bold">
                                                ប្រភេទអតិជន: *
                                            </label>
                                            <select
                                                id="supplierType"
                                                required
                                                onChange={handleChange}
                                                className="input_text w-[300px] font-NotoSansKhmer"
                                                value={isTypwCustomer}
                                            >
                                                <option value="">ជ្រើសរើស</option>
                                                <option value="ផ្ទាល់ខ្លួន" className="font-bold">ផ្ទាល់ខ្លួន</option>
                                                <option value="អជីវកម្ម" className="font-bold">អជីវកម្ម</option>
                                            </select>
                                        </div>
                                    </div>
                                    {isTypwCustomer === 'ផ្ទាល់ខ្លួន' && (
                                        <div>
                                            <div className="flex flex-col gap-2">
                                                <label htmlFor="customeNames" className="font-NotoSansKhmer font-bold">ឈ្មោះអតិជន</label>
                                                <input
                                                    type="text"
                                                    id="customeNames"
                                                    required
                                                    value={customeNames}
                                                    onChange={(e) => setCustomeNames(e.target.value)}
                                                    className="input_text w-[300px]"
                                                    placeholder="ឈ្មោះអតិជន"
                                                />
                                            </div>
                                        </div>
                                    )}
                                    <div className="flex flex-wrap gap-3 items-center w-full">
                                        {isTypwCustomer === "ផ្ទាល់ខ្លួន" && (
                                            <div className="grid grid-cols-2 gap-2">
                                                <div className="col-span-1 gap-2">
                                                    <label htmlFor="halfcustomeNames" className="font-NotoSansKhmer font-bold">ឈ្មោះអតិជន(ឈ្មោះកាត់)</label>
                                                    <input
                                                        type="text"
                                                        id="halfcustomeNames"
                                                        value={halfcustomeNames}
                                                        onChange={(e) => setHalfSupplierName(e.target.value)}
                                                        className="input_text"
                                                        placeholder="ឈ្មោះអតិជន"
                                                    />
                                                </div>
                                                <div className="col-span-1 gap-2">
                                                    <label htmlFor="phoneNumber" className="font-NotoSansKhmer font-bold">លេខទូរស័ព្ទ: *</label>
                                                    <input
                                                        type="text"
                                                        id="phoneNumber"
                                                        required
                                                        value={phoneNumber}
                                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                                        className="input_text"
                                                        placeholder="លេខទូរស័ព្ទ"
                                                    />
                                                </div>
                                            </div>
                                        )}
                                        {isTypwCustomer === "អជីវកម្ម" && (
                                            <div className="grid grid-cols-2 gap-2">
                                                <div className="col-span-1 gap-2">
                                                    <label htmlFor="businessName" className="font-NotoSansKhmer font-bold">ឈ្មោះអជីវកម្ម: *</label>
                                                    <input
                                                        type="text"
                                                        id="businessName"
                                                        required
                                                        value={businessName}
                                                        onChange={(e) => setBussinessName(e.target.value)}
                                                        className="input_text"
                                                        placeholder="ឈ្មោះអជីវកម្ម"
                                                    />
                                                </div>
                                                <div className="col-span-1 gap-2">
                                                    <label htmlFor="businessPhone" className="font-NotoSansKhmer font-bold">លេខទូរស័ព្ទ: *</label>
                                                    <input
                                                        type="text"
                                                        id="businessPhone"
                                                        required
                                                        value={businessPhone}
                                                        onChange={(e) => setBussinessPhone(e.target.value)}
                                                        className="input_text"
                                                        placeholder="លេខទូរស័ព្ទ"
                                                    />
                                                </div>
                                            </div>
                                        )}
                                        <div className='grid grid-cols-2 gap-3'>
                                            <div className="col-span-1 gap-2">
                                                <label htmlFor="supplierID" className="font-NotoSansKhmer font-bold">លេខសម្គាល់ទំនាក់ទំនង</label>
                                                <input
                                                    type="text"
                                                    id="supplierID"
                                                    value={supplierId}
                                                    onChange={(e) => setSupplierId(e.target.value)}
                                                    className="input_text"
                                                    placeholder="លេខសម្គាល់ទំនាក់ទំនង"
                                                />
                                            </div>
                                            <div className="col-span-1 gap-2">
                                                <label htmlFor="email" className="font-NotoSansKhmer font-bold">អ៊ីម៉ែល</label>
                                                <input
                                                    type="text"
                                                    id="email"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    className="input_text"
                                                    placeholder="អ៊ីម៉ែល"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="groupCustomer" className="font-NotoSansKhmer font-bold">ក្រុមអតិជន: *</label>
                                        <select
                                            className='input_text'
                                            id="bank"
                                            value={groupCustomer}
                                            onChange={e => setGroupCustomer(e.target.value)}
                                        >
                                            <option value="" >សូមជ្រើសរើស</option>
                                            {group_Customer?.map((items) => (
                                                <option key={items.id} value={items.id}>
                                                    {items.group_names}
                                                </option>
                                            ))}

                                        </select>
                                    </div>
                                    <div className="col-span-2 gap-3 mt-3">
                                        <label htmlFor="description" className="font-NotoSansKhmer font-bold">ពិពណ៌នា</label>
                                        <textarea
                                            id="description"
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            className="input_text w-full py-5"
                                            placeholder="ពិពណ៌នា"
                                        />
                                    </div>
                                    <div className="flex justify-end my-3">
                                        <button type="submit" className="button_only_submit">រក្សាទុក</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </motion.div>
                )}
                <AnimatePresence>
                    {/* Delete Modal */}
                </AnimatePresence>

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
                                <h3 className="">លុបប្រអតិជន</h3>

                                <MdClose className='text-2xl cursor-pointer' onClick={() => setIsDeleteModalOpen(false)} />
                            </div>
                            <div className="p-4 space-y-4">
                                <p className="text-sm ">
                                តើអ្នកប្រាកដថាចង់លុបអតិថិជននេះទេ? សកម្មភាពនេះមិនអាចត្រឡប់វិញបានទេ។
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
                                        onClick={deletecustomer}
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
                        <div className="modal_center max-w-xl">
                            <div className="modal_title">
                                <h3 className="">កែប្រែអតិជន</h3>
                                <MdClose className='text-2xl cursor-pointer' onClick={() => setIsUpdateModalOpen(false)} />

                            </div>
                            <div className="modal_form">
                                <form onSubmit={UpdateCustomer}>
                                    <div className="my-2">
                                        <div className="flex flex-col gap-2">
                                            <label htmlFor="supplierType" className="font-NotoSansKhmer font-bold">
                                                ប្រភេទអតិជន: *
                                            </label>
                                            <select
                                                id="supplierType"
                                                required
                                                onChange={handleChange}
                                                className="input_text w-[300px] font-NotoSansKhmer"
                                                value={isTypwCustomer}
                                            >
                                                <option value="">ជ្រើសរើស</option>
                                                <option value="ផ្ទាល់ខ្លួន" className="font-bold">ផ្ទាល់ខ្លួន</option>
                                                <option value="អជីវកម្ម" className="font-bold">អជីវកម្ម</option>
                                            </select>
                                        </div>
                                    </div>
                                    {isTypwCustomer === 'ផ្ទាល់ខ្លួន' && (
                                        <div>
                                            <div className="flex flex-col gap-2">
                                                <label htmlFor="customeNames" className="font-NotoSansKhmer font-bold">ឈ្មោះអតិជន</label>
                                                <input
                                                    type="text"
                                                    id="customeNames"
                                                    required
                                                    value={customeNames}
                                                    onChange={(e) => setCustomeNames(e.target.value)}
                                                    className="input_text w-[300px]"
                                                    placeholder="ឈ្មោះអតិជន"
                                                />
                                            </div>
                                        </div>
                                    )}
                                    <div className="flex flex-wrap gap-3 items-center w-full">
                                        {isTypwCustomer === "ផ្ទាល់ខ្លួន" && (
                                            <div className="grid grid-cols-2 gap-2">
                                                <div className="col-span-1 gap-2">
                                                    <label htmlFor="halfcustomeNames" className="font-NotoSansKhmer font-bold">ឈ្មោះអតិជន(ឈ្មោះកាត់)</label>
                                                    <input
                                                        type="text"
                                                        id="halfcustomeNames"
                                                        value={halfcustomeNames}
                                                        onChange={(e) => setHalfSupplierName(e.target.value)}
                                                        className="input_text"
                                                        placeholder="ឈ្មោះអតិជន"
                                                    />
                                                </div>
                                                <div className="col-span-1 gap-2">
                                                    <label htmlFor="phoneNumber" className="font-NotoSansKhmer font-bold">លេខទូរស័ព្ទ: *</label>
                                                    <input
                                                        type="text"
                                                        id="phoneNumber"
                                                        required
                                                        value={phoneNumber}
                                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                                        className="input_text"
                                                        placeholder="លេខទូរស័ព្ទ"
                                                    />
                                                </div>
                                            </div>
                                        )}
                                        {isTypwCustomer === "អជីវកម្ម" && (
                                            <div className="grid grid-cols-2 gap-2">
                                                <div className="col-span-1 gap-2">
                                                    <label htmlFor="businessName" className="font-NotoSansKhmer font-bold">ឈ្មោះអជីវកម្ម: *</label>
                                                    <input
                                                        type="text"
                                                        id="businessName"
                                                        required
                                                        value={businessName}
                                                        onChange={(e) => setBussinessName(e.target.value)}
                                                        className="input_text"
                                                        placeholder="ឈ្មោះអជីវកម្ម"
                                                    />
                                                </div>
                                                <div className="col-span-1 gap-2">
                                                    <label htmlFor="businessPhone" className="font-NotoSansKhmer font-bold">លេខទូរស័ព្ទ: *</label>
                                                    <input
                                                        type="text"
                                                        id="businessPhone"
                                                        required
                                                        value={businessPhone}
                                                        onChange={(e) => setBussinessPhone(e.target.value)}
                                                        className="input_text"
                                                        placeholder="លេខទូរស័ព្ទ"
                                                    />
                                                </div>
                                            </div>
                                        )}

                                        <div className='grid grid-cols-2 gap-3'>
                                            <div className="col-span-1 gap-2">
                                                <label htmlFor="supplierID" className="font-NotoSansKhmer font-bold">លេខសម្គាល់ទំនាក់ទំនង</label>
                                                <input
                                                    type="text"
                                                    id="supplierID"
                                                    value={supplierId}
                                                    onChange={(e) => setSupplierId(e.target.value)}
                                                    className="input_text"
                                                    placeholder="លេខសម្គាល់ទំនាក់ទំនង"
                                                />
                                            </div>
                                            <div className="col-span-1 gap-2">
                                                <label htmlFor="email" className="font-NotoSansKhmer font-bold">អ៊ីម៉ែល</label>
                                                <input
                                                    type="text"
                                                    id="email"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    className="input_text"
                                                    placeholder="អ៊ីម៉ែល"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="groupCustomer" className="font-NotoSansKhmer font-bold">ក្រុមអតិជន: *</label>
                                        <select
                                            className='input_text'
                                            id="bank"
                                            value={groupCustomer}
                                            onChange={e => setGroupCustomer(e.target.value)}
                                        >
                                            <option value="" >សូមជ្រើសរើស</option>
                                            {group_Customer?.map((items) => (
                                                <option key={items.id} value={items.id}>
                                                    {items.group_names}
                                                </option>
                                            ))}

                                        </select>
                                    </div>
                                    <div className="col-span-2 gap-3 mt-3">
                                        <label htmlFor="description" className="font-NotoSansKhmer font-bold">ពិពណ៌នា</label>
                                        <textarea
                                            id="description"
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            className="input_text w-full py-5"
                                            placeholder="ពិពណ៌នា"
                                        />
                                    </div>
                                    <div className="flex justify-end my-3">
                                        <button type="submit" className="button_only_submit">រក្សាទុក</button>
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

export default Supplier;
