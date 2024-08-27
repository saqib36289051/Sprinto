import { Register, Login } from "../controllers/AuthController.js";
import express from "express";

const router = express.Router();

router.post("/register", Register);
router.post("/login", Login);

export default router;
