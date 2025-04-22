import { useModalContext } from '@/context/modal-context';

export interface Props {
  children: React.ReactNode;
}
export function ModalRoot({ children }: Props) {
  const { isOpen, onClickBackdrop } = useModalContext();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50" onClick={onClickBackdrop} />

      {/* Modal */}
      <div className="relative rounded-lg shadow-lg w-full max-w-md mx-4 bg-background">
        {/* Content */}
        <div className="p-4 space-y-4">{children}</div>
      </div>
    </div>
  );
}
