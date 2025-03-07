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
import Check_NoteQTYProdut from './Dashbord/Check_NoteQTYProdut'  ///  check MG_stock qty <= not-qty 

const Dashboard = () => {
  return (
    <div className=''>
      <Navbar />
      <div className='h-auto overflow-hidden bg-gray-100 md:pt-16 sm:ml-64 dark:bg-gray-950'>
        <div className='p-6 m-2 md:m-4 border-slate-200 md:p-0'>
          <div>
            < CountItems />
          </div>
          <div className=''>
          {/* check MG_stock qty <= not-qty */}
            <div className='flex items-center col-span-1 p-6 my-4 bg-white border-t-2 border-green-600 shadow-sm'>
              <Check_NoteQTYProdut />
            </div>
            <div className='grid grid-cols-1 p-6 mb-3 bg-white border-t-2 border-blue-600 shadow-sm xl:grid-cols-2'>
              <div className='flex items-center justify-center md:border-r-2'>

                <ChartPruchaeseDetail />
              </div>
              <div className='flex items-center justify-center '>
                <ProductPurchase />
              </div>
            </div>
            <div className='flex items-center col-span-1 p-6 my-4 bg-white border-t-2 border-green-600 shadow-sm'>
              {/* <ChartPruchaeseDetail /> */}
              <CountProduct_QTY_Sale />
            </div>
            <div className='flex items-center col-span-1 p-6 bg-white border-t-2 border-yellow-600'>
              <ChartPruchaeseDetail_InMonth />
            </div>
            <div className='grid grid-cols-1 gap-4 my-4 xl:grid-cols-2'>
              <div className='flex items-center col-span-1 p-6 bg-white border-t-2 border-yellow-600'>
                <SaleproductInDayDolla />

              </div>
              <div className='flex items-center col-span-1 p-6 bg-white border-t-2 border-green-600 shadow-sm'>
                <SaleProductSumDay />
              </div>
            </div>

            <div className='flex items-center col-span-1 p-6 bg-white border-t-2 border-pink-600'>
              <SaleProductExchang />
            </div>

            <div className='flex items-center col-span-1 p-6 bg-white border-t-2 border-pink-600'>
              <SumOrderAll />
            </div>
            <div className='flex items-center col-span-1 p-6 mt-2 bg-white border-t-2 border-pink-600'>
              <Check_StockIN_StockOUT_Product />
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

export default Dashboard;

