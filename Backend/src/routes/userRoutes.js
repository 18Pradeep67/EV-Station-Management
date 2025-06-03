import express from "express";
import { signup, login, health } from "../controllers/usercontrollers.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/health",health);

export default router;