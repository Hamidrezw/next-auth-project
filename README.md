# 🔐 Next.js Authentication System

A clean, secure authentication system built with **Next.js (App Router)**, **TypeScript**, **MongoDB**, and **JWT**. Users can sign up and log in with an **email or username** plus a password, and stay authenticated through secure HTTP-only cookies.

> Designed as a solid foundation you can build real apps on top of, such as a dashboard or an online shop.

---

## ✨ Features

- 📝 User registration (signup) with validation
- 🔑 Login with **email _or_ + password
- 🧂 Password hashing with **bcrypt**
- 🎟️ Stateless authentication using **JWT**
- 🍪 Token stored in **HTTP-only cookies** (protected from XSS access)
- 👤 `getme` endpoint to fetch the currently authenticated user
- 🧱 Typed codebase with **TypeScript**
- 🎨 Styled with **Tailwind CSS**

---

## 🛠️ Tech Stack

| Layer          | Technology                     |
| -------------- | ------------------------------ |
| Framework      | Next.js (App Router)           |
| Language       | TypeScript                     |
| Database       | MongoDB + Mongoose             |
| Auth           | JWT (`jsonwebtoken`)           |
| Hashing        | bcrypt                         |
| Styling        | Tailwind CSS                   |

---

## 📁 Project Structure

```
src/
├── app/                # Next.js App Router (pages & routes)
├── actions/
│   └── auth.ts         # Auth actions (signup / login logic)
├── components/
│   ├── AuthCard.tsx    # Shared card wrapper for auth forms
│   ├── Panel.tsx       # Layout panel
│   ├── SignIn.tsx      # Login form
│   └── SignUp.tsx      # Registration form
├── configs/
│   └── db.ts           # MongoDB connection
├── models/
│   └── user.ts         # Mongoose User model
├── utils/
│   └── auth.js         # Auth helpers (JWT, etc.)
└── validator/
    └── auth.ts         # Input validation for auth forms
```

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/<your-username>/<your-repo>.git
cd <your-repo>
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env.local` file in the project root:

```env
MONGODB_URI=mongodb://localhost:27017/auth-app
JWT_SECRET=your_super_secret_key
JWT_EXPIRES_IN=7d
```

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📡 API Reference

### `POST /api/auth/register`

Create a new user.

**Request body**

```json
{
  "username": "hamidreza",
  "email": "hamid@example.com",
  "password": "StrongPass123"
}
```

**Responses**

| Status | Meaning                              |
| ------ | ------------------------------------ |
| `201`  | User created successfully            |
| `400`  | Invalid or missing fields            |
| `409`  | Username or email already exists     |

---

### `POST /api/auth/login`

Log in with an email **or** a username.

**Request body**

```json
{
  "identifier": "hamidreza",
  "password": "StrongPass123"
}
```

**Responses**

| Status | Meaning                                   |
| ------ | ----------------------------------------- |
| `200`  | Logged in, JWT set in an HTTP-only cookie |
| `400`  | Missing fields                            |
| `401`  | Invalid credentials                       |

---

### `GET /api/auth/getme`

Returns the currently authenticated user (requires the auth cookie).

**Response `200`**

```json
{
  "user": {
    "id": "64f...",
    "username": "hamidreza",
    "email": "hamid@example.com"
  }
}
```

| Status | Meaning                    |
| ------ | -------------------------- |
| `200`  | Authenticated user data    |
| `401`  | Missing or invalid token   |

---

## 🔒 Security Notes

- Passwords are **never stored in plain text**; only bcrypt hashes are saved.
- The JWT lives in an **HTTP-only cookie**, so client-side JavaScript can't read it.
- In production, set cookies with `secure: true` and `sameSite: "lax"` (or `"strict"`).
- Keep `JWT_SECRET` long, random, and out of version control.
- Never commit `.env.local`.

---

## 🗺️ Roadmap

- [ ] Logout endpoint
- [ ] Protected routes via middleware
- [ ] Rate limiting on login
- [ ] Dashboard / shop built on top of this auth layer

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome. Feel free to open an issue or submit a pull request.

---

## 👨‍💻 Author

**Hamidreza**, Front-end Developer
🌐 [hamidrezanemti.ir](https://hamidrezanemti.ir)
