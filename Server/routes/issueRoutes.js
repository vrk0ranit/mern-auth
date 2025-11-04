// routes/issueRoutes.js
import express from "express";
import { protect, adminOnly } from "../middleware/authMiddleware.js";
import { upload } from "../middleware/upload.js";
import {
  createIssue,
  getMyIssues,
  getAllIssues,
  updateIssueStatus,
  deleteIssue,
} from "../controllers/issueController.js";

const router = express.Router();

router.post("/", protect, upload.single("image"), createIssue);
router.get("/my", protect, getMyIssues);
router.get("/", protect, adminOnly, getAllIssues);
router.put("/:id/status", protect, adminOnly, updateIssueStatus);
router.delete("/:id", protect, adminOnly, deleteIssue);

export default router;
