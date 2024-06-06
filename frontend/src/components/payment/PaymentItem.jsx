import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Grid,
} from "@mui/material";

const PaymentItem = ({ item }) => {
  return (
    <Card sx={{ display: "flex", border: "2px black" }}>
      <CardMedia
        component="img"
        sx={{ width: 150 }}
        image={item.product.image}
        alt={item.product.name}
      />
      <CardContent sx={{ flex: 1 }}>
        <Typography component="div" variant="h5">
          {item.product.name}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" component="div">
          Cantidad: {item.quantity}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" component="div">
          Precio:
          {item.price.toLocaleString("es-CO", {
            style: "currency",
            currency: "COP",
            minimumFractionDigits: 0,
          })}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" component="div">
          Descripción: {item.product.description}
        </Typography>
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item>
            <Button href="/nuestras-aves" variant="contained" color="secondary">
              Volver a comprar
            </Button>
          </Grid>
          <Grid item>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
            >
              Precio total de los productos:{" "}
              {(item.price * item.quantity).toLocaleString("es-CO", {
                style: "currency",
                currency: "COP",
                minimumFractionDigits: 0,
              })}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default PaymentItem;
