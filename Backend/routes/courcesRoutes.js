import express from "express";
import Course from "../models/Courses.js";

const router = express.Router();

// Add a new course
router.post("/", async (req, res) => {
  try {
    const course = new Course(req.body);
    await course.save();
    res.status(201).json(course);
  } catch (err) {
    console.error("Error saving course:", err);
    res.status(500).json({ success: false, error: "Database error" });
  }
});

// Get all courses
router.get("/", async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    console.error("Error fetching courses:", err);
    res.status(500).json({ success: false, error: "Database error" });
  }
});

// Get single course by ID
router.get("/:id", async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ success: false, error: "Course not found" });
    }
    res.json(course);
  } catch (err) {
    console.error("Error fetching course:", err);
    res.status(500).json({ success: false, error: "Database error" });
  }
});

// Update a course
router.put("/:id", async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!course) {
      return res.status(404).json({ success: false, error: "Course not found" });
    }
    res.json(course);
  } catch (err) {
    console.error("Error updating course:", err);
    res.status(500).json({ success: false, error: "Database error" });
  }
});

// Delete a course
router.delete("/:id", async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) {
      return res.status(404).json({ success: false, error: "Course not found" });
    }
    res.json({ success: true, message: "Course deleted" });
  } catch (err) {
    console.error("Error deleting course:", err);
    res.status(500).json({ success: false, error: "Database error" });
  }
});

export default router;
