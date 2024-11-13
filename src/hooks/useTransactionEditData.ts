

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





const fetchData = async (
      id: string,
      
    ): Promise<Transaction> => {
      try {
        const response = await fetch(
          API_URL+ `/transactions/${id}`
        );
    
        if (!response.ok) {
          throw new Error('Erro na requisição');
        }
    
        const { data: data } = await response.json();
        
        console.log('Dados:', data);
        return data;

      } catch (error) {
        console.error('Erro na requisição:', error);
        throw error;
      }
    };




  

  export function useTransactionEditData(id: string) {
      const query = useQuery<Transaction>({
        queryKey: ['get-edit-transacoes', id ],
        queryFn: () => fetchData(id) , 
        
        refetchInterval: 60 * 5 * 1000
      })

     return query;
  }