import express from "express";
import {
    isAuthenticated,
    login,
    logout,
    register, resetPassword, sendResetPasswordOTP,
    sendVerificationOTP,
    verifyEmail
} from "../controllers/AuthController.js";
import AuthMiddleware from "../middlewares/AuthMiddleware.js";
import {getUserData} from "../controllers/UserController.js";

const apiRouter = express.Router();

// Authentication routes
apiRouter.post("/register", register);
apiRouter.post("/login", login);
apiRouter.post("/logout", logout);
apiRouter.post("/send-verification-otp", AuthMiddleware, sendVerificationOTP);
apiRouter.post("/verify-email", AuthMiddleware, verifyEmail);
apiRouter.post("/is-auth", isAuthenticated);
apiRouter.post("/send-reset-otp", sendResetPasswordOTP);
apiRouter.post("/reset-password", resetPassword);

// User routes
apiRouter.get("/user-data", AuthMiddleware, getUserData);

export default apiRouter;
