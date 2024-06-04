import ShoppingCart from "../models/ShoppingCart.js";

export async function addItemToCart(req, res) {
  try {
    const { _id, amount } = req.body;
    let cart = await ShoppingCart.findOne({ user: req.user.id });
    if (!cart) {
      cart = await ShoppingCart.create({ user: req.user.id });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === _id 
    );
    if (itemIndex > -1) {
      const productItem = cart.items[itemIndex];
      if (productItem.quantity < amount) {
        productItem.quantity += 1;
        cart.items[itemIndex] = productItem;
      } else {
        
        return res.status(400).json({ message: "Cantidad máxima alcanzada" });
      }
    } else {
      cart.items.push({ product: _id, quantity: 1 }); 
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Hubo un error al agregar el artículo al carrito" });
  }
}


export async function removeItemFromCart(req, res) {
  const { itemId } = req.params;
  console.log(itemId);
  const cart = await ShoppingCart.findOne({ user: req.user.id });

  const itemIndex = cart.items.findIndex(
    (item) => item._id.toString() === itemId
  );

  if (itemIndex > -1) {
    cart.items.splice(itemIndex, 1);
    await cart.save();
  }

  res.status(200).json(cart);
}


export const getCartByUserId = async (req, res) => {
  
  try {
    const cart = await ShoppingCart.findOne({
      user: req.params.userId,
    }).populate("items.product");
    if (!cart) {
      return res.status(404).json({ message: "Carrito no encontrado" });
    }
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};