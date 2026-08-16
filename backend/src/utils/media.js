const { uploadToCloudinary, deleteFromCloudinary } = require("../services/cloudinaryService");

function asMedia(value) {
  if (!value || typeof value !== "object") return { url: "", publicId: "" };
  return {
    url: String(value.url || ""),
    publicId: String(value.publicId || ""),
  };
}

/**
 * Upload a buffer to Cloudinary and return { url, publicId }.
 * Optionally delete the previous asset when publicId changes.
 */
async function replaceMedia({
  fileBuffer,
  folder,
  resourceType = "image",
  previousPublicId = "",
  timeoutMs,
}) {
  const result = await uploadToCloudinary(fileBuffer, {
    folder,
    resourceType,
    timeoutMs: timeoutMs || (resourceType === "video" ? 120000 : 60000),
  });

  const next = {
    url: result.secure_url,
    publicId: result.public_id,
  };

  if (previousPublicId && previousPublicId !== next.publicId) {
    try {
      await deleteFromCloudinary(previousPublicId, resourceType);
    } catch (err) {
      console.warn("Failed to delete previous Cloudinary asset:", previousPublicId, err.message);
    }
  }

  return next;
}

/**
 * If client sent a new media object with a different publicId, delete the old one.
 * Empty next media clears and deletes the previous asset.
 */
async function syncReplacedMedia(previous, next, resourceType = "image") {
  const prev = asMedia(previous);
  const nxt = asMedia(next);
  if (!nxt.url && !nxt.publicId) {
    return clearMedia(prev, resourceType);
  }
  if (prev.publicId && prev.publicId !== nxt.publicId) {
    try {
      await deleteFromCloudinary(prev.publicId, resourceType);
    } catch (err) {
      console.warn("Failed to delete previous Cloudinary asset:", prev.publicId, err.message);
    }
  }
  return nxt;
}

async function clearMedia(previous, resourceType = "image") {
  const prev = asMedia(previous);
  if (prev.publicId) {
    try {
      await deleteFromCloudinary(prev.publicId, resourceType);
    } catch (err) {
      console.warn("Failed to delete Cloudinary asset:", prev.publicId, err.message);
    }
  }
  return { url: "", publicId: "" };
}

module.exports = {
  asMedia,
  replaceMedia,
  syncReplacedMedia,
  clearMedia,
};
