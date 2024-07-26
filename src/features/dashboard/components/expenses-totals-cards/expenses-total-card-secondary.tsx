import { DollarSign } from 'lucide-react';

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { formatMoney } from '@/lib/money-utils.ts';
import { truncateString } from '@/lib/string-utils.ts';

interface TProps {
  total: number;
  title: string;
}

export default function ExpensesTotalCardSecondary({ total, title }: TProps) {
  return (
    <Card className="h-14 w-full pt-2.5 px-2">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 p-0 m-0">
        <CardTitle className="text-xs">{truncateString(title, 12)}</CardTitle>
        <DollarSign className="h-3 w-3 text-muted-foreground" />
      </CardHeader>
      <CardContent className="p-0 m-0">
        <div className="text-xs font-light text-muted-foreground">{formatMoney(total)}</div>
      </CardContent>
      <CardFooter className="m-0 p-0 h-0" />
    </Card>
  );
}
