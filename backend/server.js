require("dotenv").config(); // Always at top

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Enable CORS
app.use(
  cors({
    origin: "*", // Allow all origins for simplicity; adjust as needed for security in production
  })
);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ Connected to MongoDB");
  })
  .catch((err) => {
    console.error("❌ Failed to connect to MongoDB:", err.message);
  });

// Routes
const courseRoutes = require("./routes/courses");
const adminRoutes = require("./routes/admin");
const enrollmentRoutes = require("./routes/enrollments");
const designContentRoutes = require("./routes/designContents");
const courseContentRoutes = require("./routes/courseContents");
const studentRoutes = require("./routes/students");

app.use("/api/students", studentRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/admins", adminRoutes);
app.use("/api/enrollments", enrollmentRoutes);
app.use("/api/designContents", designContentRoutes);
app.use("/api/courseContents", courseContentRoutes);

// ✅ Serve static files (CSS, JS, images) from public/
app.use(express.static(path.join(__dirname, "../public")));

// ✅ Serve HTML pages
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

app.get("/aboutus", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/aboutus.html"));
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/login.html"));
});

app.get("/admin", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/admin.html"));
});

app.get("/contactus", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/contactus.html"));
});

app.get("/crud", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/crud.html"));
});

app.get("/studentpage", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/studentpage.html"));
});

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});

console.log("Mongo URI:", process.env.MONGO_URI);
console.log("Server Port:", port);
