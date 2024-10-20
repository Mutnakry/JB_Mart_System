import React from 'react'
import Navbar from '../../component/Navbar'
import UnitConponent from '../../component/product/Ubit'

function Unit() {
    return (
        <div>
            <Navbar />
            <div className='py-16 px-2 md:ml-64 bg-white dark:bg-gray-950'>
                <UnitConponent />
            </div>
        </div>
    )
}

export default Unit