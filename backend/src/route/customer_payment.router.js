const express = require('express');
const router = express.Router();

const {CreatecustomerPay,UpdateCustomerPay,DeleteCustomerPay} = require('../controller/customeer_payment.controller');


// router.get('/invoice', GetInvoice);///  useing get invoice save cart
router.post('/', CreatecustomerPay);///  useing page customer pay maney
router.put('/', UpdateCustomerPay);///  useing page customer pay maney
router.delete('/', DeleteCustomerPay);///  


module.exports = router;