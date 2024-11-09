import { MonthlyContributions } from '@/features/goals/components/monthly-contributions';
import MonthlyContributionsTip from '@/features/goals/components/tip';

export default function FinancialIndependence() {
  return (
    <>
      <MonthlyContributionsTip />

      <MonthlyContributions />
    </>
  );
}
