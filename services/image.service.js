const Image = require('../models/image.model.js');

class ImageService{

    async storeImage(userId, imageData, filename, size){
        const newImage = new Image({ userId, imageData, filename, size });
        await newImage.save();
        return newImage;
    }
}

module.exports = new ImageService