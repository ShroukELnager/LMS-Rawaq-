'use client';

import { QueryClientProvider } from '@tanstack/react-query';

import { queryClient } from '@/Shared/lib/Provider';
import ReduxProvider from '@/redux/provider';

export default function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ReduxProvider>
        {children}
      </ReduxProvider>
    </QueryClientProvider>
  );
}
