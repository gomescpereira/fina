import { useQuery } from "@tanstack/react-query";


const API_URL = 'http://localhost:5250/v1';


  export interface Category {
    id: number
    title: string
    description: string
    userId: string
  }

  const fetchData = async (
    id: string
    
  ): Promise<Category> => {
    try {
      const response = await fetch(
        API_URL+ `/categories/${id}`
      );
  
      if (!response.ok) {
        throw new Error('Erro na requisição');
      }
  
      const  { data: data } = await response.json();
      
      console.log('Dados:', data);
      return data;

    } catch (error) {
      console.error('Erro na requisição:', error);
      throw error;
    }
  };  

// const fetchData = async () => {
//     const response =  await fetch(API_URL +'/categories?pageNumber=1&pageSize=15')
//     const data = response.json()
//     return data
// }
   

export function useEditCategoryData(id:string){
    const query = useQuery<Category>({
      queryFn: () => fetchData(id),
      queryKey: ['get-categories', id],
      
    })

    return query;
}