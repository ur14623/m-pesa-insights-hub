import { useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Download, Calendar as CalendarIcon } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const generateMockData = (period: string, startDate?: Date, endDate?: Date, frequency?: string) => {
  if (period === "custom" && startDate && endDate && frequency) {
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (frequency === "daily") {
      return Array.from({ length: diffDays + 1 }, (_, i) => ({
        date: new Date(startDate.getTime() + i * 24 * 60 * 60 * 1000).toLocaleDateString(),
        value: Math.floor(Math.random() * 5000) + 10000,
      }));
    } else {
      // Monthly aggregation
      const months = Math.max(1, Math.ceil(diffDays / 30));
      return Array.from({ length: months }, (_, i) => ({
        date: `Month ${i + 1}`,
        value: Math.floor(Math.random() * 150000) + 300000,
      }));
    }
  } else if (period === "daily") {
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
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [frequency, setFrequency] = useState<string>("daily");

  const metricTitle = metricTitles[metricId || ""] || "Metric";

  // Static card data
  const dailyData = generateMockData("daily");
  const thirtyDayData = generateMockData("30-day");
  const ninetyDayData = generateMockData("90-day");

  const dailyValue = dailyData[dailyData.length - 1]?.value || 0;
  const thirtyDayValue = thirtyDayData.reduce((acc, d) => acc + d.value, 0);
  const ninetyDayValue = ninetyDayData.reduce((acc, d) => acc + d.value, 0);

  // Dynamic chart/table data
  const chartData = generateMockData(chartPeriod, startDate, endDate, frequency);
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
            <CardTitle className="text-sm font-medium text-muted-foreground">Daily</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-primary">{dailyValue.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground mt-1">Today's value</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">30-Day</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-primary">{thirtyDayValue.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground mt-1">Sum of last 30 days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">90-Day</CardTitle>
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
          <div className="flex flex-col space-y-4">
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
                  <SelectItem value="custom">Custom</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {chartPeriod === "custom" && (
              <div className="flex flex-wrap gap-4 items-end">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium">Start Date</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-[200px] justify-start text-left font-normal",
                          !startDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {startDate ? format(startDate, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={startDate}
                        onSelect={setStartDate}
                        initialFocus
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium">End Date</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-[200px] justify-start text-left font-normal",
                          !endDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {endDate ? format(endDate, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={endDate}
                        onSelect={setEndDate}
                        initialFocus
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium">Frequency</label>
                  <Select value={frequency} onValueChange={setFrequency}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
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
              <div className="border rounded-lg overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      {chartData.map((row, idx) => (
                        <TableHead key={idx} className="text-right">{row.date}</TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Metric Value</TableCell>
                      {chartData.map((row, idx) => (
                        <TableCell key={idx} className="text-right font-medium">{row.value.toLocaleString()}</TableCell>
                      ))}
                    </TableRow>
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
