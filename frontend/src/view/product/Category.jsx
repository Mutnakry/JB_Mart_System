import React from 'react'
import Navbar from '../../component/Navbar'
import CategoryConponent from '../../component/product/Category'

function Category() {
    return (
        <div>
            <Navbar />
            <div className='py-12 px-6 ml-64 md:w-auto w-[860px] bg-gray-100 dark:bg-gray-950'>
                <div className="w-full p-4 mt-7 bg-white dark:border-gray-700 animate-fade-up animate-duration-2000 animate-ease-in-out ">
                    <CategoryConponent />
                </div>
            </div>
        </div>
    )
}

export default Category

