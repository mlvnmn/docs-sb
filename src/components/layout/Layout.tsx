import type { ReactNode } from 'react';
import { Header } from './Header';
import { useHeaderHeight } from '../../hooks/useHeaderHeight';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  useHeaderHeight();

  return (
    <>
      <Header />
      {children}
    </>
  );
}
