const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// Path to the database file
const dbPath = path.resolve(__dirname, "database.db");

// Connect to SQLite database
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Error opening database:", err.message);
  } else {
    console.log("Connected to the SQLite database.");

    // Enable foreign key support
    db.run(`PRAGMA foreign_keys = ON;`);

    // Create Merchants table
    db.run(`CREATE TABLE IF NOT EXISTS Merchants (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name VARCHAR(255),
      rating REAL,
      address TEXT,
      image_url TEXT,
      banner_url TEXT,
      delivery_time INTEGER,
      delivery_price REAL
    );`);

    // Create Products table
    db.run(`CREATE TABLE IF NOT EXISTS Products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        original_price REAL,
        price REAL,
        image_url TEXT,
        merchant_id INTEGER,
        FOREIGN KEY (merchant_id) REFERENCES Merchants(id)
    );`);

    // Create Drivers table
    db.run(`CREATE TABLE IF NOT EXISTS Drivers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      image_url TEXT,
      name TEXT,
      vehicle TEXT,
      vehicle_number INTEGER
    );`);

    // Create Reviews table
    db.run(`CREATE TABLE IF NOT EXISTS Reviews (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      message TEXT,
      rating INTEGER,
      driver_id INTEGER,
      FOREIGN KEY (driver_id) REFERENCES Drivers(id)
    );`);

    // Create Orders table
    db.run(`CREATE TABLE IF NOT EXISTS Orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      original_price REAL,
      total_price REAL,
      earned_point REAL,
      item_count INTEGER,
      merchant_id INTEGER,
      driver_id INTEGER,
      FOREIGN KEY (merchant_id) REFERENCES Merchants(id),
      FOREIGN KEY (driver_id) REFERENCES Drivers(id)
    );`);
  }
});

module.exports = db;
