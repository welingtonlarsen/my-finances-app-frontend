import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAppDispatch } from '@/app/store';
import { saveExpense } from './dashboard-slice';
import { useToast } from '@/components/ui/use-toast';
import { Expense } from '@/types/expense-types';

const FormSchema = z.object({
  amount: z
    .number({ required_error: 'Amount should be filled.' })
    .multipleOf(0.01)
    .min(0.01, { message: 'Amount should be greater than 0.' }),
  description: z
    .string({ required_error: 'Description should be informed.' })
    .min(1, { message: 'Description should be informed.' }),
  date: z.string({ required_error: 'Date must be selected.' }).min(2, { message: 'Date must be selected.' }),
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
  date: '',
  installments: 0,
  currentInstallment: 0,
  paymentMethodId: 0,
  categoryId: 0,
};

export default function useNewExpenseForm({ closeDialog }: { closeDialog: () => void }) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues,
  });
  const { toast } = useToast();
  const dispatch = useAppDispatch();

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log({ data });
    await dispatch(saveExpense(data as any)).unwrap();
    closeDialog();
    form.reset({ ...defaultValues });
    toast({
      description: 'Expense saved successfully.',
    });
  }

  return { form, onSubmit, isValid: form.formState.isValid };
}
