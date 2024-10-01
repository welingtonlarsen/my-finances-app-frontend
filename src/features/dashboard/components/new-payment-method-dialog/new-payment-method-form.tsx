import { Form } from '@/components/ui/form.tsx';
import useNewPaymentMethodForm from '../../hooks/useNewPaymentMethodForm';
import { SelectItem } from '@/components/ui/select';
import { DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { TextFormInput } from '@/components/form-input/text-form-input';
import TextFormSelect from '@/components/form-input/text-form-select';
import { PAYMENT_TYPES } from '@/lib/payment-utils';

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
            <TextFormInput form={form} name="name" label="Name" />
            <TextFormSelect form={form} name="paymentType" label="Payment type">
              {PAYMENT_TYPES.map((paymentType) => (
                <SelectItem key={paymentType.paymentType} value={String(paymentType.paymentType)}>
                  {paymentType.title}
                </SelectItem>
              ))}
            </TextFormSelect>
          </div>

          <DialogFooter className="mt-5">
            <Button type="submit">Save</Button>
          </DialogFooter>
        </form>
      </Form>
    </div>
  );
}
