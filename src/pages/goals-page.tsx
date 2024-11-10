import ExpensesTotalCard from '@/features/goals/components/summary-cards/invested-card';
import { MonthlyContributions } from '@/features/goals/components/monthly-contributions';
import NetWorthCard from '@/features/goals/components/summary-cards/net-worth-card';
import MonthlyContributionsTip from '@/features/goals/components/tip';
import ProfitabilityCard from '@/features/goals/components/summary-cards/profitability-card';

export default function FinancialIndependence() {
  return (
    <>
      <div className="max-w-[53rem]">
        <MonthlyContributionsTip />
      </div>

      <div className="flex gap-3 max-w-[53rem]">
        <ExpensesTotalCard />
        <NetWorthCard />
        <ProfitabilityCard />
      </div>
      <MonthlyContributions />
    </>
  );
}
