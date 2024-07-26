import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAppDispatch } from '@/app/redux/store';
import { saveExpense } from '../slice/dashboard-slice';
import { useToast } from '@/components/ui/use-toast';
import { useEffect, useMemo, useRef } from 'react';

const FormSchema = z.object({
  amount: z
    .number({ required_error: 'Amount should be filled.' })
    .multipleOf(0.01)
    .min(0.01, { message: 'Amount should be greater than 0.' }),
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
  amount: undefined,
  description: '',
  date: new Date(),
  installments: 1,
  currentInstallment: 1,
  paymentMethodId: 1,
  categoryId: 1,
};

export default function useNewExpenseForm({
  closeDialog,
  loadedDefaultValues,
}: {
  closeDialog: () => void;
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

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    await dispatch(saveExpense(data as any)).unwrap();
    closeDialog();
    form.reset({ ...defaultValues });
    toast({
      description: 'Expense saved successfully.',
    });
  }

  return { form, onSubmit, isValid: form.formState.isValid };
}
