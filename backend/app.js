require("dotenv").config({ path: require("path").resolve(__dirname, "../.env") });
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const blogRoutes = require("./routes/blogRoutes");
const enquiryRoutes = require("./routes/enquiryRoutes");
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const db = require("./config/db");

const app = express();

app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));
app.use(cors({
  origin: process.env.FRONTEND_ORIGIN
    ? process.env.FRONTEND_ORIGIN.split(",").map((v) => v.trim())
    : true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json({ limit: "200kb" }));
app.use(express.urlencoded({ extended: false, limit: "200kb" }));

app.get("/api/health", async (_req,res) => {
  try { await db.query("SELECT 1"); res.json({status:"ok",database:"connected",service:"AssetElevatte API"}); }
  catch(error) { console.error("Database health check failed:",error.message); res.status(503).json({status:"error",database:"disconnected",message:"API is running but cannot connect to MySQL. Check root .env settings and make sure MySQL is running."}); }
});

app.use("/api", rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: "draft-7",
  legacyHeaders: false
}));

app.use("/api/auth",authRoutes);
app.use("/api/admin",adminRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/enquiries", enquiryRoutes);

app.use((err, _req, res, _next) => {
  console.error("API error:", err.message);
  res.status(500).json({ message: "Something went wrong. Please try again." });
});

module.exports = app;
