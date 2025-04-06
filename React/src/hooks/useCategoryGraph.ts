import { useQuery } from "@tanstack/react-query";
// 'http://localhost:5250/v1/reports/expenses' \
//   -H 'accept: application/json'

const API_URL = 'http://192.168.0.20:8080/v1';

export interface PieResponse {
    data: expanse[];
    messages: string;
   
  }

  export interface expanse {
    userId: string
    category: string
    year:number
    expenses: number
  }


const fetchData = async () => {
    const response =  await fetch(API_URL +'/reports/expenses')
    const data = response.json()
    return data
}
   

export function useCategoryGraph(){
    const query = useQuery<PieResponse>({
      queryFn: fetchData,
      queryKey: ['get-expanses'],
      refetchInterval: 60 * 5 * 1000
    })

    return query;
}