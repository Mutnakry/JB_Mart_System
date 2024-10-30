
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import Pagination from '../pagination/Pagination';
// import { FaClipboardList, FaFileCsv, FaFileExcel, FaPencilAlt, FaSearch } from "react-icons/fa";
// import { MdDelete, MdClose } from "react-icons/md";
// import { motion, AnimatePresence } from "framer-motion";
// import { IoMdClose } from "react-icons/io";


// const Dashboard = () => {

//     /// show modal insert
//     const [isInsertModalOpen, setIsInsertModalOpen] = useState(false);
//     // modal insert
//     const openInsertModal = () => {
//         setIsInsertModalOpen(true);
//     };

//     const [isDropdownOpenCategory, setIsDropdownOpenCategory] = useState(false);
//     const [isDropdownOpenProduct, setIsDropdownOpenProduct] = useState(false);
//     const [selectedCategory, setSelectedCategory] = useState('');
//     const [quantities, setQuantities] = useState({});
//     const [discounts, setDiscounts] = useState({});
//     const [taxes, setTaxes] = useState({});
//     const [expiry, setExpiry] = useState({});
//     const [cost_priceSale, setCost_Price] = useState({});


//     const [category_ID, setCategory_ID] = useState('');
//     const [product_ID, setProduct_ID] = useState('');
//     const [amountTotal, setAmountTotal] = useState(0);
//     const [amountDiscount, setAmounDiscount] = useState(0);
//     const [amountPay, setAmounPay] = useState(null);
//     const [expentamount, setExpentamount] = useState(0);
//     const today = new Date().toISOString().split('T')[0];
//     const [payDob, setPayDob] = useState(today);
//     const [createDob, setCreateDob] = useState(today);
//     const [supplier_id, setSupplier_ID] = useState(null);
//     const [status, setStatus] = useState("");
//     const [QTY, setQTY] = useState("");
//     const [account_ID, setAccount_ID] = useState(null);
//     const [paymentType_ID, setPaymentType_ID] = useState(null);
//     const [userlogin, setUserLofin] = useState("admin");


//     const [supplier, setsupplier] = useState([]);
//     const [products, setProducts] = useState([]);
//     const [selectedProducts, setSelectedProducts] = useState([]); // State for selected products
//     const [error, setError] = useState('');
//     const [loading, setLoading] = useState(false);




//     useEffect(() => {
//         fetchsupplier();
//         fetchProducts();
//         getAccountBank();
//         getPaymentType();
//     }, []);
//     useEffect(() => {
//         const total = selectedProducts.reduce((acc, product) => {
//             const qty = quantities[product.id] || 1; // Default to 1
//             const discount = discounts[product.id] || 0;
//             const tax = taxes[product.id] || 0;
//             const totalPrice = qty * product.exclude_tax;
//             const grandTotal = totalPrice - discount + tax;
//             return acc + grandTotal;
//         }, 0);
//         setAmountTotal(total);
//     }, [selectedProducts, quantities, discounts, taxes]);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
    
//         // Validation
//         if (selectedProducts.length === 0) {
//             alert("Please add a product to cart");
//             return;
//         }
//         if (!selectedCategory) {
//             setError('Please select a supplier!');
//             return;
//         }
    
//         // Prepare order data
//         const orderData = {
//             paymenttype_id: paymentType_ID,
//             account_id: account_ID,
//             amount_total: amountTotal,
//             amount_discount: amountDiscount,
//             amount_pay: amountPay,
//             pay_date: payDob,
//             products: selectedProducts.map(product => ({
//                 supplier_id: product.supplier_id,
//                 product_id: product.id,
//                 date_by: product.createDob,
//                 qty: product.QTY,
//                 discount: product.discounts,
//                 cost_price: product.cost_price,
//                 included_tax: product.tax,
//                 excluded_tax: product.excluded_tax,
//                 total: product.total,
//                 status: product.status,
//                 expiry: product.expiry,
//                 user_at: product.userlogin
//             }))
//         };
    
//         // Log data for debugging
//         console.log(orderData);
    
//         try {
//             // Send data to backend
//             const response = await fetch('http://localhost:6700/api/purchase', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify(orderData)
//             });
    
//             const result = await response.json();
    
//             if (response.ok) {
//                 toast.success(`Order created successfully!`, {
//                     position: "top-right",
//                     autoClose: 3000,
//                 });
//                 clearCart(); // Clear cart or selected products after successful submission
//                 navigate('/'); // Redirect if needed
//             } else {
//                 toast.error(result.message || 'Failed to place the order!');
//             }
//         } catch (error) {
//             toast.error('Failed to place the order!', {
//                 position: "top-right",
//                 autoClose: 1000,
//             });
//         } finally {
//             setIsSubmitting(false);
//         }
//     };

    
//     // const handleSubmit = async (e) => {
//     //     e.preventDefault();

//     //     if (selectedProducts.length === 0) {
//     //         alert("Please add product to cart");
//     //         return;
//     //     }
//     //     if (!selectedCategory) {
//     //         setError('អ្នកផ្គត់ផ្គង់ ត្រូវបានបញ្ជាក់!');
//     //         return;
//     //     }
//     //     const orderData = {
//     //         paymenttype_id: paymentType_ID,
//     //         account_id: account_ID,
//     //         amount_total: amountTotal,
//     //         amount_discount: amountDiscount,
//     //         amount_pay: amountPay,
//     //         pay_date: payDob,
//     //         products: cart.map(product => ({
//     //             supplier_id: product.supplier_id,
//     //             product_id: product.id,
//     //             date_by: product.createDob,
//     //             qty: product.QTY,
//     //             discount: product.discounts,
//     //             cost_price: product.cost_price,
//     //             included_tax: product.tax,
//     //             excluded_tax: product.excluded_tax,
//     //             total: product.total,
//     //             status: product.status,
//     //             expiry: product.expiry,
//     //             user_at: product.userlogin
//     //         }))
//     //     };

//     //     console.log(orderData)
//     //     try {
//     //         const response = await fetch('http://localhost:6700/api/purchase', {
//     //             method: 'POST',
//     //             headers: {
//     //                 'Content-Type': 'application/json'
//     //             },
//     //             body: JSON.stringify(orderData)
//     //         });

//     //         const result = await response.json();
//     //         if (response.ok) {
//     //             toast.success(`បញ្ជាទិញបានជោគជ័យ !`, {
//     //                 position: "top-right",
//     //                 autoClose: 3000,
//     //             });
//     //             clearCart();
//     //             // window.location.href = "/";
//     //             navigate('/');
//     //         } else {
//     //             toast.error(result.message || 'Failed to place the order!',);
//     //         }

//     //     } catch (error) {
//     //         toast.error(`បញ្ជាទិញមិនបានជោគជ័យ។ !`, {
//     //             position: "top-right",
//     //             autoClose: 1000,
//     //         });
//     //     } finally {
//     //         setIsSubmitting(false);
//     //     }
//     // };

//     const handleAmountPayChange = (value) => {
//         const numericValue = parseFloat(value);
//         if (!isNaN(numericValue) && numericValue >= 0) {
//             setAmounPay(numericValue);
//         }
//     };

//     const handleAmountDiscountChange = (value) => {
//         const numericValue = parseFloat(value);
//         if (!isNaN(numericValue) && numericValue >= 0) {
//             setAmounDiscount(numericValue);
//         }
//     };

//     const fetchsupplier = async () => {
//         setLoading(true);
//         try {
//             const response = await axios.get('http://localhost:6700/api/supplier');
//             setsupplier(response.data.supplier);
//             setError('');
//         } catch (error) {
//             setError('Error fetching supplier data');
//         } finally {
//             setLoading(false);
//         }
//     };

//     const fetchProducts = async () => {
//         setLoading(true);
//         try {
//             const response = await axios.get('http://localhost:6700/api/product');
//             setProducts(response.data.product);
//             setError('');
//         } catch (error) {
//             setError('Error fetching products data');
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleSearchCategory = (event) => {
//         setSupplier_ID(event.target.value);
//     };

//     const handleOptionClickCategory = (option) => {
//         setSelectedCategory(option.full_names || option.business_names);
//         setIsDropdownOpenCategory(false);
//         setSupplier_ID(category.id);
//         setError(''); // Clear error on selection
//     };

//     const handleAddProduct = (product) => {
//         if (selectedProducts.find((p) => p.id === product.id)) {
//             alert("Product already exists!");
//         } else {
//             setSelectedProducts([...selectedProducts, product]); // Add selected product to the array
//             setIsDropdownOpenProduct(false); // Close the dropdown
//         }
//         setProduct_ID(""); // Clear the search input after adding
//     };

//     const handleQtyChange = (productId, value) => {
//         setQuantities((prevQuantities) => ({
//             ...prevQuantities,
//             [productId]: value >= 1 ? Number(value) : 1, // Ensure quantity is at least 1
//         }));
//     };

//     const handleDiscountChange = (productId, value) => {
//         setDiscounts((prevDiscounts) => ({
//             ...prevDiscounts,
//             [productId]: value >= 0 ? Number(value) : 0, // Ensure discount is not negative
//         }));
//     };
//     const handleTaxChange = (productId, value) => {
//         setTaxes((prevTaxes) => ({
//             ...prevTaxes,
//             [productId]: value >= 0 ? Number(value) : 0, // Ensure tax is not negative
//         }));
//     };


//     const handleRemoveProduct = (productId) => {
//         setSelectedProducts(
//             selectedProducts.filter((product) => product.id !== productId)
//         );
//     };

//     // Filter options based on the search query
//     const filteredOptionsCategory = supplier.filter(option =>
//         option.full_names.toLowerCase().includes(category_ID.toLowerCase()) ||
//         option.business_names.toLowerCase().includes(category_ID.toLowerCase())
//     );

//     const filteredOptionsProduct = products.filter(option =>
//         option.pro_names.toLowerCase().includes(product_ID.toLowerCase())
//     );

//     ///// get account 
//     const [accountBank, setAccountBank] = useState([]);
//     const getAccountBank = async () => {
//         try {
//             const response = await axios.get('http://localhost:6700/api/account');
//             setAccountBank(response.data.account);
//             console.log(response.data)
//         } catch (error) {
//             setError('Error fetching categories data');
//         }
//     };

//     ///// get payment Type 
//     const [paymentType, setPaymentType] = useState([]);
//     const getPaymentType = async () => {
//         try {
//             const response = await axios.get('http://localhost:6700/api/payment_type');
//             setPaymentType(response.data.payment_type);
//             console.log(response.data)
//         } catch (error) {
//             setError('Error fetching categories data');
//         }
//     };




//     return (
//         <div>
//             <div className=''>
//                 <div className="flex items-center gap-2 ">
//                     <p><FaClipboardList className="text-lg " /></p>
//                     <p className="font-NotoSansKhmer font-bold ">តារាងបញ្ជីប្រភេទទំនិញ</p>
//                 </div>
//                 <div className="flex justify-end">
//                     <button onClick={openInsertModal} className="button_only_submit">+ បង្កើតប្រភេទថ្មី</button>
//                 </div>
//             </div>

//             {/* Insert Modal */}
//             <AnimatePresence>
//                 {isInsertModalOpen && (
//                     <motion.div
//                         className="modal"
//                         initial={{ opacity: 0, scale: 0.8 }}
//                         animate={{ opacity: 1, scale: 1 }}
//                         exit={{ opacity: 0, scale: 0.8 }}
//                         transition={{ duration: 0.2 }}
//                     >

//                         <div className="modal_center max-w-7xl mt-10 mx-2">
//                             <div className="modal_title">
//                                 <h3 className="">ប្រភេទទំនិញ</h3>
//                                 <MdClose className='text-2xl cursor-pointer' onClick={() => setIsInsertModalOpen(false)} />
//                             </div>
//                             <div className="modal_form">
//                                 <form onSubmit={handleSubmit}>
//                                     <div className='grid grid-cols-3 gap-4'>

//                                         {/* Supplier Dropdown */}
//                                         <div className="col-span-1 space-y-2">
//                                             <label className="font-NotoSansKhmer font-bold">អ្នកផ្គត់ផ្គង់: *</label>
//                                             <div className="relative">
//                                                 <div
//                                                     className="input_text cursor-pointer"
//                                                     onClick={() => setIsDropdownOpenCategory(!isDropdownOpenCategory)}
//                                                 >
//                                                     {selectedCategory || 'ជ្រើសរើស...'}
//                                                 </div>
//                                                 {isDropdownOpenCategory && (
//                                                     <div className="absolute z-10 p-2 bg-white border rounded-md mt-2 w-full">
//                                                         <input
//                                                             type="text"
//                                                             value={supplier_id}
//                                                             required
//                                                             onChange={handleSearchCategory}
//                                                             className="input_text w-full p-2"
//                                                             placeholder="ស្វែងរក..."
//                                                         />
//                                                         {/* Dropdown options */}
//                                                         {filteredOptionsCategory.map((category) => (
//                                                             <div
//                                                                 key={category.id}
//                                                                 className="p-2 hover:bg-gray-100 cursor-pointer"
//                                                                 onClick={() => handleOptionClickCategory(category)}
//                                                             >
//                                                                 {category.full_names} {category.business_names}
//                                                             </div>
//                                                         ))}
//                                                         {filteredOptionsCategory.length === 0 && (
//                                                             <div className="p-2 text-red-500">មិនមានកាត ឈ្មោះនេះ</div>
//                                                         )}
//                                                     </div>
//                                                 )}
//                                             </div>
//                                             {error && <p className="text-red-500 text-sm">{error}</p>} {/* Error message */}

//                                         </div>

//                                         {/* Date Input */}
//                                         <div className="col-span-1 space-y-2">
//                                             <label className="font-NotoSansKhmer font-bold">កាលបរិច្ឆេទទិញ: *</label>
//                                             <input
//                                                 type="date"
//                                                 id="price"
//                                                 min={today}
//                                                 value={createDob}
//                                                 onChange={(e) => setCreateDob(e.target.value)}
//                                                 className="input_text"
//                                                 required
//                                             />
//                                         </div>
//                                         {/* Status Dropdown */}
//                                         <div className="col-span-1 space-y-2">
//                                             <label htmlFor="" className="font-bold font-NotoSansKhmer">ស្ថានភាព: *</label>
//                                             <select name="" id="" 
//                                             required 
//                                             value={status}
//                                             onChange={(e)=>setStatus(e.target.value)}
//                                             className="input_text font-NotoSansKhmer">
//                                                 <option value="" selected disabled>--ជ្រើសរើស--</option>
//                                                 <option value={1}>បានទទួល</option>
//                                                 <option value={2}>រងចាំ</option>
//                                                 <option value={3}>បានបញ្ជាទិញ</option>
//                                             </select>
//                                         </div>
//                                     </div>

//                                     <div className='md:w-[70%] w-[100%] mx-auto m-12'>
//                                         {/* Product Search Input */}
//                                         <div className="relative items-center gap-3 mx-auto my-2">
//                                             <div className="relative">
//                                                 <div className="flex justify-center">
//                                                     <input
//                                                         type="text"
//                                                         className="w-full input_text"
//                                                         placeholder="ស្វែងរកផលិតផល"
//                                                         value={product_ID}
//                                                         onChange={(e) => {
//                                                             setProduct_ID(e.target.value);
//                                                             setIsDropdownOpenProduct(true);
//                                                         }}
//                                                         onFocus={() => setIsDropdownOpenProduct(false)}
//                                                     />
//                                                     <div className="absolute right-[20%] top-3.5">
//                                                         <FaSearch className="text-gray-400" />
//                                                     </div>
//                                                 </div>
//                                                 <div className="absolute top-0 right-[-3%]">
//                                                     <button type='button' className="py-2.5 button_only_submit">
//                                                         + ជ្រើសរើសផលិតផល
//                                                     </button>
//                                                 </div>
//                                             </div>
//                                             {/* Dropdown for Products */}
//                                             {isDropdownOpenProduct && (
//                                                 <div className="flex justify-center">
//                                                     <ul className="absolute z-[2] w-full mt-1 overflow-y-auto bg-white border border-gray-300 shadow-md max-h-48">
//                                                         {filteredOptionsProduct.length > 0 ? (
//                                                             filteredOptionsProduct.map((product) => (
//                                                                 <li
//                                                                     key={product.id}
//                                                                     className="p-2 text-gray-700 cursor-pointer hover:bg-gray-200 hover:text-black"
//                                                                     onClick={() => handleAddProduct(product)} // Add product on click
//                                                                 >
//                                                                     {product.pro_names}
//                                                                 </li>
//                                                             ))
//                                                         ) : (
//                                                             <li className="p-2 text-gray-500 font-NotoSansKhmer">
//                                                                 មិនមានកាត ឈ្មោះនេះ​ <span className="font-bold">{product_ID}</span>{" "} ទេ!
//                                                             </li>
//                                                         )}
//                                                     </ul>
//                                                 </div>
//                                             )}
//                                         </div>
//                                     </div>

//                                     <div className='p-3'>
//                                         {/* Table for Selected Products */}
//                                         <h3 className="text-lg font-semibold">កំណត់ការបញ្ជាទិញ</h3>
//                                         <table className="mt-4 border-collapse w-full">
//                                             <thead className="p-2 text-white bg-blue-600/90">
//                                                 <tr>
//                                                     <th className="p-2 border w-[7%]">លេខរៀង</th>
//                                                     <th className="p-2 border w-[20%]">ឈ្មោះផលិតផល</th>
//                                                     <th className="p-2 border w-[10%]">ថ្ងៃផុតកំណត់</th>
//                                                     <th className="p-2 border w-[10%]">តម្លៃដើម(ឯកតា)</th>
//                                                     <th className="p-2 border w-[10%]">បរិមាណទិញចូល</th>
//                                                     <th className="p-2 border w-[10%]">តម្លៃដើមលក់ចេញ(ឯកតា)</th>
//                                                     <th className="p-2 border w-[10%]">បញ្ចុះតម្លៃ</th>
//                                                     <th className="p-2 border w-[10%]">ពន្ធសរុប</th>
//                                                     <th className="p-2 border w-[15%]">សរុប</th>
//                                                     <th className="p-2 border w-[5%}">
//                                                         <p className="text-center">ស្ថានភាព</p>
//                                                     </th>
//                                                 </tr>
//                                             </thead>
//                                             <tbody>
//                                                 {selectedProducts.length > 0 ? (
//                                                     selectedProducts.map((product, index) => {
//                                                         const qty = quantities[product.id] || 1; // Default to 1 if no quantity is set
//                                                         const discount = discounts[product.id] || 0; // Default discount to 0
//                                                         const tax = taxes[product.id] || 0; // Get tax for the product, default to 0
//                                                         const totalPrice = qty * product.exclude_tax; // Calculate total price
//                                                         const grandTotal = totalPrice - discount + tax; // Calculate grand total
//                                                         return (
//                                                             <tr key={product.id}>
//                                                                 <td className="p-2 w-[7%]">{index + 1}</td>
//                                                                 <td className="p-2">
//                                                                     {product.pro_names}
//                                                                     <p className="text-xs text-gray-500">
//                                                                         មានស្តុកនៅសល់ {product.qty} {product.unit_names}

//                                                                     </p>
//                                                                 </td>
//                                                                 <td className="w-[10%]">
//                                                                     <input
//                                                                         type="date"
//                                                                         value={expiry}
//                                                                         min={today}
//                                                                         onChange={(e) => setExpiry(e.target.value)}
//                                                                         className="bg-gray-100 input_text"
//                                                                     />
//                                                                 </td>
//                                                                 <td className="w-[10%]">
//                                                                     <input
//                                                                         min={0}
//                                                                         disabled
//                                                                         type="number"
//                                                                         placeholder="0.0"
//                                                                         value={product.cost_price}
//                                                                         className="bg-gray-100 input_text"
//                                                                     />
//                                                                 </td>
//                                                                 <td className="w-[10%] text-center">
//                                                                     <input
//                                                                         min={1}
//                                                                         type="number"
//                                                                         step={1}
//                                                                         value={qty}
//                                                                         onChange={(e) => handleQtyChange(product.id, e.target.value)}
//                                                                         placeholder="0.0"
//                                                                         className="input_text"
//                                                                     />
//                                                                     <span className='text-xs'> {product.unit_names}</span>
//                                                                 </td>
//                                                                 <td className="w-[10%]">
//                                                                     <input
//                                                                         min={0}
//                                                                         disabled
//                                                                         type="number"
//                                                                         placeholder="0.0"
//                                                                         value={product.exclude_tax}
//                                                                         className="bg-gray-100 input_text"
//                                                                     />
//                                                                 </td>
//                                                                 <td className="w-[10%]">
//                                                                     <input
//                                                                         type="number"
//                                                                         value={discount}
//                                                                         onChange={(e) => handleDiscountChange(product.id, e.target.value)}
//                                                                         placeholder="0"
//                                                                         className="input_text"
//                                                                     />
//                                                                 </td>
//                                                                 <td className="w-[10%]">
//                                                                     <input
//                                                                         min={0}
//                                                                         type="number"
//                                                                         value={tax}
//                                                                         onChange={(e) => handleTaxChange(product.id, e.target.value)} // Use the new handler
//                                                                         placeholder="0"
//                                                                         className="input_text"
//                                                                     />
//                                                                 </td>
//                                                                 <td className="w-[15%]">
//                                                                     <input
//                                                                         min={0}
//                                                                         type="number"
//                                                                         value={grandTotal.toFixed(2)} // Assuming you want to keep this tax calculation
//                                                                         placeholder="0.0"
//                                                                         readOnly
//                                                                         className="bg-gray-100 input_text"
//                                                                     />
//                                                                 </td>
//                                                                 <td className="p-2 w-[5%]">
//                                                                     <div className="flex justify-center">
//                                                                         <button
//                                                                             className="p-2 text-white bg-red-500 hover:text-white hover:bg-red-400"
//                                                                             onClick={() => handleRemoveProduct(product.id)}
//                                                                         >
//                                                                             <IoMdClose />
//                                                                         </button>
//                                                                     </div>
//                                                                 </td>
//                                                             </tr>
//                                                         );
//                                                     })
//                                                 ) : (
//                                                     <tr>
//                                                         <td colSpan={10} className="p-2 text-center text-gray-500">
//                                                             សូមជ្រើសរើសផលិតផល
//                                                         </td>
//                                                     </tr>
//                                                 )}
//                                             </tbody>
//                                         </table>
//                                     </div>

//                                     <div className="mt-3">
//                                         <h3 className="text-lg font-semibold">បន្ថែមការទូទាត់</h3>
//                                         <hr className="my-2" />
//                                         <div className="grid grid-cols-3 gap-3">
//                                             <div className="space-y-2">
//                                                 <label htmlFor="">ចំនួនការទូទាត់សរុប($)</label>
//                                                 <input
//                                                     type="number"
//                                                     placeholder="0.0"
//                                                     value={amountTotal.toFixed(2)}
//                                                     readOnly
//                                                     className="bg-gray-100 input_text"
//                                                 />
//                                             </div>
//                                             <div className="space-y-2">
//                                                 <label htmlFor="">ចំនួនទឹកប្រាក់បញ្ចុះតម្លៃ</label>
//                                                 <input
//                                                     type="number"
//                                                     value={amountDiscount}
//                                                     step={0.01}
//                                                     onChange={(e) => handleAmountDiscountChange(e.target.value)}
//                                                     placeholder="0.0"
//                                                     className="input_text"
//                                                 />
//                                             </div>
//                                             <div className="space-y-2">
//                                                 <label htmlFor="">ទូទាត់សាច់ប្រាក់($): * </label>
//                                                 <input
//                                                     type="number"
//                                                     value={amountPay}
//                                                     required
//                                                     step={0.01}

//                                                     onChange={(e) => handleAmountPayChange(e.target.value)}
//                                                     placeholder="0.00"
//                                                     className="input_text"
//                                                 />
//                                             </div>
//                                             <div className="space-y-2">
//                                                 <label htmlFor="">កាលបរិច្ឆេតបង់ប្រាក់ : *</label>
//                                                 <input type="date"
//                                                     required
//                                                     placeholder="0.0"
//                                                     value={payDob}
//                                                     onChange={(e) => setPayDob(e.target.value)}
//                                                     min={today}
//                                                     className="input_text"
//                                                 />
//                                             </div>
//                                             <div className="space-y-2">
//                                                 <label htmlFor="">វិធីសាទូទាត់</label>
//                                                 <select
//                                                     className='input_text'
//                                                     id="bank"
//                                                     value={paymentType_ID}
//                                                     onChange={e => setPaymentType_ID(e.target.value)}
//                                                 >
//                                                     <option value="" >សូមជ្រើសរើស</option>
//                                                     {paymentType?.map((items) => (
//                                                         <option key={items.id} value={items.id}>
//                                                             {items.pay_manes}
//                                                         </option>
//                                                     ))}

//                                                 </select>
//                                             </div>
//                                             <div className="space-y-2">
//                                                 <label htmlFor="groupCustomer" className="font-NotoSansKhmer">វិធីសាស្សបង់ប្រាក់:</label>
//                                                 <select
//                                                     className='input_text'
//                                                     id="bank"
//                                                     value={account_ID}
//                                                     onChange={e => setAccount_ID(e.target.value)}
//                                                 >
//                                                     <option value="" >សូមជ្រើសរើស</option>
//                                                     {accountBank?.map((items) => (
//                                                         <option key={items.id} value={items.id}>
//                                                             {items.acc_names}
//                                                         </option>
//                                                     ))}

//                                                 </select>
//                                             </div>
//                                             <div className="space-y-2">
//                                                 <label htmlFor="">ចំនួននៅសល់($)</label>
//                                                 <input
//                                                     type="number"
//                                                     placeholder="0.0"
//                                                     value={(amountTotal - amountDiscount - amountPay).toFixed(2)}
//                                                     readOnly
//                                                     className="bg-gray-100 input_text"
//                                                 />
//                                             </div>
//                                         </div>
//                                     </div>
//                                     <div className="flex justify-end mt-5 mb-16">
//                                         <button
//                                             type="submit"
//                                             className="px-4 py-2 font-semibold text-white bg-blue-500 hover:bg-blue-600"
//                                         >
//                                             រក្សាទុក
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
import { toast } from 'react-toastify';
import Pagination from '../pagination/Pagination';
import { FaClipboardList, FaFileCsv, FaFileExcel, FaPencilAlt, FaSearch } from "react-icons/fa";
import { MdDelete, MdClose } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import { IoMdClose } from "react-icons/io";


const Dashboard = () => {

    /// show modal insert
    const [isInsertModalOpen, setIsInsertModalOpen] = useState(false);
    // modal insert
    const openInsertModal = () => {
        setIsInsertModalOpen(true);
    };

    const [isDropdownOpenCategory, setIsDropdownOpenCategory] = useState(false);
    const [isDropdownOpenProduct, setIsDropdownOpenProduct] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [quantities, setQuantities] = useState({});
    const [discounts, setDiscounts] = useState({});
    const [taxes, setTaxes] = useState({});
    const [expiry, setExpiry] = useState({});
    const [cost_priceSale, setCost_Price] = useState({});


    const [category_ID, setCategory_ID] = useState('');
    const [product_ID, setProduct_ID] = useState('');
    const [amountTotal, setAmountTotal] = useState(0);
    const [amountDiscount, setAmounDiscount] = useState(0);
    const [amountPay, setAmounPay] = useState(null);
    const [expentamount, setExpentamount] = useState(0);
    const today = new Date().toISOString().split('T')[0];
    const [payDob, setPayDob] = useState(today);
    const [createDob, setCreateDob] = useState(today);
    const [supplier_id, setSupplier_ID] = useState(null);
    const [status, setStatus] = useState("");
    const [QTY, setQTY] = useState("");
    const [account_ID, setAccount_ID] = useState(null);
    const [paymentType_ID, setPaymentType_ID] = useState(null);
    const [userlogin, setUserLofin] = useState("admin");


    const [supplier, setsupplier] = useState([]);
    const [products, setProducts] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]); // State for selected products
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);




    useEffect(() => {
        fetchsupplier();
        fetchProducts();
        getAccountBank();
        getPaymentType();
    }, []);
    useEffect(() => {
        const total = selectedProducts.reduce((acc, product) => {
            const qty = quantities[product.id] || 1; // Default to 1
            const discount = discounts[product.id] || 0;
            const tax = taxes[product.id] || 0;
            const totalPrice = qty * product.exclude_tax;
            const grandTotal = totalPrice - discount + tax;
            return acc + grandTotal;
        }, 0);
        setAmountTotal(total);
    }, [selectedProducts, quantities, discounts, taxes]);

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Validation
        if (selectedProducts.length === 0) {
            alert("Please add a product to cart");
            return;
        }
        if (!selectedCategory) {
            setError('Please select a supplier!');
            return;
        }
    
        // Prepare order data
        const orderData = {
            paymenttype_id: paymentType_ID,
            account_id: account_ID,
            amount_total: amountTotal,
            amount_discount: amountDiscount,
            amount_pay: amountPay,
            pay_date: payDob,
            products: selectedProducts.map(product => ({
                supplier_id: product.supplier_id,
                product_id: product.id,
                date_by: product.createDob,
                qty: product.QTY,
                discount: product.discounts,
                cost_price: product.cost_price,
                included_tax: product.tax,
                excluded_tax: product.excluded_tax,
                total: product.total,
                status: product.status,
                expiry: product.expiry,
                user_at: product.userlogin
            }))
        };
    
        // Log data for debugging
        console.log(orderData);
    
        try {
            // Send data to backend
            const response = await fetch('http://localhost:6700/api/purchase', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderData)
            });
    
            const result = await response.json();
    
            if (response.ok) {
                toast.success(`Order created successfully!`, {
                    position: "top-right",
                    autoClose: 3000,
                });
                clearCart(); // Clear cart or selected products after successful submission
                navigate('/'); // Redirect if needed
            } else {
                toast.error(result.message || 'Failed to place the order!');
            }
        } catch (error) {
            toast.error('Failed to place the order!', {
                position: "top-right",
                autoClose: 1000,
            });
        } finally {
            setIsSubmitting(false);
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

    const handleSearchCategory = (event) => {
        setSupplier_ID(event.target.value);
    };

    const handleOptionClickCategory = (option) => {
        setSelectedCategory(option.full_names || option.business_names);
        setIsDropdownOpenCategory(false);
        setSupplier_ID(category.id);
        setError(''); // Clear error on selection
    };

    const handleAddProduct = (product) => {
        if (selectedProducts.find((p) => p.id === product.id)) {
            alert("Product already exists!");
        } else {
            setSelectedProducts([...selectedProducts, product]); // Add selected product to the array
            setIsDropdownOpenProduct(false); // Close the dropdown
        }
        setProduct_ID(""); // Clear the search input after adding
    };

    const handleQtyChange = (productId, value) => {
        setQuantities((prevQuantities) => ({
            ...prevQuantities,
            [productId]: value >= 1 ? Number(value) : 1, // Ensure quantity is at least 1
        }));
    };

    const handleDiscountChange = (productId, value) => {
        setDiscounts((prevDiscounts) => ({
            ...prevDiscounts,
            [productId]: value >= 0 ? Number(value) : 0, // Ensure discount is not negative
        }));
    };
    const handleTaxChange = (productId, value) => {
        setTaxes((prevTaxes) => ({
            ...prevTaxes,
            [productId]: value >= 0 ? Number(value) : 0, // Ensure tax is not negative
        }));
    };


    const handleRemoveProduct = (productId) => {
        setSelectedProducts(
            selectedProducts.filter((product) => product.id !== productId)
        );
    };

    // Filter options based on the search query
    const filteredOptionsCategory = supplier.filter(option =>
        option.full_names.toLowerCase().includes(category_ID.toLowerCase()) ||
        option.business_names.toLowerCase().includes(category_ID.toLowerCase())
    );

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
            <div className=''>
                <div className="flex items-center gap-2 ">
                    <p><FaClipboardList className="text-lg " /></p>
                    <p className="font-NotoSansKhmer font-bold ">តារាងបញ្ជីប្រភេទទំនិញ</p>
                </div>
                <div className="flex justify-end">
                    <button onClick={openInsertModal} className="button_only_submit">+ បង្កើតប្រភេទថ្មី</button>
                </div>
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

                        <div className="modal_center max-w-7xl mt-10 mx-2">
                            <div className="modal_title">
                                <h3 className="">ប្រភេទទំនិញ</h3>
                                <MdClose className='text-2xl cursor-pointer' onClick={() => setIsInsertModalOpen(false)} />
                            </div>
                            <div className="modal_form">
                                <form onSubmit={handleSubmit}>
                                    <div className='grid grid-cols-3 gap-4'>
                                        <div className="space-y-2">
                                                <label htmlFor="groupCustomer" className="font-NotoSansKhmer">វិធីសាស្សបង់ប្រាក់:</label>
                                                <select
                                                    className='input_text'
                                                    id="bank"
                                                    value={supplier_id}
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
                                        {/* Status Dropdown */}
                                        <div className="col-span-1 space-y-2">
                                            <label htmlFor="" className="font-bold font-NotoSansKhmer">ស្ថានភាព: *</label>
                                            <select name="" id="" 
                                            required 
                                            value={status}
                                            onChange={(e)=>setStatus(e.target.value)}
                                            className="input_text font-NotoSansKhmer">
                                                <option value="" selected disabled>--ជ្រើសរើស--</option>
                                                <option value={1}>បានទទួល</option>
                                                <option value={2}>រងចាំ</option>
                                                <option value={3}>បានបញ្ជាទិញ</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className='md:w-[70%] w-[100%] mx-auto m-12'>
                                        {/* Product Search Input */}
                                        <div className="relative items-center gap-3 mx-auto my-2">
                                            <div className="relative">
                                                <div className="flex justify-center">
                                                    <input
                                                        type="text"
                                                        className="w-full input_text"
                                                        placeholder="ស្វែងរកផលិតផល"
                                                        value={product_ID}
                                                        onChange={(e) => {
                                                            setProduct_ID(e.target.value);
                                                            setIsDropdownOpenProduct(true);
                                                        }}
                                                        onFocus={() => setIsDropdownOpenProduct(false)}
                                                    />
                                                    <div className="absolute right-[20%] top-3.5">
                                                        <FaSearch className="text-gray-400" />
                                                    </div>
                                                </div>
                                                <div className="absolute top-0 right-[-3%]">
                                                    <button type='button' className="py-2.5 button_only_submit">
                                                        + ជ្រើសរើសផលិតផល
                                                    </button>
                                                </div>
                                            </div>
                                            {/* Dropdown for Products */}
                                            {isDropdownOpenProduct && (
                                                <div className="flex justify-center">
                                                    <ul className="absolute z-[2] w-full mt-1 overflow-y-auto bg-white border border-gray-300 shadow-md max-h-48">
                                                        {filteredOptionsProduct.length > 0 ? (
                                                            filteredOptionsProduct.map((product) => (
                                                                <li
                                                                    key={product.id}
                                                                    className="p-2 text-gray-700 cursor-pointer hover:bg-gray-200 hover:text-black"
                                                                    onClick={() => handleAddProduct(product)} // Add product on click
                                                                >
                                                                    {product.pro_names}
                                                                </li>
                                                            ))
                                                        ) : (
                                                            <li className="p-2 text-gray-500 font-NotoSansKhmer">
                                                                មិនមានកាត ឈ្មោះនេះ​ <span className="font-bold">{product_ID}</span>{" "} ទេ!
                                                            </li>
                                                        )}
                                                    </ul>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className='p-3'>
                                        {/* Table for Selected Products */}
                                        <h3 className="text-lg font-semibold">កំណត់ការបញ្ជាទិញ</h3>
                                        <table className="mt-4 border-collapse w-full">
                                            <thead className="p-2 text-white bg-blue-600/90">
                                                <tr>
                                                    <th className="p-2 border w-[7%]">លេខរៀង</th>
                                                    <th className="p-2 border w-[20%]">ឈ្មោះផលិតផល</th>
                                                    <th className="p-2 border w-[10%]">ថ្ងៃផុតកំណត់</th>
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
                                                        const qty = quantities[product.id] || 1; // Default to 1 if no quantity is set
                                                        const discount = discounts[product.id] || 0; // Default discount to 0
                                                        const tax = taxes[product.id] || 0; // Get tax for the product, default to 0
                                                        const totalPrice = qty * product.exclude_tax; // Calculate total price
                                                        const grandTotal = totalPrice - discount + tax; // Calculate grand total
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
                                                                        type="date"
                                                                        value={expiry}
                                                                        min={today}
                                                                        onChange={(e) => setExpiry(e.target.value)}
                                                                        className="bg-gray-100 input_text"
                                                                    />
                                                                </td>
                                                                <td className="w-[10%]">
                                                                    <input
                                                                        min={0}
                                                                        disabled
                                                                        type="number"
                                                                        placeholder="0.0"
                                                                        value={product.cost_price}
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
                                                                        disabled
                                                                        type="number"
                                                                        placeholder="0.0"
                                                                        value={product.exclude_tax}
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

                                    <div className="mt-3">
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
                                                    value={(amountTotal - amountDiscount - amountPay).toFixed(2)}
                                                    readOnly
                                                    className="bg-gray-100 input_text"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex justify-end mt-5 mb-16">
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
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Dashboard;
