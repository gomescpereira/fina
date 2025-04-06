import { ResponsiveContainer, PieChart, Pie, Tooltip } from "recharts"

// interface Props {

interface PieProps {
  data: expanse[]
  message: string;
}

interface expanse {
  userId: string
  category: string
  year:number
  expenses: number
}


    

 
export const SimplePieCharts = (props:PieProps) => {
    return ( 
        <ResponsiveContainer width="100%" height="100%" aspect={2}>
         <PieChart>
          <Pie 
           dataKey="props.data.expanses"
           data={props.data}
           innerRadius={60} 
           outerRadius={85}
           >
         </Pie>
         <Tooltip />
         </PieChart>
         
        </ResponsiveContainer>
     );
}
 
