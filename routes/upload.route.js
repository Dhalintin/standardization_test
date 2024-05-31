const express = require('express');
const router = express.Router();
const controller = require('../controllers/upload.controller');
const multer = require('multer');
const imageValidator = require('../middlewares/image.middleware');

const upload = multer({ 
    dest: 'uploads/'
});

router.post('/image', upload.single('image'), imageValidator, controller.imageUpload);


module.exports = router;