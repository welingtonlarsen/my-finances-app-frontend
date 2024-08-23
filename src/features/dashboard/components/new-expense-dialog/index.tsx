import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Plus } from 'lucide-react';
import ExpenseForm from './expense-form';
import { useAppDispatch } from '@/app/redux/store';
import { fetchCategories, fetchPaymentMethods } from '../../slice/dashboard-thunks';

export function NewExpenseDialog() {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchPaymentMethods());
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="ml-auto gap-1" size="sm" onClick={() => setOpen(true)}>
          New expense
          <Plus className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-auto py-10">
        <DialogHeader className="px-6">
          <DialogTitle>New expense</DialogTitle>
          <DialogDescription>Include a new expense to your list.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <ExpenseForm onSubmit={setOpen} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
