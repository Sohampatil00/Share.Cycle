"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Leaf, Recycle, Truck } from "lucide-react";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"

const chartData = [
  { neighborhood: "Koregaon Park", savings: 186, fill: "var(--color-chart-1)" },
  { neighborhood: "Wakad", savings: 305, fill: "var(--color-chart-1)" },
  { neighborhood: "Viman Nagar", savings: 237, fill: "var(--color-chart-1)" },
  { neighborhood: "Hinjewadi", savings: 73, fill: "var(--color-chart-1)" },
  { neighborhood: "Baner", savings: 209, fill: "var(--color-chart-1)" },
  { neighborhood: "Aundh", savings: 214, fill: "var(--color-chart-1)" },
]

const chartConfig = {
    savings: {
      label: "CO₂ Savings (kg)",
      color: "hsl(var(--chart-1))",
    },
  }

export default function SustainabilityDashboard() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-green-800 dark:text-green-300">Carbon Savings</CardTitle>
                <Leaf className="h-4 w-4 text-green-600 dark:text-green-400" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold text-green-900 dark:text-green-200">2,431 kg</div>
                <p className="text-xs text-green-700 dark:text-green-400">
                Equivalent to planting 40 trees
                </p>
            </CardContent>
        </Card>
        <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-blue-800 dark:text-blue-300">Landfill Waste Prevented</CardTitle>
                <Recycle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold text-blue-900 dark:text-blue-200">812 items</div>
                <p className="text-xs text-blue-700 dark:text-blue-400">
                Diverted from ending up in landfills
                </p>
            </CardContent>
        </Card>
        <Card className="bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-orange-800 dark:text-orange-300">Emissions Reduced</CardTitle>
                <Truck className="h-4 w-4 text-orange-600 dark:text-orange-400" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold text-orange-900 dark:text-orange-200">6,500 km</div>
                <p className="text-xs text-orange-700 dark:text-orange-400">
                Saved in manufacturing & delivery travel
                </p>
            </CardContent>
        </Card>
        <Card className="md:col-span-2 lg:col-span-3">
            <CardHeader>
                <CardTitle className="font-headline">Community Leaderboard</CardTitle>
                <CardDescription>Top CO₂ saving neighborhoods in Pune this month.</CardDescription>
            </CardHeader>
            <CardContent>
            <ChartContainer config={chartConfig} className="h-[250px] w-full">
                <BarChart accessibilityLayer data={chartData}>
                    <CartesianGrid vertical={false} />
                    <XAxis
                    dataKey="neighborhood"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value) => value.slice(0, 3)}
                    />
                    <YAxis />
                    <Tooltip cursor={false} content={<ChartTooltipContent />} />
                    <Bar dataKey="savings" radius={8} />
                </BarChart>
            </ChartContainer>
            </CardContent>
        </Card>
    </div>
  );
}
