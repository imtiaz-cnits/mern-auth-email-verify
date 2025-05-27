import express from "express";
import {login, logout, register} from "../controllers/AuthController.js";

const apiRouter = express.Router();

// Authentication routes
apiRouter.post("/register", register);
apiRouter.post("/login", login);
apiRouter.post("/logout", logout);

export default apiRouter;