const express = require('express');
const router = express.Router();
const { PurchaseDetailAll,OrderDetailAll,OrderReturn,PurchaseSale,SumTotalSale_Dolla_INYear,CostPrice,CountProduct,Sum_PurchaseDetail,StockProduct,SaleProduct_Dolla_InDay,SumTotalSale_USD_KHR_THB_inMonth,CountProductQTYSale,CountCustomer,OrderSum,Check_NoteQTY} = require('../controller/invoice.cotroller');

router.get('/purchase', PurchaseDetailAll); // // sum purchase Detail 



router.get('/sum_purchase', Sum_PurchaseDetail);  ///// // // sum purchase Detail in one year


router.get('/orderdetail', OrderDetailAll);  /////  useing purchase_detail
router.get('/orderreturn', OrderReturn);  /////  useing purchase_detail


// router.get('/sale', PurchaseSale);    /////  count  order_detail (USD,KHR,THB)

// router.get('/saleday', SaleProduct_Dolla_InDay);  // chart sale in day (USD)

// router.get('/cost', CostPrice);    /////  sum cost 
// router.get('/countproduct', CountProduct);   /////  count product name
// router.get('/sumtotal_sale', SumTotalSale_Dolla_INYear);   /////  count  order_detail (USD,KHR,THB)
// router.get('/sumtotal_usd_khr_thb', SumTotalSale_USD_KHR_THB_inMonth);   /////  count  order_detail (USD,KHR,THB)
// router.get('/countProduct_qty_sale', CountProductQTYSale);   /////  count  product qty sale  in day
// router.get('/count_customer', CountCustomer);   /////  count  Count Customer
// router.get('/sum_order', OrderSum);   /////  count  Count Customer
// router.get('/stock_product', StockProduct); //// check stock in table product stock_in and stock_out
// router.get('/check_notQTY',Check_NoteQTY ); //// check MG_stock qty <= not-qty


module.exports = router;