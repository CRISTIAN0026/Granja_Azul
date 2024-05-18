import { TextField, Button, Container, Stack, Typography, Grid, Link } from "@mui/material";

// Componente para iniciar sesión
function Login() {
    return (
        <Container spacing={2} maxWidth="sm">
        <Typography variant="h6" style={{ fontWeight: 'bold', marginTop: '20px'}}>Iniciar sesión</Typography>
        <p>¡Inicie sesión a continuación!</p>
        <Stack spacing={2} paddingBottom={2}>
          <TextField label="Email" name="email" type="email"/>
          <TextField label="Password" name="password" type="password"/>
        </Stack>
        <Grid item>
                <Link style={{ textDecoration: 'none' }} href="/registrase" variant="body2">
                  {"¿No tienes cuenta? Regístrate"}
                </Link>
              </Grid>
        <Button style={{ marginTop: '20px', textTransform:'none' }} variant="contained" >Ingresar</Button>
      </Container>
    )
}

export default Login;