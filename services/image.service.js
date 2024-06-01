const Image = require('../models/image.model.js');

class ImageService{
    async storeImage(userId, imageData, filename, size){
        const newImage = new Image({ userId, imageData, filename, size });
        await newImage.save();
        return newImage;
    }

    async findImages(userId){
        const images = await Image.find({ userId })
        return images
    }

    async findImage(imageId){
        const image = await Image.findOne({ _id: imageId })
        return image
    }

    async deleteImage(imageId){
        const image = await Image.findByIdAndDelete({ _id: imageId})
        return image
    }
}

module.exports = new ImageService