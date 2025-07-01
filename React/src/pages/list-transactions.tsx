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
import {  useState } from 'react';
import { useTransactionData } from '../hooks/useTransactionData';
import { MonthSelect } from "../Components/MonthSelect";


import { Carregando } from '../Components/carregando';
import { getmonthDateRange } from '../utils/get-month-date-rangre';
 import { useTransactionDeleteMutate } from '../hooks/useTransactionDeleteMutate';
//import { Combo } from '../Components/ui/combo';


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
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page') ? Number(searchParams.get('page')) : 1;

  const date = new Date();
  const currentYear = date.getFullYear();
  const [currentMonth, setCurrentMonth] = useState(date.getMonth() + 1);

  const { startDate, endDate } = getmonthDateRange(currentMonth, currentYear);
  const { data: tagsResponse, isLoading, isFetching } = useTransactionData(startDate, endDate, page);
  const { mutate: deleteItem } = useTransactionDeleteMutate();

  const handleMonthChange = (value: string) => {
    setCurrentMonth(parseInt(value));
    // Reset para página 1 quando mudar o mês
    navigate('?page=1');
  };

  const handleEdit = (id: string) => {
    navigate(`/transactions/${id}`);
  };

  const handleDelete = (id: string) => {
    deleteItem(id);
  };

  if (isLoading) {
    return <Carregando />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Tabs />
      
      <main className="flex-1 p-6 gap-4">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold">Transações</h1>
            <div className="flex items-center gap-2">
              <MonthSelect
                onValueChange={handleMonthChange}
                defaultValue={String(currentMonth).padStart(2, '0')}
              />
              {isFetching && <Carregando />}
            </div>
          </div>

          <div className="border rounded-lg p-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Título</TableHead>
                  <TableHead>Valor</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tagsResponse?.data.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>
                      <div className="flex flex-col gap-0.5">
                        <span className="font-medium">{transaction.title}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-zinc-300">
                      {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                      }).format(transaction.amount)}
                    </TableCell>
                    <TableCell className="text-zinc-300">
                      {transaction.type === 1 ? 'Entrada' : 'Saída'}
                    </TableCell>
                    <TableCell className="text-zinc-300">
                      {transaction.pay ? 'Pago' : 'Pendente'}
                    </TableCell>
                    <TableCell className="text-zinc-300">
                      {new Date(transaction.paidOrReceivedAt).toLocaleDateString('pt-BR')}
                    </TableCell>
                    <TableCell className="flex gap-2">
                      <button
                        onClick={() => handleEdit(transaction.id)}
                        className="p-2 hover:bg-zinc-800 rounded-md"
                      >
                        <Pencil className="size-4 text-zinc-300" />
                      </button>
                      <button
                        onClick={() => handleDelete(transaction.id)}
                        className="p-2 hover:bg-zinc-800 rounded-md"
                      >
                        <Trash className="size-4 text-red-300" />
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {tagsResponse && (
            <Pagination
              page={page}
              pages={tagsResponse.totalPages}
              items={tagsResponse.totalCount}
            />
          )}
        </div>
      </main>
    </div>
  );
}


