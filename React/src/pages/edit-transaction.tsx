import { useNavigate, useParams } from "react-router-dom"
import { Header } from '../Components/header';
import { Tabs } from '../Components/tabs';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../Components/ui/select";
import { Label } from "../Components/ui/label";
import { zodResolver} from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useTransactionEditData } from "../hooks/useTransactionEditData";
import { Carregando } from "../Components/carregando";
import { useCategoryData } from "../hooks/useCategoryData";



const createTransactionFormSchema = z.object({
  title: z.string().nonempty('O titulo da transacao é obrigatório'),
  //description: z.string().nonempty('A descrição também deve ser preenchida'),
  tipo: z.coerce.number(),
  category_Id: z.coerce.number(),
  amount: z.coerce.number(),
  consumer: z.coerce.number(),
  pay: z.boolean(),
  paidOrReceivedAt: z.coerce.date(),

});

type CreateTransactionFormData = z.infer<typeof createTransactionFormSchema>

export function EditTransaction() {
    const paramms = useParams(); 
    const id = paramms?.transactionid;

    //const [transactions, setTransaction] = useState<Transaction>({})
    //console.log(id)
    const {data: tagsCaterories} = useCategoryData();
    
    
    const navigate = useNavigate();

    const queryClient = useQueryClient()

    // const url = `http://localhost:5250/v1/transactions/${id}`;
    const API_URL = 'http://192.168.0.20:8080/v1';



    const {data: transactionResponse, isLoading}= useTransactionEditData(id);
   
    console.log("Recebeu estes Dados", {transactionResponse})
   

    const { mutateAsync } = useMutation({
      mutationFn: async (transaction: CreateTransactionFormData) => {
        // delay 2s
        //await new Promise(resolve => setTimeout(resolve, 2000))
        console.log("Enviando estes Dados",{transaction});
        await fetch( API_URL + `/transactions/${id}`, {
          method: 'PUT',
          headers: {
           'Accept': 'application/json',
           'Content-Type': 'application/json;charset=UTF-8'
          },
          body: JSON.stringify({
            title: transaction.title,
            type: transaction.tipo,
            categoryId: transaction.category_Id,
            amount: transaction.amount,
            consumer: transaction.consumer,
            paidOrReceivedAt: transaction.paidOrReceivedAt,
            pay: transaction.pay,

          }),
        })
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['put-transactions'],
          
        })
      }
    })
  
    
    

    const { register, control, handleSubmit,  } = useForm<CreateTransactionFormData>({
        resolver: zodResolver(createTransactionFormSchema),
      });

        
    async function edittransaction(data: CreateTransactionFormData) {
          //setOutput(JSON.stringify(data, null, 2));
          //data?.id = transacao.id;
          console.log("Editar", {data});
          await mutateAsync(data)
           navigate('/transaction')
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
              <form onSubmit={handleSubmit(edittransaction)} className="flex flex-col gap-4 w-full max-w-xs" action="">
                <div className="flex flex-col gap-1">
                  <label htmlFor="title">Título</label>
                  <input 
                    className="border border-zinc-600 shadow-sm rounded h-10 px-3 bg-zinc-900 text-white"
                    {...register('title')}  defaultValue={transactionResponse?.title}   type="text" 
                  />
                  
         
        
           </div>

           {/* {transactionResponse?.category_id === 4 ? sim" : "não"}  */}
           <div className="flex flex-col gap-1">
          
          <label>Consumo</label>
          <input
            className="border border-zinc-600 shadow-sm rounded h-10 px-3  bg-zinc-900 text-white"
            {...register('consumer')} defaultValue={transactionResponse?.consumer} type="text"
          />
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
                <SelectContent className='bg-orange-500 text-black' defaultValue={transactionResponse?.type} >
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
                   {tagsCaterories?.data.map((categoria) => (
                     <SelectItem key={categoria.id} value={categoria?.id.toString()}>
                       {categoria.title}
                     </SelectItem>
                  ))}
               
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
            {...register('amount')} defaultValue={transactionResponse?.amount}
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
              {...register('pay')} defaultChecked={transactionResponse?.pay}
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