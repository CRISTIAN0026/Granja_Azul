import { Router } from "express";
const router = Router();
import {
  createProduct,
  getProduct,
  getAllProducts,
} from "../services/productService.js";

router.post("/create", createProduct);
router.get("/products", getAllProducts);
router.get("/:id", getProduct);


export default router;
