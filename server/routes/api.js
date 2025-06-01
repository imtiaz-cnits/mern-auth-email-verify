import express from "express";
import {
    // isAuthenticated,
    login,
    logout,
    register,
    sendVerificationOTP,
    verifyEmail
} from "../controllers/AuthController.js";
import AuthMiddleware from "../middlewares/AuthMiddleware.js";

const apiRouter = express.Router();

// Authentication routes
apiRouter.post("/register", register);
apiRouter.post("/login", login);
apiRouter.post("/logout", logout);
apiRouter.post("/send-verification-otp", AuthMiddleware, sendVerificationOTP);
apiRouter.post("/verify-account", AuthMiddleware, verifyEmail);

export default apiRouter;