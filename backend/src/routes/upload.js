const express = require("express");
const cloudinary = require("../config/cloudinary");
const { requireAuth } = require("../middleware/auth");
const { uploadToCloudinary } = require("../services/cloudinaryService");
const { uploadImage, uploadVideo } = require("../middleware/upload");

const router = express.Router();

router.use(requireAuth);

router.get("/test-cloudinary", async (_req, res) => {
  try {
    const result = await cloudinary.api.ping();
    return res.status(200).json({
      message: "Cloudinary connection successful",
      cloudinary: result,
    });
  } catch (error) {
    console.error("Cloudinary ping error:", error);
    return res.status(500).json({
      message: "Cloudinary connection failed",
      error: error.message,
    });
  }
});

async function handleUpload(req, res, resourceType) {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY) {
      return res.status(503).json({
        message:
          "Cloudinary is not configured. Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET in backend/.env",
      });
    }

    const folder = String(req.body.folder || `Conx-orbit/${resourceType}s`).trim();
    const result = await uploadToCloudinary(req.file.buffer, {
      folder,
      resourceType,
      timeoutMs: resourceType === "video" ? 120000 : 60000,
    });

    return res.status(200).json({
      message: `${resourceType} uploaded successfully`,
      url: result.secure_url,
      publicId: result.public_id,
      media: {
        url: result.secure_url,
        publicId: result.public_id,
        resourceType: result.resource_type,
        format: result.format,
      },
    });
  } catch (error) {
    console.error(`${resourceType} upload error:`, error);
    return res.status(500).json({
      message: `${resourceType} upload failed`,
      error: error.message,
    });
  }
}

router.post("/image", uploadImage.single("file"), (req, res) =>
  handleUpload(req, res, "image")
);

router.post("/video", uploadVideo.single("file"), (req, res) =>
  handleUpload(req, res, "video")
);

// Default POST /api/admin/upload → image (backward compatible)
router.post("/", uploadImage.single("file"), (req, res) =>
  handleUpload(req, res, "image")
);

module.exports = router;
