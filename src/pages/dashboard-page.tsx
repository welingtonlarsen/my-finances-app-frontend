import { Layout } from '../components/layout';
import ExpensesSummary from '@/features/dashboard/expenses-summary';
import ExpensesTotalCardSecondary from '@/features/dashboard/expenses-total-card-secondary.tsx';
import ExpensesChart from '@/features/dashboard/expenses-chart.tsx';
import ExpensesTotalCards from '@/features/dashboard/expenses-total-cards';
import SecondaryExpensesTotalCards from '@/features/dashboard/SecondaryExpensesTotalCards.tsx';
import { useAppSelector } from '@/app/store.ts';
import { getExpensesSum } from '@/features/dashboard/dashboard-slice.ts';
import ExpensesDateRangePicker from '@/features/dashboard/expenses-date-range-picker';

export default function DashboardPage() {
  // TODO: Remove selector logic from here because it's only a page!
  const { expensesSum } = useAppSelector(getExpensesSum);

  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Dashboard</h1>
        <ExpensesDateRangePicker />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2 gap-4 xl:gap-8">
          <ExpensesTotalCards />
        </div>
        <div className="col-span-2 xl:col-span-1 xl:mt-3">
          <ExpensesSummary />
        </div>
        <div className="col-span-2 xl:col-span-1">
          <div className="hidden xl:block xl:mb-3">
            <div className="xl:col-span-4 xl:grid xl:grid-cols-4 xl:gap-1">
              <SecondaryExpensesTotalCards />
            </div>
          </div>
          <ExpensesChart />
        </div>
      </div>
    </>
  );
}
