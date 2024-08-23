import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button.tsx';
import { NewExpenseDialog } from '@/features/dashboard/components/new-expense-dialog';
import { useAppDispatch, useAppSelector } from '@/app/redux/store';
import { useEffect, useState } from 'react';
import { formatMoney } from '@/lib/money-utils';
import { Loader2 } from 'lucide-react';
import { initialPagination, pageSize } from '../../constants/constants';
import ExpenseItem from './expense-item';
import { fetchExpenses, deleteExpense } from '../../slice/dashboard-thunks';
import { getExpenses, getDashboardFilters } from '../../slice/dashboard-selectors';
import { canFetchMore } from '@/lib/pagination-utils';

export default function ExpensesList() {
  const [pagination, setPagination] = useState(initialPagination);

  const dispatch = useAppDispatch();

  const { expenses, totalAmount, isLoading: isExpensesLoading } = useAppSelector(getExpenses);
  const dashboardFilters = useAppSelector(getDashboardFilters);

  useEffect(() => {
    dispatch(fetchExpenses({ ...pagination, from: dashboardFilters.date.from, to: dashboardFilters.date.to }));
  }, [dashboardFilters, dispatch]);

  const fetchMoreExpenses = () => {
    const newPagination = { ...pagination, size: pagination.size + pageSize };
    dispatch(fetchExpenses({ ...newPagination, from: dashboardFilters.date.from, to: dashboardFilters.date.to }));
    setPagination(newPagination);
  };

  const handleDeleteExpense = (id: number) => {
    dispatch(deleteExpense(id));
    setPagination(initialPagination);
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
            <ExpenseItem key={expense.id} expense={expense} handleDeleteExpense={handleDeleteExpense} />
          ))}
        {!expenses.length && <p className="text-muted-foreground">No expenses found for selected date range.</p>}
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
