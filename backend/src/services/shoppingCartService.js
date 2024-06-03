import { findOne, create } from "./models/Cart";

export async function addItemToCart(req, res) {
  const { productId, quantity } = req.body;

  let cart = await findOne({ user: req.user.id });
  if (!cart) {
    cart = await create({ user: req.user.id });
  }

  const itemIndex = cart.items.findIndex(
    (item) => item.product.toString() === productId
  );
  if (itemIndex > -1) {
    const productItem = cart.items[itemIndex];
    productItem.quantity += quantity;
    cart.items[itemIndex] = productItem;
  } else {
    cart.items.push({ product: productId, quantity });
  }

  await cart.save();
  res.status(200).json(cart);
}

export async function removeItemFromCart(req, res) {
  const { productId } = req.params;

  const cart = await findOne({ user: req.user.id });
  const itemIndex = cart.items.findIndex(
    (item) => item.product.toString() === productId
  );

  if (itemIndex > -1) {
    cart.items.splice(itemIndex, 1);
    await cart.save();
  }

  res.status(200).json(cart);
}
