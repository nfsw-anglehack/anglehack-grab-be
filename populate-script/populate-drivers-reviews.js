const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./database.db"); // Adjust the path to your SQLite database

db.serialize(() => {
  // Insert data into Drivers table
  const insertDriverStmt = `INSERT INTO Drivers (name, image_url, vehicle, vehicle_number) VALUES (?, ?, ?, ?)`;

  const drivers = [
    [
      "Joko Widodo",
      "https://th.bing.com/th/id/OIP.AuOxWGGg52MnUkKD-jNqRwAAAA?rs=1&pid=ImgDetMain",
      "Honda PCX",
      "B1234XYZ",
    ],
    [
      "Susi Pudjiastuti",
      "https://asset.kompas.com/crops/p0pl-7ARfJVd3jy_Ey5MjM9uSLU=/190x0:1123x622/750x500/data/photo/2020/04/30/5eaa797abbedd.jpeg",
      "Yamaha NMAX",
      "B5678ABC",
    ],
    [
      "Ahmad Dhani",
      "https://analisa.id/wp-content/uploads/2022/08/driver-grab.jpg",
      "Suzuki Spin",
      "B9101DEF",
    ],
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
    [
      "Driver arrived on time and the ride was smooth, but the car could have been cleaner.",
      3,
    ],
    [
      "The driver was courteous and the car was comfortable, though a bit noisy.",
      4,
    ],
    [
      "Good service overall, but there was a slight delay in arriving at the destination.",
      3,
    ],
    [
      "The ride was pleasant, but the driver used the GPS for directions despite being familiar with the area.",
      3,
    ],
    [
      "The driver was friendly and the car was in decent shape, though the air conditioning was not very effective.",
      4,
    ],
    [
      "Service was okay; the driver was polite, but the ride was slightly bumpy.",
      3,
    ],
    [
      "The driver was punctual and the car was fairly clean, though the ride could have been smoother.",
      3,
    ],
    [
      "The ride was generally good, but there was some confusion about the pickup location.",
      3,
    ],
    [
      "Comfortable ride with a friendly driver, but the vehicle's interior needed more attention.",
      4,
    ],
    [
      "The driver was professional and the journey was satisfactory, though the car's maintenance could be improved.",
      3,
    ],
  ];

  reviewsSusi.forEach(([message, rating]) => {
    db.run(insertReviewStmt, [message, rating, 2]);
  });

  // Reviews for Ahmad Dhani (id 3)
  const reviewsAhmad = [
    ["Driver was late and the car was not clean.", 1],
    ["The car had a strange odor and the driver took a long route.", 2],
    ["Unfriendly driver and uncomfortable seats.", 1],
    ["Driver was rude and did not follow instructions.", 1],
    ["Car was not well-maintained and the ride was bumpy.", 2],
    ["The driver drove too fast and recklessly.", 1],
    ["Driver was not punctual and the car was noisy.", 2],
    ["Unpleasant experience due to the driver's behavior.", 1],
    ["The car's air conditioning was not working well.", 2],
    ["Driver took unnecessary detours, making the trip longer.", 1],
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
