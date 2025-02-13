import Navbar from '../Navbar';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { IoMdClose } from "react-icons/io";
import { API_URL } from '../../service/api'
import { Link, useNavigate, useParams } from "react-router-dom";


const CreatePurchase = () => {
    const navigate = useNavigate();
    const [customer, setSustomer] = useState('');
    const [amountTotal, setAmountTotal] = useState(0);
    const [amountDiscount, setAmounDiscount] = useState(0);
    const [amountPay, setAmounPay] = useState(null);
    const today = new Date().toISOString().split('T')[0];
    const [payDob, setPayDob] = useState(today);
    const [createDob, setCreateDob] = useState(today);
    const [userLoginNames, setUserLoginNames] = useState('');
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);


    const { id } = useParams();


    useEffect(() => {
        setUserLoginNames(localStorage.getItem('user_names') || '');
        getAccountBank();
    }, []);


    ///// get account
    const [accountBank, setAccountBank] = useState([]);
    const getAccountBank = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/account`);
            setAccountBank(response.data.account);
            console.log(response.data)
        } catch (error) {
            setError('Error fetching categories data');
        }
    };

    const [account_ID, setAccount_ID] = useState(null);
    const [getCustomerDiscount, setGetCustomerDiscount] = useState(0);
    useEffect(() => {
        const selectedAccount = accountBank.find((acc) => acc.id === parseInt(account_ID));
        if (selectedAccount) {
            setGetCustomerDiscount(selectedAccount.balance || 0);
        } else {
            setGetCustomerDiscount(0);
        }
    }, [account_ID, accountBank]);

    useEffect(() => {
        const fetchOrderData = async () => {
            try {
                const response = await fetch(`http://localhost:6700/api/repay/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch order data');
                }
                const data = await response.json();
                setSelectedProducts(data);
                const formattedDate = data[0]?.date_order ? data[0].date_order.split(" ")[0] : today;
                setCreateDob(data[0]?.date_order);
                setSustomer(data[0]?.full_names || data[0]?.business_names)
                // setAmounPay(data[0]?.balance_amount);
                // setAmounDiscount(data[0]?.discount);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchOrderData();
    }, [id]);




    const handleAmountPayChange = (value) => {
        const numericValue = parseFloat(value);
        if (!isNaN(numericValue) && numericValue >= 0) {
            setAmounPay(numericValue);
        }
    };

    const handleAmountDiscountChange = (value) => {
        const numericValue = parseFloat(value);
        if (!isNaN(numericValue) && numericValue >= 0) {
            setAmounDiscount(numericValue);
        }
    };

    const handleQtyChange = (index, value) => {
        const newQty = Math.min(Number(value), selectedProducts[index].qty); // Cap qty at product.qty
        setSelectedProducts((prevProducts) =>
            prevProducts.map((product, i) =>
                i === index
                    ? { ...product, qty: newQty >= 1 ? newQty : 1 } // Ensure qty is at least 1
                    : product
            )
        );
    };


    const handleRemoveProduct = (index) => {
        setSelectedProducts((prevProducts) =>
            prevProducts.filter((_, i) => i !== index) // Remove the product at the specified index
        );
    };


    const handleSubmit = async (e) => {
        e.preventDefault();



        // Calculate total amounts
        const totalSum = selectedProducts.reduce((sum, product) => {
            return sum + ((product.qty * product.price) - (product.totalDiscount * product.qty));
        }, 0);

        const finalAmount = totalSum - amountDiscount;

        if (account_ID === null) {
            
        } else if (account_ID !== null) {
            if (Number(finalAmount) > Number(getCustomerDiscount)) {
                toast.error('ទឺកប្រាក់មិនគ្រប់គ្រាន់មិនអាចផ្ទេចេញបានទេ!', {
                    position: "top-center",
                    autoClose: 2000,
                });
                return;
            }
        }
        

        // Construct payload for API request
        const productsData = selectedProducts.map(product => ({
            productId: product.id,
            productName: product.pro_names,
            quantity: product.qty,
            unitPrice: product.price,
            discount: product.totalDiscount,
            total: ((product.qty * product.price) - (product.totalDiscount * product.qty)).toFixed(2)
        }));

        const purchaseData = {
            customerName: customer,
            createDate: createDob,
            paymentDate: payDob,
            totalAmount: totalSum,
            discountAmount: amountDiscount,
            account_ID: account_ID,
            finalPayable: finalAmount,
            products: productsData,
            user_at: userLoginNames
        };

        setIsSubmitting(true);
        setLoading(true);

        console.log(purchaseData);
        // try {
        //     // Send request to API
        //     const response = await axios.post(`${API_URL}/purchase`, purchaseData);

        //     // Success message
        //     toast.success("Purchase saved successfully.");

        //     // Redirect to the purchase details page or list
        //     navigate(`/purchases/${response.data.id}`);

        // } catch (error) {
        //     console.error("Error saving purchase:", error);
        //     toast.error("Failed to save purchase.


    }

    const totalSum = selectedProducts.reduce((sum, product) => {
        return sum + ((product.qty * product.price) - (product.totalDiscount * product.qty));
    }, 0).toFixed(2);


    return (
        <div>
            <Navbar />
            <div className='py-12  px-6 sm:ml-64 md:w-auto w-[860px] bg-gray-200 dark:bg-gray-950'>
                <div className="w-full p-4 mt-10 bg-white dark:border-gray-700 animate-fade-up animate-duration-2000 animate-ease-in-out ">

                    <div className='flex items-center gap-2 pb-5'>
                        <p className='font-NotoSansKhmer font-bold text-3xl text-gray-600'>ការទិញដែលប្ដូរយលវិញ</p>
                    </div>
                    <div className="w-full">
                        <div className="modal_form">
                            <form onSubmit={handleSubmit}>
                                <div className='py-8 px-4 shadow-md  border-t-4 border-blue-600 rounded-md'>
                                    <div className='grid grid-cols-3 gap-4'>
                                        <div className="space-y-2">
                                            <label htmlFor="groupCustomer" className="font-NotoSansKhmer">ឈ្មោះអតិជន</label>
                                            <input
                                                type="text"
                                                id="price"
                                                readOnly
                                                value={customer}
                                                className="input_text"
                                                required
                                            />
                                        </div>
                                        {/* Date Input */}
                                        <div className="col-span-1 space-y-2">
                                            <label className="font-NotoSansKhmer font-bold">កាលបរិច្ឆេទទិញ</label>
                                            <input
                                                type="text"
                                                id="price"
                                                min={today}
                                                readOnly
                                                value={createDob}
                                                onChange={(e) => setCreateDob(e.target.value)}
                                                className="input_text"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className='pb-12 pt-6 px-4 shadow-md mt-8  border-t-4 border-pink-600 rounded-md'>

                                    <h3 className="text-lg font-semibold">កំណត់ការបញ្ជាទិញ</h3>
                                    <table className="mt-4 border-collapse w-full">
                                        <thead className="p-2 text-white bg-blue-600/90">
                                            <tr>
                                                <th className="p-2 border w-[7%]">លេខរៀង</th>
                                                <th className="p-2 border w-[20%]">ឈ្មោះផលិតផល</th>
                                                <th className="p-2 border w-[10%]">តម្លៃដើម(ឯកតា)</th>
                                                <th className="p-2 border w-[10%]">បរិមាណទិញចូល</th>
                                                <th className="p-2 border w-[10%]">បញ្ចុះតម្លៃ</th>
                                                <th className="p-2 border w-[15%]">សរុប</th>
                                                <th className="p-2 border w-[5%}">
                                                    <p className="text-center">ស្ថានភាព</p>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {selectedProducts.length > 0 ? (
                                                selectedProducts.map((product, index) => {
                                                    return (
                                                        <tr key={product.id}>
                                                            <td className="p-2 w-[7%]">{index + 1}</td>
                                                            <td className="p-2">
                                                                {product.pro_names}
                                                                <p className="text-xs text-gray-500">
                                                                    {product.unit_names}
                                                                </p>
                                                            </td>
                                                            <td className="w-[10%] text-center">
                                                                <input
                                                                    type="number"
                                                                    step={1}
                                                                    min={1}
                                                                    max={product.qty}
                                                                    value={product.qty}
                                                                    onChange={(e) => handleQtyChange(index, e.target.value)}
                                                                    placeholder="0.0"
                                                                    className="input_text"
                                                                />
                                                                <span className='text-xs'> {product.unit_names}</span>
                                                            </td>
                                                            <td className="w-[10%]">

                                                                <p className='input_text'>$ {product.price}</p>
                                                            </td>
                                                            <td className="w-[10%]">
                                                                <p className='input_text'>$ {product.totalDiscount}</p>
                                                            </td>
                                                            <td className="w-[15%]">

                                                                <p className='input_text'>$ {((product.qty * product.price) - (product.totalDiscount * product.qty)).toFixed(2)}</p>
                                                            </td>
                                                            <td className="p-2 w-[5%]">
                                                                <div className="flex justify-center">
                                                                    <button
                                                                        className="p-2 text-white bg-red-500 hover:text-white hover:bg-red-400"
                                                                        onClick={() => handleRemoveProduct(index)} // Pass index instead of product.id
                                                                    >
                                                                        <IoMdClose />
                                                                    </button>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    );
                                                })
                                            ) : (
                                                <tr>
                                                    <td colSpan={10} className="p-2 text-center text-gray-500">
                                                        សូមជ្រើសរើសផលិតផល
                                                    </td>
                                                </tr>
                                            )}


                                        </tbody>
                                        <br />
                                        <br />
                                        <tr
                                            className='bg-gray-300'>
                                            <td colSpan="3" className="font-bold text-center h-20">របាយការណ៍ចាស់</td>
                                            <td colSpan="2" className="font-bold space-y-3 text-gray-700  py-2">
                                                <p>សរុប</p>
                                                <hr />
                                                <span>បញ្ចុះតម្លៃ</span>
                                                <hr />
                                                <span>ចំនួនការទូទាត់សរុប</span>
                                                <hr />
                                                <span className='text-red-500'>នៅនៅខ្វះ</span>
                                            </td>
                                            <td colSpan="2" className="font-bold space-y-3 text-gray-700   py-2">
                                                {selectedProducts?.[0]?.type_currency !== "usd" && (
                                                    <span>
                                                        {selectedProducts?.[0]?.total_amount_dola ?? "0.00"} $ <br />
                                                    </span>
                                                )}
                                                {selectedProducts?.[0]?.balance_amount ?? "0.00"}<span className='uppercase'> {selectedProducts?.[0]?.type_currency}</span>
                                                <hr />
                                                <span className='uppercase'> {selectedProducts?.[0]?.discount || '0.00'} $</span>
                                                <hr />
                                                <p>
                                                    <span className='uppercase'> {selectedProducts?.[0]?.total_amount}
                                                    </span><span className='uppercase'> {selectedProducts?.[0]?.type_currency}</span>
                                                </p>
                                                <hr />
                                                <p className='text-red-500'>
                                                    <span className='uppercase'> {(selectedProducts?.[0]?.total_amount) - (selectedProducts?.[0]?.balance_amount)} <span className='uppercase'> {selectedProducts?.[0]?.type_currency}</span>
                                                    </span>
                                                </p>
                                            </td>
                                        </tr>
                                    </table>
                                </div>

                                <div className="pb-12 pt-6 px-4 shadow-md mt-8  border-t-4 border-green-600 rounded-md">
                                    <h3 className="text-lg font-semibold">បន្ថែមការទូទាត់</h3>
                                    <hr className="my-2" />
                                    <div className="grid grid-cols-3 gap-3">
                                        <div className="space-y-2">
                                            <label htmlFor="">ចំនួនទឹកប្រាក់ប្ដូរយកវិញសរុប($)</label>
                                            <p className='input_text'>$ {totalSum}</p>
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="">ចំនួនទឹកប្រាក់ត្រូវកាត់</label>
                                            <input
                                                type="number"
                                                value={amountDiscount}
                                                step={0.01}
                                                max={totalSum}
                                                onChange={(e) => handleAmountDiscountChange(e.target.value)}
                                                placeholder="0.0"
                                                className="input_text"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="">ចំនួនទូទាត់សាច់ប្រាកនៅសល់($) </label>
                                            <input
                                                type="number"
                                                value={totalSum - amountDiscount}

                                                readOnly
                                                step={0.01}
                                                onChange={(e) => handleAmountPayChange(e.target.value)}
                                                placeholder="0.00"
                                                className="input_text"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="">កាលបរិច្ឆេតបង់ប្រាក់ : *</label>
                                            <input type="date"
                                                required
                                                placeholder="0.0"
                                                readOnly
                                                value={payDob}
                                                onChange={(e) => setPayDob(e.target.value)}
                                                min={today}
                                                className="input_text"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="groupCustomer" className="font-NotoSansKhmer">វិធីសាស្ត្របង់ប្រាក់:</label>
                                            <select
                                                className='input_text'
                                                id="bank"
                                                value={account_ID  || null}
                                                onChange={e => setAccount_ID(e.target.value)}
                                            >
                                                 {account_ID === null && <option value="">មិនមាន</option>}
                                                {accountBank?.map((items) => (
                                                    <option key={items.id} value={items.id} disabled={items.status === 'off'}>
                                                        {items.acc_names}
                                                    </option>
                                                ))}

                                            </select>
                                            {getCustomerDiscount}
                                        </div>

                                    </div>
                                </div>

                                <div className="flex justify-end mt-5">
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="px-4 py-2 font-semibold text-white font-NotoSansKhmer bg-blue-500 hover:bg-blue-600"
                                    >

                                        {isSubmitting ? 'រក្សាទុក...' : 'រក្សាទុក'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
};
export default CreatePurchase
