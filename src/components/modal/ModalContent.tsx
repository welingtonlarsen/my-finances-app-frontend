import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export function ModalContent({ children }: Props) {
  return <div className="p-2">{children}</div>;
}
