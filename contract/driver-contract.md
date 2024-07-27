# Drivers API Service

This service provides endpoints to manage drivers and their reviews. It supports CRUD operations for drivers and allows retrieving reviews associated with specific drivers.

## Base URL

/drivers

## Endpoints

### 1. Get All Drivers

**Endpoint:** GET /

**Description:** Retrieves a list of all drivers.

**Request:**

- **Headers:** None

**Response:**

- **Status Code:** 200 OK
- **Content-Type:** application/json

**Body:**

```json
{
  "drivers": [
    {
      "id": 1,
      "name": "John Doe",
      "vehicle": "Toyota Avanza",
      "vehicle_number": "B1234XYZ"
    },
    {
      "id": 2,
      "name": "Jane Smith",
      "vehicle": "Honda CR-V",
      "vehicle_number": "B5678ABC"
    },
    {
      "id": 3,
      "name": "Carlos Santos",
      "vehicle": "Yamaha NMAX",
      "vehicle_number": "B9101DEF"
    }
  ]
}
```

### 2. Get a Single Driver by ID

**Endpoint:** GET /:id

**Description:** Retrieves a driver by their ID.

**Request:**

- **URL Parameters:**
  - id (integer): The ID of the driver to retrieve.
- **Headers:** None

**Response:**

- **Status Code:** 200 OK
- **Content-Type:** application/json

**Body:**

```json
{
  "driver": {
    "id": 1,
    "name": "John Doe",
    "vehicle": "Toyota Avanza",
    "vehicle_number": "B1234XYZ"
  }
}
```

- **Status Code:** 404 Not Found
- **Content-Type:** application/json

**Body:**

```json
{
  "error": "Driver not found"
}
```

### 3. Create a New Driver

**Endpoint:** POST /

**Description:** Creates a new driver.

**Request:**

- **Headers:** Content-Type: application/json
- **Body:**

```json
{
  "name": "Michael Johnson",
  "vehicle": "Suzuki Carry",
  "vehicle_number": "B1122GHI"
}
```

**Response:**

- **Status Code:** 201 Created
- **Content-Type:** application/json

**Body:**

```json
{
  "id": 4
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

### 4. Update a Driver

**Endpoint:** PUT /:id

**Description:** Updates an existing driver.

**Request:**

- **URL Parameters:**
  - id (integer): The ID of the driver to update.
- **Headers:** Content-Type: application/json
- **Body:**

```json
{
  "name": "Michael Johnson",
  "vehicle": "Suzuki Carry",
  "vehicle_number": "B3344JKL"
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
  "error": "Driver not found"
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

### 5. Delete a Driver

**Endpoint:** DELETE /:id

**Description:** Deletes a driver.

**Request:**

- **URL Parameters:**
  - id (integer): The ID of the driver to delete.
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
  "error": "Driver not found"
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

### 6. Get Reviews for a Specific Driver

**Endpoint:** GET /reviews/:id

**Description:** Retrieves reviews for a specific driver.

**Request:**

- **URL Parameters:**
  - id (integer): The ID of the driver whose reviews to retrieve.
- **Headers:** None

**Response:**

- **Status Code:** 200 OK
- **Content-Type:** application/json

**Body:**

```json
{
  "reviews": [
    {
      "id": 1,
      "message": "Excellent driving, very safe.",
      "rating": 5,
      "driver_id": 1
    },
    {
      "id": 2,
      "message": "Very punctual and friendly.",
      "rating": 4,
      "driver_id": 1
    },
    {
      "id": 3,
      "message": "Good service but could improve on communication.",
      "rating": 3,
      "driver_id": 1
    }
  ]
}
```

- **Status Code:** 404 Not Found
- **Content-Type:** application/json

**Body:**

```json
{
  "error": "No reviews found for this driver"
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
