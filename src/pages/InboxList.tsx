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
  Mail,
  MailOpen,
  Search,
  AlertTriangle,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface InboxMessage {
  id: string;
  senderNumber: string;
  messageSnippet: string;
  receivedDate: Date;
  readStatus: "Unread" | "Read";
  operator: string;
  messageType: "Keyword" | "Free Text" | "System Reply";
  aiRisk: "Clean" | "Warning" | "Suspicious";
}

const mockData: InboxMessage[] = [
  {
    id: "INB-2026-005678",
    senderNumber: "+251911***234",
    messageSnippet: "HELP I need information about dairy collection schedule for next week",
    receivedDate: new Date("2026-01-28T10:15:00"),
    readStatus: "Unread",
    operator: "Ethio Telecom",
    messageType: "Keyword",
    aiRisk: "Clean",
  },
  {
    id: "INB-2026-005677",
    senderNumber: "+251922***567",
    messageSnippet: "Payment not received for last month delivery. Please check urgently",
    receivedDate: new Date("2026-01-28T09:45:00"),
    readStatus: "Unread",
    operator: "Safaricom Ethiopia",
    messageType: "Free Text",
    aiRisk: "Warning",
  },
  {
    id: "INB-2026-005676",
    senderNumber: "+251933***890",
    messageSnippet: "STOP unsubscribe from all messages",
    receivedDate: new Date("2026-01-28T08:30:00"),
    readStatus: "Read",
    operator: "Ethio Telecom",
    messageType: "Keyword",
    aiRisk: "Clean",
  },
  {
    id: "INB-2026-005675",
    senderNumber: "+251944***123",
    messageSnippet: "This is spam message with suspicious content and phishing attempt...",
    receivedDate: new Date("2026-01-27T16:20:00"),
    readStatus: "Read",
    operator: "Ethio Telecom",
    messageType: "Free Text",
    aiRisk: "Suspicious",
  },
  {
    id: "INB-2026-005674",
    senderNumber: "+251955***456",
    messageSnippet: "YES confirm my registration for dairy cooperative membership",
    receivedDate: new Date("2026-01-27T14:10:00"),
    readStatus: "Read",
    operator: "Safaricom Ethiopia",
    messageType: "Keyword",
    aiRisk: "Clean",
  },
  {
    id: "INB-2026-005673",
    senderNumber: "+251966***789",
    messageSnippet: "Thank you for the payment confirmation. Very satisfied with service",
    receivedDate: new Date("2026-01-27T11:55:00"),
    readStatus: "Read",
    operator: "Ethio Telecom",
    messageType: "Free Text",
    aiRisk: "Clean",
  },
];

const getReadStatusIcon = (status: InboxMessage["readStatus"]) => {
  if (status === "Unread") {
    return <Mail className="h-4 w-4 text-blue-600" />;
  }
  return <MailOpen className="h-4 w-4 text-muted-foreground" />;
};

const getMessageTypeBadge = (type: InboxMessage["messageType"]) => {
  const variants: Record<InboxMessage["messageType"], string> = {
    Keyword: "bg-blue-100 text-blue-700 border-blue-200",
    "Free Text": "bg-slate-100 text-slate-700 border-slate-200",
    "System Reply": "bg-purple-100 text-purple-700 border-purple-200",
  };
  return <Badge className={cn("font-medium", variants[type])}>{type}</Badge>;
};

const getAIRiskBadge = (risk: InboxMessage["aiRisk"]) => {
  const variants: Record<InboxMessage["aiRisk"], { className: string; icon: React.ReactNode }> = {
    Clean: { className: "bg-green-100 text-green-700 border-green-200", icon: <CheckCircle2 className="h-3 w-3" /> },
    Warning: { className: "bg-amber-100 text-amber-700 border-amber-200", icon: <AlertTriangle className="h-3 w-3" /> },
    Suspicious: { className: "bg-red-100 text-red-700 border-red-200", icon: <AlertCircle className="h-3 w-3" /> },
  };
  const variant = variants[risk];
  return (
    <Badge className={cn("gap-1 font-medium", variant.className)}>
      {variant.icon}
      {risk}
    </Badge>
  );
};

const InboxList = () => {
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: undefined,
    to: undefined,
  });
  const [readStatusFilter, setReadStatusFilter] = useState<string>("all");
  const [messageTypeFilter, setMessageTypeFilter] = useState<string>("all");
  const [operatorFilter, setOperatorFilter] = useState<string>("all");
  const [aiRiskFilter, setAiRiskFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("date");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const unreadCount = mockData.filter((m) => m.readStatus === "Unread").length;
  const totalCount = mockData.length;
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
          <span className="text-foreground font-medium">Inbox</span>
        </div>

        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-foreground">Inbox / Received Messages</h1>
            <div className="flex items-center gap-2">
              <Badge variant="destructive" className="text-sm">
                {unreadCount} Unread
              </Badge>
              <Badge variant="secondary" className="text-sm">
                {totalCount} Total
              </Badge>
            </div>
          </div>
          <Button variant="outline" size="sm" className="gap-2">
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader className="py-4">
            <CardTitle className="text-base font-semibold">Filters & Search</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
              {/* Search */}
              <div className="lg:col-span-2 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search sender number..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>

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

              {/* Read Status */}
              <Select value={readStatusFilter} onValueChange={setReadStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Read Status" />
                </SelectTrigger>
                <SelectContent className="bg-popover">
                  <SelectItem value="all">All Messages</SelectItem>
                  <SelectItem value="unread">Unread</SelectItem>
                  <SelectItem value="read">Read</SelectItem>
                </SelectContent>
              </Select>

              {/* Message Type */}
              <Select value={messageTypeFilter} onValueChange={setMessageTypeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Message Type" />
                </SelectTrigger>
                <SelectContent className="bg-popover">
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="keyword">Keyword-based</SelectItem>
                  <SelectItem value="freetext">Free Text</SelectItem>
                  <SelectItem value="system">System Reply</SelectItem>
                </SelectContent>
              </Select>

              {/* AI Risk */}
              <Select value={aiRiskFilter} onValueChange={setAiRiskFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="AI Risk Flag" />
                </SelectTrigger>
                <SelectContent className="bg-popover">
                  <SelectItem value="all">All Risk Levels</SelectItem>
                  <SelectItem value="clean">Clean</SelectItem>
                  <SelectItem value="warning">Warning</SelectItem>
                  <SelectItem value="suspicious">Suspicious</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Message Table */}
        <Card>
          <CardHeader className="py-4 flex flex-row items-center justify-between">
            <CardTitle className="text-base font-semibold">Inbox Messages</CardTitle>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <ArrowUpDown className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent className="bg-popover">
                <SelectItem value="date">Received Date</SelectItem>
                <SelectItem value="status">Read Status</SelectItem>
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="w-[50px]"></TableHead>
                  <TableHead className="font-semibold">Sender Number</TableHead>
                  <TableHead className="font-semibold">Message</TableHead>
                  <TableHead className="font-semibold">Received</TableHead>
                  <TableHead className="font-semibold">Operator</TableHead>
                  <TableHead className="font-semibold">Type</TableHead>
                  <TableHead className="font-semibold">AI Risk</TableHead>
                  <TableHead className="font-semibold text-center">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockData.map((msg) => (
                  <TableRow 
                    key={msg.id} 
                    className={cn(
                      "hover:bg-muted/30",
                      msg.readStatus === "Unread" && "bg-blue-50/50"
                    )}
                  >
                    <TableCell>
                      {getReadStatusIcon(msg.readStatus)}
                    </TableCell>
                    <TableCell className="font-mono text-sm">{msg.senderNumber}</TableCell>
                    <TableCell className="max-w-[250px]">
                      <p className={cn(
                        "truncate text-sm",
                        msg.readStatus === "Unread" && "font-medium"
                      )}>
                        {msg.messageSnippet}
                      </p>
                    </TableCell>
                    <TableCell className="text-sm">
                      {format(msg.receivedDate, "MMM d, HH:mm")}
                    </TableCell>
                    <TableCell className="text-sm">{msg.operator}</TableCell>
                    <TableCell>{getMessageTypeBadge(msg.messageType)}</TableCell>
                    <TableCell>{getAIRiskBadge(msg.aiRisk)}</TableCell>
                    <TableCell className="text-center">
                      <Link to={`/messaging/inbox/${msg.id}`}>
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

export default InboxList;
