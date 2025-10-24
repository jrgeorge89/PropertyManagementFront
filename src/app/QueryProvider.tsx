'use client';

import {
  QueryClient,
  QueryClientProvider,
  QueryCache,
  MutationCache
} from '@tanstack/react-query';
import { ReactNode, useState } from 'react';
import { PropertyApiError } from '@/domain/models/error';

export function QueryProvider({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        retry: (failureCount, error) => {
          if (error instanceof PropertyApiError) return false;
          return failureCount < 3;
        },
        staleTime: 5 * 1000,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
      },
    },
    queryCache: new QueryCache({
      onError: (error) => {
        console.error('Query Cache Error:', error);
      },
    }),
    mutationCache: new MutationCache({
      onError: (error) => {
        console.error('Mutation Cache Error:', error);
      },
    }),
  }));

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}