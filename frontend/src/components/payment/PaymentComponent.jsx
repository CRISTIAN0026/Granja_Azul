import React, { useContext, useEffect, useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Box,
  CardContent,
  Card,
  CardMedia,
  Typography,
} from "@mui/material";
import { AuthContext } from "../../contexts/authContext";
import { getCartByUserId, createPayment } from "../../services/apiService.js";
import InputMask from "react-input-mask";
import PurchaseAlert from "./PurchaseAlert";
import { useCart } from "../../contexts/useCart.js";

const PaymentForm = () => {
  const [cart, setCart] = useState(null);
  const { user } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [cardName, setCardName] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const { clearCart } = useCart(); 

  const [purchaseCompleted, setPurchaseCompleted] = useState(false);
    
  useEffect(() => {
    const fetchCart = async () => {
      const data = await getCartByUserId(user?.id);
      if (data && data.items) {
        setCart(data);
      }
    };

    fetchCart();
  }, [user?.id]);

  useEffect(() => {
    setIsFormValid(
      email !== "" &&
        cardNumber.replace(/\s/g, "").length === 16 &&
        expiry.replace(/\s/g, "").length === 5 &&
        cvc.replace(/\s/g, "").length === 3 &&
        cardName !== ""
    );
  }, [email, cardNumber, expiry, cvc, cardName]);

  if (!cart || !cart.items) {
    return <div>No hay productos en el carrito</div>;
  }

  const totalCost = cart.items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  const captureEssentialData = (data) => {
    const { user, items } = data;

    const paymentData = {
      user: user,
      items: items.map((item) => ({
        product: item.product._id,
        quantity: item.quantity,
        price: item.product.price,
      })),
      total: items.reduce(
        (acc, item) => acc + item.product.price * item.quantity,
        0
      ),
    };

    return paymentData;
  };

  const essentialData = captureEssentialData(cart);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createPayment(essentialData);
      await clearCart()
      setPurchaseCompleted(true);
    } catch (error) {
      console.error(
        "Error al crear el pago:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <Grid
      container
      justifyContent="space-around"
      style={{ padding: "20px 20px 20px 20px" }}
      component="form"
      onSubmit={handleSubmit}
    >
      <Box marginRight="10px">
        {cart.items.map((item, index) => (
          <Card key={index} sx={{ marginBottom: 2, display: "flex" }}>
            <CardMedia
              component="img"
              sx={{ width: 151 }}
              image={item.product.image}
              alt={item.product.name}
            />
            <CardContent>
              <Typography variant="h5" component="div">
                {item.product.name}
              </Typography>
              <Typography color="text.secondary">
                Cantidad: {item.quantity}
              </Typography>
              <Typography color="text.secondary">
                Precio:{" "}
                {item.product.price.toLocaleString("es-CO", {
                  style: "currency",
                  currency: "COP",
                  minimumFractionDigits: 0,
                })}
              </Typography>
            </CardContent>
          </Card>
        ))}
        <Typography variant="h5" component="div" style={{ fontWeight: "bold" }}>
          Total:{" "}
          {totalCost.toLocaleString("es-CO", {
            style: "currency",
            currency: "COP",
            minimumFractionDigits: 0,
          })}
        </Typography>
      </Box>
      <Box sx={{ maxWidth: "400px" }}>
        <h2>Información de la tarjeta</h2>
        <TextField
          label="Correo electrónico"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <InputMask
          style={{ marginTop: "10px" }}
          mask="9999 9999 9999 9999"
          maskChar=" "
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
        >
          {(inputProps) => (
            <TextField {...inputProps} label="1234 1234 1234 1234" fullWidth />
          )}
        </InputMask>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "16px",
          }}
        >
          <InputMask
            mask="99 / 99"
            maskChar=" "
            value={expiry}
            onChange={(e) => setExpiry(e.target.value)}
          >
            {(inputProps) => (
              <TextField
                {...inputProps}
                label="MM / AA"
                style={{ width: "45%" }}
              />
            )}
          </InputMask>
          <InputMask
            mask="999"
            maskChar=" "
            value={cvc}
            onChange={(e) => setCvc(e.target.value)}
          >
            {(inputProps) => (
              <TextField {...inputProps} label="CVC" style={{ width: "45%" }} />
            )}
          </InputMask>
        </div>
        <TextField
          style={{ marginTop: "10px" }}
          label="Nombre del titular de la tarjeta"
          fullWidth
          value={cardName}
          onChange={(e) => setCardName(e.target.value)}
        />
        <TextField
          style={{ marginTop: "10px" }}
          label="País"
          fullWidth
          defaultValue="Colombia"
          disabled
        />
        <Button
          style={{ marginTop: "10px" }}
          variant="contained"
          color="primary"
          fullWidth
          type="submit"
          disabled={!isFormValid}
        >
          Pagar
        </Button>
        {purchaseCompleted && (
          <PurchaseAlert
            severity="success"
            title="Compra Exitosa"
            message="Tu compra se ha realizado correctamente. Serás redirigido a tus compras."
          />
        )}
        <p>
          Al confirmar tu pago, permitirás que Granja Azul efectúe cargos
          conforme a las condiciones estipuladas.
        </p>
      </Box>
    </Grid>
  );
};

export default PaymentForm;
