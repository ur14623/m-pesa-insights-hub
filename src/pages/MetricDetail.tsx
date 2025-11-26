import { useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const generateMockData = (period: string) => {
  if (period === "daily") {
    return Array.from({ length: 7 }, (_, i) => ({
      date: new Date(Date.now() - (6 - i) * 24 * 60 * 60 * 1000).toLocaleDateString(),
      value: Math.floor(Math.random() * 5000) + 10000,
    }));
  } else if (period === "30-day") {
    return Array.from({ length: 30 }, (_, i) => ({
      date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toLocaleDateString(),
      value: Math.floor(Math.random() * 5000) + 10000,
    }));
  } else {
    return Array.from({ length: 3 }, (_, i) => ({
      date: `Month ${i + 1}`,
      value: Math.floor(Math.random() * 150000) + 300000,
    }));
  }
};

const metricTitles: Record<string, string> = {
  "active-total": "Active Total",
  "active-new": "Active New",
  "active-existing": "Active Existing",
  "active-existing-transacting": "Active Existing Transacting",
  "active-new-transacting": "Active New Transacting",
  "active-micro-merchants": "Active Micro Merchants",
  "active-unified-merchants": "Active Unified Merchants",
  "active-app-users": "Active App Users",
  "app-downloads": "App Downloads",
  "non-gross-adds": "Non-Gross Adds",
  "gross-adds": "Gross Adds",
  "top-up": "Top Up",
};

export default function MetricDetail() {
  const { metricId } = useParams();
  const [chartPeriod, setChartPeriod] = useState("30-day");

  const metricTitle = metricTitles[metricId || ""] || "Metric";

  // Static card data
  const dailyData = generateMockData("daily");
  const thirtyDayData = generateMockData("30-day");
  const ninetyDayData = generateMockData("90-day");

  const dailyValue = dailyData[dailyData.length - 1]?.value || 0;
  const thirtyDayValue = thirtyDayData.reduce((acc, d) => acc + d.value, 0);
  const ninetyDayValue = ninetyDayData.reduce((acc, d) => acc + d.value, 0);

  // Dynamic chart/table data
  const chartData = generateMockData(chartPeriod);
  const mean = chartPeriod === "30-day" ? chartData.reduce((acc, d) => acc + d.value, 0) / chartData.length : null;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground">{metricTitle}</h2>
        <p className="text-muted-foreground mt-1">Detailed analysis and trends</p>
      </div>

      {/* Top Section - Three Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">Daily</CardTitle>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-primary">{dailyValue.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground mt-1">Today's value</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">30-Day</CardTitle>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-primary">{thirtyDayValue.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground mt-1">Sum of last 30 days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">90-Day</CardTitle>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-primary">{ninetyDayValue.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground mt-1">Sum of last 90 days</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs - Chart & Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Analysis</CardTitle>
            <Select value={chartPeriod} onValueChange={setChartPeriod}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily (7 days)</SelectItem>
                <SelectItem value="30-day">30-Day</SelectItem>
                <SelectItem value="90-day">90-Day (3 months)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="chart" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="chart">Chart View</TabsTrigger>
              <TabsTrigger value="table">Table View</TabsTrigger>
            </TabsList>

            <TabsContent value="chart" className="space-y-4">
              <div className="flex justify-end">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="date" tick={{ fontSize: 12 }} angle={-45} textAnchor="end" height={80} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  {mean && <ReferenceLine y={mean} stroke="hsl(var(--accent))" strokeDasharray="3 3" label="Mean" />}
                  <Bar dataKey="value" fill="hsl(var(--chart-1))" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </TabsContent>

            <TabsContent value="table" className="space-y-4">
              <div className="flex justify-end">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
              <div className="border rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead className="text-right">Metric Value</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {chartData.map((row, idx) => (
                      <TableRow key={idx}>
                        <TableCell>{row.date}</TableCell>
                        <TableCell className="text-right font-medium">{row.value.toLocaleString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
