import { Schema, model } from "mongoose";

const PaymentSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  items: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
      quantity: {
        type: Number,
        default: 1,
      },
      price: {
        type: Number,
        required: true,
      },
    },
  ],
  total: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["pendiente", "enviado", "recibido"], 
    default: "pendiente",
  },
  timestamp: { type: Date, default: Date.now },
});

const Payment = model("Payment", PaymentSchema);

export default Payment;
