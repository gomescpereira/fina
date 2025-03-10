//import {  useNavigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver} from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../Components/ui/select";
import { Label } from "../Components/ui/label";
import {  useState } from 'react';
import  CreateTransactionRequest   from '../Model/Transaction'
import { useTransactionMutate } from '../hooks/useTransactionMutate';
import { useCategoryData } from '../hooks/useCategoryData';
import { Header } from '../Components/header';
import { Tabs } from '../Components/tabs';
//import { createTransaction } from '../hooks/create-transaction';
//import { useQueryClient } from '@tanstack/react-query'
//import { toast } from 'sonner';


const createTransactionFormSchema = z.object({
    title: z.string().nonempty('O titulo da categoria é obrigatório'),
    //description: z.string().nonempty('A descrição também deve ser preenchida'),
    tipo: z.coerce.number(),
    category_Id: z.coerce.number(),
    amount: z.coerce.number(),
    consumer: z.coerce.number(),
    pay: z.boolean(),
    paidOrReceivedAt: z.coerce.date(),

  });

type CreateTransactionFormData = z.infer<typeof createTransactionFormSchema>

export function CreateTransaction() {
  //const queryClient = useQueryClient()
  const { mutate } = useTransactionMutate()

   //const [categorias, setCategorias] = useState<CreateTransactionFormData> = null
   const [output, setOutput] = useState<CreateTransactionFormData>();




    //const navigate = useNavigate();
    //onst { register, control, handleSubmit,// formState: { errors }
    const {data: tagsResponse} = useCategoryData();

    //console.log("Category",categorias.id)
    const { register, control, handleSubmit } = useForm<CreateTransactionFormData>({
        resolver: zodResolver(createTransactionFormSchema),
        defaultValues: {

           title: '',
           tipo: 1,
           category_Id: 1,
           amount: 0,
           paidOrReceivedAt: new Date(Date.now()),
           pay: false,
           consumer: 0,

         }
      });

    async function createFormTransaction(data?: CreateTransactionFormData) {
        //queryClient.invalidateQueries({ queryKey: ['transaction']})
        //setOutput(JSON.stringify(data, null, 2));
        //console.log({ data })
        if (data){
          const dados =  new CreateTransactionRequest();
          dados.title = data?.title;
 //         dados.description = data?.description;
          dados.tipo = data?.tipo;
          dados.categoryId = data?.category_Id;
          dados.amount =  data?.amount;
          dados.consumer = data?.consumer;
          dados.pay = data?.pay;
          dados.paidOrReceivedAt = (data?.paidOrReceivedAt);
          mutate(dados);

          // data.title ='';
          // data.tipo = 0;
          // data.category_Id = 0;
          // data.amount = 0;
          // data.consumer = 0;
          // data.pay = false;
         // data.paidOrReceivedAt = 



        }


        setOutput(data);





    }

    return (
      <div className="h-screen py-10 space-y-8">
      <div>
       <Header />
       <Tabs />
      
      </div>

     <main className=" bg-zinc-950 text-zinc-300 flex flex-col gap-10 items-center justify-center">
      <form onSubmit={handleSubmit(createFormTransaction)} className="flex flex-col gap-4 w-full max-w-xs" action="">

        <div className="flex flex-col gap-1">
          {/* <label htmlFor="title">title</label> */}
          <label>Título</label>
          <input
            className="border border-zinc-600 shadow-sm rounded h-10 px-3  bg-zinc-900 text-white"
            {...register('title')} type="text"
          />
          {/* {errors.title && <span>{ errors.title.message }</span>} */}
        </div>

        <div className="flex flex-col gap-1">
          {/* <label htmlFor="title">title</label> */}
          <label>Consumo</label>
          <input
            className="border border-zinc-600 shadow-sm rounded h-10 px-3  bg-zinc-900 text-white"
            {...register('consumer')} type="text"
          />
          {/* {errors.title && <span>{ errors.title.message }</span>} */}
        </div>


        <div className="flex flex-col gap-2">
          <Controller
           control={control}
           name="tipo"
           render={({ field }) => {
            return (
              <>
              <Label>Tipo</Label>
              <Select  onValueChange={field.onChange}  >
                <SelectTrigger >
                  <SelectValue placeholder="Selecione o tipo de transação" />
                </SelectTrigger>
                <SelectContent className='bg-orange-500 text-black'>
                  <SelectItem value="2">Retirada</SelectItem>
                  <SelectItem value="1">Deposito</SelectItem>
                  <SelectItem value="3">Investimento</SelectItem>
                  <SelectItem value="4">Resgate</SelectItem>
                </SelectContent>
              </Select>
              </>
            )
           }}

          />
        </div>
        <div className="flex flex-col gap-2">
          <Controller
           control={control}
           name="category_Id"
           render={({ field }) => {
            return (
              <>

              <Label>Categorias</Label>
              <Select onValueChange={field.onChange}  >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a Categoria" />
                </SelectTrigger>
                <SelectContent className='bg-orange-500 text-black'>
                   {tagsResponse?.data.map((categoria) => (
                     <SelectItem key={categoria.id} value={categoria?.id.toString()}>
                       {categoria.title}
                     </SelectItem>
                  ))}
                  {/* <SelectItem value="4">Despesas Básicas</SelectItem>
                  <SelectItem value="1">Alimentação</SelectItem> */}
                </SelectContent>
              </Select>
              </>
            )
           }}

          />
        </div>


        <div className="flex flex-col gap-1">
          {/* <label for="amount">Valor</label> */}
          <label>Valor</label>
          <input
            type="text"
            className="border border-zinc-600 shadow-sm rounded h-10 px-3 bg-zinc-900 text-white"
            {...register('amount')}
          />
          {/* {errors.description && <span>{ errors.description.message }</span>} */}
        </div>
        <div className="flex flex-col gap-1">
          {/* <label for="amount">Valor</label> */}
          <label>Pagar ou Receber</label>
          <input
            type="date"
            className="border border-zinc-600 shadow-sm rounded h-10 px-3 bg-zinc-900 text-white"
            {...register('paidOrReceivedAt')}
          />
          {/* {errors.description && <span>{ errors.description.message }</span>} */}
        </div>
        <div className="flex flex-col gap-1">
            <label htmlFor="status">Pagar</label>
            <input
              type="checkbox"
              className="border-zinc-800 h-10 px-0 left-0 bg-zinc-800"
              {...register('pay')}
             />

          </div>

        <button
         type="submit"
         className="bg-emerald-500 rounded font-semibold text-white h-10 hover:bg-emerald-600"
        >Salvar</button>
      </form>
    {JSON.stringify(output, null, 2) }

    </main>
    </div>
    )
}

//value={field.value}