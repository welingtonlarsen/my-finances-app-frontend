import { Button } from '@/components/ui/button';
import { useModalContext } from '@/context/modal-context';
import { X } from 'lucide-react';

interface Props {
  title: string;
}
export function ModalHeader({ title }: Props) {
  const { onClose: contextOnClose } = useModalContext();

  const handleClose = () => {
    contextOnClose();
  };

  return (
    <div className="flex items-center justify-between p-4 border-b">
      <h2 className="text-xl font-semibold">{title}</h2>
      <Button variant="ghost" size="icon" onClick={handleClose} className="h-8 w-8 p-0">
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
}
