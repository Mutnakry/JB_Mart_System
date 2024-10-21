
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Pagination from '../pagination/Pagination';
import { FaAlignLeft , FaPencilAlt } from "react-icons/fa";
import { MdDelete, MdClose } from "react-icons/md";



const bank = () => {
    const [error, setError] = useState('');

    //// paginate and search data
    const [bank, setStudent] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(20);

    useEffect(() => {
        getAllStudent();
    }, [page, limit, searchQuery]);

    // get all bank add paginate and search
    const getAllStudent = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:6700/api/bank', {
                params: {
                    page,
                    limit,
                    search_query: searchQuery
                }
            });
            setStudent(response.data.bank);
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
    return (
        <div>
            <div className="flex items-center mb-3 gap-2 ">
                <p><FaAlignLeft  className="text-lg " /></p>
                <p className="font-NotoSansKhmer font-bold ">តារាងបញ្ជីផ្ទេប្រាក់គណនី</p>
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
                        className="input_text w-[300px]" placeholder="ស្វែងរកប្រភេទគណនី..." />
                </div>
            </div>
            <div class="relative overflow-x-auto h-screen scrollbar-hidden">

                <table className="min-w-full table-auto">
                    <thead className="bg-blue-600/95 text-white">
                        <tr className="font-NotoSansKhmer font-bold">
                            <th className=" px-4 w-36 py-2">លេខរៀង</th>
                            <th className=" px-4 w-64 py-2">ឈ្មោះ</th>
                            <th className=" px-4 py-2">សកម្មភាព</th>

                        </tr>
                    </thead>
                    {loading ? (
                        <p>Loading...</p>
                    ) : error ? (
                        <p>{error}</p>
                    ) : bank.length === 0 ? (
                        <p className="text-start py-4 px-10 text-red-500">រកមិនឃើញប្រភេទ ? {searchQuery}</p>
                    ) : (
                        <tbody>
                            {bank.map((customer, index) => (
                                <tr key={customer.id} className="text-sm font-NotoSansKhmer hover:scale-y-110 duration-100">
                                    <td className=" px-4 py-1">{index + 1}</td>
                                    <td className="px-4 py-1">{customer.bank_names}</td>
                                   
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
    );
};

export default bank;
