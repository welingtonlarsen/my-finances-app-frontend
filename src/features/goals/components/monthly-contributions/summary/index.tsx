import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export default function MonthlyContributionsSummary() {
  return (
    <div className="flex justify-between">
      <div className="flex flex-row items-center">
        <p className="text-sm font-normal leading-none">Aporte ideal: $999.00</p>
        <p className="text-sm font-normal leading-none ml-2">
          Último mês: <span className="text-green-500">$320.00</span>
        </p>
        <p className="text-sm font-normal leading-none ml-2">
          Próximo mês: <span className="text-red-500">$110.00</span>
        </p>
      </div>
      <Button className="ml-auto gap-1 -mt-5" size="sm" onClick={() => {}}>
        Novo aporte
        <Plus className="h-4 w-4" />
      </Button>
      <div></div>
    </div>
  );
}
