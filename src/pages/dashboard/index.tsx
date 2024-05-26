import { Layout } from '../../components/layout';
import ExpensesSummary from '@/features/dashboard/expenses-summary';
import ExpensesTotalCardSecondary from '@/features/dashboard/expenses-total-card-secondary.tsx';
import ExpensesChart from '@/features/dashboard/expenses-chart.tsx';
import ExpensesTotalCards from '@/features/dashboard/expenses-total-cards';
import { DateRangePicker } from '@/components/raw/date-range-picker';
import SecondaryExpensesTotalCards from '@/features/dashboard/SecondaryExpensesTotalCards.tsx';

export default function DashboardPage() {
  return (
    <Layout>
      <div className="flex justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Dashboard</h1>
        {/* <DateRangePicker /> */}
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2 gap-4 xl:gap-8">
          <ExpensesTotalCards />
        </div>
        <div className="hidden lg:grid xl:hidden grid col-span-2 grid-cols-3 gap-2">
          <div className="col-span-2">
            <ExpensesChart />
          </div>
          <div className="col-span-1 grid grid-cols-2 h-14 gap-1">
            <SecondaryExpensesTotalCards />
          </div>
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
    </Layout>
  );
}
