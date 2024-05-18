import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import { Box, Grid } from "@mui/material";
import 'react-responsive-carousel/lib/styles/carousel.min.css';

// es el slider para mostrar imágenes en la pagina principal
const items = [
    {
      src: 'https://t2.ea.ltmcdn.com/es/razas/0/8/8/gallina-penedesenca_880_0_orig.jpg',
      altText: 'Nuestras aves',
      caption: 'Nuestras aves'
    },
    {
      src: 'https://estaticos-cdn.prensaiberica.es/clip/7bc8788b-e5a0-4f21-977a-32f965e6bf4f_16-9-discover-aspect-ratio_default_0.jpg',
      altText: 'Nuestras aves',
      caption: 'Nuestras aves'
    },
    {
      src: 'https://comprargallinero.com/wp-content/uploads/2021/02/araucana-gallina.jpg',
      altText: 'Nuestras aves',
      caption: 'Nuestras aves'
    }
  ];

const Slider = () => {
  return (
    <Box sx={{
        display:'flex',
        justifyContent:'center',
        marginTop:'50px'
    }}>
        <Grid container xs={9}>
    <Carousel
      showThumbs={false}
      showStatus={false}
      infiniteLoop
      autoPlay
      centerMode
      centerSlidePercentage={100}
      selectedItem={0}
    >
      {items.map((item) => (
        <div key={item.src}>
          <img src={item.src} alt={item.altText} />
          <p className="legend">{item.caption}</p>
        </div>
      ))}
    </Carousel>
    </Grid>
    </Box>
  );
};

export default Slider;









