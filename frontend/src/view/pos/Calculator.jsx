import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MdClose } from 'react-icons/md';

const Calculator = ({ setIsDropdownOpen }) => {
  // State to store the input and result
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const handleClick = (value) => {
    setInput((prev) => prev + value);
  };
  const handleCalculate = () => {
    try {
      setResult(eval(input)); 
      setInput('');
    } catch (error) {
      setResult('Error');
      setInput('');
    }
  };
  const handleClear = () => {
    setInput('');
    setResult('');
  };

  const handleBackspace = () => {
    setInput((prev) => prev.slice(0, -1));
  };


  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-50 flex items-start justify-center w-full h-full bg-black bg-opacity-30"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.2 }}
    >
      <div className="relative w-full max-w-sm bg-white rounded-lg shadow-md p-6 dark:bg-gray-700">
        {/* Modal Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold dark:text-white">ម៉ាស៊ីនគិតលេខ</h2>
         
        </div>

        {/* Display */}
        <div className="mb-4">
          <div className="text-right text-2xl h-12 bg-gray-100 p-3 rounded mb-2 dark:bg-gray-800 dark:text-white">
            {input || result || '0'}
          </div>
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-4 gap-2">
          {/* Row 1 */}
          <button className="col-span-2 bg-red-500 text-white p-4 rounded hover:bg-red-600" onClick={handleClear}>
            AC
          </button>
          <button className="bg-yellow-500 text-white p-4 rounded hover:bg-yellow-600" onClick={handleBackspace}>
            C
          </button>
          <button className="bg-blue-500 text-white p-4 rounded hover:bg-blue-600" onClick={() => handleClick('/')}>
            ÷
          </button>

          {/* Row 2 */}
          <button className="bg-gray-200 p-4 rounded hover:bg-gray-300" onClick={() => handleClick('7')}>
            7
          </button>
          <button className="bg-gray-200 p-4 rounded hover:bg-gray-300" onClick={() => handleClick('8')}>
            8
          </button>
          <button className="bg-gray-200 p-4 rounded hover:bg-gray-300" onClick={() => handleClick('9')}>
            9
          </button>
          <button className="bg-blue-500 text-white p-4 rounded hover:bg-blue-600" onClick={() => handleClick('*')}>
            ×
          </button>

          {/* Row 3 */}
          <button className="bg-gray-200 p-4 rounded hover:bg-gray-300" onClick={() => handleClick('4')}>
            4
          </button>
          <button className="bg-gray-200 p-4 rounded hover:bg-gray-300" onClick={() => handleClick('5')}>
            5
          </button>
          <button className="bg-gray-200 p-4 rounded hover:bg-gray-300" onClick={() => handleClick('6')}>
            6
          </button>
          <button className="bg-blue-500 text-white p-4 rounded hover:bg-blue-600" onClick={() => handleClick('-')}>
            −
          </button>
          
          {/* Row 4 */}
          <button className="bg-gray-200 p-4 rounded hover:bg-gray-300" onClick={() => handleClick('1')}>
            1
          </button>
          <button className="bg-gray-200 p-4 rounded hover:bg-gray-300" onClick={() => handleClick('2')}>
            2
          </button>
          <button className="bg-gray-200 p-4 rounded hover:bg-gray-300" onClick={() => handleClick('3')}>
            3
          </button>
          <button className="bg-blue-500 text-white p-4 rounded hover:bg-blue-600" onClick={() => handleClick('+')}>
            +
          </button>

          {/* Row 5 */}
          <button className="col-span-2 bg-gray-200 p-4 rounded hover:bg-gray-300" onClick={() => handleClick('0')}>
            0
          </button>
          <button className="bg-gray-200 p-4 rounded hover:bg-gray-300" onClick={() => handleClick('.')}>
            .
          </button>
          <button className="bg-green-500 text-white p-4 rounded hover:bg-green-600" onClick={handleCalculate}>
            =
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Calculator;
