const express = require('express');
const { CreatePurchase} = require('../controller/puchase.controller');
const router = express.Router();

router.post('/', CreatePurchase);

module.exports = router;