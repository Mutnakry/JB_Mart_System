import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import 'flowbite';
import React, { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';


// import page PageNotFound
import PageNotFound from './view/PageNotFound';

// import from view Dashboard
import Dashboard from './view/Dashboard';

// Login  and Register user
import Login from './component/Login';
import Register from './component/Register';
import UserList from './view/User/UserList';
import CreateUser from './view/User/CreateUser';
import UpdateUser from './view/User/UpdateUser';

// defult page
import Index from './view/Index';

//page Customer groupscomer supplier
import Category from './view/product/Category';
import Brands from './view/product/Brands';
import Unit from './view/product/Unit';

//page Customer groupscomer supplier
import Customer from './view/contact/Customer';
import Supplier from './view/contact/Supplier';
import GroupCustomer from './view/contact/GroupCustomer';
//page Customer pament order
import Customer_payment from './component/customer_payment/customer_payment';
import Finh_CustomerPayment from './component/customer_payment/Finh_CustomerPayment';

// import TestSelectSearch from './view/TestSelectSearch';
// import ProductCategory from './component/pos/ProductCategory'

// pos
import MainForm from './view/pos/MainForm';
import MainFormID from './view/pos/MainFromID'
/// pos invoie
import InvoiceCart from './component/pos/InvoiceCart';


// const  Type
import CostType from './view/cost/CostType';
import PaymentType from './view/paymentType/PaymentType';

// const
import Cost from './view/cost/Cost';
import PrintCost from './component/const/PrintCost';

// Exchang reate 
import ExchangRate from './view/currency/ExchangRate';

// puchase
import Purchase from './view/purchase/Purchase';
import CreatePurchase from './component/purchase/CreatePurchase';
import UpdatePuchase from './component/purchase/UpdatePuchase';
import UpdatePuchase1 from './component/purchase/Update';
import PrintPurchaseDetail from './component/purchase/PrintPurchaseDetail'



/// accout
import AccountDetailTransfer from './component/acount/AccountDetailTransfer';
import Acount from './view/account/Account';

// product
//page product
import Product from './view/product/Product';
import PrintProduct from './component/product/PrintProduct';
import UpdateProduct from './component/product/product/Updateproduct';
import CreateProduct from './component/product/product/CreateProduct';
import ProductWarranties from './component/product/product/ProductWarranties';

// import page Product Discount
import CreateDiscountProduct from './component/discountproduct/CreateDiscountProduct';
import DiscountProductList from './component/discountproduct/DiscountProductList';
import UpdateDiscountProduct from './component/discountproduct/UpdateDiscountProduct';
// import UpdateDiscountProduct from './component/discountproduct/Update';


import Order_List from './component/order/Order_List';
import Order_Repay from './component/order/Order_Repay'
import FinhOrder from './component/order/FinhOrder'

///// invoice
import InvocePurchase from './component/invoie/Purchase'
import InvoceSaleAndPuchase from './component/invoie/SaleAndPuchase'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>

          <Route path="*" element={<PageNotFound />} />


          <Route path="/login" element={isAuthenticated ? <Navigate to="/Dashboard" /> : <Login />} />
          <Route path="/register" element={isAuthenticated ? <Register /> : <Navigate to="/login" />} />
          <Route path="/user" element={<UserList />} />
          <Route path="/createuser" element={<CreateUser />} />
          <Route path="/user/:id" element={<UpdateUser />} />


          <Route path="/" element={<Index />} />
          <Route path="/Dashboard" element={<Dashboard />} />

          {/* category​  and brands */}
          <Route path='/category' element={isAuthenticated ? <Category /> : <Navigate to="/" />} />
          <Route path='/brands' element={isAuthenticated ? <Brands /> : <Navigate to="/" />} />


          {/* varrenty */}
          <Route path='/varrenty' element={<ProductWarranties />} />

          {/* unit ប្រភេទទំនិញ page */}
          <Route path='/udit' element={isAuthenticated ? <Unit /> : <Navigate to="/" />} />

          {/* const page */}
          <Route path='/cost' element={<Cost />} />
          <Route path='/cost/:id' element={<PrintCost />} />

          {/* const Type page */}
          <Route path='/costtype' element={isAuthenticated ? <CostType /> : <Navigate to="/" />} />

          {/* customer , supplier , groupcustomer page */}
          <Route path='/customer' element={isAuthenticated ? <Customer /> : <Navigate to="/" />} />
          <Route path='/supplier' element={isAuthenticated ? <Supplier /> : <Navigate to="/" />} />
          <Route path='/groupcustomer' element={isAuthenticated ? <GroupCustomer /> : <Navigate to="/" />} />

          <Route path='/customer_payment/:id' element={<Customer_payment />} />
          <Route path='/customer_payment' element={<Finh_CustomerPayment />} />
          

          {/* form pos */}
          <Route path='/index/pos' element={<MainForm />} />
          <Route path='/index/invoce' element={<InvoiceCart />} />
          {/* <Route path='/tests' element={<TestSelectSearch />} /> */}
          <Route path='/index/pos/id/:id' element={<MainFormID />} />

          {/* product */}
          <Route path='/createproduct' element={<CreateProduct />} />
          <Route path='/product' element={<Product />} />
          <Route path='/product/:id' element={<PrintProduct />} />
          <Route path='/updateproduct/:id' element={<UpdateProduct />} />


          {/* purchase */}
          <Route path='/purchase' element={<Purchase />} />
          <Route path='/purchase/:id' element={<UpdatePuchase />} />
          <Route path='/createpurchase/:id' element={<PrintPurchaseDetail />} />
          <Route path='/createpurchase' element={<CreatePurchase />} />

          <Route path='/paymenttype' element={<PaymentType />} />
          <Route path='/exchange' element={<ExchangRate />} />
         


          {/* acount and detail */}
          <Route path='/account' element={<Acount />} />
          <Route path='/accountdetail/:id' element={<AccountDetailTransfer />} />


          {/* Product Discount */}
          <Route path='/create_discount_product' element={<CreateDiscountProduct />} />
          <Route path='/discount_product' element={<DiscountProductList />} />
          <Route path='/create_discount_product/:id' element={<UpdateDiscountProduct />} />

          
          {/* Product Discount */}
          <Route path='/order_List' element={<Order_List />} />
          <Route path='/order-Repay' element={<FinhOrder />} />
          <Route path='/order-Repay/:id' element={<Order_Repay />} />

            {/* invoive */}
            <Route path='/InvocePurchase' element={<InvocePurchase />} />
            <Route path='/InvoceSaleAndPuchase' element={<InvoceSaleAndPuchase />} />
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </div>
  );
}

export default App;