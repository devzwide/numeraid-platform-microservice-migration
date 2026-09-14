import { createBrowserRouter } from "react-router-dom";
import Identity from "./shared/auth/Identity";
import Register from "./shared/auth/pages/Register";
import Login from "./shared/auth/pages/Login";
import ConfirmEmail from "./shared/auth/pages/ConfirmEmail";
import ResendConfirmationEmail from "./shared/auth/pages/ResendConfirmationEmail";
import ForgotPassword from "./shared/auth/pages/ForgotPassword";
import ResetPassword from "./shared/auth/pages/ResetPassword";
import Logout from "./shared/auth/pages/Logout";

const router = createBrowserRouter([
    {
        path: "/auth",
        element: <Identity />,
        children: [
            {
                path: "register",
                element: <Register />,
            },
            {
                path: "login",
                element: <Login />,
            },
            {
                path: "confirm-email",
                element: < ConfirmEmail />,
            },
            {
                path: "resend-confirmation-email",
                element: < ResendConfirmationEmail />,
            },
            {
                path: "forgot-password",
                element: <ForgotPassword />,
            },
            {
                path: "reset-password",
                element: <ResetPassword />,
            },
            {
                path: "logout",
                element: <Logout />,
            },
        ],
    },
]);

export default router;