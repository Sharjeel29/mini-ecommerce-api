Mini E-Commerce API

A backend RESTful API built using NestJS, TypeORM, PostgreSQL, and JWT that simulates a basic online shopping platform.

🚀 Features
🔐 Authentication & Authorization

- User Registration

- User Login (JWT-based authentication)

- Role-Based Access Control (Admin / Customer)

- Fraud prevention via order cancellation limit (maximum 3 cancellations per user)

📦 Product Management (Admin Only)

- Add new products

- Update product details

- Delete products

- Manage and update product stock

🛒 Cart System (Customer Only)

- Add product to cart

- Remove product from cart

- Prevent duplicate cart entries (auto-increment quantity)

🧾 Order Processing

- Place order from cart

- Order total calculated on the backend

- Validate stock before order placement

- Prevent negative inventory

- Deduct stock after successful order creation

- Clear cart after order placement

- Cancel pending orders

- Restore stock upon cancellation

🧱 Core Entities

- User

- Product

- CartItem

- Order

- OrderItem

📏 Business Rules Implemented

- Customers cannot order more than available stock

- Order total is calculated server-side

- Stock is deducted only after successful order creation

- Stock is restored upon cancellation

- Users are blocked after 3 order cancellations (fraud prevention logic)

🛠 Tech Stack

- NestJS

- TypeORM

- PostgreSQL

- JWT Authentication

- Class Validator

⚙️ Setup Instructions
1️. Clone the repository
git clone https://github.com/Sharjeel29/mini-ecommerce-api.git

2. Install dependencies
npm install

3️. Configure database

Update PostgreSQL connection settings inside app.module.ts.

4️. Run the server
npm run start:dev


The server will run at:

http://localhost:3000

📬 API Testing

All API endpoints can be tested using Postman.

📌 Assumptions

Payment simulation is not implemented (optional bonus feature).

Database transactions were not implemented.

Admin order status update endpoint is not implemented (basic order status handling is included).

🎯 Submission Notes

This project fulfills all core functional requirements including authentication, role-based authorization, product management, cart operations, order processing, stock validation, and fraud prevention logic.
