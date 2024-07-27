const express = require("express");
const router = express.Router();
const db = require("../database");

// Get all drivers
router.get("/", (req, res) => {
  const query = `
    SELECT Drivers.*, 
           IFNULL(AVG(Reviews.rating), 0) AS rating
    FROM Drivers
    LEFT JOIN Reviews ON Drivers.id = Reviews.driver_id
    GROUP BY Drivers.id
  `;
  db.all(query, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ drivers: rows });
  });
});

// Get a single driver by id
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const query = `
    SELECT Drivers.*, 
           IFNULL(AVG(Reviews.rating), 0) AS rating
    FROM Drivers
    LEFT JOIN Reviews ON Drivers.id = Reviews.driver_id
    WHERE Drivers.id = ?
    GROUP BY Drivers.id
  `;
  db.get(query, [id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(404).json({ error: "Driver not found" });
    }
    res.json({ driver: row });
  });
});

// Create a new driver
router.post("/", (req, res) => {
  const { name, image_url, vehicle, vehicle_number } = req.body;
  const query = `INSERT INTO Drivers (name, image_url, vehicle, vehicle_number) 
                 VALUES (?, ?, ?, ?)`;
  db.run(query, [name, image_url, vehicle, vehicle_number], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: this.lastID });
  });
});

// Update a driver
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { name, image_url, vehicle, vehicle_number } = req.body;
  const query = `UPDATE Drivers SET name = ?, image_url = ?, vehicle = ?, vehicle_number = ? 
                 WHERE id = ?`;
  db.run(query, [name, image_url, vehicle, vehicle_number, id], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: "Driver not found" });
    }
    res.json({ updated: this.changes });
  });
});

// Delete a driver
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM Drivers WHERE id = ?";
  db.run(query, [id], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: "Driver not found" });
    }
    res.json({ deleted: this.changes });
  });
});

// Get reviews for a specific driver by driver id
router.get("/reviews/:id", (req, res) => {
  const { id } = req.params;

  // Query to get all reviews for the driver with the specified id
  db.all("SELECT * FROM Reviews WHERE driver_id = ?", [id], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (rows.length === 0) {
      return res
        .status(404)
        .json({ error: "No reviews found for this driver" });
    }
    res.json({ reviews: rows });
  });
});

module.exports = router;
