import { useAppDispatch, useAppSelector } from '@/app/redux/store';
import { DatePickerForm } from '@/components/input/date-picker';
import { InputFormField } from '@/components/input/input-form-field';
import SelectFormField from '@/components/input/select-form-field';
import { Form } from '@/components/ui/form.tsx';
import { SelectItem } from '@/components/ui/select';
import { getSVGOfPaymentMethod } from '@/lib/payment-utils';
import { Category, PaymentMethod } from '@/types/expense-types';
import { DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import useNewExpenseForm from '../../hooks/useNewExpenseForm';
import { useMemo } from 'react';
import { getCategories, getPaymentMethods, getExpenses } from '../../slice/dashboard-selectors';

function PaymentMethodSelectFormField({ paymentMethod }: { paymentMethod: PaymentMethod }) {
  return (
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
  );
}

function CategorySelectFormField({ category }: { category: Category }) {
  return (
    <SelectItem key={category.id} value={String(category.id)} className="flex flex-row">
      <div className="flex items-start gap-3">
        <div className={`rounded-full h-4 w-4`} style={{ backgroundColor: `${category.colorHexCode}` }}></div>
        <p>{category.name}</p>
      </div>
    </SelectItem>
  );
}

const installments = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

type TProps = {
  onSubmit: any;
};

export default function ExpenseForm({ onSubmit }: TProps) {
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
        <div className="grid gap-4 py-4 px-1">
          <InputFormField form={form} name="amount" label="Amount" type="number" />
          <InputFormField form={form} name="description" label="Description" type="text" />
          <DatePickerForm form={form} name="date" label="Date" />
          <SelectFormField form={form} name="installments" label="Installments" type="number">
            {installments.map((installment) => (
              <SelectItem key={installment} value={String(installment)}>
                {installment}
              </SelectItem>
            ))}
          </SelectFormField>
          <SelectFormField form={form} name="currentInstallment" label="Current installment" type="number">
            {installments.map((installment) => (
              <SelectItem key={installment} value={String(installment)}>
                {installment}
              </SelectItem>
            ))}
          </SelectFormField>
          <SelectFormField form={form} name="paymentMethodId" label="Payment method" type="number">
            {paymentMethods.map((paymentMethod) => (
              <PaymentMethodSelectFormField key={paymentMethod.id} paymentMethod={paymentMethod} />
            ))}
          </SelectFormField>
          <SelectFormField form={form} name="categoryId" label="Categoria" type="number">
            {categories.map((category) => (
              <CategorySelectFormField key={category.id} category={category} />
            ))}
          </SelectFormField>
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
