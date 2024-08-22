import Register from "../controllers/AuthController.js";
import express from "express";

const router = express.Router();

router.post("/register", Register);

export default router;
