import React from 'react';
import Navbar from '../component/Navbar';
import ChartPruchaeseDetail from './Dashbord/ChartPruchaeseDetail'
import ProductPurchase from './Dashbord/ProductPurchase'
import ChartPruchaeseDetail_InMonth from './Dashbord/ChartPruchaeseDetail_InMonth'
import SaleproductInDay from './Dashbord/SaleproductInDay'
import CountItems from './Dashbord/CountItems';

const Dashboard = () => {
  return (
    <div className=''>
      <Navbar />
      <div className='pt-16 ml-64 md:w-auto w-[860px] bg-gray-200 h-auto dark:bg-gray-950'>
        <div className=' border-gray-200 rounded-lg dark:border-gray-700'>
          <div class="">
           < CountItems/>
          </div>
          <div className='p-4'>
            <div className='grid xl:grid-cols-2 grid-cols-1 p-6 rounded-xl shadow-sm bg-slate-50 m-4 border-t-4 border-blue-600'>
              <div className='md:border-r-2 flex items-center justify-center'>
                <ChartPruchaeseDetail />
              </div>
              <div className=' flex items-center justify-center'>
                <ProductPurchase />
              </div>
            </div>
            <div className='col-span-4 items-center flex p-6 rounded-xl shadow-sm bg-slate-50 m-4 border-t-4 border-yellow-600'>
              <ChartPruchaeseDetail_InMonth />
            </div>
            <div className='col-span-4 items-center flex p-6 rounded-xl shadow-sm bg-slate-50 m-4 border-t-4 border-green-600'>
              <SaleproductInDay />
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

export default Dashboard;
