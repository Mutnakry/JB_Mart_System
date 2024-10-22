import React from "react";

const ProductGrid = () => {
  const products = [
    { name: "3CE", sku: "0247", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREoRGyXmHy_6aIgXYqWHdOT3KjfmnuSyxypw&s" },
    { name: "a - S", sku: "0325-1", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREoRGyXmHy_6aIgXYqWHdOT3KjfmnuSyxypw&s" },
    { name: "a - M", sku: "0325-2", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREoRGyXmHy_6aIgXYqWHdOT3KjfmnuSyxypw&s" },
    { name: "Blue De Chanel", sku: "0259", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREoRGyXmHy_6aIgXYqWHdOT3KjfmnuSyxypw&s" },
    { name: "Box1 - Big", sku: "0346-1", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREoRGyXmHy_6aIgXYqWHdOT3KjfmnuSyxypw&s" },
  
    { name: "3CE", sku: "0247", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREoRGyXmHy_6aIgXYqWHdOT3KjfmnuSyxypw&s" },
    { name: "a - S", sku: "0325-1", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREoRGyXmHy_6aIgXYqWHdOT3KjfmnuSyxypw&s" },
    { name: "a - M", sku: "0325-2", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREoRGyXmHy_6aIgXYqWHdOT3KjfmnuSyxypw&s" },
    { name: "Blue De Chanel", sku: "0259", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREoRGyXmHy_6aIgXYqWHdOT3KjfmnuSyxypw&s" },
    { name: "Box1 - Big", sku: "0346-1", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREoRGyXmHy_6aIgXYqWHdOT3KjfmnuSyxypw&s" },
  
    { name: "3CE", sku: "0247", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREoRGyXmHy_6aIgXYqWHdOT3KjfmnuSyxypw&s" },
    { name: "a - S", sku: "0325-1", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREoRGyXmHy_6aIgXYqWHdOT3KjfmnuSyxypw&s" },
    { name: "a - M", sku: "0325-2", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREoRGyXmHy_6aIgXYqWHdOT3KjfmnuSyxypw&s" },
    { name: "Blue De Chanel", sku: "0259", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREoRGyXmHy_6aIgXYqWHdOT3KjfmnuSyxypw&s" },
    { name: "Box1 - Big", sku: "0346-1", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREoRGyXmHy_6aIgXYqWHdOT3KjfmnuSyxypw&s" },
  
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* Dropdowns */}
      <div className="flex space-x-4 mb-6">
        <select className="w-full p-2 border border-gray-300 rounded-md">
          <option>ប្រភេទទំនិញ</option>
          {/* Add more categories */}
        </select>
        <select className="w-full p-2 border border-gray-300 rounded-md">
          <option>អតិថិជន</option>
          {/* Add more options */}
        </select>
      </div>

      {/* Product Grid */}
      <div className="grid xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-3 grid-cols-3 gap-4 overflow-x-auto h-[75vh] scrollbar-hidden">
        {products.map((product, index) => (
          <div key={index} className="bg-white p-4 shadow-md text-center">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-32 object-cover rounded mb-2"
            />
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p className="text-gray-500">({product.sku})</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
