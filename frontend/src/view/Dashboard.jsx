import React from 'react';
import Navbar from '../component/Navbar';
import ChartPruchaeseDetail from './Dashbord/ChartPruchaeseDetail'
import ProductPurchase from './Dashbord/ProductPurchase'
import ChartPruchaeseDetail_InMonth from './Dashbord/ChartPruchaeseDetail_InMonth'
import SaleproductInDayDolla from './Dashbord/SaleproductInDay'
import CountItems from './Dashbord/CountItems';
import SaleProductExchang from './Dashbord/SaleProductExchang'
import SaleProductSumDay from './Dashbord/SaleProductSumDay';
import CountProduct_QTY_Sale from './Dashbord/CountProductSale'

const Dashboard = () => {
  return (
    <div className=''>
      <Navbar />
      <div className='Nav_bar'>
        <div className=' Div_bar md:p-4 p-2'>
          <div class="">
            < CountItems />
          </div>
          <div className=''>
            <div className='grid xl:grid-cols-2 grid-cols-1 p-6 shadow-sm bg-slate-50  border-t-2 border-blue-600 mb-3'>
              <div className='md:border-r-2 flex items-center justify-center'>
                <CountProduct_QTY_Sale />

              </div>
              <div className=' flex items-center justify-center'>
                <ProductPurchase />
              </div>
            </div>
            <div className='col-span-1 items-center flex p-6 bg-slate-50  border-t-2 border-yellow-600'>
              <ChartPruchaeseDetail_InMonth />
            </div>
            <div className='grid xl:grid-cols-2 grid-cols-1 gap-4 my-4'>
              <div className='col-span-1 items-center flex p-6 bg-slate-50  border-t-2 border-yellow-600'>
                <SaleproductInDayDolla />

              </div>
              <div className='col-span-1 items-center flex p-6 shadow-sm bg-slate-50  border-t-2 border-green-600'>
                <SaleProductSumDay />
              </div>
            </div>

            <div className='col-span-1 items-center flex p-6  bg-slate-50  border-t-2 border-pink-600'>
              <SaleProductExchang />
            </div>
            <div className='col-span-1 items-center flex p-6 my-4 shadow-sm bg-slate-50  border-t-2 border-green-600'>
              <ChartPruchaeseDetail />
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

export default Dashboard;

