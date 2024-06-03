import { useEffect, useState } from 'react';
import {
Grid, 
Typography, 
Card, 
CardContent, 
CardMedia, 
CardActions, 
Button } from "@mui/material";
import { getProducts } from "../../services/apiService";

// Muestra los animales
// por ahora usa una api externa de Rick y Morty
export default function Chickens(){
       const [data, setData] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const result = await getProducts();
      setData(result);
    };

    getData();
  }, []);
  

  return (
    <Grid container spacing={2} justifyContent="center" marginTop="30px">
      {data?.map(({ image, name, price, description, amount }) => (
        <Card
          key={name}
          sx={{ maxWidth: 345, marginBottom: "20px", marginLeft: "20px" }}
        >
          <CardMedia sx={{ height: 140 }} image={image} title="green iguana" />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {name}
            </Typography>
            <Typography gutterBottom variant="h6" component="div">
              {parseInt(price).toLocaleString("es-CO", {
                style: "currency",
                currency: "COP",
                minimumFractionDigits: 0,
              })}
            </Typography>

            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Comprar</Button>
            <Button size="small">Agregar al carrito</Button>
            <Button size="small">Ver</Button>
          </CardActions>
        </Card>
      ))}
    </Grid>
  );
}
