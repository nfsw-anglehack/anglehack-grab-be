const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./database.db"); // Adjust the path to your SQLite database

const merchants = [
  {
    name: "Warung Makan Sederhana",
    rating: 4.2,
    address: "Jl. Raya Jakarta No. 10, Jakarta, Indonesia",
    image_url:
      "https://rinaldimunir.wordpress.com/wp-content/uploads/2011/05/rm-sederhana-di-padang.jpg",
    banner_url:
      "https://awsimages.detik.net.id/community/media/visual/2017/09/12/cb9b74a0-6638-4916-8961-5a8891e66743_43.jpg?w=1200",
    delivery_time: 30,
    delivery_price: 10000,
  },
  {
    name: "Restoran Padang Cita Rasa",
    rating: 4.7,
    address: "Jl. Sudirman No. 15, Bandung, Indonesia",
    image_url:
      "https://img.restaurantguru.com/c0b9-Restaurant-RM-Padang-Cita-Rasa-interior.jpg",
    banner_url:
      "https://www.saribundo.biz/wp-content/uploads/2022/11/Inilah-Alasan-Kedai-Nasi-Asal-Sumbar-Disebut-Rumah-Makan-Padang.jpeg",
    delivery_time: 45,
    delivery_price: 15000,
  },
  {
    name: "Kedai Kopi Nusantara",
    rating: 4.5,
    address: "Jl. Malioboro No. 20, Yogyakarta, Indonesia",
    image_url:
      "https://th.bing.com/th/id/OIP.qG2aLy1D35fa3ty2nbsVzAHaJ4?rs=1&pid=ImgDetMain",
    banner_url:
      "https://3.bp.blogspot.com/-Fn12LVnr_II/WYk8inJVCJI/AAAAAAAABvE/3nPUyoRN_Asm-SyD8Tr6SfzdqyuibDA3QCEwYBhgL/s1600/Kedai%2Bkopi%2Bnusantara%2Bcirebon%2B2.jpeg",
    delivery_time: 20,
    delivery_price: 5000,
  },
];

const products = [
  [
    {
      id: 1,
      name: "Nasi Goreng Kampung",
      original_price: 45000,
      image_url:
        "https://awsimages.detik.net.id/community/media/visual/2023/11/07/ilustrasi-nasi-goreng_169.jpeg?w=1200",
      price: 40000,
    },
    {
      id: 2,
      name: "Ayam Penyet",
      original_price: 55000,
      image_url:
        "https://d1vbn70lmn1nqe.cloudfront.net/prod/wp-content/uploads/2023/07/18024221/ternyata-mudah-ini-resep-ayam-penyet-yang-lezat-halodoc.jpg.webp",
      price: 50000,
    },
    {
      id: 3,
      name: "Sate Ayam",
      original_price: 60000,
      image_url:
        "https://static.vecteezy.com/system/resources/previews/027/541/937/large_2x/an-indonesian-sate-ayam-on-top-of-wooden-table-free-photo.jpg",
      price: 55000,
    },
    {
      id: 4,
      name: "Rendang Daging",
      original_price: 75000,
      image_url:
        "https://cms.pasundanekspres.id/storage/uploads/conten/yhImp3sm1HKsyCFx.webp",
      price: 70000,
    },
  ],
  [
    {
      name: "Nasi Padang",
      original_price: 40000,
      price: 35000,
      image_url:
        "https://th.bing.com/th/id/R.eb00b99bf71cb6a7bc5dda8adecd10a0?rik=UsQa34HkmiFjmA&riu=http%3a%2f%2fwww.yihagames.com%2fwp-content%2fuploads%2f2018%2f08%2fnasi-padang.jpg&ehk=Gz9wehSGI6ry6QbT2dsF9wTIejw97y2bt%2fuoL0JDL70%3d&risl=&pid=ImgRaw&r=0",
    },
    {
      name: "Ayam Pop",
      original_price: 50000,
      price: 45000,
      image_url:
        "https://cdn.tasteatlas.com/images/dishes/ebe42c5f9a6a44cf86c2c4e5d1904b0e.jpg",
    },
    {
      name: "Gulai Kambing",
      original_price: 65000,
      price: 60000,
      image_url:
        "https://2.bp.blogspot.com/-FiQS9ZfPeXk/WJUaoSuTREI/AAAAAAAAAQw/yY-1qyjTYYIpxQ7rBkbk-zsC7CfSRRW5ACLcB/s1600/gulai%2Bkambing.jpg",
    },
    {
      name: "Ikan Bakar",
      original_price: 70000,
      price: 65000,
      image_url:
        "https://resepkoki.id/wp-content/uploads/2016/12/Resep-Ikan-Bakar.jpg",
    },
  ],
  [
    {
      name: "Kopi Nusantara",
      original_price: 30000,
      price: 25000,
      image_url:
        "https://simplygroup.co.id/wp-content/uploads/2019/12/kopi-indonesia.jpg",
    },
    {
      name: "Kue Cubir",
      original_price: 25000,
      price: 20000,
      image_url:
        "https://carapraktis.info/wp-content/uploads/2017/02/Resep-Kue-Cubit.jpg",
    },
    {
      name: "Roti Bakar",
      original_price: 35000,
      price: 30000,
      image_url:
        "https://th.bing.com/th/id/OIP.muILexmvlFX0BqGgnCcRMwHaHa?rs=1&pid=ImgDetMain",
    },
    {
      name: "Cappuccino",
      original_price: 45000,
      price: 40000,
      image_url:
        "https://upload.wikimedia.org/wikipedia/commons/c/c8/Cappuccino_at_Sightglass_Coffee.jpg",
    },
  ],
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

// Function to execute a query with a callback and return rows
const allQuery = (query, params = []) => {
  return new Promise((resolve, reject) => {
    db.all(query, params, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

const insertMerchants = async () => {
  const insertStmt = `INSERT INTO Merchants (name, rating, address, image_url, banner_url, delivery_time, delivery_price) VALUES (?, ?, ?, ?, ?, ?, ?)`;
  for (const merchant of merchants) {
    await runQuery(insertStmt, [
      merchant.name,
      merchant.rating,
      merchant.address,
      merchant.image_url,
      merchant.banner_url,
      merchant.delivery_time,
      merchant.delivery_price,
    ]);
  }
};

const insertProducts = async () => {
  const merchantIds = await allQuery(`SELECT id FROM Merchants`);

  const insertStmt = `INSERT INTO Products (name, original_price, price, image_url, merchant_id) VALUES (?, ?, ?, ?, ?)`;
  for (const merchant of merchantIds) {
    for (const product of products[merchant.id - 1]) {
      await runQuery(insertStmt, [
        product.name,
        product.original_price,
        product.price,
        product.image_url,
        merchant.id,
      ]);
    }
  }
};

const populateDatabase = async () => {
  try {
    await insertMerchants();
    await insertProducts();
    console.log("Merchants and Products tables populated successfully.");
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
