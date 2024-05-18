import { 
Grid, 
Typography, 
Card, 
CardContent, 
CardMedia } from "@mui/material";

// Sobre nosotros
export default function About(){
  

  return (
    <Grid container spacing={2} justifyContent='center' marginTop='30px'>
            <Card key={"name"} sx={{ maxWidth: 945, marginBottom: '20px', marginLeft:'20px'}}>
            <CardMedia
            sx={{ height: 140 }}
            image="https://scontent-bog1-1.xx.fbcdn.net/v/t39.30808-6/275261738_409477000997216_3408473500554677389_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=e3f864&_nc_ohc=XLCVfQofl8YAX8y_5iz&_nc_ht=scontent-bog1-1.xx&oh=00_AfCELmAyz6mvzU-0BVf9Y6vnO_HNpeZ3P5GKwLhcG2gAOA&oe=64D3C6FF"
            title="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Sobre nosotros
            </Typography>
            <Typography variant="body2" color="text.secondary">
            El gallo y la gallina son la subespecie doméstica de la especie Gallus gallus, 
            una especie de ave galliforme de la familia Phasianidae procedente del sudeste asiático. 
            Los nombres comunes son: gallo, para el macho; gallina, para la hembra, y pollo, para los subadultos.
            </Typography>
          </CardContent>
          </Card>
            </Grid>
  );
}