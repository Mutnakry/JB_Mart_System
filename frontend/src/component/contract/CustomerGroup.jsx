
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Pagination from '../pagination/Pagination';
import { FaLayerGroup, FaPencilAlt, FaMoneyBillAlt, FaBookOpen, FaPowerOff } from "react-icons/fa";
import { MdDelete, MdClose, MdOutlineMoneyOff } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";



const group_customer = () => {
    const [group_Names, setGroup_Names] = useState("");
    const [discount, setDiscount] = useState("");
    const [detail, setDetail] = useState(null);
    const [error, setError] = useState('');
    const [userLoginNames, setUserLoginNames] = useState('');

    //// paginate and search data
    const [group_customer, setGroup_customer] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(20);

    useEffect(() => {
        setUserLoginNames(localStorage.getItem('user_names') || '');
        getAllGroupCustomer();
    }, [page, limit, searchQuery]);

    // get all group_customer add paginate and search
    const getAllGroupCustomer = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:6700/api/group_customer', {
                params: {
                    page,
                    limit,
                    search_query: searchQuery
                }
            });
            setGroup_customer(response.data.group_customer);
            console.log(response.data)
            setTotalPages(response.data.totalPages);
            setError(null);
        } catch (error) {
            setError('Error fetching categories data');
        } finally {
            setLoading(false);
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
            setPage(1);
        }

    };


    /// show modal insert
    const [isInsertModalOpen, setIsInsertModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [selectedgroup_customerId, setSelectedgroup_customerId] = useState(null);
    // modal insert
    const openInsertModal = () => {
        setIsInsertModalOpen(true);
    };
    // modal update 
    const openUpdateModal = cat => {
        setSelectedgroup_customerId(cat.id);
        setGroup_Names(cat.group_names);
        setDetail(cat.detail);
        setDiscount(cat.discount);
        setIsUpdateModalOpen(true);
    };
    // modal update 
    const UpdateGroup_Customer = async e => {
        e.preventDefault();
        setError('');
        const values = {
            group_names: group_Names,
            discount: discount,
            detail: detail,
            user_at: userLoginNames
        }
        try {
            await axios.put(`http://localhost:6700/api/group_customer/${selectedgroup_customerId}`, values);
            toast.success('កែប្រែក្រុមបានដោយជោគជ័យ', { autoClose: 3000 });
            getAllGroupCustomer();
            setIsUpdateModalOpen(false);
            setSelectedgroup_customerId(null);
            setDetail('');
            setDiscount("");
            setGroup_Names("");
        } catch (err) {
            console.error(err);
            toast.error('សូមលោកព្យាយាមម្ដងទៀត!', { autoClose: 3000 });
        }
    };


    // modal delete
    const openDeleteModal = cat => {
        setSelectedgroup_customerId(cat.id);
        setIsDeleteModalOpen(true);
    };

    // modale delete
    const deletegroup_customer = async () => {
        if (selectedgroup_customerId) {
            try {
                await axios.delete(`http://localhost:6700/api/group_customer/${selectedgroup_customerId}`);
                toast.success('លុបក្រុមបានដោយជោគជ័យ', { autoClose: 3000 });
                getAllGroupCustomer();
                setIsDeleteModalOpen(false);
                setSelectedgroup_customerId(null);
            } catch (err) {
                console.error(err);
                toast.error('សូមលោកព្យាយាមម្ដងទៀត !', { autoClose: 3000 });
            }
        }
    };

    // greate group_customer
    const Creategroup_customer = async (e) => {
        e.preventDefault();
        setError('');
        const values = {
            group_names: group_Names,
            discount: discount,
            detail: detail,
            user_at: userLoginNames
        }
        try {
            const res = await axios.post('http://localhost:6700/api/group_customer', values);
            console.log(res.data);
            toast.success('បង្កើតក្រុមបានដោយជោគជ័យ ', { autoClose: 3000 });
            setDetail('');
            setDiscount("");
            setGroup_Names("");
            getAllGroupCustomer();
            setIsInsertModalOpen(false);
        } catch (err) {
            console.error(err);
            toast.error('សូមលោកព្យាយាមម្ដងទៀត !', { autoClose: 3000 });
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
                <p><FaLayerGroup className="text-lg " /></p>
                <p className="font-NotoSansKhmer font-bold ">តារាងបញ្ជីក្រុម</p>
            </div>
            <div className="flex justify-end">
                <button className="button_only_submit" onClick={openInsertModal}>+ បង្កើតក្រុមថ្មី</button>
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
                        className="input_text w-[300px]" placeholder="ស្វែងរកក្រុម..." />
                </div>
            </div>
            <div class="relative overflow-x-auto h-screen scrollbar-hidden">
                <AnimatePresence>
                    <table className="min-w-full table-auto">
                        <thead className="bg-blue-600/95 text-white">
                            <tr className="font-NotoSansKhmer font-bold">
                                <th className=" px-4 py-2">លេខរៀង</th>
                                <th className=" px-4 py-2">ឈ្មោះក្រុម</th>
                                <th className=" px-4 py-2">បញ្ចុំតម្លៃថេរ</th>
                                <th className=" px-4 py-2">ព័ត៌មានលម្អិតក្រុម</th>
                                <th className=" px-4 py-2">បានបន្ថែមដោយ</th>
                                <th className=" px-4 py-2 text-center">សកម្មភាព</th>

                            </tr>
                        </thead>
                        {loading ? (
                            <p>Loading...</p>
                        ) : error ? (
                            <p>{error}</p>
                        ) : group_customer.length === 0 ? (
                            <p className="text-start py-4 px-10 text-red-500">រកមិនឃើញប្រភេទ ? {searchQuery}</p>
                        ) : (
                            <tbody>
                                {group_customer.map((customer, index) => (
                                    <motion.tr
                                        key={customer.id}
                                        initial="hidden"
                                        animate="visible"
                                        exit="exit"
                                        variants={rowAnimation}
                                        transition={{ duration: 0.3 }}
                                        className="text-sm font-NotoSansKhmer hover:scale-y-110 duration-100">
                                        <td className=" px-4 py-1">{index + 1}</td>
                                        <td className="px-4 py-1">{customer.group_names}</td>
                                        <td className="px-4 py-1">{customer.discount} $</td>
                                        <td className="px-4 py-1">{customer.detail || 'N/A'}</td>
                                        <td className="px-4 py-1">{customer.user_at}</td>
                                        <td className="px-4  space-x-2 flex">
                                            <button
                                                onClick={() => openUpdateModal(customer)}
                                                className='bg-blue-300 p-2 flex text-xs text-white'                        >
                                                <FaPencilAlt className='text-blue-500 mr-2' /> កែសម្រួល
                                            </button>
                                            <button
                                                onClick={() => openDeleteModal(customer)}
                                                className='bg-red-300 p-2  flex text-xs text-white'
                                            >
                                                <FaPowerOff className='text-red-500 mr-2' /> លុប
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
                                <form class="" onSubmit={Creategroup_customer}>
                                    <div className='grid grid-cols-2 gap-3'>

                                        <div className="col-span-1 gap-2">
                                            <label htmlFor="email" className="font-NotoSansKhmer font-bold">
                                                ឈ្មោះក្រុម
                                            </label>
                                            <input
                                                type="text"

                                                value={group_Names}
                                                onChange={(e) => setGroup_Names(e.target.value)}
                                                className="input_text"
                                                required
                                                placeholder="ឈ្មោះក្រុម"
                                            />
                                        </div>
                                        <div className="col-span-1 gap-2">
                                            <label htmlFor="email" className="font-NotoSansKhmer font-bold">
                                                បញ្ចុំតម្លៃជាថេរ
                                            </label>
                                            <input
                                                type="number"
                                                id="email"
                                                required
                                                value={discount}
                                                onChange={(e) => setDiscount(e.target.value)}
                                                className="input_text"
                                                placeholder="0.00$"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-span-2 gap-3 mt-3">
                                        <label htmlFor="description" className="font-NotoSansKhmer font-bold">
                                            ពិពណ៌នា
                                        </label>
                                        <textarea
                                            id="description"
                                            value={detail}
                                            onChange={(e) => setDetail(e.target.value)}
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
                                <h3 className="">លុបប្រក្រុម</h3>

                                <MdClose className='text-2xl cursor-pointer' onClick={() => setIsDeleteModalOpen(false)} />
                            </div>
                            <div className="p-4 space-y-4">
                                <p className="text-sm ">
                                    Are you sure you want to delete this group_customer? This action cannot be undone.
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
                                        onClick={deletegroup_customer}
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
                                <h3 className="">កែប្រែក្រុម</h3>
                                <MdClose className='text-2xl cursor-pointer' onClick={() => setIsUpdateModalOpen(false)} />

                            </div>
                            <div className="modal_form">
                                <form class="" onSubmit={UpdateGroup_Customer}>

                                    <div className='grid grid-cols-2 gap-3'>

                                        <div className="col-span-1 gap-2">
                                            <label htmlFor="email" className="font-NotoSansKhmer font-bold">
                                                ឈ្មោះក្រុម
                                            </label>
                                            <input
                                                type="text"

                                                value={group_Names}
                                                onChange={(e) => setGroup_Names(e.target.value)}
                                                className="input_text"
                                                required
                                                placeholder="ឈ្មោះក្រុម"
                                            />
                                        </div>
                                        <div className="col-span-1 gap-2">
                                            <label htmlFor="email" className="font-NotoSansKhmer font-bold">
                                                បញ្ចុំតម្លៃជាថេរ
                                            </label>
                                            <input
                                                type="number"
                                                id="email"
                                                required
                                                value={discount}
                                                onChange={(e) => setDiscount(e.target.value)}
                                                className="input_text"
                                                placeholder="0.00$"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-span-2 gap-3 mt-3">
                                        <label htmlFor="description" className="font-NotoSansKhmer font-bold">
                                            ពិពណ៌នា
                                        </label>
                                        <textarea
                                            id="description"
                                            value={detail}
                                            onChange={(e) => setDetail(e.target.value)}
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

export default group_customer;
