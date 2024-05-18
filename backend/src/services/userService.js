import { hash, compare } from "bcrypt";
import pkg from "jsonwebtoken";
const { sign } = pkg;
import User from "../models/User.js";

export async function register(req, res) {
  const { email, password } = req.body;
  const hashedPassword = await hash(password, 10);
  const user = new User({ email, password: hashedPassword });
  await user.save();
  res.send("Usuario registrado con éxito");
}

export async function login(req, res) {
    const { email, password } = req.body;
    console.log(email)
    const user = await User.findOne({ email });
    console.log(user)
  if (!user) {
    return res.status(400).send("Error en la autenticación");
  }
  const isValid = await compare(password, user.password);
  if (!isValid) {
    return res.status(400).send("Error en la autenticación");
  }
  const token = sign({ email: user.email }, "secret_key", {
    expiresIn: "1h",
  });
  res.json({ message: "Autenticación satisfactoria", token });
}
