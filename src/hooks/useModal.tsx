import { ModalProvider } from '@/context/modal-context';
import { useMemo, useState } from 'react';
import { createPortal } from 'react-dom';

export default function useModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState<React.ReactNode | null>(null);

  const showModal = <T,>(ModalComponent: React.ReactNode): Promise<T | undefined> => {
    return new Promise((resolve) => {
      const resolveHandler = (value: T) => {
        setIsOpen(false);
        setModalContent(null);
        resolve(value);
      };

      const closeHandler = () => {
        resolve(undefined);
        setModalContent(null);
        setIsOpen(false);
      };

      setModalContent(
        <ModalProvider
          value={{ resolve: resolveHandler, isOpen: true, onClose: closeHandler, onClickBackdrop: closeHandler }}
        >
          {ModalComponent}
        </ModalProvider>,
      );

      setIsOpen(true);
    });
  };

  const modalComponent = useMemo(() => {
    if (isOpen && modalContent) {
      return createPortal(modalContent, document.body);
    }
    return null;
  }, [isOpen, modalContent]);

  return {
    showModal,
    modalComponent,
  };
}
