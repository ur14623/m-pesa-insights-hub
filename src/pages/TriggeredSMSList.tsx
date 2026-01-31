import { useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
  RefreshCw,
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Eye,
  ArrowUpDown,
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface TriggeredSMS {
  id: string;
  messageSnippet: string;
  deliveryType: "Single" | "Bulk" | "Scheduled";
  status: "Sent" | "Delivered" | "Failed" | "Scheduled" | "Partially Delivered";
  sentDate: Date;
  totalRecipients: number;
  successRate: number;
  senderId: string;
  language: string;
}

const mockData: TriggeredSMS[] = [
  {
    id: "MSG-2026-001234",
    messageSnippet: "Dear farmer, your dairy collection payment of ETB 2,500 has been processed...",
    deliveryType: "Bulk",
    status: "Delivered",
    sentDate: new Date("2026-01-28T09:30:00"),
    totalRecipients: 1250,
    successRate: 98.4,
    senderId: "DAIRY-GOV",
    language: "English",
  },
  {
    id: "MSG-2026-001233",
    messageSnippet: "ውድ ገበሬ፣ የወተት ዋጋ ዛሬ ጀምሮ በሊትር 45 ብር ተሻሽሏል...",
    deliveryType: "Bulk",
    status: "Partially Delivered",
    sentDate: new Date("2026-01-28T08:15:00"),
    totalRecipients: 3420,
    successRate: 87.2,
    senderId: "DAIRY-GOV",
    language: "Amharic",
  },
  {
    id: "MSG-2026-001232",
    messageSnippet: "Veterinary vaccination campaign starts Monday. Please bring your cattle to...",
    deliveryType: "Scheduled",
    status: "Scheduled",
    sentDate: new Date("2026-01-29T06:00:00"),
    totalRecipients: 5000,
    successRate: 0,
    senderId: "VET-ETH",
    language: "English",
  },
  {
    id: "MSG-2026-001231",
    messageSnippet: "Payment confirmation: ETB 1,200 credited to your account for milk delivery...",
    deliveryType: "Single",
    status: "Delivered",
    sentDate: new Date("2026-01-27T14:45:00"),
    totalRecipients: 1,
    successRate: 100,
    senderId: "DAIRY-GOV",
    language: "English",
  },
  {
    id: "MSG-2026-001230",
    messageSnippet: "URGENT: Dairy collection center closed tomorrow due to maintenance...",
    deliveryType: "Bulk",
    status: "Failed",
    sentDate: new Date("2026-01-27T11:00:00"),
    totalRecipients: 890,
    successRate: 12.5,
    senderId: "DAIRY-GOV",
    language: "English",
  },
  {
    id: "MSG-2026-001229",
    messageSnippet: "Qonnaan bulaan kabajamoo, gatiin aannan har'aa liitira tokkotti qarshii 42...",
    deliveryType: "Bulk",
    status: "Delivered",
    sentDate: new Date("2026-01-26T07:30:00"),
    totalRecipients: 2100,
    successRate: 95.8,
    senderId: "DAIRY-GOV",
    language: "Afaan Oromo",
  },
];

const getStatusBadge = (status: TriggeredSMS["status"]) => {
  const variants: Record<TriggeredSMS["status"], { className: string; label: string }> = {
    Sent: { className: "bg-blue-100 text-blue-800 border-blue-200", label: "Sent" },
    Delivered: { className: "bg-green-100 text-green-800 border-green-200", label: "Delivered" },
    Failed: { className: "bg-red-100 text-red-800 border-red-200", label: "Failed" },
    Scheduled: { className: "bg-amber-100 text-amber-800 border-amber-200", label: "Scheduled" },
    "Partially Delivered": { className: "bg-orange-100 text-orange-800 border-orange-200", label: "Partial" },
  };
  const variant = variants[status];
  return <Badge className={cn("font-medium", variant.className)}>{variant.label}</Badge>;
};

const getDeliveryTypeBadge = (type: TriggeredSMS["deliveryType"]) => {
  const variants: Record<TriggeredSMS["deliveryType"], string> = {
    Single: "bg-slate-100 text-slate-700 border-slate-200",
    Bulk: "bg-purple-100 text-purple-700 border-purple-200",
    Scheduled: "bg-cyan-100 text-cyan-700 border-cyan-200",
  };
  return <Badge className={cn("font-medium", variants[type])}>{type}</Badge>;
};

const TriggeredSMSList = () => {
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: undefined,
    to: undefined,
  });
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [deliveryTypeFilter, setDeliveryTypeFilter] = useState<string>("all");
  const [senderIdFilter, setSenderIdFilter] = useState<string>("all");
  const [languageFilter, setLanguageFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("date");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(mockData.length / itemsPerPage);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground transition-colors">Dashboard</Link>
          <span>/</span>
          <span>Messaging</span>
          <span>/</span>
          <span className="text-foreground font-medium">Triggered SMS</span>
        </div>

        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">Triggered SMS</h1>
          <Button variant="outline" size="sm" className="gap-2">
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader className="py-4">
            <CardTitle className="text-base font-semibold">Filters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {/* Date Range */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateRange.from ? (
                      dateRange.to ? (
                        <>
                          {format(dateRange.from, "MMM d")} - {format(dateRange.to, "MMM d")}
                        </>
                      ) : (
                        format(dateRange.from, "MMM d, yyyy")
                      )
                    ) : (
                      <span>Date Range</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-popover" align="start">
                  <Calendar
                    mode="range"
                    selected={dateRange}
                    onSelect={(range) => setDateRange({ from: range?.from, to: range?.to })}
                    numberOfMonths={2}
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>

              {/* Status Filter */}
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Message Status" />
                </SelectTrigger>
                <SelectContent className="bg-popover">
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="sent">Sent</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="partial">Partially Delivered</SelectItem>
                </SelectContent>
              </Select>

              {/* Delivery Type */}
              <Select value={deliveryTypeFilter} onValueChange={setDeliveryTypeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Delivery Type" />
                </SelectTrigger>
                <SelectContent className="bg-popover">
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="single">Single</SelectItem>
                  <SelectItem value="bulk">Bulk</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                </SelectContent>
              </Select>

              {/* Sender ID */}
              <Select value={senderIdFilter} onValueChange={setSenderIdFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Sender ID" />
                </SelectTrigger>
                <SelectContent className="bg-popover">
                  <SelectItem value="all">All Sender IDs</SelectItem>
                  <SelectItem value="dairy-gov">DAIRY-GOV</SelectItem>
                  <SelectItem value="vet-eth">VET-ETH</SelectItem>
                </SelectContent>
              </Select>

              {/* Language */}
              <Select value={languageFilter} onValueChange={setLanguageFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Language" />
                </SelectTrigger>
                <SelectContent className="bg-popover">
                  <SelectItem value="all">All Languages</SelectItem>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="amharic">Amharic</SelectItem>
                  <SelectItem value="oromo">Afaan Oromo</SelectItem>
                  <SelectItem value="tigrinya">Tigrinya</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Message Table */}
        <Card>
          <CardHeader className="py-4 flex flex-row items-center justify-between">
            <CardTitle className="text-base font-semibold">Message List</CardTitle>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <ArrowUpDown className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent className="bg-popover">
                <SelectItem value="date">Date</SelectItem>
                <SelectItem value="status">Status</SelectItem>
                <SelectItem value="sender">Sender ID</SelectItem>
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="font-semibold">Message ID</TableHead>
                  <TableHead className="font-semibold">Message</TableHead>
                  <TableHead className="font-semibold">Type</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="font-semibold">Date & Time</TableHead>
                  <TableHead className="font-semibold text-right">Recipients</TableHead>
                  <TableHead className="font-semibold text-right">Success Rate</TableHead>
                  <TableHead className="font-semibold text-center">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockData.map((sms) => (
                  <TableRow key={sms.id} className="hover:bg-muted/30">
                    <TableCell className="font-mono text-xs">{sms.id}</TableCell>
                    <TableCell className="max-w-[300px]">
                      <p className="truncate text-sm">{sms.messageSnippet}</p>
                    </TableCell>
                    <TableCell>{getDeliveryTypeBadge(sms.deliveryType)}</TableCell>
                    <TableCell>{getStatusBadge(sms.status)}</TableCell>
                    <TableCell className="text-sm">
                      {format(sms.sentDate, "MMM d, yyyy HH:mm")}
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      {sms.totalRecipients.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <span className={cn(
                        "font-medium",
                        sms.successRate >= 90 ? "text-green-600" :
                        sms.successRate >= 70 ? "text-amber-600" : "text-red-600"
                      )}>
                        {sms.successRate > 0 ? `${sms.successRate}%` : "—"}
                      </span>
                    </TableCell>
                    <TableCell className="text-center">
                      <Link to={`/messaging/triggered/${sms.id}`}>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {/* Pagination */}
            <div className="flex items-center justify-between px-4 py-4 border-t">
              <p className="text-sm text-muted-foreground">
                Showing 1-{Math.min(itemsPerPage, mockData.length)} of {mockData.length} messages
              </p>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="text-sm font-medium px-2">
                  Page {currentPage} of {totalPages || 1}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default TriggeredSMSList;
