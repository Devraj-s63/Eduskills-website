// Backend/models/Application.js
import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: String,
  course: String,
  education: String,
  resume: String, // store file path or filename
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Application", applicationSchema);
