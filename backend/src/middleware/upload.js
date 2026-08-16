const multer = require("multer");

const storage = multer.memoryStorage();

const uploadImage = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
});

const uploadVideo = multer({
  storage,
  limits: { fileSize: 100 * 1024 * 1024 },
});

module.exports = {
  upload: uploadVideo,
  uploadImage,
  uploadVideo,
};
