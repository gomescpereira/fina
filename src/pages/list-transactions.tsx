//import { useQuery } from "@tanstack/react-query"
import { Header } from '../Components/header'
import { Tabs } from '../Components/tabs'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../Components/ui/table';
//import { Button } from '../Components/ui/button';
//import { Plus, Search, Filter, FileDown, MoreHorizontal, Loader2, Edit } from 'lucide-react'
// import { MoreHorizontal  } from 'lucide-react'
import {  useNavigate } from 'react-router-dom';
//import { Carregando } from "../Components/carregando"
import { Pencil } from 'lucide-react';
//import {   Transaction, TagResponse } from '../Model/Transaction';
//ParamTransaction
// import { useEffect, useState } from 'react';
import { useTransactionData } from '../hooks/useTransactionData';
import { Carregando } from '../Components/carregando';
// import { useTransactionData } from '../hooks/useTransactionData';


type Transaction = {
  id: string;
  title: string;
  type: number; 
  amount: number;
  category_id: string;
  paidOrReceivedAt: Date;
};

export interface TagResponse {
  currentPage: number
  totalPages: number
  pageSize: number
  totalCount: number
  data: Transaction[]
  message: string;
}

  

//const API_URL = 'http://localhost:5250/v1';

export function ListTransactions() {

  //const [transactions, setTransactions] = useState<Transaction[]>([]);
    
  const dataInicial: string = '2024-10-01';
  const dataFinal: string = '2024-10-31';
  
    const navigate = useNavigate();
     
    
    const {data: tagsResponse, isLoading} = useTransactionData(dataInicial, dataFinal);
    
    
    
    

    console.log({tagsResponse});

       
    const handleEdit = (id: number) => {
      console.log(`Edit item with id: ${id}`);
      // Adicione aqui a lógica para editar o item
      navigate(`/transactions/${id}`);
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
              <TableHead>Transações</TableHead>
              <TableHead>Descrição das Transações</TableHead>
              <TableHead>Pago</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tagsResponse?.data.map((tag) => {
              return (
                <TableRow key={tag.id}>
                  <TableCell></TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-0.5">
                      <span className="font-medium">{tag.title}</span>

                    </div>
                  </TableCell>
                  <TableCell className="text-zinc-300">
                    {tag.amount}
                  </TableCell>
                  <TableCell className="text-zinc-300">
                    {tag.pay ? "sim" : "não"}
                  </TableCell>
                  <TableCell className="text-right gap-2">
                    
                    <button 
                    type="submit"
                        onClick={() => handleEdit(parseInt(tag.id))} 
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