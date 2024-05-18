import { Router } from "express";
const router = Router();
import { createProduct, getProduct } from "../services/productService.js";

router.post("/create", createProduct);
router.get("/:id", getProduct);

export default router;
