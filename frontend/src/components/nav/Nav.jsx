import React, { useState } from 'react';
import { Grid, Button, Box, Paper } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import TwitterIcon from "@mui/icons-material/Twitter";
import GroupIcon from "@mui/icons-material/Group";
import IconButton from '@mui/material/IconButton';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NavBar from './NaBar';

// Para navegar en la pagina
export default function Nav() {
    const [buttonColor, setButtonColor] = useState(window.location.pathname);


    const inicio = '/',
        aves = '/nuestras-aves',
        nosotros = '/nosotros',
        login = "/login",
        registrarse = '/registrase';


  return (
    <Box>
      <Paper elevation={3}>
        <Grid
          container
          spacing={1}
          style={{ backgroundColor: "#F1F1F1", padding: 0 }}
        >
          <Grid
            container
            item
            md={4}
            xs={4}
            sx={{ display: "flex", alignItems: "center" }}
          >
            <img
              width="370px"
              height="120px"
              alt="logo"
              src={"../../image/gratis-png-gallina-thumbnail.png"}
            />
          </Grid>
          <Grid container item xs={12} md={4}>
            <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <Button
                href={inicio}
                sx={{
                  textTransform: "none",
                  backgroundColor:
                    buttonColor === inicio ? "#65BBFF " : "#EDF7FF",
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
                  backgroundColor:
                    buttonColor === aves ? "#65BBFF " : "#EDF7FF",
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
            {/* <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton href={login} color="primary">
      <AccountCircleIcon fontSize="large"/>
    </IconButton>
    </Box> */}
            <NavBar />
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
