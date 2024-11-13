import { useQuery } from "@tanstack/react-query";


const API_URL = 'http://localhost:5250/v1';

export interface TagResponse {
    currentPage: number
    totalPages: number
    pageSize: number
    totalCount: number
    data: Category[]
    message: string;
  }

  export interface Category {
    id: number
    title: string
    description: string
    userId: string
  }


const fetchData = async () => {
    const response =  await fetch(API_URL +'/categories?pageNumber=1&pageSize=15')
    const data = response.json()
    return data
}
   

export function useCategoryData(){
    const query = useQuery<TagResponse>({
      queryFn: fetchData,
      queryKey: ['get-categories'],
      refetchInterval: 60 * 5 * 1000
    })

    return query;
}