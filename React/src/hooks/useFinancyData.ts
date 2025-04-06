import { useQuery } from "@tanstack/react-query";




export interface TagResponse {
 _id: string;
 currencyday: Date;
 dolarBuy: number;
 dolarSell: number;
 btcBuy: number;
 btcSell: number;
 eurBuy: number;
 eurSell: number;
}

//const API_URL = 'http://localhost:3333';
const API_URL = 'http://192.168.0.20:8080/v1';


const fetchData = async () => {
    const response =  await fetch(API_URL +'/currency')
    const data = response.json()
    return data
}
   

export function useFinancyData(){
    const query = useQuery<TagResponse[]>({
      queryFn: fetchData,
      queryKey: ['get-currency'],
      refetchInterval: 60 * 5 * 1000
    })

    return query;
}
