import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useCart } from './CartContext';

const SearchAddToCartProduct = () => {
    const { addItem } = useCart();
    const [isDropdownOpenProduct, setIsDropdownOpenProduct] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState('');
    const [product_ID, setProduct_ID] = useState('');
    const [products, setProducts] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:6700/api/product');
            setProducts(response.data.product); // Set to empty array if no products
            setError('');
        } catch (error) {
            setError('Error fetching products data');
        } finally {
            setLoading(false);
        }
    };

    const handleSearchProduct = (event) => {
        setProduct_ID(event.target.value); // Update search query
    };

    const handleOptionClickProduct = (option) => {
        setSelectedProduct(option.pro_names);
        setProduct_ID(''); // Clear search input on selection
        setIsDropdownOpenProduct(false);
    };

    const filteredOptionsProduct = products.filter(option =>
        option.pro_names.toLowerCase().includes(product_ID.toLowerCase())
    );

    const handleAddToCart = (product) => {
        addItem(product);
        setProduct_ID('');
    };

    return (
        <div className='flex gap-12'>
            <div className="col-span-1 space-y-2 w-[450px]">
                <div className="relative">
                    <div
                        className="input_text cursor-pointer"
                        onClick={() => setIsDropdownOpenProduct(!isDropdownOpenProduct)}
                    >
                        {selectedProduct || 'បញ្ចូលឈ្មោះផលិតផល / SKU / សំនួរពាក់ព័ន្ធ'}
                    </div>

                    {isDropdownOpenProduct && (
                        <div className="absolute z-10 bg-white border overflow-y-auto rounded-md mt-2 w-[450px]">
                            <input
                                type="text"
                                // value={product_ID}
                                onChange={handleSearchProduct}
                                className="input_text w-full p-2"
                                placeholder="ស្វែងរក..."
                                disabled={loading} // Disable input when loading
                            />
                            <div className='overflow-y-auto h-[250px]'>
                                {/* Dropdown options */}
                                {filteredOptionsProduct.map((product) => (

                                    <div
                                     onClick={() => handleOptionClickProduct(product)}
                                    >
                                        <div
                                            key={product.id} // Use the correct key
                                            className="p-2 hover:bg-gray-100 cursor-pointer"
                                            onClick={() => handleAddToCart(product)}
                                        >
                                            {product.pro_names}
                                        </div>
                                    </div>
                                ))}
                                {filteredOptionsProduct.length === 0 && !loading && (
                                    <div className="p-2 text-red-500">No products found</div>
                                )}
                            </div>
                            {loading && <p className="text-blue-500">Loading...</p>}
                            {error && <p className="text-red-500">{error}</p>}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SearchAddToCartProduct