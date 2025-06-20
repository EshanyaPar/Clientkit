import React, { ReactNode } from 'react';
import { Header } from './Header';
import { ChatWidget } from '../Chat/ChatWidget';
import { useAuth } from '../../contexts/AuthContext';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-white dark:bg-secondary-900 transition-colors">
      <Header />
      <main>{children}</main>
      {user && <ChatWidget />}
    </div>
  );
};