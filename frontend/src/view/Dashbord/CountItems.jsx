import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { API_URL } from '../../service/api'

function CountItems() {
    const [error, setError] = useState(null);
    const [constprice, setCostPrice] = useState([]);
    const [sum_order, setSum_order] = useState([]);
    const [Products, setProducts] = useState([]);
    const [CountCustomer, setCountCustomer] = useState([]);
    const [sumPurchasePrice, setSumPurchaseprice] = useState([]);
    useEffect(() => {
        getCostprice(); /// ចំណាយ
    }, [])

    const getCostprice = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/dashbord/cost`);
            const count_customer = await axios.get(`${API_URL}/api/dashbord/count_customer`);
            const sumorder = await axios.get(`${API_URL}/api/dashbord/sum_order`);
            const countProduct = await axios.get(`${API_URL}/api/dashbord/countproduct`);
            const Sum_PurchasePrice = await axios.get(`${API_URL}/api/dashbord/sum_purchase`);
            console.log(Sum_PurchasePrice.data)
            setSumPurchaseprice(Sum_PurchasePrice.data);
            setProducts(countProduct.data);
            setCostPrice(response.data);
            setCountCustomer(count_customer.data);
            setSum_order(sumorder.data)
        } catch (error) {
            setError('Error fetching categories data');
            console.error(error);
        }
    };

    return (
        <div>
            <div class="">
                <div class=" text-2xl mb-4 text-gray-500 dark:to-gray-500 px-4">
                    <span class="font-semibold">ផ្ទាំងគ្រប់គ្រង</span>
                </div>
                <div className=''>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-4">
                        <div className="flex items-center h-24   bg-white border-t-2 border-blue-500">

                            <div className='flex items-center gap-4 mx-5'>
                                <div className='bg-blue-500/20 p-3 rounded-full'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 text-blue-500">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className='font-bold font-NotoSansKhmer text-gray-600'>
                                        {constprice[0]?.amount_price !== undefined && constprice[0].amount_price !== null
                                            ? new Intl.NumberFormat('en-US', {
                                                style: 'decimal',
                                                minimumFractionDigits: 2,
                                                maximumFractionDigits: 2
                                            }).format(parseFloat(constprice[0].amount_price))
                                            : '0.00'} $
                                    </h3>
                                    <h3 className='font-bold font-NotoSansKhmer text-gray-600'>សរុបចំណាយ</h3>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center h-24   bg-white border-t-2 border-green-500">
                            <div className='flex items-center gap-4 mx-5'>
                                <div className='bg-green-500/20 p-3 rounded-full'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 text-green-500">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
                                    </svg>

                                </div>
                                <div>
                                    <h3 className="font-bold font-NotoSansKhmer text-gray-600">
                                        {sumPurchasePrice.length > 0 && sumPurchasePrice[0].SumAmountTotal
                                            ? new Intl.NumberFormat("en-US", {
                                                style: "decimal",
                                                minimumFractionDigits: 2,
                                                maximumFractionDigits: 2,
                                            }).format(parseFloat(sumPurchasePrice[0].SumAmountTotal))
                                            : "0.00"} $
                                    </h3>

                                    <h3 className='font-bold font-NotoSansKhmer text-gray-600'>ទិញសរុប</h3>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center h-24 bg-white border-t-2 border-yellow-500 px-5">
                            {/* Back Button */}
                            <div className="flex items-center gap-4">
                                <div className="bg-yellow-500/20 p-3 rounded-full">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 text-yellow-500">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M7.49 12 3.74 8.248m0 0 3.75-3.75m-3.75 3.75h16.5V19.5" />
                                    </svg>
                                </div>
                            </div>

                            {/* Title and Financial Info */}
                            <div className="flex justify-between items-center w-full px-5 md:text-lg text-xs whitespace-nowrap">
                                <h3 className="font-bold font-NotoSansKhmer text-gray-700">លក់សរុប​១</h3>
                                <div className="text-right">
                                    <h3 className="font-bold font-NotoSansKhmer text-gray-700">{sum_order[0]?.TotalAmountUSD || 0} $</h3>
                                    <h3 className="font-bold font-NotoSansKhmer text-gray-700">{sum_order[0]?.TotalAmountKHR || 0} រៀល</h3>
                                    <h3 className="font-bold font-NotoSansKhmer text-gray-700">{sum_order[0]?.TotalAmountTHB || 0} បាត</h3>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center h-24 bg-white border-t-2 border-yellow-500 px-5 ">
                            {/* Back Button */}
                            <div className="flex items-center gap-4">
                                <div className="bg-yellow-500/20 p-3 rounded-full">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 text-yellow-500">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M7.49 12 3.74 8.248m0 0 3.75-3.75m-3.75 3.75h16.5V19.5" />
                                    </svg>
                                </div>
                            </div>

                            {/* Title and Financial Info */}
                            <div className="flex justify-between items-center w-full px-5 md:text-lg text-xs whitespace-nowrap">
                                <h3 className="font-bold font-NotoSansKhmer text-gray-700">លក់ជំពាក់ 1</h3>
                                <div className="text-right">
                                    <h3 className="font-bold font-NotoSansKhmer text-gray-700">{sum_order[0]?.ResultTotal_DiUSD || 0} $</h3>
                                    <h3 className="font-bold font-NotoSansKhmer text-gray-700">{sum_order[0]?.ResultTotal_DiKHR || 0} រៀល</h3>
                                    <h3 className="font-bold font-NotoSansKhmer text-gray-700">{sum_order[0]?.ResultTotal_DiTHB || 0} បាត</h3>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center h-24   bg-white border-t-2 border-red-500">
                            <div className='flex items-center gap-4 mx-5'>
                                <div className='bg-red-500/20 p-3 rounded-full'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 text-red-500">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-bold font-NotoSansKhmer text-gray-600">
                                        {sumPurchasePrice.length > 0 && sumPurchasePrice[0].SumAmountDue
                                            ? new Intl.NumberFormat("en-US", {
                                                style: "decimal",
                                                minimumFractionDigits: 2,
                                                maximumFractionDigits: 2,
                                            }).format(parseFloat(sumPurchasePrice[0].SumAmountDue))
                                            : "0.00"} $
                                    </h3>
                                    <h3 className='font-bold font-NotoSansKhmer text-gray-600'>ទិញជំពាក់</h3>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center h-24   bg-white border-t-2 border-red-500">
                            <div className='flex items-center gap-4 mx-5'>
                                <div className='bg-red-500/20 p-3 rounded-full'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 text-red-500">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className='font-bold font-NotoSansKhmer text-gray-600'>300</h3>
                                    <h3 className='font-bold font-NotoSansKhmer text-gray-600'>ចំណាយសរុប</h3>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center h-24   bg-white border-t-2 border-blue-600">
                            <div className='flex items-center gap-4 mx-5'>
                                <div className='bg-blue-600/20 p-3 rounded-full'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-users text-blue-600"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>

                                </div>
                                <div>
                                    <h3 className='font-bold font-NotoSansKhmer text-gray-600'>{(CountCustomer[0]?.count_total) - 1} នាក់</h3>
                                    <h3 className='font-bold font-NotoSansKhmer text-gray-600'>អតិថិជនសរុប 1</h3>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center h-24   bg-white border-t-2 border-red-600">
                            <div className='flex items-center gap-4 mx-5'>
                                <div className='bg-red-600/20 p-3 rounded-full'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-ban text-red-600"><circle cx="12" cy="12" r="10" /><path d="m4.9 4.9 14.2 14.2" /></svg>
                                </div>
                                <div>
                                    <h3 className='font-bold font-NotoSansKhmer text-gray-600'>3030</h3>
                                    <h3 className='font-bold font-NotoSansKhmer text-gray-600'>ផលិតផលអស់ស្តុក</h3>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center h-24   bg-white border-t-2 border-orange-500">
                            <div className='flex items-center gap-4 mx-5'>
                                <div className='bg-orange-500/20 p-3 rounded-full'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-arrow-right-left text-orange-500"><path d="m16 3 4 4-4 4" /><path d="M20 7H4" /><path d="m8 21-4-4 4-4" /><path d="M4 17h16" /></svg>
                                </div>
                                <div>
                                    <h3 className='font-bold font-NotoSansKhmer text-gray-600'>{Products[0]?.count_total}</h3>
                                    <h3 className='font-bold font-NotoSansKhmer text-gray-600'>ទំនិញសរុប 1</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CountItems