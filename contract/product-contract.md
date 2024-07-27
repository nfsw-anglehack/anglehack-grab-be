# Products API Service

This service provides endpoints to manage products, including creating, retrieving, updating, and deleting products.

## Base URL

/products

## Endpoints

### 1. Get All Products

**Endpoint:** GET /

**Description:** Retrieves a list of all products.

**Request:**

- **Headers:** None

**Response:**

- **Status Code:** 200 OK
- **Content-Type:** application/json

**Body:**

```json
{
  "products": [
    {
      "id": 1,
      "name": "Product 1",
      "original_price": 10000,
      "price": 9000,
      "merchant_id": 1
    },
    {
      "id": 2,
      "name": "Product 2",
      "original_price": 15000,
      "price": 14000,
      "merchant_id": 2
    }
  ]
}
```

### 2. Get a Single Product by ID

**Endpoint:** GET /:id

**Description:** Retrieves a product by its ID.

**Request:**

- **URL Parameters:**
  - id (integer): The ID of the product to retrieve.
- **Headers:** None

**Response:**

- **Status Code:** 200 OK
- **Content-Type:** application/json

**Body:**

```json
{
  "product": {
    "id": 1,
    "name": "Product 1",
    "original_price": 10000,
    "price": 9000,
    "merchant_id": 1
  }
}
```

- **Status Code:** 404 Not Found
- **Content-Type:** application/json

**Body:**

```json
{
  "error": "Product not found"
}
```

### 3. Create a New Product

**Endpoint:** POST /

**Description:** Creates a new product.

**Request:**

- **Headers:** Content-Type: application/json
- **Body:**

```json
{
  "name": "New Product",
  "original_price": 20000,
  "price": 18000,
  "merchant_id": 1
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

### 4. Update a Product

**Endpoint:** PUT /:id

**Description:** Updates an existing product.

**Request:**

- **URL Parameters:**
  - id (integer): The ID of the product to update.
- **Headers:** Content-Type: application/json
- **Body:**

```json
{
  "name": "Updated Product",
  "original_price": 21000,
  "price": 19000,
  "merchant_id": 2
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
  "error": "Product not found"
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

### 5. Delete a Product

**Endpoint:** DELETE /:id

**Description:** Deletes a product.

**Request:**

- **URL Parameters:**
  - id (integer): The ID of the product to delete.
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
  "error": "Product not found"
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
