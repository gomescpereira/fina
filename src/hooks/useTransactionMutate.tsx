import { useMutation } from "@tanstack/react-query"
import   CreateTransactionRequest  from "../Model/Transaction"

// export interface Category {
//     title: string
//     description: string

//   }

  


 const API_URL = 'http://localhost:5250/v1';

// Usando o Axios
//  const postData = async (data: Category) => {
//     return await axios.post{API_URL + '/category', data};
//  }

 const postData = async({title,  tipo, amount, categoryId , paidOrReceivedAt,consumer, pay }: CreateTransactionRequest) => {
   console.log(paidOrReceivedAt, pay);
   return await fetch(API_URL + '/transactions', {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain',
            'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify({
           title,
           type: tipo,
           amount,
           categoryId,
           paidOrReceivedAt,
           consumer,
           pay,
        }),
    })
  }
  

 export  function useTransactionMutate(){
  const mutate = useMutation({
   mutationFn: postData,
  })

 return mutate;
}