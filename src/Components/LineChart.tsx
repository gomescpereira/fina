'use client';
//import { Area, AreaChart, ResponsiveContainer} from 'recharts';
import { LineChart, Line, XAxis, YAxis, CartesianGrid,  Legend, ResponsiveContainer, Tooltip } from 'recharts';


interface TagResponse {
  _id: string;
  currencyday: Date;
  dolarBuy: number;
  dolarSell: number;
  btcBuy: number;
  btcSell: number;
  eurBuy: number;
  eurSell: number;
}

 export interface TagResponseProps {
   data: TagResponse[]
 }

// interface amostra {
//   name: string
//   uv: number
//   pv: number
//   amt: number
// }

// const teste: amostra[] = [
//     {
//       name: 'Page A',
//       uv: 4000,
//       pv: 2400,
//       amt: 2400,
//     },
//     {
//       name: 'Page B',
//       uv: 3000,
//       pv: 1398,
//       amt: 2210,
//     },
//     {
//       name: 'Page C',
//       uv: 2000,
//       pv: 9800,
//       amt: 2290,
//     },
//     {
//       name: 'Page D',
//       uv: 2780,
//       pv: 3908,
//       amt: 2000,
//     },
//     {
//       name: 'Page E',
//       uv: 1890,
//       pv: 4800,
//       amt: 2181,
//     },
//     {
//       name: 'Page F',
//       uv: 2390,
//       pv: 3800,
//       amt: 2500,
//     },
//     {
//       name: 'Page G',
//       uv: 3490,
//       pv: 4300,
//       amt: 2100,
//     },
//   ];
  

export const LineChartComponent = (props:TagResponseProps) => {
    return (
      <ResponsiveContainer width="100%" height="100%" aspect={2}>
        <LineChart 
          data={props.data}
          width={500}
          height={300}
          margin={
            {
              top:5,
              right:30,
              left:20,
              bottom:5
            }
         }
        >
    <CartesianGrid strokeDasharray="4 1, 2" />
    <XAxis dataKey="currencyday" />
    <YAxis />
    <Tooltip />
    <Legend />
    <Line type="monotone" dataKey="dolarBuy"  fill="#6b48ff" />
    <Line type="monotone" dataKey="eurBuy" fill="#8b5cf6" />  
    
   </LineChart>
 </ResponsiveContainer> 
);
};

// export default LineChartComponent;