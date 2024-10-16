import './App.css';
import { BrowserRouter, Route, Routes,Navigate } from 'react-router-dom';
import 'flowbite';
import React, { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
// import from page
import Dashboard from './page/Dashboard';
import Login from './component/Login';
import Register from './component/Register';
import Index from './page/Index';
import Category from './page/Category';


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check for token in localStorage
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={isAuthenticated ? <Navigate to="/Dashboard" /> : <Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Index />} />
          <Route path="/Dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path='category' element={<Category/>} />
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </div>
  );
}

export default App;