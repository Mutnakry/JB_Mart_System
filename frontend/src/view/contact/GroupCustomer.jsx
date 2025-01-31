import React from 'react'
import Navbar from '../../component/Navbar'
import CustomerGroup from '../../component/contract/CustomerGroup'

function Cost() {
    return (
        <div className=''>
            <Navbar />
            <div className='py-12 px-6 md:ml-64 bg-gray-100 dark:bg-gray-950'>
                <div className="w-full p-4 mt-7 bg-white dark:border-gray-700 animate-fade-up animate-duration-2000 animate-ease-in-out ">

                    <CustomerGroup />
                </div>
            </div>
        </div>
    )
}

export default Cost