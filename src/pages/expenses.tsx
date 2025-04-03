import ExpensesTotalCards from '@/features/dashboard/components/expenses-totals-cards';
import ExpensesList from '@/features/dashboard/components/expenses-list';
import ExpensesDateRangePicker from '@/features/dashboard/components/data-range-picker';
import PaymentMethodFilter from '@/features/dashboard/components/payment-method-filter';
import { NewExpenseDialog } from '@/features/dashboard/components/new-expense-dialog';

export default function ExpensesPage() {
  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Expenses</h1>
        <ExpensesDateRangePicker />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2 gap-4 xl:gap-8">
          <ExpensesTotalCards />
        </div>
        <div className="col-span-2">
          <div className="flex items-center mb-4 mt-6 space-x-2">
            <PaymentMethodFilter />
            <NewExpenseDialog />
          </div>
          <ExpensesList />
        </div>
      </div>
    </>
  );
}
