const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./database.db"); // Adjust the path to your SQLite database

db.serialize(() => {
  // Insert data into Drivers table
  const insertDriverStmt = `INSERT INTO Drivers (name, vehicle, vehicle_number) VALUES (?, ?, ?)`;

  const drivers = [
    ["Joko Widodo", "Honda PCX", "B1234XYZ"],
    ["Susi Pudjiastuti", "Yamaha NMAX", "B5678ABC"],
    ["Ahmad Dhani", "Suzuki Spin", "B9101DEF"],
  ];

  drivers.forEach(([name, vehicle, vehicle_number]) => {
    db.run(insertDriverStmt, [name, vehicle, vehicle_number]);
  });

  // Insert data into Reviews table
  const insertReviewStmt = `INSERT INTO Reviews (message, rating, driver_id) VALUES (?, ?, ?)`;

  // Reviews for Joko Widodo (id 1)
  const reviewsJoko = [
    ["Excellent driving, very safe.", 5],
    ["Timely and efficient service.", 4],
    ["Polite and friendly driver.", 5],
    ["Vehicle was clean and well-maintained.", 4],
    ["Great communication and punctuality.", 5],
    ["Smooth and comfortable ride.", 4],
    ["Professional and courteous.", 5],
    ["Very satisfied with the service.", 5],
    ["Driver was very helpful and kind.", 4],
    ["Reliable and on-time.", 5],
  ];

  reviewsJoko.forEach(([message, rating]) => {
    db.run(insertReviewStmt, [message, rating, 1]);
  });

  // Reviews for Susi Pudjiastuti (id 2)
  const reviewsSusi = [
    ["Friendly and professional service.", 5],
    ["Highly recommended for punctuality.", 4],
    ["Great experience, would use again.", 5],
    ["Driver was very accommodating.", 4],
    ["Efficient and reliable.", 5],
    ["Comfortable ride with good service.", 4],
    ["Clean vehicle and friendly driver.", 5],
    ["On-time and very professional.", 5],
    ["Excellent service and great attitude.", 4],
    ["Reliable and excellent communication.", 5],
  ];

  reviewsSusi.forEach(([message, rating]) => {
    db.run(insertReviewStmt, [message, rating, 2]);
  });

  // Reviews for Ahmad Dhani (id 3)
  const reviewsAhmad = [
    ["Nice driving, but could improve cleanliness.", 3],
    ["Timely service, but vehicle was a bit old.", 3],
    ["Friendly driver, though the car needed cleaning.", 3],
    ["Decent ride, but needs some improvements.", 3],
    ["Service was okay, but the vehicle had some issues.", 3],
    ["Good driving skills but average vehicle condition.", 3],
    ["Driver was okay, but vehicle could be cleaner.", 3],
    ["Ride was acceptable, but could use better maintenance.", 3],
    ["Not the best ride, but service was decent.", 3],
    ["Satisfactory service with room for improvement.", 3],
  ];

  reviewsAhmad.forEach(([message, rating]) => {
    db.run(insertReviewStmt, [message, rating, 3]);
  });
});

db.close((err) => {
  if (err) {
    console.error("Error closing the database:", err.message);
  }
});
