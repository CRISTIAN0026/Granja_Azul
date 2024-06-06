import Payment from "../models/Payment.js";

// Crear un nuevo pago
export const createPayment = async (req, res) => {
  try {
    const { user, items, total } = req.body;

    const newPayment = new Payment({
      user,
      items,
      total,
    });

    await newPayment.save();

    res.status(201).json(newPayment);
  } catch (error) {
    res.status(400).json({ message: "Error al crear el pago", error });
  }
};

// Obtener todos los pagos
export const getPayments = async (req, res) => {
  try {
    const payments = await Payment.find()
      .populate("user")
      .populate("items.product");
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los pagos", error });
  }
};

// Obtener un pago por ID
export const getPaymentById = async (req, res) => {
  try {
    const { id } = req.params;
    const payment = await Payment.findById(id)
      .populate("user")
      .populate("items.product");

    if (!payment) {
      return res.status(404).json({ message: "Pago no encontrado" });
    }

    res.status(200).json(payment);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el pago", error });
  }
};

// Obtener pagos por usuario
export const getPaymentsByUser = async (req, res) => {
  try {

    const payments = await Payment.find({ user: req.user.id })
      .populate("user")
      .populate("items.product");

    if (payments.length === 0) {
      return res.status(404).json({ message: 'No se encontraron pagos para este usuario' });
    }

    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los pagos por usuario', error });
  }
};