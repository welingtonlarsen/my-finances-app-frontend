import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

const FormSchema = z.object({
  name: z.string({ required_error: 'Name should be informed.' }).min(1, { message: 'Name should be informed.' }),
  colorHexCode: z
    .string({ required_error: 'Color should be informed.' })
    .min(1, { message: 'Color should be informed.' }),
});

export type CategoryFormSchema = z.infer<typeof FormSchema>;
export type CategoryForm = UseFormReturn<CategoryFormSchema>;

const defaultValues: CategoryFormSchema = {
  name: '',
  colorHexCode: '#FF5733',
};

export default function useNewCategoryForm() {
  const form = useForm<CategoryFormSchema>({
    resolver: zodResolver(FormSchema),
    defaultValues,
  });

  return {
    form,
    isValid: form.formState.isValid,
  };
}
