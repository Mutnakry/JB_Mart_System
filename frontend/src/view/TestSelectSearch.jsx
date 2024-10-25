import React, { useEffect, useState } from 'react';
import Navbar from '../component/Navbar';
import { RiContactsBook3Fill } from "react-icons/ri";
import axios from 'axios';

const TestSelectSearch = () => {
  const [isDropdownOpenCategory, setIsDropdownOpenCategory] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');

  const [isDropdownOpenProduct, setIsDropdownOpenProduct] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState('');

  const [category_ID, setCategory_ID] = useState('');
  const [product_ID, setProduct_ID] = useState('');

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);  // Start loading
    try {
      const response = await axios.get('http://localhost:6700/categories');
      setCategories(response.data.categories);
      setError('');
    } catch (error) {
      setError('Error fetching categories data');
    } finally {
      setLoading(false);
    }
  };

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

  const handleSearchCategory = (event) => {
    setCategory_ID(event.target.value); // Update search query
  };

  const handleSearchProduct = (event) => {
    setProduct_ID(event.target.value); // Update search query
  };

  const handleOptionClickCategory = (option) => {
    setSelectedCategory(option.cat_names);
    setIsDropdownOpenCategory(false);
  };

  const handleOptionClickProduct = (option) => {
    setSelectedProduct(option.pro_names);
    setIsDropdownOpenProduct(false);
  };

  // Filter options based on the search query
  const filteredOptionsCategory = categories.filter(option =>
    option.cat_names.toLowerCase().includes(category_ID.toLowerCase())
  );

  const filteredOptionsProduct = products.filter(option =>
    option.pro_names.toLowerCase().includes(product_ID.toLowerCase())
  );

  return (
    <div>
      <Navbar />
      <div className='py-12 px-2 md:ml-64 bg-white dark:bg-gray-950'>
        <div className="p-4 bg-white dark:border-gray-700 mt-5">
          <div className='flex items-center gap-2 pb-5'>
            <RiContactsBook3Fill className='text-lg' />
            <p className='font-NotoSansKhmer font-bold text-lg'>Test</p>
          </div>
          <div className='flex gap-11'>
            <div className="col-span-1 space-y-2 w-[300px]">
              <label className="font-NotoSansKhmer font-bold">ប្រភេទពន្ធលើតម្លៃលក់: *</label>
              <div className="relative">
                <div
                  className="input_text cursor-pointer"
                  onClick={() => setIsDropdownOpenCategory(!isDropdownOpenCategory)}
                >
                  {selectedCategory || 'ជ្រើសរើស...'}
                </div>

                {isDropdownOpenCategory && (
                  <div className="absolute z-10 bg-white border rounded-md mt-2 w-[300px]">
                    <input
                      type="text"
                      value={category_ID}
                      onChange={handleSearchCategory}
                      className="input_text w-full p-2"
                      placeholder="ស្វែងរក..."
                    />

                    {/* Dropdown options */}
                    {filteredOptionsCategory.map((category) => (
                      <div
                        key={category.id} // Use the correct key
                        className="p-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleOptionClickCategory(category)}
                      >
                        {category.cat_names}
                      </div>
                    ))}
                    {filteredOptionsCategory.length === 0 && (
                      <div className="p-2 text-red-500">No categories found</div>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="col-span-1 space-y-2 w-[300px]">
              <label className="font-NotoSansKhmer font-bold">ផលិតផល: *</label>
              <div className="relative">
                <div
                  className="input_text cursor-pointer"
                  onClick={() => setIsDropdownOpenProduct(!isDropdownOpenProduct)}
                >
                  {selectedProduct || 'ជ្រើសរើស...'}
                </div>

                {isDropdownOpenProduct && (
                  <div className="absolute z-10 bg-white border overflow-y-auto rounded-md mt-2 w-[300px]">
                    <input
                      type="text"
                      value={product_ID}
                      onChange={handleSearchProduct}
                      className="input_text w-full p-2"
                      placeholder="ស្វែងរក..."
                    />
                    <div className='overflow-y-auto rounded-md mt-2 h-[250px]'>
                      {/* Dropdown options */}
                      {filteredOptionsProduct.map((product) => (
                        <div
                          key={product.id} // Use the correct key
                          className="p-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => handleOptionClickProduct(product)}
                        >
                          {product.pro_names}
                        </div>
                      ))}
                      {filteredOptionsProduct.length === 0 && (
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
        </div>
      </div>
    </div>
  );
};

export default TestSelectSearch;
