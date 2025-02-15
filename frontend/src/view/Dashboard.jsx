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
import SumOrderAll from './Dashbord/SumOrderAll'
import Check_StockIN_StockOUT_Product from './Dashbord/Check_StockIN_StockOUT_Product'

const Dashboard = () => {
  return (
    <div className=''>
      <Navbar />
      <div className='Nav_bar'>
        <div className='p-2 Div_bar md:p-4'>
          <div>
            < CountItems />
          </div>
          <div className=''>
            <div className='grid grid-cols-1 p-6 mb-3 bg-white border-t-2 border-blue-600 shadow-sm xl:grid-cols-2'>
              <div className='flex items-center justify-center md:border-r-2'>
                <CountProduct_QTY_Sale />

              </div>
              <div className='flex items-center justify-center '>
                <ProductPurchase />
              </div>
            </div>
            <div className='flex items-center col-span-1 p-6 border-t-2 border-yellow-600 bg-slate-50'>
              <ChartPruchaeseDetail_InMonth />
            </div>
            <div className='grid grid-cols-1 gap-4 my-4 xl:grid-cols-2'>
              <div className='flex items-center col-span-1 p-6 border-t-2 border-yellow-600 bg-slate-50'>
                <SaleproductInDayDolla />

              </div>
              <div className='flex items-center col-span-1 p-6 border-t-2 border-green-600 shadow-sm bg-slate-50'>
                <SaleProductSumDay />
              </div>
            </div>

            <div className='flex items-center col-span-1 p-6 border-t-2 border-pink-600 bg-slate-50'>
              <SaleProductExchang />
            </div>
            <div className='flex items-center col-span-1 p-6 my-4 border-t-2 border-green-600 shadow-sm bg-slate-50'>
              <ChartPruchaeseDetail />
            </div>
            <div className='flex items-center col-span-1 p-6 border-t-2 border-pink-600 bg-slate-50'>
              <SumOrderAll />
            </div>
            <div className='flex items-center col-span-1 p-6 border-t-2 border-pink-600 bg-slate-50'>
              <Check_StockIN_StockOUT_Product />
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

export default Dashboard;

