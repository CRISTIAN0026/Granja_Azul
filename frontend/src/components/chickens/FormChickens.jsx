import React, { useState } from "react";
import { TextField, Button, Container, Stack } from "@mui/material";
import { useForm } from "../../utils/hooks.js";
import { postProduct } from "../../services/apiService.js";
import { useNavigate } from "react-router-dom";
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
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };


  async function loginUserCallback() {

     const formData = new FormData();
     formData.append("name", values.name);
     formData.append("price", values.price);
     formData.append("description", values.description);
     formData.append("amount", values.amount);
     formData.append("image", image); 

     const response = await postProduct(formData);

     if (response.success) {
       navigate("/nuestras-aves");
     }
  }

  const { onChange, onSubmit, values } = useForm(loginUserCallback, {
    name: "",
    price: "",
    amount: "",
    description: "",
    image:""
  });

    
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
          onChange={handleImageChange}
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
