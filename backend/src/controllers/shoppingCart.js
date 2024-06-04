import { Router } from "express";
const router = Router();
import {
  addItemToCart,
  removeItemFromCart,
  getCartByUserId
} from "../services/shoppingCartService.js";

router.get("/cart/:userId", getCartByUserId);
router.post("/cart", addItemToCart);
router.delete("/cart/:itemId", removeItemFromCart);

export default router;
