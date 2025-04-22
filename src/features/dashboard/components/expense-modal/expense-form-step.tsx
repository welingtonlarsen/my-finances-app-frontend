import { useAppSelector } from '@/app/redux/store';
import { ExpenseForm as TExpenseForm } from './hooks/useEditExpenseForm';
import { getCategories, getPaymentMethods } from '../../slice/dashboard-selectors';
import { DatePickerForm } from '@/components/form-input/date-picker';
import { Form } from '@/components/ui/form.tsx';
import { SelectItem } from '@/components/ui/select';
import { getSVGOfPaymentMethod } from '@/lib/payment-utils';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { NumberFormInput } from '@/components/form-input/number-form-input';
import { TextFormInput } from '@/components/form-input/text-form-input';
import NumberFormSelect from '@/components/form-input/number-form-select';
import { CurrentStep } from './types/types';

type TProps = {
  form: TExpenseForm;
  setCurrentStep: (step: CurrentStep) => void;
};

export default function ExpenseFormStep({ form, setCurrentStep }: TProps) {
  const { categories } = useAppSelector(getCategories);
  const { paymentMethods } = useAppSelector(getPaymentMethods);

  return (
    <Form {...form}>
      <form>
        <div className="grid grid-cols-2 gap-4 py-4 px-1">
          <div className="col-span-2">
            <TextFormInput form={form} name="description" label="Description" />
          </div>

          <NumberFormInput form={form} name="amount" label="Amount" />
          <DatePickerForm form={form} name="date" label="Date" />

          <NumberFormSelect form={form} name="paymentMethodId" label="Payment method">
            {paymentMethods.map((paymentMethod) => (
              <SelectItem key={paymentMethod.id} value={String(paymentMethod.id)} className="flex flex-row">
                <div className="flex items-start gap-3">
                  <img
                    alt="Package icon"
                    className=""
                    height={20}
                    src={getSVGOfPaymentMethod(paymentMethod.paymentType)}
                    style={{
                      aspectRatio: '20/20',
                      objectFit: 'cover',
                    }}
                    width={20}
                  />
                  <p>{paymentMethod.name}</p>
                </div>
              </SelectItem>
            ))}
          </NumberFormSelect>
          <NumberFormSelect form={form} name="categoryId" label="Categoria">
            <>
              {categories.map((category) => (
                <SelectItem key={category.id} value={String(category.id)} className="flex flex-row">
                  <div className="flex items-center gap-3">
                    <div
                      className={`rounded-full h-4 w-4`}
                      style={{ backgroundColor: `${category.colorHexCode}` }}
                    ></div>
                    <p>{category.name}</p>
                  </div>
                </SelectItem>
              ))}
              <div className="px-2 py-1.5 mt-1">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="w-full flex items-center gap-2 justify-start pl-6"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setCurrentStep('CATEGORY_STEP');
                  }}
                >
                  <Plus className="h-4 w-4" />
                  Create category
                </Button>
              </div>
            </>
          </NumberFormSelect>
        </div>
      </form>
    </Form>
  );
}
