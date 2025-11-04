// middleware/upload.js
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "civicconnect_issues",
    allowedFormats: ["jpg", "png", "jpeg"], // ✅ FIXED HERE
    transformation: [{ width: 1000, crop: "limit" }],
  },
});

export const upload = multer({ storage });
