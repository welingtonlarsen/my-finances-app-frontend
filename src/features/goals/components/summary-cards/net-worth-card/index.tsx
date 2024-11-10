import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { formatMoneyWithoutCents } from '@/lib/money-utils';
import BaseCard from '../base-card';

export default function NetWorthCard() {
  const footerOptions = (
    <div>
      <Button variant="outline" className="w-[90px] h-[30px]">
        Atualizar
      </Button>
    </div>
  );

  return <BaseCard title="Patrimônio" value={510000.2} footerOptions={footerOptions} />;
}
