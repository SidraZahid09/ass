
const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function login(req, res, next) {
  try {
    const username = String(req.body.username || "").trim();
    const password = String(req.body.password || "");

    if (!username || !password) {
      return res.status(400).json({
        message: "Enter your username and password."
      });
    }

    const result = await db.query(
      "SELECT id, username, password_hash FROM admins WHERE username = $1 LIMIT 1",
      [username]
    );

    const rows = result.rows;

    if (
      !rows.length ||
      !(await bcrypt.compare(password, rows[0].password_hash))
    ) {
      return res.status(401).json({
        message: "Invalid username or password."
      });
    }

    if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32) {
      return res.status(500).json({
        message: "Set a JWT_SECRET of at least 32 characters in the backend environment."
      });
    }

    const token = jwt.sign(
      {
        id: rows[0].id,
        username: rows[0].username
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "8h",
        issuer: "assetelevatte"
      }
    );

    res.json({
      token,
      admin: {
        id: rows[0].id,
        username: rows[0].username
      }
    });

  } catch (error) {
    next(error);
  }
}

module.exports = { login };
