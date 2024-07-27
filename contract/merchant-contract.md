# Merchant API Service

This service provides endpoints to manage merchants and their associated products. It supports CRUD operations for merchants and allows retrieving products associated with a specific merchant.

## Base URL

/merchants

## Endpoints

### 1. Get All Merchants

**Endpoint:** GET /

**Description:** Retrieves a list of all merchants.

**Request:**

- **Headers:** None

**Response:**

- **Status Code:** 200 OK
- **Content-Type:** application/json

**Body:**

```json
[
  {
    "id": 1,
    "name": "Warung Makan Sederhana",
    "rating": 4.5,
    "address": "Jl. Raya No.1, Jakarta",
    "image_url": "http://example.com/warung1.jpg",
    "banner_url": "http://example.com/warung1-banner.jpg",
    "delivery_time": 30,
    "delivery_price": 5000
  },
  {
    "id": 2,
    "name": "Restoran Padang Cita Rasa",
    "rating": 4.7,
    "address": "Jl. Padang No.2, Bandung",
    "image_url": "http://example.com/padang1.jpg",
    "banner_url": "http://example.com/padang1-banner.jpg",
    "delivery_time": 45,
    "delivery_price": 7000
  }
]
```

### 2. Get a Single Merchant by ID

**Endpoint:** GET /:id

**Description:** Retrieves a merchant by their ID along with associated products.

**Request:**

- **URL Parameters:**
  - id (integer): The ID of the merchant to retrieve.
- **Headers:** None

**Response:**

- **Status Code:** 200 OK
- **Content-Type:** application/json

**Body:**

```json
{
  "id": 1,
  "name": "Warung Makan Sederhana",
  "rating": 4.5,
  "address": "Jl. Raya No.1, Jakarta",
  "image_url": "http://example.com/warung1.jpg",
  "banner_url": "http://example.com/warung1-banner.jpg",
  "delivery_time": 30,
  "delivery_price": 5000,
  "products": [
    {
      "id": 1,
      "name": "Makanan A",
      "original_price": 50000,
      "price": 45000,
      "image_url": "http://example.com/warung1-product1.jpg"
    },
    {
      "id": 2,
      "name": "Makanan B",
      "original_price": 60000,
      "price": 55000,
      "image_url": "http://example.com/warung1-product2.jpg"
    }
  ]
}
```

- **Status Code:** 404 Not Found
- **Content-Type:** application/json

**Body:**

```json
{
  "error": "Merchant not found"
}
```

### 3. Create a New Merchant

**Endpoint:** POST /

**Description:** Creates a new merchant.

**Request:**

- **Headers:** Content-Type: application/json
- **Body:**

```json
{
  "name": "Kedai Kopi Nusantara",
  "rating": 4.8,
  "address": "Jl. Kopi No.3, Surabaya",
  "image_url": "http://example.com/kopi1.jpg",
  "banner_url": "http://example.com/kopi1-banner.jpg",
  "delivery_time": 25,
  "delivery_price": 4000
}
```

**Response:**

- **Status Code:** 201 Created
- **Content-Type:** application/json

**Body:**

```json
{
  "id": 3
}
```

- **Status Code:** 500 Internal Server Error
- **Content-Type:** application/json

**Body:**

```json
{
  "error": "Error message"
}
```

### 4. Update a Merchant

**Endpoint:** PUT /:id

**Description:** Updates an existing merchant.

**Request:**

- **URL Parameters:**
  - id (integer): The ID of the merchant to update.
- **Headers:** Content-Type: application/json
- **Body:**

```json
{
  "name": "Kedai Kopi Nusantara Updated",
  "rating": 4.9,
  "address": "Jl. Kopi No.3, Surabaya Updated",
  "image_url": "http://example.com/kopi1-updated.jpg",
  "banner_url": "http://example.com/kopi1-banner-updated.jpg",
  "delivery_time": 20,
  "delivery_price": 3500
}
```

**Response:**

- **Status Code:** 200 OK
- **Content-Type:** application/json

**Body:**

```json
{
  "updated": 1
}
```

- **Status Code:** 404 Not Found
- **Content-Type:** application/json

**Body:**

```json
{
  "error": "Merchant not found"
}
```

- **Status Code:** 500 Internal Server Error
- **Content-Type:** application/json

**Body:**

```json
{
  "error": "Error message"
}
```

### 5. Delete a Merchant

**Endpoint:** DELETE /:id

**Description:** Deletes a merchant.

**Request:**

- **URL Parameters:**
  - id (integer): The ID of the merchant to delete.
- **Headers:** None

**Response:**

- **Status Code:** 200 OK
- **Content-Type:** application/json

**Body:**

```json
{
  "deleted": 1
}
```

- **Status Code:** 404 Not Found
- **Content-Type:** application/json

**Body:**

```json
{
  "error": "Merchant not found"
}
```

- **Status Code:** 500 Internal Server Error
- **Content-Type:** application/json

**Body:**

```json
{
  "error": "Error message"
}
```

## Error Handling

All endpoints may return the following error response format:

- **Status Code:** 500 Internal Server Error
- **Content-Type:** application/json

**Body:**

```json
{
  "error": "Error message"
}
```
