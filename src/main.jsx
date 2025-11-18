import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Toaster } from "react-hot-toast";

import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import RootLayout from './layouts/RootLayout.jsx';
import Home from './pages/Home.jsx';
import AddTransaction from './pages/AddTransaction.jsx';
import MyTransactions from './pages/MyTransactions.jsx';
import Reports from './pages/Reports.jsx';
import Profile from './pages/Profile.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import NotFound from './pages/NotFound.jsx';
import AuthProvider from './contexts/AuthProvider.jsx';
import PrivateRoute from './contexts/PrivateRoute.jsx';
import UpdateTransaction from './pages/UpdateTransaction.jsx';
import DeleteTransaction from './pages/DeleteTransaction.jsx';
import TransactionDetails from './pages/TransactionDetails.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: Home },

      {
        path: "/add",
        Component: () => (
          <PrivateRoute>
            <AddTransaction />
          </PrivateRoute>
        )
      },

      {
        path: "/transactions",
        Component: () => (
          <PrivateRoute>
            <MyTransactions />
          </PrivateRoute>
        )
      },

      // VIEW DETAILS
      {
        path: "/transaction/:id",
        Component: () => (
          <PrivateRoute>
            <TransactionDetails />
          </PrivateRoute>
        )
      },

      // UPDATE
      {
        path: "/transaction/update/:id",
        Component: () => (
          <PrivateRoute>
            <UpdateTransaction />
          </PrivateRoute>
        ),
      },

      // DELETE
      {
        path: "/transaction/delete/:id",
        Component: () => (
          <PrivateRoute>
            <DeleteTransaction />
          </PrivateRoute>
        )
      },

      {
        path: "/reports",
        Component: () => (
          <PrivateRoute>
            <Reports />
          </PrivateRoute>
        )
      },

      {
        path: "/profile",
        Component: () => (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        )
      }
    ]
  },

  { path: "/login", Component: Login },
  { path: "/signup", Component: Signup },
  { path: "*", Component: NotFound }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <AuthProvider>
     <>
          <RouterProvider router={router}></RouterProvider>
          <Toaster position="top-center" />   
        </>
     </AuthProvider>
  </StrictMode>,
)
