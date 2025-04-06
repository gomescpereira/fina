//import { useQuery } from "@tanstack/react-query"
import { Header } from '../Components/header'
import { Tabs } from '../Components/tabs'
import { Pagination } from '../Components/pagination'; 
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../Components/ui/table';
//import { Button } from '../Components/ui/button';
//import { Plus, Search, Filter, FileDown, MoreHorizontal, Loader2, Edit } from 'lucide-react'
// import { MoreHorizontal  } from 'lucide-react'
import {  useNavigate, useSearchParams } from 'react-router-dom';
//import { Carregando } from "../Components/carregando"
import { Pencil, Trash } from 'lucide-react';
//import {   Transaction, TagResponse } from '../Model/Transaction';
//ParamTransaction
// import { useEffect, useState } from 'react';
import { useTransactionData } from '../hooks/useTransactionData';


import { Carregando } from '../Components/carregando';
import { getmonthDateRange } from '../utils/get-month-date-rangre';
 import { useTransactionDeleteMutate } from '../hooks/useTransactionDeleteMutate';
import { Combo } from '../Components/ui/combo';


type Transaction = {
  id: string;
  title: string;
  type: number; 
  amount: number;
  consumer: number;
  pay: boolean;
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

  

//const API_URL = 'http://192.168.0.20:8080/v1';

export function ListTransactions() {

  const [searchParams] = useSearchParams();

  const page = searchParams.get('page') ? Number(searchParams.get('page')) : 1;
  

  //const [transactions, setTransactions] = useState<Transaction[]>([]);

  
  const date  = new Date();

  const currentMonth = date.getMonth() +1;

  const currentYear = date.getFullYear();


    
  // const dataInicial : string = '2024-12-01';
  // const dataFinal: string = '2024-12-31';

  const { startDate, endDate} = getmonthDateRange(currentMonth, currentYear);
  
    const navigate = useNavigate();
     
    
    const {data: tagsResponse, isLoading} = useTransactionData(startDate, endDate, page);

    const {mutate: deleteItem} = useTransactionDeleteMutate();
    
    
    //const field : string = '';
    

    //console.log({tagsResponse});
    const handleDelete = (id: string) => {

      deleteItem(id);
      console.log(`Edit item with id: ${id}`);
      // Adicione aqui a lógica para editar o item
      
    };
       
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
       <Combo />
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
                   <button 
                    type="submit"
                        onClick={() => handleDelete((tag.id))} 
                        className="gap-10"  >
                        <Trash className="size-4"/>
                    </button> 
                   
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
        </div>
        </main>

     {tagsResponse && <Pagination  pages={tagsResponse.totalPages} 
      items={tagsResponse.totalCount}
      page={tagsResponse.currentPage} 
     />}

    </div>
    )

}