import React from 'react'
import Navbar from '../../component/Navbar'
import CategoryConponent from '../../component/product/Category'

function Category() {
    return (
        <div>
            <Navbar />
                       <div className='py-16 px-2 md:ml-64 bg-white dark:bg-gray-950'>
            
                <CategoryConponent />
            </div>
        </div>
    )
}

export default Category

