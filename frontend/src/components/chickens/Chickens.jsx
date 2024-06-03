import { useEffect, useState, useContext } from 'react';
import {
Grid, 
Typography, 
Card, 
CardContent, 
CardMedia, 
CardActions, 
Button } from "@mui/material";
import { getProducts } from "../../services/apiService";
import { useCart } from "../../contexts/useCart.js";
import { AuthContext } from "../../contexts/authContext.js";

// Muestra los animales
export default function Chickens() {
  const { user } = useContext(AuthContext);
  const [data, setData] = useState(null);
  const { addItem } = useCart(); 

  useEffect(() => {
    const getData = async () => {
      const result = await getProducts();
      setData(result);
    };

    getData();
  }, []);

  const handleAddToCart = (product) => {
    addItem(product); 
  };
  

  return (
    <Grid container spacing={2} justifyContent="center" marginTop="30px">
      {data?.map((product) => (
        <Card
          key={product.name}
          sx={{ maxWidth: 345, marginBottom: "20px", marginLeft: "20px" }}
        >
          <CardMedia
            sx={{ height: 140 }}
            image={product.image}
            title={product.name}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {product.name}
            </Typography>
            <Typography gutterBottom variant="h6" component="div">
              {parseInt(product.price).toLocaleString("es-CO", {
                style: "currency",
                currency: "COP",
                minimumFractionDigits: 0,
              })}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {product.description}
            </Typography>
            <Typography marginTop="5px" variant="body2" color="text.secondary">
              Cantidad disponible: {product.amount}
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              disabled={user?.type === "admin" ? true : false}
              size="small"
              variant="contained"
              color="primary"
            >
              Comprar
            </Button>
            <Button
              size="small"
              variant="outlined"
              color="primary"
              disabled={user?.type === "admin" ? true : false}
              onClick={() => handleAddToCart(product)}
            >
              Agregar al carrito
            </Button>
            <Button size="small" color="primary">
              Ver
            </Button>
          </CardActions>
        </Card>
      ))}
    </Grid>
  );
}
