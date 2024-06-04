import React, { useEffect, useState, useContext } from "react";
import { getCartByUserId } from "../../services/apiService.js";
import { AuthContext } from "../../contexts/authContext.js";
import { Card, CardContent, Typography, CardMedia, Box, Button, Grid } from "@mui/material";
import { useCart } from "../../contexts/useCart.js";

const CartItemsComponent = () => {
  const [cart, setCart] = useState(null);
    const { user } = useContext(AuthContext);
    const { removeItem, addItem } = useCart(); 

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
    console.log(cart)
     const handleCheckout = () => {
       console.log("Procediendo al pago...");
    };
    
    const handleRemoveToCart = async (itemId) => {
      console.log(itemId);
      await removeItem(itemId);
      const data = await getCartByUserId(user?.id);
      if (data && data.items) {
        setCart(data);
      }
    };

    const handleAddToCart = async (item) => {
      console.log(item);
      await addItem(item);
      const data = await getCartByUserId(user?.id);
      if (data && data.items) {
        setCart(data);
      }
    };

  return (
    <Grid container justifyContent="space-evenly">
      <Box>
        <h2>Tus productos</h2>
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
              <Button
                variant="contained"
                color="primary"
                sx={{
                  fontSize: "0.6rem",
                  padding: "4px 8px",
                  marginRight: "4px",
                }}
                onClick={() => handleAddToCart(item.product)}
              >
                Agregar más
              </Button>
              <Button
                variant="contained"
                color="secondary"
                sx={{ fontSize: "0.6rem", padding: "4px 8px" }}
                onClick={() => handleRemoveToCart(item._id)}
              >
                Eliminar del carrito
              </Button>
            </CardContent>
          </Card>
        ))}
      </Box>
      <Box>
        <h2>Resumen del pago</h2>
        {cart.items.map((item, index) => (
          <div key={index}>
            <h3>{item.product.name}</h3>
            <p>Cantidad: {item.quantity}</p>
            <p>
              Costo total del producto:{" "}
              {(item.product.price * item.quantity).toLocaleString("es-CO", {
                style: "currency",
                currency: "COP",
                minimumFractionDigits: 0,
              })}
            </p>
          </div>
        ))}
        <h3>
          Costo total del carrito:{" "}
          {totalCost.toLocaleString("es-CO", {
            style: "currency",
            currency: "COP",
            minimumFractionDigits: 0,
          })}
        </h3>
        <Button variant="contained" color="primary" onClick={handleCheckout}>
          Proceder al pago
        </Button>
      </Box>
    </Grid>
  );
};

export default CartItemsComponent;
