import { TextFormInput } from '@/components/form-input/text-form-input';
import { CategoryForm } from './hooks/useNewCategoryForm';
import { Form } from '@/components/ui/form.tsx';
import ColorFormPickerInput from '@/components/form-input/color-form-picker-input';
import { useAppSelector } from '@/app/redux/store';
import { getCategories } from '../../slice/dashboard-selectors';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

type TProps = {
  form: CategoryForm;
};

export default function CategoryFormStep({ form }: TProps) {
  const { saveStatus, error } = useAppSelector(getCategories);

  return (
    <Form {...form}>
      <form>
        {saveStatus === 'failed' && error && (
          <Alert variant="destructive">
            <div className="flex items-center space-x-2 ">
              <AlertCircle className="h-6 w-6" />
              <AlertDescription>{error}</AlertDescription>
            </div>
          </Alert>
        )}

        <div className="grid gap-4 py-4 px-1">
          <div>
            <TextFormInput form={form} name="name" label="Name" />
          </div>
          <div className="max-w-[50%]">
            <ColorFormPickerInput form={form} name="colorHexCode" label="Color" />
          </div>
        </div>
      </form>
    </Form>
  );
}
