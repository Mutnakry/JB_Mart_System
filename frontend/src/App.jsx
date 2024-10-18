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
import Category from './view/Category';
import Brands from './view/Brands';
import Unit from './view/Ubit';
import Acount from './view/Account';


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
          {/* <Route path='/category' element={<Category isAuthenticated={isAuthenticated}/>} /> */}
          {/* <Route path='/brands' element={<Brands isAuthenticated={isAuthenticated}/>} /> */}
          <Route path='/category'  element={isAuthenticated ? <Category /> : <Navigate to="/" />} />
          <Route path='/brands'  element={isAuthenticated ? <Brands /> : <Navigate to="/" />} />
          <Route path='/udit'  element={isAuthenticated ? <Unit /> : <Navigate to="/" />} />
          <Route path='/account'  element={isAuthenticated ? <Acount /> : <Navigate to="/" />} />


        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </div>
  );
}

export default App;