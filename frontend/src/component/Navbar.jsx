import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

function Navbar() {
    // Load the initial theme from localStorage or default to "light"
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem("theme") || "light";
    });
    const [isSidebarVisible, setSidebarVisible] = useState(false); // State for sidebar visibility
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
    return (
        <div>
            <nav className="fixed top-0 z-50 w-full bg-gradient-to-r from-blue-400 to-blue-950 border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                <div className="py-3 px-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center justify-between md:space-x-10 space-x-2 rtl:justify-end">
                            <a href="#" className=" md:me-24 hidden md:block">
                                <span className="self-center text-xl text-white font-bold sm:text-2xl whitespace-nowrap dark:text-white">POS Coffee</span>
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
                                <a href="#" className='py-1 px-3 flex items-center space-x-2 hover:bg-green-500 transition duration-300 text-lg text-white font-medium bg-green-400'>
                                    <img width="24" height="24" src="https://img.icons8.com/ios-glyphs/30/menu--v1.png" alt="menu" />
                                    <span>pos</span>
                                </a>
                                <a href="#" className='py-1 px-3 flex items-center space-x-2 hover:bg-green-500 transition duration-300 text-lg text-white font-medium bg-green-400'>
                                    <img width="24" height="24" src="https://img.icons8.com/ios-filled/24/income.png" alt="income" />
                                    <span>ចំណូល</span>
                                </a>
                            </div>
                            <div className="flex items-center ms-3 md:pr-20 pr-0">
                                <div>
                                    <button type="button" className="flex text-sm shadow" aria-expanded="false" data-dropdown-toggle="dropdown-user">
                                        <span className="sr-only">Open user menu</span>
                                        <p className="text-lg text-white font-bold uppercase" role="none">
                                            {userNames}
                                        </p>
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
                                        `flex items-center p-2 rounded dark:text-white ${isActive ? 'bg-gradient-to-r from-blue-900 to-blue-600 text-white' : 'text-gray-900'} hover:bg-blue-400 space-x-3 dark:hover:bg-gray-700 group`
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
                                        `flex items-center p-2 rounded dark:text-white ${isActive ? 'bg-gradient-to-r from-blue-900 to-blue-600 text-white' : 'text-gray-900'} hover:bg-blue-400 space-x-3 dark:hover:bg-gray-700 group`
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
                    </ul>
                </div>
            </aside>
        </div>
    );
}

export default Navbar;
