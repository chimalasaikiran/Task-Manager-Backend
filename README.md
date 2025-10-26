# TaskManager Backend

A RESTful Task Management backend using **Node.js, Express, MySQL**, with **JWT authentication**.

## Features

- User signup & login with JWT authentication
- CRUD tasks (Create, Read, Update, Delete)
- Tasks linked to users (`user_id`)
- Pagination, filtering by status, search, and sorting
- Error handling for invalid requests
- Fully tested with Postman

## Tech Stack

- Node.js, Express.js
- MySQL
- bcrypt, JSON Web Token
- express-validator
- CORS

## How to run locally

1. Clone the repo:

```bash
git clone https://github.com/<username>/TaskManager.git
cd TaskManager
npm install

2. Create .env file:

PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASS=yourpassword
DB_NAME=taskmanagerdb
JWT_SECRET=your_very_secret_key
JWT_EXPIRES_IN=2h
3. Run server:

node server.js

4. Test with Postman:

POST /api/auth/signup

POST /api/auth/login

GET /api/tasks (use JWT token)
