const express = require("express");
const cloudinary = require("../config/cloudinary");

const {
  uploadToCloudinary,
} = require("../services/cloudinaryService");

const {
  uploadImage,
  uploadVideo,
} = require("../middleware/upload");

const router = express.Router();

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


// Test image upload
router.post(
  "/test-image",
  uploadImage.single("image"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          message: "No image uploaded",
        });
      }

      const result = await uploadToCloudinary(
        req.file.buffer,
        {
          assetFolder: "conx-orbit/test",
          resourceType: "image",
        }
      );

      res.status(200).json({
        message: "Image uploaded successfully",
        media: {
          url: result.secure_url,
          publicId: result.public_id,
        },
      });

    } catch (error) {
      console.error("Image upload error:", error);

      res.status(500).json({
        message: "Image upload failed",
        error: error.message,
      });
    }
  }
);


// Test video upload
router.post(
  "/test-video",
  uploadVideo.single("video"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          message: "No video uploaded",
        });
      }

      const result = await uploadToCloudinary(
        req.file.buffer,
        {
          folder: "conx-orbit/test",
          resourceType: "video",
        }
      );

      res.status(200).json({
        message: "Video uploaded successfully",
        media: {
          url: result.secure_url,
          publicId: result.public_id,
        },
      });

    } catch (error) {
      console.error("Video upload error:", error);

      res.status(500).json({
        message: "Video upload failed",
        error: error.message,
      });
    }
  }
);


module.exports = router;