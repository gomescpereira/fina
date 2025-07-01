'use client';

import { TrendingUp } from "lucide-react"
// import { Bar, BarChart, XAxis, YAxis } from "recharts"
import { Pie, PieChart } from "recharts"


import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"


// const chartData = [
//   { month: "January", desktop: 186 },
//   { month: "February", desktop: 305 },
//   { month: "March", desktop: 237 },
//   { month: "April", desktop: 73 },
//   { month: "May", desktop: 209 },
//   { month: "June", desktop: 214 },
// ]

export const description = "A simple pie chart"

const chartConfig = {
  category: {
    label: "Category",
    color: "transparent",    
   }
 } satisfies ChartConfig 

type DadosProps = { data: dados[] }


interface dados {
  userId: string
  category: string
  year: number
  expenses: number
}



export const  PieCharts =   ( { data } : DadosProps) => {
  //const chartData = data.filter((item) => Number(item.year) === year);
  const chartData = data.map((item) => ({
     ...item, 
     expenses: item.expenses * -1,
  }))   
  console.log("Teste de de Novo", chartData );
  return (
       <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Pie Chart</CardTitle>
        <CardDescription>Despesa por Categoria - 2025</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}    
           className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie data={chartData} dataKey="expenses" nameKey="category"></Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  )
}
