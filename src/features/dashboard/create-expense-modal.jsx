import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useLoaderData } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';

export default function CreateExpenseModal({open, handleClose}) {
  const data = useLoaderData()

  if(!data) return

  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      amount: 100.50,
      date: "2023-01-05",
      categoryId: '',
      paymentMethodId: 1,
      installments: 2,
      currentInstallment: 2,
      description: "Teste"
    }
  });

  const onSubmit = data => {
    console.log(data);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
        <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
        </DialogContentText>
        <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
        />

        <form onSubmit={handleSubmit(onSubmit)}>
          
          <FormControl fullWidth margin="normal">
            <InputLabel>Category</InputLabel>
            <Controller
              name="categoryId"
              control={control}
              render={({ field }) => (
                <Select {...field} label="Category">
                  {data.categories.map(category => (
                    <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>
                  ))}
                </Select>
              )}
            />
          </FormControl>
          
        </form>

        </DialogContent>
        <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit(onSubmit)}>Subscribe</Button>
        </DialogActions>
    </Dialog>
  );
}