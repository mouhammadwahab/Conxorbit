const mongoose = require("mongoose");
const Solution = require("../models/Solution");
const { uploadToCloudinary } = require("../services/cloudinaryService");

const createSolution = async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ message: "MongoDB is not connected" });
    }

    let mockup;

    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer, {
        folder: "conx-orbit/solutions",
        resourceType: "image",
      });

      mockup = {
        url: result.secure_url,
        publicId: result.public_id,
      };
    }

    const payload = {
      ...req.body,
      ...(mockup ? { mockup } : {}),
    };

    const solution = await Solution.create(payload);
    return res.status(201).json(solution);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to create solution" });
  }
};

module.exports = {
  createSolution,
};
