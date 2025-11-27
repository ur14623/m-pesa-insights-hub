import { useState } from "react";
import { MetricCard } from "@/components/MetricCard";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { format } from "date-fns";
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

const generateMockData = (period: string) => {
  if (period === "daily") {
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

  const data = generateMockData(period);
  const meanValue = period === "30-day" ? data.reduce((acc, d) => acc + d.value, 0) / data.length : null;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground">MPESA CVM Dashboard</h2>
        <p className="text-muted-foreground mt-1">Overview of all key metrics</p>
      </div>

      <Tabs value={viewTab} onValueChange={(v) => setViewTab(v as any)} className="w-full">
        <div className="flex items-center justify-between mb-6">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="card">Cards View</TabsTrigger>
            <TabsTrigger value="chart">Chart View</TabsTrigger>
            <TabsTrigger value="table">Table View</TabsTrigger>
          </TabsList>
          
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
        </div>

        <TabsContent value="chart" className="space-y-4 mt-6">

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-h-[600px] overflow-y-auto">
            {metrics.map((metric) => (
              <div key={metric.slug} className="border rounded-lg p-4 space-y-4 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-sm">{metric.title}</h3>
                  <Button variant="ghost" size="icon">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-h-[600px] overflow-y-auto">
            {metrics.map((metric) => (
              <div key={metric.slug} className="border rounded-lg p-4 space-y-2 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-sm">{metric.title}</h3>
                  <Button variant="ghost" size="icon">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
                <div className="border rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Value</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {data.slice(0, 5).map((row, idx) => (
                        <TableRow key={idx}>
                          <TableCell className="text-sm">{row.date}</TableCell>
                          <TableCell className="text-right text-sm font-medium">{row.value.toLocaleString()}</TableCell>
                        </TableRow>
                      ))}
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
