import './App.css';
import { BrowserRouter, Route, Routes,Navigate } from 'react-router-dom';
import 'flowbite';
import React, { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
// import from view
import Dashboard from './view/Dashboard';
import Login from './component/Login';
import Register from './component/Register';
import Index from './view/Index';
import Category from './view/product/Category';
import Brands from './view/product/Brands';
import Unit from './view/product/Unit';
import Acount from './view/account/Account';
import Cost from './view/cost/Cost';
import CostType from './view/cost/CostType';
import Customer from './view/contact/Customer';
import Supplier from './view/contact/Supplier';
import GroupCustomer from './view/contact/GroupCustomer';
import MainForm from './view/pos/MainForm';
import Product from './view/product/Product';
import TestSelectSearch from './view/TestSelectSearch';
import ProductCategory from './component/pos/ProductCategory'
import MainFormID from './view/pos/MainFromID'
import Purchase from './view/purchase/Purchase';
import PaymentType from './view/paymentType/PaymentType';
import ExchangRate from './view/currency/ExchangRate';
import CreatePurchase from './component/purchase/CreatePurchase';
import UpdatePuchase from './component/purchase/UpdatePuchase';
import CreateProduct from './component/product/product/CreateProduct';
import Update from './component/purchase/Update';



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
          <Route path="/login" element={isAuthenticated ? <Navigate to="/Dashboard" /> : <Login />} />
          <Route path="/register" element={isAuthenticated ? <Register /> : <Navigate to="/login" />} />
          <Route path="/" element={<Index />} />
          <Route path="/Dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path='/category'  element={isAuthenticated ? <Category /> : <Navigate to="/" />} />
          <Route path='/brands'  element={isAuthenticated ? <Brands /> : <Navigate to="/" />} />
          <Route path='/udit'  element={isAuthenticated ? <Unit /> : <Navigate to="/" />} />
          <Route path='/account'  element={isAuthenticated ? <Acount /> : <Navigate to="/" />} />
          <Route path='/cost'  element={isAuthenticated ? <Cost /> : <Navigate to="/" />} />
          <Route path='/costtype'  element={isAuthenticated ? <CostType /> : <Navigate to="/" />} />
          <Route path='/customer'  element={isAuthenticated ? <Customer /> : <Navigate to="/" />} />
          <Route path='/supplier'  element={isAuthenticated ? <Supplier /> : <Navigate to="/" />} />
          <Route path='/groupcustomer'  element={isAuthenticated ? <GroupCustomer /> : <Navigate to="/" />} />
          {/* <Route path='/pos'  element={<MainForm />} /> */}
          <Route path='/index/pos'  element={ <MainForm />} />
          <Route path='/product'  element={isAuthenticated ? <Product /> : <Navigate to="/" />} />

          <Route path='/tests'  element={ <TestSelectSearch />} />
          {/* <Route path='/productcategory'  element={ <MainFormID />} /> */}
          <Route path='/index/pos/id/:id'  element={ <MainFormID />} />

          <Route path='/purchase'  element={ <Purchase />} />
          <Route path='/update/:id'  element={ <Update />} />
          <Route path='/paymenttype'  element={ <PaymentType />} />
          <Route path='/exchange'  element={ <ExchangRate />} />
          <Route path='/createpurchase'  element={ <CreatePurchase />} />
          <Route path='/updatepuchase/:id/detailpuchase/:id'  element={ <UpdatePuchase />} />
          <Route path='/createproduct'  element={ <CreateProduct />} />


        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </div>
  );
}

export default App;