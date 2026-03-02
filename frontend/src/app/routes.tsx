import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from "./App.jsx";
import RegisterPage from "../modules/auth/pages/RegisterPage.jsx";
import LoginPage from "../modules/auth/pages/LoginPage.jsx";
import HomePage from "../modules/home/pages/index.jsx";
import NotFound from "../shared/components/NotFound.js";
import VerifyEmail from "../modules/auth/pages/VerifyEmailPage.js";
import ForgotPasswordPage from "../modules/auth/pages/ForgotPasswordPage.js";
import ResetPasswordPage from "../modules/auth/pages/ResetPasswordPage.js";
// import { useAppContext } from "../shared/context/index.js";

function Router() {
  // const { auth, isTokenExpired } = useAppContext();
  
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        { index: true, element: <HomePage /> },
        { 
          path: "/login",
          element: <LoginPage /> ,
        },
        {
          path: "/register",
          element: <RegisterPage />,
        },
        {
          path: "/auth/:userId/verify/:token",
          element: <VerifyEmail />,
        },
        {
          path: "/forgot-password",
          element: <ForgotPasswordPage />,
        },
        {
          path: "/auth/reset-password/:userId/:token",
          element: <ResetPasswordPage />,
        },
        { path: "/*", element: <NotFound /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default Router;