// import multer to help with file storage
const multer = require('multer');

// store files in ./uploads
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

// allow jpeg and png files
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

// multer upload class
const multerupload = multer({
  storage: storage,
  fileFilter: fileFilter
});

// export class
module.exports = {
    multerupload
};