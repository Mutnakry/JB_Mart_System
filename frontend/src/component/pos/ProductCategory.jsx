
import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useCart } from './CartContext';
import { toast } from 'react-toastify';
import Search_Category_brand from "./Search_Category_brand";
import { useParams } from 'react-router-dom';

const ProductGrid = () => {
    const { id } = useParams();
    const [products, setProducts] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { addItem } = useCart();

    useEffect(() => {
        getALLProduct();
    }, [id]);

    const getALLProduct = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:6700/api/product/${id}`);
            setProducts(response.data);
            setLoading(false);
        } catch (error) {
            setError('Error fetching product data');
            setLoading(false);
        }
    };

    const handleAddToCart = (product) => {
        addItem(product);
    };

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <div className="flex space-x-4 mb-4 w-full">
                <Search_Category_brand />
            </div>
            {error && <div className="text-red-500">{error}</div>}
            {loading ? (
                <div className="text-blue-500">Loading products...</div>
            ) : (
                <div className="overflow-x-auto scrollbar-hidden h-[75vh]">
                    <div className="grid xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-3 grid-cols-3 gap-4">
                        {products.map((product) => (
                            <div
                                key={product.id}
                                onClick={() => handleAddToCart(product)}
                                className="bg-white p-2 cursor-pointer shadow-md text-center"
                            >
                                <img
                                    src={`http://localhost:6700/image/${product.image}`}
                                    alt={product.pro_names}
                                    className="w-full h-20 object-contain rounded mb-2"
                                />
                                <h2 className="text-lg font-semibold">{product.pro_names}</h2>
                                <p className="text-gray-500">{product.cost_price} $</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductGrid;
