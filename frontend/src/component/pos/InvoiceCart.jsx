

import React, { useEffect, useState } from 'react';
import Navbar from '../../view/pos/Navbar';
import { API_URL } from '../../service/api';
import axios from 'axios';
import { formatDateToKhmer } from '../ForMartDateToKHmer'
import { IoPrint } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import logo from '../../assets/logo.png'


function InvoiceCart() {
    const [invoice, setInvoice] = useState([]);
    const [error, setError] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        getMaxInvoice();
    }, []);

    const getMaxInvoice = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/order/invoice`);
            setInvoice(response.data);
            console.log(response.data);
            // toast.info(`ចំនួនសរុប: ${response.data[0]?.total_amount || 0} ${response.data[0]?.type_currency || "USD"}`, {
            //     position: "top-right",
            //     autoClose: 5000,
            //     hideProgressBar: true,
            //     closeOnClick: true,
            // });
        } catch (error) {
            setError('Error fetching invoice data');
            console.error(error);
        }
    };

    const handlePrint = () => {
        // const printContents = document.getElementById('invoice').innerHTML;
        // const originalContents = document.body.innerHTML;
        // document.body.innerHTML = printContents;
        window.print();
        // document.body.innerHTML = originalContents;
    };

    useEffect(() => {
        if (invoice.length > 0) {
            window.print();
            navigate('/index/pos');
        }
    }, [invoice]);


    return (
        <div>
            <div className='print:hidden'>
                <Navbar />
            </div>
            <div className=' px-2 print:px-0 print:py-0 md:w-auto bg-gray-200 print:bg-white dark:bg-gray-950'>
                <div className="w-full mt-10 bg-white dark:border-gray-700 animate-fade-up animate-duration-2000 animate-ease-in-out">
                    <div className="p-2 pt-6 print:pt-0 border-b mb-4 border-gray-500 print:px-0  print:shadow-none">
                        <div className="">
                            <div className='space-y-1 flex justify-center'>
                                <img src={logo} className='md:h-36 h-28 mb-4' alt="" />
                            </div>

                            <div className='space-y-1 flex justify-center'>

                                <h3 className="md:text-xl text-md font-KhmerMoul flex text-center text-blue-600">ចែប៊ីម៉ាត់ប៉ោយប៉ែត</h3>
                            </div>
                            <div className='space-y-1 text-center mb-2 font-light text-xs border-b'>
                                <p>ស្ថិតនៅភូមិ ១  ឃុំ ២ ស្រុក អូជ្រៅ ខេត្ត បន្ទាយមានជ័យ</p>
                                <p>លេខទូរស័ព្ទទំនាក់ទំនង : <span className='font-NotoSansKhmer capitalize'>097 488 673</span></p>
                            </div>

                            <div className='flex justify-between md:text-xl text-xs'>
                                {/* Purchase Information */}
                                <div>
                                    <p>លេខវិក្កយបត្រ : <span className='font-NotoSansKhmer'>{invoice?.[0]?.order_detail_id || 'មិនមាន'}</span></p>
                                    <p>ឈ្មោះអតិជន :
                                        <span className='font-NotoSansKhmer'>
                                            {invoice?.[0]?.business_names || ''} {invoice?.[0]?.full_names || ''}
                                        </span>
                                    </p>
                                    <p>លេខទូរស័ព្ទ : <span className='font-NotoSansKhmer'>{invoice?.[0]?.mobile_phone || 'មិនមាន'}</span></p>
                                    <p>កាលបរិច្ខេទ : <span className='font-NotoSansKhmer'>{invoice?.[0]?.create_at ? formatDateToKhmer(new Date(invoice[0].create_at)) : 'មិនមាន'}</span></p>
                                    <p>បន្ថែមដោយ : <span className='font-NotoSansKhmer capitalize'>{invoice?.[0]?.user_at || 'មិនមាន'}</span></p>

                                </div>

                                {/* Product Information */}
                                <div>
                                    {/* <p>លេខទូរស័ព្ទទំនាក់ទំនង : <span className='font-NotoSansKhmer capitalize'>097 488 673</span></p> */}
                                    {/* <p>ប្រភេទទំនិញ : <span className='font-NotoSansKhmer'>{invoice?.[0]?.cat_names || 'មិនមាន'}</span></p> */}

                                </div>
                            </div>
                        </div>
                    </div>
                    <table className="min-w-full table-auto">
                        <thead className=" text-gray-700 print:table-header-group">
                            <tr className="font-NotoSansKhmer md:text-lg text-xs ">
                                <th className="px-4 border-b border-gray-500 border-t-0 border-x-0">លេខរៀង</th>
                                <th className="px-4 py-2 whitespace-nowrap border-b border-gray-500 border-t-0 border-x-0">ឈ្មោះផលិតផល</th>
                                <th className="px-4 py-2 border-b border-gray-500 border-t-0 border-x-0">ចំនួន</th>
                                <th className="px-4 py-2 border-b border-gray-500 border-t-0 border-x-0">បញ្ចុះតម្លៃ</th>
                                <th className="px-4 py-2 border-b border-gray-500 border-t-0 border-x-0">តម្លៃលក់</th>
                                <th className="px-4 py-2 border-b border-gray-500 border-t-0 border-x-0">សរុប</th>
                            </tr>
                        </thead>
                        <tbody className='md:text-lg text-xs text-gray-500'>
                            {invoice.map((item, index) => (
                                <tr key={index} className="border-b text-center border-0 whitespace-nowrap">
                                    <td className="py-2  border-y-0 border-x-0">{index + 1}</td>
                                    <td className="py-2 whitespace-nowrap  border-y-0 border-x-0">{item.pro_names || 'មិនមាន'}</td>
                                    <td className="py-2  border-y-0 border-x-0">{item.qty || '0'} </td>
                                    <td className="py-2  border-y-0 border-x-0">{item.discount || '0.00'} $</td>
                                    <td className="py-2  border-y-0 border-x-0">{item.price || '0.00'} $</td>
                                    <td className="py-2  border-y-0 border-x-0">{item.total || '0.00'} $</td>
                                </tr>
                            ))}
                        </tbody>

                        <tfoot className="bg-white md:text-lg text-xs">
                            <tr >
                                <br />
                            </tr>
                            <tr className="bg-white">
                                <td colSpan="4" className="font-bold text-center border-b border-t-0 border-x-0  bg-white">ចំនួនសរុប:</td>

                                <td colSpan="2" className="font-bold space-x-2 py-1 text-center  border-t-0 border-x-0 bg-white">
                                    {invoice[0]?.type_currency !== 'usd' ? (
                                        // Format the amount in USD with two decimal places and thousand separators
                                        <>
                                            {Number(invoice[0]?.total_amount_dola || 0).toLocaleString('en-US', {
                                                minimumFractionDigits: 2,
                                                maximumFractionDigits: 2,
                                            })}{' '}
                                            $
                                            <br />
                                        </>
                                    ) : null}
                                    {Number(invoice[0]?.total_amount || 0).toLocaleString('en-US', {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    })}
                                    {(invoice[0]?.type_currency === 'usd') ? (
                                        <span className="uppercase"> $</span>

                                    ) : (invoice[0]?.type_currency === 'khr') ? (
                                        <span className="uppercase">រៀល </span>

                                    ) : (invoice[0]?.type_currency === 'thb') ? (
                                        <span className="uppercase">បាត</span>

                                    ) : null}
                                </td>
                            </tr>

                            <tr className="bg-white">
                                <td colSpan="4" className="font-bold text-center border-b border-t-0 border-x-0 bg-white">ទឹកប្រាក់សរុបបញ្ចុះតម្លៃ $ :</td>
                                <td colSpan="2" className="font-bold py-1 text-center border-b border-t-0 border-x-0 bg-white">
                                    {Number(invoice[0]?.discount || 0).toLocaleString('en-US', {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    })} $
                                </td>
                            </tr>

                            <tr className="bg-white">
                                <td colSpan="4" className="font-bold text-center border-t-0 border-x-0 bg-white">បានបង់ះទឹកប្រាក់សរុបចំនួន :</td>
                                <td colSpan="2" className="font-bold  py-1 text-center border-b border-t-0 border-x-0 bg-white">

                                    {Number(invoice[0]?.balance_amount || 0).toLocaleString('en-US', {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    })}

                                    {(invoice[0]?.type_currency === 'usd') ? (
                                        <span className="uppercase"> $</span>

                                    ) : (invoice[0]?.type_currency === 'khr') ? (
                                        <span className="uppercase"> រៀល </span>

                                    ) : (invoice[0]?.type_currency === 'thb') ? (
                                        <span className="uppercase"> បាត</span>

                                    ) : null}

                                </td>
                            </tr>
                            {invoice[0]?.total_amount <= 0 ? (
                                <tr className="bg-white">
                                    <td colSpan="4" className="font-bold text-center border-b border-t-0 border-x-0 bg-white">នៅនៅជុះពាក់ទឹកប្រាក់ចំនួន :</td>
                                    <td colSpan="2" className="font-bold px-4 py-1 bg-white border-b border-t-0 border-x-0 text-red-500 text-center">
                                        {Number((invoice[0]?.total_amount || 0) - (invoice[0]?.balance_amount || 0)).toLocaleString('en-US', {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2,
                                        })}
                                        {(invoice[0]?.type_currency === 'usd') ? (
                                            <span className="uppercase"> $</span>

                                        ) : (invoice[0]?.type_currency === 'khr') ? (
                                            <span className="uppercase"> រៀល </span>

                                        ) : (invoice[0]?.type_currency === 'thb') ? (
                                            <span className="uppercase"> បាត</span>

                                        ) : null}
                                    </td>
                                </tr>
                            ) : null}
                        </tfoot>
                    </table>
                    <div className='border-t my-12 text-center border-gray-200 w-full py-4'>
                        <h2 className='md:text-xl text-sm font-sans'>Thank You !</h2>
                        <p className='md:text-xl text-sm font-extralight'>អគុណដែលបានជួយគ្រាំទ្រហាង ចែប៊ីម៉ាត់ របស់យើងខ្ញុំ​</p>
                    </div>
                </div>



                <div className="flex justify-end my-8 print:hidden">
                    <button
                        className="flex items-center gap-1 px-4 py-2 font-bold text-white bg-blue-500 hover:bg-blue-700"
                        onClick={handlePrint}
                        type="button"
                    >
                        <IoPrint /> <span>បោះពុម្ភ</span>
                    </button>
                </div>
            </div>

        </div>
    );
}

export default InvoiceCart;