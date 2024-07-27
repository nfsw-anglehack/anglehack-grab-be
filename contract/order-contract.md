# Orders API Service

This service provides endpoints to manage orders, including creating, retrieving, updating, and deleting orders.

## Base URL

/orders

## Endpoints

### 1. Get All Orders

**Endpoint:** GET /

**Description:** Retrieves a list of all orders.

**Request:**

- **Headers:** None

**Response:**

- **Status Code:** 200 OK
- **Content-Type:** application/json

**Body:**

```json
{
  "orders": [
    {
      "id": 1,
      "original_price": 50000,
      "total_price": 45000,
      "earned_point": 10,
      "item_count": 2,
      "merchant_id": 1,
      "driver_id": 2
    },
    {
      "id": 2,
      "original_price": 70000,
      "total_price": 65000,
      "earned_point": 15,
      "item_count": 3,
      "merchant_id": 2,
      "driver_id": 1
    }
  ]
}
```

### 2. Get a Single Order by ID

**Endpoint:** GET /:id

**Description:** Retrieves an order by its ID.

**Request:**

- **URL Parameters:**
  - id (integer): The ID of the order to retrieve.
- **Headers:** None

**Response:**

- **Status Code:** 200 OK
- **Content-Type:** application/json

**Body:**

```json
{
  "order": {
    "id": 1,
    "original_price": 50000,
    "total_price": 45000,
    "earned_point": 10,
    "item_count": 2,
    "merchant_id": 1,
    "driver_id": 2
  }
}
```

- **Status Code:** 404 Not Found
- **Content-Type:** application/json

**Body:**

```json
{
  "error": "Order not found"
}
```

### 3. Create a New Order

**Endpoint:** POST /

**Description:** Creates a new order.

**Request:**

- **Headers:** Content-Type: application/json
- **Body:**

```json
{
  "original_price": 60000,
  "total_price": 55000,
  "earned_point": 12,
  "item_count": 2,
  "merchant_id": 1,
  "driver_id": 3
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

### 4. Update an Order

**Endpoint:** PUT /:id

**Description:** Updates an existing order.

**Request:**

- **URL Parameters:**
  - id (integer): The ID of the order to update.
- **Headers:** Content-Type: application/json
- **Body:**

```json
{
  "original_price": 65000,
  "total_price": 60000,
  "earned_point": 14,
  "item_count": 3,
  "merchant_id": 2,
  "driver_id": 1
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
  "error": "Order not found"
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

### 5. Delete an Order

**Endpoint:** DELETE /:id

**Description:** Deletes an order.

**Request:**

- **URL Parameters:**
  - id (integer): The ID of the order to delete.
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
  "error": "Order not found"
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
