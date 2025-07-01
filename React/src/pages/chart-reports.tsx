import { useReportsData } from '../hooks/useReportsData';
import { Header } from '../Components/header';
import { Carregando } from '@/Components/carregando';
//import { BarHorizontal } from '@/Components/BarHorizontal';
//import { PieChats } from '@/Components/PieCharts';
import { BarCharts } from '@/Components/BarChart';
//import { Divide } from 'lucide-react';
import { BarHorizontal } from '@/Components/BarHorizontal';
import React from 'react';
import { Tabs } from '@/Components/tabs';
import { ChartLineDefault } from '@/Components/LineChart';
//import { Divide } from 'lucide-react';
//import { PieCharts } from '@/Components/PieCharts';


// export interface Root {
//   data: Data;
//   message: any;
// }

// export interface Data {
//   userId: string;
//   incomes: number;
//   expenses: number;
//   total: number;
// }

export interface Root {
  data: Daum[];
  message?: string;
}

export interface Daum {
  userId: string
  category: string
  year: number
  expenses: number
}


export function ChartReports() {
  
  const { data: tagResponses, isLoading } = useReportsData();

  let   dados = tagResponses?.data || [];

  
  if (isLoading) {
    return <Carregando />;
  }

  if (!tagResponses) {
    return <div>Erro ao carregar os dados.</div>;
  }
 
  dados = dados.filter(item => Number(item.year) >= 2025);
  //.map(item => Number(item.expenses * -1));

  const total = dados.reduce((acc, curr) => acc + curr.expenses, 0)* -1;

    
  console.log('Dados recebidos: 2', dados)
  return (
    <>
    <Header/>
    <Tabs />
    <span className="text-lg leading-none font-bold sm:text-3xl">
                  Total de Gastos no Ano: {total.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
     </span>
    <div className="flex items-center gap-2 mb-4">
        
       
       <div className="w-full gap-4 max-w-[800px]">
           <BarCharts data={dados} />
       </div>
       <div   className="w-full max-w-[800px]">
        <BarHorizontal data={dados} />
       </div>
       
    </div> 
    <div className="flex items-center mb-4">
        
       
       <div className="w-full  max-w-[800px]">
           <ChartLineDefault  />
       </div>
       
       
    </div> 
   
    </>
  );
}


