import { Search } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const transactionFiltersSchema = z.object({
    id: z.string(),
    name: z.string()
})

type TransactionsFiltersSchema = z.infer<typeof transactionFiltersSchema >

export  function TransactionsFilters() {
    const { register , handleSubmit} = useForm<TransactionsFiltersSchema>({
        resolver: zodResolver(transactionFiltersSchema),
    })

    function handleFilterTransaction(data: TransactionsFiltersSchema){
        console.log(data);

    };

 return ( 
    <>
      <form  onSubmit={handleSubmit(handleFilterTransaction)} className="flex items-center gap-2">
        <Input  children={undefined} {...register('id')}/>
        <Input children={undefined} {...register("name")} />
        <Button type="submit" > 
            <Search className="size-4 mr-2" />
            Filtrar resultados
        </Button>

      </form>
    </>
 )
}