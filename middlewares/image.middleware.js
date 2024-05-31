const multer = require('mime-types');

const validateImage = (req, res, next) => {
  if (!req.file) {
    return res.status(400).send("Error: No image uploaded");
  }

  const mimeType = req.file.mimetype.split('/')[0]
  if(mimeType != 'image'){
    return res.status(400).send("Error: Invalid file type. Only images allowed.");
  }
  next();
};

module.exports = validateImage;
