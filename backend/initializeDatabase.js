const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database/finance-tracker.db');

// Create the categories table
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      value REAL NOT NULL,
      maxValue REAL NOT NULL
    )
  `);
  
  console.log("Categories table created or already exists.");
});

db.close();