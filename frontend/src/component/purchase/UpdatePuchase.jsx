import Navbar from '../Navbar';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Pagination from '../pagination/Pagination';
import { FaClipboardList, FaFileCsv, FaFileExcel, FaPencilAlt, FaSearch } from "react-icons/fa";
import { MdDelete, MdClose } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import BackgroundArrow from '../background/BackgroundArrow'
import { useNavigate } from 'react-router-dom';


const UpdatePuchase = () => {
    const navigate = useNavigate();

    const [isDropdownOpenProduct, setIsDropdownOpenProduct] = useState(false);
    const [quantities, setQuantities] = useState({});
    const [discounts, setDiscounts] = useState({});
    const [salePrices, setSalePrices] = useState({});
    const [originalPrice, setOriginalPrice] = useState({});
    const [taxes, setTaxes] = useState({});
    const [product_ID, setProduct_ID] = useState('');
    const [amountTotal, setAmountTotal] = useState(0);
    const [amountDiscount, setAmounDiscount] = useState(0);
    const [amountPay, setAmounPay] = useState(null);
    const today = new Date().toISOString().split('T')[0];
    const [payDob, setPayDob] = useState(today);
    const [createDob, setCreateDob] = useState(today);
    const [supplier_id, setSupplier_ID] = useState('');
    const [statuss, setStatus] = useState('completed');
    const [account_ID, setAccount_ID] = useState(null);
    const [paymentType_ID, setPaymentType_ID] = useState(null);
    const [userLoginNames, setUserLoginNames] = useState('');

    const [supplier, setsupplier] = useState([]);
    const [products, setProducts] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);


    const [GetDataUpdatePurchase, setGetDataUpdatePurchase] = useState([]);



    useEffect(() => {
        setUserLoginNames(localStorage.getItem('user_names') || '');
        fetchsupplier();
        fetchProducts();
        getAccountBank();
        getPaymentType();
        getDataupdate();
    }, []);

    const getDataupdate = async () => {
        try {
            const respone = await axios.get(`http://localhost:6700/api/purchase/purchaseid/${id}`)
            setGetDataUpdatePurchase(respone.data.purchase);
            setDon(respone.data.purchase.don);
            setStatus(respone.data.purchase.status);
            console.log(GetDataUpdatePurchase);
        }
        catch (error) {
            console.error(error)
        }
    }


    useEffect(() => {
        const total = selectedProducts.reduce((acc, product) => {
            const qty = quantities[product.id] || 1; // Default to 1
            const discount = discounts[product.id] || 0;
            const saleprice = salePrices[product.id] || product.exclude_tax;
            const tax = taxes[product.id] || 0;
            const totalPrice = qty * saleprice;
            const grandTotal = totalPrice - discount + tax;
            return acc + grandTotal;
        }, 0);
        setAmountTotal(total);
    }, [selectedProducts, quantities, discounts, taxes, salePrices]);

    // const handleSubmit = async (e) => {
    //     e.preventDefault();

    //     // Validation
    //     if (selectedProducts.length === 0) {
    //         alert("Please add a product to cart");
    //         return;
    //     }

    //     let totalAmount = 0;
    //     let totalDiscount = 0;

    //     const productsData = selectedProducts.map(product => {
    //         const qty = quantities[product.id] || 1;
    //         const discount = discounts[product.id] || 0;
    //         const tax = taxes[product.id] || 0;
    //         const saleprice = salePrices[product.id] || product.exclude_tax;
    //         const Originale_price = originalPrice[product.id] || product.cost_price;
    //         const totalPrice = qty * saleprice;
    //         const grandTotal = totalPrice - discount + tax;

    //         // Accumulate totals
    //         totalAmount += grandTotal;
    //         totalDiscount += discount;
    //         return {
    //             supplier_id: supplier_id,
    //             product_id: product.id,
    //             date_by: createDob,
    //             qty: qty,
    //             discount: discount,
    //             cost_price: Originale_price,
    //             included_tax: tax,
    //             excluded_tax: saleprice,
    //             total: grandTotal,
    //             status: statuss,
    //             user_at: userLoginNames,
    //         };
    //     });

    //     if ((totalAmount - amountDiscount) < amountPay) {
    //         alert("ការទូទាត់សាច់ប្រាក់លើសការកំណត់!");
    //         return;
    //     }

    //     const orderData = {
    //         paymenttype_id: paymentType_ID,
    //         account_id: account_ID,
    //         amount_total: totalAmount,
    //         amount_discount: amountDiscount,
    //         amount_pay: amountPay,
    //         pay_date: payDob,
    //         products: productsData,
    //     };
    //     setIsSubmitting(true); // Set submitting state

    //     try {
    //         // Send data to backend
    //         const response = await fetch('http://localhost:6700/api/purchase', {
    //             method: 'POST',
    //             headers: { 'Content-Type': 'application/json' },
    //             body: JSON.stringify(orderData),
    //         });

    //         const result = await response.json();

    //         if (response.ok) {
    //             toast.success(`Order created successfully!`, {
    //                 position: "top-right",
    //                 autoClose: 3000,
    //             });
    //             navigate('/purchase')
    //             clearCart();
    //         } else {
    //             // toast.error(result.message || 'Failed to place the order!');
    //         }
    //     } catch (error) {
    //         toast.error('Failed to place the order!', {
    //             position: "top-right",
    //             autoClose: 1000,
    //         });
    //     } finally {
    //         setIsSubmitting(false);
    //     }
    // };


    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation
        if (selectedProducts.length === 0) {
            alert("Please add a product to update");
            return;
        }

        let totalAmount = 0;
        let totalDiscount = 0;

        const productsData = selectedProducts.map(product => {
            const qty = quantities[product.id] || 1;
            const discount = discounts[product.id] || 0;
            const tax = taxes[product.id] || 0;
            const saleprice = salePrices[product.id] || product.exclude_tax;
            const Originale_price = originalPrice[product.id] || product.cost_price;
            const totalPrice = qty * saleprice;
            const grandTotal = totalPrice - discount + tax;

            // Accumulate totals
            totalAmount += grandTotal;
            totalDiscount += discount;
            return {
                supplier_id: supplier_id,
                product_id: product.id,
                date_by: createDob,
                qty: qty,
                discount: discount,
                cost_price: Originale_price,
                included_tax: tax,
                excluded_tax: saleprice,
                total: grandTotal,
                status: statuss,
                user_at: userLoginNames,
            };
        });

        if ((totalAmount - amountDiscount) < amountPay) {
            alert("Payment exceeds the limit!");
            return;
        }

        const orderData = {
            paymenttype_id: paymentType_ID,
            account_id: account_ID,
            amount_total: totalAmount,
            amount_discount: amountDiscount,
            amount_pay: amountPay,
            pay_date: payDob,
            products: productsData,
        };

        setIsSubmitting(true); // Set submitting state

        try {
            // Assume you have the purchaseId for updating the purchase
            const response = await fetch(`http://localhost:6700/api/purchase/${purchaseId}`, {
                method: 'PUT', // Change to PUT for update
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderData),
            });

            const result = await response.json();

            if (response.ok) {
                toast.success(`Order updated successfully!`, {
                    position: "top-right",
                    autoClose: 3000,
                });
                navigate('/purchase');
                clearCart();
            } else {
                toast.error(result.message || 'Failed to update the order!');
            }
        } catch (error) {
            toast.error('Failed to update the order!', {
                position: "top-right",
                autoClose: 1000,
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const clearCart = () => {
        setSelectedProducts([]);
        setPaymentType_ID('');
        setAccount_ID('');
        setAmounDiscount('');
        setCreateDob('');
        setSupplier_ID('');
        setStatus('');
        setAmountTotal('');
        setAmounPay('');
        setPayDob(today);
    };

    const fetchsupplier = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:6700/api/supplier');
            setsupplier(response.data.supplier);
            setError('');
        } catch (error) {
            setError('Error fetching supplier data');
        } finally {
            setLoading(false);
        }
    };

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:6700/api/product');
            setProducts(response.data.product);
            setError('');
        } catch (error) {
            setError('Error fetching products data');
        } finally {
            setLoading(false);
        }
    };

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



    const handleQtyChange = (productId, value) => {
        setQuantities((prevQuantities) => ({
            ...prevQuantities,
            [productId]: value >= 1 ? Number(value) : 1, // Ensure quantity is at least 1
        }));
    };

    const handleOriginalPriceceChange = (productId, value) => {
        setOriginalPrice((prevOrinalPrice) => ({
            ...prevOrinalPrice,
            [productId]: value >= 0 ? Number(value) : 0,
        }));
    };

    const handleSalePriceChange = (productId, value) => {
        setSalePrices((prevSalePrice) => ({
            ...prevSalePrice,
            [productId]: value >= 0 ? Number(value) : 0,
        }));
    };
    const handleDiscountChange = (productId, value) => {
        setDiscounts((prevDiscounts) => ({
            ...prevDiscounts,
            [productId]: value >= 0 ? Number(value) : 0,
        }));
    };
    const handleTaxChange = (productId, value) => {
        setTaxes((prevTaxes) => ({
            ...prevTaxes,
            [productId]: value >= 0 ? Number(value) : 0,
        }));
    };
    const handleRemoveProduct = (productId) => {
        setSelectedProducts(
            selectedProducts.filter((product) => product.id !== productId)
        );
    };
    const handleAddProduct = (product) => {
        if (selectedProducts.find((p) => p.id === product.id)) {
            toast.error(`ផលិតផល ${product.pro_names} មានរូចហើយ!`, {
                position: "top-center",
                autoClose: 1000,
            });

        } else {
            setSelectedProducts([...selectedProducts, product]);
        }
        setProduct_ID("");
        setIsDropdownOpenProduct(false);
    };

    const handleProductSearchChange = (e) => {
        setProduct_ID(e.target.value);
        setIsDropdownOpenProduct(e.target.value.length > 0); // Corrected here
    };

    const filteredOptionsProduct = products.filter(option =>
        option.pro_names.toLowerCase().includes(product_ID.toLowerCase())
    );


    ///// get account 
    const [accountBank, setAccountBank] = useState([]);
    const getAccountBank = async () => {
        try {
            const response = await axios.get('http://localhost:6700/api/account');
            setAccountBank(response.data.account);
            console.log(response.data)
        } catch (error) {
            setError('Error fetching categories data');
        }
    };

    ///// get payment Type 
    const [paymentType, setPaymentType] = useState([]);
    const getPaymentType = async () => {
        try {
            const response = await axios.get('http://localhost:6700/api/payment_type');
            setPaymentType(response.data.payment_type);
            console.log(response.data)
        } catch (error) {
            setError('Error fetching categories data');
        }
    };

    return (
        <div>
            <Navbar />
            <div className='py-12 px-6 md:ml-64 bg-gray-200 dark:bg-gray-950'>
                <div className="w-full p-4 mt-10 bg-white dark:border-gray-700 animate-fade-up animate-duration-2000 animate-ease-in-out ">
                    <div className='flex items-center gap-2 pb-5'>
                        <p className='font-NotoSansKhmer font-bold text-3xl'>បន្ថែមការទិញ </p>

                    </div>
                    <div className="w-full">
                        <div className="modal_form">
                            <form onSubmit={handleSubmit}>
                                <div className='py-8 px-4 shadow-md  border-t-4 border-blue-600 rounded-md'>
                                    <div className='grid grid-cols-3 gap-4'>
                                        <div className="space-y-2">
                                            <label htmlFor="groupCustomer" className="font-NotoSansKhmer">វិធីសាស្សបង់ប្រាក់:</label>
                                            <select
                                                className='input_text'
                                                id="bank"
                                                value={supplier_id}
                                                required
                                                onChange={e => setSupplier_ID(e.target.value)}
                                            >
                                                <option value="" >សូមជ្រើសរើស</option>
                                                {supplier?.map((items) => (
                                                    <option key={items.id} value={items.id}>
                                                        {items.full_names} {items.business_names}

                                                    </option>
                                                ))}

                                            </select>
                                        </div>

                                        {/* Date Input */}
                                        <div className="col-span-1 space-y-2">
                                            <label className="font-NotoSansKhmer font-bold">កាលបរិច្ឆេទទិញ: *</label>
                                            <input
                                                type="date"
                                                id="price"
                                                min={today}
                                                value={createDob}
                                                onChange={(e) => setCreateDob(e.target.value)}
                                                className="input_text"
                                                required
                                            />
                                        </div>
                                        <div className="col-span-1 space-y-2">
                                            <label htmlFor="" className="font-bold font-NotoSansKhmer">ស្ថានភាព: *</label>
                                            <select
                                                required
                                                value={statuss}
                                                onChange={(e) => {
                                                    const selectedStatus = e.target.value;
                                                    setStatus(selectedStatus);
                                                    console.log(selectedStatus);
                                                }}
                                                className="input_text font-NotoSansKhmer"
                                            >
                                                <option value="" disabled>--ជ្រើសរើស--</option>
                                                <option value="completed">បានទទួល</option>
                                                <option value="active">រងចាំ</option>
                                                <option value="pending">បានបញ្ជាទិញ</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className='md:w-[70%] w-[100%] mx-auto mt-12'>
                                        <div className="relative items-center gap-3 mx-auto my-2">
                                            <div className="relative">
                                                <div className="flex justify-center">
                                                    <input
                                                        type="text"
                                                        className="w-full input_text"
                                                        placeholder="ស្វែងរកផលិតផល"
                                                        value={product_ID}
                                                        onChange={handleProductSearchChange}
                                                    />
                                                    <div className="absolute right-[15%] top-3.5">
                                                        <FaSearch className="text-gray-400" />
                                                    </div>
                                                </div>
                                                <div className="absolute top-0 right-[-3%]">
                                                    <button type='button' className="py-2.5 button_only_submit">
                                                        + ជ្រើសរើសផលិតផល
                                                    </button>
                                                </div>
                                            </div>
                                            {isDropdownOpenProduct && (
                                                <div className="flex justify-center">
                                                    <ul className="absolute z-[2] w-full mt-1 overflow-y-auto bg-white border border-gray-300 shadow-md max-h-48">
                                                        {filteredOptionsProduct.length > 0 ? (
                                                            filteredOptionsProduct.map((product) => (
                                                                <li
                                                                    key={product.id}
                                                                    className="p-2 text-gray-700 cursor-pointer hover:bg-gray-200 hover:text-black"
                                                                    onClick={() => handleAddProduct(product)}
                                                                >
                                                                    {product.pro_names}
                                                                </li>
                                                            ))
                                                        ) : (
                                                            <li className="p-2 text-gray-500 font-NotoSansKhmer">
                                                                មិនមានកាត ឈ្មោះនេះ​ <span className="font-bold">{product_ID}</span> ទេ!
                                                            </li>
                                                        )}
                                                    </ul>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                </div>

                                <div className='pb-12 pt-6 px-4 shadow-md mt-8  border-t-4 border-pink-600 rounded-md'>
                                    {/* Table for Selected Products */}
                                    <h3 className="text-lg font-semibold">កំណត់ការបញ្ជាទិញ</h3>
                                    <table className="mt-4 border-collapse w-full">
                                        <thead className="p-2 text-white bg-blue-600/90">
                                            <tr>
                                                <th className="p-2 border w-[7%]">លេខរៀង</th>
                                                <th className="p-2 border w-[20%]">ឈ្មោះផលិតផល</th>
                                                <th className="p-2 border w-[10%]">តម្លៃដើម(ឯកតា)</th>
                                                <th className="p-2 border w-[10%]">បរិមាណទិញចូល</th>
                                                <th className="p-2 border w-[10%]">តម្លៃដើមលក់ចេញ(ឯកតា)</th>
                                                <th className="p-2 border w-[10%]">បញ្ចុះតម្លៃ</th>
                                                <th className="p-2 border w-[10%]">ពន្ធសរុប</th>
                                                <th className="p-2 border w-[15%]">សរុប</th>
                                                <th className="p-2 border w-[5%}">
                                                    <p className="text-center">ស្ថានភាព</p>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {selectedProducts.length > 0 ? (
                                                selectedProducts.map((product, index) => {
                                                    const qty = quantities[product.id] || 1;
                                                    const discount = discounts[product.id] || 0;
                                                    const saleprice = salePrices[product.id] || product.exclude_tax;
                                                    const Originale_price = originalPrice[product.id] || product.cost_price;
                                                    const tax = taxes[product.id] || 0;
                                                    const totalPrice = qty * saleprice;
                                                    const grandTotal = totalPrice - discount + tax;
                                                    return (
                                                        <tr key={product.id}>
                                                            <td className="p-2 w-[7%]">{index + 1}</td>
                                                            <td className="p-2">
                                                                {product.pro_names}
                                                                <p className="text-xs text-gray-500">
                                                                    មានស្តុកនៅសល់ {product.qty} {product.unit_names}
                                                                </p>
                                                            </td>
                                                            <td className="w-[10%]">
                                                                <input
                                                                    min={0}
                                                                    type="number"
                                                                    step={0.01}
                                                                    placeholder="0.00"
                                                                    value={Originale_price}
                                                                    onChange={(e) => handleOriginalPriceceChange(product.id, e.target.value)}
                                                                    className="bg-gray-100 input_text"
                                                                />
                                                            </td>
                                                            <td className="w-[10%] text-center">
                                                                <input
                                                                    min={1}
                                                                    type="number"
                                                                    step={1}
                                                                    value={qty}
                                                                    onChange={(e) => handleQtyChange(product.id, e.target.value)}
                                                                    placeholder="0.0"
                                                                    className="input_text"
                                                                />
                                                                <span className='text-xs'> {product.unit_names}</span>
                                                            </td>

                                                            <td className="w-[10%]">
                                                                <input
                                                                    min={0}
                                                                    type="number"
                                                                    placeholder="0.00"
                                                                    step={0.01}
                                                                    value={saleprice}
                                                                    onChange={(e) => handleSalePriceChange(product.id, e.target.value)}
                                                                    className="bg-gray-100 input_text"
                                                                />
                                                            </td>
                                                            <td className="w-[10%]">
                                                                <input
                                                                    type="number"
                                                                    value={discount}
                                                                    onChange={(e) => handleDiscountChange(product.id, e.target.value)}
                                                                    placeholder="0"
                                                                    className="input_text"
                                                                />
                                                            </td>
                                                            <td className="w-[10%]">
                                                                <input
                                                                    min={0}
                                                                    type="number"
                                                                    value={tax}
                                                                    onChange={(e) => handleTaxChange(product.id, e.target.value)} // Use the new handler
                                                                    placeholder="0"
                                                                    className="input_text"
                                                                />
                                                            </td>
                                                            <td className="w-[15%]">
                                                                <input
                                                                    min={0}
                                                                    type="number"
                                                                    value={grandTotal.toFixed(2)} // Assuming you want to keep this tax calculation
                                                                    placeholder="0.0"
                                                                    readOnly
                                                                    className="bg-gray-100 input_text"
                                                                />
                                                            </td>
                                                            <td className="p-2 w-[5%]">
                                                                <div className="flex justify-center">
                                                                    <button
                                                                        className="p-2 text-white bg-red-500 hover:text-white hover:bg-red-400"
                                                                        onClick={() => handleRemoveProduct(product.id)}
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
                                    </table>
                                </div>

                                <div className="pb-12 pt-6 px-4 shadow-md mt-8  border-t-4 border-green-600 rounded-md">
                                    <h3 className="text-lg font-semibold">បន្ថែមការទូទាត់</h3>
                                    <hr className="my-2" />
                                    <div className="grid grid-cols-3 gap-3">
                                        <div className="space-y-2">
                                            <label htmlFor="">ចំនួនការទូទាត់សរុប($)</label>
                                            <input
                                                type="number"
                                                placeholder="0.0"
                                                value={amountTotal.toFixed(2)}
                                                readOnly
                                                className="bg-gray-100 input_text"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="">ចំនួនទឹកប្រាក់បញ្ចុះតម្លៃ</label>
                                            <input
                                                type="number"
                                                value={amountDiscount}
                                                step={0.01}
                                                onChange={(e) => handleAmountDiscountChange(e.target.value)}
                                                placeholder="0.0"
                                                className="input_text"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="">ទូទាត់សាច់ប្រាក់($): * </label>
                                            <input
                                                type="number"
                                                value={amountPay}
                                                required
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
                                                value={payDob}
                                                onChange={(e) => setPayDob(e.target.value)}
                                                min={today}
                                                className="input_text"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="">វិធីសាទូទាត់</label>
                                            <select
                                                className='input_text'
                                                id="bank"
                                                value={paymentType_ID}
                                                onChange={e => setPaymentType_ID(e.target.value)}
                                            >
                                                <option value="" >សូមជ្រើសរើស</option>
                                                {paymentType?.map((items) => (
                                                    <option key={items.id} value={items.id}>
                                                        {items.pay_manes}
                                                    </option>
                                                ))}

                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="groupCustomer" className="font-NotoSansKhmer">វិធីសាស្សបង់ប្រាក់:</label>
                                            <select
                                                className='input_text'
                                                id="bank"
                                                value={account_ID}
                                                onChange={e => setAccount_ID(e.target.value)}
                                            >
                                                <option value="" >សូមជ្រើសរើស</option>
                                                {accountBank?.map((items) => (
                                                    <option key={items.id} value={items.id}>
                                                        {items.acc_names}
                                                    </option>
                                                ))}

                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="">ចំនួននៅសល់($)</label>
                                            <input
                                                type="number"
                                                placeholder="0.0"
                                                value={(amountTotal - amountDiscount - amountPay) < 0 ? 0.00 : (amountTotal - amountDiscount - amountPay).toFixed(2)}
                                                readOnly
                                                className="bg-gray-100 input_text"
                                            />
                                            {/* You may want to display the dollar sign outside the input if needed */}
                                            {/* <span>$</span> */}
                                        </div>

                                    </div>
                                </div>
                                <div className="flex justify-end mt-5">
                                    <button
                                        type="submit"
                                        className="px-4 py-2 font-semibold text-white bg-blue-500 hover:bg-blue-600"
                                    >
                                        រក្សាទុក
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                </div>
                <div>
                    <BackgroundArrow />
                </div>

            </div>
        </div>
    );
};
export default UpdatePuchase