import { createBrowserRouter } from "react-router-dom";

import RootLayout from "./layouts/RootLayout";
import AuthLayout from "./layouts/AuthLayout";
import HomePage from "./features/home/pages/HomePage";
import LoginPage from "./features/auth/pages/LoginPage";
import RegisterPage from "./features/auth/pages/RegisterPage";
import ForgotPasswordPage from "./features/auth/pages/ForgotPasswordPage";
import ResetPasswordPage from "./features/auth/pages/ResetPasswordPage";
import ConfirmEmailPage from "./features/auth/pages/ConfirmEmailPage";
import ResendConfirmationPage from "./features/auth/pages/ResendConfirmationPage";
import AccountPage from "./features/auth/pages/AccountPage";
import SecurityPage from "./features/auth/pages/SecurityPage";
import { ProtectedRoute } from "./features/auth/components/ProtectedRoute";
import { AuthProvider } from "./features/auth/context/AuthContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthProvider>
        <RootLayout />
      </AuthProvider>
    ),
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "account",
        element: (
          <ProtectedRoute>
            <AccountPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "account/security",
        element: (
          <ProtectedRoute>
            <SecurityPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/",
    element: (
      <AuthProvider>
        <AuthLayout />
      </AuthProvider>
    ),
    children: [
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
      {
        path: "forgot-password",
        element: <ForgotPasswordPage />,
      },
      {
        path: "reset-password",
        element: <ResetPasswordPage />,
      },
      {
        path: "confirm-email",
        element: <ConfirmEmailPage />,
      },
      {
        path: "resend-confirmation",
        element: <ResendConfirmationPage />,
      },
    ],
  },
]);

export default router;
