
import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useCart } from './CartContext';
import { toast } from 'react-toastify'; // Make sure toast is imported here
import Search_Category_brand from "./Search_Category_brand";

const ProductGrid = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  const { addItem } = useCart();

  useEffect(() => {
    getALLProduct();
  }, []);

  const getALLProduct = async () => {
    try {
      const response = await axios.get('http://localhost:6700/api/product');
      setProducts(response.data.product);
    } catch (error) {
      setError('Error fetching product data');
    }
  };

  const handleAddToCart = (product) => {
    addItem(product);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
     
      <div className="flex space-x-4 mb-2 w-full">
        <Search_Category_brand/>
      </div>
      {error && <div className="text-red-500">{error}</div>}
      <div className="overflow-x-auto scrollbar-hidden h-[75vh]">
        <div className="grid xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-3 grid-cols-3 gap-4">
          {products.map((product, index) => (
            <div key={index} onClick={() => handleAddToCart(product)} className="bg-white p-2 cursor-pointer shadow-md text-center">
              <img src={`http://localhost:6700/image/${product.image}`} alt={product.pro_names} className="w-full h-20 object-contain rounded mb-2" />
              <h2 className="text-lg font-semibold">{product.pro_names}</h2>
              <p className="text-gray-500">{product.cost_price} $</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductGrid;
