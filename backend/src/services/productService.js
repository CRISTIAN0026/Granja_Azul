import Product from "../models/Product.js";
import { v2 as cloudinary } from "cloudinary";
import "dotenv/config";

export async function createProduct(req, res) {
  const { name, price, description, amount } = req.body;
  const image = req.file;

  cloudinary.config({
    cloud_name: "huellitas2",
    api_key: "475484766429572",
    api_secret: `${process.env.ME_API_SECRET}`,
  });

  const uploadResult = await cloudinary.uploader
    .upload(image.path)
    .catch((error) => {
      console.log(error);
    });

  const optimizeUrl = cloudinary.url(uploadResult.public_id, {
    fetch_format: "auto",
    quality: "auto",
  });

  const autoCropUrl = cloudinary.url(uploadResult.public_id, {
    crop: "auto",
    gravity: "auto",
    width: 500,
    height: 500,
  });

  const product = new Product({
    name,
    price,
    description,
    amount,
    image: autoCropUrl,
  });

  await product.save();
  res.send({success: true, message:"Producto creado con éxito"});
}

export async function getProduct(req, res) {
  const { id } = req.params;
  const product = await Product.findById(id);
  if (!product) {
    return res.status(404).send("Producto no encontrado");
  }
  res.json(product);
}

export async function getAllProducts(req, res) {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).send("Error al obtener los productos");
  }
}