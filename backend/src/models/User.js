import pkg from "mongoose";
const { model, Schema } = pkg;

const userSchema = new Schema({
  email: { type: String, unique: true },
  password: { type: String },
});

export default model("User", userSchema);
