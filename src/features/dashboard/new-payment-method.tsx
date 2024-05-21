import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Loader2, Plus } from 'lucide-react';
import { Form } from '@/components/ui/form.tsx';
import useNewExpenseForm from '@/features/dashboard/useNewExpenseForm.ts';
import { InputFormField } from '@/components/input/input-form-field.tsx';
import SelectFormField from '@/components/input/select-form-field.tsx';
import { SelectItem } from '@/components/ui/select.tsx';
import { fetchCategories, fetchPaymentMethods, getCategories, getExpenses, getPaymentMethods } from './dashboard-slice';
import { useAppDispatch, useAppSelector } from '@/app/store';
import { useEffect, useState } from 'react';
import { getSVGOfPaymentMethod } from '@/lib/payment-utils';
import { Category, PaymentMethod } from '@/types/expense-types';
import useNewPaymentMethodForm from './useNewPaymentMethodForm';

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

const paymentsTypes = [
  { title: 'Credit Card', paymentType: 'CREDIT_CART' },
  { title: 'PIX', paymentType: 'PIX' },
];

export function NewPaymentMethodDialog() {
  const [open, setOpen] = useState(false);
  const { form, onSubmit, isValid } = useNewPaymentMethodForm({ closeDialog: () => setOpen(false) });
  const dispatch = useAppDispatch();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" className="ml-2 rounded-full h-8 w-8">
          <Plus className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-auto py-10">
        <DialogHeader className="px-6">
          <DialogTitle>New payment method</DialogTitle>
          <DialogDescription>Include a payment method to your finances.</DialogDescription>
        </DialogHeader>
        {/*Form fields*/}
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
      </DialogContent>
    </Dialog>
  );
}
