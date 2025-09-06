import express from "express";
import multer from "multer";
import path from "path";
import Application from "../models/Application.js";

const router = express.Router();

// Resume upload setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({ storage });

// Save application
router.post("/", upload.single("resume"), async (req, res) => {
  const { name, email, phone, course, education } = req.body;
  const resume = req.file ? req.file.filename : null;

  try {
    const application = new Application({
      name,
      email,
      phone,
      course,
      education,
      resume,
    });

    await application.save();
    res.json({ success: true, id: application._id });
  } catch (err) {
    console.error("Error saving application:", err);
    res.status(500).json({ success: false, error: "Database error" });
  }
});

// Get all applications
router.get("/", async (req, res) => {
  try {
    const applications = await Application.find();
    res.json(applications);
  } catch (err) {
    console.error("Error fetching applications:", err);
    res.status(500).json({ success: false, error: "Database error" });
  }
});

export default router;
