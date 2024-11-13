

import { useQuery } from "@tanstack/react-query";



const API_URL = 'http://localhost:5250/v1';


type Transaction = {
  id: string;
  title: string;
  type: number; 
  amount: number;
  consumer: number;
  category_id: string;
  paidOrReceivedAt: Date;
};

interface TagResponse {
  currentPage: number
  totalPages: number
  pageSize: number
  totalCount: number
  data: Transaction[]
  message: string;
}



const fetchData = async (
      dataInicial: string,
      dataFinal: string
    ): Promise<TagResponse> => {
      try {
        const response = await fetch(
          API_URL+ `/transactions?startDate=${dataInicial}&endDate=${dataFinal}&pageNumber=1&pageSize=15`
        );
    
        if (!response.ok) {
          throw new Error('Erro na requisição');
        }
    
        const  data  : TagResponse = await response.json();
        
        console.log('Dados:', data);
        return data;

      } catch (error) {
        console.error('Erro na requisição:', error);
        throw error;
      }
    };


//  export const useFetchWithDateParams = (dataInicial: string, dataFinal: string) => {
//       return useQuery<TagResponse>(
//         ['fetchData', dataInicial, dataFinal], // Chave única para o cache da query
//         () => fetchData(dataInicial, dataFinal), // Função que realiza a requisição
//         {
//            enabled: !!dataInicial && !!dataFinal,
//          }
//       );
//     };   
    
// //export default useFetchWithDateParams;    

  

  export function useTransactionData(dataInicial: string, dataFinal: string) {
      const query = useQuery<TagResponse>({
        queryKey: ['get-transacoes', dataInicial , dataFinal ],
        queryFn: () => fetchData(dataInicial,dataFinal) , 
        
        refetchInterval: 60 * 5 * 1000
      })

     return query;
  }