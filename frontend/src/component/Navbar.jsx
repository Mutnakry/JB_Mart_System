import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

function Navbar() {
    // Load the initial theme from localStorage or default to "light"
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem("theme") || "light";
    });
    const [isSidebarVisible, setSidebarVisible] = useState(false);

    // State to hold user information
    const [userNames, setUserNames] = useState('');
    const [userRol, setUserRol] = useState('');
    const [userEmail, setUserEmail] = useState('');
    useEffect(() => {
        setUserNames(localStorage.getItem('user_names') || '');
        setUserRol(localStorage.getItem('user_rol') || '');
        setUserEmail(localStorage.getItem('user_email') || '');
        if (theme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
        // Save the theme to localStorage
        localStorage.setItem("theme", theme);
    }, [theme]);

    const handleThemeSwitch = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user_rol');
        localStorage.removeItem('user_names');
        localStorage.removeItem('user_email');
        window.location.href = "/";
    };
    const [isDropDownContactVisible, setDropDownContactVisible] = useState(false); // State for contact dropdown
    const handleDropdownContact = () => {
        setDropDownContactVisible(!isDropDownContactVisible);
    };

    //dropdown product
    const [isDropDownProduct, setDropDownProduct] = useState(false);
    const handleDropdownProduct = () => {
        setDropDownProduct(!isDropDownProduct);
    };
    //dropdown phuchae
    const [isPurcahseDropdownVisible, setDropDownPurchaseDropdown] = useState(false);
    const handlePurchaseDropdown = () => {
        setDropDownPurchaseDropdown(!isPurcahseDropdownVisible);
    };

    //dropdown phome
    const [isDropDownPhoneDropdown, setDropDownPhoneDropdown] = useState(false);
    const handleDropdownPhone = () => {
        setDropDownPhoneDropdown(!isDropDownPhoneDropdown);
    };
    //dropdown cost
    const [isDropDownCostDropdown, setDropDownCostDropdown] = useState(false);
    const handleDropdownCost = () => {
        setDropDownCostDropdown(!isDropDownCostDropdown);
    };
    //dropdown Account
    const [isDropDownAcocountDropdown, setDropDownAcountDropdown] = useState(false);
    const handleDropdownAccount = () => {
        setDropDownAcountDropdown(!isDropDownAcocountDropdown);
    };

    //dropdown ExSpent
    const [isDropDownExSpentDropdown, setDropDownExSpentDropdown] = useState(false);
    const handleDropdownExSpent = () => {
        setDropDownExSpentDropdown(!isDropDownExSpentDropdown);
    };
    //dropdown UserACC
    const [isDropDownUserACCDropdown, setDropDownUserACCDropdown] = useState(false);
    const handleDropdownUserACcc = () => {
        setDropDownUserACCDropdown(!isDropDownUserACCDropdown);
    };

    //dropdown Invoice
    const [isDropDownInvoiceDropdown, setDropDownIncoiceDropdown] = useState(false); // State for contact dropdown
    const handleDropdownInvoice = () => {
        setDropDownIncoiceDropdown(!isDropDownInvoiceDropdown);
    };
    return (
        <div>
            <nav className="fixed top-0 z-50 w-full bg-gradient-to-r from-blue-400 to-blue-950 border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                <div className="py-3 px-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center justify-between space-x-2 rtl:justify-end">
                            <a href="/Dashboard" className=" md:me-8 hidden md:block">
                                <span className="self-center text-xl text-gray-700 font-bold sm:text-2xl whitespace-nowrap dark:text-white">ហាងលក់ទំនិញចែប៊ីម៉ាត</span>
                            </a>
                            <button data-drawer-target="sidebar-multi-level-sidebar" data-drawer-toggle="sidebar-multi-level-sidebar" aria-controls="sidebar-multi-level-sidebar" type="button" class="inline-flex items-center  ms-3 text-sm text-white rounded-lg lg:hidden  focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                                <span class="sr-only">Open sidebar</span>
                                <svg class="w-8 h-8" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                                </svg>
                            </button>
                            <button
                                className="bg-slate-200 rounded-3xl p-1"
                                onClick={handleThemeSwitch}
                            >
                                {theme === "dark" ? (
                                    <img width="24" height="24" src="https://img.icons8.com/ios-filled/50/ffffff/sun--v1.png" alt="light mode icon" />
                                ) : (
                                    <img width="24" height="24" src="https://img.icons8.com/ios-filled/50/000000/moon-symbol.png" alt="dark mode icon" />
                                )}
                            </button>
                        </div>
                        <div className="flex items-center">
                            <div className='flex space-x-4'>
                                <a href="#" className='py-1 px-3 flex items-center space-x-2 hover:bg-green-500 transition duration-300 text-lg text-gray-700 font-medium bg-green-400'>
                                    <img width="24" height="24" src="https://img.icons8.com/ios-glyphs/30/menu--v1.png" alt="menu" />
                                    <span>pos</span>
                                </a>
                                <a href="#" className='py-1 px-3 flex items-center space-x-2 hover:bg-green-500 transition duration-300 text-lg text-gray-700 font-medium bg-green-400'>
                                    <img width="24" height="24" src="https://img.icons8.com/ios-filled/24/income.png" alt="income" />
                                    <span>ចំណូល</span>
                                </a>
                                <p className="text-lg text-gray-400 font-bold" role="none">
                                    {userNames}
                                </p>
                            </div>
                            <div className="flex items-center ms-3 md:pr-20 pr-0">

                                <div>
                                    <button type="button" className="flex rounded-full p-2 bg-blue-900" aria-expanded="false" data-dropdown-toggle="dropdown-user">
                                        <span className="sr-only">Open user menu</span>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="20"
                                            height="20"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="lucide lucide-user"
                                        >
                                            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                                            <circle cx="12" cy="7" r="4" />
                                        </svg>
                                    </button>
                                </div>
                                <div className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600" id="dropdown-user">
                                    <div className="px-4 py-3" role="none">
                                        <p className="text-sm text-gray-900 font-bold" role="none">
                                            Name :  {userNames}
                                        </p>
                                        <p className="text-sm text-gray-900 font-bold" role="none">
                                            Email : {userEmail}
                                        </p>
                                    </div>
                                    <ul className="py-1" role="none">
                                        <li>
                                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Dashboard</a>
                                        </li>
                                        <li>
                                            <a href="/" onClick={handleLogout} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Sign out</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <aside id="sidebar-multi-level-sidebar" class="fixed top-12 left-0 z-40 w-64 h-screen transition-transform -translate-x-full lg:translate-x-0" aria-label="Sidebar">

                <div className="h-full px-3 py-4 overflow-y-auto bg-white shadow-2xl dark:bg-gray-800">
                    <ul className="space-y-2 font-medium">

                        {userRol !== 'user' &&
                            <li>
                                <NavLink
                                    to="/Dashboard"
                                    className={({ isActive }) =>
                                        `flex items-center p-2  dark:text-white ${isActive ? 'bg-gradient-to-r from-blue-900 to-blue-600 text-white' : 'text-gray-900'} space-x-3 dark:hover:bg-gray-700 group`
                                    }
                                >
                                    <svg className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                                        <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                                        <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                                    </svg>
                                    <span>ទំព័រដើម</span>
                                </NavLink>
                            </li>
                        }
                        {userRol !== 'user' &&
                            <li>
                                <NavLink
                                    to="/category"
                                    className={({ isActive }) =>
                                        `flex items-center p-2 dark:text-white ${isActive ? 'bg-gradient-to-r from-blue-900 to-blue-600 text-white' : 'text-gray-900'} space-x-3 dark:hover:bg-gray-700 group`
                                    }
                                >
                                    <svg className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                                        <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                                        <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                                    </svg>
                                    <span>ប្រភេទទំនិញ</span>
                                </NavLink>
                            </li>
                        }
                        <li className="space-y-2">
                            <button
                                onClick={handleDropdownContact}
                                className={`flex items-center p-3 w-full text-left justify-between ${isDropDownContactVisible
                                    ? "bg-blue-600 dark:bg-blue-500 text-white"
                                    : "text-gray-900 dark:text-white"
                                    }`}
                            >
                                <div className="flex items-center">

                                    <div className="flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-contact"><path d="M16 2v2" /><path d="M7 22v-2a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2" /><path d="M8 2v2" /><circle cx="12" cy="11" r="3" /><rect x="3" y="4" width="18" height="18" rx="2" /></svg>                                    <span className="flex-1 ms-3 whitespace-nowrap font-NotoSansKhmer font-bold">
                                            ទំនាក់ទំនង
                                        </span>
                                    </div>
                                </div>
                                <svg
                                    className={`w-4 h-4 transition-transform duration-300 ${isDropDownContactVisible ? "transform rotate-90" : ""
                                        }`}
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 5l7 7-7 7"
                                    />
                                </svg>
                            </button>

                            <div
                                id="product-dropdown"
                                className={`overflow-hidden transition-all duration-500 space-y-2 ${isDropDownContactVisible
                                    ? "max-h-40 opacity-100"
                                    : "max-h-0 opacity-0"
                                    }`}
                            >
                                <NavLink
                                    to="/category"
                                    className={({ isActive }) =>
                                        `flex items-center gap-2 p-3 pl-6 text-gray-700 dark:text-gray-300 hover:bg-blue-500 font-NotoSansKhmer hover:text-white dark:hover:bg-gray-700 ${isActive
                                            ? "bg-blue-500 dark:bg-blue-500 text-white"
                                            : ""
                                        }`
                                    }
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                                    </svg>
                                    <p className="font-bold font-NotoSansKhmer">បង្កើតទំនាក់ទំនង</p>
                                </NavLink>
                                <NavLink
                                    to="/category"
                                    className={({ isActive }) =>
                                        `flex items-center gap-2 p-3 pl-6 text-gray-700 dark:text-gray-300 font-NotoSansKhmer hover:text-white hover:bg-blue-500 dark:hover:bg-gray-700 ${isActive
                                            ? "bg-blue-500 dark:bg-blue-500 text-white"
                                            : ""
                                        }`
                                    }
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                                    </svg>
                                    <p className="font-bold font-NotoSansKhmer">បញ្ជីទំនាក់ទំនង</p>
                                </NavLink>

                                <NavLink
                                    to="/Dashboard"
                                    className={({ isActive }) =>
                                        `flex items-center gap-2 p-3 pl-6 text-gray-700 dark:text-gray-300 font-NotoSansKhmer hover:text-white hover:bg-blue-500 dark:hover:bg-gray-700 ${isActive
                                            ? "bg-blue-500 dark:bg-blue-500 text-white"
                                            : ""
                                        }`
                                    }
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                                    </svg>
                                    <p className="font-bold font-NotoSansKhmer">របាយការណ៍ទំនាក់ទំនង</p>
                                </NavLink>
                            </div>
                        </li>
                        <li className="space-y-2">
                            <button
                                onClick={handleDropdownProduct}
                                className={`flex items-center p-3 w-full text-left justify-between ${isDropDownProduct
                                    ? "bg-blue-600 dark:bg-blue-500 text-white"
                                    : "text-gray-900 dark:text-white"
                                    }`}
                            >
                                <div className="flex items-center">
                                    {/* SVG Icon */}
                                    <div className="flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-package-open"><path d="M12 22v-9" /><path d="M15.17 2.21a1.67 1.67 0 0 1 1.63 0L21 4.57a1.93 1.93 0 0 1 0 3.36L8.82 14.79a1.655 1.655 0 0 1-1.64 0L3 12.43a1.93 1.93 0 0 1 0-3.36z" /><path d="M20 13v3.87a2.06 2.06 0 0 1-1.11 1.83l-6 3.08a1.93 1.93 0 0 1-1.78 0l-6-3.08A2.06 2.06 0 0 1 4 16.87V13" /><path d="M21 12.43a1.93 1.93 0 0 0 0-3.36L8.83 2.2a1.64 1.64 0 0 0-1.63 0L3 4.57a1.93 1.93 0 0 0 0 3.36l12.18 6.86a1.636 1.636 0 0 0 1.63 0z" /></svg>
                                        <span className="flex-1 ms-3 whitespace-nowrap font-NotoSansKhmer font-bold">
                                            ផលិតផល
                                        </span>
                                    </div>
                                </div>
                                <svg
                                    className={`w-4 h-4 transition-transform duration-300 ${isDropDownProduct ? "transform rotate-90" : ""
                                        }`}
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 5l7 7-7 7"
                                    />
                                </svg>
                            </button>

                            <div
                                id="product-dropdown"
                                className={`overflow-hidden transition-all duration-500 space-y-2 ${isDropDownProduct
                                    ? "max-h-40 opacity-100"
                                    : "max-h-0 opacity-0"
                                    }`}
                            >
                                <NavLink
                                    to="/test"
                                    className={({ isActive }) =>
                                        `flex items-center gap-2 p-3 pl-6 text-gray-700 dark:text-gray-300 hover:bg-blue-500 font-NotoSansKhmer hover:text-white dark:hover:bg-gray-700 ${isActive
                                            ? "bg-blue-500 dark:bg-blue-500 text-white"
                                            : ""
                                        }`
                                    }
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                                    </svg>
                                    <p className="font-bold font-NotoSansKhmer">បង្កើតផលិតផល</p>
                                </NavLink>
                                <NavLink
                                    to="/"
                                    className={({ isActive }) =>
                                        `flex items-center gap-2 p-3 pl-6 text-gray-700 dark:text-gray-300 font-NotoSansKhmer hover:text-white hover:bg-blue-500 dark:hover:bg-gray-700 ${isActive
                                            ? "bg-blue-500 dark:bg-blue-500 text-white"
                                            : ""
                                        }`
                                    }
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                                    </svg>
                                    <p className="font-bold font-NotoSansKhmer">បញ្ជីផលិតផល</p>
                                </NavLink>
                            </div>
                        </li>
                        <li className="space-y-2">
                            <button
                                onClick={handlePurchaseDropdown}
                                className={`flex items-center p-3 w-full text-left justify-between ${isPurcahseDropdownVisible
                                    ? "bg-blue-600 dark:bg-blue-500 text-white"
                                    : "text-gray-900 dark:text-white"
                                    }`}
                            >
                                <div className="flex items-center">
                                    {/* SVG Icon */}
                                    <div className="flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M7.49 12 3.74 8.248m0 0 3.75-3.75m-3.75 3.75h16.5V19.5" />
                                        </svg>
                                        <span className="flex-1 ms-3 whitespace-nowrap font-NotoSansKhmer font-bold">
                                            បញ្ជាទិញទំនិញ
                                        </span>
                                    </div>
                                </div>
                                <svg
                                    className={`w-4 h-4 transition-transform duration-300 ${isPurcahseDropdownVisible ? "transform rotate-90" : ""
                                        }`}
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 5l7 7-7 7"
                                    />
                                </svg>
                            </button>

                            <div
                                id="product-dropdown"
                                className={`overflow-hidden transition-all duration-500 space-y-2 ${isPurcahseDropdownVisible
                                    ? "max-h-40 opacity-100"
                                    : "max-h-0"
                                    }`}
                            >
                                <NavLink
                                    to="/test"
                                    className={({ isActive }) =>
                                        `flex items-center gap-2 p-3 pl-6 text-gray-700 dark:text-gray-300 hover:bg-blue-500 font-NotoSansKhmer hover:text-white dark:hover:bg-gray-700 ${isActive
                                            ? "bg-blue-500 dark:bg-blue-500 text-white"
                                            : ""
                                        }`
                                    }
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                                    </svg>
                                    <p className="font-bold font-NotoSansKhmer">បង្កើតផលិតផល</p>
                                </NavLink>
                                <NavLink
                                    to="/"
                                    className={({ isActive }) =>
                                        `flex items-center gap-2 p-3 pl-6 text-gray-700 dark:text-gray-300 font-NotoSansKhmer hover:text-white hover:bg-blue-500 dark:hover:bg-gray-700 ${isActive
                                            ? "bg-blue-500 dark:bg-blue-500 text-white"
                                            : ""
                                        }`
                                    }
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                                    </svg>
                                    <p className="font-bold font-NotoSansKhmer">បញ្ជីផលិតផល</p>
                                </NavLink>
                            </div>
                        </li>

                        <li className="space-y-2">
                            <button
                                onClick={handleDropdownPhone}
                                className={`flex items-center p-3 w-full text-left justify-between ${isDropDownPhoneDropdown
                                    ? "bg-blue-600 dark:bg-blue-500 text-white"
                                    : "text-gray-900 dark:text-white"
                                    }`}
                            >
                                <div className="flex items-center">
                                    {/* SVG Icon */}
                                    <div className="flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-receipt-text"><path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z" /><path d="M14 8H8" /><path d="M16 12H8" /><path d="M13 16H8" /></svg>
                                        <span className="flex-1 ms-3 whitespace-nowrap font-NotoSansKhmer font-bold">
                                            កាតទូរស័ព្ទ
                                        </span>
                                    </div>
                                </div>
                                <svg
                                    className={`w-4 h-4 transition-transform duration-300 ${isDropDownPhoneDropdown ? "transform rotate-90" : ""
                                        }`}
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 5l7 7-7 7"
                                    />
                                </svg>
                            </button>

                            <div
                                id="product-dropdown"
                                className={`overflow-hidden transition-all duration-500 space-y-2 ${isDropDownPhoneDropdown
                                    ? "max-h-40 opacity-100"
                                    : "max-h-0"
                                    }`}
                            >
                                <NavLink
                                    to="/test"
                                    className={({ isActive }) =>
                                        `flex items-center gap-2 p-3 pl-6 text-gray-700 dark:text-gray-300 hover:bg-blue-500 font-NotoSansKhmer hover:text-white dark:hover:bg-gray-700 ${isActive
                                            ? "bg-blue-500 dark:bg-blue-500 text-white"
                                            : ""
                                        }`
                                    }
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                                    </svg>
                                    <p className="font-bold font-NotoSansKhmer">បង្កើតផលិតផល</p>
                                </NavLink>
                                <NavLink
                                    to="/"
                                    className={({ isActive }) =>
                                        `flex items-center gap-2 p-3 pl-6 text-gray-700 dark:text-gray-300 font-NotoSansKhmer hover:text-white hover:bg-blue-500 dark:hover:bg-gray-700 ${isActive
                                            ? "bg-blue-500 dark:bg-blue-500 text-white"
                                            : ""
                                        }`
                                    }
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                                    </svg>
                                    <p className="font-bold font-NotoSansKhmer">បញ្ជីផលិតផល</p>
                                </NavLink>
                            </div>
                        </li>


                        <li className="space-y-2">
                            <button
                                onClick={handleDropdownCost}
                                className={`flex items-center p-3 w-full text-left justify-between ${isDropDownCostDropdown
                                    ? "bg-blue-600 dark:bg-blue-500 text-white"
                                    : "text-gray-900 dark:text-white"
                                    }`}
                            >
                                <div className="flex items-center">
                                    {/* SVG Icon */}
                                    <div className="flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M11.99 7.5 8.24 3.75m0 0L4.49 7.5m3.75-3.75v16.499h11.25" />
                                        </svg>
                                        <span className="flex-1 ms-3 whitespace-nowrap font-NotoSansKhmer font-bold">
                                            ចំណាយ
                                        </span>
                                    </div>
                                </div>
                                <svg
                                    className={`w-4 h-4 transition-transform duration-300 ${isDropDownCostDropdown ? "transform rotate-90" : ""
                                        }`}
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 5l7 7-7 7"
                                    />
                                </svg>
                            </button>

                            <div
                                id="product-dropdown"
                                className={`overflow-hidden transition-all duration-500 space-y-2 ${isDropDownCostDropdown
                                    ? "max-h-40 opacity-100"
                                    : "max-h-0 "
                                    }`}
                            >
                                <NavLink
                                    to="/test"
                                    className={({ isActive }) =>
                                        `flex items-center gap-2 p-3 pl-6 text-gray-700 dark:text-gray-300 hover:bg-blue-500 font-NotoSansKhmer hover:text-white dark:hover:bg-gray-700 ${isActive
                                            ? "bg-blue-500 dark:bg-blue-500 text-white"
                                            : ""
                                        }`
                                    }
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                                    </svg>
                                    <p className="font-bold font-NotoSansKhmer">បង្កើតផលិតផល</p>
                                </NavLink>
                                <NavLink
                                    to="/"
                                    className={({ isActive }) =>
                                        `flex items-center gap-2 p-3 pl-6 text-gray-700 dark:text-gray-300 font-NotoSansKhmer hover:text-white hover:bg-blue-500 dark:hover:bg-gray-700 ${isActive
                                            ? "bg-blue-500 dark:bg-blue-500 text-white"
                                            : ""
                                        }`
                                    }
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                                    </svg>
                                    <p className="font-bold font-NotoSansKhmer">បញ្ជីផលិតផល</p>
                                </NavLink>
                            </div>
                        </li>

                        <li className="space-y-2">
                            <button
                                onClick={handleDropdownAccount}
                                className={`flex items-center p-3 w-full text-left justify-between ${isDropDownAcocountDropdown
                                    ? "bg-blue-600 dark:bg-blue-500 text-white"
                                    : "text-gray-900 dark:text-white"
                                    }`}
                            >
                                <div className="flex items-center">
                                    {/* SVG Icon */}
                                    <div className="flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-credit-card"><rect width="20" height="14" x="2" y="5" rx="2" /><line x1="2" x2="22" y1="10" y2="10" /></svg>
                                        <span className="flex-1 ms-3 whitespace-nowrap font-NotoSansKhmer font-bold">
                                            គណនី
                                        </span>
                                    </div>
                                </div>
                                <svg
                                    className={`w-4 h-4 transition-transform duration-300 ${isDropDownAcocountDropdown ? "transform rotate-90" : ""
                                        }`}
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 5l7 7-7 7"
                                    />
                                </svg>
                            </button>

                            <div
                                id="product-dropdown"
                                className={`overflow-hidden transition-all duration-500 space-y-2 ${isDropDownAcocountDropdown
                                    ? "max-h-40 opacity-100"
                                    : "max-h-0 "
                                    }`}
                            >
                                <NavLink
                                    to="/test"
                                    className={({ isActive }) =>
                                        `flex items-center gap-2 p-3 pl-6 text-gray-700 dark:text-gray-300 hover:bg-blue-500 font-NotoSansKhmer hover:text-white dark:hover:bg-gray-700 ${isActive
                                            ? "bg-blue-500 dark:bg-blue-500 text-white"
                                            : ""
                                        }`
                                    }
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                                    </svg>
                                    <p className="font-bold font-NotoSansKhmer">របាយការណ៍</p>
                                </NavLink>
                                <NavLink
                                    to="/"
                                    className={({ isActive }) =>
                                        `flex items-center gap-2 p-3 pl-6 text-gray-700 dark:text-gray-300 font-NotoSansKhmer hover:text-white hover:bg-blue-500 dark:hover:bg-gray-700 ${isActive
                                            ? "bg-blue-500 dark:bg-blue-500 text-white"
                                            : ""
                                        }`
                                    }
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                                    </svg>
                                    <p className="font-bold font-NotoSansKhmer">បញ្ជីផលិតផល</p>
                                </NavLink>
                            </div>
                        </li>

                        <li className="space-y-2">
                            <button
                                onClick={handleDropdownExSpent}
                                className={`flex items-center p-3 w-full text-left justify-between ${isDropDownExSpentDropdown
                                    ? "bg-blue-600 dark:bg-blue-500 text-white"
                                    : "text-gray-900 dark:text-white"
                                    }`}
                            >
                                <div className="flex items-center">
                                    {/* SVG Icon */}
                                    <div className="flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-hand-coins"><path d="M11 15h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 17" /><path d="m7 21 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9" /><path d="m2 16 6 6" /><circle cx="16" cy="9" r="2.9" /><circle cx="6" cy="5" r="3" /></svg>                                    <span className="flex-1 ms-3 whitespace-nowrap font-NotoSansKhmer font-bold">
                                            វិធីសាស្រ្តបង់ប្រាក់
                                        </span>
                                    </div>
                                </div>
                                <svg
                                    className={`w-4 h-4 transition-transform duration-300 ${isDropDownExSpentDropdown ? "transform rotate-90" : ""
                                        }`}
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 5l7 7-7 7"
                                    />
                                </svg>
                            </button>

                            <div
                                id="product-dropdown"
                                className={`overflow-hidden transition-all duration-500 space-y-2 ${isDropDownExSpentDropdown
                                    ? "max-h-40 opacity-100"
                                    : "max-h-0"
                                    }`}
                            >
                                <NavLink
                                    to="/test"
                                    className={({ isActive }) =>
                                        `flex items-center gap-2 p-3 pl-6 text-gray-700 dark:text-gray-300 hover:bg-blue-500 font-NotoSansKhmer hover:text-white dark:hover:bg-gray-700 ${isActive
                                            ? "bg-blue-500 dark:bg-blue-500 text-white"
                                            : ""
                                        }`
                                    }
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                                    </svg>
                                    <p className="font-bold font-NotoSansKhmer">របាយការណ៍</p>
                                </NavLink>
                                <NavLink
                                    to="/"
                                    className={({ isActive }) =>
                                        `flex items-center gap-2 p-3 pl-6 text-gray-700 dark:text-gray-300 font-NotoSansKhmer hover:text-white hover:bg-blue-500 dark:hover:bg-gray-700 ${isActive
                                            ? "bg-blue-500 dark:bg-blue-500 text-white"
                                            : ""
                                        }`
                                    }
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                                    </svg>
                                    <p className="font-bold font-NotoSansKhmer">បញ្ជីផលិតផល</p>
                                </NavLink>
                            </div>
                        </li>


                        <li className="space-y-2">
                            <button
                                onClick={handleDropdownUserACcc}
                                className={`flex items-center p-3 w-full text-left justify-between ${isDropDownUserACCDropdown
                                    ? "bg-blue-600 dark:bg-blue-500 text-white"
                                    : "text-gray-900 dark:text-white"
                                    }`}
                            >
                                <div className="flex items-center">
                                    {/* SVG Icon */}
                                    <div className="flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-users-round"><path d="M18 21a8 8 0 0 0-16 0" /><circle cx="10" cy="8" r="5" /><path d="M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3" /></svg>                                    <span className="flex-1 ms-3 whitespace-nowrap font-NotoSansKhmer font-bold">
                                            អ្នកប្រើប្រាស់
                                        </span>
                                    </div>
                                </div>
                                <svg
                                    className={`w-4 h-4 transition-transform duration-300 ${isDropDownUserACCDropdown ? "transform rotate-90" : ""
                                        }`}
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 5l7 7-7 7"
                                    />
                                </svg>
                            </button>

                            <div
                                id="product-dropdown"
                                className={`overflow-hidden transition-all duration-500 space-y-2 ${isDropDownUserACCDropdown
                                    ? "max-h-40 opacity-100"
                                    : "max-h-0"
                                    }`}
                            >
                                <NavLink
                                    to="/test"
                                    className={({ isActive }) =>
                                        `flex items-center gap-2 p-3 pl-6 text-gray-700 dark:text-gray-300 hover:bg-blue-500 font-NotoSansKhmer hover:text-white dark:hover:bg-gray-700 ${isActive
                                            ? "bg-blue-500 dark:bg-blue-500 text-white"
                                            : ""
                                        }`
                                    }
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                                    </svg>
                                    <p className="font-bold font-NotoSansKhmer">របាយការណ៍</p>
                                </NavLink>
                                <NavLink
                                    to="/"
                                    className={({ isActive }) =>
                                        `flex items-center gap-2 p-3 pl-6 text-gray-700 dark:text-gray-300 font-NotoSansKhmer hover:text-white hover:bg-blue-500 dark:hover:bg-gray-700 ${isActive
                                            ? "bg-blue-500 dark:bg-blue-500 text-white"
                                            : ""
                                        }`
                                    }
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                                    </svg>
                                    <p className="font-bold font-NotoSansKhmer">បញ្ជីផលិតផល</p>
                                </NavLink>
                            </div>
                        </li>

                        <li className="space-y-2">
                            <button
                                onClick={handleDropdownInvoice}
                                className={`flex items-center p-3 w-full text-left justify-between ${isDropDownInvoiceDropdown
                                    ? "bg-blue-600 dark:bg-blue-500 text-white"
                                    : "text-gray-900 dark:text-white"
                                    }`}
                            >
                                <div className="flex items-center">
                                    {/* SVG Icon */}
                                    <div className="flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z" />
                                        </svg>
                                        <span className="flex-1 ms-3 whitespace-nowrap font-NotoSansKhmer font-bold">
                                            របាយការណ៍
                                        </span>
                                    </div>
                                </div>
                                <svg
                                    className={`w-4 h-4 transition-transform duration-300 ${isDropDownInvoiceDropdown ? "transform rotate-90" : ""
                                        }`}
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 5l7 7-7 7"
                                    />
                                </svg>
                            </button>

                            <div
                                id="product-dropdown"
                                className={`overflow-hidden transition-all duration-500 space-y-2 ${isDropDownInvoiceDropdown
                                    ? "max-h-96 opacity-100"
                                    : "max-h-0"
                                    }`}
                            >
                                <NavLink
                                    to="/test"
                                    className={({ isActive }) =>
                                        `flex items-center gap-2 p-3 pl-6 text-gray-700 dark:text-gray-300 hover:bg-blue-500 font-NotoSansKhmer hover:text-white dark:hover:bg-gray-700 ${isActive
                                            ? "bg-blue-500 dark:bg-blue-500 text-white"
                                            : ""
                                        }`
                                    }
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                                    </svg>
                                    <p className="font-bold font-NotoSansKhmer">របាយការណ៍</p>
                                </NavLink>
                                <NavLink
                                    to="/"
                                    className={({ isActive }) =>
                                        `flex items-center gap-2 p-3 pl-6 text-gray-700 dark:text-gray-300 font-NotoSansKhmer hover:text-white hover:bg-blue-500 dark:hover:bg-gray-700 ${isActive
                                            ? "bg-blue-500 dark:bg-blue-500 text-white"
                                            : ""
                                        }`
                                    }
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                                    </svg>
                                    <p className="font-bold font-NotoSansKhmer">បញ្ជីផលិតផល</p>
                                </NavLink>
                                <NavLink
                                    to="/"
                                    className={({ isActive }) =>
                                        `flex items-center gap-2 p-3 pl-6 text-gray-700 dark:text-gray-300 font-NotoSansKhmer hover:text-white hover:bg-blue-500 dark:hover:bg-gray-700 ${isActive
                                            ? "bg-blue-500 dark:bg-blue-500 text-white"
                                            : ""
                                        }`
                                    }
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                                    </svg>
                                    <p className="font-bold font-NotoSansKhmer">បញ្ជីផលិតផល</p>
                                </NavLink>
                                <NavLink
                                    to="/"
                                    className={({ isActive }) =>
                                        `flex items-center gap-2 p-3 pl-6 text-gray-700 dark:text-gray-300 font-NotoSansKhmer hover:text-white hover:bg-blue-500 dark:hover:bg-gray-700 ${isActive
                                            ? "bg-blue-500 dark:bg-blue-500 text-white"
                                            : ""
                                        }`
                                    }
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                                    </svg>
                                    <p className="font-bold font-NotoSansKhmer">បញ្ជីផលិតផល</p>
                                </NavLink>
                                <NavLink
                                    to="/"
                                    className={({ isActive }) =>
                                        `flex items-center gap-2 p-3 pl-6 text-gray-700 dark:text-gray-300 font-NotoSansKhmer hover:text-white hover:bg-blue-500 dark:hover:bg-gray-700 ${isActive
                                            ? "bg-blue-500 dark:bg-blue-500 text-white"
                                            : ""
                                        }`
                                    }
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                                    </svg>
                                    <p className="font-bold font-NotoSansKhmer">បញ្ជីផលិតផល</p>
                                </NavLink>
                                <NavLink
                                    to="/"
                                    className={({ isActive }) =>
                                        `flex items-center gap-2 p-3 pl-6 text-gray-700 dark:text-gray-300 font-NotoSansKhmer hover:text-white hover:bg-blue-500 dark:hover:bg-gray-700 ${isActive
                                            ? "bg-blue-500 dark:bg-blue-500 text-white"
                                            : ""
                                        }`
                                    }
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                                    </svg>
                                    <p className="font-bold font-NotoSansKhmer">បញ្ជីផលិតផល</p>
                                </NavLink>
                                <NavLink
                                    to="/"
                                    className={({ isActive }) =>
                                        `flex items-center gap-2 p-3 pl-6 text-gray-700 dark:text-gray-300 font-NotoSansKhmer hover:text-white hover:bg-blue-500 dark:hover:bg-gray-700 ${isActive
                                            ? "bg-blue-500 dark:bg-blue-500 text-white"
                                            : ""
                                        }`
                                    }
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                                    </svg>
                                    <p className="font-bold font-NotoSansKhmer">បញ្ជីផលិតផល</p>
                                </NavLink>
                            </div>
                        </li>
                    </ul>
                </div>
            </aside>
        </div>
    );
}

export default Navbar;
