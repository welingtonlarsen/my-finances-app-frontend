import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button.tsx';
import { NewExpenseDialog } from '@/features/dashboard/new-expense-dialog.tsx';
import { useAppDispatch, useAppSelector } from '@/app/store';
import { useEffect, useState } from 'react';
import { fetchExpenses, getExpenses, deleteExpense } from './dashboard-slice';
import { formatDateToYearMonthDay } from '@/lib/date-utils';
import { getSVGOfPaymentMethod } from '@/lib/payment-utils';
import { formatMoney } from '@/lib/money-utils';
import { Loader2, MoreVertical } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { truncateString } from '@/lib/string-utils';
import { isMobile } from 'react-device-detect';
import { initialPagination, pageSize } from './constants/constants';

const canFetchMore = (itemsLenght: number, currentPage: number, pageSize: number) => {
  const maxItems = currentPage * pageSize;
  console.log(itemsLenght, maxItems);
  return itemsLenght === maxItems;
};

export default function ExpensesSummary() {
  const [pagination, setPagination] = useState(initialPagination);

  const dispatch = useAppDispatch();
  const { expenses, totalAmount, isLoading: isExpensesLoading, isDeleting } = useAppSelector(getExpenses);

  useEffect(() => {
    dispatch(fetchExpenses(pagination));
  }, []);

  const fetchMoreExpenses = () => {
    const newPagination = { ...pagination, size: pagination.size + pageSize };
    dispatch(fetchExpenses(newPagination));
    setPagination(newPagination);
  };

  const handleDeleteExpense = (id: number) => {
    dispatch(deleteExpense(id));
    setPagination(initialPagination);
  };

  console.log({ isDeleting });

  return (
    <Card>
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>Expenses</CardTitle>
          <CardDescription>Total: {formatMoney(totalAmount || 0)}</CardDescription>
        </div>
        <NewExpenseDialog />
      </CardHeader>
      <CardContent className="grid gap-8">
        {!!expenses.length &&
          expenses.map((expense) => (
            <div key={expense.id} className="flex items-center gap-4">
              <Avatar className="hidden h-9 w-9 sm:flex">
                <AvatarImage src={getSVGOfPaymentMethod(expense.paymentMethod?.paymentType || '')} alt="Avatar" />
                <AvatarFallback>EX</AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center">
                  <p className="text-sm font-medium leading-none">
                    {isMobile ? truncateString(expense.description, 10) : expense.description}
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
          ))}
      </CardContent>
      <CardFooter className="flex items-center justify-center py-2">
        {isExpensesLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {!isExpensesLoading && canFetchMore(expenses.length, pagination.page, pagination.size) && (
          <Button variant="link" onClick={fetchMoreExpenses}>
            See more
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
