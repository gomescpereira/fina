import { useQuery } from "@tanstack/react-query";

const API_URL = 'http://192.168.0.20:8080/v1/reports';

export interface Root {
  data: Daum[];
  message?: string;
}

export interface Daum {
  userId: string
  category: string
  year: number
  expenses: number
}

// export interface Root {
//   data: Data;
//   message: any;
// }

// export interface Data {
//   userId: string;
//   incomes: number;
//   expenses: number;
//   total: number;
// }

const fetchData = async (): Promise<Root> => {
    const response = await fetch(API_URL + '/expenses');
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    return data;
};

export function useReportsData() {
    return useQuery<Root>({
      queryKey: ['get-reports-expenses'],
      queryFn: fetchData,
      refetchInterval: 60 * 5 * 1000, // Refetch every 5 minutes
    });
}
