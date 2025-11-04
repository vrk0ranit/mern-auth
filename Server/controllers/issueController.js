import Issue from "../models/Issue.js";

// controllers/issueController.js
export const createIssue = async (req, res) => {
  try {
    console.log("📥 Incoming Issue Report");
    console.log("🧾 Body:", req.body);
    console.log("📸 File Info:", req.file);

    const { title, description, category, latitude, longitude } = req.body;
    const image = req.file ? req.file.path : "";

    if (!title || !description || !latitude || !longitude) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const issue = await Issue.create({
      title,
      description,
      category,
      latitude,
      longitude,
      image,
      createdBy: req.user.id,
    });

    console.log("✅ Issue created successfully:", issue._id);
    res.status(201).json({
      success: true,
      message: "Issue reported successfully",
      data: issue,
    });
  } catch (err) {
    console.error("❌ Error creating issue:", err);
    res.status(500).json({ success: false, message: "Server Error", error: err.message });
  }
};

// ✅ Get issues created by logged-in user
export const getMyIssues = async (req, res) => {
  try {
    const issues = await Issue.find({ createdBy: req.user.id }).sort({ createdAt: -1 });
    res.json({ success: true, data: issues });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// ✅ Get all issues (admin only)
export const getAllIssues = async (req, res) => {
  try {
    const issues = await Issue.find().populate("createdBy", "name email").sort({ createdAt: -1 });
    res.json({ success: true, data: issues });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// ✅ Update issue status (admin)
export const updateIssueStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const issue = await Issue.findById(id);
    if (!issue) return res.status(404).json({ success: false, message: "Issue not found" });

    issue.status = status || issue.status;
    await issue.save();

    res.json({ success: true, message: "Status updated", data: issue });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// ✅ Delete issue (admin)
export const deleteIssue = async (req, res) => {
  try {
    const { id } = req.params;
    const issue = await Issue.findById(id);
    if (!issue) return res.status(404).json({ success: false, message: "Issue not found" });

    await issue.deleteOne();
    res.json({ success: true, message: "Issue deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
