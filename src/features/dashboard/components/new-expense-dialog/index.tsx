import { useEffect, useMemo, useState } from 'react';
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
import NewExpenseDialogSteps from './new-expense-dialog-steps';
import { useAppDispatch } from '@/app/redux/store';
import { fetchCategories, fetchPaymentMethods } from '../../slice/dashboard-thunks';
import { CurrentStep } from './types/types';

export function NewExpenseDialog() {
  const [currentStep, setCurrentStep] = useState<CurrentStep>('EXPENSE_STEP');

  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchPaymentMethods());
  }, []);

  const title = useMemo(() => {
    if (currentStep === 'CATEGORY_STEP') return 'New category';
    return 'New expense';
  }, [currentStep]);

  const description = useMemo(() => {
    if (currentStep === 'CATEGORY_STEP') return 'Include a new category to use in your expenses.';
    return 'Include a new expense to your list.';
  }, [currentStep]);

  const handleOpenChange = (newOpenState: boolean) => {
    // If the dialog is closing (going from open to closed)
    if (open && !newOpenState) {
      // Reset to the initial step when closing the dialog
      setCurrentStep('EXPENSE_STEP');
    }

    // Update the open state
    setOpen(newOpenState);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button className="ml-auto gap-1" size="sm" onClick={() => setOpen(true)}>
          {title}
          <Plus className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-auto py-10">
        <DialogHeader className="px-6">
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <NewExpenseDialogSteps onSubmit={setOpen} currentStep={currentStep} setCurrentStep={setCurrentStep} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
