import { Router } from "express";
const router = Router();
import {
  createProduct,
  getProduct,
  getAllProducts,
} from "../services/productService.js";


import multer from "multer";

const upload = multer({ dest: "uploads/" });

router.post("/create", upload.single("image"), createProduct);
router.get("/products", getAllProducts);
router.get("/:id", getProduct);


export default router;
