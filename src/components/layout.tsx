import React from 'react';

import { Header } from '@/src/components/header';
import { Footer } from '@/src/components/footer';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <>
      <Header />

      {children}

      <Footer />
    </>
  );
}
