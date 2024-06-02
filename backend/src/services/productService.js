import Product from "../models/Product.js";
import { v2 as cloudinary } from "cloudinary";
import "dotenv/config";

export async function createProduct(req, res) {
  const { name, price, description, amount, image } = req.body;
  cloudinary.config({
    cloud_name: "huellitas2",
    api_key: "475484766429572",
    api_secret: `${process.env.ME_API_SECRET}`, // Click 'View Credentials' below to copy your API secret
  });

  
  // Upload an image
  const uploadResult = await cloudinary.uploader
    .upload(
      `${image}`,
      {
        public_id: "shoes",
      }
    )
    .catch((error) => {
      console.log(error);
    });

  console.log("OJO",uploadResult);

  // Optimize delivery by resizing and applying auto-format and auto-quality
  const optimizeUrl = cloudinary.url("shoes", {
    fetch_format: "auto",
    quality: "auto",
  });

  console.log(optimizeUrl);

  // Transform the image: auto-crop to square aspect_ratio
  const autoCropUrl = cloudinary.url("shoes", {
    crop: "auto",
    gravity: "auto",
    width: 500,
    height: 500,
  });

  console.log(autoCropUrl); 

  const product = new Product({
    name,
    price,
    description,
    amount,
    image: autoCropUrl,
  });

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

export async function getAllProducts(req, res) {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).send("Error al obtener los productos");
  }
}