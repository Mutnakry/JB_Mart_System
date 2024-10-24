const express = require('express');
const multer = require('multer');
const path = require('path');

const router = express.Router();
const { Createproduct,Updateproduct,GetSingle,Deleteproduct ,GetAllProduct} = require('../controller/product.controller');

// Set up storage engine for multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      // cb(null, '../public/image');
      cb(null, path.join(__dirname, '../public/image')); // Corrected path
  
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}_${file.originalname}`);
    }
  });
  // Check file type
  function checkFileType(file, cb) {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
  
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb('Error: Images Only!');
    }
  }
  
  // Initialize upload
  const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
      checkFileType(file, cb);
    }
  });

router.get('/', GetAllProduct);
router.post('/', upload.single('file'), Createproduct);
router.put('/:id', upload.single('file'), Updateproduct);
router.get('/:id', GetSingle);
router.delete('/:id', Deleteproduct);

module.exports = router;