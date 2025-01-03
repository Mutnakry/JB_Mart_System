
import React, { useState } from 'react';
import Navbar from '../../component/Navbar';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import { RiContactsBook3Fill } from "react-icons/ri";
import AccoutList from '../../component/acount/AccountList';
import AccoutType from '../../component/acount/AcountType';
import Transfer_Monry from '../../component/acount/Transfer_money';


const Account = () => {
    const [activeTabIndex, setActiveTabIndex] = useState(0);
    const categories = [
        {
            name: 'បញ្ជីឈ្មោះគណនី',
        },
        {
            name: 'ប្រភេទគណនី',
        },
        {
            name: 'ព័ត៍មានរបស់គណនី',
        },
    ];

    return (
        <div>
            <Navbar />
            <div className='py-12 px-6 md:ml-64 bg-gray-100 dark:bg-gray-950'>
                <div className="w-full p-4 mt-7 bg-white dark:border-gray-700 animate-fade-up animate-duration-2000 animate-ease-in-out ">

                <div className="p-4 bg-white dark:border-gray-700 mt-5 ">
                    <div className='flex items-center gap-2 pb-5'>
                        <RiContactsBook3Fill className='text-lg' />
                        <p className='font-NotoSansKhmer font-bold text-lg'>អតិជន</p>
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
                                    <AccoutList />
                                </TabPanel>
                                <TabPanel className="p-4 border">
                                    <AccoutType />
                                </TabPanel>
                                <TabPanel className="p-4 border border-gray-300 rounded-md">
                                    <Transfer_Monry />
                                </TabPanel>
                            </TabPanels>
                        </TabGroup>
                    </div>
                </div>
                </div>
            </div>
        </div>
    );
};

export default Account;
