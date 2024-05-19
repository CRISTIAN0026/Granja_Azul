import { hash, compare } from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import "dotenv/config";

export async function register(req, res) {
  const { username, email, password, type } = req.body;
  if (!password) {
    return res.status(400).send("La contraseña es requerida");
  }
  const hashedPassword = await hash(password, 10);
  const user = new User({ username, email, type, password: hashedPassword });

  const token = jwt.sign({ user_id: user._id, email }, process.env.SECRET_KEY, {
    expiresIn: "4h",
  });

  user.token = token;
  await user.save();
  res.send({ success:true, message: "Usuario registrado con éxito", user: user });
}

export async function login(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).send("Error en la autenticación");
  }
  
  const isValid = compare(password, user.password);
  if (!isValid) {
    return res.status(400).send("Error en la autenticación");
  }
  const token = jwt.sign({ email: user.email }, "secret_key", {
    expiresIn: "4h",
  });

  res.send({
    success: true,
    message: "Autenticación satisfactoria",
    user: user,
  });
}
