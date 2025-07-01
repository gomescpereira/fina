import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"


export const description = "A bar chart"



const chartConfig = {
  desktop: {
    label: "Category",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

 type DadosProps = { data: dados[] }


interface dados {
  userId: string
  category: string
  year: number
  expenses: number
}

export const  BarCharts =   ( { data } : DadosProps) => {
   
  
  const chartData = data.map((item) => ({
     ...item, 
     expenses: item.expenses * -1,
      
    }))

  
      
  //console.log("Dados para o gráfico:", chartData);
  //console.log("Teste de de Novo", data );
  return (
     <Card>
      <CardHeader>
        <CardTitle>Gráfico de Barras</CardTitle>
        <CardDescription>Categories - 2025</CardDescription>
      </CardHeader>
     
      <CardContent>
        <ChartContainer config={chartConfig} >
               <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="category"
              tickLine={true}
              tickMargin={10}
              axisLine={true}
              tickFormatter={(value) => value.slice(0, 3)}
              tick={{ fill: '#fff', fontWeight: 500, fontSize: 14 }}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="expenses" fill="var(--color-desktop)" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  )
}
