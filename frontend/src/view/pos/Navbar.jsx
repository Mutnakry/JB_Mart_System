import React, { useState, useEffect } from 'react';
import { FaBackward, FaBoxOpen, FaEquals } from "react-icons/fa";
import { AiFillProduct } from "react-icons/ai";
import { GrSubtractCircle } from "react-icons/gr";
import { motion, AnimatePresence } from "framer-motion";
import NodePayManey from './NodePayManey';
import { Link } from 'react-router-dom';
import { formatDateToKhmer, formatTimeToKhmer } from '../../component/ForMartDateToKHmer';


function Navbar() {
    const [currentDateTime, setCurrentDateTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentDateTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const khmerToday = formatDateToKhmer(currentDateTime);
    const khmerTime = formatTimeToKhmer(currentDateTime);

    const [isModalCustomer, setIsModalCustomer] = useState(false);
    const openInsertCustomer = () => {
        setIsModalCustomer(true);
    };
    const [isHoveringPayCost, setIsHoveringPayCost] = useState(false);
    const [isHoveringCost, setIsHoveringCost] = useState(false);
    const [isHoveringExpence, setIsHoveringExpence] = useState(false);
    const [isHoveringSale, setIsHoveringSale] = useState(false);


    return (
        <div className='bg-gray-500 flex justify-between md:px-20'>
            <div className='text-white font-NotoSansKhmer p-1 text-lg flex gap-5'>
                <h2 className='hidden md:block'>ចែប៊ីម៉ាត</h2>
                {khmerToday} {khmerTime}
            </div>

            <div className='flex text-lg p-1 gap-2'>
                <div
                    className="relative"
                    onMouseEnter={() => setIsHoveringPayCost(true)}
                    onMouseLeave={() => setIsHoveringPayCost(false)}
                >
                    <button className='p-1 bg-purple-600 text-sm text-white flex' aria-label="Add expense">
                        <span className="flex items-center">
                            <GrSubtractCircle className="mr-1" /> បន្ថែមការចំណាយ
                        </span>
                    </button>
                    {isHoveringPayCost && (
                        <div className="absolute z-10 bg-gray-300  text-center p-3 rounded-lg shadow w-44 mt-1">
                            <p>បន្ថែមការចំណាយ</p>
                        </div>
                    )}
                </div>
                <div
                    className="relative"
                    onMouseEnter={() => setIsHoveringCost(true)}
                    onMouseLeave={() => setIsHoveringCost(false)}
                >
                    <button className='p-1 bg-red-500 text-white' aria-label="Equals">
                        <FaEquals />
                    </button>
                    {isHoveringCost && (
                        <div className="absolute z-10 bg-gray-300 -translate-x-1/2 text-center p-3 rounded-lg shadow w-44 mt-1">
                            <p>ប្រភេទចំណាយ</p>
                        </div>
                    )}
                </div>
                <div
                    className="relative"
                    onMouseEnter={() => setIsHoveringExpence(true)}
                    onMouseLeave={() => setIsHoveringExpence(false)}
                >
                    <button className='p-1 bg-blue-500 text-white' aria-label="Open Box">
                        <FaBoxOpen />
                    </button>
                    {isHoveringExpence && (
                        <div className="absolute z-10 bg-gray-300 -translate-x-1/2 text-center p-3 rounded-lg shadow w-44 mt-1">
                            <p>បន្ថែប្រាក់ចំនេញុ</p>
                        </div>
                    )}
                </div>
                <div
                    className="relative"
                    onMouseEnter={() => setIsHoveringSale(true)}
                    onMouseLeave={() => setIsHoveringSale(false)}
                >
                    <button onClick={openInsertCustomer} className='p-1 bg-yellow-500 text-white' aria-label="Product">
                        <AiFillProduct />
                    </button>
                    {isHoveringSale && (
                        <div className="absolute z-10 -translate-x-1/2 bg-gray-300 text-center p-3 rounded-lg shadow w-44 mt-1">
                            <p>បន្ថែមការលក់</p>
                        </div>
                    )}
                </div>
                <Link
                    className="p-1 bg-green-500 text-white"
                    to='/'
                    aria-label="Go Back"
                >
                    <FaBackward />
                </Link>
            </div>

            {/* Modal for customer */}
            <AnimatePresence>
                {isModalCustomer && (
                    <NodePayManey setIsModalCustomer={setIsModalCustomer} />
                )}
            </AnimatePresence>
        </div>
    );
}

export default Navbar;
