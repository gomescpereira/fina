// import { zodResolver } from "@hookform/resolvers/zod";
// import { Label, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@radix-ui/react-select"
 import { useForm } from "react-hook-form"
//import { Input } from "./input";
import { Search } from "lucide-react";
import { Button } from "./button";
// import { z } from "zod";

// const createComboFormSchema = z.object({
//     mes: z.coerce.number(),
//   });

// type CreateComboFormData = z.infer<typeof createComboFormSchema>


// const { register, handleSubmit, formState: { errors } } = useForm<CreateCategoryFormData>({
//     resolver: zodResolver(CreateComboFormData)
//   });


 export function Combo() {
 const { register, handleSubmit  }  = useForm();

 function handlerFilterListagem(data: any) {
    console.log(data)
 }
  
 return (
    <div className="flex flex-col gap-2">
    
    <form onSubmit={handleSubmit(handlerFilterListagem)} >

        {/* <Input  children={undefined} {...register('id')} /> */}
        <input type="text"    {...register('title')} />
        <Button type="submit">
            <Search className="size-4 mr-2"/>
            Filtrar resultados
        </Button>
    </form>
    </div>
 )
}

/* //           <Controller
//            control={control}
//            name="mes"
//            render={({ field }) => {
//             return (
//               <>
//               <Label>Tipo</Label>
//               <Select  onValueChange={field.onChange}  >
//                 <SelectTrigger >
//                   <SelectValue placeholder="Selecione o tipo de transação" />
//                 </SelectTrigger>
//                 <SelectContent className='bg-orange-500 text-black'>
//                   <SelectItem value="1">Janeiro</SelectItem>
//                   <SelectItem value="2">Fevereiro</SelectItem>
//                   <SelectItem value="3">Março</SelectItem>
//                   <SelectItem value="4">Abril</SelectItem>
//                 </SelectContent>
//               </Select>
//               </>
//             )
//            }}

//           />
//         </div>
// )
// } */

