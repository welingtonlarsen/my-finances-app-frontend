import { Form } from '@/components/ui/form.tsx';
import useNewPaymentMethodForm from '../../hooks/useNewPaymentMethodForm';
import { InputFormField } from '@/components/input/input-form-field';
import SelectFormField from '@/components/input/select-form-field';
import { SelectItem } from '@/components/ui/select';
import { DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { PaymentType } from '@/types/expense-types';

const paymentsTypes: { title: string; paymentType: PaymentType }[] = [
  { title: 'Credit Card', paymentType: 'CREDIT_CARD' },
  { title: 'PIX', paymentType: 'PIX' },
  { title: 'Cash', paymentType: 'CASH' },
  { title: 'TED', paymentType: 'TED' },
  { title: 'Debit Card', paymentType: 'DEBIT_CARD' },
];

type TProps = {
  closeDialog: () => void;
};

export default function NewPaymentMethodForm({ closeDialog }: TProps) {
  const { form, onSubmit, isValid } = useNewPaymentMethodForm({ closeDialog });

  return (
    <div className="grid gap-4 py-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4 px-1">
            <InputFormField form={form} name="name" label="Name" type="text" />
            <SelectFormField form={form} name="paymentType" label="Payment type" type="text">
              {paymentsTypes.map((paymentType) => (
                <SelectItem key={paymentType.paymentType} value={String(paymentType.paymentType)}>
                  {paymentType.title}
                </SelectItem>
              ))}
            </SelectFormField>
          </div>

          <DialogFooter className="mt-5">
            <Button type="submit">Save</Button>
          </DialogFooter>
        </form>
      </Form>
    </div>
  );
}
