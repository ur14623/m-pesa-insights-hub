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
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Send, CheckCircle, XCircle, Clock, ChevronDown, ChevronUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const filters: FilterOption[] = [
  {
    id: "messageId",
    label: "Message ID",
    type: "input",
    placeholder: "Enter message ID",
  },
  {
    id: "campaign",
    label: "Campaign / Batch",
    type: "select",
    options: [
      { value: "promo-jan", label: "January Promo" },
      { value: "reminder-feb", label: "February Reminders" },
      { value: "alert-mar", label: "March Alerts" },
    ],
  },
  {
    id: "status",
    label: "Delivery Status",
    type: "select",
    options: [
      { value: "sent", label: "Sent" },
      { value: "delivered", label: "Delivered" },
      { value: "failed", label: "Failed" },
      { value: "pending", label: "Pending" },
      { value: "partial", label: "Partially Delivered" },
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
    label: "Language",
    type: "select",
    options: [
      { value: "en", label: "English" },
      { value: "am", label: "Amharic" },
      { value: "or", label: "Oromifa" },
    ],
  },
];

const mockData = [
  {
    id: "MSG-001",
    snippet: "Your order #1234 has been shipped...",
    senderId: "MYBRAND",
    deliveryType: "Bulk",
    operator: "Ethio Telecom",
    totalRecipients: 1500,
    delivered: 1420,
    failed: 50,
    pending: 30,
    successRate: 94.7,
    sentDate: "2026-01-30 14:32",
  },
  {
    id: "MSG-002",
    snippet: "Reminder: Your appointment is tomorrow...",
    senderId: "ALERTS",
    deliveryType: "Single",
    operator: "Safaricom Ethiopia",
    totalRecipients: 1,
    delivered: 1,
    failed: 0,
    pending: 0,
    successRate: 100,
    sentDate: "2026-01-30 10:15",
  },
  {
    id: "MSG-003",
    snippet: "Flash sale! 50% off all items...",
    senderId: "PROMO",
    deliveryType: "Bulk",
    operator: "Ethio Telecom",
    totalRecipients: 5000,
    delivered: 4200,
    failed: 600,
    pending: 200,
    successRate: 84.0,
    sentDate: "2026-01-29 09:00",
  },
  {
    id: "MSG-004",
    snippet: "Your verification code is 123456...",
    senderId: "ALERTS",
    deliveryType: "Single",
    operator: "Ethio Telecom",
    totalRecipients: 1,
    delivered: 0,
    failed: 1,
    pending: 0,
    successRate: 0,
    sentDate: "2026-01-29 16:45",
  },
  {
    id: "MSG-005",
    snippet: "Thank you for your purchase...",
    senderId: "MYBRAND",
    deliveryType: "Scheduled",
    operator: "Safaricom Ethiopia",
    totalRecipients: 250,
    delivered: 245,
    failed: 3,
    pending: 2,
    successRate: 98.0,
    sentDate: "2026-01-28 12:00",
  },
];

const DeliveryReportsPage = () => {
  const { toast } = useToast();
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: subDays(new Date(), 30),
    to: new Date(),
  });
  const [filterValues, setFilterValues] = useState<Record<string, string>>({});
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const handleFilterChange = (id: string, value: string) => {
    setFilterValues((prev) => ({ ...prev, [id]: value }));
  };

  const handleClearFilters = () => {
    setFilterValues({});
  };

  const handleExport = (format: "csv" | "excel" | "pdf") => {
    toast({
      title: "Export Started",
      description: `Exporting delivery report as ${format.toUpperCase()}...`,
    });
  };

  const handleRefresh = () => {
    toast({
      title: "Refreshing",
      description: "Fetching latest delivery data...",
    });
  };

  const getStatusBadge = (successRate: number) => {
    if (successRate >= 95) return <Badge className="bg-green-100 text-green-800 border-green-200">Excellent</Badge>;
    if (successRate >= 80) return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Good</Badge>;
    if (successRate >= 50) return <Badge className="bg-orange-100 text-orange-800 border-orange-200">Fair</Badge>;
    return <Badge className="bg-red-100 text-red-800 border-red-200">Poor</Badge>;
  };

  const totalSent = mockData.reduce((acc, row) => acc + row.totalRecipients, 0);
  const totalDelivered = mockData.reduce((acc, row) => acc + row.delivered, 0);
  const totalFailed = mockData.reduce((acc, row) => acc + row.failed, 0);
  const totalPending = mockData.reduce((acc, row) => acc + row.pending, 0);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <ReportHeader
          title="Delivery Reports"
          breadcrumb={["Dashboard", "Reports", "Delivery"]}
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

        {/* Summary Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <SummaryCard
            title="Total Messages Sent"
            value={totalSent.toLocaleString()}
            icon={Send}
          />
          <SummaryCard
            title="Total Recipients"
            value={totalSent.toLocaleString()}
            subtitle="Unique numbers"
          />
          <SummaryCard
            title="Delivery Success Rate"
            value={`${((totalDelivered / totalSent) * 100).toFixed(1)}%`}
            icon={CheckCircle}
            trend={{ value: 2.3, isPositive: true }}
          />
          <SummaryCard
            title="Failure Rate"
            value={`${((totalFailed / totalSent) * 100).toFixed(1)}%`}
            icon={XCircle}
            trend={{ value: 0.5, isPositive: false }}
          />
          <SummaryCard
            title="Pending Messages"
            value={totalPending.toLocaleString()}
            icon={Clock}
          />
        </div>

        {/* Delivery Report Table */}
        <Card className="border border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold">Delivery Report Details</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-b border-border">
                  <TableHead className="w-8"></TableHead>
                  <TableHead>Message ID</TableHead>
                  <TableHead>Message Snippet</TableHead>
                  <TableHead>Sender ID</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Operator</TableHead>
                  <TableHead className="text-right">Recipients</TableHead>
                  <TableHead className="text-right">Delivered</TableHead>
                  <TableHead className="text-right">Failed</TableHead>
                  <TableHead className="text-right">Pending</TableHead>
                  <TableHead className="text-right">Success Rate</TableHead>
                  <TableHead>Sent Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockData.map((row) => (
                  <>
                    <TableRow
                      key={row.id}
                      className="border-b border-border cursor-pointer hover:bg-muted/50"
                      onClick={() => setExpandedRow(expandedRow === row.id ? null : row.id)}
                    >
                      <TableCell>
                        <Button variant="ghost" size="sm" className="p-0 h-6 w-6">
                          {expandedRow === row.id ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          )}
                        </Button>
                      </TableCell>
                      <TableCell className="font-mono text-sm">{row.id}</TableCell>
                      <TableCell className="max-w-[200px] truncate">{row.snippet}</TableCell>
                      <TableCell>{row.senderId}</TableCell>
                      <TableCell>{row.deliveryType}</TableCell>
                      <TableCell>{row.operator}</TableCell>
                      <TableCell className="text-right">{row.totalRecipients.toLocaleString()}</TableCell>
                      <TableCell className="text-right text-green-600">{row.delivered.toLocaleString()}</TableCell>
                      <TableCell className="text-right text-red-600">{row.failed.toLocaleString()}</TableCell>
                      <TableCell className="text-right text-yellow-600">{row.pending.toLocaleString()}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <span>{row.successRate}%</span>
                          {getStatusBadge(row.successRate)}
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">{row.sentDate}</TableCell>
                    </TableRow>
                    {expandedRow === row.id && (
                      <TableRow className="bg-muted/30">
                        <TableCell colSpan={12} className="p-4">
                          <div className="text-sm">
                            <p className="font-medium mb-2">Per-Recipient Breakdown</p>
                            <div className="grid grid-cols-3 gap-4 text-muted-foreground">
                              <div>
                                <span className="text-green-600 font-medium">{row.delivered}</span> delivered successfully
                              </div>
                              <div>
                                <span className="text-red-600 font-medium">{row.failed}</span> failed (network timeout, invalid number)
                              </div>
                              <div>
                                <span className="text-yellow-600 font-medium">{row.pending}</span> pending delivery
                              </div>
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </>
                ))}
              </TableBody>
            </Table>

            {/* Pagination */}
            <div className="mt-4 flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Showing 1-5 of 5 results
              </p>
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious href="#" />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#" isActive>
                      1
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext href="#" />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default DeliveryReportsPage;
