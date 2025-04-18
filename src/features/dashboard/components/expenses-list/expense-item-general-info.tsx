import { Badge } from '@/components/ui/badge';
import { formatDateToYearMonthDay } from '@/lib/date-utils';
import { truncateString } from '@/lib/string-utils';
import { isMobile } from 'react-device-detect';

type TProps = {
  totalInstallments: number;
  currentInstallment: number;
  description: string;
  date: string;
  paymentMethodName: string;
  category: string;
};

export default function ExpenseItemGeneralInfo({
  description,
  date,
  paymentMethodName,
  totalInstallments,
  currentInstallment,
  category,
}: TProps) {
  return (
    <div>
      <div className="flex items-center">
        <p className="text-sm font-medium leading-none">{isMobile ? truncateString(description, 14) : description}</p>
        &nbsp;
        <p className="text-xs text-muted-foreground">({formatDateToYearMonthDay(date)})</p>
        &nbsp;
        <Badge variant="secondary">{category}</Badge>
      </div>
      <p className="text-sm text-muted-foreground">
        {currentInstallment}/{totalInstallments} - {paymentMethodName}
      </p>
    </div>
  );
}
