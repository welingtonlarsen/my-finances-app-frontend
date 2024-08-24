import { formatDateToYearMonthDay } from '@/lib/date-utils';
import { truncateString } from '@/lib/string-utils';
import { isMobile } from 'react-device-detect';

type TProps = {
  description: string;
  date: string;
  paymentMethodName: string;
};

export default function ExpenseItemDescription({ description, date, paymentMethodName }: TProps) {
  return (
    <div>
      <div className="flex items-center">
        <p className="text-sm font-medium leading-none">{isMobile ? truncateString(description, 14) : description}</p>
        &nbsp;
        <p className="text-xs text-muted-foreground">({formatDateToYearMonthDay(date)})</p>
      </div>
      <p className="text-sm text-muted-foreground">{paymentMethodName}</p>
    </div>
  );
}
