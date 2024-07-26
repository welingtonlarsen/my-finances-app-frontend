import ExpensesTotalCards from '@/features/dashboard/components/expenses-totals-cards';
import ExpensesList from '@/features/dashboard/components/expenses-list';
import ExpensesDateRangePicker from '@/features/dashboard/components/data-range-picker';

export default function DashboardPage() {
  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Gastos variáveis</h1>
        <ExpensesDateRangePicker />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2 gap-4 xl:gap-8">
          <ExpensesTotalCards />
        </div>
        <div className="col-span-2 xl:col-span-1 xl:mt-3">
          <ExpensesList />
        </div>
      </div>
    </>
  );
}
