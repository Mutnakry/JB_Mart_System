
import React, { useState } from 'react';
import Navbar from '../../component/Navbar';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import { RiContactsBook3Fill } from "react-icons/ri";
import PuchaseList from '../../component/purchase/PuchaseList';
import ProductInfo from '../../component/product/ProductInfo';
import Test from '../../component/purchase/Test';


const Purchase = () => {
    const [activeTabIndex, setActiveTabIndex] = useState(0);
    const categories = [
        {
            name: ' ផលិតផលទាំងអស់',
        },
        {
            name: 'បញ្ចូលផលិតផល',
        },
        {
            name: 'ព័ត៍មានរបាយការណ៍ស្តុក',
        },
    ];

    return (
        <div>
            <Navbar />
            <div className='py-12 px-2 md:ml-64 bg-white dark:bg-gray-950'>
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
                                    <Test />
                                </TabPanel>
                                <TabPanel className="p-4 border">
                                    <ProductInfo />
                                </TabPanel>
                                <TabPanel className="p-4 border border-gray-300 rounded-md">
                                    <ProductInfo />
                                </TabPanel>
                            </TabPanels>
                        </TabGroup>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Purchase