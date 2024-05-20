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

export function NewExpenseDialog() {
  const [open, setOpen] = useState(false);
  const { form, onSubmit, isValid } = useNewExpenseForm({ closeDialog: () => setOpen(false) });
  const dispatch = useAppDispatch();

  const { categories, isLoading: isCategoriesLoading } = useAppSelector(getCategories);
  const { paymentMethods, isLoading: isPaymentMethodsLoading } = useAppSelector(getPaymentMethods);
  const { isLoading: isExpensesLoading } = useAppSelector(getExpenses);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchPaymentMethods());
  }, []);

  if (isCategoriesLoading || isPaymentMethodsLoading) {
    return <p>Loading...</p>;
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="ml-auto gap-1" size="sm" onClick={() => setOpen(true)}>
          New expense
          <Plus className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-auto py-10 sm:py-0">
        {/* Fixed header
        <div className="sticky top-0 bg-white dark:bg-gray-950 z-10 px-4 py-3 border-b border-gray-200 dark:border-gray-800 w-full bg-red-800">
          <div className="flex items-center justify-between">
            <DialogTitle>New expense</DialogTitle>
            <div>
              <Button className="ml-auto" size="icon" variant="ghost">
                <XIcon className="h-5 w-5" />
              </Button>
            </div>
          </div>
          <DialogDescription>Include a new expense to your list.</DialogDescription>
        </div> */}
        <DialogHeader className="px-6">
          <DialogTitle>New expense</DialogTitle>
          <DialogDescription>Include a new expense to your list.</DialogDescription>
        </DialogHeader>
        {/*Form fields*/}
        <div className="grid gap-4 py-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid gap-4 py-4 px-1">
                <InputFormField form={form} name="amount" label="Amount" type="number" />
                <InputFormField form={form} name="description" label="Description" type="text" />
                <InputFormField form={form} name="date" label="Date" type="date" />
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
            </form>
          </Form>
        </div>
        <DialogFooter>
          <Button type="submit" disabled={isExpensesLoading || !isValid}>
            {isExpensesLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isExpensesLoading ? 'Saving...' : 'Save changes'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// function XIcon(props) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="M18 6 6 18" />
//       <path d="m6 6 12 12" />
//     </svg>
//   );
// }
