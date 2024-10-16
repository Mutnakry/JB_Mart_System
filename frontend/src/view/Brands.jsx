
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../component/Navbar';
import { toast } from 'react-toastify';
import Pagination from './pagination/Pagination';
import { FaClipboardList, FaPencilAlt } from "react-icons/fa";
import { MdDelete, MdClose } from "react-icons/md";



const Brands = () => {

    const [brand_names, setbrand_names] = useState('');
    const [description, setdescription] = useState('');
    const [error, setError] = useState('');

    //// paginate and search data
    const [brands, setStudent] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(20);

    useEffect(() => {
        getAllStudent();
    }, [page, limit, searchQuery]);

    // get all brands add paginate and search
    const getAllStudent = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:6700/api/brands', {
                params: {
                    page,
                    limit,
                    search_query: searchQuery
                }
            });
            setStudent(response.data.brands);
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
    const [selectedBrandsId, setSelectedBrandsId] = useState(null);
    // modal insert
    const openInsertModal = () => {
        setIsInsertModalOpen(true);
    };
    // modal update 
    const openUpdateModal = cat => {
        setSelectedBrandsId(cat.id);
        setdescription(cat.description);
        setbrand_names(cat.brand_names);
        setIsUpdateModalOpen(true);
    };
    // modal update 
    const UpdateTeacher = async e => {
        e.preventDefault();
        setError('');
        const values = {
            brand_names: brand_names,
            description: description,
        }
        try {
            await axios.put(`http://localhost:6700/api/brands/${selectedBrandsId}`, values);
            toast.success('កែប្រែម៉ាក់យីយោបានដោយជោគជ័យ', { autoClose: 3000 });
            getAllStudent();
            setIsUpdateModalOpen(false);
            setSelectedBrandsId(null);
            setbrand_names('');
            setdescription('');
        } catch (err) {
            console.error(err);
            setbrand_names('');
            setdescription('');
            toast.error('សូមលោកព្យាយាមម្ដងទៀត!', { autoClose: 3000 });
        }
    };


    // modal delete
    const openDeleteModal = cat => {
        setSelectedBrandsId(cat.id);
        setIsDeleteModalOpen(true);
    };

    // modale delete
    const deleteBrands = async () => {
        if (selectedBrandsId) {
            try {
                await axios.delete(`http://localhost:6700/api/brands/${selectedBrandsId}`);
                toast.success('លុបម៉ាក់យីយោបានដោយជោគជ័យ', { autoClose: 3000 });
                getAllStudent();
                setIsDeleteModalOpen(false);
                setSelectedBrandsId(null);
            } catch (err) {
                console.error(err);
                toast.error('សូមលោកព្យាយាមម្ដងទៀត !', { autoClose: 3000 });
            }
        }
    };

    // greate brands
    const CreateBrands = async (e) => {
        e.preventDefault();
        setError('');
        const values = {
            brand_names: brand_names,
            description: description,
        }
        try {
            const res = await axios.post('http://localhost:6700/api/brands', values);
            console.log(res.data);
            toast.success('បង្កើតម៉ាក់យីយោបានដោយជោគជ័យ ', { autoClose: 3000 });
            setbrand_names('');
            setdescription('');
            getAllStudent();
            setIsInsertModalOpen(false);
        } catch (err) {
            console.error(err);
            toast.error('សូមលោកព្យាយាមម្ដងទៀត !', { autoClose: 3000 });
        }
    };
    return (
        <div>
            <Navbar />
            <div className='py-16 px-2 md:ml-64 bg-white dark:bg-gray-950'>
                <div className='border-2 p-4 border-gray-200 dark:border-gray-700'>
                    <div className="flex items-center mb-3 gap-2 ">
                        <p><FaClipboardList className="text-lg " /></p>
                        <p className="font-NotoSansKhmer font-bold ">តារាងបញ្ជីម៉ាកយីហោ</p>
                    </div>
                    <div className="flex justify-end">
                        <button className="button_only_submit" onClick={openInsertModal}>+ បង្កើតម៉ាកយីហោថ្មី</button>
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

                        <table className="min-w-full table-auto">
                            <thead className="bg-blue-600/95 text-white">
                                <tr className="font-NotoSansKhmer font-bold">
                                    <th className=" px-4 py-2">លេខរៀង</th>
                                    <th className=" px-4 py-2">ឈ្មោះម៉ាកយីហោ</th>
                                    <th className=" px-4 py-2">ការណិពណ័នា</th>
                                    <th className=" px-4 py-2">សកម្មភាព</th>

                                </tr>
                            </thead>
                            {loading ? (
                                <p>Loading...</p>
                            ) : error ? (
                                <p>{error}</p>
                            ) : brands.length === 0 ? (
                                <p className="text-start py-4 px-10 text-red-500">រកមិនឃើញប្រភេទ ? {searchQuery}</p>
                            ) : (
                                <tbody>
                                    {brands.map((customer, index) => (
                                        <tr key={customer.id} className="text-sm font-NotoSansKhmer">
                                            <td className=" px-4 py-1">{index + 1}</td>
                                            <td className="px-4 py-1">{customer.brand_names}</td>
                                            <td className=" px-4 py-1">{customer.description || 'N/A'}</td>
                                            <td className="px-4  space-x-2 flex">
                                                <button
                                                    onClick={() => openDeleteModal(customer)}
                                                    className='bg-red-50 rounded-full p-2 '
                                                >
                                                    <MdDelete className='text-red-500' />
                                                </button>
                                                <button
                                                    onClick={() => openUpdateModal(customer)}
                                                    className='bg-blue-50 rounded-full p-2 '                        >
                                                    <FaPencilAlt className='text-blue-500' />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            )}
                        </table>
                        <Pagination
                            currentPage={page}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                            limit={limit}
                            setLimit={setLimit}
                        />

                    </div>

                </div>
            </div>
            {/* Insert Modal */}
            {isInsertModalOpen && (
                <div
                    className="modal"
                >
                    <div className="modal_center max-w-sm">
                        <div className="modal_title">
                            <h3 className="">ឈ្មោះម៉ាក់យីយោ</h3>
                            <MdClose className='text-2xl cursor-pointer' onClick={() => setIsInsertModalOpen(false)} />
                        </div>
                        <div className="modal_form">
                            <form class="" onSubmit={CreateBrands}>
                                <div className="">
                                    <div class="grid gap-4 mb-4 grid-cols-2">
                                        <div class="col-span-2">
                                            <label className="font-NotoSansKhmer font-bold">ឈ្មោះ: *</label>
                                            <input
                                                type="text"
                                                value={brand_names}
                                                onChange={e => setbrand_names(e.target.value)}
                                                id="price"
                                                class="input_text "
                                                placeholder="ឈ្មោះនៃប្រភេទទំនិញ" required
                                            />
                                        </div>
                                        <div class="col-span-2">
                                            <label className="font-NotoSansKhmer font-bold">ការណិពណ័នា</label>
                                            <textarea id="description"
                                                rows="4"
                                                value={description}
                                                onChange={e => setdescription(e.target.value)}
                                                class="input_text"
                                                placeholder="ការណិពណ័នា">
                                            </textarea>
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
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
            {/* Delete Modal */}
            {isDeleteModalOpen && (
                <div
                    className="modal"
                >
                    <div className="modal_center max-w-sm">
                        <div className="modal_title">
                            <h3 className="">លុបប្រម៉ាក់យីយោ</h3>

                            <MdClose className='text-2xl cursor-pointer' onClick={() => setIsDeleteModalOpen(false)} />
                        </div>
                        <div className="p-4 space-y-4">
                            <p className="text-sm ">
                                Are you sure you want to delete this Brands? This action cannot be undone.
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
                                    onClick={deleteBrands}
                                >
                                    លុប
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {/* Update Modal */}
            {isUpdateModalOpen && (
                <div
                    className="modal"
                >
                    <div className="modal_center max-w-sm">
                        <div className="modal_title">
                            <h3 className="">កែប្រែម៉ាក់យីយោ</h3>
                            <MdClose className='text-2xl cursor-pointer' onClick={() => setIsUpdateModalOpen(false)} />

                        </div>
                        <div className="modal_form">
                            <form class="" onSubmit={UpdateTeacher}>

                                <div class="grid gap-4 mb-4 grid-cols-1">
                                    <div class="col-span-2">
                                        <label className="font-NotoSansKhmer font-bold">ឈ្មោះ: *</label>
                                        <input
                                            type="text"
                                            value={brand_names}
                                            onChange={e => setbrand_names(e.target.value)}
                                            id="price"
                                            class="input_text "
                                            placeholder="ឈ្មោះនៃប្រភេទទំនិញ" required
                                        />
                                    </div>
                                    <div class="col-span-2">
                                        <label className="font-NotoSansKhmer font-bold">ការណិពណ័នា</label>
                                        <textarea id="description"
                                            rows="4"
                                            value={description}
                                            onChange={e => setdescription(e.target.value)}
                                            class="input_text"
                                            placeholder="ការណិពណ័នា">
                                        </textarea>
                                    </div>
                                </div>
                                <div className='flex items-end justify-end'>
                                    <button
                                        type="submit"
                                        className="button_only_submit"
                                    >
                                        រក្សាទុក្ខ
                                    </button>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Brands;
