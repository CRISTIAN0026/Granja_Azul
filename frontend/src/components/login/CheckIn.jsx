import React, { useContext } from "react";
import {
  TextField,
  Button,
  Container,
  Stack,
  Typography,
  Grid,
  Link,
} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { useForm } from "../../utils/hooks.js";
import { registerUser } from "../../services/apiService.js";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext.js";

// El componente para registrarse
function Register() {
  const context = useContext(AuthContext);
  const navigate = useNavigate();

  async function registerUserCallback() {
    const { username, email, password, type } = values;
    const response = await registerUser({
      username,
      email,
      password,
      type,
    });

    if (response.success) {
      context.login(response.user);
      navigate("/");
    }
  }

  const { onChange, onSubmit, values } = useForm(registerUserCallback, {
    username: "",
    email: "",
    password: "",
    type: "",
  });

  return (
    <Container spacing={2} maxWidth="sm">
      <Typography
        variant="h6"
        style={{ fontWeight: "bold", marginTop: "20px" }}
      >
        Registrarse
      </Typography>
      <p>Regístrate a continuación para crear una cuenta.</p>
      <Stack spacing={2} paddingBottom={2}>
        <TextField label="Username" name="username" onChange={onChange} />
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
        <TextField
          id="outlined-select-currency"
          select
          label="Tipo"
          name="type"
          value={values.type}
          onChange={onChange}
        >
          {["client", "admin"].map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
      </Stack>
      <Grid item>
        <Link style={{ textDecoration: "none" }} href="/login" variant="body2">
          ¿Ya tienes una cuenta? Inicia sesión
        </Link>
      </Grid>
      <Button
        style={{ marginTop: "20px", textTransform: "none" }}
        variant="contained"
        onClick={onSubmit}
      >
        Registrarse
      </Button>
    </Container>
  );
}

export default Register;
