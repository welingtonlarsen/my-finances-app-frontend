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
import { useAppDispatch } from '@/app/redux/store';
import { fetchCategories, fetchPaymentMethods } from '../../slice/dashboard-thunks';
import { Plus } from 'lucide-react';

export function NewCategoryDialog() {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchPaymentMethods());
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="w-full flex items-center gap-2 justify-start pl-6"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            // Add your create category logic here
            // For example: openCreateCategoryDialog()
          }}
        >
          <Plus className="h-4 w-4" />
          Create category
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-auto py-10">
        <DialogHeader className="px-6">
          <DialogTitle>New category</DialogTitle>
          <DialogDescription>Include a new category to used with your expenses.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">{/* <ExpenseForm onSubmit={setOpen} /> */}</div>
      </DialogContent>
    </Dialog>
  );
}
