import { Schema, model } from "mongoose";

const PaymentSchema = new Schema({
  userId: String,
  productId: String,
  amount: Number,
  timestamp: { type: Date, default: Date.now },
});

const Payment = model("Payment", PaymentSchema);

export default Payment;
