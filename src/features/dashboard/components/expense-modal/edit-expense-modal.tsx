import { Modal } from '@/components/modal';
import { useModalContext } from '@/context/modal-context';
import { useMemo, useState } from 'react';
import ExpenseModalSteps from './expense-modal-steps';
import { CurrentStep } from './types/types';
import { ExpenseFormSchema } from '../../hooks/useNewExpenseForm';
import { useToast } from '@/components/ui/use-toast';
import useEditExpenseForm from './hooks/useEditExpenseForm';
import { Category, Expense } from '@/types/expense-types';
import { useAppDispatch, useAppSelector } from '@/app/redux/store';
import { saveCategory, updateExpense } from '../../slice/dashboard-thunks';
import { getCategories, getExpenses } from '../../slice/dashboard-selectors';
import useNewCategoryForm from './hooks/useNewCategoryForm';

interface TProps {
  expense: Expense;
}

export function EditExpenseModal({ expense }: TProps) {
  const [currentStep, setCurrentStep] = useState<CurrentStep>('EXPENSE_STEP');

  const dispatch = useAppDispatch();
  const { isUpdating: isUpdatingExpense } = useAppSelector(getExpenses);
  const { isSaving: isSavingCategory } = useAppSelector(getCategories);

  const { toast } = useToast();

  const { resolve } = useModalContext<ExpenseFormSchema>();

  const { form: expenseForm, isValid: isExpenseFormValid } = useEditExpenseForm({
    loadedDefaultValues: {
      amount: expense.amount,
      description: expense.description,
      date: new Date(expense.date),
      paymentMethodId: expense.paymentMethodId,
      categoryId: expense.categoryId,
    },
  });

  const { form: categoryForm, isValid: isCategoryFormValid } = useNewCategoryForm();

  const handleSubmit = async () => {
    if (currentStep === 'EXPENSE_STEP') {
      const formData = expenseForm.getValues();

      await dispatch(updateExpense({ id: expense.id, ...formData } as unknown as Partial<Expense>)).unwrap();

      toast({
        title: 'Expense updated',
        description: 'Your expense has been successfully updated.',
      });
      resolve(undefined);
      return;
    }

    if (currentStep === 'CATEGORY_STEP') {
      const formData = categoryForm.getValues();

      await dispatch(saveCategory(formData as Category)).unwrap();

      setCurrentStep('EXPENSE_STEP');
      toast({
        description: 'Category saved successfully.',
      });
    }
  };

  const primaryActionDisabled = useMemo(() => {
    if (currentStep === 'EXPENSE_STEP') {
      return !isExpenseFormValid;
    }

    if (currentStep === 'CATEGORY_STEP') {
      return !isCategoryFormValid;
    }

    return false;
  }, [currentStep, isCategoryFormValid, isExpenseFormValid]);

  return (
    <Modal.Root>
      <Modal.Header title="Edit expense" />
      <Modal.Content>
        <ExpenseModalSteps
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          expenseForm={expenseForm}
          categoryForm={categoryForm}
        />
      </Modal.Content>
      <Modal.Footer
        onSubmit={handleSubmit}
        isLoading={isUpdatingExpense || isSavingCategory}
        primaryActionDisabled={primaryActionDisabled}
      />
    </Modal.Root>
  );
}
