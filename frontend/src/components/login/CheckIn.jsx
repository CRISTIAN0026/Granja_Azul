import { TextField, Button, Container, Stack, Typography, Grid, Link } from "@mui/material";
import MenuItem from '@mui/material/MenuItem';

// El componente para registrarse
function Register() {
  return (
    <Container spacing={2} maxWidth="sm">
      <Typography variant="h6" style={{ fontWeight: 'bold', marginTop: '20px'}}>Registrarse</Typography>
      <p>Regístrate a continuación para crear una cuenta.</p>
      <Stack spacing={2} paddingBottom={2}>
        <TextField label="Username" name="username"  />
        <TextField label="Email" name="email"  type="email"/>
        <TextField label="Password" name="password"  type="password"/>
        <TextField 
          id="outlined-select-currency"
          select
          label="Tipo"
          name="type"
          >
            {["client","admin"].map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}

          </TextField>
        <TextField label="Confirm password" name="confirmPassword" type="password" />
      </Stack>
       <Grid item>
                <Link style={{ textDecoration: 'none' }} href="/login" variant="body2">
                ¿Ya tienes una cuenta? Inicia sesión
                </Link>
              </Grid>
      <Button style={{ marginTop: '20px', textTransform:'none' }} variant="contained" >Registrarse</Button>
    </Container>
  );
}

export default Register;
