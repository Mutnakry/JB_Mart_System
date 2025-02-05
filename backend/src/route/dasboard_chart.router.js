const express = require('express');
const router = express.Router();
const { PurchaseDetailAll,PurchaseProduct,PurchaseSale,PurchaseSaleInDay,CostPrice,CountProduct} = require('../controller/dashboard_chart.controller');

router.get('/puchasedetail', PurchaseDetailAll);  /////  useing purchase_detail

router.get('/product', PurchaseProduct);  /////  useing purchase_detail
router.get('/sale', PurchaseSale);   // chart sale in year
router.get('/saleday', PurchaseSaleInDay);  // chart sale in day 
router.get('/cost', CostPrice);    /////  sum cost 
router.get('/countproduct', CountProduct);   /////  count product name

module.exports = router;