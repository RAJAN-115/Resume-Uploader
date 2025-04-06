# API Documentation

This document provides detailed information about the REST API endpoints available in the Resume Uploader application.

## Base URL

```
http://localhost:8000/api
```

## Authentication

All protected endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

## Endpoints

### Authentication

#### Register User

```http
POST /auth/register
Content-Type: application/json

{
  "username": "string",
  "email": "string",
  "password": "string"
}
```

**Response** (200 OK)

```json
{
  "user": {
    "id": "string",
    "username": "string",
    "email": "string"
  },
  "token": "string"
}
```

#### Login User

```http
POST /auth/login
Content-Type: application/json

{
  "email": "string",
  "password": "string"
}
```

**Response** (200 OK)

```json
{
  "user": {
    "id": "string",
    "username": "string",
    "email": "string"
  },
  "token": "string"
}
```

### Resume Management

#### Upload Resume

```http
POST /resumes/upload
Content-Type: multipart/form-data
Authorization: Bearer <token>

file: <file>
```

**Response** (201 Created)

```json
{
  "id": "string",
  "filename": "string",
  "uploadDate": "string",
  "url": "string"
}
```

#### Get All Resumes

```http
GET /resumes
Authorization: Bearer <token>
```

**Response** (200 OK)

```json
{
  "resumes": [
    {
      "id": "string",
      "filename": "string",
      "uploadDate": "string",
      "url": "string"
    }
  ]
}
```

#### Get Single Resume

```http
GET /resumes/:id
Authorization: Bearer <token>
```

**Response** (200 OK)

```json
{
  "id": "string",
  "filename": "string",
  "uploadDate": "string",
  "url": "string"
}
```

#### Delete Resume

```http
DELETE /resumes/:id
Authorization: Bearer <token>
```

**Response** (200 OK)

```json
{
  "message": "Resume deleted successfully"
}
```

## Error Responses

### 400 Bad Request

```json
{
  "error": "Invalid input data"
}
```

### 401 Unauthorized

```json
{
  "error": "Please authenticate"
}
```

### 403 Forbidden

```json
{
  "error": "Access denied"
}
```

### 404 Not Found

```json
{
  "error": "Resource not found"
}
```

### 500 Internal Server Error

```json
{
  "error": "Internal server error"
}
```

## Rate Limiting

API requests are limited to:

- 100 requests per minute for authenticated users
- 20 requests per minute for unauthenticated users

## File Upload Restrictions

- Maximum file size: 5MB
- Allowed file types: .pdf, .doc, .docx
- File name length: maximum 255 characters

## Testing the API

You can use the provided Postman collection to test the API endpoints:

1. Import `ResumeUploaderAPI.postman_collection.json`
2. Set up environment variables:
   - `BASE_URL`: Your API base URL
   - `TOKEN`: Your authentication token

## WebSocket Events

The API also supports real-time updates through WebSocket connections:

### Connect

```javascript
const ws = new WebSocket('ws://localhost:8000');
```

### Events

1. **Resume Uploaded**

```json
{
  "event": "resume_uploaded",
  "data": {
    "id": "string",
    "filename": "string"
  }
}
```

2. **Resume Deleted**

```json
{
  "event": "resume_deleted",
  "data": {
    "id": "string"
  }
}
```

## API Versioning

The API uses URL versioning:

- Current version: v1
- Example: `/api/v1/resumes`

## CORS Configuration

The API allows requests from:

- `http://localhost:3000` (development)
- Your production domain

## Security

1. **Authentication**

   - JWT tokens
   - Token expiration: 24 hours
   - Refresh token mechanism

2. **Data Validation**

   - Input sanitization
   - File type validation
   - Size restrictions

3. **Rate Limiting**
   - IP-based rate limiting
   - User-based rate limiting

## Monitoring

The API includes:

- Request logging
- Error tracking
- Performance monitoring
- Usage statistics

## Support

For API support:

1. Check the [GitHub Issues](https://github.com/your-repo/issues)
2. Contact the development team
3. Refer to the [Code Explanation](CODE_EXPLANATION.md) document
