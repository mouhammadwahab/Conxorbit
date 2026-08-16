import { useRef, useState } from "react";
import { api, mediaUrl } from "../api/client";
import { useAdminAuth } from "./AdminAuth";
import styles from "./admin.module.css";

/**
 * Choose-file control: uploads to Cloudinary via the admin API and
 * returns { url, publicId } to the parent (stored in the CMS DB).
 */
export default function AdminMediaField({
  label,
  value = "",
  onUploaded,
  onClear,
  kind = "image",
  folder,
  accept,
}) {
  const { token } = useAdminAuth();
  const inputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const isVideo = kind === "video";
  const resolvedAccept = accept || (isVideo ? "video/*" : "image/*");
  const resolvedFolder = folder || (isVideo ? "Conx-orbit/videos" : "Conx-orbit/images");

  const onPick = async (event) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    setUploading(true);
    setError("");
    try {
      const result = isVideo
        ? await api.admin.uploadVideo(token, file, resolvedFolder)
        : await api.admin.uploadImage(token, file, resolvedFolder);
      onUploaded?.({
        url: result.url || result.media?.url || "",
        publicId: result.publicId || result.media?.publicId || "",
      });
    } catch (err) {
      setError(err.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className={styles.field}>
      <span>{label}</span>
      <div className={styles.mediaRow}>
        <button
          type="button"
          className={`${styles.btn} ${styles.btnSecondary}`}
          disabled={uploading}
          onClick={() => inputRef.current?.click()}
        >
          {uploading ? "Uploading…" : "Choose file"}
        </button>
        <input
          ref={inputRef}
          type="file"
          accept={resolvedAccept}
          hidden
          onChange={onPick}
        />
        {value ? (
          <button
            type="button"
            className={`${styles.btn} ${styles.btnSecondary}`}
            disabled={uploading}
            onClick={() => onClear?.()}
          >
            Clear
          </button>
        ) : null}
        {value ? (
          <span className={styles.mediaPath} title={value}>
            {value.split("/").pop()}
          </span>
        ) : (
          <span className={styles.muted}>No file selected</span>
        )}
      </div>
      {error ? <p className={styles.error}>{error}</p> : null}
      {value && !isVideo ? (
        <img src={mediaUrl(value)} alt="" className={styles.mediaPreview} />
      ) : null}
      {value && isVideo ? (
        <video src={mediaUrl(value)} className={styles.mediaPreview} controls muted />
      ) : null}
    </div>
  );
}
