import React, { useContext, useState } from "react";
import { TextField, Button, Container, Stack } from "@mui/material";
import { useForm } from "../../utils/hooks.js";
import { loginUser } from "../../services/apiService.js";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext.js";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function FormChickens() {
  let navigate = useNavigate();
    const context = useContext(AuthContext);
    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
      setFile(event.target.files[0]);
    };


  async function loginUserCallback() {
    // const { name, price, description, amount } = values;
    // const formData = new FormData();
    // formData.append("image", file);

    // const response = await loginUser({
    //   name,
    //   price,
    //   amount,
    //   description,
    //   image: formData,
    // });

    // if (response.success) {
    //   context.login(response.user);
    //   navigate("/");
      // }
      const { name, price, description, amount } = values;
      const formData = new FormData();
      formData.append("name", name);
      formData.append("price", price);
      formData.append("amount", amount);
      formData.append("description", description);
      formData.append("image", file);

      const response = await loginUser(formData);

      if (response.success) {
        context.login(response.user);
        navigate("/");
      }
  }

  const { onChange, onSubmit, values } = useForm(loginUserCallback, {
    name: "",
    price: "",
    amount: "",
    description: "",
    image:null
  });
    console.log(values)
    console.log(file);
  return (
    <Container spacing={2} maxWidth="sm">
      <h3>Publica un producto</h3>
      <Stack spacing={2} paddingBottom={2}>
        <TextField
          label="Nombre del producto"
          name="name"
          onChange={onChange}
          type="text"
        />
        <TextField
          label="Precio"
          name="price"
          onChange={onChange}
          type="number"
        />
        <TextField
          label="Descripción"
          name="description"
          onChange={onChange}
          multiline
          rows={4}
          variant="outlined"
        />
        <TextField
          label="Cantidad disponible"
          name="amount"
          onChange={onChange}
          type="number"
        />
        <Button
          component="label"
          role={undefined}
          name="image"
          variant="contained"
          color="success"
          tabIndex={-1}
          onChange={handleFileChange}
          startIcon={<CloudUploadIcon />}
        >
          Subir imagen
          <VisuallyHiddenInput type="file" />
        </Button>
      </Stack>
      <Button
        style={{ marginTop: "20px" }}
        variant="contained"
        onClick={onSubmit}
      >
        Publicar
      </Button>
    </Container>
  );
}
