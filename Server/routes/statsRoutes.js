import express from "express";
import Issue from "../models/Issue.js";
import User from "../models/User.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalIssues = await Issue.countDocuments();
    const resolvedIssues = await Issue.countDocuments({ status: "Resolved" });
    const inProgressIssues = await Issue.countDocuments({ status: "In Progress" });

    res.json({
      success: true,
      data: {
        totalUsers,
        totalIssues,
        resolvedIssues,
        inProgressIssues,
        pendingIssues: totalIssues - (resolvedIssues + inProgressIssues),
      },
    });
  } catch (err) {
    console.error("Stats error:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

export default router;
