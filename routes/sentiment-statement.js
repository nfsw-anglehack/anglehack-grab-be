const express = require("express");
const router = express.Router();
const db = require("../utils/db");
const sentimentService = require("../services/text-sentiment-service");

// Define the root route
router.post("/", async (req, res) => {
  const { statement } = req.body;

  try {
    const result = await sentimentService.sentimentStatement(statement);
    const jsonResult = JSON.parse(result);

    const sticker = await db.dbAll(
      "SELECT * FROM Stickers as s WHERE s.sexuality = ? AND s.emotional = ?",
      [jsonResult.sexuality, jsonResult.emotional]
    );

    return res.json(sticker);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

module.exports = router;
