import express from "express";
import pool from "../config/db.js";

const router = express.Router();

// Get all courses
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM courses");
    res.json(rows);
  } catch (err) {
    console.error("Error fetching courses:", err);
    res.status(500).json({ error: "Database error" });
  }
});

export default router;
