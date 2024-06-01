const fs = require('fs');

class ImageUtil {
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