import React from 'react'
import Navbar from '../../component/Navbar'
import CostTypeConponent from '../../component/const/CostType'

function Cost() {
    return (
        <div>
            <Navbar />
            <div className='py-16 px-2 md:ml-64 bg-white dark:bg-gray-950'>
                <CostTypeConponent />
            </div>
        </div>
    )
}

export default Cost

