import type { ReactNode } from 'react';
import { Header } from './Header';
import { SearchModal } from './SearchModal';
import { useSearchModal } from '../../hooks/useSearchModal';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { isOpen, open, close, inputRef, fillQuickTag } = useSearchModal();

  return (
    <>
      <Header onSearchOpen={open} />
      {children}
      <SearchModal isOpen={isOpen} onClose={close} inputRef={inputRef} onQuickTag={fillQuickTag} />
    </>
  );
}
