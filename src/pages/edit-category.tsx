import { useNavigate, useParams } from "react-router-dom"
import { useForm } from 'react-hook-form';
import {  z } from 'zod';
import { Header } from '../Components/header';
import { Tabs } from '../Components/tabs';
// import { Category } from '../Model/Category'
// import { useEffect, useState } from "react";
import { zodResolver} from '@hookform/resolvers/zod';
//import { useCategoryUpMutate } from "../hooks/useCategoryUpMutate";
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { Carregando } from "../Components/carregando";
import { useEditCategoryData } from "../hooks/useCategoryEditData";
//import { DesktopIcon } from "@radix-ui/react-icons";


const createCategoryFormSchema = z.object({
    title: z.string().nonempty('O titulo da categoria é obrigatório'),
    description: z.string().nonempty('A descrição também deve ser preenchida'),
  });
  
  type CreateCategoryFormData = z.infer<typeof createCategoryFormSchema>
  

export function EditCategory() {
    const paramms = useParams(); 
    const id = paramms?.categoryid;

    const navigate = useNavigate();

    const queryClient = useQueryClient()




    //const [categoria, setCategoria] = useState<Category>();
    const url = 'http://localhost:5250/v1/categories/'+ id;

    
    const {data: categoriaResponse, isLoading} = useEditCategoryData(id);
    
        
    // useEffect(() => {
    //   //fetchData();
    //   fetch(url)
    //     .then(response => response.json())
    //     .then(data => setCategoria(data.data));
    // }, );

    // const upData = async({ title, description}: Category ) => {
    //     return await fetch(url  , {
    //          method: 'UPDATE',
    //          headers: {
    //              'Accept': 'application/json, text/plain',
    //              'Content-Type': 'application/json;charset=UTF-8'
    //          },
    //          body: JSON.stringify({
    //             title,
    //             description,
    //          }),
    //      })
    //    }
 // Proximo Passo
    const { mutateAsync } = useMutation({
      mutationFn: async (category: CreateCategoryFormData) => {
        // delay 2s
        //await new Promise(resolve => setTimeout(resolve, 2000))
  
        await fetch(url, {
          method: 'PUT',
          headers: {
           'Accept': 'application/json, text/plain',
           'Content-Type': 'application/json;charset=UTF-8'
          },
          body: JSON.stringify({
            title: category.title,
            description: category.description
          }),
        })
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['put-categories'],
          
        })
      }
    })
  
    
    

    const { register,  handleSubmit,  } = useForm<CreateCategoryFormData>({
        resolver: zodResolver(createCategoryFormSchema),
      });

    //register.bind(createCategoryFormData.title) = categoria?.title;  
     
    
    
    
       //const { mutate } = useCategoryUpMutate()
       //const navigate = useNavigate();
      
      
        async function editCategory(data: CreateCategoryFormData) {
          //setOutput(JSON.stringify(data, null, 2));
          //data?.id = categoria.id;
          console.log(data);
          await mutateAsync(data)
          
        
          // if(mutate)
          //if(isSuccess) 
          navigate('/category/')
    }
    
    if (isLoading) {
      return <Carregando />
    }
    return (
    
            <div className="h-screen py-10 space-y-8">
                <div>
                 <Header />
                 <Tabs />
                 </div>
            <main className=" bg-zinc-950 text-zinc-300 flex flex-col gap-10 items-center justify-center">
              <form onSubmit={handleSubmit(editCategory)} className="flex flex-col gap-4 w-full max-w-xs" action="">
                <div className="flex flex-col gap-1">
                  <label htmlFor="title">Título</label>
                  <input 
                    className="border border-zinc-600 shadow-sm rounded h-10 px-3 bg-zinc-900 text-white"
                    {...register('title')}  defaultValue={categoriaResponse?.title}  type="text" 
                  />
                  
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="description">Descrição</label>
                  <input 
                    type="text"
                    className="border border-zinc-600 shadow-sm rounded h-10 px-3 bg-zinc-900 text-white"
                    {...register('description')} defaultValue={categoriaResponse?.description} 
                  />
                </div>
                
                <button 
                 type="submit"
                 className="bg-emerald-500 rounded font-semibold text-white h-10 hover:bg-emerald-600"
                >Salvar</button>
              </form>
              {/* {output} */}
            </main>
           </div> 
          
    )
} 