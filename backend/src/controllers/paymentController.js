import express from "express";
import { createPayment, getPayments, getPaymentsByUser } from "../services/paymentService.js";
import authenticateJWT from "../middleware/auth.js";

const router = express.Router();

router.post("/create", createPayment);
router.get("/get", getPayments);
router.get("/user", authenticateJWT, getPaymentsByUser);

export default router;
