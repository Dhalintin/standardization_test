const fs = require('fs');

class ImageUtil {
    // async processImage(file) {
    //     const filePath = file.path;
      
    //     try {
    //       const data = await fs.readFile(filePath);
    //       const base64String = data.toString('base64');
    //       return base64String; // Return the base64String for use in the service file
    //     } catch (err) {
    //       console.error("Error reading uploaded file:", err);
    //       throw err; // Or handle the error differently if needed (e.g., return a rejection)
    //     }
    //   }

      async deleteImage(filePath){
        fs.unlink(filePath, (err) => {
          if (err) {
            return false
          } else {
            return true
          }
        });
      }

}

module.exports = new ImageUtil();