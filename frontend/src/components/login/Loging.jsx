import React, { useContext } from "react";
import { TextField, Button, Container, Stack, Grid, Link } from "@mui/material";
import { useForm } from "../../utils/hooks.js";
import { loginUser } from "../../services/apiService.js";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext.js";
import axios from "axios";

// Componente para iniciar sesión
function Login() {
   let navigate = useNavigate();
   const context = useContext(AuthContext);

  async function loginUserCallback() {
    const { email, password } = values;
    const response = await loginUser({
      email,
      password,
    });

    if (response.success) {
      console.log("Token:", response.user.token);
      context.login(response.user);
      navigate("/");
    }
  }

   const { onChange, onSubmit, values } = useForm(loginUserCallback, {
     email: "",
     password: "",
   });
  
    return (
      <Container spacing={2} maxWidth="sm">
        <h3>Inicia sesión</h3>
        <p>Inicia sesión para acceder a los recursos!</p>
        <Stack spacing={2} paddingBottom={2}>
          <TextField
            label="Email"
            name="email"
            onChange={onChange}
            type="email"
          />
          <TextField
            label="Password"
            name="password"
            onChange={onChange}
            type="password"
          />
        </Stack>
        <Grid item>
          <Link
            style={{ textDecoration: "none" }}
            href="/register"
            variant="body2"
          >
            ¿No tienes cuenta? Regístrate
          </Link>
        </Grid>
        <Button
          style={{ marginTop: "20px" }}
          variant="contained"
          onClick={onSubmit}
        >
          Login
        </Button>
      </Container>
    );
}

export default Login;