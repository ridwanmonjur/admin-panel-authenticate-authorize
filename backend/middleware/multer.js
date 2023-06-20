const multer = require("multer");

const storage = multer.diskStorage({
  destination:
    function (req,
      file,
      cb) {
      console.log({ body: req.body, file })
      if ('type' in req.body)
        cb(null, `./assets/${req.body.type}`);
      else
        cb(null, `./assets/uploads`);

    },
  filename:
    function (_req,
      file,
      cb) {
      cb(null, new Date().toISOString().replace(/:/g, "-") + "multerCustomImage" + file.originalname);
    }
});

const fileFilter = (_req,
  file,
  cb) => {
  console.log({ file, body: _req.body })
  const whitelist = [
    'image/png',
    'image/jpeg',
    'image/jpg',
    'image/webp'
  ]
  const isWhiteList = whitelist.includes(file.mimetype)
  console.log({ isWhiteList })
  cb(null, true);

};

const uploadMulter = multer({
  storage: storage,
  /* limits: {
    fileSize: 1024 * 1024,
  }, */
  fileFilter: fileFilter,
});

module.exports = uploadMulter;
