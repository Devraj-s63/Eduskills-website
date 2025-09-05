import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "../config/db.js";
import contactRoutes from "./routes/contact.js";
import courseRoutes from "./routes/courses.js";
import applicationRoutes from "./routes/application.js";

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads")); // serve resume files

// Test MySQL Connection
(async () => {
  try {
    const conn = await pool.getConnection();
    console.log("✅ MySQL Connected");
    conn.release();
  } catch (err) {
    console.error("❌ MySQL Connection Failed", err);
  }
})();

// Routes
app.use("/api/contact", contactRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/apply", applicationRoutes);

// Home route
app.get("/", (req, res) => {
  res.send("Institute API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => console.log(`🚀 Server running on port ${PORT}`));

