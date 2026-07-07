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
- **Runtime Environment:** Node.js
- **Framework:** Express.js
- **Database ODM:** MongoDB & Mongoose
- **Security Middleware:** express-mongo-sanitize

---

## Installation & Setup Steps

Follow these simple steps in your terminal to clone and run the project locally:

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd ecommerce-api
Install the dependencies:Bashnpm install
Configure the environment variables:Create a .env file in the root directory of your project and copy the configuration keys outlined in the Environment Variables section below.Seed the database:Run the database seeder to wipe any existing records and populate the database with clean test data:Bashnpm run seed
Start the development server:Launch the application locally with auto-reload enabled:Bashnpm run dev
Environment VariablesSet up a .env file in your root folder with the following configuration keys:Variable NameRequiredDefault ValueFunctional Description / Context ScopePORTYes5000The network port where the backend server will listen for incoming requests.NODE_ENVYesdevelopmentDefines the environment mode (e.g., development or production).MONGO_URIYesmongodb://127.0.0.1:27017/ecommerce_dbThe connection string pointing directly to your local or cloud MongoDB database.API EndpointsCategories Route MapRoute URL PathTarget Description / Operational Request Result/api/categoriesCreates and saves a new product category with its name and description./api/categoriesRetrieves a list of all product categories saved in the database./api/categories/:idFetches the details of a single category matching the specified ID./api/categories/:idValidates and updates specific fields for an existing category./api/categories/:idCompletely removes a specific category from the database.Products Route MapRoute URL PathTarget Description / Operational Request Result/api/productsCreates a new product record and links it to an existing category ID./api/productsQueries the product catalog with support for searching, filtering, sorting, and pagination limits./api/products/:idFetches a specific product by its ID and includes fully populated category details./api/products/:idUpdates the information or inventory details of a specific product./api/products/:idDeletes a specific product from the database catalog.Shopping Cart Route MapRoute URL PathTarget Description / Operational Request Result/api/cartFetches the current user's cart items, populating product data and the total cart price./api/cart/itemsAdds a product to the cart or increments its quantity after checking stock availability./api/cart/items/:productIdUpdates the quantity of a specific product already inside the shopping cart./api/cart/items/:productIdRemoves a specific product line item entirely from the shopping cart./api/cartClears all items out of the cart and resets the total price to zero.Invoiced Orders Route MapRoute URL PathTarget Description / Operational Request Result/api/ordersConverts the current cart items into a finalized order and subtracts quantities from product stock./api/ordersRetrieves a historic list of all submitted orders for administrative review./api/orders/:idFetches the complete summary, items, and tracking details for a specific order ID./api/orders/:id/statusUpdates the fulfillment state of an order (e.g., moving it from Pending to Delivered).Project StructurePlaintextecommerce-api/
│
├── config/                 # Configuration files (Database gateway configurations)
│   └── db.js                  # Main MongoDB database connection script setup
│
├── utils/                  # Reusable system utility libraries and definitions
│   └── appError.js            # Centralized custom operational exception class
│
├── middleware/             # Network request filters and asynchronous handlers
│   ├── asyncHandler.js        # Redundancy stripper wrapping error catch blocks
│   └── errorHandler.js        # Global exception interceptor catching validation failures
│
├── models/                 # Database schema templates mapping collection entities
│   ├── Category.js            # Category structure mapping with automatic slug generation
│   ├── Product.js             # Product profiles handling prices, stocks, and references
│   ├── Cart.js                # Relational dynamic matrix computing customer shopping lines
│   └── Order.js               # Immutable billing summaries logging confirmed transaction states
│
├── controllers/            # Core business workflows controlling endpoint logic
│   ├── categoryController.js  # Category persistence routines and structural mutations
│   ├── productController.js   # Execution engines controlling filtering, sorting, and lookups
│   ├── cartController.js      # Line item monitors handling quantity checks and prices
│   └── orderController.js     # Stock deduction processors handling final secure checkouts
│
├── routes/                 # Express endpoint pipeline managers and distributors
│   ├── categoryRoutes.js      # Target network pathways resolving category requests
│   ├── productRoutes.js       # Target network pathways resolving product parameters
│   ├── cartRoutes.js          # Route assignments distributing live shopping updates
│   └── orderRoutes.js         # Invoicing workflows controlling final purchasing gates
│
├── .env                       # Local contextual configuration environment secrets
├── .gitignore                 # Exclusion filter files hiding hidden folders and node_modules
├── app.js                     # Core application bootstrap runtime engine and server hub
├── package.json               # Manifest file registering dependencies and execution hooks
└── seed.js                    # Database purge script injecting clean demonstration d