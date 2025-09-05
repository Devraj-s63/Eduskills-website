const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  course: { type: String, required: true },
  education: { type: String, required: true },
  resume: { type: String }, // store filename
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Application", applicationSchema);
