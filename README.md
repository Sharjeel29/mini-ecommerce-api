
📌 Mini E-Commerce API

A backend RESTful API built using NestJS, TypeORM, PostgreSQL, and JWT that simulates a basic online shopping platform.

🚀 Features
🔐 Authentication & Authorization

User Registration

User Login (JWT-based authentication)

Role-Based Access Control (Admin / Customer)

Fraud prevention via order cancellation limit (max 3 cancellations)

📦 Product Management (Admin Only)

Add new products

Update product details

Delete products

Manage product stock

🛒 Cart System (Customer Only)

Add product to cart

Remove product from cart

Prevent duplicate cart entries (auto-increment quantity)

🧾 Order Processing

Place order from cart

Order total calculated on backend

Validate stock before order

Prevent negative inventory

Deduct stock after successful order

Clear cart after order placement

Cancel pending orders

Restore stock on cancellation

🧱 Core Entities

User

Product

CartItem

Order

OrderItem

📏 Business Rules Implemented

Customers cannot order more than available stock

Order total is calculated server-side

Stock is deducted only after successful order creation

Stock is restored upon cancellation

Users are blocked after 3 order cancellations (fraud prevention)

🛠 Tech Stack

NestJS

TypeORM

PostgreSQL

JWT Authentication

Class Validator

⚙️ Setup Instructions

Clone the repository:

git clone https://github.com/Sharjeel29/mini-ecommerce-api.git


Install dependencies:

npm install


Configure PostgreSQL connection inside app.module.ts

Run the server:

npm run start:dev


Server runs on:

http://localhost:3000

📬 API Testing

API endpoints can be tested using Postman.

📌 Assumptions

Payment simulation is not implemented (optional bonus feature).

Database transactions were not implemented.

Order status update by admin is not implemented (basic status handling included).

🎯 Submission Notes

This project fulfills all core functional requirements including authentication, role-based authorization, business rule enforcement, stock management, and fraud prevention.

🚀 After Pasting This

Save README.md

Run:

git add README.md
git commit -m "Updated README"
git push
