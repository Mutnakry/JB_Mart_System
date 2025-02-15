
import React, { useEffect, useState } from 'react';
import { FaMoneyBill, FaRegIdCard, FaRegMoneyBillAlt, FaHandHoldingMedical } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
import { useCart } from './CartContext';
import { toast } from 'react-toastify';
import SearchAddToCartProduct from './SearchAddToCartProduct'
import axios from 'axios';
import { motion, AnimatePresence } from "framer-motion";
import AddCustomer from '../contract/modal/AddCustomer';
import { API_URL } from '../../service/api'
import { useNavigate } from 'react-router-dom';
import { use } from 'react';
import NullImage from '../../assets/image.png';



const Cart = () => {
  const { cart, removeItem, clearCart, updateQuantity, holdOrder } = useCart();

  const [ispaymentTypeCurrency, setPaymentTypeCurrency] = useState('usd');
  const totalItemCount = cart.reduce((total, item) => total + item.quantity, 0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userLoginNames, setUserLoginNames] = useState('');
  const [account_ID, setAccount_ID] = useState(null);
  const [paymentType_ID, setPaymentType_ID] = useState(null);
  const [description, setDescription] = useState('');
  const [payMoney, setPayMoney] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    setUserLoginNames(localStorage.getItem('user_names') || '');
    getALLCustomer();
    getCurrencyData();
    getAccountBank();
    getPaymentType();
  }, [])
  // add customer
  const [customers, setCustomers] = useState([]);
  const [customer_ID, setCustomer_ID] = useState('1');
  const getALLCustomer = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/customer/getcustomerdiscount`);
      setCustomers(response.data); // Default to an empty array if no data
    } catch (error) {
      console.error('Error fetching customers data', error);
      toast.error('Error fetching customers data');
    }
  };

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

  ///// get payment Type
  const [paymentType, setPaymentType] = useState([]);
  const getPaymentType = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/payment_type`);
      setPaymentType(response.data.payment_type);
      console.log(response.data)
    } catch (error) {
      setError('Error fetching categories data');
    }
  };

  const [exchangeRateKHR, setExchangeRateKHR] = useState(4200);
  const [thbToKhrRateTHB, setThbToKhrRateTHB] = useState(120);

  const getCurrencyData = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/currency`);
      const fetchedData = response.data;
      const khrRate = parseFloat(fetchedData.find(c => c.name === "KHR")?.rate) || 4200;
      const thbRate = parseFloat(fetchedData.find(c => c.name === "THB")?.rate) || 120;
      console.log('khr', khrRate)
      console.log('thb', thbRate)
      setExchangeRateKHR(khrRate);
      setThbToKhrRateTHB(thbRate);
    } catch (error) {
      console.error("Error fetching exchange rates:", error);
    }
  };


  // const [selectedCustomerName, setSelectedCustomerName] = useState("");
  const [getCustomerDiscount, setGetCustomerDiscount] = useState("");
  const [total_amount_di_sum, seTtotal_amount_di_sum] = useState(0);
  const [TotalAmount_type_currency, setTotalAmount_type_currency] = useState('');

  useEffect(() => {
    const selectedCustomer = customers.find((customer) => customer.id === parseInt(customer_ID));
    if (selectedCustomer) {
      // setSelectedCustomerName(`${selectedCustomer.full_names} ${selectedCustomer.business_names}`);
      setGetCustomerDiscount(selectedCustomer.discount)
      seTtotal_amount_di_sum(selectedCustomer.total_amount_difference_sum)
      setTotalAmount_type_currency(selectedCustomer.type_currency)
      console.log('selectedCustomer', selectedCustomer.group_id);
      console.log('total_amount_di_sum', total_amount_di_sum);
      console.log('getCustomerDiscount', getCustomerDiscount);
      console.log('TotalAmount_type_currency', TotalAmount_type_currency);
    }
  }, [customer_ID, customers]);

  const [isInsertModalOpen, setIsInsertModalOpen] = useState(false);

  const openInsertModal = () => {
    if (cart.length === 0) {
      toast.error('មិនអាចរក្សាទុកបានទេ!', {
        position: "top-center",
        autoClose: 500,
      });
      setIsModalCustomer(false);
      return;
    }
    setIsInsertModalOpen(true);
  };

  const [isModalCustomer, setIsModalCustomer] = useState(false);


  const openInsertCustomer = () => {

    setIsModalCustomer(true);
  };




  const [exchanges, setExchanges] = useState(1);
  const handleChangepaymentType = (e) => {
    setPaymentTypeCurrency(e.target.value);
    setDeposit(0);
    let calculatedPayMoney = finalTotal;
    let ExchangesPayment = 1;
    if (e.target.value === "usd") {
      calculatedPayMoney = finalTotal;
      ExchangesPayment = 1;
    } else if (e.target.value === "khr") {
      calculatedPayMoney = finalTotal * exchangeRateKHR;
      ExchangesPayment = exchangeRateKHR;
    } else if (e.target.value === "thb") {
      calculatedPayMoney = finalTotal * (exchangeRateKHR / thbToKhrRateTHB);
      // ExchangesPayment = thbToKhrRateTHB;
      ExchangesPayment = (exchangeRateKHR / thbToKhrRateTHB);
    }

    setPayMoney(calculatedPayMoney);
    setExchanges(ExchangesPayment)
  };


  const handleRemoveItem = (id) => {
    removeItem(id);
    toast.success('លុបបានជោគជ័យ !', {
      position: "top-right",
      autoClose: 1000,
    });
  };


  const handleQuantityChange = (item, delta) => {
    const newQuantity = item.quantity + delta;

    if (item.mg_stock === "enable" && newQuantity > item.qty) {
      toast.error(`មានតែទំនិញ ${item.qty} ប៉ុណ្ណោះក្នុងស្តុក។`, {
        position: "top-right",
        autoClose: 1000,
      });
    } else if (newQuantity > 0) {
      updateQuantity(item.id, newQuantity);
    } else {
      removeItem(item.id);
    }
  };


  // Calculate total amount and discounts
  const totalAmount = cart.reduce((acc, item) => {
    const total = (item.quantity * item.exclude_tax);
    return acc + total;
  }, 0);

  const discountTotal = cart.reduce((acc, item) => {
    const total = (item.quantity * item.discount);
    return acc + total;
  }, 0);

  const handleClearCart = () => {
    const confirmed = window.confirm('Are you sure you want to clear the cart?');
    if (confirmed) {
      clearCart();
    }
  };


  // console.log('totalAmount',totalAmount)
  const finalTotal = totalAmount - discountTotal - getCustomerDiscount;


  const [payment, setPayment] = useState(0);
  const [Deposit, setDeposit] = useState(0);
  console.log('Deposit', Deposit)

  const handleChangeMoney = (e) => {
    const newMoney = parseFloat(e.target.value) || 0;
    if (isNaN(newMoney) || newMoney < 0) return;
    setPayMoney(newMoney);
    const newPayment = newMoney;
    setPayment(newPayment);

    if (ispaymentTypeCurrency == "usd") {
      const cashDeposit = newMoney > finalTotal ? newMoney - finalTotal : 0;
      setDeposit(cashDeposit);
    }
    else if (ispaymentTypeCurrency == "khr") {
      const cashDeposit = newMoney > (finalTotal * exchangeRateKHR) ? (newMoney - (finalTotal * exchangeRateKHR)) : 0;
      setDeposit(cashDeposit);
    } else if (ispaymentTypeCurrency == "thb") {
      const cashDeposit = newMoney > (finalTotal * (exchangeRateKHR / thbToKhrRateTHB)) ? (newMoney - finalTotal * (exchangeRateKHR / thbToKhrRateTHB)) : 0;
      setDeposit(cashDeposit);
    }
  };

  // const handleSaveData1 = async (e) => {
  //   e.preventDefault();


  //   let totalAmount = 0; // Declare totalAmount

  //   // Prepare product data
  //   const productsData = cart.map(item => {
  //     const qty = item.quantity;
  //     const discount = item.discount || 0;
  //     const tax = item.tax || 0;
  //     const totalPrice = qty * item.exclude_tax;
  //     const grandTotal = totalPrice - (discount * qty + tax);

  //     return {
  //       customer_id: customer_ID,
  //       product_id: item.id,
  //       qty: qty,
  //       price: item.exclude_tax,
  //       discount: discount,
  //       total: grandTotal,
  //       user_at: userLoginNames,
  //     };
  //   });

  //   // Prepare final order data
  //   const orderData = {
  //     paymenttype_id: paymentType_ID,
  //     type_currency: ispaymentTypeCurrency,
  //     account_id: account_ID,
  //     total_amount: totalAmount,
  //     balance_amount: payMoney || totalAmount,
  //     discount: getCustomerDiscount || 0,
  //     user_at: userLoginNames,
  //     products: productsData,
  //   };

  //   setIsSubmitting(true);
  //   console.log("Order Data:", orderData);

  // };

  const [messageAmountDi, setMessageAmountDi] = useState("");
  const handleSaveData = async (e) => {
    e.preventDefault();

    // Validation
    if (cart.length === 0) {
      // alert("មិនអាចរក្សាទុកបានទេ!");
      toast.error('មិនអាចរក្សាទុកបានទេ!', {
        position: "top-center",
        autoClose: 500,
      });
      return;
    }

    let totalAmount = 0; // Declare totalAmount
    let totalDiscount = 0;

    // Prepare product data
    const productsData = cart.map(item => {
      const qty = item.quantity;
      const discount = item.discount || 0;
      const tax = item.tax || 0;
      const totalPrice = qty * item.exclude_tax;
      const grandTotal = totalPrice - (discount * qty + tax);

      // Accumulate totals
      totalAmount += grandTotal;
      totalDiscount += discount * qty;

      return {
        customer_id: customer_ID,
        product_id: item.id,
        qty: qty,
        price: item.exclude_tax,
        discount: discount,
        total: grandTotal,
        user_at: userLoginNames,
      };
    });

    // Calculate payMoney based on currency type **after** totalAmount is calculated
    let calculatedPayMoney = finalTotal;
    if (ispaymentTypeCurrency === "usd") {
      calculatedPayMoney = finalTotal;
    } else if (ispaymentTypeCurrency === "khr") {
      calculatedPayMoney = finalTotal * exchangeRateKHR;
    } else if (ispaymentTypeCurrency === "thb") {
      calculatedPayMoney = finalTotal * (exchangeRateKHR / thbToKhrRateTHB);
    }

    setPayMoney(calculatedPayMoney);

    let newPayment = payMoney;
    if (payMoney > calculatedPayMoney) {
      newPayment = calculatedPayMoney
    } else if (payMoney < calculatedPayMoney) {
      newPayment = payMoney
    }

    if (total_amount_di_sum > 0) {

    }

    if (total_amount_di_sum > 0) {
      toast.error('ឈ្មោះនេះជុំពាក់លើកមុនមិនទាន់អាចទិញផលិតផលបានទេ!', {
        position: "top-center",
        autoClose: 500,
      });
      setMessageAmountDi('ឈ្មោះនេះជុំពាក់លើកមុនមិនទាន់អាចទិញផលិតផលបានទេ​!')
      return;
    }


    // Prepare final order data
    const orderData = {
      account_id: account_ID,
      paymenttype_id: paymentType_ID,
      total_amount_dola: finalTotal,
      total_amount: calculatedPayMoney || totalAmount,  /// total price all
      // balance_amount: payMoney || calculatedPayMoney,  /// payment total
      balance_amount: newPayment || calculatedPayMoney,  /// payment total
      changes: exchanges,
      amount_discount: Number(getCustomerDiscount),
      type_currency: ispaymentTypeCurrency,
      description: description,
      user_at: userLoginNames,
      products: productsData,
    };

    // setIsSubmitting(true);
    console.log("Order Data:", orderData);

    navigate('/index/invoce');
    // try {
    //   setIsSubmitting(true);
    //   const response = await fetch(`${API_URL}/api/order`, {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(orderData),
    //   });

    //   const data = await response.json();
    //   if (response.ok) {
    //     navigate('/index/invoce');
    //     setAccount_ID('');
    //     setCustomer_ID('');
    //     setPaymentType_ID('');
    //     setPaymentTypeCurrency('usd')
    //     setIsInsertModalOpen(false);
    //     setPayMoney(0);
    //     setPaymentTypeCurrency('usd');

    //     clearCart();
    //   } else {
    //     alert("Error: " + data.error);
    //   }
    // } catch (error) {
    //   console.error("Error during order submission:", error);
    //   alert("There was an error saving the order.");

    // } finally {
    //   setIsSubmitting(false);
    //   clearCart();
    //   setIsInsertModalOpen(false);
    // }

  };



  return (
    <div className="min-h-screen overflow-y-auto bg-gray-100 p-5 px-2 print:hidden">
      {/* Top Section */}
      <div className="grid gap-2 xl:grid-cols-2 md:grid-cols-1 pb-2 justify-between ">

        <div>
          <div className="flex items-center">
            <div className="col-span-1 space-y-2">
              <select
                className='input_text w-[250px]'
                id="unit_ID"
                value={customer_ID}
                required
                onChange={e => setCustomer_ID(e.target.value)}
              >
                {customers.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.full_names} {item.business_names}
                  </option>
                ))}
              </select>
            </div>
            <button onClick={openInsertCustomer} className="bg-blue-500 text-white border border-blue-500 px-4 py-2">+</button>
          </div>
          <span className='text-red-600'> {messageAmountDi && <p>{messageAmountDi}</p>}</span>
        </div>

        <div className="flex items-center space-x-2">
          <SearchAddToCartProduct />
        </div>
      </div>


      {/* Table Section */}
      <div className="overflow-x-auto h-[60vh] bg-white p-1 shadow-md scrollbar-hidden">
        <table className="min-w-full text-center">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal whitespace-nowrap">
              <th className="py-3 w-8 px-1">#</th>
              <th className="py-3 px-6">រូបភាព</th>
              <th className="py-3 px-2">ឈ្មោះ</th>
              <th className="py-3 px-6 hidden">stock</th>
              <th className="py-3">បរិមាណ</th>
              <th className="py-3 px-6">តម្លៃ+ពន្ធ</th>
              <th className="py-3 px-6">បន្ចុះតម្លៃ</th>
              <th className="py-3 px-6">សរុប</th>
              <th className="py-3 text-red-600 px-6"><MdDeleteForever /></th>
            </tr>
          </thead>

          <tbody className="text-gray-600 text-sm">
            {cart.map((item, index) => (
              <tr className="border-b border-gray-200" key={index}>
                <td className="py-3 px-2">{index + 1}</td>
                <td>
                  {/* <img className='h-8' src={`${API_URL}/image/${item.image}`} alt={item.name} /> */}
                  {item.image ? (
                    <div className="flex items-center justify-center h-8">
                      <img
                        src={`${API_URL}/image/${item.image}`}
                        alt={item.pro_names}
                        className="object-contain h-full w-full "
                      />
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-8">
                      <img
                        src={NullImage}
                        alt={item.pro_names}
                        className="object-contain h-full w-full "
                      />
                    </div>
                  )}
                </td>
                <td className="py-3 whitespace-nowrap">{item.pro_names}</td>
                <td className="py-3 px-6 hidden">{item.qty}</td>
                <td>
                  <div className="flex items-center border border-pink-500 justify-between">
                    <button
                      type="button"
                      className={`text-gray-500 text-xl w-full hover:text-white  px-4 ${item.quantity <= 1 ? 'cursor-not-allowed bg-gray-200' : 'hover:bg-pink-400'}`}
                      onClick={() => handleQuantityChange(item, -1)}
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <input
                      type="text"
                      className="w-12 text-center border-l text-xl border-r border-pink-500"
                      value={item.quantity}
                      readOnly
                    />
                    <button
                      type="button"
                      className="text-gray-500 text-xl w-full hover:text-white hover:bg-pink-400 px-4"
                      onClick={() => handleQuantityChange(item, 1)}
                    >
                      +
                    </button>
                  </div>
                  <input type="text" className='input_text text-center' value={item.unit_names} readOnly />
                </td>
                <td className="py-3 px-6">$ {(item.exclude_tax)} </td>
                <td className="py-3 px-6">$ {(item.discount)}</td>
                <td className="py-3 px-6">$ {((item.quantity * item.exclude_tax) - (item.discount * item.quantity)).toFixed(2)}</td>
                <td className="py-3 px-6">
                  <MdDeleteForever onClick={() => handleRemoveItem(item.id)} className="cursor-pointer text-red-600 text-xl" />
                </td>
              </tr>

            ))}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-4 gap-4 text-sm bg-gray-200 px-6 py-4">

        <div className='space-y-1'>
          <p>សរុប:</p>
          <p>$ {totalAmount.toFixed(2)}</p>
          {finalTotal !== 0 && (
            <>
              <p>{(totalAmount * exchangeRateKHR).toFixed(2)} រៀល</p>
              <p>{(totalAmount * (exchangeRateKHR / thbToKhrRateTHB)).toFixed(2)} បាត</p>
            </>
          )}
        </div>
        <div className='s space-y-1'>
          <p>ការបញ្ចុះតំលៃ:</p>
          <p>${discountTotal.toFixed(2)}</p>
          {discountTotal !== 0 && (
            <>
              <p>{(discountTotal * exchangeRateKHR).toFixed(2)} រៀល</p>
              <p>{(discountTotal * (exchangeRateKHR / thbToKhrRateTHB)).toFixed(2)} បាត</p>
            </>
          )}
        </div>
        <div className='s space-y-1'>
          <p>បន្ថែម:</p>
          <p>${getCustomerDiscount}</p>
          <div className='col-span-4'>

            <p>{TotalAmount_type_currency === "usd" ? (
              <div>
                <span className="block text-lg mb-2">
                  {total_amount_di_sum} $
                </span>
              </div>
            ) : TotalAmount_type_currency === "khr" ? (
              <div>
                <span className="block text-lg mb-2">
                  {total_amount_di_sum} រៀល
                </span>
              </div>
            ) : TotalAmount_type_currency === "thb" ? (
              <div>
                <span className="block text-lg mb-2">
                  {total_amount_di_sum} បាត
                </span>
              </div>
            ) : null}</p>
          </div>
        </div>
        <div className='s space-y-1'>
          <p>សរុបចុងក្រោយ:</p>
          <p>${finalTotal.toFixed(2)}</p>
          {finalTotal !== 0 && (
            <>
              <p>{(finalTotal * exchangeRateKHR).toFixed(2)} រៀល</p>
              <p>{(finalTotal * (exchangeRateKHR / thbToKhrRateTHB)).toFixed(2)} បាត</p>
            </>
          )}

        </div>
      </div>


      <footer class="fixed  bottom-0 left-0 z-20 w-full flex p-4 space-x-4 ">
        <div>
          <button onClick={openInsertModal} className='p-2 bg-green-600 text-md text-white flex' aria-label="Add expense">
            <span className="flex items-center">
              <FaRegIdCard className="mr-1" /> ការទូទាត់ច្រើនទម្រង់
            </span>
          </button>
        </div>
        <div>
          <button disabled={isSubmitting} onClick={handleSaveData} className='bg-purple-600 text-md p-2 text-white flex' aria-label="Add expense">
            <span className="flex items-center">
              <FaMoneyBill className="mr-1" />  {isSubmitting ? 'សាច់ប្រាក់...' : 'សាច់ប្រាក់'}
            </span>
          </button>
        </div>
        <div>
          <button onClick={holdOrder} className='bg-pink-600 text-md p-2 text-white flex' aria-label="Add expense">
            <span className="flex items-center">
              <FaHandHoldingMedical className="mr-1" />
              ព្រៀងទុក
            </span>
          </button>
        </div>
        <div>
          <button className='bg-red-600 text-md p-2 text-white flex' aria-label="Add expense">
            <span className="flex items-center" onClick={handleClearCart}>
              <MdDeleteForever className="mr-1" /> បោះបង់
            </span>
          </button>
        </div>
        <div>
          <button className='bg-gray-500 text-md p-2 cursor-text text-white flex' aria-label="Add expense">
            <span className="flex items-center">
              <FaRegMoneyBillAlt className="mr-1" /> សាច់ប្រាក់សរុបត្រូវបង់ <span> $ {finalTotal.toFixed(2)}</span>
            </span>
          </button>
        </div>
      </footer>

      {/* <HoldOrder /> */}


      {/* Modal  payment */}
      <AnimatePresence>
        {isInsertModalOpen && (
          <motion.div
            className="modal fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
          >
            <div className="modal_center max-w-[1024px] bg-white mx-6">
              <div className="modal_title flex justify-between items-center">
                <h3 className="">ការទូទាត់</h3>
                <MdClose
                  className='text-2xl cursor-pointer'
                  onClick={() => setIsInsertModalOpen(false)}
                  aria-label="Close modal"
                />
              </div>
              <div className='px-5 mb-2'>
                <p className='font-bold font-NotoSansKhmer flex space-x-3'><span>សមតុល្យសាច់ប្រាក់លើកមុន: </span>
                  <span className=''>
                    {TotalAmount_type_currency === "usd" ? (
                      <div>
                        <span className="block text-lg mb-2  text-red-500">
                          {total_amount_di_sum} $
                        </span>
                      </div>
                    ) : TotalAmount_type_currency === "khr" ? (
                      <div>
                        <span className="block text-lg mb-2  text-red-500">
                          {total_amount_di_sum} រៀល
                        </span>
                      </div>
                    ) : TotalAmount_type_currency === "thb" ? (
                      <div>
                        <span className="block text-lg mb-2 ">
                          {total_amount_di_sum} បាត
                        </span>
                      </div>
                    ) : null}</span>
                </p>
                <div class=" flex gap-5 w-full">
                  <div className='w-3/4 drop-shadow p-3 bg-gray-200'>
                    <div class="flex mb-4">
                      <div class="w-1/2 pr-2">
                        <label for="method" class="block text-sm font-medium text-gray-700">ចំនួន: *</label>
                        <input
                          type="number"
                          id="price"
                          value={payMoney || finalTotal}
                          // value={payMoney}

                          min={0}
                          step={0.01}
                          onChange={handleChangeMoney}
                          class="input_text bg-white font-NotoSansKhmer"
                          // placeholder={finalTotal.toFixed(2)} 
                          required
                        />
                      </div>
                      <div class="w-1/2 pr-2">
                        <label for="bank" class="block text-sm font-medium text-gray-700">បង់ជាសាចប្រាក់:</label>
                        <select id="paymenttype"
                          value={ispaymentTypeCurrency}
                          onChange={handleChangepaymentType}
                          class="input_text bg-white  font-NotoSansKhmer">
                          <option value="usd">ដុល្លារ</option>
                          <option value="khr">រៀល</option>
                          <option value="thb">បាត</option>
                        </select>
                      </div>

                      <div class="w-1/2 pr-2 ">
                        <label for="method" className="block text-sm font-medium font-NotoSansKhmer text-gray-700">វិធី​សា​ស្រ្ត​ទូទាត់ប្រាក់: *</label>

                        <select
                          class="input_text bg-white  font-NotoSansKhmer"
                          id="bank"
                          value={paymentType_ID}
                          onChange={e => setPaymentType_ID(e.target.value)}
                        >
                          <option value="" >មិនមាន</option>
                          {paymentType?.map((items) => (
                            <option key={items.id} value={items.id}>
                              {items.pay_manes}
                            </option>
                          ))}

                        </select>
                      </div>
                      <div class="w-1/2 pl-2">
                        <div className="">
                          <label htmlFor="groupCustomer" className="block text-sm font-medium font-NotoSansKhmer text-gray-700">វិធីសាស្ត្របង់ប្រាក់:</label>
                          <select
                            class="input_text bg-white  font-NotoSansKhmer"
                            id="bank"
                            value={account_ID}
                            onChange={e => setAccount_ID(e.target.value)}
                          >
                            <option value="" >មិនមាន</option>
                            {accountBank?.map((items) => (
                              <option key={items.id} value={items.id} disabled={items.status === 'off'}>
                                {items.acc_names}
                              </option>
                            ))}

                          </select>
                        </div>
                      </div>
                    </div>
                    <div class="space-y-2">
                      <label for="comments" class="block text-sm font-medium text-gray-700">កំណត់ចំណាំការទូទាត់:</label>
                      <textarea
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        id="comments" class="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"></textarea>
                    </div>
                  </div>

                  <div class="bg-blue-500 w-1/4 drop-shadow text-white text-center py-4">
                    <div class="mb-4 border-b border-gray-400">
                      <span class="block font-semibold">អីវ៉ាន់សរុប:</span>
                      <span class="block text-lg mb-2">{totalItemCount}</span>
                    </div>

                    {/* //////////// */}
                    <div class="mb-4 border-b border-gray-400">
                      <span class="block font-semibold">ប្រាក់សរុបត្រូវបង់:</span>
                      <span class="block text-lg mb-2">{finalTotal.toFixed(2)} $</span>
                      {totalAmount !== 0 && (
                        <>
                          <p>{(finalTotal * exchangeRateKHR).toFixed(2)} រៀល</p>
                          <p>{(finalTotal * (exchangeRateKHR / thbToKhrRateTHB)).toFixed(2)} បាត</p>
                        </>
                      )}

                    </div>
                    <div class="mb-4 border-b border-gray-400">
                      <span class="block font-semibold">ការបញ្ចុះតំលៃ:</span>
                      {ispaymentTypeCurrency === "usd" ? (
                        <div>
                          <span className="block text-lg mb-2">
                            <span class="block text-lg mb-2">{Number(getCustomerDiscount).toFixed(2)} $</span>
                          </span>
                        </div>
                      ) : ispaymentTypeCurrency === "khr" ? (
                        <div>
                          <span className="block text-lg mb-2">
                            <p>{(Number(getCustomerDiscount) * exchangeRateKHR).toFixed(2)} រៀល</p>
                          </span>
                        </div>
                      ) : ispaymentTypeCurrency === "thb" ? (
                        <div>
                          <span className="block text-lg mb-2">
                            <p>{(Number(getCustomerDiscount) * (exchangeRateKHR / thbToKhrRateTHB)).toFixed(2)} បាត</p>                          </span>
                        </div>
                      ) : null}


                    </div>
                    <div class="mb-4 border-b border-gray-400">
                      <span class="block font-semibold">ការទូទាត់សរុប:</span>
                      {ispaymentTypeCurrency === "usd" ? (
                        <div>
                          <span className="block text-lg mb-2">
                            {payment > 0 ? payment.toFixed(2) : finalTotal.toFixed(2)} $
                          </span>
                        </div>
                      ) : ispaymentTypeCurrency === "khr" ? (
                        <div>
                          <span className="block text-lg mb-2">
                            {payment > 0 ? payment.toFixed(2) : (finalTotal * exchangeRateKHR).toFixed(2)} រៀល
                          </span>
                        </div>
                      ) : ispaymentTypeCurrency === "thb" ? (
                        <div>
                          <span className="block text-lg mb-2">
                            {payment > 0 ? payment.toFixed(2) : (finalTotal * (exchangeRateKHR / thbToKhrRateTHB)).toFixed(2)} បាត
                          </span>
                        </div>
                      ) : null}
                    </div>
                    <div class="mb-4 border-b border-gray-400">

                      <span class="block font-semibold">សាច់ប្រាក់នៅសល់:</span>
                      {ispaymentTypeCurrency === "usd" ? (
                        <div>
                          <span className="block text-lg mb-2">
                            <span class="block text-red-600  text-lg mb-2">
                              {Math.max(finalTotal - (payMoney || finalTotal), 0).toFixed(2) + ' $'}
                            </span>
                          </span>
                        </div>
                      ) : ispaymentTypeCurrency === "khr" ? (
                        <div>
                          <span className="block text-lg mb-2">
                            <span class="block text-red-600  text-lg mb-2">
                              {Math.max((finalTotal * exchangeRateKHR) - (payMoney || finalTotal), 0).toFixed(2) + ' រៀល'}
                            </span>
                          </span>
                        </div>
                      ) : ispaymentTypeCurrency === "thb" ? (
                        <div>
                          <span className="block text-lg mb-2">
                            <span class="block text-red-600  text-lg mb-2"> {Math.max((finalTotal * (exchangeRateKHR / thbToKhrRateTHB)) - (payMoney || finalTotal), 0).toFixed(2) + ' បាត'}
                            </span>
                          </span>
                        </div>
                      ) : null}
                    </div>
                    <div class="mb-2">
                      <span class="block font-semibold">សរុបសំរាប់:</span>
                      {ispaymentTypeCurrency === "usd" ? (
                        <div>
                          <span className="block text-lg mb-2">
                            {Deposit.toFixed(2)} $
                          </span>
                        </div>
                      ) : ispaymentTypeCurrency === "khr" ? (
                        <div>
                          <span className="block text-lg mb-2">
                            {Deposit.toFixed(2)} រៀល
                          </span>
                        </div>
                      ) : ispaymentTypeCurrency === "thb" ? (
                        <div>
                          <span className="block text-lg mb-2">
                            {Deposit.toFixed(2)} បាត
                          </span>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
              <div class="flex justify-end border-t py-4">
                <div className='flex  gap-4 px-4'>
                  <button onClick={() => setIsInsertModalOpen(false)} class="button_only_close hover:text-red-500">បិទ</button>

                  <button disabled={isSubmitting} onClick={handleSaveData} class="button_only_submit">
                    {isSubmitting ? 'បញ្ចប់ការទូទាត់...' : 'បញ្ចប់ការទូទាត់'}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isModalCustomer && (
          <AddCustomer setIsModalCustomer={setIsModalCustomer} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Cart;



