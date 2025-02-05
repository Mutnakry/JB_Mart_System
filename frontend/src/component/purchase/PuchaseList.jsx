// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import Pagination from '../pagination/Pagination';
// import { FaClipboardList, FaPencilAlt } from "react-icons/fa";
// import { MdDelete, MdClose } from "react-icons/md";
// import { motion, AnimatePresence } from "framer-motion";
// import { formatDateToKhmer } from '../ForMartDateToKHmer';
// import { Link } from 'react-router-dom'
// import { toast } from 'react-toastify';



// const Dashboard = () => {
//     const [error, setError] = useState('');

//     //// paginate and search data
//     const [purchases, setPuchases] = useState([]);
//     const [searchQuery, setSearchQuery] = useState("");
//     const [loading, setLoading] = useState(false);
//     const [totalPages, setTotalPages] = useState(0);
//     const [page, setPage] = useState(1);
//     const [limit, setLimit] = useState(20);

//     useEffect(() => {
//         getAllPuchase();
//     }, [page, limit, searchQuery]);

//     const getAllPuchase = async () => {
//         setLoading(true);
//         try {
//             const response = await axios.get('http://localhost:6700/api/purchase', {
//                 params: {
//                     page,
//                     limit,
//                     search_query: searchQuery
//                 }
//             });
//             setPuchases(response.data.purchase);
//             setTotalPages(response.data.totalPages);
//             setError(null);
//         } catch (error) {
//             console.error('Error fetching data:', error);
//             setError(error.response?.data?.error || 'Error fetching categories data');
//         } finally {
//             setLoading(false);
//         }
//     };

//     /// page total
//     const handlePageChange = (newPage) => {
//         if (newPage > 0 && newPage <= totalPages) {
//             setPage(newPage);
//         }
//     };
//     //// search data
//     const handleSearch = (event) => {
//         if (setPage(0)) {
//             alert('not found!')
//         } else {
//             setSearchQuery(event.target.value);
//             setPage(1);
//         }

//     };




//     /// show modal insert
//     const [IsModalUpdateStatus, setIsModalUpdateStatus] = useState(false);
//     const [selectedpurchasesId, setSelectedpurchasesId] = useState(null);
//     const [status, setStatus] = useState('');

//     // modal update 
//     const openUpdateModal = cat => {
//         setSelectedpurchasesId(cat.purchasedetail_id);
//         setStatus(cat.status);
//         console.log(cat.status);
//         setIsModalUpdateStatus(true);
//     };
//     // modal update 
//     const UpdatePurchase = async (e) => {
//         e.preventDefault();
//         setError('');
//         const values = {
//             status: status,
//         };
//         try {
//             await axios.put(`http://localhost:6700/api/purchase/status/${selectedpurchasesId}`, values);
//             toast.success('កែប្រែស្ថានភាពទិញបានដោយជោគជ័យ', { autoClose: 3000 });
//             console.log(status);
//             getAllPuchase();
//             setIsModalUpdateStatus(false);
//             setSelectedpurchasesId(null);
//         } catch (err) {
//             console.error(err);
//             toast.error('សូមលោកព្យាយាមម្ដងទៀត!', { autoClose: 3000 });
//         }
//     };




//     const rowAnimation = {
//         hidden: { opacity: 0, y: -20 },
//         visible: { opacity: 1, y: 0 },
//         exit: { opacity: 0, y: 20 }
//     };
//     return (
//         <div>
//             <div className=''>
//                 <div className="flex items-center gap-2 ">
//                     <p><FaClipboardList className="text-lg " /></p>
//                     <p className="font-NotoSansKhmer font-bold ">តារាងបញ្ជីប្រភេទទំនិញ</p>
//                 </div>
//                 <div className="flex justify-end">
//                     <Link className="button_only_submit" to="/createpurchase">
//                         + បង្កើតម៉ាកយីហោថ្មី
//                     </Link>
//                 </div>

//                 <div className="flex justify-between items-center my-3">
//                     <div className="flex flex-col gap-2 font-bold font-NotoSansKhmer">
//                         <label htmlFor="">ច្រោះតាមចំនួន</label>
//                         <select
//                             value={limit}
//                             onChange={(e) => setLimit(Number(e.target.value))}
//                             className="input_text w-[100px]">
//                             {[25, 50, 100, 500].map(value => (
//                                 <option key={value} value={value}>{value}</option>
//                             ))}
//                         </select>
//                     </div>
//                     <div>
//                         <input type="text"
//                             value={searchQuery}
//                             onChange={handleSearch}
//                             className="input_text w-[300px]" placeholder="ស្វែងរកម៉ាកយីហោ..." />
//                     </div>
//                 </div>
//                 <div class="relative overflow-x-auto h-screen scrollbar-hidden">
//                     <AnimatePresence>
//                         <table className="min-w-full table-auto">
//                             <thead className="bg-blue-600/95 text-white">
//                                 <tr className="font-NotoSansKhmer font-bold">
//                                     <th className=" px-4 py-2">លេខរៀង</th>
//                                     <th className=" px-4 py-2">កាលបរិច្ឆេទ</th>
//                                     <th className=" px-4 py-2">រូបភាព</th>
//                                     <th className=" px-4 py-2">ផលិតផល</th>
//                                     <th className=" px-4 py-2">ថ្លៃទិញឯកតា</th>
//                                     <th className=" px-4 py-2">តម្លៃលក់</th>
//                                     <th className=" px-4 py-2">ស្ថានភាពទិញ</th>
//                                     <th className=" px-4 py-2">ចំនួនក្នុងស្តុក</th>
//                                     <th className=" px-4 py-2">បញ្ចុះតម្លៃ</th>
//                                     <th className=" px-4 py-2">ពន្ធ</th>
//                                     <th className=" px-4 py-2">សរុប</th>
//                                     <th className=" px-4 py-2">បន្ថែមដោយ</th>
//                                     <th className=" px-4 py-2">សកម្មភាព</th>

//                                 </tr>
//                             </thead>
//                             {loading ? (
//                                 <p>Loading...</p>
//                             ) : error ? (
//                                 <p>{error}</p>
//                             ) : purchases.length === 0 ? (
//                                 <p className="text-start py-4 px-10 text-red-500">រកមិនឃើញប្រភេទ ? {searchQuery}</p>
//                             ) : (
//                                 <tbody>
//                                     {purchases.map((purchase, index) => (
//                                         <motion.tr key={purchase.id}
//                                             initial="hidden"
//                                             animate="visible"
//                                             exit="exit"
//                                             variants={rowAnimation}
//                                             transition={{ duration: 0.3 }}
//                                             className="text-sm font-NotoSansKhmer hover:scale-y-110 duration-100">
//                                             <td className="px-4 py-1">{index + 1}</td>
//                                             <td className="px-4 py-1">{formatDateToKhmer(new Date(purchase.date_by))}</td>
//                                             <td>
//                                                 <img src={`http://localhost:6700/image/${purchase.image}`} alt="Character" class="w-12 h-12 rounded-lg object-contain" />
//                                             </td>
//                                             <td className="px-4 py-1">{purchase.pro_names}</td>
//                                             <td className="px-4 py-1">{purchase.cost_price} $</td>
//                                             <td className="px-4 py-1">{purchase.excluded_tax} $</td>
//                                             <td className="px-4 text-center whitespace-nowrap py-1">
//                                                 <button onClick={() => openUpdateModal(purchase)}>
//                                                     {purchase.status === 'active' ? (
//                                                         <span className='bg-red-500 py-1 px-4 rounded-lg text-white'>
//                                                             កំពុងរងចាំ
//                                                         </span>
//                                                     ) : purchase.status === 'pending' ? (
//                                                         <span className='bg-yellow-500 py-1 px-4 rounded-lg text-white'>
//                                                             បានបញ្ជាទិញ
//                                                         </span>
//                                                     ) : purchase.status === 'completed' ? (
//                                                         <span className='bg-green-500 py-1 px-4 rounded-lg text-white'>
//                                                             បានទទួល
//                                                         </span>
//                                                     ) : (
//                                                         <span className='bg-gray-500 py-1 px-4 rounded-lg text-white'>
//                                                             មិនមានស្ថានភាព
//                                                         </span>
//                                                     )}
//                                                 </button>
//                                             </td>
//                                             <td className="px-4 py-1 text-center">{purchase.qty}</td>
//                                             <td className="px-4 py-1 text-center">{purchase.discount} $</td>
//                                             <td className="px-4 py-1 text-center">{purchase.included_tax} $</td>
//                                             <td className="px-4 py-1 text-center">{purchase.total} $</td>
//                                             <td className="px-4 py-1 text-center">{purchase.user_at || 'Unknown'}</td>
//                                             <td className="px-4  space-x-2 flex">
//                                                 <button
//                                                     className='bg-red-300 p-2 '
//                                                 >
//                                                     <MdDelete className='text-red-500' />
//                                                 </button>
//                                                 {purchase.status === 'completed' ? (
//                                                     <span className="bg-blue-200 p-2 cursor-not-allowed opacity-50">
//                                                         <FaPencilAlt className='text-blue-500' />
//                                                     </span>
//                                                 ) : (
//                                                     <Link className="bg-blue-300 p-2" to={`/purchase/${purchase.purchasedetail_id}`}>
//                                                         <FaPencilAlt className='text-blue-500' />
//                                                     </Link>
//                                                 )}



//                                             </td>

//                                         </motion.tr>
//                                     ))}
//                                 </tbody>
//                             )}

//                         </table>
//                     </AnimatePresence>

//                     <Pagination
//                         currentPage={page}
//                         totalPages={totalPages}
//                         onPageChange={handlePageChange}
//                         limit={limit}
//                         setLimit={setLimit}
//                     />

//                 </div>
//             </div>
//             <AnimatePresence>
//                 {IsModalUpdateStatus && (
//                     <motion.div
//                         className="fixed top-0 left-0 right-0 z-50 flex items-start justify-center w-full h-full bg-black bg-opacity-30"
//                         initial={{ opacity: 0, scale: 0.8 }}
//                         animate={{ opacity: 1, scale: 1 }}
//                         exit={{ opacity: 0, scale: 0.8 }}
//                         transition={{ duration: 0.2 }}
//                     >
//                         <div className="relative w-full bg-white shadow mt-20 dark:bg-gray-700 max-w-lg">
//                             <div className="modal_title">
//                                 <h3 className="">កែប្រែផលិតផលមកដល់ស្តុក</h3>
//                                 <MdClose className='text-2xl cursor-pointer' onClick={() => setIsModalUpdateStatus(false)} />
//                             </div>
//                             <div className="modal_form">
//                                 <form class="py-6" onSubmit={UpdatePurchase}>
//                                     <div class="grid gap-4 mb-4 grid-cols-1">
//                                         <div className="col-span-1 space-y-2">
//                                             <label htmlFor="" className="font-bold font-NotoSansKhmer">ស្ថានភាព: *</label>
//                                             <select
//                                                 required
//                                                 value={status}
//                                                 onChange={(e) => setStatus(e.target.value)}
//                                                 className="input_text font-NotoSansKhmer"
//                                             >
//                                                 <option value="completed">បានទទួល</option>
//                                                 <option value="active">កំពុងរងចាំ</option>
//                                                 <option value="pending">បានបញ្ជាទិញ</option>
//                                             </select>
//                                         </div>
//                                     </div>
//                                     <div className='flex justify-end'>

//                                         <button
//                                             type="submit"
//                                             className="button_only_submit "
//                                         >
//                                             រក្សាទុក្ខ
//                                         </button>
//                                     </div>
//                                 </form>
//                             </div>
//                         </div>
//                     </motion.div>
//                 )}
//             </AnimatePresence>
//         </div>
//     );
// };

// export default Dashboard;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Pagination from '../pagination/Pagination';
import { FaClipboardList, FaPencilAlt } from "react-icons/fa";
import { MdDelete, MdClose } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import { formatDateToKhmer } from '../ForMartDateToKHmer';
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';
import { IoPrint } from 'react-icons/io5';

const Dashboard = () => {
    const [error, setError] = useState('');

    //// paginate and search data
    const [purchases, setPuchases] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(25);
    const [userRol, setUserRol] = useState('');

    useEffect(() => {
        setUserRol(localStorage.getItem('user_rol') || '');
        getAllPuchase();
    }, [page, limit, searchQuery]);

    const getAllPuchase = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:6700/api/purchase/puchase', {
                params: {
                    page,
                    limit,
                    search_query: searchQuery
                }
            });

            console.log(response.data); // Debugging: Check the response structure

            if (response.data && Array.isArray(response.data.purchase)) {
                setPuchases(response.data.purchase);
                setTotalPages(response.data.totalPages || 1); // Ensure totalPages has a fallback
                setError(null);
            } else {
                setError('Invalid data structure received from the API');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            setError(error.response?.data?.error || 'Error fetching categories data');
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
    const [IsModalUpdateStatus, setIsModalUpdateStatus] = useState(false);
    const [selectedpurchasesId, setSelectedpurchasesId] = useState(null);
    const [status, setStatus] = useState('');


    // modal update 
    const openUpdateModal = cat => {
        setSelectedpurchasesId(cat.purchasedetail_id);
        setStatus(cat.status);
        setIsModalUpdateStatus(true);
    };



    // const today = new Date().toISOString().split('T')[0];
    const today = new Date();
    const [IsModalDelete, setIsModalDelete] = useState(false);
    const [createDate, setCreateDate] = useState('');

    // modal update 
    const openDeletePurchase = cat => {
        setSelectedpurchasesId(cat.purchasedetail_id);
        // setCreateDate(cat.create_at);
        setCreateDate(cat.purchase_date);
        setIsModalDelete(true);
    };


    const deletePurchase = async () => {
        if (selectedpurchasesId) {
            const createDateObj = new Date(createDate);
            const expiryDate = new Date(createDateObj);
            expiryDate.setDate(createDateObj.getDate() + 45);

            // Compare today's date with expiryDate
            if (today < expiryDate) {
                toast.error('មិនអាចលុបបានទេក្នុងរយៈពេល 45 ថ្ងៃនៃការបង្កើត!', { autoClose: 3000 });
                // setIsModalDelete(false); // Close the modal
                // setSelectedpurchasesId(null)
            } else {
                try {
                    // Proceed with deleting the purchase if it's more than 30 days
                    await axios.delete(`http://localhost:6700/api/purchase/${selectedpurchasesId}`);
                    toast.success('Successfully deleted!', { autoClose: 3000 });
                    setIsModalDelete(false); // Close the modal
                } catch (err) {
                    console.error(err);
                    toast.error('An error occurred. Please try again!', { autoClose: 3000 });
                }
            }
        }
    };



    // modal update 
    const UpdatePurchase = async (e) => {
        e.preventDefault();
        setError('');
        const values = {
            status: status,
        };
        try {
            await axios.put(`http://localhost:6700/api/purchase/status/${selectedpurchasesId}`, values);
            toast.success('កែប្រែស្ថានភាពទិញបានដោយជោគជ័យ', { autoClose: 3000 });
            console.log(status);
            getAllPuchase();
            setIsModalUpdateStatus(false);
            setSelectedpurchasesId(null);
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
            <div className=''>
                <div className="flex items-center gap-2 ">
                    <p><FaClipboardList className="text-lg " /></p>
                    <p className="font-NotoSansKhmer font-bold ">តារាងបញ្ជីប្រភេទទំនិញ</p>
                </div>
                <div className="flex justify-end">
                    {(userRol === 'superadmin' || userRol === 'admin') ? (
                        <Link className="button_only_submit" to="/createpurchase">
                            + បង្កើតម៉ាកយីហោថ្មី
                        </Link>
                    ) : (
                        <span className="button_only_submit cursor-not-allowed">
                            + បង្កើតម៉ាកយីហោថ្មី
                        </span>
                    )}
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
                            className="input_text w-[300px]" placeholder="ស្វែងរកម៉ាកយីហោ..." />
                    </div>
                </div>
                <div class="relative overflow-x-auto h-screen scrollbar-hidden">
                    <AnimatePresence>
                        <table className="min-w-full table-auto">
                            <thead className="bg-blue-600/95 text-white">
                                <tr className="font-NotoSansKhmer font-bold">
                                    <th className=" px-4 py-2">លេខរៀង</th>
                                    <th className=" px-4 py-2">កាលបរិច្ឆេទ</th>
                                    <th className=" px-4 py-2">អ្នកផ្គត់ផ្កង់</th>
                                    <th className=" px-4 py-2">ចំនួនដែលបានបន្ថែម</th>
                                    <th className=" px-4 py-2">ស្ថានភាពទិញ</th>
                                    <th className=" px-4 py-2">ពន្ធ</th>
                                    <th className=" px-4 py-2">បញ្ចុះតម្លៃ</th>
                                    <th className=" px-4 py-2">សរុប</th>
                                    <th className=" px-4 py-2">បានបង់សរុប</th>
                                    <th className=" px-4 py-2">នៅនៅខ្វះ</th>
                                    <th className=" px-4 py-2">បន្ថែមដោយ</th>
                                    <th className=" px-4 py-2">សកម្មភាព</th>

                                </tr>
                            </thead>
                            {loading ? (
                                <p>Loading...</p>
                            ) : error ? (
                                <p>{error}</p>
                            ) : purchases.length === 0 ? (
                                <p className="text-start py-4 px-10 text-red-500">រកមិនឃើញប្រភេទ ? {searchQuery}</p>
                            ) : (
                                <tbody>
                                    {purchases?.map((purchase, index) => (
                                        <motion.tr key={purchase.id}
                                            initial="hidden"
                                            animate="visible"
                                            exit="exit"
                                            variants={rowAnimation}
                                            transition={{ duration: 0.3 }}
                                            className="text-sm font-NotoSansKhmer hover:scale-y-110 duration-100">
                                            <td className="px-4 py-1">{index + 1}</td>
                                            <td className="px-4 py-1">{formatDateToKhmer(new Date(purchase.purchase_date))}</td>

                                            <td className="px-4 py-1">{purchase.business_names} {purchase.supplier_name}</td>
                                            {/* <td className="px-4 py-1 text-center">{purchase.product_names}</td> */}
                                            <td className="px-4 py-1">{purchase.total_qty}</td>
                                            <td className="px-4 text-center whitespace-nowrap py-1">
                                                {(userRol === 'superadmin' || userRol === 'admin') ? (
                                                    <button onClick={() => openUpdateModal(purchase)}>
                                                        {purchase.status === 'active' ? (
                                                            <span className='bg-red-500 py-1 px-4 rounded text-white'>
                                                                កំពុងរងចាំ
                                                            </span>
                                                        ) : purchase.status === 'pending' ? (
                                                            <span className='bg-yellow-500 py-1 px-4 rounded text-white'>
                                                                បានបញ្ជាទិញ
                                                            </span>
                                                        ) : purchase.status === 'completed' ? (
                                                            <span className='bg-green-500 py-1 px-4 rounded text-white'>
                                                                បានទទួល
                                                            </span>
                                                        ) : (
                                                            <span className='bg-gray-500 py-1 px-4 rounded text-white'>
                                                                មិនមានស្ថានភាព
                                                            </span>
                                                        )}
                                                    </button>
                                                ) : (
                                                    <button className='cursor-not-allowed opacity-50'>
                                                        {purchase.status === 'active' ? (
                                                            <span className='bg-red-500 py-1 px-4 rounded text-white'>
                                                                កំពុងរងចាំ
                                                            </span>
                                                        ) : purchase.status === 'pending' ? (
                                                            <span className='bg-yellow-500 py-1 px-4 rounded text-white'>
                                                                បានបញ្ជាទិញ
                                                            </span>
                                                        ) : purchase.status === 'completed' ? (
                                                            <span className='bg-green-500 py-1 px-4 rounded text-white'>
                                                                បានទទួល
                                                            </span>
                                                        ) : (
                                                            <span className='bg-gray-500 py-1 px-4 rounded text-white'>
                                                                មិនមានស្ថានភាព
                                                            </span>
                                                        )}
                                                    </button>
                                                )}
                                            </td>
                                            <td className="px-4 py-4 text-center">{purchase.total_include_tax} $</td>
                                            <td className="px-4 py-1 text-center">{purchase.amount_discount} $</td>
                                            <td className="px-4 py-1">{purchase.total_amount} $</td>
                                            <td className="px-4 py-1 text-center">{purchase.amount_pay} $</td>
                                            <td className="px-4 py-1 text-center">{((purchase.total_amount) - (purchase.amount_pay)).toFixed(2)} $</td>
                                            <td className="px-4 py-1 text-center">{purchase.user_at || 'Unknown'}</td>
                                            {(userRol === 'superadmin' || userRol === 'admin') ? (
                                                <td className="px-4  space-x-2 flex">
                                                    <button
                                                        className='bg-red-300 p-2 '
                                                        onClick={() => openDeletePurchase(purchase)}
                                                    >
                                                        <MdDelete className='text-red-500' />
                                                    </button>
                                                    {purchase.status === 'completed' ? (
                                                        <span className="bg-blue-200 p-2 cursor-not-allowed opacity-50">
                                                            <FaPencilAlt className='text-blue-500' />
                                                        </span>
                                                    ) : (
                                                        <Link className="bg-blue-300 p-2" to={`/purchase/${purchase.purchasedetail_id}`}>
                                                            <FaPencilAlt className='text-blue-500' />
                                                        </Link>
                                                    )}

                                                    <Link
                                                        to={`/createpurchase/${purchase.purchasedetail_id}`}
                                                        className="flex items-center gap-1 p-2 font-bold text-white bg-green-300 hover:bg-green-400"
                                                        onClick={() => openModalPrintPage(customer)}
                                                    >
                                                        <IoPrint />
                                                    </Link>
                                                </td>
                                            ) : (
                                                <td className="px-4  space-x-2 flex">
                                                    <button
                                                        className='bg-red-300 p-2 cursor-not-allowed opacity-50'
                                                    >
                                                        <MdDelete className='text-red-500' />
                                                    </button>
                                                    <span className="bg-blue-200 p-2 cursor-not-allowed opacity-50 ">
                                                        <FaPencilAlt className='text-blue-500' />
                                                    </span>

                                                    <Link
                                                        to={`/createpurchase/${purchase.purchasedetail_id}`}
                                                        className="flex items-center gap-1 p-2 font-bold text-white bg-green-300 hover:bg-green-400"
                                                        onClick={() => openModalPrintPage(customer)}
                                                    >
                                                        <IoPrint />
                                                    </Link>
                                                </td>
                                            )}
                                        </motion.tr>

                                    ))}
                                </tbody>
                            )}

                            <motion.tr
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                variants={rowAnimation}
                                transition={{ duration: 0.3 }}
                                className='bg-gray-300'>
                                <td colSpan="4" className="font-bold text-center h-20">សរុប :</td>
                                <td>
                                    {purchases.filter(purchase => purchase.status === 'active').length > 0 && (
                                        <span className="text-red-500">
                                            កំពុងរងចាំ: {purchases.filter(purchase => purchase.status === 'active').length}
                                        </span>
                                    )}
                                    <br />
                                    {purchases.filter(purchase => purchase.status === 'pending').length > 0 && (
                                        <span className="text-yellow-500">
                                            បានបញ្ជាទិញ: {purchases.filter(purchase => purchase.status === 'pending').length}
                                        </span>
                                    )}
                                    <br />
                                    {purchases.filter(purchase => purchase.status === 'completed').length > 0 && (
                                        <span className="text-green-500">
                                            បានទទួល: {purchases.filter(purchase => purchase.status === 'completed').length}
                                        </span>
                                    )}
                                </td>
                                <td className="font-bold px-4 py-1">
                                    {purchases
                                        .reduce((total, customer) => total + (Number(customer.total_include_tax) || 0), 0)
                                        .toLocaleString('en-US', {
                                            style: 'decimal',
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2,
                                        })}{' '}
                                    $
                                </td>
                                <td className="font-bold px-4 py-1">
                                    {purchases
                                        .reduce((total, customer) => total + (Number(customer.amount_discount) || 0), 0)
                                        .toLocaleString('en-US', {
                                            style: 'decimal',
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2,
                                        })}{' '}
                                    $
                                </td>

                                <td className="font-bold px-4 py-1">
                                    {purchases
                                        .reduce((total, customer) => total + (Number(customer.total_amount) || 0), 0)
                                        .toLocaleString('en-US', {
                                            style: 'decimal',
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2,
                                        })}{' '}
                                    $
                                </td>

                                <td className="font-bold px-4 py-1">
                                    {purchases
                                        .reduce((total, customer) => total + (Number(customer.amount_pay) || 0), 0)
                                        .toLocaleString('en-US', {
                                            style: 'decimal',
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2,
                                        })}{' '}
                                    $
                                </td>
                                <td className="font-bold px-4 py-1">
                                    {purchases
                                        .reduce((total, customer) => total + ((Number(customer.total_amount) - (Number(customer.amount_pay))) || 0), 0)
                                        .toLocaleString('en-US', {
                                            style: 'decimal',
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2,
                                        })}{' '}
                                    $
                                </td>
                                <td colSpan="3"></td>
                            </motion.tr>
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
            {/* update ststus */}
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
                                <form class="py-6" onSubmit={UpdatePurchase}>
                                    <div class="grid gap-4 mb-4 grid-cols-1">
                                        <div className="col-span-1 space-y-2">
                                            <label htmlFor="" className="font-bold font-NotoSansKhmer">ស្ថានភាព: *</label>
                                            <select
                                                required
                                                value={status}
                                                onChange={(e) => setStatus(e.target.value)}
                                                className="input_text font-NotoSansKhmer"
                                            >
                                                <option value="completed">បានទទួល</option>
                                                <option value="active">កំពុងរងចាំ</option>
                                                <option value="pending">បានបញ្ជាទិញ</option>
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
            {/* dlete purchase */}

            <AnimatePresence>
                {IsModalDelete && (
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
                                <MdClose className='text-2xl cursor-pointer' onClick={() => setIsModalDelete(false)} />
                            </div>
                            <div className="p-4 space-y-4">
                                <p className="text-md ">
                                    តើអ្នកប្រាកដថាចង់លុបផលិតផលនេះទេ? សកម្មភាពនេះមិនអាចត្រឡប់វិញបានទេ។
                                </p>
                                <div className="flex justify-end space-x-2">
                                    <button
                                        type="button"
                                        className="button_only_close"
                                        onClick={() => setIsModalDelete(false)}
                                    >
                                        មិនលុប
                                    </button>
                                    <button
                                        type="button"
                                        className="button_only_submit"
                                        onClick={deletePurchase}
                                    >
                                        លុប
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Dashboard;
