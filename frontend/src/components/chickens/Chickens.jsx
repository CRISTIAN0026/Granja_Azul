import { useEffect, useState } from 'react';
import {
Grid, 
Typography, 
Card, 
CardContent, 
CardMedia, 
CardActions, 
Button } from "@mui/material";

// Muestra los animales
// por ahora usa una api externa de Rick y Morty
export default function Chickens(){
    const [chickenData, setChickenData] = useState([]);

  useEffect(() => {
    fetch('https://rickandmortyapi.com/api/character/')
  .then(response => response.json())
  .then(data => setChickenData(data.results))
  }, [chickenData]);
  

  return (
    <Grid container spacing={2} justifyContent='center' marginTop='30px'>
        {chickenData.map(({image, name}) => (
            <Card key={name} sx={{ maxWidth: 345, marginBottom: '20px', marginLeft:'20px'}}>
            <CardMedia
            sx={{ height: 140 }}
            image={image}
            title="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
            El gallo y la gallina son la subespecie doméstica de la especie Gallus gallus, 
            una especie de ave galliforme de la familia Phasianidae procedente del sudeste asiático. 
            Los nombres comunes son: gallo, para el macho; gallina, para la hembra, y pollo, para los subadultos.
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
