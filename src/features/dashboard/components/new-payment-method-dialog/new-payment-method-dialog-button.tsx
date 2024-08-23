import { Tooltip } from '@/components/tooltip/tooltip.tsx';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

type TProps = {
  disabled: boolean;
  onClick: () => void;
};

export default function NewPaymentMethodDialogButton({ disabled, onClick }: TProps) {
  return (
    <>
      {disabled && (
        <Tooltip tip="Maximum number of methods reached.">
          <div className="ml-2 rounded-full h-8 w-8 border border-gray-700 flex items-center justify-center">
            <Plus className="h-4 w-4 " />
          </div>
        </Tooltip>
      )}
      {!disabled && (
        <Button variant="outline" size="icon" className="ml-2 rounded-full h-8 w-8" onClick={onClick}>
          <Plus className="h-4 w-4" />
        </Button>
      )}
    </>
  );
}
