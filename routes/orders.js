const express = require("express");
const router = express.Router();
const db = require("../database");
const { dbAll } = require("../utils/db");

// Get all orders
router.get("/", (req, res) => {
  db.all("SELECT * FROM Orders", [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ orders: rows });
  });
});

// Get a single order by id
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const order = await dbAll("SELECT * FROM Orders WHERE id = ?", [id]);

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    const merchant = await dbAll("SELECT * FROM Merchants WHERE id = ?", [
      order[0].merchant_id,
    ]);

    if (!merchant) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.json({
      order: { ...order[0], arrival_time: merchant[0].delivery_time },
    });
  } catch {
    return res.status(500).json({ error: err.message });
  }
});

// Create a new order
router.post("/", (req, res) => {
  const {
    original_price,
    total_price,
    earned_point,
    item_count,
    merchant_id,
    driver_id,
  } = req.body;
  const query = `INSERT INTO Orders (original_price, total_price, earned_point, item_count, merchant_id, driver_id) 
                 VALUES (?, ?, ?, ?, ?, ?)`;
  db.run(
    query,
    [
      original_price,
      total_price,
      earned_point,
      item_count,
      merchant_id,
      driver_id,
    ],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ id: this.lastID });
    }
  );
});

// Update an order
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const {
    original_price,
    total_price,
    earned_point,
    item_count,
    merchant_id,
    driver_id,
  } = req.body;
  const query = `UPDATE Orders SET original_price = ?, total_price = ?, earned_point = ?, item_count = ?, merchant_id = ?, driver_id = ? 
                 WHERE id = ?`;
  db.run(
    query,
    [
      original_price,
      total_price,
      earned_point,
      item_count,
      merchant_id,
      driver_id,
      id,
    ],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (this.changes === 0) {
        return res.status(404).json({ error: "Order not found" });
      }
      res.json({ updated: this.changes });
    }
  );
});

// Delete an order
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM Orders WHERE id = ?";
  db.run(query, [id], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.json({ deleted: this.changes });
  });
});

module.exports = router;
