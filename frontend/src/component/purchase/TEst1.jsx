import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

import axios from 'axios';

const PurchaseDetails = () => {
  const [purchaseData, setPurchaseData] = useState(null); // State to store the purchase data
  const [loading, setLoading] = useState(true); // State to handle loading state
  const [error, setError] = useState(null); // State to handle errors
  const { id } = useParams();
  useEffect(() => {
    // Fetch the purchase details based on purchaseId
    axios.get(`http://localhost:6700/api/purchase/${id}`)
      .then(response => {
        setPurchaseData(response.data);  // Store fetched data in state
        setLoading(false);  // Stop loading after data is fetched
      })
      .catch(err => {
        console.error("Error fetching data:", err);  // Log error for debugging
        setError(err.message);  // Store error message
        setLoading(false);  // Stop loading even on error
      });
  }, [id]);  // Re-run the effect when `purchaseId` changes

  // Handle loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // Handle error state
  if (error) {
    return <div>Error: {error}</div>;
  }

  // Display purchase data once it's loaded
  return (
    <div>
      <h1>Purchase Details</h1>
      <h2>Customer ID: {purchaseData.customerId}</h2>

      <h3>Payment Information:</h3>
      <p>Payment Type ID: {purchaseData.paymenttype_id}</p>
      <p>Account ID: {purchaseData.account_id}</p>
      <p>Total Amount: {purchaseData.amount_total}</p>
      <p>Amount Discount: {purchaseData.amount_discount}</p>
      <p>Amount Paid: {purchaseData.amount_pay}</p>
      <p>Payment Date: {purchaseData.pay_date}</p>

      <h3>Products:</h3>
      {purchaseData.products.map((product, index) => (
        <div key={index}>
          <p>Product Name: {product.product_name}</p>
          <p>Quantity: {product.qty}</p>
          <p>Discount: {product.discount}</p>
          <p>Total: {product.total}</p>
        </div>
      ))}
    </div>
  );
};

export default PurchaseDetails;
