const fs = require('fs');
const Apikey = require('../services/apikey.service');
const ImageService = require('../services/image.service');
const ImageUtil = require('../utils/image.util')

class UploadController{

    // Uploading an Image with API key
    async imageUpload(req, res){
        const image = req.file;

        // Extract API key from Header
        req.apiKey = req.headers['x-api-key']; 
        const userApikey = req.apiKey

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

            // Read the Image file to convert to Base64 String
            const filePath = image.path;
            fs.readFile(filePath, async (err, data) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: `Error reading uploaded file: ${err}`
                    });
                }
          
                // Convert to Base64 String
                const imageData = data.toString('base64');

                // Store Image as Base64 String
                const newImage = await ImageService.storeImage(userId, imageData, filename, size);

                // Delete Image
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

    // View all uploaded image for a user
    async viewAllImages(req, res){
        try{
            // Extract API key from Header
            req.apiKey = req.headers['x-api-key']; 
            const userApikey = req.apiKey

            if(!userApikey){
                return res.status(400).json({
                    success: false,
                    message: "No ApiKey found"
                })
            }

            const existingApikey = await Apikey.findApikey(userApikey);

            if(!existingApikey){
                return res.status(400).json({
                    success: false,
                    message: "Incorrect API key"
                })
            }

            // Find Images uploaded by User with The API key
            const userId = existingApikey.userId;
            const images = ImageService.findImages(userId);

            return res.status(200).json({
                success: true,
                message: "Successful!",
                data: images
            })

        }catch(error){
            return res.status(200).json({
                success: false,
                message: `Failed: ${error}` 
            })
        }

    }

    // Viewing a specific image
    async viewImage(req, res){
        // Extract API key from Header
        req.apiKey = req.headers['x-api-key']; 
        const userApikey = req.apiKey

        if(!userApikey){
            return res.status(400).json({
                success: false,
                message: "No ApiKey found"
            })
        }
        
        const imageId = req.params.id

        if(!imageId){
            return res.status(400).json({
                success: false,
                message: "No image ID found"
            })
        }

        try{
            // Finding the Image
            const existingImage = await ImageService.findImage(imageId);
            if(!existingImage){
                return res.status(400).json({
                    success: false,
                    message: "Image with this ID doesn't exist"
                })
            }

            return res.status(200).json({
                success: true,
                message: "Successful",
                data: existingImage
            })
        }catch(error){
            return res.status(400).json({
                success: false,
                message: `Failed: ${error}`,
            })
        }
    }

    // Delete an Image
    async deleteImage(req, res){
        req.apiKey = req.headers['x-api-key']; 
        const userApikey = req.apiKey

        if(!userApikey){
            return res.status(400).json({
                success: false,
                message: "No ApiKey found"
            })
        }
        
        const imageId = req.params.id

        if(!imageId){
            return res.status(400).json({
                success: false,
                message: "No image ID found"
            })
        }

        try{
            const existingImage = await ImageService.deleteImage(imageId);
            if(!existingImage){
                return res.status(400).json({
                    success: false,
                    message: "Image with this ID doesn't exist"
                })
            }

            return res.status(200).json({
                success: true,
                message: "Deleted successfully"
            })
        }catch(error){
            return res.status(400).json({
                success: false,
                message: `Failed: ${error}`,
            });
        }

    }

}

module.exports = new UploadController;