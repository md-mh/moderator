const path = require("path");
const fs = require("fs");
const sqlite3 = require("sqlite3").verbose();

// Define database file path
const DB_PATH = path.join(__dirname, "../../data/database.db");

// Ensure data directory exists
if (!fs.existsSync(path.dirname(DB_PATH))) {
  fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
}

// Create and export a connection
const db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) {
    console.error("Error connecting to SQLite:", err.message);
  } else {
    console.log("Connected to SQLite database at", DB_PATH);
  }
});

module.exports = { db };
