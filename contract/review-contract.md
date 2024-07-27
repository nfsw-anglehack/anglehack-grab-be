# Reviews API Service

This service provides endpoints to manage reviews, including creating, retrieving, updating, and deleting reviews.

## Base URL

/reviews

## Endpoints

### 1. Get All Reviews

**Endpoint:** GET /

**Description:** Retrieves a list of all reviews.

**Request:**

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
      "message": "Great service!",
      "rating": 5,
      "driver_id": 1
    },
    {
      "id": 2,
      "message": "Average experience.",
      "rating": 3,
      "driver_id": 2
    }
  ]
}
```

### 2. Get a Single Review by ID

**Endpoint:** GET /:id

**Description:** Retrieves a review by its ID.

**Request:**

- **URL Parameters:**
  - id (integer): The ID of the review to retrieve.
- **Headers:** None

**Response:**

- **Status Code:** 200 OK
- **Content-Type:** application/json

**Body:**

```json
{
  "review": {
    "id": 1,
    "message": "Great service!",
    "rating": 5,
    "driver_id": 1
  }
}
```

- **Status Code:** 404 Not Found
- **Content-Type:** application/json

**Body:**

```json
{
  "error": "Review not found"
}
```

### 3. Create a New Review

**Endpoint:** POST /

**Description:** Creates a new review.

**Request:**

- **Headers:** Content-Type: application/json
- **Body:**

```json
{
  "message": "Excellent service!",
  "rating": 5,
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

### 4. Update a Review

**Endpoint:** PUT /:id

**Description:** Updates an existing review.

**Request:**

- **URL Parameters:**
  - id (integer): The ID of the review to update.
- **Headers:** Content-Type: application/json
- **Body:**

```json
{
  "message": "Updated message",
  "rating": 4,
  "driver_id": 2
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
  "error": "Review not found"
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

### 5. Delete a Review

**Endpoint:** DELETE /:id

**Description:** Deletes a review.

**Request:**

- **URL Parameters:**
  - id (integer): The ID of the review to delete.
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
  "error": "Review not found"
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
