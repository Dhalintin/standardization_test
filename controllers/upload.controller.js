const fs = require('fs');
const Apikey = require('../services/apikey.service');
const ImageService = require('../services/image.service');
const ImageUtil = require('../utils/image.util')

class UploadController{

    async imageUpload(req, res){
        const image = req.file;
        const userApikey = req.headers.authorization?.split(' ')[1];

        try{
            const existingApikey = await Apikey.findApikey(userApikey);
            if(!existingApikey){
                return res.status(400).json({
                    success: false,
                    message: "Incorrect API key"
                })
            }

            const userId = existingApikey.userId;
            const { filename, size } = image;

            const filePath = image.path;
            fs.readFile(filePath, async (err, data) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: `Error reading uploaded file: ${err}`
                    });
                }
          
                const imageData = data.toString('base64');

                const newImage = await ImageService.storeImage(userId, imageData, filename, size);

                const isDeleted = ImageUtil.deleteImage(filePath);

                if(!isDeleted){
                    res.status(200).json({
                        success: true,
                        message: "Image uploaded successfully! But not deleted",
                        data: newImage
                    })
                }

                return res.status(200).json({
                    success: true,
                    message: "Image uploaded successfully!",
                    data: newImage
                })

              });

        }catch(error){
            return res.status(400).json({
                success: false,
                message: error.message
            })
        }
    }

}

module.exports = new UploadController;