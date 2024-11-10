import { Button } from '@/components/ui/button';
import BaseCard from '../base-card';

export default function ProfitabilityCard() {
  const footerOptions = (
    <div className="flex gap-1">
      <Button variant="outline" className="w-[90px] h-[30px]">
        12 meses
      </Button>
      <Button variant="outline" className="w-[90px] h-[30px]">
        24 meses
      </Button>
    </div>
  );

  return <BaseCard title="Rentabilidade" value={510000.2} footerOptions={footerOptions} />;
}
