import express from "express";
import multer from "multer";
import pool from "../config/db.js";
import path from "path";

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
    const [result] = await pool.query(
      "INSERT INTO applications (name, email, phone, course, education, resume) VALUES (?, ?, ?, ?, ?, ?)",
      [name, email, phone, course, education, resume]
    );
    res.json({ success: true, id: result.insertId });
  } catch (err) {
    console.error("Error saving application:", err);
    res.status(500).json({ success: false, error: "Database error" });
  }
});

export default router;
