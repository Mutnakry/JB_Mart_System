import React from 'react'
import Navbar from '../../component/Navbar'
import BrandsConponent from '../../component/product/Brands'

function Brands() {
    return (
        <div>
            <Navbar />
            <div className='py-16 px-2 md:ml-64 bg-white dark:bg-gray-950'>
                <BrandsConponent />
            </div>
        </div>
    )
}

export default Brands

