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
import { Progress } from "@/components/ui/progress";
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
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CreditCard,
  Wallet,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const filters: FilterOption[] = [
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
  {
    id: "deliveryType",
    label: "Delivery Type",
    type: "select",
    options: [
      { value: "single", label: "Single" },
      { value: "bulk", label: "Bulk" },
      { value: "scheduled", label: "Scheduled" },
    ],
  },
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
    id: "language",
    label: "Message Language",
    type: "select",
    options: [
      { value: "en", label: "English" },
      { value: "am", label: "Amharic" },
      { value: "or", label: "Oromifa" },
    ],
  },
  {
    id: "campaign",
    label: "Campaign / Batch",
    type: "select",
    options: [
      { value: "promo-jan", label: "January Promo" },
      { value: "reminder-feb", label: "February Reminders" },
    ],
  },
];

const costBreakdownData = [
  {
    date: "2026-01-25",
    messageId: "MSG-001",
    campaign: "January Promo",
    operator: "Ethio Telecom",
    deliveryType: "Bulk",
    segments: 3000,
    costPerSegment: 0.05,
    totalCost: 150.0,
    deliveredCost: 142.5,
    failedCost: 7.5,
  },
  {
    date: "2026-01-26",
    messageId: "MSG-002",
    campaign: "Order Alerts",
    operator: "Safaricom Ethiopia",
    deliveryType: "Single",
    segments: 150,
    costPerSegment: 0.06,
    totalCost: 9.0,
    deliveredCost: 9.0,
    failedCost: 0,
  },
  {
    date: "2026-01-27",
    messageId: "MSG-003",
    campaign: "Flash Sale",
    operator: "Ethio Telecom",
    deliveryType: "Bulk",
    segments: 10000,
    costPerSegment: 0.045,
    totalCost: 450.0,
    deliveredCost: 378.0,
    failedCost: 72.0,
  },
  {
    date: "2026-01-28",
    messageId: "MSG-004",
    campaign: "OTP Verification",
    operator: "Safaricom Ethiopia",
    deliveryType: "Single",
    segments: 500,
    costPerSegment: 0.06,
    totalCost: 30.0,
    deliveredCost: 29.4,
    failedCost: 0.6,
  },
  {
    date: "2026-01-29",
    messageId: "MSG-005",
    campaign: "Weekly Newsletter",
    operator: "Ethio Telecom",
    deliveryType: "Scheduled",
    segments: 2500,
    costPerSegment: 0.05,
    totalCost: 125.0,
    deliveredCost: 120.0,
    failedCost: 5.0,
  },
];

const costTrendData = [
  { date: "Jan 25", cost: 150 },
  { date: "Jan 26", cost: 159 },
  { date: "Jan 27", cost: 609 },
  { date: "Jan 28", cost: 639 },
  { date: "Jan 29", cost: 764 },
  { date: "Jan 30", cost: 820 },
  { date: "Jan 31", cost: 890 },
];

const costByOperator = [
  { name: "Ethio Telecom", value: 725, color: "#3b82f6" },
  { name: "Safaricom Ethiopia", value: 165, color: "#10b981" },
];

const costByDeliveryType = [
  { name: "Bulk", cost: 600 },
  { name: "Single", cost: 180 },
  { name: "Scheduled", cost: 110 },
];

const CostReportsPage = () => {
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
      description: `Exporting cost report as ${format.toUpperCase()}...`,
    });
  };

  const handleRefresh = () => {
    toast({
      title: "Refreshing",
      description: "Fetching latest cost data...",
    });
  };

  const totalCost = costBreakdownData.reduce((acc, row) => acc + row.totalCost, 0);
  const deliveredCost = costBreakdownData.reduce((acc, row) => acc + row.deliveredCost, 0);
  const failedCost = costBreakdownData.reduce((acc, row) => acc + row.failedCost, 0);
  const totalSegments = costBreakdownData.reduce((acc, row) => acc + row.segments, 0);
  const costPerDelivered = (deliveredCost / totalSegments * 1.05).toFixed(3);

  const monthlyBudget = 1500;
  const currentSpend = totalCost;
  const budgetUsage = (currentSpend / monthlyBudget) * 100;
  const remainingCredit = 2500 - currentSpend;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <ReportHeader
          title="Cost Reports"
          breadcrumb={["Dashboard", "Reports", "Cost"]}
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

        {/* Cost Summary Panel */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <SummaryCard
            title="Total SMS Cost"
            value={`$${totalCost.toFixed(2)}`}
            icon={DollarSign}
          />
          <SummaryCard
            title="Cost Per Delivered"
            value={`$${costPerDelivered}`}
            icon={TrendingUp}
            trend={{ value: 2.1, isPositive: false }}
          />
          <SummaryCard
            title="Failed SMS Cost"
            value={`$${failedCost.toFixed(2)}`}
            icon={TrendingDown}
            subtitle="Lost to failures"
          />
          <SummaryCard
            title="Scheduled vs Actual"
            value="-$45"
            icon={CreditCard}
            subtitle="Under budget"
          />
          <SummaryCard
            title="Credit Balance"
            value={`$${remainingCredit.toFixed(2)}`}
            icon={Wallet}
          />
        </div>

        {/* Cost Breakdown Table */}
        <Card className="border border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold">Cost Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-b border-border">
                  <TableHead>Date</TableHead>
                  <TableHead>Message ID / Campaign</TableHead>
                  <TableHead>Operator</TableHead>
                  <TableHead>Delivery Type</TableHead>
                  <TableHead className="text-right">Segments</TableHead>
                  <TableHead className="text-right">Cost/Segment</TableHead>
                  <TableHead className="text-right">Total Cost</TableHead>
                  <TableHead className="text-right">Delivered Cost</TableHead>
                  <TableHead className="text-right">Failed Cost</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {costBreakdownData.map((row) => (
                  <TableRow key={row.messageId} className="border-b border-border">
                    <TableCell className="text-muted-foreground">{row.date}</TableCell>
                    <TableCell>
                      <div>
                        <span className="font-mono text-sm">{row.messageId}</span>
                        <p className="text-xs text-muted-foreground">{row.campaign}</p>
                      </div>
                    </TableCell>
                    <TableCell>{row.operator}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{row.deliveryType}</Badge>
                    </TableCell>
                    <TableCell className="text-right">{row.segments.toLocaleString()}</TableCell>
                    <TableCell className="text-right">${row.costPerSegment.toFixed(3)}</TableCell>
                    <TableCell className="text-right font-medium">${row.totalCost.toFixed(2)}</TableCell>
                    <TableCell className="text-right text-green-600">${row.deliveredCost.toFixed(2)}</TableCell>
                    <TableCell className="text-right text-red-600">${row.failedCost.toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Cost Trend & Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Cost Over Time */}
          <Card className="border border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium">Cost Over Time (Cumulative)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={costTrendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="date" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                    <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--background))",
                        border: "1px solid hsl(var(--border))",
                      }}
                      formatter={(value: number) => [`$${value}`, "Total Cost"]}
                    />
                    <Line
                      type="monotone"
                      dataKey="cost"
                      stroke="#6366f1"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Cost by Operator */}
          <Card className="border border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium">Cost by Operator</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[250px] flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={costByOperator}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {costByOperator.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--background))",
                        border: "1px solid hsl(var(--border))",
                      }}
                      formatter={(value: number) => [`$${value}`, "Cost"]}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-center gap-6 mt-2">
                {costByOperator.map((item) => (
                  <div key={item.name} className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-xs text-muted-foreground">
                      {item.name} (${item.value})
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Cost by Delivery Type */}
          <Card className="border border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium">Cost by Delivery Type</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={costByDeliveryType}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                    <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--background))",
                        border: "1px solid hsl(var(--border))",
                      }}
                      formatter={(value: number) => [`$${value}`, "Cost"]}
                    />
                    <Bar dataKey="cost" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Budget Monitoring Section */}
          <Card className="border border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Budget Monitoring
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Monthly Budget</span>
                  <span className="font-medium">${currentSpend.toFixed(2)} / ${monthlyBudget.toFixed(2)}</span>
                </div>
                <Progress value={budgetUsage} className="h-3" />
                <p className="text-xs text-muted-foreground mt-1">
                  {budgetUsage.toFixed(1)}% of monthly budget used
                </p>
              </div>

              {budgetUsage > 80 && (
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                  <p className="text-sm font-medium text-yellow-800">Alert Threshold Reached</p>
                  <p className="text-xs text-yellow-600 mt-1">
                    You have used over 80% of your monthly budget. Consider reviewing campaign costs.
                  </p>
                </div>
              )}

              {budgetUsage > 100 && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                  <p className="text-sm font-medium text-red-800">Overspend Warning</p>
                  <p className="text-xs text-red-600 mt-1">
                    Monthly budget exceeded by ${(currentSpend - monthlyBudget).toFixed(2)}.
                  </p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="p-3 bg-muted/50 rounded-md">
                  <p className="text-xs text-muted-foreground">Monthly Budget</p>
                  <p className="text-lg font-bold">${monthlyBudget.toFixed(2)}</p>
                </div>
                <div className="p-3 bg-muted/50 rounded-md">
                  <p className="text-xs text-muted-foreground">Current Spend</p>
                  <p className="text-lg font-bold">${currentSpend.toFixed(2)}</p>
                </div>
              </div>

              <div className="pt-2">
                <p className="text-xs text-muted-foreground mb-1">High-Cost Campaigns</p>
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span>Flash Sale</span>
                    <Badge className="bg-red-100 text-red-800 border-red-200">$450.00</Badge>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span>January Promo</span>
                    <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">$150.00</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CostReportsPage;
