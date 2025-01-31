import React from 'react'
import Navbar from '../../component/Navbar'
import PamentList from '../../component/pamentType/PamentList'

function PaymentType() {
    return (
        <div>
            <Navbar />
            <div className='py-16 px-2 ml-64 md:w-auto w-[860px] bg-white dark:bg-gray-950'>
                <PamentList />
            </div>
        </div>
    )
}

export default PaymentType