import { Box, Typography } from "@mui/material";
import { getDateFromISOString } from "../../utils/date";

const EXPENSE_COLOR = {
  "Cartão de crédito": "red",
  "Cartão de débito": "blue",
  PIX: "green",
  Dinheiro: "orange",
};

export const ExpenseCard = ({
  amount,
  description,
  paymentMethod,
  category,
  installments,
  currentInstallment,
  date,
}) => {
  return (
    <Box
      sx={{
        backgroundColor: "#F8FAFB",
        display: "flex",
        flexDirection: "column",
        padding: "10px",
        borderLeft: `5px solid ${EXPENSE_COLOR[paymentMethod]}`,
        borderRadius: "5px",
      }}
    >
      <Box sx={{ display: "flex" }}>
        <Typography sx={{ fontWeight: "bold", mr: "5px" }}>
          {`${description}`.toUpperCase()}
        </Typography>
        <Typography sx={{ fontSize: "15px" }} color="text.secondary">
          ({getDateFromISOString(date)})
        </Typography>
      </Box>
      <Typography color="text.secondary">R${amount}</Typography>
      <Typography color="text.secondary">{category}</Typography>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography sx={{ mr: "5px" }} color="text.secondary">
          {paymentMethod}
        </Typography>
        <Typography sx={{ fontSize: "12px" }} color="text.secondary">
          ({currentInstallment}/{installments})
        </Typography>
      </Box>
    </Box>
  );
};
