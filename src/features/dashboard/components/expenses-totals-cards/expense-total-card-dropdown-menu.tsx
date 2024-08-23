import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu.tsx';
import { Button } from '@/components/ui/button.tsx';
import { DollarSign, Loader2, MoreVertical } from 'lucide-react';
import { AlertDialog } from '@/components/alert-dialog/alert-dialog.tsx';

type TProps = {
  isDeleting: boolean;
  onDelete: () => void;
};

export default function ExpensesTotalCardDropdownMenu({ isDeleting, onDelete }: TProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="outline" className="h-6 w-6">
          {!isDeleting && <MoreVertical className="h-3.5 w-3.5" />}
          {isDeleting && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <AlertDialog
          title="Delete payment method"
          description="All expenses associated with this payment method will be deleted and this action cannot be undone."
          onConfirm={onDelete}
          ctaComponent={
            <Button variant="ghost" size="sm" className="font-normal w-full flex justify-start">
              Delete
            </Button>
          }
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
