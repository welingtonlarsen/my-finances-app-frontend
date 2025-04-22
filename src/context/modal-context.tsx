import { createContext, useContext } from 'react';

interface ModalContextType<T = any> {
  isOpen: boolean;
  resolve: (data: T) => void;
  onClose: () => void;
  onClickBackdrop: () => void;
}

const ModalContext = createContext<ModalContextType | null>(null);

export function useModalContext<T = any>() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModalContext must be used within a ModalProvider');
  }
  return context as ModalContextType<T>;
}

export const ModalProvider = ModalContext.Provider;
