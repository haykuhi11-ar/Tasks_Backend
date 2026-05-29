# API Key Task

## Overview

This project is a simple API Key authentication server built with:

- Node.js
- Express.js

The application demonstrates how API Key authentication and permission-based authorization work.

Clients authenticate using a custom `X-API-Key` header and receive access based on their permissions.

---


## Installation

### 1. Clone the repository

```bash
git clone <repository-url>
```

### 2. Install dependencies

```bash
npm install
```

---

## Start the Server

Run the server with:

```bash
node server.js
```

The server will start on:

```bash
http://localhost:3000
```

---

## Features

- API Key authentication
- Permission-based authorization
- Public route without authentication
- Protected GET route
- Protected POST route
- Middleware for API key validation
- Middleware factory for permission checking

---



## Routes

### Public Route

#### GET `/status`

Does not require an API key.

Example response:

```json
{
  "status": "Server is running"
}
```

---

### Get Products

#### GET `/products`

Requires `read` permission.

Example response:

```json
[
  {
    "id": 1,
    "name": "Laptop"
  },
  {
    "id": 2,
    "name": "Phone"
  }
]
```

---

### Create Product

#### POST `/products`

Requires `write` permission.

Example request body:

```json
{
  "name": "Keyboard"
}
```

Example response:

```json
{
  "id": 3,
  "name": "Keyboard"
}
```

---

## Example curl Requests

### Public Route

```bash
curl http://localhost:3000/status
```

---

### Successful GET Request

```bash
curl -H "X-API-Key: READ123" http://localhost:3000/products
```

---

### Successful POST Request

```bash
curl -X POST \
-H "Content-Type: application/json" \
-H "X-API-Key: ADMIN123" \
-d '{"name":"Keyboard"}' \
http://localhost:3000/products
```

---

## Authentication Flow

1. Client sends `X-API-Key` header
2. Middleware checks whether the key exists
3. Client information is attached to the request
4. Permission middleware checks required permission
5. Access is granted or rejected

---


## Reflection Questions

### How is API key authentication different from Basic Auth?

API key authentication uses a unique key assigned to a client or application.

Basic Auth uses a username and password combination encoded in Base64.

API keys are commonly used for server-to-server communication and APIs, while Basic Auth is more often used for simple user authentication.

---

### Why is API key authentication usually a poor choice for user-facing applications?

API keys are difficult to secure in frontend applications because users can inspect requests and extract the key.

Unlike user sessions or JWT authentication, API keys do not identify individual users well and cannot easily support login/logout functionality.

---

### What strategies can be used to keep API keys safe and to revoke them when leaked?

Common strategies include:

- Store keys in environment variables
- Never expose keys in frontend code
- Use HTTPS
- Rotate keys regularly
- Set expiration dates
- Use rate limiting
- Maintain a revocation or blacklist system
- Generate new keys if a leak is detected