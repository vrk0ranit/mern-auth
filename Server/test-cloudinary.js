import cloudinary from "./config/cloudinary.js";

cloudinary.uploader.upload("test.png", {
  folder: "civicconnect_issues"
})
.then(res => console.log("✅ Uploaded successfully:", res.secure_url))
.catch(err => console.error("❌ Upload failed:", err));
