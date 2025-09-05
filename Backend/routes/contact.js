import express from "express";
import pool from "../config/db.js";

const router = express.Router();

// Save contact message (already exists)
router.post("/", async (req, res) => {
  const { name, email, phone, message } = req.body;
  try {
    const [result] = await pool.query(
      "INSERT INTO contacts (name, email, phone, message) VALUES (?, ?, ?, ?)",
      [name, email, phone, message]
    );
    res.status(201).json({ success: true, id: result.insertId });
  } catch (err) {
    console.error("Error saving contact:", err);
    res.status(500).json({ error: "Database error" });
  }
});

// ✅ New Route: Get all contacts
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM contacts ORDER BY created_at DESC");
    res.json(rows);
  } catch (err) {
    console.error("Error fetching contacts:", err);
    res.status(500).json({ error: "Database error" });
  }
});

export default router;
