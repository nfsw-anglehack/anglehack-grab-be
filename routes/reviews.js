const express = require("express");
const router = express.Router();
const db = require("../database");

// Get all reviews
router.get("/", (req, res) => {
  db.all("SELECT * FROM Reviews", [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ reviews: rows });
  });
});

// Get a single review by id
router.get("/:id", (req, res) => {
  const { id } = req.params;
  db.get("SELECT * FROM Reviews WHERE id = ?", [id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(404).json({ error: "Review not found" });
    }
    res.json({ review: row });
  });
});

// Create a new review
router.post("/", (req, res) => {
  const { message, rating, driver_id } = req.body;
  const query = `INSERT INTO Reviews (message, rating, driver_id) 
                 VALUES (?, ?, ?)`;
  db.run(query, [message, rating, driver_id], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: this.lastID });
  });
});

// Update a review
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { message, rating, driver_id } = req.body;
  const query = `UPDATE Reviews SET message = ?, rating = ?, driver_id = ? 
                 WHERE id = ?`;
  db.run(query, [message, rating, driver_id, id], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: "Review not found" });
    }
    res.json({ updated: this.changes });
  });
});

// Delete a review
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM Reviews WHERE id = ?";
  db.run(query, [id], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: "Review not found" });
    }
    res.json({ deleted: this.changes });
  });
});

module.exports = router;
