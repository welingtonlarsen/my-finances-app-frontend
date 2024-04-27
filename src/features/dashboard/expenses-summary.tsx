import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button.tsx';
import { NewExpenseDialog } from '@/features/dashboard/new-expense-dialog.tsx';
import { useAppDispatch, useAppSelector } from '@/app/store';
import { useEffect, useState } from 'react';
import { fetchExpenses, getExpenses } from './dashboard-slice';
import { formatDateToYearMonthDay } from '@/lib/date-utils';
import { getSVGOfPaymentMethod } from '@/lib/payment-utils';
import { formatMoney } from '@/lib/money-utils';
import { Loader2 } from 'lucide-react';

const pageSize = 8;
const initialPagination = { page: 1, size: pageSize };

const canFetchMore = (itemsLenght: number, currentPage: number, pageSize: number) => {
  const maxItems = currentPage * pageSize;
  return itemsLenght === maxItems;
};

export default function ExpensesSummary() {
  const [pagination, setPagination] = useState(initialPagination);

  const dispatch = useAppDispatch();
  const { expenses, totalAmount, isLoading: isExpensesLoading } = useAppSelector(getExpenses);

  useEffect(() => {
    dispatch(fetchExpenses(pagination));
  }, []);

  const fetchMoreExpenses = () => {
    const newPagination = { ...pagination, size: pagination.size + pageSize };
    dispatch(fetchExpenses(newPagination));
    setPagination(newPagination);
  };

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
                <div className="flex">
                  <p className="text-sm font-medium leading-none">{expense.description}</p>
                  <p className="text-xs text-muted-foreground">({formatDateToYearMonthDay(expense.date)})</p>
                </div>
                <p className="text-sm text-muted-foreground">{expense.paymentMethod?.name}</p>
              </div>
              <div className="ml-auto font-medium">{formatMoney(expense.amount)}</div>
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
