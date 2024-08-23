import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAppDispatch } from '@/app/redux/store';
import { useToast } from '@/components/ui/use-toast';
import { savePaymentMethod } from '../slice/dashboard-thunks';

const FormSchema = z.object({
  name: z.string({ required_error: 'Name should be informed.' }).min(1, { message: 'Name should be informed.' }),
  paymentType: z
    .string({ required_error: 'Payment type should be selected.' })
    .min(1, { message: 'Payment type should be selected.' }),
});

const defaultValues = {
  name: '',
  paymentType: '',
};

export default function useNewPaymentMethodForm({ closeDialog }: { closeDialog: () => void }) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues,
  });
  const { toast } = useToast();
  const dispatch = useAppDispatch();

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    await dispatch(savePaymentMethod(data as any)).unwrap();
    closeDialog();
    form.reset({ ...defaultValues });
    toast({
      description: 'New payment method created successfully.',
    });
  }

  return { form, onSubmit, isValid: form.formState.isValid };
}
