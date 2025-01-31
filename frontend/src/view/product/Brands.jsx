import React from 'react'
import Navbar from '../../component/Navbar'
import BrandsConponent from '../../component/product/Brands'

function Brands() {
    return (
        <div>
            <Navbar />
            <div className='py-12 px-6 ml-64 md:w-auto w-[860px] bg-gray-100 dark:bg-gray-950'>
                <div className="w-full p-4 mt-7 bg-white dark:border-gray-700 animate-fade-up animate-duration-2000 animate-ease-in-out ">

                    <BrandsConponent />
                </div>
            </div>
        </div>
    )
}

export default Brands

