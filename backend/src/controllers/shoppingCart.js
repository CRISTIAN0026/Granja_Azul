import { Router } from "express";
const router = Router();
import {
  addItemToCart,
  removeItemFromCart,
  getCartByUserId,
  clearCart
} from "../services/shoppingCartService.js";
import authenticateJWT from "../middleware/auth.js";

router.get("/cart/:userId", getCartByUserId);
router.post("/cart", addItemToCart);
router.delete("/cart/:itemId", removeItemFromCart);
router.post("/clear", authenticateJWT, clearCart);

export default router;
