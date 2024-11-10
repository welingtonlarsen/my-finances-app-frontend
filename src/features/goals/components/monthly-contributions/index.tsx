import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import MonthlyContributionChart from './chart';
import MonthlyContributionsSummary from './summary';

export function MonthlyContributions() {
  return (
    <div className="max-w-[50rem]">
      <Card>
        <CardHeader>
          <CardTitle>Aportes mensais</CardTitle>
          <CardDescription>
            <div className="mt-2  ">
              <MonthlyContributionsSummary />
            </div>
          </CardDescription>
        </CardHeader>

        <MonthlyContributionChart />
      </Card>
    </div>
  );
}
