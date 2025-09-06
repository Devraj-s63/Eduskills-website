import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import Application from "../models/Application.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

// Ensure uploads folder exists
const uploadsDir = path.join(path.resolve(), "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Multer setup for resume upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({ storage });

// POST /applications - save application + send email to user
router.post("/", upload.single("resume"), async (req, res) => {
  try {
    const { name, email, phone, course, education } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: "Name and Email are required" });
    }

    const resume = req.file ? req.file.filename : null;

    // Save to database
    const application = new Application({
      name,
      email,
      phone,
      course,
      education,
      resume,
    });
    await application.save();

    // Send confirmation email to user
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    let resumeInfo = resume
      ? `\nYou uploaded your resume: ${req.protocol}://${req.get("host")}/uploads/${resume}`
      : "";

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email, // sending to the user's email
      subject: `Your Application for ${course} was Received`,
      text: `Hi ${name},\n\nThank you for applying for ${course}.\nWe have received your application successfully.${resumeInfo}\n\nBest regards,\nYour Team`,
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json({ success: true, application });
  } catch (err) {
    console.error("❌ Error saving application or sending email:", err);
    res.status(500).json({ error: "Internal Server Error", message: err.message });
  }
});

export default router;
