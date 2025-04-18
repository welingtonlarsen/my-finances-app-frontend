import { TextFormInput } from '@/components/form-input/text-form-input';
import useNewCategoryForm from './hooks/useNewCategoryForm';
import { Form } from '@/components/ui/form.tsx';
import { DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { CurrentStep } from './types/types';
import ColorFormPickerInput from '@/components/form-input/color-form-picker-input';
import { useAppSelector } from '@/app/redux/store';
import { getCategories } from '../../slice/dashboard-selectors';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

type TProps = {
  setCurrentStep: (newStep: CurrentStep) => void;
};

export default function CategoryFormStep({ setCurrentStep }: TProps) {
  const { form, onSubmit, isValid } = useNewCategoryForm({ setCurrentStep });

  const { isSaving, saveStatus, error } = useAppSelector(getCategories);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
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
        <DialogFooter>
          <Button type="submit" disabled={!isValid || isSaving}>
            {isSaving ? 'Saving...' : 'Save'}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
