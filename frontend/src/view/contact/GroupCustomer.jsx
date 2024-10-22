import React from 'react'
import Navbar from '../../component/Navbar'
import CustomerGroup from '../../component/contract/CustomerGroup'

function Cost() {
    return (
        <div className=''>
            <Navbar />
            <div className='py-16 px-4 md:ml-64 bg-white dark:bg-gray-950'>
                <div className='border-gray-300 border-2 p-4 dark:border-gray-700'>
                    <CustomerGroup />
                </div>
            </div>
        </div>
    )
}

export default Cost