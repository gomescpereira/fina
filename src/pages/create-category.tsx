import {  useNavigate } from 'react-router-dom';
import { useCategoryMutate  } from "../hooks/useCategoryMutate";
import { useForm } from 'react-hook-form';
import { zodResolver} from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Header } from '../Components/header';
import { Tabs } from '../Components/tabs';
//import { Pagination } from '../Components/pagination';

const createCategoryFormSchema = z.object({
  title: z.string().nonempty('O titulo da categoria é obrigatório'),
  description: z.string().nonempty('A descrição também deve ser preenchida'),
});

type CreateCategoryFormData = z.infer<typeof createCategoryFormSchema>

export function CreateCategory() {

  // const data  = useQuery({

  // })

  //const [output, setOutput] = useState('');

  const { register, handleSubmit, formState: { errors } } = useForm<CreateCategoryFormData>({
    resolver: zodResolver(createCategoryFormSchema),
  });

  console.log(errors);
  const { mutate } = useCategoryMutate()
  const navigate = useNavigate();


  async function createCategory(data: CreateCategoryFormData) {
    //setOutput(JSON.stringify(data, null, 2));
    console.log(data);
    mutate(data);
    // if(mutate)
    //if(isSuccess) 
    navigate('/category/')

       

  }
  // High-order function - Conceito da programação funcional - basicamente estamos passando
  // uma função para dentro de outra função

  //Todo 
  //* [] Validação
  // [] Field Arrays
  // []Upload de arquivos
  // Composition Pattern


  return (
    
    <div className="h-screen py-10 space-y-8">
        <div>
         <Header />
         <Tabs />

         </div>
    <main className=" bg-zinc-950 text-zinc-300 flex flex-col gap-10 items-center justify-center">
      <form onSubmit={handleSubmit(createCategory)} className="flex flex-col gap-4 w-full max-w-xs" action="">
        <div className="flex flex-col gap-1">
          <label htmlFor="">Título</label>
          <input 
            className="border border-zinc-600 shadow-sm rounded h-10 px-3  bg-zinc-900 text-white"
            {...register('title')} type="text"
          />
          {errors.title && <span>{ errors.title.message }</span>}
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="">Descrição</label>
          <input 
            type="text"
            className="border border-zinc-600 shadow-sm rounded h-10 px-3 bg-zinc-900 text-white"
            {...register('description')} 
          />
          {errors.description && <span>{ errors.description.message }</span>}
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