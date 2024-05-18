import pkg from "mongoose";
const { model, Schema } = pkg;

const productSchema = new Schema({
  name: String,
  precie:  Number,
});

export default model("Product", productSchema);
