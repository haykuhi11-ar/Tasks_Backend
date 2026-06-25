# E-Commerce API

A scalable backend REST API for an e-commerce platform built with **Node.js, Express, Sequelize, and PostgreSQL**.  
It includes authentication, role-based access, product management, cart system, orders, and reviews.

---

## Tech Stack

- Node.js
- Express.js
- PostgreSQL
- Sequelize ORM
- JWT Authentication
- bcrypt (password hashing)
- Zod (validation middleware)
- dotenv

---

### Structure
```yaml
src/  
├── controllers/        # Request handlers  
├── services/           # Business logic  
├── routes/             # API routes  
├── models/             # Sequelize models  
├── middleware/         # Auth, admin, error handling, validation middleware  
├── utils/              # Helpers (JWT, bcrypt, errors)  
├── config/             # DB configuration  
├── app.js              # Express app setup   
└── server.js           # Entry point (listen)  

```

## API Documentation (Swagger)

This project uses Swagger for API documentation.

### Access Swagger UI:
http://localhost:3000/api-docs

---

### Features:
- Interactive API testing
- Request/response schema
- Auth & admin routes documentation
- Auto-generated from routes

---

### Setup

Swagger is already configured in:

```

src/docs/swagger.js
```
and loaded in:
```
app.js
```

## Environment Variables

All environment variables are documented in `.env.example` file.

 Copy it:

```bash
cp .env.example .env
```

---

## Installation

```bash
npm install
```

---

## Run Project

### Development

```bash
npm run dev
```

### Production

```bash
npm start
```

---

## Database Migration

```bash
npx sequelize-cli db:migrate
```

---

## Security Features

- Password hashing (bcrypt)
- JWT authentication
- Role-based access control (RBAC)
- Input validation (Zod)
- Centralized error handling
- Sequelize ORM (prevents SQL injection)

---

## Notes

- All sensitive data is stored in `.env`
- Database connection uses Sequelize
- Admin routes are protected
- Cart is automatically created on user registration
```
