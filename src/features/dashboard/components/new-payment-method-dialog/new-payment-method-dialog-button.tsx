import React, { forwardRef } from 'react';
import { Tooltip } from '@/components/tooltip/tooltip.tsx';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

type TProps = {
  disabled: boolean;
  onClick: () => void;
};

// Use forwardRef to allow ref to be passed down to the button or div element
const NewPaymentMethodDialogButton = forwardRef<HTMLDivElement | HTMLButtonElement, TProps>(
  ({ disabled, onClick }, ref) => {
    return (
      <>
        {disabled && (
          <Tooltip tip="Maximum number of methods reached.">
            <div
              ref={ref as React.Ref<HTMLDivElement>} // Forward ref to the div when disabled
              className="ml-2 rounded-full h-8 w-8 border border-gray-700 flex items-center justify-center"
            >
              <Plus className="h-4 w-4" />
            </div>
          </Tooltip>
        )}
        {!disabled && (
          <Button
            ref={ref as React.Ref<HTMLButtonElement>} // Forward ref to the button when not disabled
            variant="outline"
            size="icon"
            className="ml-2 rounded-full h-8 w-8"
            onClick={onClick}
          >
            <Plus className="h-4 w-4" />
          </Button>
        )}
      </>
    );
  },
);

export default NewPaymentMethodDialogButton;
