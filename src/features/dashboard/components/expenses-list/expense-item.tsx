import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button.tsx';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { formatDateToYearMonthDay } from '@/lib/date-utils';
import { formatMoney } from '@/lib/money-utils';
import { getSVGOfPaymentMethod } from '@/lib/payment-utils';
import { truncateString } from '@/lib/string-utils';
import { Expense } from '@/types/expense-types';
import { isMobile } from 'react-device-detect';
import { Loader2, MoreVertical } from 'lucide-react';
import { useAppSelector } from '@/app/redux/store';
import { getExpenses } from '../../slice/dashboard-selectors';
import ExpenseItemDropdownMenu from './expense-item-dropdown-menu';
import ExpenseItemDescription from './expense-item-description';

type TProps = {
  expense: Expense;
  handleDeleteExpense: (id: number) => void;
};

export default function ExpenseItem({ expense, handleDeleteExpense }: TProps) {
  const { isDeleting } = useAppSelector(getExpenses);

  return (
    <div key={expense.id} className="flex items-center gap-4">
      <Avatar className="hidden h-9 w-9 sm:flex">
        <AvatarImage src={getSVGOfPaymentMethod(expense.paymentMethod?.paymentType || '')} alt="Avatar" />
        <AvatarFallback>EX</AvatarFallback>
      </Avatar>

      <ExpenseItemDescription
        description={expense.description}
        date={expense.date}
        paymentMethodName={expense.paymentMethod?.name}
        totalInstallments={expense.installments}
        currentInstallment={expense.currentInstallment}
      />

      <div className="ml-auto font-medium">{formatMoney(expense.amount)}</div>

      <ExpenseItemDropdownMenu isDeleting={isDeleting} handleDeleteExpense={() => handleDeleteExpense(expense.id)} />
    </div>
  );
}
