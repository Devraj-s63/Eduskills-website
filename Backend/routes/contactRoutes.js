const express = require("express");
const nodemailer = require("nodemailer");
const router = express.Router();

router.post("/", async (req, res) => {
  const { name, email, phone, message } = req.body;

  if (!name || !email || !phone || !message) {
    return res.status(400).json({ msg: "All fields required" });
  }

  try {
    // Configure mailer
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
      subject: "New Contact Message",
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}`,
    });

    res.json({ msg: "Message sent successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Email sending failed" });
  }
});

module.exports = router;
