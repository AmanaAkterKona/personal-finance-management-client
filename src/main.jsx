import { StrictMode } from "react";

import { createRoot } from "react-dom/client";

import "./index.css";

import { Toaster } from "react-hot-toast";

import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

// Layouts

import RootLayout from "./layouts/RootLayout.jsx";

import DashboardLayout from "./layouts/DashboardLayout.jsx";

// Pages

import Home from "./pages/Home.jsx";

import AddTransaction from "./pages/AddTransaction.jsx";

import MyTransactions from "./pages/MyTransactions.jsx";

import Reports from "./pages/Reports.jsx";

import Profile from "./pages/Profile.jsx";

import Login from "./pages/Login.jsx";

import Signup from "./pages/Signup.jsx";

import NotFound from "./pages/NotFound.jsx";

import UpdateTransaction from "./pages/UpdateTransaction.jsx";

import DeleteTransaction from "./pages/DeleteTransaction.jsx";

import TransactionDetails from "./pages/TransactionDetails.jsx";

import TermsConditions from "./pages/TermsConditions.jsx";

import PrivacyPolicy from "./pages/PrivacyPolicy.jsx";

import About from "./pages/About.jsx";

import Contact from "./pages/Contact.jsx";

// Contexts & Auth

import AuthProvider from "./contexts/AuthProvider.jsx";

import PrivateRoute from "./contexts/PrivateRoute.jsx";

import AdminRoute from "./pages/AdminRoute.jsx";

import ManageUsers from "./pages/ManageUsers.jsx";

const router = createBrowserRouter([
  {
    path: "/",

    element: <RootLayout />,

    children: [
      { index: true, element: <Home /> },

      { path: "about", element: <About /> },

      { path: "contact", element: <Contact /> },

      { path: "terms", element: <TermsConditions /> },

      { path: "privacy", element: <PrivacyPolicy /> },

      {
        path: "profile",

        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
    ],
  },

  // Dashboard Sections

  {
    path: "/dashboard",

    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),

    children: [
      // ⬇️ এটি যোগ করা হয়েছে: ড্যাশবোর্ডে ঢুকলে সরাসরি Reports দেখাবে

      { index: true, element: <Reports /> },

      { path: "adminHome", element: <Reports /> },

      { path: "userHome", element: <Reports /> },

      { path: "add", element: <AddTransaction /> },

      { path: "transactions", element: <MyTransactions /> },

      { path: "details/:id", element: <TransactionDetails /> },

      { path: "update/:id", element: <UpdateTransaction /> },

      { path: "delete/:id", element: <DeleteTransaction /> },

      {
        path: "manageUsers",

        element: (
          <AdminRoute>
            <ManageUsers />
          </AdminRoute>
        ),
      },
    ],
  },

  { path: "/login", element: <Login /> },

  { path: "/signup", element: <Signup /> },

  { path: "*", element: <NotFound /> },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />

      <Toaster position="top-center" />
    </AuthProvider>
  </StrictMode>
);
