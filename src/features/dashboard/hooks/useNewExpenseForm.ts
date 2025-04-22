import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAppDispatch } from '@/app/redux/store';
import { useToast } from '@/components/ui/use-toast';
import { useEffect, useMemo, useRef } from 'react';
import { getTodayZeroHours } from '@/lib/date-utils';
import { saveExpense } from '../slice/dashboard-thunks';
import { Expense } from '@/types/expense-types';

const FormSchema = z.object({
  amount: z
    .union([
      z.number({ required_error: 'Amount should be filled.' }),
      z.string({ required_error: 'Amount should be filled.' }),
    ])
    .refine((val) => val !== '' && Number(val) > 0, {
      message: 'Amount should be greater than 0.',
    }),
  description: z
    .string({ required_error: 'Description should be informed.' })
    .min(1, { message: 'Description should be informed.' }),
  date: z.date({
    required_error: 'Date must be selected.',
  }),
  installments: z
    .number({ required_error: 'Installments should be selected.' })
    .min(1, { message: 'Installments should be selected.' }),
  currentInstallment: z
    .number({ required_error: 'Current installment should be selected.' })
    .min(1, { message: 'Current installment should be selected.' }),
  paymentMethodId: z
    .number({ required_error: 'Payment method should be selected.' })
    .min(1, { message: 'Payment method should be selected.' }),
  categoryId: z
    .number({ required_error: 'Category should be selected.' })
    .min(1, { message: 'Category should be selected.' }),
});

const defaultValues = {
  amount: '',
  description: '',
  date: getTodayZeroHours(),
  installments: 1,
  currentInstallment: 1,
  paymentMethodId: 1,
  categoryId: 1,
};

export type ExpenseFormSchema = z.infer<typeof FormSchema>;

export default function useNewExpenseForm({
  closeDialog,
  loadedDefaultValues,
}: {
  closeDialog: (expense: ExpenseFormSchema) => void;
  loadedDefaultValues?: Partial<z.infer<typeof FormSchema>>;
}) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { ...defaultValues, ...loadedDefaultValues },
  });
  const { toast } = useToast();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (loadedDefaultValues.paymentMethodId) {
      form.setValue('paymentMethodId', loadedDefaultValues.paymentMethodId);
    }
    if (loadedDefaultValues.categoryId) {
      form.setValue('categoryId', loadedDefaultValues.categoryId);
    }
  }, [loadedDefaultValues]);

  async function onSubmit(data: ExpenseFormSchema) {
    await dispatch(saveExpense(data as any)).unwrap();
    closeDialog(data);
    form.reset({ ...defaultValues });
    toast({
      description: 'Expense saved successfully.',
    });
  }

  return { form, onSubmit, isValid: form.formState.isValid };
}
