const cloudinary = require("../config/cloudinary");

const uploadToCloudinary = (fileBuffer, options = {}) => {
  return new Promise((resolve, reject) => {
    const timeoutMs = Number(options.timeoutMs || 30000);
    let settled = false;

    const timer = setTimeout(() => {
      if (settled) return;
      settled = true;
      reject(
        new Error(`Cloudinary upload timed out after ${timeoutMs}ms`)
      );
    }, timeoutMs);

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: options.folder || options.assetFolder || "Conx-orbit",
        resource_type: options.resourceType || "image",
      },
      (error, result) => {
        if (settled) return;

        settled = true;
        clearTimeout(timer);

        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );

    uploadStream.on("error", (error) => {
      if (settled) return;

      settled = true;
      clearTimeout(timer);
      reject(error);
    });

    uploadStream.end(fileBuffer);
  });
};

const deleteFromCloudinary = async (
  publicId,
  resourceType = "image"
) => {
  if (!publicId) return;

  return await cloudinary.uploader.destroy(publicId, {
    resource_type: resourceType,
  });
};

module.exports = {
  uploadToCloudinary,
  deleteFromCloudinary,
};