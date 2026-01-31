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
  Upload,
  Search,
  MoreVertical,
  Eye,
  Trash2,
  Download,
  RefreshCw,
  Ban,
} from "lucide-react";

const mockBlacklist = [
  {
    id: "BL-001",
    phone: "+251911***234",
    reason: "User opt-out request",
    source: "User Opt-Out",
    dateAdded: "2024-01-28",
    addedBy: "System",
    status: "Permanent",
  },
  {
    id: "BL-002",
    phone: "+251912***567",
    reason: "Spam complaint",
    source: "Manual",
    dateAdded: "2024-01-27",
    addedBy: "Abebe Tadesse",
    status: "Permanent",
  },
  {
    id: "BL-003",
    phone: "+251913***890",
    reason: "Invalid number - network rejected",
    source: "System Rule",
    dateAdded: "2024-01-26",
    addedBy: "System",
    status: "Permanent",
  },
  {
    id: "BL-004",
    phone: "+251914***123",
    reason: "Regulatory compliance - DNC list",
    source: "Regulatory",
    dateAdded: "2024-01-25",
    addedBy: "Compliance Team",
    status: "Permanent",
  },
  {
    id: "BL-005",
    phone: "+251915***456",
    reason: "Temporary block - excessive complaints",
    source: "Manual",
    dateAdded: "2024-01-24",
    addedBy: "Tigist Haile",
    status: "Temporary",
    expiryDate: "2024-02-24",
  },
  {
    id: "BL-006",
    phone: "+251916***789",
    reason: "User opt-out via SMS STOP",
    source: "User Opt-Out",
    dateAdded: "2024-01-23",
    addedBy: "System",
    status: "Permanent",
  },
];

const BlacklistPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sourceFilter, setSourceFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const getSourceBadge = (source: string) => {
    switch (source) {
      case "Manual":
        return <Badge className="bg-blue-600 text-white rounded-none">Manual</Badge>;
      case "User Opt-Out":
        return <Badge className="bg-amber-600 text-white rounded-none">User Opt-Out</Badge>;
      case "System Rule":
        return <Badge className="bg-muted text-muted-foreground rounded-none">System Rule</Badge>;
      case "Regulatory":
        return <Badge className="bg-destructive text-destructive-foreground rounded-none">Regulatory</Badge>;
      default:
        return <Badge className="rounded-none">{source}</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Permanent":
        return <Badge className="bg-destructive text-destructive-foreground rounded-none">Permanent</Badge>;
      case "Temporary":
        return <Badge className="bg-amber-600 text-white rounded-none">Temporary</Badge>;
      default:
        return <Badge className="rounded-none">{status}</Badge>;
    }
  };

  const filteredBlacklist = mockBlacklist.filter((entry) => {
    const matchesSearch =
      entry.phone.includes(searchTerm) || entry.reason.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSource = sourceFilter === "all" || entry.source === sourceFilter;
    const matchesStatus = statusFilter === "all" || entry.status === statusFilter;
    return matchesSearch && matchesSource && matchesStatus;
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-sm text-muted-foreground mb-1">
              Dashboard &gt; Contacts &gt; Blacklist
            </div>
            <h1 className="text-2xl font-semibold text-foreground">Blacklist</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Manage blocked or restricted recipients
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="rounded-none gap-2">
              <Upload className="h-4 w-4" />
              Import Blacklist
            </Button>
            <Button variant="outline" className="rounded-none gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
            <Link to="/contacts/blacklist/new">
              <Button className="rounded-none gap-2 bg-destructive">
                <Plus className="h-4 w-4" />
                Add to Blacklist
              </Button>
            </Link>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="rounded-none border">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Ban className="h-8 w-8 text-destructive" />
                <div>
                  <div className="text-2xl font-bold">{mockBlacklist.length}</div>
                  <div className="text-sm text-muted-foreground">Total Blocked</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="rounded-none border">
            <CardContent className="p-4">
              <div className="text-2xl font-bold">{mockBlacklist.filter((b) => b.source === "User Opt-Out").length}</div>
              <div className="text-sm text-muted-foreground">User Opt-Outs</div>
            </CardContent>
          </Card>
          <Card className="rounded-none border">
            <CardContent className="p-4">
              <div className="text-2xl font-bold">{mockBlacklist.filter((b) => b.source === "Regulatory").length}</div>
              <div className="text-sm text-muted-foreground">Regulatory Blocks</div>
            </CardContent>
          </Card>
          <Card className="rounded-none border">
            <CardContent className="p-4">
              <div className="text-2xl font-bold">{mockBlacklist.filter((b) => b.status === "Temporary").length}</div>
              <div className="text-sm text-muted-foreground">Temporary Blocks</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="rounded-none border">
          <CardContent className="p-4">
            <div className="flex flex-col gap-4 md:flex-row md:items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by phone number or reason..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 rounded-none"
                />
              </div>
              <Select value={sourceFilter} onValueChange={setSourceFilter}>
                <SelectTrigger className="w-full md:w-40 rounded-none">
                  <SelectValue placeholder="Source" />
                </SelectTrigger>
                <SelectContent className="rounded-none">
                  <SelectItem value="all">All Sources</SelectItem>
                  <SelectItem value="Manual">Manual</SelectItem>
                  <SelectItem value="User Opt-Out">User Opt-Out</SelectItem>
                  <SelectItem value="System Rule">System Rule</SelectItem>
                  <SelectItem value="Regulatory">Regulatory</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-40 rounded-none">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent className="rounded-none">
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Permanent">Permanent</SelectItem>
                  <SelectItem value="Temporary">Temporary</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="rounded-none gap-2">
                <RefreshCw className="h-4 w-4" />
                Refresh
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Blacklist Table */}
        <Card className="rounded-none border">
          <CardHeader className="border-b">
            <CardTitle className="text-lg">Blacklisted Numbers</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="border-b">
                  <TableHead className="font-semibold">Phone Number</TableHead>
                  <TableHead className="font-semibold">Reason</TableHead>
                  <TableHead className="font-semibold">Source</TableHead>
                  <TableHead className="font-semibold">Date Added</TableHead>
                  <TableHead className="font-semibold">Added By</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="font-semibold text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBlacklist.map((entry) => (
                  <TableRow key={entry.id} className="border-b">
                    <TableCell className="font-mono text-sm">{entry.phone}</TableCell>
                    <TableCell className="max-w-[200px]">
                      <span className="text-sm truncate block">{entry.reason}</span>
                    </TableCell>
                    <TableCell>{getSourceBadge(entry.source)}</TableCell>
                    <TableCell>{entry.dateAdded}</TableCell>
                    <TableCell>{entry.addedBy}</TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        {getStatusBadge(entry.status)}
                        {entry.expiryDate && (
                          <div className="text-xs text-muted-foreground">
                            Expires: {entry.expiryDate}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="rounded-none">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="rounded-none">
                          <DropdownMenuItem className="gap-2">
                            <Eye className="h-4 w-4" /> View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2 text-destructive">
                            <Trash2 className="h-4 w-4" /> Remove from Blacklist
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
                Showing 1-{filteredBlacklist.length} of {filteredBlacklist.length} entries
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

export default BlacklistPage;
