import express from "express";
import Contact from "../models/Contact.js";

const router = express.Router();

// Add new contact
router.post("/", async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    res.status(201).json(contact);
  } catch (err) {
    console.error("❌ Error saving contact:", err);
    res.status(500).json({ error: "Failed to save contact" });
  }
});

// Get all contacts
router.get("/", async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (err) {
    console.error("❌ Error fetching contacts:", err);
    res.status(500).json({ error: "Failed to fetch contacts" });
  }
});

export default router;
