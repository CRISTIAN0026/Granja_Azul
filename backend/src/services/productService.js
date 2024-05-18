import Product from "../models/Product.js";

export async function createProduct(req, res) {
  const { name, price } = req.body;
  const product = new Product({ name, price });
  await product.save();
  res.send("Producto creado con éxito");
}

export async function getProduct(req, res) {
  const { id } = req.params;
  const product = await Product.findById(id);
  if (!product) {
    return res.status(404).send("Producto no encontrado");
  }
  res.json(product);
}
