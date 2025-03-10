//import { useQuery } from "@tanstack/react-query"
import { Header } from '../Components/header'
import { Tabs } from '../Components/tabs'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../Components/ui/table';
//import { Button } from '../Components/ui/button';
//import { Plus, Search, Filter, FileDown, MoreHorizontal, Loader2, Edit } from 'lucide-react'
// import { MoreHorizontal  } from 'lucide-react'
import {  useNavigate } from 'react-router-dom';
import { Carregando } from "../Components/carregando";
import { Pencil } from 'lucide-react';
import { useFinancyData } from '../hooks/useFinancyData';


export interface TagResponse {
  _id: string;
  currencyday: Date;
  dolarBuy: number;
  dolarSell: number;
  btcBuy: number;
  btcSell: number;
  eurBuy: number;
  eurSell: number;
}

export function ListFinancies() {

    const navigate = useNavigate()

    
    const {data: tagsResponse, isLoading} = useFinancyData();

    const handleEdit = (id: string) => {
      console.log(`Edit item with id: ${id}`);
      // Adicione aqui a lógica para editar o item
      navigate(`/category/${id}`);
    };

  
    
    if (isLoading) {
        return <Carregando />
        
    }

    return (
      <div className="py-10 space-y-8">
        <div>
         <Header />
         <Tabs />
      </div>
      <main className="max-w-6xl mx-auto space-y-5">
        <div className="flex items-center gap-3">
          {/* <h1 className="text-xl font-bold">Tags</h1> */}
         <Table>
          <TableHeader>
            <TableRow>
              <TableHead></TableHead>
              <TableHead>Dolar</TableHead>
              <TableHead>Dolar</TableHead>
              <TableHead>BTC</TableHead>
              <TableHead>BTC</TableHead>
              <TableHead>EUR</TableHead>
              <TableHead>EUR</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            { tagsResponse?.map((tag ) => {
              return (
                <TableRow key={tag._id}>
                  <TableCell></TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-0.5">
                      <span className="font-medium">{tag.dolarBuy}</span>

                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-0.5">
                      <span className="font-medium">{tag.dolarSell}</span>

                    </div>
                  </TableCell>
                  <TableCell className="text-zinc-300">
                    {tag.btcBuy}
                  </TableCell>
                  <TableCell className="text-zinc-300">
                    {tag.btcSell}
                  </TableCell>
                  <TableCell className="text-zinc-300">
                    {tag.eurBuy}
                  </TableCell>
                  <TableCell className="text-zinc-300">
                    {tag.eurSell}
                  </TableCell>
                  <TableCell className="text-right gap-2">
                    
                    <button 
                    type="submit"
                        onClick={() => handleEdit(tag._id)} 
                         className="gap-5">
                        <Pencil className="bg-orange-400 text-orange-950 size-4 rounded"   />
                    </button>
                    {/* <button 
                    type="submit"
                        onClick={() => handleDelete(tag.id)} 
                        //onClick={handleEditCategory}
                        className="size-2"  >
                        <Trash className="size-4"/>
                    </button> */}
                    {/* onClick={handleEditCategory(tag.id)}  */}
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
        </div>
        </main>
    </div>
    )

}