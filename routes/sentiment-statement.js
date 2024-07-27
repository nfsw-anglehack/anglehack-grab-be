const express = require("express");
const router = express.Router();
const db = require("../utils/db");
const sentimentService = require("../services/text-sentiment-service");

const DEFAULT = {
  image_url:
    "https://webstockreview.net/images/emotions-clipart-emoji-sticker-9.png",
  sexuality: "neutral",
  emotional: "neutral",
};

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

    if (!sticker || sticker.length <= 0) {
      return res.json(DEFAULT);
    }

    return res.json(sticker[0]);
  } catch (err) {
    return res.json(DEFAULT);
  }
});

module.exports = router;
