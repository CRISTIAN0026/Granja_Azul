import express, { json } from "express";
import { connect } from "mongoose";
import userController from "./src/controllers/userController.js";
import paymentController from "./src/controllers/paymentController.js";
import productController from "./src/controllers/productController.js";
import "dotenv/config";


const startServer = async () => {
  await connect(process.env.DB);
  console.log("MongoDB Connected");
};

startServer();

const app = express();
app.use(json());

app.use("/user", userController);
app.use("/payment", paymentController);
app.use("/product", productController);

app.listen(3000, () => console.log("Servidor iniciado en el puerto 3000"));
