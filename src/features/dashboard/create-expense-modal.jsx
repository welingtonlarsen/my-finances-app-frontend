import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useLoaderData, useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import InputAdornment from "@mui/material/InputAdornment";
import { Box } from "@mui/material";
import { createExpense } from "../../services/expenses-api";

const installments = [
  { id: 1, name: 1 },
  { id: 2, name: 2 },
  { id: 3, name: 3 },
  { id: 4, name: 4 },
  { id: 5, name: 5 },
  { id: 6, name: 6 },
  { id: 7, name: 7 },
  { id: 8, name: 8 },
  { id: 9, name: 9 },
  { id: 10, name: 10 },
  { id: 11, name: 11 },
  { id: 12, name: 12 },
];

const SelectComponent = ({ control, options, label, name }) => {
  if (!options) return;
  return (
    <FormControl variant="standard" sx={{ minWidth: "100px" }}>
      <InputLabel>{label}</InputLabel>
      <Controller
        rules={{ required: true }}
        name={name}
        control={control}
        render={({ field }) => (
          <Select {...field} label={label}>
            {options.map((option) => (
              <MenuItem key={option.id} value={option.id}>
                {option.name}
              </MenuItem>
            ))}
          </Select>
        )}
      />
    </FormControl>
  );
};

export default function CreateExpenseModal({ open, handleClose, handleSave }) {
  const data = useLoaderData();
  const navigate = useNavigate();

  if (!data) return;

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, touchedFields, isValid },
  } = useForm({
    defaultValues: {
      amount: undefined,
      categoryId: 1,
      paymentMethodId: 1,
      installments: 1,
      currentInstallment: 1,
      description: "",
    },
  });

  const onSubmit = async (data) => {
    // set loading true
    // post data
    // set loading false
    // redirect to /dashboard
    await createExpense({
      ...data,
      amount: Number(data.amount),
    });
    handleSave();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Gasto</DialogTitle>
      <DialogContent sx={{ minWidth: "550px" }}>
        <DialogContentText sx={{ mb: "30px" }}>
          Adicione o novo gasto.
        </DialogContentText>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Box sx={{ mb: "30px" }}>
              <Controller
                rules={{ required: "Data é obrigatório" }}
                name="date"
                control={control}
                render={({ field: { onChange, onBlur, value, ref } }) => (
                  <TextField
                    type="date"
                    label="Data"
                    InputLabelProps={{ shrink: true }}
                    onChange={onChange}
                    onBlur={onBlur}
                    selected={value}
                    inputRef={ref}
                    variant="standard"
                  />
                )}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "end",
                justifyContent: "space-between",
                mb: "30px",
              }}
            >
              <Controller
                rules={{ required: "Descrição é obrigatório", minLength: 3 }}
                name="description"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="description"
                    label="Descrição"
                    type="text"
                    variant="standard"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    placeholder="Descrição"
                  />
                )}
              />
              <SelectComponent
                control={control}
                options={data.categories}
                label="Categoria"
                name="categoryId"
              />
              <SelectComponent
                control={control}
                options={data.paymentMethods}
                label="Pagamento"
                name="paymentMethodId"
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "end",
                justifyContent: "space-between",
                mb: "30px",
                maxWidth: "450px",
              }}
            >
              <Controller
                rules={{ required: true }}
                name="amount"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="amount"
                    label="Valor"
                    type="number"
                    variant="standard"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">$</InputAdornment>
                      ),
                    }}
                    placeholder="Valor"
                    sx={{ maxWidth: "205px" }}
                  />
                )}
              />
              <SelectComponent
                control={control}
                options={installments}
                label="Parcela"
                name="currentInstallment"
              />
              <SelectComponent
                control={control}
                options={installments}
                label="Parcelas"
                name="installments"
              />
            </Box>
          </Box>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit(onSubmit)} disabled={!isValid}>
          Subscribe
        </Button>
      </DialogActions>
    </Dialog>
  );
}
