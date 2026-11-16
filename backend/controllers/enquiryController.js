const db = require("../config/db");

const allowedServices = [
  "Finance & Accounting",
  "Marketing & Brand Growth",
  "Technology Solutions",
  "Business Growth Strategy",
  "Other"
];

async function createEnquiry(req, res, next) {
  try {
    const name = String(req.body.name || "").trim();
    const email = String(req.body.email || "").trim();
    const phone = String(req.body.phone || "").trim();
    const company = String(req.body.company || "").trim();
    const service = String(req.body.service || "").trim();
    const message = String(req.body.message || "").trim();

    if (!name || name.length > 160 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
        email.length > 190 || !message || message.length > 5000) {
      return res.status(400).json({
        message: "Please provide your name, a valid email address and a message."
      });
    }
    if (phone.length > 60 || company.length > 190) {
      return res.status(400).json({ message: "Please check the phone or company field." });
    }
    if (service && !allowedServices.includes(service)) {
      return res.status(400).json({ message: "Please select a valid service." });
    }

    await db.execute(
      `INSERT INTO enquiries (name, email, phone, company, service, message, created_at)
       VALUES (?, ?, ?, ?, ?, ?, NOW())`,
      [name, email, phone || null, company || null, service || null, message]
    );

    res.status(201).json({
      message: "Thank you for reaching out. Your enquiry has been submitted."
    });
  } catch (error) { next(error); }
}

module.exports = { createEnquiry };
