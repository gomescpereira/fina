

import { useQuery } from "@tanstack/react-query";



//const API_URL = 'http://192.168.0.20:8080/v1';
const API_URL = 'http://192.168.0.20:8080/v1';


type Transaction = {
  id: string;
  title: string;
  type: number; 
  amount: number;
  consumer: number;
  category_id: string;
  pay: boolean;
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
        
        console.log('Hook traz Dados de edição:', { data });
        return data;

      } catch (error) {
        console.error('Erro na requisição:', error);
        throw error;
      }
    };




  

  export function useTransactionEditData(id: string ) {
      const query = useQuery<Transaction>({
        queryFn: () => fetchData(id) , 
        queryKey: ['get-edit-transacoes', id ],
       
        
        refetchInterval: 60 * 5 * 1000
      })

     return query;
  }
