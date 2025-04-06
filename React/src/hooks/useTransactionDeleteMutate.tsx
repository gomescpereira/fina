import { useMutation  } from "@tanstack/react-query";

export interface Transaction {
    id: string
   

  }

 //const queryClient = useQueryClient()
// const API_URL = 'http://192.168.0.20:8080/v1';
const API_URL = 'http://192.168.0.20:8080/v1';
// Usando o Axios
//  const postData = async (data: Category) => {
//     return await axios.post{API_URL + '/category', data};
//  }

 const deleteItem = async(id: string) => {
  return await fetch(API_URL + `/transactions/${id}` , {
    method: 'DELETE',
    headers: {
        'Accept': 'application/json, text/plain',
        'Content-Type': 'application/json;charset=UTF-8'
    }
    
        
    })
    // onSuccess: () => {
    //   queryClient.invalidateQueries({
    //     queryKey: ['delete-transactions'],
        
    //   })
    
  }
  
  

 export  function useTransactionDeleteMutate(){
  const mutate = useMutation({
   mutationFn: deleteItem
  })


 return mutate;
}

// export function useEditCategoryData(id:string){
//   const query = useQuery<Category>({
//     queryFn: () => fetchData(id),
//     queryKey: ['get-categories', id],
    
//   })

//   return query;
// }
