const express = require('express');
const router = express.Router();

const { CreatePurchase,GetAllPuchase,UpdatePurchase,GetPurchaseUpdateByID,GetSingle,UpdatePurchaseStatus,GetAllPuchaseDetail,GetSinglePuchase} = require('../controller/puchase.controller');


router.post('/', CreatePurchase);
router.get('/', GetAllPuchase);
router.get('/purchasedetail', GetAllPuchaseDetail);
router.put('/:id', UpdatePurchase);
router.put('/status/:id', UpdatePurchaseStatus);
router.get('/:id', GetSingle);
router.get('/purchaseid/:id', GetPurchaseUpdateByID);

router.get('/puchase/:id', GetSinglePuchase);



module.exports = router;