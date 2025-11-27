import { useState } from "react";
import { MetricCard } from "@/components/MetricCard";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarIcon, Download } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const metrics = [
  { title: "Active Total", slug: "active-total" },
  { title: "Active New", slug: "active-new" },
  { title: "Active Existing", slug: "active-existing" },
  { title: "Active Existing Transacting", slug: "active-existing-transacting" },
  { title: "Active New Transacting", slug: "active-new-transacting" },
  { title: "Active Micro Merchants", slug: "active-micro-merchants" },
  { title: "Active Unified Merchants", slug: "active-unified-merchants" },
  { title: "Active App Users", slug: "active-app-users" },
  { title: "App Downloads", slug: "app-downloads" },
  { title: "Non-Gross Adds", slug: "non-gross-adds" },
  { title: "Gross Adds", slug: "gross-adds" },
  { title: "Top Up", slug: "top-up" },
];

const generateMockData = (period: string, startDate?: Date, endDate?: Date, frequency?: string) => {
  if (period === "custom" && startDate && endDate && frequency) {
    if (frequency === "monthly") {
      const months = Math.ceil((endDate.getTime() - startDate.getTime()) / (30 * 24 * 60 * 60 * 1000));
      return Array.from({ length: Math.min(months, 12) }, (_, i) => ({
        date: format(new Date(startDate.getTime() + i * 30 * 24 * 60 * 60 * 1000), "MMM yyyy"),
        value: Math.floor(Math.random() * 150000) + 300000,
      }));
    } else {
      const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (24 * 60 * 60 * 1000));
      return Array.from({ length: Math.min(days, 90) }, (_, i) => ({
        date: format(new Date(startDate.getTime() + i * 24 * 60 * 60 * 1000), "MMM dd"),
        value: Math.floor(Math.random() * 5000) + 10000,
      }));
    }
  } else if (period === "daily") {
    return Array.from({ length: 7 }, (_, i) => ({
      date: format(new Date(Date.now() - (6 - i) * 24 * 60 * 60 * 1000), "MMM dd"),
      value: Math.floor(Math.random() * 5000) + 10000,
    }));
  } else if (period === "30-day") {
    return Array.from({ length: 30 }, (_, i) => ({
      date: format(new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000), "MMM dd"),
      value: Math.floor(Math.random() * 5000) + 10000,
    }));
  } else {
    return Array.from({ length: 3 }, (_, i) => ({
      date: `Month ${i + 1}`,
      value: Math.floor(Math.random() * 150000) + 300000,
    }));
  }
};

export default function Dashboard() {
  const navigate = useNavigate();
  const [viewTab, setViewTab] = useState<"chart" | "card" | "table">("card");
  const [period, setPeriod] = useState<"daily" | "30-day" | "90-day">("daily");
  const [chartPeriod, setChartPeriod] = useState("daily");
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [frequency, setFrequency] = useState("daily");

  const data = generateMockData(chartPeriod, startDate, endDate, frequency);
  const meanValue = chartPeriod === "30-day" ? data.reduce((acc, d) => acc + d.value, 0) / data.length : null;
  const isMonthlyView = chartPeriod === "custom" && frequency === "monthly";

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground">MPESA CVM Dashboard</h2>
        <p className="text-muted-foreground mt-1">Overview of all key metrics</p>
      </div>

      <Tabs value={viewTab} onValueChange={(v) => setViewTab(v as any)} className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="chart">Chart</TabsTrigger>
          <TabsTrigger value="card">Card</TabsTrigger>
          <TabsTrigger value="table">Table</TabsTrigger>
        </TabsList>

        <TabsContent value="chart" className="space-y-4 mt-6">
          <div className="flex flex-wrap items-center gap-4">
            <Select value={chartPeriod} onValueChange={setChartPeriod}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="30-day">30-Day</SelectItem>
                <SelectItem value="90-day">90-Day</SelectItem>
                <SelectItem value="custom">Custom</SelectItem>
              </SelectContent>
            </Select>

            {chartPeriod === "custom" && (
              <>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className={cn("w-40 justify-start text-left font-normal", !startDate && "text-muted-foreground")}>
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {startDate ? format(startDate, "PPP") : <span>Start Date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar mode="single" selected={startDate} onSelect={setStartDate} initialFocus className="pointer-events-auto" />
                  </PopoverContent>
                </Popover>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className={cn("w-40 justify-start text-left font-normal", !endDate && "text-muted-foreground")}>
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {endDate ? format(endDate, "PPP") : <span>End Date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar mode="single" selected={endDate} onSelect={setEndDate} initialFocus className="pointer-events-auto" />
                  </PopoverContent>
                </Popover>

                <Select value={frequency} onValueChange={setFrequency}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </>
            )}

            <Button variant="ghost" size="icon" className="ml-auto">
              <Download className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-h-[600px] overflow-y-auto">
            {metrics.map((metric) => (
              <div key={metric.slug} className="border rounded-lg p-4 space-y-4">
                <h3 className="font-semibold text-sm">{metric.title}</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                    <YAxis tick={{ fontSize: 10 }} />
                    <Tooltip />
                    <Bar dataKey="value" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} />
                    {meanValue && <ReferenceLine y={meanValue} stroke="hsl(var(--chart-2))" strokeDasharray="3 3" label="Mean" />}
                  </BarChart>
                </ResponsiveContainer>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="card" className="space-y-4 mt-6">
          <Select value={period} onValueChange={(v) => setPeriod(v as any)}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="30-day">30-Day</SelectItem>
              <SelectItem value="90-day">90-Day</SelectItem>
            </SelectContent>
          </Select>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-h-[600px] overflow-y-auto">
            {metrics.map((metric) => (
              <MetricCard
                key={metric.slug}
                title={metric.title}
                period={period}
                onNavigate={() => navigate(`/metric/${metric.slug}`)}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="table" className="space-y-4 mt-6">
          <div className="flex flex-wrap items-center gap-4">
            <Select value={chartPeriod} onValueChange={setChartPeriod}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="30-day">30-Day</SelectItem>
                <SelectItem value="90-day">90-Day</SelectItem>
                <SelectItem value="custom">Custom</SelectItem>
              </SelectContent>
            </Select>

            {chartPeriod === "custom" && (
              <>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className={cn("w-40 justify-start text-left font-normal", !startDate && "text-muted-foreground")}>
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {startDate ? format(startDate, "PPP") : <span>Start Date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar mode="single" selected={startDate} onSelect={setStartDate} initialFocus className="pointer-events-auto" />
                  </PopoverContent>
                </Popover>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className={cn("w-40 justify-start text-left font-normal", !endDate && "text-muted-foreground")}>
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {endDate ? format(endDate, "PPP") : <span>End Date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar mode="single" selected={endDate} onSelect={setEndDate} initialFocus className="pointer-events-auto" />
                  </PopoverContent>
                </Popover>

                <Select value={frequency} onValueChange={setFrequency}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </>
            )}

            <Button variant="ghost" size="icon" className="ml-auto">
              <Download className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-h-[600px] overflow-y-auto">
            {metrics.map((metric) => (
              <div key={metric.slug} className="border rounded-lg p-4 space-y-2">
                <h3 className="font-semibold text-sm mb-2">{metric.title}</h3>
                <div className="border rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader>
                      {isMonthlyView ? (
                        <TableRow>
                          <TableHead>Date</TableHead>
                          {data.map((row, idx) => (
                            <TableHead key={idx} className="text-right">{row.date}</TableHead>
                          ))}
                        </TableRow>
                      ) : (
                        <TableRow>
                          <TableHead>Date</TableHead>
                          <TableHead className="text-right">Value</TableHead>
                        </TableRow>
                      )}
                    </TableHeader>
                    <TableBody>
                      {isMonthlyView ? (
                        <TableRow>
                          <TableCell className="font-medium">Metric Value</TableCell>
                          {data.map((row, idx) => (
                            <TableCell key={idx} className="text-right">{row.value.toLocaleString()}</TableCell>
                          ))}
                        </TableRow>
                      ) : (
                        data.slice(0, 5).map((row, idx) => (
                          <TableRow key={idx}>
                            <TableCell className="text-sm">{row.date}</TableCell>
                            <TableCell className="text-right text-sm font-medium">{row.value.toLocaleString()}</TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
