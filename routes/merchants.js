const express = require("express");
const router = express.Router();
const db = require("../database");

// Get all merchants
router.get("/", (req, res) => {
  db.all("SELECT * FROM Merchants", [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  const query = `
      SELECT m.id AS merchant_id, m.name AS merchant_name, m.rating, m.address, m.image_url, m.banner_url, m.delivery_time, m.delivery_price,
             p.id AS product_id, p.name AS product_name, p.original_price, p.price, p.image_url AS product_image_url
      FROM Merchants m
      LEFT JOIN Products p ON m.id = p.merchant_id
      WHERE m.id = ?
    `;

  db.all(query, [id], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (rows.length === 0) {
      return res.status(404).json({ error: "Merchant not found" });
    }

    // Process rows to group products by merchant
    const merchant = {
      id: rows[0].merchant_id,
      name: rows[0].merchant_name,
      rating: rows[0].rating,
      address: rows[0].address,
      image_url: rows[0].image_url,
      banner_url: rows[0].banner_url,
      delivery_time: rows[0].delivery_time,
      delivery_price: rows[0].delivery_price,
      products: [],
    };

    rows.forEach((row) => {
      if (row.product_id) {
        merchant.products.push({
          id: row.product_id,
          name: row.product_name,
          original_price: row.original_price,
          image_url: row.product_image_url,
          price: row.price,
        });
      }
    });

    res.json(merchant);
  });
});

// Create a new merchant
router.post("/", (req, res) => {
  const {
    name,
    rating,
    address,
    image_url,
    banner_url,
    delivery_time,
    delivery_price,
  } = req.body;
  const query = `INSERT INTO Merchants (name, rating, address, image_url, banner_url, delivery_time, delivery_price) 
                 VALUES (?, ?, ?, ?, ?, ?, ?)`;
  db.run(
    query,
    [
      name,
      rating,
      address,
      image_url,
      banner_url,
      delivery_time,
      delivery_price,
    ],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ id: this.lastID });
    }
  );
});

// Update a merchant
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const {
    name,
    rating,
    address,
    image_url,
    banner_url,
    delivery_time,
    delivery_price,
  } = req.body;
  const query = `UPDATE Merchants SET name = ?, rating = ?, address = ?, image_url = ?, banner_url = ?, delivery_time = ?, delivery_price = ? 
                 WHERE id = ?`;
  db.run(
    query,
    [
      name,
      rating,
      address,
      image_url,
      banner_url,
      delivery_time,
      delivery_price,
      id,
    ],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (this.changes === 0) {
        return res.status(404).json({ error: "Merchant not found" });
      }
      res.json({ updated: this.changes });
    }
  );
});

// Delete a merchant
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM Merchants WHERE id = ?";
  db.run(query, [id], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: "Merchant not found" });
    }
    res.json({ deleted: this.changes });
  });
});

module.exports = router;
