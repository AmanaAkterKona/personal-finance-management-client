# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.



# 🟢 FinEase – Personal Finance Management Web App

FinEase is a modern personal finance management application where users can track income, expenses, savings, budgets, and financial reports. It helps users visualize their financial health with charts, summaries, and detailed transaction management.  
This project demonstrates **React**, **Firebase Authentication**, **Express.js**, **MongoDB**, **JWT**, and **full CRUD operations**.

---

## 🔗 Live Site URL  
👉 **Client Live Link:** YOUR_CLIENT_URL_HERE  
👉 **Server Live Link:** YOUR_SERVER_URL_HERE  

---

## ⭐ Key Features

- 🔐 **Secure Authentication** using Firebase (Email/Password + Google Login)
- 💰 **Full Transaction Management** (Add, View, Update, Delete)
- 📊 **Interactive Financial Reports** with charts and monthly filters
- 🔄 **Real-time Protected Routes** (User stays logged in even after refresh)
- 🧮 **Dynamic Overview Section** displaying total balance, income & expenses
- 👤 **User Profile Page** with update options
- ✨ **Beautiful, responsive UI** with consistent design and modern components
- 🛡 **SweetAlert & Toast notifications** (no default browser alerts)
- 🔍 **Sorting & filtering** transactions (date/amount)
- 🌙 **Light/Dark mode** for enhanced UX

---

## 📚 Technologies Used

### **Client Side**
- React.js
- React Router DOM
- Firebase Authentication
- Axios
- Recharts (for charts)
- SweetAlert2 / React Hot Toast
- Tailwind CSS / DaisyUI (if used)
- Context API / Custom Hooks

### **Server Side**
- Node.js
- Express.js
- MongoDB & Mongoose / Native Driver
- CORS
- JWT Authentication (optional)
- Firebase Admin SDK (optional)

---

## 🧩 Core Features Breakdown

### 🔹 Authentication
- Email & Password login
- Google login option
- Register with photo URL, name, email, password
- Password validation (uppercase, lowercase, min 6 chars)
- Redirect to intended page after login

---

### 🔹 CRUD Operations
| Route | Description | Protected |
|-------|-------------|-----------|
| `/my-transactions` | View user transactions | Yes |
| `/add-transaction` | Add new transaction | Yes |
| `/transaction/:id` | View single transaction | Yes |
| `/transaction/update/:id` | Update transaction | Yes |

Each transaction contains:
