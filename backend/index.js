import express, { json } from "express";
import { connect } from "mongoose";
import userController from "./src/controllers/userController.js";
import paymentController from "./src/controllers/paymentController.js";
import productController from "./src/controllers/productController.js";
import shoppingCart from "./src/controllers/shoppingCart.js";
import cors from "cors";
import authMiddleware from "./src/middleware/auth.js";
import "dotenv/config";


const startServer = async () => {
  await connect(process.env.DB);
  console.log("MongoDB Connected");
};

startServer();

const PORT = process.env.PORT || 4000;
const corsOptions = {
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  optionsSuccessStatus: 200,
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
};

const app = express();
app.use(cors(corsOptions));
app.use(json());

app.use("/user", userController);
app.use("/payment", paymentController);
app.use("/api", productController);

app.use("/shopping", authMiddleware, shoppingCart);

app.listen(PORT, () => console.log("Servidor iniciado en el puerto 4000"));
