import { useAppSelector } from '@/app/redux/store';
import { DatePickerForm } from '@/components/form-input/date-picker';
import { Form } from '@/components/ui/form.tsx';
import { SelectItem } from '@/components/ui/select';
import { getSVGOfPaymentMethod, INSTALLMENTS } from '@/lib/payment-utils';
import { DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Loader2, Plus } from 'lucide-react';
import useNewExpenseForm from '../../hooks/useNewExpenseForm';
import { useMemo } from 'react';
import { getCategories, getPaymentMethods, getExpenses } from '../../slice/dashboard-selectors';
import { NumberFormInput } from '@/components/form-input/number-form-input';
import { TextFormInput } from '@/components/form-input/text-form-input';
import NumberFormSelect from '@/components/form-input/number-form-select';
import { CurrentStep } from './types/types';

type TProps = {
  onSubmit: any;
  setCurrentStep: (newStep: CurrentStep) => void;
};

export default function ExpenseFormStep({ onSubmit, setCurrentStep }: TProps) {
  const { categories } = useAppSelector(getCategories);
  const { paymentMethods } = useAppSelector(getPaymentMethods);
  const { isLoading: isExpensesLoading } = useAppSelector(getExpenses);

  const defaultValues = useMemo(() => {
    return { paymentMethodId: paymentMethods[0]?.id, categoryId: categories[0]?.id };
  }, [paymentMethods, categories]);

  const {
    form,
    onSubmit: handleOnSubmit,
    isValid,
  } = useNewExpenseForm({
    closeDialog: () => onSubmit(false),
    loadedDefaultValues: defaultValues,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleOnSubmit)}>
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

          <NumberFormSelect form={form} name="installments" label="Installments">
            {INSTALLMENTS.map((installment) => (
              <SelectItem key={installment} value={String(installment)}>
                {installment}
              </SelectItem>
            ))}
          </NumberFormSelect>
          <NumberFormSelect form={form} name="currentInstallment" label="Current installment">
            {INSTALLMENTS.map((installment) => (
              <SelectItem key={installment} value={String(installment)}>
                {installment}
              </SelectItem>
            ))}
          </NumberFormSelect>
        </div>

        <DialogFooter>
          <Button type="submit" disabled={isExpensesLoading || !isValid}>
            {isExpensesLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isExpensesLoading ? 'Saving...' : 'Save changes'}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
