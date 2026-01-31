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
  Users,
  Trash2,
  RefreshCw,
} from "lucide-react";

const mockGroups = [
  {
    id: "GR-001",
    name: "Large Scale Farms",
    parentList: "Dairy Farmers - Oromia",
    contactCount: 2500,
    createdBy: "Abebe Tadesse",
    createdDate: "2024-01-18",
    status: "Active",
  },
  {
    id: "GR-002",
    name: "Small Holder Farmers",
    parentList: "Dairy Farmers - Oromia",
    contactCount: 8500,
    createdBy: "Tigist Haile",
    createdDate: "2024-01-16",
    status: "Active",
  },
  {
    id: "GR-003",
    name: "Highland Zone",
    parentList: "Dairy Farmers - Amhara",
    contactCount: 3200,
    createdBy: "Dawit Mengistu",
    createdDate: "2024-01-14",
    status: "Active",
  },
  {
    id: "GR-004",
    name: "Milk Collection Centers",
    parentList: "Cooperative Leaders",
    contactCount: 120,
    createdBy: "Sara Bekele",
    createdDate: "2024-01-12",
    status: "Active",
  },
  {
    id: "GR-005",
    name: "AI Service Users",
    parentList: "Dairy Farmers - Oromia",
    contactCount: 1890,
    createdBy: "Abebe Tadesse",
    createdDate: "2024-01-10",
    status: "Inactive",
  },
];

const ContactGroupsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [parentFilter, setParentFilter] = useState("all");

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

  const filteredGroups = mockGroups.filter((group) => {
    const matchesSearch = group.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || group.status === statusFilter;
    const matchesParent = parentFilter === "all" || group.parentList === parentFilter;
    return matchesSearch && matchesStatus && matchesParent;
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-sm text-muted-foreground mb-1">
              Dashboard &gt; Contacts &gt; Groups
            </div>
            <h1 className="text-2xl font-semibold text-foreground">Contact Groups</h1>
          </div>
          <Link to="/contacts/groups/new">
            <Button className="rounded-none gap-2 bg-primary">
              <Plus className="h-4 w-4" />
              Create New Group
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
                  placeholder="Search groups..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 rounded-none"
                />
              </div>
              <Select value={parentFilter} onValueChange={setParentFilter}>
                <SelectTrigger className="w-full md:w-48 rounded-none">
                  <SelectValue placeholder="Parent List" />
                </SelectTrigger>
                <SelectContent className="rounded-none">
                  <SelectItem value="all">All Lists</SelectItem>
                  <SelectItem value="Dairy Farmers - Oromia">Dairy Farmers - Oromia</SelectItem>
                  <SelectItem value="Dairy Farmers - Amhara">Dairy Farmers - Amhara</SelectItem>
                  <SelectItem value="Cooperative Leaders">Cooperative Leaders</SelectItem>
                </SelectContent>
              </Select>
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
                Refresh
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Groups Table */}
        <Card className="rounded-none border">
          <CardHeader className="border-b">
            <CardTitle className="text-lg">All Contact Groups</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="border-b">
                  <TableHead className="font-semibold">Group Name</TableHead>
                  <TableHead className="font-semibold">Parent List</TableHead>
                  <TableHead className="font-semibold text-right">Contact Count</TableHead>
                  <TableHead className="font-semibold">Created By</TableHead>
                  <TableHead className="font-semibold">Created Date</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="font-semibold text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredGroups.map((group) => (
                  <TableRow key={group.id} className="border-b">
                    <TableCell>
                      <Link
                        to={`/contacts/groups/${group.id}`}
                        className="text-primary hover:underline font-medium"
                      >
                        {group.name}
                      </Link>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{group.parentList}</TableCell>
                    <TableCell className="text-right">{group.contactCount.toLocaleString()}</TableCell>
                    <TableCell>{group.createdBy}</TableCell>
                    <TableCell>{group.createdDate}</TableCell>
                    <TableCell>{getStatusBadge(group.status)}</TableCell>
                    <TableCell className="text-center">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="rounded-none">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="rounded-none">
                          <DropdownMenuItem className="gap-2">
                            <Eye className="h-4 w-4" /> View Members
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2">
                            <Edit className="h-4 w-4" /> Edit Group
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2">
                            <Users className="h-4 w-4" /> Add/Remove Contacts
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2 text-destructive">
                            <Trash2 className="h-4 w-4" /> Delete Group
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
                Showing 1-5 of {filteredGroups.length} groups
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

export default ContactGroupsPage;
