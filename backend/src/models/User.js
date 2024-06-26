import pkg from "mongoose";
const { model, Schema } = pkg;

const userSchema = new Schema({
  username: { type: String, default: null },
  email: { type: String, unique: true },
  password: { type: String },
  type: { type: String, enum: ["admin", "client"] },
  token: { type: String },
});

export default model("User", userSchema);
