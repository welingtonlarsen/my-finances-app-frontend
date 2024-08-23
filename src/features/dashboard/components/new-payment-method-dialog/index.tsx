import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useState } from 'react';
import NewPaymentMethodDialogButton from './new-payment-method-dialog-button';
import NewPaymentMethodForm from './new-payment-method-form';

type TProps = {
  disabled?: boolean;
};

export function NewPaymentMethodDialog({ disabled }: TProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <NewPaymentMethodDialogButton disabled={disabled} onClick={() => setIsOpen(true)} />
      </DialogTrigger>

      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-auto py-10">
        <DialogHeader className="px-6">
          <DialogTitle>New payment method</DialogTitle>
          <DialogDescription>Include a payment method to your finances.</DialogDescription>
        </DialogHeader>
        <NewPaymentMethodForm closeDialog={() => setIsOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
