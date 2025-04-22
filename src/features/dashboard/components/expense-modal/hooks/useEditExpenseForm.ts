import { z } from 'zod';
import { useForm, UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { getTodayZeroHours } from '@/lib/date-utils';

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
  paymentMethodId: 1,
  categoryId: 1,
};

export type ExpenseFormSchema = z.infer<typeof FormSchema>;
export type ExpenseForm = UseFormReturn<ExpenseFormSchema>;

export default function useEditExpenseForm({
  loadedDefaultValues,
}: {
  loadedDefaultValues?: Partial<ExpenseFormSchema>;
}) {
  const form: ExpenseForm = useForm<ExpenseFormSchema>({
    resolver: zodResolver(FormSchema),
    defaultValues: { ...defaultValues, ...loadedDefaultValues },
  });

  return { form, isValid: form.formState.isValid };
}
