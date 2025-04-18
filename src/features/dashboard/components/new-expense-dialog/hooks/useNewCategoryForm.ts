import { useAppDispatch } from '@/app/redux/store';
import { useToast } from '@/components/ui/use-toast';
import { saveCategory } from '@/features/dashboard/slice/dashboard-thunks';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { CurrentStep } from '../types/types';

const FormSchema = z.object({
  name: z.string({ required_error: 'Name should be informed.' }).min(1, { message: 'Name should be informed.' }),
  colorHexCode: z
    .string({ required_error: 'Color should be informed.' })
    .min(1, { message: 'Color should be informed.' }),
});
type FormSchemaType = z.infer<typeof FormSchema>;

const defaultValues: FormSchemaType = {
  name: '',
  colorHexCode: '',
};

export default function useNewCategoryForm({ setCurrentStep }: { setCurrentStep: (newStep: CurrentStep) => void }) {
  const dispatch = useAppDispatch();

  const { toast } = useToast();

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues,
  });

  async function onSubmit(formData: FormSchemaType) {
    await dispatch(saveCategory(formData as any)).unwrap();
    setCurrentStep('EXPENSE_STEP');
    toast({
      description: 'Category saved successfully.',
    });
  }

  return {
    form,
    onSubmit,
    isValid: form.formState.isValid,
  };
}
