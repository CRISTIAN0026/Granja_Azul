import React, {useContext, useEffect, useState} from "react";
import {
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  Select,
  MenuItem,
  InputLabel,
    FormControl,
  Grid,
    Box,
  CardContent, Card, CardMedia, Typography
} from "@mui/material";
import { AuthContext } from "../../contexts/authContext";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../contexts/useCart.js";
import { getCartByUserId } from "../../services/apiService.js";


const PaymentForm = () => {
  const [cart, setCart] = useState(null);
  const { user } = useContext(AuthContext);
  const { removeItem, addItem } = useCart();
  let navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      const data = await getCartByUserId(user?.id);
      if (data && data.items) {
        setCart(data);
      }
    };

    fetchCart();
  }, [user?.id]);

  if (!cart || !cart.items) {
    return <div>No hay productos en el carrito</div>;
  }

  const totalCost = cart.items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );
  return (
    <Grid
      container
      justifyContent="space-around"
      style={{ padding: "20px 20px 20px 20px" }}
    >
      <Box style={{ flex: 0.5 }} marginRight="10px">
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
      <Box style={{ flex: 1 }}>
        <h2>Información de la tarjeta</h2>
        <TextField label="Correo electrónico" fullWidth />
        <TextField label="1234 1234 1234 1234" fullWidth />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <TextField label="MM / AA" style={{ width: "45%" }} />
          <TextField label="CVC" style={{ width: "45%" }} />
        </div>
        <TextField label="Nombre del titular de la tarjeta" fullWidth />
        <FormControl fullWidth>
          <InputLabel>País o región</InputLabel>
          <Select>
            <MenuItem value="Colombia">Colombia</MenuItem>
            {/* Agrega más opciones de país aquí */}
          </Select>
        </FormControl>
        <FormControlLabel
          control={<Checkbox />}
          label="Guardar mis datos de forma segura para un proceso de compra en un clic"
        />
        <TextField
          label="Introduce tu número de teléfono para crear una cuenta de Link y pagar con mayor rapidez en Granja Azul y en todos los comercios que acepten Link."
          fullWidth
        />
        <Button variant="contained" color="primary" fullWidth>
          Pagar
        </Button>

        <p>
          Al confirmar tu pago, permitirás que Granja Azul efectúe cargos
          conforme a las condiciones estipuladas.
        </p>
      </Box>
    </Grid>
  );
};

export default PaymentForm;
