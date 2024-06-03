import { Router } from "express";
const router = Router();
import {
  addItemToCart,
  removeItemFromCart,
} from "../services/shoppingCartService.js";

router.post("/cart", addItemToCart);
router.delete("/cart/:productId", removeItemFromCart);

export default router;
