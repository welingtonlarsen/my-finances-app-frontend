import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { ExpenseCard } from "./expense-card";
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { SummaryCard } from "./sumary-card";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { CURRENT_MONTH, YEAR_MONTHS } from "../../utils/month";
import CreateExpenseModal from "./create-expense-modal";
import { useLocation, useNavigate, useLoaderData } from "react-router-dom";
import { getCategories } from "../../services/categories-api";
import { getPaymentMethods } from "../../services/payment-methods";

const ExpenseList = ({ handleAddExpense }) => {
  return (
    <Grid2 xs={2} sx={{ maxHeight: "100vh", overflowY: "auto" }}>
      <FormControl sx={{ my: "10px", width: "100%" }} size="small">
        <Button
          onClick={handleAddExpense}
          sx={{ width: "100%" }}
          variant="contained"
          color="success"
          endIcon={<AddIcon />}
        >
          Incluir
        </Button>
      </FormControl>
      <Box sx={{ mb: "10px" }}>
        <ExpenseCard
          amount={200.79}
          description="Jonnis"
          paymentMethod="Cartão de crédito"
          category="Alimentação"
          installments={1}
          currentInstallment={1}
        />
      </Box>
      <Box sx={{ mb: "10px" }}>
        <ExpenseCard
          amount={200.79}
          description="Jonnis"
          paymentMethod="PIX"
          category="Alimentação"
          installments={1}
          currentInstallment={1}
        />
      </Box>
      <Box sx={{ mb: "10px" }}>
        <ExpenseCard
          amount={200.79}
          description="Jonnis"
          paymentMethod="Cartão de débito"
          category="Alimentação"
          installments={1}
          currentInstallment={1}
        />
      </Box>
      <Box sx={{ mb: "10px" }}>
        <ExpenseCard
          amount={200.79}
          description="Jonnis"
          paymentMethod="PIX"
          category="Alimentação"
          installments={1}
          currentInstallment={1}
        />
      </Box>
      <Box sx={{ mb: "10px" }}>
        <ExpenseCard
          amount={200.79}
          description="Jonnis"
          paymentMethod="Cartão de crédito"
          category="Alimentação"
          installments={1}
          currentInstallment={1}
        />
      </Box>
      <Box sx={{ mb: "10px" }}>
        <ExpenseCard
          amount={200.79}
          description="Jonnis"
          paymentMethod="Cartão de crédito"
          category="Alimentação"
          installments={1}
          currentInstallment={1}
        />
      </Box>
      <Box sx={{ mb: "10px" }}>
        <ExpenseCard
          amount={200.79}
          description="Jonnis"
          paymentMethod="Cartão de crédito"
          category="Alimentação"
          installments={1}
          currentInstallment={1}
        />
      </Box>
      <Box sx={{ mb: "10px" }}>
        <ExpenseCard
          amount={200.79}
          description="Jonnis"
          paymentMethod="Cartão de crédito"
          category="Alimentação"
          installments={1}
          currentInstallment={1}
        />
      </Box>
      <Box sx={{ mb: "10px" }}>
        <ExpenseCard
          amount={200.79}
          description="Jonnis"
          paymentMethod="Cartão de crédito"
          category="Alimentação"
          installments={1}
          currentInstallment={1}
        />
      </Box>
      <Box sx={{ mb: "10px" }}>
        <ExpenseCard
          amount={200.79}
          description="Jonnis"
          paymentMethod="Cartão de crédito"
          category="Alimentação"
          installments={1}
          currentInstallment={1}
        />
      </Box>
      <Box sx={{ mb: "10px" }}>
        <ExpenseCard
          amount={200.79}
          description="Jonnis"
          paymentMethod="Cartão de crédito"
          category="Alimentação"
          installments={1}
          currentInstallment={1}
        />
      </Box>
    </Grid2>
  );
};

const SummaryCards = () => {
  return (
    <Grid container>
      <Grid2 sx={{ m: "10px" }}>
        <SummaryCard paymentMethod="Cartão de crédito" amount={980.9} />
      </Grid2>
      <Grid2 sx={{ m: "10px" }}>
        <SummaryCard paymentMethod="PIX" amount={300.73} />
      </Grid2>
      <Grid2 sx={{ m: "10px" }}>
        <SummaryCard paymentMethod="Cartão de débito" amount={980.9} />
      </Grid2>
      <Grid2 sx={{ m: "10px" }}>
        <SummaryCard paymentMethod="Dinheiro" amount={980.9} />
      </Grid2>
    </Grid>
  );
};

const Dashboard = () => {
  const [month, setMonth] = useState(CURRENT_MONTH);
  const [showCreateExpenseModal, setShowCreateExpenseModal] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setShowCreateExpenseModal(false);
    const currentPath = location.pathname;
    if (currentPath.includes("/despesa")) setShowCreateExpenseModal(true);
    else setShowCreateExpenseModal(false);
  }, [location]);

  const handleMonthChange = (event) => {
    setMonth(event.target.value);
  };

  return (
    <Box>
      {showCreateExpenseModal && (
        <CreateExpenseModal
          open={showCreateExpenseModal}
          handleClose={() => {
            setShowCreateExpenseModal(false);
            navigate("/dashboard");
          }}
        />
      )}
      <Grid2 container>
        <ExpenseList handleAddExpense={() => navigate("/dashboard/despesa")} />
        <Grid2 xs={10}>
          <Grid2 container>
            <Grid2 xs={12}>
              <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <InputLabel id="demo-select-small-label">Mês</InputLabel>
                <Select
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  value={month}
                  label="Age"
                  onChange={handleMonthChange}
                >
                  {YEAR_MONTHS.map((month) => (
                    <MenuItem key={month} value={month}>
                      {month}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid2>
            <SummaryCards />
          </Grid2>
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default Dashboard;

export async function createExpenseModalLoader() {
  const categories = await getCategories();
  const paymentMethods = await getPaymentMethods();
  return {
    categories,
    paymentMethods,
  };
}
