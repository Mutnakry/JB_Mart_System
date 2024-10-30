import React from 'react';
import Cart from '../../component/pos/Cart';
import ProductCategory from '../../component/pos/ProductCategory';
import Navbar from './Navbar';

function MainForm() {
    return (
        <div>
            <div className='bg-white'>
                <Navbar />
                <div className='grid md:grid-cols-2'>
                    <div className='h-screen'>
                        <Cart />
                    </div>
                    <div>
                        <ProductCategory />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MainForm;
