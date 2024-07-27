const express = require("express");
const router = express.Router();

// Define the root route
router.get("/", (req, res) => {
  res.json({ hello: "world" });
});

module.exports = router;
