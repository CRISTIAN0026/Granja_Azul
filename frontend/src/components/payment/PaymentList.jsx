import React, { useEffect, useState } from "react";
import { getPaymentsByUser } from "../../services/apiService.js";
import PaymentItem from "./PaymentItem";
import { Box, CircularProgress, Typography, Chip } from "@mui/material";

const getStatusColor = (status) => {
  switch (status) {
    case "pendiente":
      return "warning";
    case "enviado":
      return "info";
    case "recibido":
      return "success";
    default:
      return "default";
  }
};

const PaymentList = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await getPaymentsByUser();
        setPayments(response);
      } catch (error) {
        setError(
          error.response
            ? error.response.data.message
            : "Error fetching payments"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Box>
      {payments.length === 0 ? (
        <Typography>No se encontraron compras.</Typography>
      ) : (
        payments.map((payment) => (
          <Box
            key={payment._id}
            mb={2}
            padding="16px"
            border={1}
            borderColor="grey.300"
            borderRadius={2}
          >
            <Typography variant="subtitle1" gutterBottom>
              Fecha de compra {new Date(payment.timestamp).toLocaleDateString()}
            </Typography>
            <Chip
              label={
                payment?.status?.charAt(0).toUpperCase() + payment?.status?.slice(1)
              }
              color={getStatusColor(payment.status)}
              size="small"
              sx={{ mb: 1 }}
            />
            {payment.items.map((item) => (
              <PaymentItem key={item._id} item={item} />
            ))}
            <Typography
              sx={{ textAlign: "end", mt: 1 }}
              variant="subtitle1"
              gutterBottom
            >
              Total{" "}
              {payment.total.toLocaleString("es-CO", {
                style: "currency",
                currency: "COP",
                minimumFractionDigits: 0,
              })}
            </Typography>
          </Box>
        ))
      )}
    </Box>
  );
};

export default PaymentList;
