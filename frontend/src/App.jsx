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
          <Route path='/pos'  element={isAuthenticated ? <MainForm /> : <Navigate to="/" />} />


        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </div>
  );
}

export default App;