// routes/applicationRoutes.js
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

// 📌 POST /api/apply
router.post("/", upload.single("resume"), async (req, res) => {
  try {
    const { name, email, course } = req.body;

    // Save application to DB
    const newApplication = new Application({
      name,
      email,
      course,
      resume: req.file ? req.file.filename : null,
    });

    await newApplication.save();

    // ✅ Setup Nodemailer if creds exist
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.warn("⚠️ Email credentials not set. Skipping emails.");
    } else {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      // 1️⃣ Send email to Admin (if ADMIN_EMAIL exists)
      if (process.env.ADMIN_EMAIL) {
        try {
          await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: process.env.ADMIN_EMAIL,
            subject: "📥 New Application Submitted",
            text: `${name} applied for ${course}. Email: ${email}`,
          });
          console.log("📧 Notification sent to admin:", process.env.ADMIN_EMAIL);
        } catch (mailErr) {
          console.error("❌ Failed to send admin email:", mailErr.message);
        }
      }

      // 2️⃣ Send confirmation email to Applicant
      if (email) {
        try {
          await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "✅ Application Received",
            text: `Hello ${name},\n\nThank you for applying to ${course}. We have received your application and will get back to you soon.\n\nBest regards,\nInstitute Team`,
          });
          console.log("📧 Confirmation email sent to applicant:", email);
        } catch (mailErr) {
          console.error("❌ Failed to send applicant email:", mailErr.message);
        }
      }
    }

    res.status(201).json({ message: "Application submitted successfully" });
  } catch (err) {
    console.error("❌ Application submission error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// 📌 GET /api/apply - fetch all applications
router.get("/", async (req, res) => {
  try {
    const applications = await Application.find();
    res.json(applications);
  } catch (err) {
    console.error("❌ Error fetching applications:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
