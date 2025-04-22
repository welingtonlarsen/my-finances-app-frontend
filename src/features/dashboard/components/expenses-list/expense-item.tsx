import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { formatMoney } from '@/lib/money-utils';
import { getSVGOfPaymentMethod } from '@/lib/payment-utils';
import { Expense } from '@/types/expense-types';
import { useAppSelector } from '@/app/redux/store';
import { getExpenses } from '../../slice/dashboard-selectors';
import ExpenseItemDropdownMenu from './expense-item-dropdown-menu';
import ExpenseItemGeneralInfo from './expense-item-general-info';

type TProps = {
  expense: Expense;
  handleDeleteExpense: (id: number) => void;
  handleEditExpense: (expense: Expense) => void;
  category: string;
};

export default function ExpenseItem({ expense, handleDeleteExpense, category, handleEditExpense }: TProps) {
  const { isDeleting } = useAppSelector(getExpenses);

  return (
    <div key={expense.id} className="flex items-center gap-4">
      <Avatar className="hidden h-9 w-9 sm:flex">
        <AvatarImage src={getSVGOfPaymentMethod(expense.paymentMethod?.paymentType || '')} alt="Avatar" />
        <AvatarFallback>EX</AvatarFallback>
      </Avatar>

      <ExpenseItemGeneralInfo
        description={expense.description}
        date={expense.date}
        paymentMethodName={expense.paymentMethod?.name}
        totalInstallments={expense.installments}
        currentInstallment={expense.currentInstallment}
        category={category}
      />

      <div className="ml-auto font-medium">{formatMoney(expense.amount)}</div>

      <ExpenseItemDropdownMenu
        isDeleting={isDeleting}
        handleDeleteExpense={() => handleDeleteExpense(expense.id)}
        handleEditExpense={() => handleEditExpense(expense)}
      />
    </div>
  );
}
