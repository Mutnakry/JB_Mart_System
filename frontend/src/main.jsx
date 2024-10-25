// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import { BrowserRouter, Route, Routes,Navigate } from 'react-router-dom';
// import {CartProvider} from '../src/component/pos/CartContext.jsx'
// import App from './App.jsx'
// import './index.css'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//      {/* <CartProvider> */}
//         <App />
//     {/* </CartProvider>, */}
//   </StrictMode>,
// )


import React from 'react';
import ReactDOM from 'react-dom';
import {CartProvider} from '../src/component/pos/CartContext.jsx'
import App from './App.jsx'
import './index.css'
ReactDOM.render(
  <CartProvider>
      <App />
  </CartProvider>,
  document.getElementById('root')
);
