const express = require('express');
const router = express.Router();
const { GetAllWarranty, CreateWarranty } = require('../controller/warranty.controller');
router.get('/', GetAllWarranty); 
router.post('/', CreateWarranty);

module.exports = router;