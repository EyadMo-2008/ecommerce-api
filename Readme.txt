# E-Commerce Backend API

A complete, production-ready RESTful API built for e-commerce applications using Node.js, Express.js, MongoDB, and Mongoose. This project is built following clean architecture and best practices, featuring centralized error handling, input data sanitization, robust query filtering with pagination, full shopping cart management, and an automated database seeder.

---

## Features
- **Dynamic Category Management:** Full CRUD operations for product categories, featuring automated slug generation that formats titles into lowercase, hyphen-separated strings.
- **Advanced Product Catalog Search:** A flexible product querying engine supporting text search, granular multi-parameter filtering (by category, price ranges, and stock), custom sorting, and pagination with dynamic page limits.
- **Shopping Cart State System:** Real-time cart management that tracks active items, calculates totals dynamically, syncs updates automatically, and validates requests against current inventory levels to prevent overselling.
- **Secure Transactional Checkout:** A secure checkout pipeline that converts cart items into orders, generates unique order tracking numbers (formatted as `ORD-TIMESTAMP-RANDOM`), and performs atomic database updates to decrement stock.
- **Security & Data Validation:** Out-of-the-box protection against NoSQL injection attacks using dedicated middleware, combined with strict Mongoose schema validation rules and a global operational error interceptor (`AppError`).

---

## Tech Stack
# E-Commerce Backend API

A RESTful E-Commerce Backend API built with Node.js, Express, and MongoDB using the MVC architecture.

## Project Structure

ecommerce-api/
├── config/
│   ├── config.js
│   └── db.js
├── controllers/
│   ├── categoryController.js
│   ├── productController.js
│   ├── cartController.js
│   └── orderController.js
├── middleware/
│   ├── asyncHandler.js
│   └── errorHandler.js
├── models/
│   ├── Category.js
│   ├── Product.js
│   ├── Cart.js
│   └── Order.js
├── routes/
│   ├── categoryRoutes.js
│   ├── productRoutes.js
│   ├── cartRoutes.js
│   └── orderRoutes.js
├── utils/
│   └── appError.js
├── .env
├── .gitignore
├── app.js
├── package.json
├── README.md
└── seed.js
Features
MVC Architecture: Organized and maintainable codebase.

MongoDB Integration: Database modeling using Mongoose.

Security: Basic NoSQL injection prevention using express-mongo-sanitize.

Global Error Handling: Centralized error management system.

Tech Stack
Node.js: JavaScript runtime environment.

Express.js: Web framework for Node.js.

MongoDB: NoSQL Database.

Mongoose: ODM library for MongoDB.

Getting Started
Prerequisites
Make sure you have Node.js and MongoDB installed on your system.

Installation
Clone the repository:

Bash
git clone < https://github.com/EyadMo-2008/ecommerce-api.git>
Navigate to the project directory:

Bash
cd ecommerce-api
Install dependencies:

Bash
npm install
Create a .env file in the root directory and set your environment variables:

Code snippet
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://127.0.0.1:27017/ecommerce_db
Run the application:

For development mode:

Bash
npm run dev
For production mode:

Bash
npm start
github link : https://github.com/EyadMo-2008/ecommerce-api.git
