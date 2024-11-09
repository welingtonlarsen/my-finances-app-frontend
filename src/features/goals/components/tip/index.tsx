import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { AlertCircle, BellRing, CheckCircle2, Info, X } from 'lucide-react';
import { type } from 'os';
import { Button } from 'react-day-picker';

const icons = {
  success: <CheckCircle2 className="h-5 w-5" />,
  error: <AlertCircle className="h-5 w-5" />,
  info: <Info className="h-5 w-5" />,
};

const icon = icons['success'];

const styles = {
  success: 'border-green-200',
  error: 'border-red-200',
  info: 'border-blue-200',
};

export default function MonthlyContributionsTip() {
  return (
    <Card>
      <CardContent className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-2">
          {icon}
          <p className="text-sm font-medium">
            Vamos iniciar sua jornada rumo à independência financeira. Estabeleça metas alcançáveis, alinhadas à sua
            receita.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
