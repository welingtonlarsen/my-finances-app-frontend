import { Button } from '@/components/ui/button';
import { useModalContext } from '@/context/modal-context';

interface Props {
  onSubmit?: () => void;
  isLoading?: boolean;
  primaryActionDisabled?: boolean;
}
export function ModalFooter({ onSubmit = () => {}, isLoading, primaryActionDisabled }: Props) {
  const { onClose } = useModalContext();

  const handleCancel = () => {
    onClose();
  };

  return (
    <div className="flex justify-end gap-2" data-testid="modal-footer">
      <Button variant="outline" onClick={handleCancel}>
        Cancel
      </Button>
      <Button onClick={onSubmit} disabled={isLoading || primaryActionDisabled}>
        {isLoading ? 'Saving...' : 'Save'}
      </Button>
    </div>
  );
}
