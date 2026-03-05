import { useQuery } from "@tanstack/react-query";

const API_URL = 'http://192.168.0.20:8080/v1';

type Transaction = {
  id: string;
  title: string;
  type: number; 
  amount: number;
  consumer: number;
  pay: boolean;
  category_id: string;
  paidOrReceivedAt: Date;
};

interface TagResponse {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalCount: number;
  data: Transaction[];
  message: string;
}

const fetchData = async (
  dataInicial: string,
  dataFinal: string,
  page: number = 1,
  pageSize: number = 10
): Promise<TagResponse> => {
  try {
    const url = new URL(`${API_URL}/transactions`);
    url.searchParams.append('startDate', dataInicial);
    url.searchParams.append('endDate', dataFinal);
    url.searchParams.append('pageNumber', String(page));
    url.searchParams.append('pageSize', String(pageSize));

    const response = await fetch(url.toString());

    if (!response.ok) {
      throw new Error('Erro na requisição');
    }

    const data: TagResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Erro na requisição:', error);
    throw error;
  }
};

export function useTransactionData(dataInicial: string, dataFinal: string, page: number) {
  return useQuery<TagResponse>({
    queryKey: ['transactions', { dataInicial, dataFinal, page }],
    queryFn: () => fetchData(dataInicial, dataFinal, page),
    staleTime: 1000 * 60 * 0.5, // Considera os dados frescos por 5 minutos
    placeholderData: (previousData) => previousData, // Mantém os dados anteriores enquanto carrega os novos
  });
}
