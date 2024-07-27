const express = require("express");
const router = express.Router();
const db = require("../utils/db");
const generatorService = require("../services/text-gen-service");

function generatePrompt(driver, feedbacks) {
  const result = [];

  for (f of feedbacks) {
    result.push(`${f.message}^#^${f.rating}`);
  }

  result.push(`person name: ${driver.name}`);

  return result.join("\n");
}

// Define the root route
router.post("/", async (req, res) => {
  const { driver_id } = req.body;

  try {
    const reviews = await db.dbAll(
      "SELECT * FROM Reviews WHERE driver_id = ?",
      [driver_id]
    );

    const driverQuery = `
      SELECT Drivers.*, 
             IFNULL(AVG(Reviews.rating), 0) AS rating
      FROM Drivers
      LEFT JOIN Reviews ON Drivers.id = Reviews.driver_id
      WHERE Drivers.id = ?
      GROUP BY Drivers.id
    `;
    const driver = await db.dbAll(driverQuery, [driver_id]);

    if (!driver.length) {
      return res.status(404).json({ error: "Driver not found" });
    }

    const prompt = generatePrompt(driver[0], reviews);

    const story = await generatorService.generateStory(prompt);

    return res.json({ ...driver[0], story: story });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

module.exports = router;
