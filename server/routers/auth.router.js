import express from "express";
const router = express.Router();
import authController from "../controllers/auth.controller.js";

// POST: http://localhost:5000/api/v1/auth/signUp
router.post("/signup", authController.signUp);

// POST: http://localhost:5000/api/v1/auth/signin
// router.post("/signin", authController.signIn);

// GET: http://localhost:5000/api/v1/auth/verify/:token
router.get("/verify/:token", authController.verifyEmail);

export default router;
