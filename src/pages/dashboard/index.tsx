import { Layout } from '../../components/layout';
import ExpensesSummary from '@/features/dashboard/expenses-summary';
import ExpensesTotalCardSecondary from '@/features/dashboard/expenses-total-card-secondary.tsx';
import ExpensesChart from '@/features/dashboard/expenses-chart.tsx';
import ExpensesTotalCards from '@/features/dashboard/expenses-total-cards';

export default function DashboardPage() {
  return (
    <Layout title="Dashboard">
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2 flex flex-col gap-4 xl:flex-row xl:gap-8">
          <ExpensesTotalCards />
        </div>
        <div className="col-span-2 xl:col-span-1 xl:mt-3">
          <ExpensesSummary />
        </div>

        {/* TODO: Enable after functional */}
        {/* <div className="col-span-2 xl:col-span-1">
          <div className="mb-3 flex flex-row gap-3">
            <ExpensesTotalCardSecondary />
            <ExpensesTotalCardSecondary />
            <ExpensesTotalCardSecondary />
            <ExpensesTotalCardSecondary />
          </div>
          <ExpensesChart />
        </div> */}
      </div>
    </Layout>
  );
}
