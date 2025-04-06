require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const mongoURI = process.env.MONGO_URI;

// Connect to MongoDB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const reportSchema = new mongoose.Schema({
  type: String,
  description: String,
  location: String,
  lat: Number,
  lng: Number,
  date: { type: Date, default: Date.now },
});

const Report = mongoose.model("Report", reportSchema);

// Get all verified reports
app.get("/reports", async (req, res) => {
    try {
      const reports = await Report.find(); // Import your Report model
      res.json(reports);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to fetch reports" });
    }
  });

// Submit a verified report
app.post("/report", async (req, res) => {
  const { type, description, location } = req.body;

  // Extract lat/lng from location string
  const [lat, lng] = location.split(",").map(Number);

  try {
    const newReport = new Report({ type, description, location, lat, lng });
    await newReport.save();
    res.status(201).json({ message: "Report saved", report: newReport });
  } catch (err) {
    res.status(500).json({ error: "Failed to save report" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Backend running on http://localhost:${PORT}`);
});
