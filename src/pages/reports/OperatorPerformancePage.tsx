import { useState } from "react";
import { DateRange } from "react-day-picker";
import { subDays } from "date-fns";
import DashboardLayout from "@/components/layout/DashboardLayout";
import ReportHeader from "@/components/reports/ReportHeader";
import FilterPanel, { FilterOption } from "@/components/reports/FilterPanel";
import SummaryCard from "@/components/reports/SummaryCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Signal, Clock, AlertTriangle, TrendingUp, Lightbulb } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const filters: FilterOption[] = [
  {
    id: "operator",
    label: "Operator",
    type: "select",
    options: [
      { value: "ethio", label: "Ethio Telecom" },
      { value: "safaricom", label: "Safaricom Ethiopia" },
    ],
  },
  {
    id: "messageType",
    label: "Message Type",
    type: "select",
    options: [
      { value: "promotional", label: "Promotional" },
      { value: "transactional", label: "Transactional" },
      { value: "otp", label: "OTP" },
    ],
  },
  {
    id: "senderId",
    label: "Sender ID",
    type: "select",
    options: [
      { value: "MYBRAND", label: "MYBRAND" },
      { value: "ALERTS", label: "ALERTS" },
      { value: "PROMO", label: "PROMO" },
    ],
  },
];

const operatorData = [
  {
    name: "Ethio Telecom",
    totalMessages: 45230,
    delivered: 42890,
    failed: 1540,
    pending: 800,
    successRate: 94.8,
    avgLatency: 2.3,
    peakFailureWindow: "14:00-16:00",
    fallbackRate: 3.2,
  },
  {
    name: "Safaricom Ethiopia",
    totalMessages: 12450,
    delivered: 12180,
    failed: 170,
    pending: 100,
    successRate: 97.8,
    avgLatency: 1.8,
    peakFailureWindow: "09:00-10:00",
    fallbackRate: 1.4,
  },
];

const trendData = [
  { date: "Jan 25", ethio: 94.2, safaricom: 97.5 },
  { date: "Jan 26", ethio: 93.8, safaricom: 98.1 },
  { date: "Jan 27", ethio: 95.1, safaricom: 97.2 },
  { date: "Jan 28", ethio: 94.5, safaricom: 97.9 },
  { date: "Jan 29", ethio: 94.9, safaricom: 97.6 },
  { date: "Jan 30", ethio: 94.8, safaricom: 97.8 },
  { date: "Jan 31", ethio: 95.2, safaricom: 98.0 },
];

const latencyData = [
  { name: "Ethio Telecom", latency: 2.3 },
  { name: "Safaricom Ethiopia", latency: 1.8 },
];

const failureReasons = [
  { name: "Network Timeout", value: 45, color: "#ef4444" },
  { name: "Invalid Number", value: 25, color: "#f97316" },
  { name: "Carrier Rejected", value: 18, color: "#eab308" },
  { name: "DND Active", value: 12, color: "#84cc16" },
];

const OperatorPerformancePage = () => {
  const { toast } = useToast();
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: subDays(new Date(), 30),
    to: new Date(),
  });
  const [filterValues, setFilterValues] = useState<Record<string, string>>({});

  const handleFilterChange = (id: string, value: string) => {
    setFilterValues((prev) => ({ ...prev, [id]: value }));
  };

  const handleClearFilters = () => {
    setFilterValues({});
  };

  const handleExport = (format: "csv" | "excel" | "pdf") => {
    toast({
      title: "Export Started",
      description: `Exporting operator performance report as ${format.toUpperCase()}...`,
    });
  };

  const handleRefresh = () => {
    toast({
      title: "Refreshing",
      description: "Fetching latest operator data...",
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <ReportHeader
          title="Operator Performance Report"
          breadcrumb={["Dashboard", "Reports", "Operator Performance"]}
          dateRange={dateRange}
          onDateRangeChange={setDateRange}
          onExport={handleExport}
          onRefresh={handleRefresh}
        />

        <FilterPanel
          filters={filters}
          values={filterValues}
          onChange={handleFilterChange}
          onClear={handleClearFilters}
        />

        {/* Operator Summary Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {operatorData.map((operator) => (
            <Card key={operator.name} className="border border-border">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold">{operator.name}</CardTitle>
                  <Badge
                    className={
                      operator.successRate >= 95
                        ? "bg-green-100 text-green-800 border-green-200"
                        : "bg-yellow-100 text-yellow-800 border-yellow-200"
                    }
                  >
                    {operator.successRate >= 95 ? "Excellent" : "Good"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Messages Sent</p>
                    <p className="text-xl font-bold">{operator.totalMessages.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Success Rate</p>
                    <p className="text-xl font-bold text-green-600">{operator.successRate}%</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Avg Latency</p>
                    <p className="text-xl font-bold">{operator.avgLatency}s</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Fallback Rate</p>
                    <p className="text-xl font-bold text-orange-600">{operator.fallbackRate}%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Performance Table */}
        <Card className="border border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold">Operator Performance Details</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-b border-border">
                  <TableHead>Operator Name</TableHead>
                  <TableHead className="text-right">Total Messages</TableHead>
                  <TableHead className="text-right">Delivered</TableHead>
                  <TableHead className="text-right">Failed</TableHead>
                  <TableHead className="text-right">Pending</TableHead>
                  <TableHead className="text-right">Success Rate</TableHead>
                  <TableHead className="text-right">Avg Latency (s)</TableHead>
                  <TableHead>Peak Failure Window</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {operatorData.map((operator) => (
                  <TableRow key={operator.name} className="border-b border-border">
                    <TableCell className="font-medium">{operator.name}</TableCell>
                    <TableCell className="text-right">{operator.totalMessages.toLocaleString()}</TableCell>
                    <TableCell className="text-right text-green-600">{operator.delivered.toLocaleString()}</TableCell>
                    <TableCell className="text-right text-red-600">{operator.failed.toLocaleString()}</TableCell>
                    <TableCell className="text-right text-yellow-600">{operator.pending.toLocaleString()}</TableCell>
                    <TableCell className="text-right font-semibold">{operator.successRate}%</TableCell>
                    <TableCell className="text-right">{operator.avgLatency}</TableCell>
                    <TableCell className="text-muted-foreground">{operator.peakFailureWindow}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Visualization Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Success Rate Trend */}
          <Card className="border border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Delivery Success Rate Trend
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={trendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="date" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                    <YAxis domain={[90, 100]} tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--background))",
                        border: "1px solid hsl(var(--border))",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="ethio"
                      name="Ethio Telecom"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      dot={{ r: 3 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="safaricom"
                      name="Safaricom Ethiopia"
                      stroke="#10b981"
                      strokeWidth={2}
                      dot={{ r: 3 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Latency Comparison */}
          <Card className="border border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Latency Comparison
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={latencyData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis type="number" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                    <YAxis dataKey="name" type="category" tick={{ fontSize: 12 }} width={120} stroke="hsl(var(--muted-foreground))" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--background))",
                        border: "1px solid hsl(var(--border))",
                      }}
                    />
                    <Bar dataKey="latency" fill="#6366f1" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Failure Reason Distribution */}
          <Card className="border border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Failure Reason Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[250px] flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={failureReasons}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {failureReasons.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--background))",
                        border: "1px solid hsl(var(--border))",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex flex-wrap justify-center gap-4 mt-2">
                {failureReasons.map((reason) => (
                  <div key={reason.name} className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: reason.color }}
                    />
                    <span className="text-xs text-muted-foreground">
                      {reason.name} ({reason.value}%)
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Insights Panel */}
          <Card className="border border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium flex items-center gap-2">
                <Lightbulb className="h-4 w-4" />
                Performance Insights
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-3 bg-green-50 border border-green-200 rounded-md">
                <p className="text-sm font-medium text-green-800">Best-Performing Operator</p>
                <p className="text-xs text-green-600 mt-1">
                  Safaricom Ethiopia leads with 97.8% success rate and 1.8s average latency
                </p>
              </div>
              <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                <p className="text-sm font-medium text-yellow-800">High-Risk Delivery Periods</p>
                <p className="text-xs text-yellow-600 mt-1">
                  Ethio Telecom shows increased failures between 14:00-16:00. Consider load balancing.
                </p>
              </div>
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
                <p className="text-sm font-medium text-blue-800">Recommended Routing Adjustments</p>
                <p className="text-xs text-blue-600 mt-1">
                  Route time-sensitive OTPs through Safaricom for lower latency during peak hours.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default OperatorPerformancePage;
