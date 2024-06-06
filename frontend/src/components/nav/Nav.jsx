import React, { useState } from 'react';
import { Grid, Button, Box, Paper, Typography } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import TwitterIcon from "@mui/icons-material/Twitter";
import GroupIcon from "@mui/icons-material/Group";
import EggIcon from "@mui/icons-material/Egg";
import NavBar from './NaBar';

// Para navegar en la pagina
export default function Nav() {
    const [buttonColor, setButtonColor] = useState(window.location.pathname);


  const inicio = '/',
    aves = '/nuestras-aves',
    nosotros = '/nosotros';


  return (
    <Box>
      <Paper elevation={3}>
        <Grid
          container
          spacing={1}
          style={{ backgroundColor: "#F1F1F1", padding: 0, minHeight: "110px" }}
        >
          <Grid
            container
            item
            md={4}
            xs={4}
            sx={{ display: "flex", alignItems: "center" }}
          >
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="/"
              sx={{
                marginLeft: "50px",
                color: "black",
                textDecoration: "none",
              }}
            >
              Granja Azul
              <EggIcon
                sx={{ color: "#65BBFF", minWidth: "30px", minHeight: "40px" }}
              />
            </Typography>
          </Grid>
          <Grid container item xs={12} md={4}>
            <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <Button
                href={inicio}
                sx={{
                  textTransform: "none",
                  backgroundColor:
                    buttonColor === inicio ? "#65BBFF" : "#EDF7FF",
                  color: "black",
                }}
                startIcon={<HomeIcon color="primary" />}
              >
                Inicio
              </Button>
              <Button
                href={aves}
                sx={{
                  textTransform: "none",
                  color: "black",
                  backgroundColor: buttonColor === aves ? "#65BBFF" : "#EDF7FF",
                }}
                startIcon={<TwitterIcon color="primary" />}
              >
                Nuestras aves
              </Button>
              <Button
                href={nosotros}
                sx={{
                  textTransform: "none",
                  color: "black",
                  backgroundColor:
                    buttonColor === nosotros ? "#65BBFF " : "#EDF7FF",
                }}
                startIcon={<GroupIcon color="primary" />}
              >
                Nosotros
              </Button>
            </Box>
          </Grid>

          <Grid
            container
            item
            xs={12}
            md={4}
            sx={{ justifyContent: "flex-end" }}
          >
            <NavBar />
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
