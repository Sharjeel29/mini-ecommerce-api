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


# 🗄️ Database Schema (ER Diagram)

The following ER diagram represents the database relationships used in this project:

<img width="550" height="803" alt="image" src="https://github.com/user-attachments/assets/e96c8c00-2264-4729-a465-0b1236abc6dd" />

It represents relationships between:

- Users
- Products
- Cart Items
- Orders
- Order Items

## 📬 API Testing (Postman)
<img width="1742" height="877" alt="image" src="https://github.com/user-attachments/assets/8f17363a-99fd-4d09-92bd-d04ce8a25326" />
<img width="1776" height="811" alt="image" src="https://github.com/user-attachments/assets/5698e763-c98e-4372-be59-ce80f5527575" />
<img width="1782" height="880" alt="image" src="https://github.com/user-attachments/assets/d3478fb8-b894-41a0-bc04-7ed5d60c8218" />



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

🎯 Submission Notes

This project fulfills all core functional requirements including authentication, role-based authorization, product management, cart operations, order processing, stock validation, and fraud prevention logic.
