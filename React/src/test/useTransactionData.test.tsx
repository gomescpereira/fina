import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useTransactionData } from '../hooks/useTransactionData';
import { server } from './server';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';

describe('useTransactionData', () => {
  // Configura o servidor de mock
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  // Wrapper para o React Query
  const queryClient = new QueryClient();
  const wrapper = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );

  it('should fetch transactions successfully', async () => {
    const { result } = renderHook(
      () => useTransactionData('2025-01-01', '2025-01-31', 1),
      { wrapper }
    );

    // Inicialmente está carregando
    expect(result.current.isLoading).toBe(true);

    // Aguarda os dados serem carregados
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    // Verifica se os dados foram carregados corretamente
    expect(result.current.data).toBeDefined();
    expect(result.current.data?.data).toHaveLength(1);
    expect(result.current.data?.data[0].title).toBe('Test Transaction');
  });

  it('should handle pagination correctly', async () => {
    const { result } = renderHook(
      () => useTransactionData('2025-01-01', '2025-01-31', 1),
      { wrapper }
    );

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.data?.currentPage).toBe(1);
    expect(result.current.data?.totalPages).toBe(2);
    expect(result.current.data?.pageSize).toBe(10);
  });
});
