# E-Commerce Backend API

A complete, production-ready RESTful API built for e-commerce applications using Node.js, Express.js, MongoDB, and Mongoose. This project follows the MVC architecture and best practices, featuring centralized error handling, input data sanitization, dynamic query filtering, full shopping cart management, and order processing.

---

## Features
- **MVC Architecture:** Clean, modular, and maintainable codebase structure.
- **Categories API:** Full CRUD operations for managing product categories.
- **Products API:** Dynamic filtering (by category, price range, stock, search), full CRUD, and populated category details.
- **Cart API:** Real-time cart management with server-side price validation, stock validation, and total price calculation.
- **Orders API:** Complete checkout pipeline converting cart items into orders, updating product stock, and tracking status.
- **Security & Validation:** Protection against NoSQL injection using express-mongo-sanitize, schema validations, and global error handling via AppError.

---

## Tech Stack
- **Runtime Environment:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB
- **ODM:** Mongoose

---

## Environment Variables

| Variable | Description | Example Value |
| :--- | :--- | :--- |
| `PORT` | The port number on which the server runs | `5000` |
| `NODE_ENV` | The environment mode (development/production) | `development` |
| `MONGO_URI` | MongoDB connection string | `mongodb://127.0.0.1:27017/ecommerce_db` |

---

## Prerequisites & Installation

### Prerequisites
Make sure you have the following installed on your system:
- Node.js (v18 or higher)
- MongoDB
- npm (Node Package Manager)

### Installation Steps

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/EyadMo-2008/ecommerce-api.git](https://github.com/EyadMo-2008/ecommerce-api.git)
   cd ecommerce-api
Install dependencies:

Bash
npm install
Set up environment variables:
Create a .env file in the root directory based on the table above:

Code snippet
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://127.0.0.1:27017/ecommerce_db
Seed initial database (Optional):

Bash
npm run seed
Run the server:

For development mode:

Bash
npm run dev
For production mode:

Bash
npm start
API Endpoints List
Categories
GET /api/categories - Fetch all categories

GET /api/categories/:id - Fetch category by ID

POST /api/categories - Create a new category

PATCH /api/categories/:id - Update a category

DELETE /api/categories/:id - Delete a category

Products
GET /api/products - Get all products (Supports: ?category=, ?minPrice=, ?maxPrice=, ?inStock=, ?search=)

GET /api/products/:id - Get product by ID (Populates category)

POST /api/products - Create a product (Validates category existence)

PATCH /api/products/:id - Update product

DELETE /api/products/:id - Delete product

Cart
GET /api/cart - View cart items and total price

POST /api/cart/items - Add item to cart

PATCH /api/cart/items/:productId - Update item quantity

DELETE /api/cart/items/:productId - Remove item from cart

DELETE /api/cart - Clear entire cart

Orders
GET /api/orders - Get all orders

GET /api/orders/:id - Get order by ID

POST /api/orders - Checkout / Create order from cart

PATCH /api/orders/:id/status - Update order status (pending, confirmed, shipped, delivered, cancelled)

Project Structure
Plaintext
ecommerce-api/
├── config/             # Database and app configurations
│   ├── config.js
│   └── db.js
├── controllers/        # Request handlers and business logic
│   ├── categoryController.js
│   ├── productController.js
│   ├── cartController.js
│   └── orderController.js
├── middleware/         # Custom Express middlewares
│   ├── asyncHandler.js
│   └── errorHandler.js
├── models/             # Mongoose schemas
│   ├── Category.js
│   ├── Product.js
│   ├── Cart.js
│   └── Order.js
├── postman/            # Postman collection folder
│   └── postman_collection.json
├── routes/             # Express API route definitions
│   ├── categoryRoutes.js
│   ├── productRoutes.js
│   ├── cartRoutes.js
│   └── orderRoutes.js
├── utils/              # Utility functions and AppError class
│   └── appError.js
├── .gitignore
├── app.js
├── package.json
├── README.md
└── seed.js
API Testing (Postman)
An exported Postman Collection is located at postman/postman_collection.json. Import it into your Postman application to test all system endpoints seamlessly.
github link : https://github.com/EyadMo-2008/ecommerce-api.git
