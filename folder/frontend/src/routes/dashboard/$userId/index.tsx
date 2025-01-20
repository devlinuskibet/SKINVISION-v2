import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { createFileRoute } from '@tanstack/react-router'
import { ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, Line, Pie, Cell, BarChart, LineChart, PieChart, AreaChart, Area } from 'recharts'


export const Route = createFileRoute('/dashboard/$userId/')({
  component: AnalyticsPage
})

function AnalyticsPage() {
  // Sample data for charts
  const locationData = [
    { name: 'New York', value: 400 },
    { name: 'Los Angeles', value: 300 },
    { name: 'Chicago', value: 200 },
    { name: 'Houston', value: 150 },
    { name: 'Phoenix', value: 100 },
  ]

  const usersDiagnosedData = [
    { name: 'Jan', users: 4000 },
    { name: 'Feb', users: 3000 },
    { name: 'Mar', users: 2000 },
    { name: 'Apr', users: 2780 },
    { name: 'May', users: 1890 },
    { name: 'Jun', users: 2390 },
  ]

  const diagnosisCategoryData = [
    { name: 'Melanoma', value: 400 },
    { name: 'Eczema', value: 300 },
    { name: 'Psoriasis', value: 300 },
    { name: 'Acne', value: 200 },
    { name: 'Rosacea', value: 100 },
  ]

  const diagnosisTimeData = [
    { name: 'Week 1', melanoma: 40, eczema: 24, psoriasis: 24 },
    { name: 'Week 2', melanoma: 30, eczema: 13, psoriasis: 22 },
    { name: 'Week 3', melanoma: 20, eczema: 98, psoriasis: 22 },
    { name: 'Week 4', melanoma: 27, eczema: 39, psoriasis: 20 },
    { name: 'Week 5', melanoma: 18, eczema: 48, psoriasis: 21 },
    { name: 'Week 6', melanoma: 23, eczema: 38, psoriasis: 25 },
  ]

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8']
  const config1 = {
    name: {
      label: "Disease",
      color: "hsl(var(--chart-1))"
    }
  } satisfies ChartConfig

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Disease Analytics</CardTitle>
          <CardDescription>Insights on diagnosed diseases</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-2">Location Analysis</h3>
              <ChartContainer className='h-[300px] w-[100%]' config={config1}>
                <BarChart data={locationData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="value" fill="#8884d8" radius={4} />
                </BarChart>
              </ChartContainer>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-2">Total Users Diagnosed</h3>
              <ChartContainer  className='h-[300px] w-[100%]' config={config1}>
                <AreaChart accessibilityLayer  data={usersDiagnosedData}>
                  <CartesianGrid vertical={false} strokeDasharray="3 3" />
                  <XAxis dataKey="name" tickLine={false} axisLine={false} tickMargin={8} />
                  <YAxis dataKey={"users"}  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area type="natural" dataKey="users" stroke="#82ca9d" fill='#82ca9d' fillOpacity={0.4} />
                </AreaChart>
              </ChartContainer>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-2">Diagnosis by Category</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={diagnosisCategoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {diagnosisCategoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-2">Diagnosis Over Time</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={diagnosisTimeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="melanoma" stroke="#8884d8" />
                  <Line type="monotone" dataKey="eczema" stroke="#82ca9d" />
                  <Line type="monotone" dataKey="psoriasis" stroke="#ffc658" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
