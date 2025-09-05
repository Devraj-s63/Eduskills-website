const express = require("express");
const multer = require("multer");
const nodemailer = require("nodemailer");
const Application = require("../models/Application");

const router = express.Router();

// File upload config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

router.post("/", upload.single("resume"), async (req, res) => {
  const { name, email, phone, course, education } = req.body;

  try {
    const newApp = new Application({
      name,
      email,
      phone,
      course,
      education,
      resume: req.file ? req.file.filename : null,
    });
    await newApp.save();

    // Send mail to admin
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.ADMIN_EMAIL,
        pass: process.env.ADMIN_PASS,
      },
    });

    await transporter.sendMail({
      from: email,
      to: process.env.ADMIN_EMAIL,
      subject: "New Application Received",
      text: `
        Name: ${name}
        Email: ${email}
        Phone: ${phone}
        Course: ${course}
        Education: ${education}
      `,
      attachments: req.file ? [{ path: req.file.path }] : [],
    });

    res.json({ msg: "Application submitted successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Application failed" });
  }
});

module.exports = router;
