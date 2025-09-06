// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import contactRoutes from "./routes/contactRoutes.js";
import courseRoutes from "./routes/coursesRoutes.js";
import applicationRoutes from "./routes/applicationRoutes.js";

dotenv.config();
const app = express();

// Middleware
app.use(
  cors({
    origin: "https://dainty-bombolone-51cd81.netlify.app",
  })
);
app.use(express.json());
app.use("/uploads", express.static("uploads")); // serve resume files

// 🔹 Connect MongoDB
(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.error("❌ MongoDB Connection Failed", err);
    process.exit(1);
  }
})();

// Routes
app.use("/api/contact", contactRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/apply", applicationRoutes);

// Home route
app.get("/", (req, res) => {
  res.send("Institute API (MongoDB) is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () =>
  console.log(`🚀 Server running on port ${PORT}`)
);
