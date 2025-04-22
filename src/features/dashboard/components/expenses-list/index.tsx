import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button.tsx';
import { useAppDispatch, useAppSelector } from '@/app/redux/store';
import { useEffect, useState } from 'react';
import { formatMoney } from '@/lib/money-utils';
import { Loader2 } from 'lucide-react';
import { initialPagination, pageSize } from '../../constants/constants';
import ExpenseItem from './expense-item';
import { fetchExpenses, deleteExpense } from '../../slice/dashboard-thunks';
import { getExpenses, getDashboardFilters, getCategories } from '../../slice/dashboard-selectors';
import { canFetchMore } from '@/lib/pagination-utils';
import getCategoryName from './utils/getCategoryName';
import { Expense } from '@/types/expense-types';
import useModal from '@/hooks/useModal';
import { EditExpenseModal } from '../expense-modal/edit-expense-modal';
import { ExpenseFormSchema } from '../../hooks/useNewExpenseForm';
import { useToast } from '@/components/ui/use-toast';

export default function ExpensesList() {
  const [pagination, setPagination] = useState(initialPagination);
  const { showModal, modalComponent } = useModal();

  const { toast } = useToast();

  const dispatch = useAppDispatch();

  const { expenses, remainingInstallments, totalAmount, isLoading: isExpensesLoading } = useAppSelector(getExpenses);
  const dashboardFilters = useAppSelector(getDashboardFilters);
  const categories = useAppSelector(getCategories);

  useEffect(() => {
    dispatch(
      fetchExpenses({
        ...pagination,
        from: dashboardFilters.date.from,
        to: dashboardFilters.date.to,
      }),
    );
  }, [dashboardFilters, dispatch, pagination]);

  const fetchMoreExpenses = () => {
    const newPagination = { ...pagination, size: pagination.size + pageSize };
    dispatch(
      fetchExpenses({
        ...newPagination,
        from: dashboardFilters.date.from,
        to: dashboardFilters.date.to,
      }),
    );
    setPagination(newPagination);
  };

  const handleDeleteExpense = (id: number) => {
    dispatch(deleteExpense(id));
    setPagination(initialPagination);
  };

  const handleEditExpense = async (expense: Expense) => {
    await showModal<ExpenseFormSchema>(<EditExpenseModal expense={expense} />);
  };

  return (
    <>
      {modalComponent}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-[1200px]">
        <div>
          <Card>
            <CardHeader>
              <div className="grid gap-2">
                <CardTitle>Statement</CardTitle>
                <CardDescription>Total: {formatMoney(totalAmount || 0)}</CardDescription>
              </div>
            </CardHeader>

            <CardContent className="grid gap-8">
              {!!expenses.length &&
                expenses.map((expense) => (
                  <ExpenseItem
                    key={expense.id}
                    expense={expense}
                    category={getCategoryName(categories.isLoading, categories.categories, expense.categoryId)}
                    handleDeleteExpense={handleDeleteExpense}
                    handleEditExpense={(expense: Expense) => handleEditExpense(expense)}
                  />
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
        </div>

        <div>
          <Card>
            <CardHeader>
              <div className="grid gap-2">
                <CardTitle>Remaining Installments</CardTitle>
                <CardDescription>Future payments</CardDescription>
              </div>
            </CardHeader>

            <CardContent className="grid gap-8">
              {!!remainingInstallments.length &&
                remainingInstallments.map((expense) => (
                  <ExpenseItem
                    key={expense.id}
                    expense={expense}
                    category={getCategoryName(categories.isLoading, categories.categories, expense.categoryId)}
                    handleDeleteExpense={handleDeleteExpense}
                    handleEditExpense={(expense: Expense) => handleEditExpense(expense)}
                  />
                ))}
              {!remainingInstallments.length && (
                <p className="text-muted-foreground">No remaining installments found for selected date range.</p>
              )}
            </CardContent>

            <CardFooter className="flex items-center justify-center py-2">
              {isExpensesLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {!isExpensesLoading && canFetchMore(remainingInstallments.length, pagination.page, pagination.size) && (
                <Button variant="link" onClick={fetchMoreExpenses}>
                  See more
                </Button>
              )}
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  );
}
