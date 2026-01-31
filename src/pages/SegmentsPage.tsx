import { useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Search,
  MoreVertical,
  Eye,
  Edit,
  RefreshCcw,
  Trash2,
  RefreshCw,
  Filter,
} from "lucide-react";

const mockSegments = [
  {
    id: "SEG-001",
    name: "Large Farms - Ethio Telecom",
    sourceLists: ["Dairy Farmers - Oromia", "Dairy Farmers - Amhara"],
    ruleSummary: "Farm Size = Large AND Operator = Ethio Telecom",
    estimatedContacts: 4200,
    lastRefreshed: "2024-01-28 09:30",
    status: "Active",
  },
  {
    id: "SEG-002",
    name: "Oromo Speakers - Active",
    sourceLists: ["Dairy Farmers - Oromia"],
    ruleSummary: "Language = Oromo AND Status = Subscribed",
    estimatedContacts: 9800,
    lastRefreshed: "2024-01-28 08:15",
    status: "Active",
  },
  {
    id: "SEG-003",
    name: "Highland Zone Farmers",
    sourceLists: ["Dairy Farmers - Amhara"],
    ruleSummary: "Region = Highland AND Farm Size IN (Medium, Large)",
    estimatedContacts: 3200,
    lastRefreshed: "2024-01-27 14:45",
    status: "Active",
  },
  {
    id: "SEG-004",
    name: "AI Service Opted-In",
    sourceLists: ["Dairy Farmers - Oromia", "Cooperative Leaders"],
    ruleSummary: "Tag = AI_Service AND Subscription = Active",
    estimatedContacts: 1890,
    lastRefreshed: "2024-01-27 10:00",
    status: "Active",
  },
  {
    id: "SEG-005",
    name: "Safaricom Users - Tigray",
    sourceLists: ["Dairy Farmers - Tigray"],
    ruleSummary: "Operator = Safaricom AND Region = Tigray",
    estimatedContacts: 560,
    lastRefreshed: "2024-01-26 16:30",
    status: "Inactive",
  },
];

const SegmentsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return <Badge className="bg-emerald-600 text-white rounded-none">Active</Badge>;
      case "Inactive":
        return <Badge className="bg-muted text-muted-foreground rounded-none">Inactive</Badge>;
      default:
        return <Badge className="rounded-none">{status}</Badge>;
    }
  };

  const filteredSegments = mockSegments.filter((segment) => {
    const matchesSearch = segment.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || segment.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-sm text-muted-foreground mb-1">
              Dashboard &gt; Contacts &gt; Segments
            </div>
            <h1 className="text-2xl font-semibold text-foreground">Segments</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Dynamic, rule-based contact segments that auto-update
            </p>
          </div>
          <Link to="/contacts/segments/new">
            <Button className="rounded-none gap-2 bg-primary">
              <Plus className="h-4 w-4" />
              Create New Segment
            </Button>
          </Link>
        </div>

        {/* Filters */}
        <Card className="rounded-none border">
          <CardContent className="p-4">
            <div className="flex flex-col gap-4 md:flex-row md:items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search segments..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 rounded-none"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-40 rounded-none">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent className="rounded-none">
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="rounded-none gap-2">
                <RefreshCw className="h-4 w-4" />
                Refresh All
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Segments Table */}
        <Card className="rounded-none border">
          <CardHeader className="border-b">
            <CardTitle className="text-lg">All Segments</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="border-b">
                  <TableHead className="font-semibold">Segment Name</TableHead>
                  <TableHead className="font-semibold">Source List(s)</TableHead>
                  <TableHead className="font-semibold">Rule Summary</TableHead>
                  <TableHead className="font-semibold text-right">Est. Contacts</TableHead>
                  <TableHead className="font-semibold">Last Refreshed</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="font-semibold text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSegments.map((segment) => (
                  <TableRow key={segment.id} className="border-b">
                    <TableCell>
                      <Link
                        to={`/contacts/segments/${segment.id}`}
                        className="text-primary hover:underline font-medium"
                      >
                        {segment.name}
                      </Link>
                    </TableCell>
                    <TableCell className="max-w-[180px]">
                      <div className="text-sm text-muted-foreground truncate">
                        {segment.sourceLists.join(", ")}
                      </div>
                    </TableCell>
                    <TableCell className="max-w-[200px]">
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Filter className="h-3 w-3 flex-shrink-0" />
                        <span className="truncate">{segment.ruleSummary}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      {segment.estimatedContacts.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {segment.lastRefreshed}
                    </TableCell>
                    <TableCell>{getStatusBadge(segment.status)}</TableCell>
                    <TableCell className="text-center">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="rounded-none">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="rounded-none">
                          <DropdownMenuItem className="gap-2">
                            <Eye className="h-4 w-4" /> View Segment
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2">
                            <Edit className="h-4 w-4" /> Edit Rules
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2">
                            <RefreshCcw className="h-4 w-4" /> Refresh Segment
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2 text-destructive">
                            <Trash2 className="h-4 w-4" /> Delete Segment
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {/* Pagination */}
            <div className="flex items-center justify-between p-4 border-t">
              <div className="text-sm text-muted-foreground">
                Showing 1-5 of {filteredSegments.length} segments
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="rounded-none" disabled>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" className="rounded-none bg-primary text-primary-foreground">
                  1
                </Button>
                <Button variant="outline" size="sm" className="rounded-none" disabled>
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

export default SegmentsPage;
