
import React, { useState, useEffect, useRef } from 'react';
import { FaBackward, FaMoneyBillAlt, FaEquals, FaCalculator, FaHandHoldingMedical } from 'react-icons/fa';
import { IoChevronBackSharp } from "react-icons/io5";
import { GrSubtractCircle } from 'react-icons/gr';
import { motion, AnimatePresence } from 'framer-motion';
import NodePayManey from './NodePayManey';
import { Link } from 'react-router-dom';
import { formatDateToKhmer, formatTimeToKhmer } from '../../component/ForMartDateToKHmer';
import Calculator from './Calculator';
import ExchangRate from '../currency/modale/ModaleExchangRateToPOS';
import HoldOrder from '../../component/pos/HoldOrder'

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
    const openInsertCustomer = () => setIsModalCustomer(true);
    const [isModalHoldOrder, setIsModalHoldeOrder] = useState(false);
    const openHoldOrder = () => setIsModalHoldeOrder(true);
    const [isModalExchangRate, setIsModalExchangRate] = useState(false);
    const openInsertExchangRate = () => setIsModalExchangRate(true);

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Toggle the dropdown visibility
    const toggleDropdown = () => {
        setIsDropdownOpen((prev) => !prev);
    };

    // Close the dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const [isHoveringPayCost, setIsHoveringPayCost] = useState(false);
    const [isHoveringCost, setIsHoveringCost] = useState(false);
    const [isHoverinHoldOrder, setIsHoveringHoldOrder] = useState(false);
    const [isHoveringExpence, setIsHoveringExpence] = useState(false);
    const [isHoveringSale, setIsHoveringSale] = useState(false);

    const [theme, setTheme] = useState(() => {
        return localStorage.getItem("theme") || "light";
    });


    return (
        <div className="bg-gray-400 dark:bg-slate-600 flex fixed top-0 left-0 right-0 justify-between md:px-20 p-1 text-center z-50">
            <div className='flex justify-between w-full'>

                <div className="text-white font-bold font-NotoSansKhmer flex gap-5 text-center items-center">
                    <Link className="p-1 bg-blue-600 px-4 text-white" to="/" aria-label="Go Back">
                        <IoChevronBackSharp  />
                    </Link>
                    <h2 className="hidden font-KhmerMoul md:block">ចែប៊ីម៉ាត</h2>
                    <span className="text-white font-NotoSansKhmer">{khmerToday}</span> <span>ម៉ោង : {khmerTime}</span>
                </div>
                <div className="flex text-lg p-1 gap-2">
                    <div
                        className="relative"
                        onMouseEnter={() => setIsHoveringPayCost(true)}
                        onMouseLeave={() => setIsHoveringPayCost(false)}
                    >
                        <button className='p-1 bg-purple-600 text-sm text-white flex' aria-label="Add expense">
                            <span className="flex items-center">
                                <GrSubtractCircle className='text-xs mr-1'  /> បន្ថែមការចំណាយ
                            </span>
                        </button>
                        {isHoveringPayCost && (
                            <div className="absolute z-10 bg-white  text-center p-3 rounded-lg shadow w-44 mt-1">
                                <p>បន្ថែមការចំណាយ</p>
                            </div>
                        )}
                    </div>
                    <div
                        className="relative"
                        onMouseEnter={() => setIsHoveringHoldOrder(true)}
                        onMouseLeave={() => setIsHoveringHoldOrder(false)}
                    >
                        <button onClick={openHoldOrder} className='p-1 px-2 space-x-2 items-center bg-pink-600 text-sm text-white flex' aria-label="Add expense">
                            <span className="">
                                <FaHandHoldingMedical className='text-xs'  />
                            </span>
                            <span>រក្សាទុក្ខ</span>
                        </button>
                        {isHoverinHoldOrder && (
                            <div className="absolute z-10 text-gray-700 bg-white -translate-x-1/2 text-center p-3 rounded-lg w-44 mt-1">
                                <p>ព្រៀងទុក</p>
                            </div>
                        )}
                    </div>

                    <div
                        className="relative"
                        onMouseEnter={() => setIsHoveringCost(true)}
                        onMouseLeave={() => setIsHoveringCost(false)}
                    >
                        <button onClick={openInsertCustomer} className='p-2 bg-red-500 text-white' aria-label="Equals">
                            <FaEquals className='text-xs' />
                        </button>
                        {isHoveringCost && (
                            <div className="absolute z-10 text-gray-700 bg-white -translate-x-1/2 text-center p-3 rounded-lg w-44 mt-1">
                                <p>ប្រភេទចំណាយ</p>
                            </div>
                        )}
                    </div>

                    <div
                        className="relative"
                        onMouseEnter={() => setIsHoveringExpence(true)}
                        onMouseLeave={() => setIsHoveringExpence(false)}
                    >
                        <button onClick={openInsertExchangRate} className='p-2 px-2 bg-pink-500 text-white' aria-label="Open Box">
                            <FaMoneyBillAlt  className='text-xs' />
                        </button>
                        {isHoveringExpence && (
                            <div className="absolute z-10 bg-white -translate-x-1/2 text-center p-3 rounded-lg w-44 mt-1">
                                <p>អត្រាប្តូប្រាក់</p>
                            </div>
                        )}
                    </div>

                    {/* Calculator Dropdown */}
                    <div className="relative"
                        onMouseEnter={() => setIsHoveringSale(true)}
                        onMouseLeave={() => setIsHoveringSale(false)}
                        ref={dropdownRef}>

                        <button onClick={toggleDropdown} className="p-2 bg-yellow-500 text-white" aria-label="Calculator">
                            <FaCalculator className='text-xs' />
                        </button>
                        {isHoveringSale && (
                            <div className="absolute z-10 -translate-x-1/2 bg-white text-center p-3 rounded-lg  w-44 mt-1">
                                <p>ម៉ាស៊ីនគិតលេខ</p>
                            </div>
                        )}

                        <AnimatePresence>
                            {isDropdownOpen && (
                                <motion.div
                                    className="absolute z-20 right-0 w-64 bg-white rounded-lg shadow-lg"
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <Calculator />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
            {/* Modal for customer */}
            <AnimatePresence>
                {isModalCustomer && <NodePayManey setIsModalCustomer={setIsModalCustomer} />}
            </AnimatePresence>

            {/* Modal for customer */}
            <AnimatePresence>
                {isModalHoldOrder && <HoldOrder setIsModalHoldeOrder={setIsModalHoldeOrder} />}
            </AnimatePresence>

            <AnimatePresence>
                {isModalExchangRate && <ExchangRate setIsModalExchangRate={setIsModalExchangRate} />}
            </AnimatePresence>
        </div>
    );
}

export default Navbar;
