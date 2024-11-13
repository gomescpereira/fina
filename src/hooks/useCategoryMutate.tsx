//import { string } from 'zod';
//import { Category } from './../Model/Category';
import { useMutation } from "@tanstack/react-query";

export interface Category {
    title: string
    description: string

  }


 const API_URL = 'http://localhost:5250/v1';

// Usando o Axios
//  const postData = async (data: Category) => {
//     return await axios.post{API_URL + '/category', data};
//  }

 const postData = async({title, description}: Category) => {
   return await fetch(API_URL + '/categories', {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain',
            'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify({
           title,
           description,
        }),
    })
  }
  
  

 export  function useCategoryMutate(){
  const mutate = useMutation({
   mutationFn: postData,
  })

 

 return mutate;
}