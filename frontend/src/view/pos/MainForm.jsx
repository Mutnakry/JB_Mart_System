import React, { useState, useEffect } from 'react';
import Navbar from '../../component/Navbar';
import Main from '../../component/pos/Main';
import Cart from '../../component/pos/Cart';
import ViewProduct from '../../component/pos/ViewProduct';
import { FaBackward, FaBoxOpen, FaEquals } from "react-icons/fa";
import { AiFillProduct } from "react-icons/ai";
import { GrSubtractCircle } from "react-icons/gr";

function Header({ currentDateTime }) {
    return (
        <div className='bg-gray-500 flex justify-between md:px-20'>
            <div className='text-white font-NotoSansKhmer p-1 text-lg flex gap-5'>
                <h2 className='hidden md:block'>ចែប៊ីម៉ាត</h2>
                {currentDateTime.toLocaleDateString()} {currentDateTime.toLocaleTimeString()}
            </div>
            <div className='flex text-lg p-1 gap-2'>
                <p className='p-1 bg-purple-600 text-sm text-white flex' aria-label="Add expense">
                    <span className="flex items-center">
                        <GrSubtractCircle className="mr-1" /> បន្ថែមការចំណាយ
                    </span>
                </p>
                <p className='p-1 bg-red-500 text-white ' aria-label="Equals"><FaEquals /></p>
                <p className='p-1 bg-blue-500 text-white' aria-label="Open Box"><FaBoxOpen /></p>
                <p className='p-1 bg-yellow-500 text-white' aria-label="Product"><AiFillProduct /></p>
                <a href="/" className='p-1 bg-green-500 text-white' aria-label="Go Back"><FaBackward /></a>
            </div>
        </div>
    );
}

function MainForm() {
    const [currentDateTime, setCurrentDateTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentDateTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div>
            <div className='bg-white'>
                <Header currentDateTime={currentDateTime} />
                <div className='grid md:grid-cols-2'>
                    <div className='h-screen'>
                        <Cart />
                    </div>
                    <div>
                        <ViewProduct />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MainForm;
