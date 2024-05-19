import { TextField, Button, Container, Stack, Typography, Grid, Link } from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
import { useForm } from "../utility/hooks";

// El componente para registrarse
function Register() {

    async function registerUserCallback() {
    console.log("CallBack hit");
    await registerUser();
  }

  const { onChange, onSubmit, values } = useForm(registerUserCallback, {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

    const [registerUser] = {
    
   variables: { registerInput: values },
  };

  return (
    <Container spacing={2} maxWidth="sm">
      <Typography variant="h6" style={{ fontWeight: 'bold', marginTop: '20px'}}>Registrarse</Typography>
      <p>Regístrate a continuación para crear una cuenta.</p>
      <Stack spacing={2} paddingBottom={2}>
        <TextField label="Username" name="username"  onChange={onChange}/>
        <TextField label="Email" name="email" onChange={onChange} type="email"/>
        <TextField label="Password" name="password" onChange={onChange} type="password" />
        <TextField label="Confirm password" name="confirmPassword" onChange={onChange} type="password" />
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
