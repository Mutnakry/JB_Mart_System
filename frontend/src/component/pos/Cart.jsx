import React from 'react';
import { FaMoneyBill, FaRegIdCard, FaWindowClose, FaRegMoneyBillAlt } from "react-icons/fa";

const PointOfSale = () => {
  const products = [
    { name: "Apple happy new year 2044", dis: 2, price: 4, qty: 2, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREoRGyXmHy_6aIgXYqWHdOT3KjfmnuSyxypw&s" },
    { name: "Apple happy new year 2044", dis: 0, price: 2.5, qty: 5, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREoRGyXmHy_6aIgXYqWHdOT3KjfmnuSyxypw&s" },
    { name: "Apple happy new year 2044", dis: 2.5, price: 2.5, qty: 1, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREoRGyXmHy_6aIgXYqWHdOT3KjfmnuSyxypw&s" },
    { name: "Apple happy new year 2044", dis: 0, price: 3.25, qty: 4, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREoRGyXmHy_6aIgXYqWHdOT3KjfmnuSyxypw&s" },
    { name: "Apple happy new year 2044", dis: 2, price: 4, qty: 2, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREoRGyXmHy_6aIgXYqWHdOT3KjfmnuSyxypw&s" },
    { name: "Apple happy new year 2044", dis: 0, price: 2.5, qty: 5, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREoRGyXmHy_6aIgXYqWHdOT3KjfmnuSyxypw&s" },
    { name: "Apple happy new year 2044", dis: 2.5, price: 2.5, qty: 1, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREoRGyXmHy_6aIgXYqWHdOT3KjfmnuSyxypw&s" },
    { name: "Apple happy new year 2044", dis: 0, price: 3.25, qty: 4, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREoRGyXmHy_6aIgXYqWHdOT3KjfmnuSyxypw&s" },
    { name: "Apple happy new year 2044", dis: 2, price: 4, qty: 2, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREoRGyXmHy_6aIgXYqWHdOT3KjfmnuSyxypw&s" },
    { name: "Apple happy new year 2044", dis: 0, price: 2.5, qty: 5, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREoRGyXmHy_6aIgXYqWHdOT3KjfmnuSyxypw&s" },
    { name: "Apple happy new year 2044", dis: 2.5, price: 2.5, qty: 1, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREoRGyXmHy_6aIgXYqWHdOT3KjfmnuSyxypw&s" },
    { name: "Apple happy new year 2044", dis: 0, price: 3.25, qty: 4, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREoRGyXmHy_6aIgXYqWHdOT3KjfmnuSyxypw&s" },
    { name: "Apple happy new year 2044", dis: 2, price: 4, qty: 2, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREoRGyXmHy_6aIgXYqWHdOT3KjfmnuSyxypw&s" },
    { name: "Apple happy new year 2044", dis: 0, price: 2.5, qty: 5, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREoRGyXmHy_6aIgXYqWHdOT3KjfmnuSyxypw&s" },
    { name: "Apple happy new year 2044", dis: 2.5, price: 2.5, qty: 1, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREoRGyXmHy_6aIgXYqWHdOT3KjfmnuSyxypw&s" },
    { name: "Apple happy new year 2044", dis: 0, price: 3.25, qty: 4, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREoRGyXmHy_6aIgXYqWHdOT3KjfmnuSyxypw&s" },
    { name: "Apple happy new year 2044", dis: 2, price: 4, qty: 2, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREoRGyXmHy_6aIgXYqWHdOT3KjfmnuSyxypw&s" },
    { name: "Apple happy new year 2044", dis: 0, price: 2.5, qty: 5, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREoRGyXmHy_6aIgXYqWHdOT3KjfmnuSyxypw&s" },
    { name: "Apple happy new year 2044", dis: 2.5, price: 2.5, qty: 1, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREoRGyXmHy_6aIgXYqWHdOT3KjfmnuSyxypw&s" },
    { name: "Apple happy new year 2044", dis: 0, price: 3.25, qty: 4, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREoRGyXmHy_6aIgXYqWHdOT3KjfmnuSyxypw&s" },

  ];


  // Calculate total amount and discounts
  const totalAmount = products.reduce((acc, item) => {
    const total = (item.qty * item.price) - item.dis;
    return acc + total;
  }, 0);

  const discountTotal = products.reduce((acc, item) => acc + item.dis, 0);
  const finalTotal = totalAmount - discountTotal;

  return (
    <div className="min-h-screen overflow-y-auto bg-gray-100 p-5 px-2 ">
      {/* Top Section */}
      <div className="flex justify-between mb-4">
        {/* Left Dropdown */}
        <div className="flex items-center space-x-2">
          <select className="border border-gray-300 rounded-md px-4 py-2">
            <option>Walk-In Customer</option>
            {/* Add more customer types here */}
          </select>
          <button className="bg-blue-500 text-white px-3 py-2 rounded-md">+</button>
        </div>

        {/* Search Box */}
        <div className="flex items-center space-x-2">
          <input
            type="text"
            className="border border-gray-300 rounded-md px-4 py-2 w-80"
            placeholder="បញ្ចូលឈ្មោះផលិតផល / SKU / សំនួរពាក់ព័ន្ធ"
          />
          <button className="bg-blue-500 text-white px-3 py-2 rounded-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35M16 10.5a5.5 5.5 0 11-11 0 5.5 5.5 0 0111 0z"
              />
            </svg>
          </button>
        </div>
      </div>
      {/* Table Section */}
      <div className="overflow-x-auto h-[60vh] bg-white p-1 shadow-md scrollbar-hidden">
        <table className="min-w-full text-center">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 w-8 px-1">លេខរៀង</th>
              <th className="py-3 px-6">រូបភាព</th>
              <th className="py-3 px-2">ឈ្មោះ</th>
              <th className="py-3 px-6">បរិមាណ</th>
              <th className="py-3 px-6">តម្លៃរួមបញ្ចូលពន្ធ</th>
              <th className="py-3 px-6">បន្ចុះតម្លៃ</th>
              <th className="py-3 px-6">អនុគ្រ</th>
              <th className="py-3 px-6">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm">
            {products.map((item, index) => {
              const itemTotal = (item.qty * item.price) - item.dis; // Calculate total for each item
              return (
                <tr className="border-b border-gray-200" key={index}>
                  <td className="py-3 px-2">{index + 1}</td>
                  <td>
                    <img className='h-8' src={item.image} alt={item.name} />
                  </td>
                  <td className="py-3 line-clamp-2">{item.name}</td>
                  <td className="py-3 px-6">{item.qty}</td>
                  <td className="py-3 px-6">$ {item.price} </td>
                  <td className="py-3 px-6">$ {item.dis}</td>
                  <td className="py-3 px-6">$ {itemTotal.toFixed(2)}</td> {/* Display item total */}
                  <td className="py-3 px-6">
                    <button className="text-red-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="grid grid-cols-4 gap-4 text-sm bg-gray-200 px-6 py-4">
        <div>
          <p>សរុប:</p>
          <p>${totalAmount.toFixed(2)}</p>
        </div>
        <div>
          <p>ការបញ្ចុះតំលៃ:</p>
          <p>${discountTotal.toFixed(2)}</p>
        </div>
        <div>
          <p>ចំណាយបន្ថែម:</p>
          <p>$0.00</p>
        </div>
        <div>
          <p>សរុបចុងក្រោយ:</p>
          <p>${finalTotal.toFixed(2)}</p>
        </div>
      </div>
      <div className="flex fixed text-sm space-x-3 px-12 my-4">
        <div>
          <button className='p-2 bg-green-600 text-md text-white flex' aria-label="Add expense">
            <span className="flex items-center">
              <FaRegIdCard className="mr-1" /> ការទូទាត់ច្រើនទម្រង់
            </span>
          </button>
        </div>
        <div>
          <button className='bg-purple-600 text-md p-2 text-white flex' aria-label="Add expense">
            <span className="flex items-center">
              <FaMoneyBill className="mr-1" /> សាច់ប្រាក់
            </span>
          </button>
        </div>
        <div>
          <button className='bg-red-400 text-md p-2 text-white flex' aria-label="Add expense">
            <span className="flex items-center">
              <FaWindowClose className="mr-1" /> បោះបង់
            </span>
          </button>
        </div>
        <div>
          <button className='bg-gray-500 text-md p-2 text-white flex' aria-label="Add expense">
            <span className="flex items-center">
              <FaRegMoneyBillAlt className="mr-1" /> សាច់ប្រាក់សរុបត្រូវបង់  <span> $ {finalTotal}</span>
            </span>
          </button>
        </div>
      </div>


    </div>
  );
};

export default PointOfSale;
