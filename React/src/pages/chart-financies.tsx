//import { useQuery } from "@tanstack/react-query"
//import { Button } from '../Components/ui/button';
//import { Plus, Search, Filter, FileDown, MoreHorizontal, Loader2, Edit } from 'lucide-react'
// import { MoreHorizontal  } from 'lucide-react'
// import {  useNavigate } from 'react-router-dom';
// import { Carregando } from "../Components/carregando";
// import { Pencil } from 'lucide-react';
import { useFinancyData } from '../hooks/useFinancyData';

//import   { PureComponent } from 'react';

import { Header } from '../Components/header';
import { LineChartComponent } from '../Components/LineChart';
import { SimpleBarCharts } from '../Components/SimpleBarCharts';
//import { useFinancyData } from '../hooks/useFinancyData';
//import { SimplePieCharts } from '../Components/SimplePieCharts';
import { useCategoryGraph } from '../hooks/useCategoryGraph';

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





//const data = array.map(x => ({pv: x}));

// return (
//   <LineChart data={data}>
//     <Line type="monotone" dataKey="pv" stroke="#8884d8" />
//   </LineChart>
// );

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

export interface PieResponse {
  data: expanse[];

}

export interface expanse {
  userId: string
  category: string
  year:number
  expenses: number
}

export function ChartFinancies() {

    const {data: tagsResponse} = useFinancyData();
    const {data: PieResponse} = useCategoryGraph();
    //console.log({tagsResponse})
    return (
      <>
      <Header/>
      <div className="w-full gap-4 max-w-[800px]">
      <LineChartComponent data={tagsResponse} /> 
      {/* <SimplePieCharts data={PieResponse} /> */}
      <SimpleBarCharts data={PieResponse} />
      

      </div>
      </>
    )  
      
}

