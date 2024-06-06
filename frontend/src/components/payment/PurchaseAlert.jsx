import React, { useState, useEffect } from "react";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";

const PurchaseAlert = ({ severity, title, message }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      window.location.href = "/mis-compras";
    }, 4000);

    return () => clearTimeout(timer); 
  }, []);

  return (
    <Stack sx={{ width: "100%" }} spacing={2}>
      {visible && (
        <Alert severity={severity}>
          <AlertTitle>{title}</AlertTitle>
          {message}
        </Alert>
      )}
    </Stack>
  );
};

export default PurchaseAlert;
