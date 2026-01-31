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
  Edit,
  Archive,
  Trash2,
  RefreshCw,
} from "lucide-react";

const mockContactLists = [
  {
    id: "CL-001",
    name: "Dairy Farmers - Oromia",
    totalContacts: 12500,
    activeContacts: 11890,
    createdBy: "Abebe Tadesse",
    createdDate: "2024-01-15",
    lastUpdated: "2024-01-28",
    status: "Active",
  },
  {
    id: "CL-002",
    name: "Dairy Farmers - Amhara",
    totalContacts: 8750,
    activeContacts: 8320,
    createdBy: "Tigist Haile",
    createdDate: "2024-01-10",
    lastUpdated: "2024-01-27",
    status: "Active",
  },
  {
    id: "CL-003",
    name: "Cooperative Leaders",
    totalContacts: 450,
    activeContacts: 445,
    createdBy: "Dawit Mengistu",
    createdDate: "2024-01-05",
    lastUpdated: "2024-01-25",
    status: "Active",
  },
  {
    id: "CL-004",
    name: "Veterinary Officers",
    totalContacts: 320,
    activeContacts: 315,
    createdBy: "Abebe Tadesse",
    createdDate: "2023-12-20",
    lastUpdated: "2024-01-20",
    status: "Archived",
  },
  {
    id: "CL-005",
    name: "Extension Workers",
    totalContacts: 890,
    activeContacts: 875,
    createdBy: "Sara Bekele",
    createdDate: "2023-12-15",
    lastUpdated: "2024-01-22",
    status: "Active",
  },
];

const ContactListsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return <Badge className="bg-emerald-600 text-white rounded-none">Active</Badge>;
      case "Archived":
        return <Badge className="bg-muted text-muted-foreground rounded-none">Archived</Badge>;
      default:
        return <Badge className="rounded-none">{status}</Badge>;
    }
  };

  const filteredLists = mockContactLists.filter((list) => {
    const matchesSearch = list.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || list.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-sm text-muted-foreground mb-1">
              Dashboard &gt; Contacts &gt; Lists
            </div>
            <h1 className="text-2xl font-semibold text-foreground">Contact Lists</h1>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="rounded-none gap-2">
              <Upload className="h-4 w-4" />
              Import Contacts
            </Button>
            <Link to="/contacts/lists/new">
              <Button className="rounded-none gap-2 bg-primary">
                <Plus className="h-4 w-4" />
                Create New List
              </Button>
            </Link>
          </div>
        </div>

        {/* Filters */}
        <Card className="rounded-none border">
          <CardContent className="p-4">
            <div className="flex flex-col gap-4 md:flex-row md:items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search contact lists..."
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
                  <SelectItem value="Archived">Archived</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="rounded-none gap-2">
                <RefreshCw className="h-4 w-4" />
                Refresh
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Contact Lists Table */}
        <Card className="rounded-none border">
          <CardHeader className="border-b">
            <CardTitle className="text-lg">All Contact Lists</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="border-b">
                  <TableHead className="font-semibold">List Name</TableHead>
                  <TableHead className="font-semibold text-right">Total Contacts</TableHead>
                  <TableHead className="font-semibold text-right">Active Contacts</TableHead>
                  <TableHead className="font-semibold">Created By</TableHead>
                  <TableHead className="font-semibold">Created Date</TableHead>
                  <TableHead className="font-semibold">Last Updated</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="font-semibold text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLists.map((list) => (
                  <TableRow key={list.id} className="border-b">
                    <TableCell>
                      <Link
                        to={`/contacts/lists/${list.id}`}
                        className="text-primary hover:underline font-medium"
                      >
                        {list.name}
                      </Link>
                    </TableCell>
                    <TableCell className="text-right">{list.totalContacts.toLocaleString()}</TableCell>
                    <TableCell className="text-right">{list.activeContacts.toLocaleString()}</TableCell>
                    <TableCell>{list.createdBy}</TableCell>
                    <TableCell>{list.createdDate}</TableCell>
                    <TableCell>{list.lastUpdated}</TableCell>
                    <TableCell>{getStatusBadge(list.status)}</TableCell>
                    <TableCell className="text-center">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="rounded-none">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="rounded-none">
                          <DropdownMenuItem className="gap-2">
                            <Eye className="h-4 w-4" /> View List
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2">
                            <Edit className="h-4 w-4" /> Edit List
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2">
                            <Archive className="h-4 w-4" /> Archive
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2 text-destructive">
                            <Trash2 className="h-4 w-4" /> Delete
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
                Showing 1-5 of {filteredLists.length} lists
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

export default ContactListsPage;
