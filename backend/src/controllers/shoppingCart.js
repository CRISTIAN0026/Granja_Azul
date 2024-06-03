import { addItemToCart, removeItemFromCart } from "./controllers/cartController";

router.post("/cart", addItemToCart);
router.delete("/cart/:productId", removeItemFromCart);
