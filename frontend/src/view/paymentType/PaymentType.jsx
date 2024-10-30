import React from 'react'
import Navbar from '../../component/Navbar'
import PamentList from '../../component/pamentType/PamentList'

function PaymentType() {
    return (
        <div>
            <Navbar />
            <div className='py-16 px-2 md:ml-64 bg-white dark:bg-gray-950'>
                <PamentList />
            </div>
        </div>
    )
}

export default PaymentType