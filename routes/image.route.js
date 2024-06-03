const express = require('express');
const router = express.Router();
const controller = require('../controllers/upload.controller');
const multer = require('multer');
const imageValidator = require('../middlewares/image.middleware');

const upload = multer({ 
    dest: 'uploads/'
});

//Uploading an image
router.post('/upload', upload.single('image'), imageValidator, controller.imageUpload);

// View all uploaded images by a specific user
router.get('/view-images', controller.viewAllImages);

// View a specific Image
router.get('/view-image/:id', controller.viewImage);

// Deleting an imgage
router.delete('/delete/:id', controller.deleteImage);


module.exports = router;