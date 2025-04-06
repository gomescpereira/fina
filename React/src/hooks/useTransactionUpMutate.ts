//import { string } from 'zod';
//import { Category } from './../Model/Category';
import { useMutation } from "@tanstack/react-query";



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
   


 const API_URL = 'http://192.168.0.20:8080/v1';

// Usando o Axios
//  const postData = async (data: Category) => {
//     return await axios.post{API_URL + '/category', data};
//  }

  
  const upData = async({ id ,title, type, category_id, amount,paidOrReceivedAt, pay}: Transaction) => {
    return await fetch(API_URL + `/transactions/${id}` , {
         method: 'PUT',
         headers: {
             'Accept': 'application/json, text/plain',
             'Content-Type': 'application/json;charset=UTF-8'
         },
         body: JSON.stringify({
            title,
            type,
            category_id,
            amount,
            pay,
            paidOrReceivedAt,
         }),
     })
   }

  


 export  function useCategoryUpMutate(){
  const mutate = useMutation({
   mutationFn: upData,
  })

 

 return mutate;
}