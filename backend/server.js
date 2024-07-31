const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const cors = require('cors');

// Connect to SQLite database
const db = new sqlite3.Database('./database/finance_tracker.db', (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

// Use CORS middleware
app.use(cors());

// Middleware to parse JSON
app.use(express.json());

// Route to fetch all categories
app.get('/categories', (req, res) => {
  const sql = 'SELECT * FROM categories';
  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(400).json({"error": err.message});
      return;
    }
    res.json({
      "message": "success",
      "data": rows
    });
  });
});

// Route to create a new category
app.post('/categories', (req, res) => {
  const { name, value, maxValue } = req.body;
  const sql = 'INSERT INTO categories (name, value, maxValue) VALUES (?, ?, ?)';
  const params = [name, value, maxValue];
  db.run(sql, params, function(err) {
    if (err) {
      res.status(400).json({"error": err.message});
      return;
    }
    res.json({
      "message": "success",
      "data": { id: this.lastID, ...req.body }
    });
  });
});

// Route to update a category
app.put('/categories/:id', (req, res) => {
  const { name, value, maxValue } = req.body;
  const sql = 'UPDATE categories SET name = ?, value = ?, maxValue = ? WHERE id = ?';
  const params = [name, value, maxValue, req.params.id];
  db.run(sql, params, function(err) {
    if (err) {
      res.status(400).json({"error": err.message});
      return;
    }
    res.json({
      "message": "success",
      "data": req.body,
      "changes": this.changes
    });
  });
});

// Route to delete a category
app.delete('/categories/:id', (req, res) => {
  const sql = 'DELETE FROM categories WHERE id = ?';
  const params = [req.params.id];
  db.run(sql, params, function(err) {
    if (err) {
      res.status(400).json({"error": err.message});
      return;
    }
    res.json({
      "message": "success",
      "changes": this.changes
    });
  });
});

// Route for the root URL
app.get('/', (req, res) => {
  res.send('Welcome to the Finance Tracker API!');
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Close the database connection when the process is terminated
process.on('SIGINT', () => {
  db.close((err) => {
    if (err) {
      console.error('Error closing database:', err.message);
    }
    console.log('Closed the database connection.');
    process.exit(0);
  });
});