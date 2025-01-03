

// import React, { useEffect, useState } from "react";
// import axios from 'axios';
// import { useCart } from './CartContext';
// import { toast } from 'react-toastify';
// import Search_Category_brand from "./Search_Category_brand";

// const ProductGrid = () => {
//   const [products, setProducts] = useState([]);
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false); // Add loading state
//   const { addItem } = useCart();

//   useEffect(() => {
//     getALLProduct();
//   }, []);

//   const getALLProduct = async () => {
//     setLoading(true); // Start loading
//     try {
//       const response = await axios.get('http://localhost:6700/api/product');
//       setTimeout(() => {
//         setProducts(response.data.product);
//         setLoading(false); // Stop loading after data is set
//       }, 1000);
//     } catch (error) {
//       setError('Error fetching product data');
//       setLoading(false); // Stop loading if there's an error
//     }
//   };

//   const handleAddToCart = (product) => {
//     if (product.qty > 0) {
//       addItem(product);
//     } else {
//       toast.warning('This product is out of stock');
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-4">
//       <div className="flex space-x-4 mb-2 w-full">
//         <Search_Category_brand />

//       </div>

//       {error && <div className="text-red-500">{error}</div>}

//       {loading ? (
//         // Loading spinner
//         <div className="flex justify-center items-center ">
//           <div class="grid min-h-[140px] w-full place-items-center overflow-x-scroll rounded-lg p-6 lg:overflow-visible">
//             <svg class="text-gray-300 animate-spin" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"
//               width="24" height="24">
//               <path
//                 d="M32 3C35.8083 3 39.5794 3.75011 43.0978 5.20749C46.6163 6.66488 49.8132 8.80101 52.5061 11.4939C55.199 14.1868 57.3351 17.3837 58.7925 20.9022C60.2499 24.4206 61 28.1917 61 32C61 35.8083 60.2499 39.5794 58.7925 43.0978C57.3351 46.6163 55.199 49.8132 52.5061 52.5061C49.8132 55.199 46.6163 57.3351 43.0978 58.7925C39.5794 60.2499 35.8083 61 32 61C28.1917 61 24.4206 60.2499 20.9022 58.7925C17.3837 57.3351 14.1868 55.199 11.4939 52.5061C8.801 49.8132 6.66487 46.6163 5.20749 43.0978C3.7501 39.5794 3 35.8083 3 32C3 28.1917 3.75011 24.4206 5.2075 20.9022C6.66489 17.3837 8.80101 14.1868 11.4939 11.4939C14.1868 8.80099 17.3838 6.66487 20.9022 5.20749C24.4206 3.7501 28.1917 3 32 3L32 3Z"
//                 stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"></path>
//               <path
//                 d="M32 3C36.5778 3 41.0906 4.08374 45.1692 6.16256C49.2477 8.24138 52.7762 11.2562 55.466 14.9605C58.1558 18.6647 59.9304 22.9531 60.6448 27.4748C61.3591 31.9965 60.9928 36.6232 59.5759 40.9762"
//                 stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" class="text-gray-900">
//               </path>
//             </svg>
//           </div>
//           ......
//         </div>
//       ) : (
//         // Product grid
//         <div className="overflow-x-auto scrollbar-hidden h-[75vh] border-t-2">
//           <div className="grid xl:grid-cols-4 lg:grid-cols-4 pt-4 md:grid-cols-3 grid-cols-3 gap-4">
//             {products.map((product, index) => (
//               <div key={index} onClick={() => handleAddToCart(product)} className="bg-white p-2 cursor-pointer shadow-md text-center">
//                 <img src={`http://localhost:6700/image/${product.image}`} alt={product.pro_names} className="w-full h-20 object-contain rounded mb-2" />
//                 <h2 className="text-lg font-semibold">{product.pro_names}</h2>
//                 <p className="text-gray-500">{product.cost_price} $</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProductGrid;





















import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useCart } from './CartContext';
import { toast } from 'react-toastify';

const ProductGrid = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setbrands] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { addItem } = useCart();
  const [filterCategory, setFilterCategory] = useState('');
  const [filterBrande, setFilterBrande] = useState('');
  const [isDropdownOpenCategory, setIsDropdownOpenCategory] = useState(false);
  const [isDropdownOpenBrand, setIsDropdownOpenBrand] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');

  useEffect(() => {
    getALLProduct();
    fetchCategories();
    fetchBrands();
  }, [filterCategory, filterBrande]); // Re-fetch products when filters change

  const getALLProduct = async () => {
    setLoading(true);
    try {
      let url = 'http://localhost:6700/api/product';
      if (filterCategory) url += `?category_id=${filterCategory}`;
      if (filterBrande) url += filterCategory ? `&brand_id=${filterBrande}` : `?brand_id=${filterBrande}`;
      const response = await axios.get(url);
      setProducts(response.data.product);
    } catch (error) {
      setError('Error fetching product data');
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:6700/categories');
      setCategories(response.data.categories);
    } catch (error) {
      setError('Error fetching categories data');
    }
  };

  const fetchBrands = async () => {
    try {
      const response = await axios.get('http://localhost:6700/api/brands');
      setbrands(response.data.brands);
    } catch (error) {
      setError('Error fetching brands data');
    }
  };

  const handleAddToCart = (product) => {
    if (product.qty > 0) {
      addItem(product);
    } else {
      toast.warning('This product is out of stock');
    }
  };

  const handleCategoryChange = (category) => {
    if (category.id === 'all') {
      // Handle "Select All"
      setSelectedCategory('ប្រភេទទាំងអស់');
      setFilterCategory('');
    } else {
      setSelectedCategory(category.cat_names);
      setFilterCategory(category.id);
    }
    setIsDropdownOpenCategory(false);
  };

  const handleBrandChange = (brand) => {
    if (brand.id === 'all') {
      // Handle "Select All"
      setSelectedBrand('ម៉ាក់យីហោទាំងអស់');
      setFilterBrande(''); // Clear the brand filter to show all products
    } else {
      setSelectedBrand(brand.brand_names);
      setFilterBrande(brand.id);
    }
    setIsDropdownOpenBrand(false); // Close dropdown after selection
  };


  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="flex space-x-4 mb-2 w-full">
        {/* Category Dropdown */}
        <div className="relative w-[300px]">
          <div
            className="input_text cursor-pointer"
            onClick={() => setIsDropdownOpenCategory(!isDropdownOpenCategory)}
          >
            {selectedCategory || 'ប្រភេទទាំងអស់'}
          </div>

          {isDropdownOpenCategory && (
            <div className="absolute z-10 bg-white border rounded-md mt-2 w-[300px]">
              {/* Select All Option */}
              <div
                className="p-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleCategoryChange({ id: 'all', cat_names: 'Select All' })}
              >
                   ប្រភេទទាំងអស់
              </div>

              {/* Category Options */}
              {categories.map((category) => (
                <div
                  key={category.id}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleCategoryChange(category)}
                >
                  {category.cat_names}
                </div>
              ))}
            </div>
          )}
        </div>
        {/* Brand Dropdown */}
        <div className="relative w-[300px]">
          <div className="input_text cursor-pointer" onClick={() => setIsDropdownOpenBrand(!isDropdownOpenBrand)}>
            {selectedBrand || 'ម៉ាក់យីហោទាំងអស់'}
          </div>
          {isDropdownOpenBrand && (
            <div className="absolute z-10 bg-white border rounded-md mt-2 w-[300px]">
              {/* Select All Option */}
              <div
                className="p-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleBrandChange({ id: 'all', brand_names: 'ម៉ាក់យីហោទាំងអស់' })}
              >
                ម៉ាក់យីហោទាំងអស់
              </div>

              {/* Brand Options */}
              {brands.map((brand) => (
                <div
                  key={brand.id}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleBrandChange(brand)}
                >
                  {brand.brand_names}
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

      {error && <div className="text-red-500">{error}</div>}

      {loading ? (
        <div className="flex justify-center items-center">
          <svg className="text-gray-300 animate-spin" width="24" height="24" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M32 3C35.8083 3 39.5794 3.75011 43.0978 5.20749C46.6163 6.66488 49.8132 8.80101 52.5061 11.4939C55.199 14.1868 57.3351 17.3837 58.7925 20.9022C60.2499 24.4206 61 28.1917 61 32C61 35.8083 60.2499 39.5794 58.7925 43.0978C57.3351 46.6163 55.199 49.8132 52.5061 52.5061C49.8132 55.199 46.6163 57.3351 43.0978 58.7925C39.5794 60.2499 35.8083 61 32 61C28.1917 61 24.4206 60.2499 20.9022 58.7925C17.3837 57.3351 14.1868 55.199 11.4939 52.5061C8.801 49.8132 6.66487 46.6163 5.20749 43.0978C3.7501 39.5794 3 35.8083 3 32C3 28.1917 3.75011 24.4206 5.2075 20.9022C6.66489 17.3837 8.80101 14.1868 11.4939 11.4939C14.1868 8.80099 17.3838 6.66487 20.9022 5.20749C24.4206 3.7501 28.1917 3 32 3L32 3Z" stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"></path>
          </svg>
        </div>
      ) : (
        <div className="overflow-x-auto scrollbar-hidden h-[75vh] border-t-2">
          <div className="grid xl:grid-cols-4 lg:grid-cols-4 pt-4 md:grid-cols-3 grid-cols-3 gap-4">
            {products.map((product, index) => (
              <div key={index} onClick={() => handleAddToCart(product)} className="bg-white p-2 cursor-pointer shadow-md text-center">
                <img src={`http://localhost:6700/image/${product.image}`} alt={product.pro_names} className="w-full h-20 object-contain rounded mb-2" />
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
