import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { formatMoneyWithoutCents } from '@/lib/money-utils';

interface TProps {
  title: string;
  value: number;
  footerOptions?: React.ReactNode;
}

export default function BaseCard({ title, value, footerOptions }: TProps) {
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {/* <ExpensesTotalCardDropdownMenu isDeleting={isDeleting} onDelete={handleDeletePaymentType} /> */}
      </CardHeader>
      <CardContent className="flex">
        <div className="text-2xl font-bold">{formatMoneyWithoutCents(value)}</div>
      </CardContent>
      {!!footerOptions && <CardFooter className="flex justify-end px-1 py-0 pb-1">{footerOptions}</CardFooter>}
    </Card>
  );
}
