const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./database.db"); // Adjust the path to your SQLite database

// Data to be inserted
const stickers = [
  {
    image_url:
      "https://drive.google.com/thumbnail?id=1TaPcPkDZVStWjHd26fDQ18oW7te0sLIU",
    sexuality: "male",
    emotional: "joy",
  },
  {
    image_url: "https://media.tenor.com/WRtrZCWPhioAAAAM/ss.gif",
    sexuality: "male",
    emotional: "sadness",
  },
  {
    image_url:
      "https://drive.google.com/thumbnail?id=19pLbQn37QRawjOeCVxrX_Rs7BfPz6c6N",
    sexuality: "male",
    emotional: "anger",
  },
  {
    image_url:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-4Xafl5MlFbgW-cH-RUOWjIR_qP2PPWT59w&s",
    sexuality: "male",
    emotional: "fear",
  },
  {
    image_url:
      "https://drive.google.com/thumbnail?id=1YI-hB3xwLJ-sZ-4AT7UiXdq0D106Y1BL",
    sexuality: "male",
    emotional: "disgust",
  },
  {
    image_url:
      "https://drive.google.com/thumbnail?id=1CefH1EA8KgJ-1-RyHrkQFkf_kQs42vRL",
    sexuality: "female",
    emotional: "joy",
  },
  {
    image_url: "https://i.imgflip.com/10a5c0.jpg",
    sexuality: "female",
    emotional: "sadness",
  },
  {
    image_url:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeuMY_Yw24SMmAKxslmoJVqjn2lEa8q7qGoj0Oxm9fvAhjcE7RGlqDeTGQi4CvnmJuUmg&usqp=CAU",
    sexuality: "female",
    emotional: "anger",
  },
  {
    image_url:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYsQq8w9BiOkCxLlgQzNO9jjk2rAFSRqo3Ig&s",
    sexuality: "female",
    emotional: "fear",
  },
  {
    image_url:
      "https://drive.google.com/thumbnail?id=13ZyNpZLWbGRJq-AcYHd8_v1fauFoQBPM",
    sexuality: "female",
    emotional: "disgust",
  },
  {
    image_url:
      "https://drive.google.com/thumbnail?id=1rwt2HMfBhLKVKoodSrygWIcXhlu7VNLz",
    sexuality: "neutral",
    emotional: "joy",
  },
  {
    image_url:
      "https://drive.google.com/thumbnail?id=1eIVnPEgTxttVK49QCJ9AT1AkdSCwlpGH",
    sexuality: "neutral",
    emotional: "sadness",
  },
  {
    image_url:
      "https://drive.google.com/thumbnail?id=1VcrxspZ7QCozIkyL__RFO6Gv0eBi48ff",
    sexuality: "neutral",
    emotional: "anger",
  },
  {
    image_url:
      "https://drive.google.com/thumbnail?id=15EKd21e4ZS41Rn6-QayUvyF3XpK-2Jbl",
    sexuality: "neutral",
    emotional: "fear",
  },
  {
    image_url:
      "https://drive.google.com/thumbnail?id=1AQXY84XPYmzUrxrHm4d_FQ6xJd9hYXC_",
    sexuality: "neutral",
    emotional: "disgust",
  },
];

// Function to execute a query with a callback
const runQuery = (query, params = []) => {
  return new Promise((resolve, reject) => {
    db.run(query, params, function (err) {
      if (err) {
        reject(err);
      } else {
        resolve(this);
      }
    });
  });
};

// Insert data into the Stickers table
const insertStickers = async () => {
  const insertStmt = `INSERT INTO Stickers (image_url, sexuality, emotional) VALUES (?, ?, ?)`;
  for (const sticker of stickers) {
    await runQuery(insertStmt, [
      sticker.image_url,
      sticker.sexuality,
      sticker.emotional,
    ]);
  }
};

const populateDatabase = async () => {
  try {
    await insertStickers();
    console.log("Stickers table populated successfully.");
  } catch (err) {
    console.error("Error populating database:", err.message);
  } finally {
    db.close((err) => {
      if (err) {
        console.error("Error closing the database:", err.message);
      }
    });
  }
};

populateDatabase();
