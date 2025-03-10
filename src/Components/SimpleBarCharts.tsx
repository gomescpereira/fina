
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from "recharts"

interface TagResponse {
  userId: string
  category: string
  year:number
  expenses: number
}

 export interface TagResponseProps {
   data: TagResponse[];
   message: string;
 }


 

// interface PieProps {
//   data: expanse[]
//   message: string;
// }

// interface expanse {
//   userId: string
//   category: string
//   year:number
//   expenses: number
// }


// interface dados {
//   name: string
//   age: number
//   weight: number

// }
// const pesos: dados[] = [
//   {name: "Maria", age: 10, weight: 60},
//   {name: "João", age: 15, weight: 46},
//   {name: "Tereza", age: 21, weight: 60},
//   {name: "Cristina", age: 17, weight: 50},
//   {name: "Teofilo", age: 16, weight: 45},
//   {name: "Pedro", age: 51, weight: 56},
//   {name: "Roberto", age: 33, weight: 44},
//   {name: "Eduardo", age: 10, weight: 60}
// ]

export const SimpleBarCharts = (props:TagResponseProps ) => {

   console.log("Teste", props.data )
    return (  
      <ResponsiveContainer width="100%" height="100%" aspect={2}>
        <BarChart 
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
        <CartesianGrid strokeDasharray="4 1 2" />
        <XAxis dataKey="category" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="year" fill="#1ee3cf"/>
        {/* <Bar dataKey="category" fill="#1ee3cf"/> */}

        </BarChart>
      </ResponsiveContainer>
    )
}