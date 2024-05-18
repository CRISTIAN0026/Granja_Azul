import Payment from "../models/Payment.js";
import Product from "../models/Product.js";

export async function makePayment(req, res) {
  const { userId, productId } = req.body;
  const product = await Product.findById(productId);
  if (!product) {
    return res.status(404).send("Producto no encontrado");
  }
  const payment = new Payment({ userId, productId, amount: product.price });
  await payment.save();
  res.send("Pago realizado con éxito");
}
