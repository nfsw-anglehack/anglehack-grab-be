const express = require("express");
const router = express.Router();
const db = require("../database");

// Get all products
router.get("/", (req, res) => {
  db.all("SELECT * FROM Products", [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ products: rows });
  });
});

// Get a single product by id
router.get("/:id", (req, res) => {
  const { id } = req.params;
  db.get("SELECT * FROM Products WHERE id = ?", [id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json({ product: row });
  });
});

// Create a new product
router.post("/", (req, res) => {
  const { name, original_price, price, merchant_id } = req.body;
  const query = `INSERT INTO Products (name, original_price, price, merchant_id) 
                 VALUES (?, ?, ?, ?)`;
  db.run(query, [name, original_price, price, merchant_id], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: this.lastID });
  });
});

// Update a product
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { name, original_price, price, merchant_id } = req.body;
  const query = `UPDATE Products SET name = ?, original_price = ?, price = ?, merchant_id = ? 
                 WHERE id = ?`;
  db.run(query, [name, original_price, price, merchant_id, id], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json({ updated: this.changes });
  });
});

// Delete a product
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM Products WHERE id = ?";
  db.run(query, [id], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json({ deleted: this.changes });
  });
});

module.exports = router;
