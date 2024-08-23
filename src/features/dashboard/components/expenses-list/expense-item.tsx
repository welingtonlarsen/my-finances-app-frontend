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
      <div>
        <div className="flex items-center">
          <p className="text-sm font-medium leading-none">
            {isMobile ? truncateString(expense.description, 14) : expense.description}
          </p>
          &nbsp;
          <p className="text-xs text-muted-foreground">({formatDateToYearMonthDay(expense.date)})</p>
        </div>
        <p className="text-sm text-muted-foreground">{expense.paymentMethod?.name}</p>
      </div>
      <div className="ml-auto font-medium">{formatMoney(expense.amount)}</div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="icon" variant="outline" className="h-8 w-8">
            {!isDeleting && <MoreVertical className="h-3.5 w-3.5" />}
            {isDeleting && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
            <span className="sr-only">More</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => handleDeleteExpense(expense.id)}>Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
