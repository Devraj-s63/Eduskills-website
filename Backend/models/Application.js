import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: String,
  course: String,
  education: String,
  resume: String, // store filename or file URL
  viewed: {        // new field to track if admin has seen the application
    type: Boolean,
    default: false
  },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Application", applicationSchema);
