import React from 'react';
import { Sidebar } from './Sidebar';
import { Player } from './Player';

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 bg-gradient-to-b from-gray-900 to-black min-h-screen text-white p-8">
        {children}
      </main>
      <Player />
    </div>
  );
}