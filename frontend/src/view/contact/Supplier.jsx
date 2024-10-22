import React, { useState } from 'react';
import Navbar from '../../component/Navbar';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import { RiContactsBook3Fill } from "react-icons/ri";
import SupplierList from '../../component/contract/SupplierList';
import SupplierInfo from '../../component/contract/SupplierInfo';


const Customer = () => {
    const [activeTabIndex, setActiveTabIndex] = useState(0);
    const categories = [
        {
            name: 'បញ្ជីឈ្មោះអ្នកផ្គត់ភ្កង់',
        },
        {
            name: 'ព័ត៍មានរបស់អ្នកផ្គត់ភ្កង់',
        },
    ];

    return (
        <div>
            <Navbar />
            <div className='py-16 px-2 md:ml-64 bg-white dark:bg-gray-950'>
                <div className="p-4 bg-white dark:border-gray-700 mt-5 ">
                    <div className='flex items-center gap-2 pb-5'>
                        <RiContactsBook3Fill className='text-lg' />
                        <p className='font-NotoSansKhmer font-bold text-lg'>អ្នកផ្គត់ភ្កង់</p>
                    </div>
                    <div className="w-full">
                        <TabGroup selectedIndex={activeTabIndex} onChange={setActiveTabIndex}>
                            <TabList className="flex">
                                {categories.map(({ name }, index) => (
                                    <Tab
                                        key={name}
                                        className={` py-3 px-4 text-sm text-black font-NotoSansKhmer font-bold ${activeTabIndex === index ? 'border-[2px] border-blue-500' : 'border-2'} focus:outline-none`}
                                    >
                                        {name}
                                    </Tab>
                                ))}
                            </TabList>

                            <TabPanels className="mt-3">
                                <TabPanel className="p-4 border">
                                    <SupplierList />
                                </TabPanel>
                                <TabPanel className="p-4 border">
                                    <SupplierInfo />
                                </TabPanel>
                            </TabPanels>
                        </TabGroup>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Customer;
