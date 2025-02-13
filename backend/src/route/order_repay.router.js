const express = require('express');
const router = express.Router();
const { GetAllOrder,GetOrder} = require('../controller/order_repay.controller');
router.get('/:id', GetAllOrder);
router.get('/', GetOrder);


module.exports = router;