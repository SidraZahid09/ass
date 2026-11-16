
require("dotenv").config({
    path: require("path").resolve(__dirname, "../../.env")
  });
  
  const bcrypt = require("bcryptjs");
  const db = require("../config/db");
  
  (async () => {
    const [username, password] = process.argv.slice(2);
  
    if (!username || !password || password.length < 12) {
      console.error(
        "Usage: node backend/scripts/createAdmin.js <username> <password-at-least-12-characters>"
      );
      process.exitCode = 1;
      return;
    }
  
    try {
      const hash = await bcrypt.hash(password, 12);
  
      await db.query(
        `INSERT INTO admins (username, password_hash)
         VALUES ($1, $2)
         ON CONFLICT (username)
         DO UPDATE SET password_hash = EXCLUDED.password_hash`,
        [username, hash]
      );
  
      console.log(`Admin account "${username}" created/updated.`);
    } catch (error) {
      console.error("Could not create admin:", error.message);
      process.exitCode = 1;
    } finally {
      await db.end();
    }
  })();
  