import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// connect to MongoDB
connectDB();

// routes
app.use("/api/auth", authRoutes);

// Serve frontend from 'client/dist'
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const frontendPath = path.join(__dirname, "../client/dist");

app.use(express.static(frontendPath));

// Catch-all: send index.html for any unknown routes
app.get("*", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

//start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
