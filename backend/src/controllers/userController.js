import { Router } from "express";
const router = Router();
import { register, login } from "../services/userService.js";

router.post("/register", register);
router.post("/login", login);

export default router;
