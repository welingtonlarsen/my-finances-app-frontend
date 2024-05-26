import { Tooltip as UITooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover.tsx';

type TProps = {
  tip: string;
  children: React.ReactNode;
};

function MobileTooltip({ tip, children }: TProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className="w-80">
        <p>{tip}</p>
      </PopoverContent>
    </Popover>
  );
}

function DesktopTooltip({ tip, children }: TProps) {
  return (
    <TooltipProvider>
      <UITooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent>
          <p>{tip}</p>
        </TooltipContent>
      </UITooltip>
    </TooltipProvider>
  );
}

export function Tooltip({ tip, children }: TProps) {
  return (
    <>
      <div className="xl:hidden">
        <MobileTooltip tip={tip}>{children}</MobileTooltip>
      </div>
      <div className="hidden xl:block">
        <DesktopTooltip tip={tip}>{children}</DesktopTooltip>
      </div>
    </>
  );
}
