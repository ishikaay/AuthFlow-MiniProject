# AuthFlow-MiniProject

A full-stack social blogging and user authentication web application built with **Node.js**, **Express.js**, and **MongoDB**. This project features secure password hashing, JWT-based cookie authentication, dynamic profile picture uploads using **Multer**, and an interactive post dashboard where users can create, like, and edit posts.

---

## 📁 Project Directory Structure

```text
Backend/
├── miniProject1/
│   ├── models/            # Mongoose schemas (User & Post)
│   ├── views/             # EJS templates (index, login, profile, edit, upload)
│   └── app.js             # Main server logic, routes, and middleware
├── config/
│   └── Multers/           # Multer disk storage configuration for image uploads
├── public/                # Static assets and uploaded profile pictures
└── README.md



🚀 Key Features
User Authentication: Secure signup and login flow featuring password encryption with bcrypt and token-based sessions handled via JSON Web Tokens (JWT) and cookie-parser.

Profile Picture Uploads: Custom avatar uploads powered by Multer with unique crypto-generated filenames to prevent server-side overwrites.

Interactive Post Dashboard: Users can share what's on their mind, view their personal post feed, toggle likes, and edit existing posts dynamically.

Data Persistence: Connected to MongoDB using Mongoose with populated schemas linking user accounts to their respective posts.

🛠️ Tech Stack
Backend: Node.js, Express.js

Database: MongoDB, Mongoose

Authentication: JSON Web Tokens (JWT), bcrypt

File Uploads: Multer, Crypto

Templating Engine: EJS

Styling: Tailwind CSS
