# JWT Authentication Task

## Overview
This project is a simple JWT authentication system built with:
* **Node.js**
* **Express.js**
* **JSON Web Token (JWT)**
* **HTML / CSS / JavaScript** (Frontend)

The application allows users to:
1. Register
2. Login
3. Receive a JWT token
4. Access protected routes
5. View dashboard information
6. Logout

> **Note:** User data is stored in memory using a JavaScript array.

---

## Project Structure

```text
JWT-Task/
│
├── public/
│   ├── login.html
│   ├── register.html
│   ├── dashboard.html
│   └── style.css
│
├── src/
│   ├── middlewares/
│   │   ├── auth.middleware.js
│   │   ├── error.middleware.js
│   │   └── validation.middleware.js
│   │
│   ├── utils/
│   │   ├── AppError.js
│   │   ├── hash.js
│   │   └── token.js
│   │   
│   ├── auth.controller.js
│   ├── router.js
│   └── app.js
│
├── .env
├── package.json
├── package-lock.json
└── server.js

```

## Installation & Setup

### 1. Clone the repository
```bash
git clone <repository-url>
```

### 2. Install dependencies
```bash
npm install
```

### 3. Create environment variables
Create a `.env` file in the root directory:
```env
PORT=3001
JWT_SECRET=SECRET_KEY
```

### 4. Start the server

To run the server in development mode:
```Bash

npm run dev
```

### Package Scripts
```JSON

"scripts": {
  "dev": "nodemon server.js"
}
```

### API Endpoints
Register

    URL: /register

    Method: POST

    Description: Registers a new user.

Request Body:
```JSON

{
  "username": "alice",
  "email": "alice@example.com",
  "password": "123456"
}
```

Response:
```JSON

{
  "message": "User registered successfully"
}
```

###Login

    URL: /login

    Method: POST

    Description: Authenticates a user and returns a JWT token.

Request Body:
```JSON

{
  "email": "alice456@gmail.com",
  "password": "Alice456%"
}
```

Response:
```JSON

{
  "token": "JWT_TOKEN"
}
```

## Frontend Pages

   ### Register Page

    Username input

    Email input

    Password input

    Confirm password input

    Sends POST request to /register

   ### Login Page

    Email input

    Password input

    Sends POST request to /login

    Saves JWT token in sessionStorage

    Redirects to the dashboard

   ### Dashboard Page

    Protected content

    Fetches current user from /me

    Fetches posts from /posts

    Displays user information and posts

    Logout button clears the token from storage

### Authentication Flow

    User registers -> Password is hashed using bcrypt.

    User logs in -> Server generates JWT token.

    Token storage -> Token is saved in sessionStorage on the frontend.

    Requests -> Frontend sends token in Authorization header.

    Verification -> Backend verifies token using middleware.

    Access -> Protected routes become accessible.

### Technologies Used

    Node.js

    Express.js

    JSON Web Token

    bcrypt

    Nodemon

    HTML / CSS / JavaScript

   
## Screenshots

### Register Page

![Register Page](./screenshots/Screenshot%20from%202026-05-29%2008-55-19.png)

### Login Page

![Login Page](./screenshots/Screenshot%20from%202026-05-29%2008-55-46.png)

### Dashboard Page

![Dashboard Page](./screenshots/Screenshot%20from%202026-05-29%2008-57-50.png)

## Reflection Questions

### What are the three parts of a JWT and what does each one contain?

A JWT consists of three parts:

#### 1. Header

The header contains information about the token type and the algorithm used to sign the token.

Example:

```json id="29s3qb"
{
  "alg": "HS256",
  "typ": "JWT"
}
```

#### 2. Payload

The payload contains the data stored inside the token, such as user information or user ID.

Example:

```json id="1ztj2s"
{
  "id": 1,
  "email": "john@example.com"
}
```

#### 3. Signature

The signature is used to verify that the token has not been changed.

It is created using:

- Secret key

---

### Why is it important to set an expiration time on a JWT?

Setting an expiration time improves security.

If a token is stolen, it can only be used for a limited amount of time. After expiration, the user must log in again to receive a new token. This reduces the risk of unauthorized access.

---

### What are the trade-offs of storing the token in sessionStorage versus an httpOnly cookie?

#### sessionStorage

Advantages:

- Easy to use in frontend applications
- Token can be accessed directly with JavaScript

Disadvantages:

- Vulnerable to XSS attacks because JavaScript can access the token
- Token is removed when the browser tab is closed

#### httpOnly Cookie

Advantages:

- More secure against XSS attacks
- JavaScript cannot access the token

Disadvantages:

- More difficult to configure
- Can be vulnerable to CSRF attacks if not protected properly

---

### How would you handle logout if JWTs cannot be revoked once issued?

A common solution is:

- Remove the token from sessionStorage or cookies on logout
- Set a short expiration time for tokens

After logout, the client no longer sends the token, so protected routes become inaccessible.