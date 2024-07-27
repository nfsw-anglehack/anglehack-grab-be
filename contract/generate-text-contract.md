## Base URL

/generate-text

### Endpoint: /

#### Method: POST

#### Request Body

```json
{
  "driver_id": "string"
}
```

#### Response

##### Success (200 OK)

```json
{
  "id": "number",
  "name": "string",
  "story": "string"
}
```

##### Error (500 Internal Server Error)

```json
{
  "error": "string"
}
```

#### Description

This endpoint generates a story for a driver based on their reviews. It retrieves the reviews and driver details from the database, generates a prompt, and then uses a text generation service to create a story.

#### Example Request

```http
POST / HTTP/1.1
Host: example.com
Content-Type: application/json

{
  "driver_id": "12345"
}
```

#### Example Response

```json
{
  "id": 12345,
  "name": "John Doe",
  "story": "Once upon a time, John Doe received a lot of feedback from his passengers. ..."
}
```
