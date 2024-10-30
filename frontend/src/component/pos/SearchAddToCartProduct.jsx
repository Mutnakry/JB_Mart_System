// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useCart } from './CartContext';

// const SearchAddToCartProduct = () => {
//     const { addItem } = useCart();
//     const [isDropdownOpenProduct, setIsDropdownOpenProduct] = useState(false);
//     const [selectedProduct, setSelectedProduct] = useState('');
//     const [product_ID, setProduct_ID] = useState('');
//     const [products, setProducts] = useState([]);
//     const [error, setError] = useState('');
//     const [loading, setLoading] = useState(false);

//     useEffect(() => {
//         fetchProducts();
//     }, []);

//     const fetchProducts = async () => {
//         setLoading(true);
//         try {
//             const response = await axios.get('http://localhost:6700/api/product');
//             setProducts(response.data.product);
//             setError('');
//         } catch (error) {
//             setError('Error fetching products data');
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleSearchProduct = (event) => {
//         setProduct_ID(event.target.value); 
//     };

//     const handleOptionClickProduct = (option) => {
//         setSelectedProduct(option.pro_names);
//         setProduct_ID('');
//         setIsDropdownOpenProduct(false);
//     };

//     const filteredOptionsProduct = products.filter(option =>
//         option.pro_names.toLowerCase().includes(product_ID.toLowerCase())
//     );

//     const handleAddToCart = (product) => {
//         addItem(product);
//         setProduct_ID('');
//     };

//     return (
//         <div className='flex gap-12'>
//             <div className="col-span-1 space-y-2 w-[450px]">
//                 <div className="relative">
//                     <div
//                         className="input_text cursor-pointer"
//                         onClick={() => setIsDropdownOpenProduct(!isDropdownOpenProduct)}
//                     >
//                           {'បញ្ចូលឈ្មោះផលិតផល'}
//                         {/* {selectedProduct || 'បញ្ចូលឈ្មោះផលិតផល'} */}
//                     </div>

//                     {isDropdownOpenProduct && (
//                         <div className="absolute z-10 bg-white border overflow-y-auto rounded-md mt-2 w-[450px]">
//                             <input
//                                 type="text"
//                                 value={product_ID}
//                                 onChange={handleSearchProduct}
//                                 className="input_text w-full p-2"
//                                 placeholder="ស្វែងរក..."
//                                 disabled={loading} 
//                             />
//                             <div className='overflow-y-auto h-[250px]'>
//                                 {filteredOptionsProduct.map((product) => (

//                                     <div
//                                      onClick={() => handleOptionClickProduct(product)}
//                                     >
//                                         <div
//                                             key={product.id}
//                                             className="p-2 hover:bg-gray-100 cursor-pointer"
//                                             onClick={() => handleAddToCart(product)}
//                                         >
//                                             {product.pro_names}
//                                         </div>
//                                     </div>
//                                 ))}
//                                 {filteredOptionsProduct.length === 0 && !loading && (
//                                     <div className="p-2 text-red-500">No products found</div>
//                                 )}
//                             </div>
//                             {loading && <p className="text-blue-500">Loading...</p>}
//                             {error && <p className="text-red-500">{error}</p>}
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default SearchAddToCartProduct


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useCart } from './CartContext';

const SearchAddToCartProduct = () => {
    const { addItem } = useCart();
    const [products, setProducts] = useState([]);
    const [barcodeInput, setBarcodeInput] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchProducts();
    }, []);

    // Fetch products from API
    const fetchProducts = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:6700/api/product');
            setProducts(response.data.product);
            setError('');
        } catch (error) {
            setError('Error fetching products data');
        } finally {
            setLoading(false);
        }
    };

    // Handle change in barcode input
    const handleBarcodeChange = (e) => {
        const input = e.target.value;
        setBarcodeInput(input);
        const product = products.find(p => 
            p.barcode === input || p.id === input || p.pro_names.toLowerCase() === input.toLowerCase()
        );

        // Add product to cart if found
        if (product) {
            addItem(product);
            setBarcodeInput(''); // Clear input after adding
        }
    };

    // Handle form submission for barcode input
    const handleBarcodeSubmit = (e) => {
        e.preventDefault();
        const product = products.find(p => 
            p.barcode === barcodeInput || p.id === barcodeInput || p.pro_names.toLowerCase() === barcodeInput.toLowerCase()
        );

        if (product) {
            addItem(product);
            setBarcodeInput(''); // Clear input after adding
        }
    };

    return (
        <div className='flex gap-12'>
            <div className="col-span-1 space-y-2 w-[450px]">
                <form onSubmit={handleBarcodeSubmit} className='flex'>
                    <input
                        type="text"
                        className='input_text'
                        value={barcodeInput}
                        onChange={handleBarcodeChange}
                        placeholder="Enter or Scan Barcode"
                    />
                </form>
                {loading && <p className="text-blue-500">Loading products...</p>}
                {error && <p className="text-red-500">{error}</p>}
            </div>
        </div>
    );
};

export default SearchAddToCartProduct;
