import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Plus, 
  Search, 
  MoreHorizontal,
  Eye,
  Pencil,
  Power,
  CheckCircle,
  Trash2,
  Send,
  Phone,
  Hash,
  MessageSquare
} from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

// Mock sender IDs data
const mockSenderIDs = [
  {
    id: "SID-001",
    value: "ETHDAIRY",
    type: "Alphanumeric",
    status: "Approved",
    defaultOperator: "Ethio Telecom",
    createdBy: "admin@nms.gov",
    createdDate: "2025-06-15",
    approvalAuthority: "MCIT",
    approvalDate: "2025-06-20",
  },
  {
    id: "SID-002",
    value: "8585",
    type: "Short Code",
    status: "Approved",
    defaultOperator: "All Operators",
    createdBy: "admin@nms.gov",
    createdDate: "2025-03-10",
    approvalAuthority: "MCIT",
    approvalDate: "2025-03-15",
  },
  {
    id: "SID-003",
    value: "+251911000000",
    type: "Long Number",
    status: "Pending",
    defaultOperator: "Safaricom",
    createdBy: "operator@nms.gov",
    createdDate: "2026-01-28",
    approvalAuthority: null,
    approvalDate: null,
  },
  {
    id: "SID-004",
    value: "DAIRYALERT",
    type: "Alphanumeric",
    status: "Rejected",
    defaultOperator: "Ethio Telecom",
    createdBy: "operator@nms.gov",
    createdDate: "2026-01-20",
    approvalAuthority: "MCIT",
    approvalDate: null,
    rejectionReason: "Reserved keyword conflict",
  },
  {
    id: "SID-005",
    value: "MILKINFO",
    type: "Alphanumeric",
    status: "Suspended",
    defaultOperator: "All Operators",
    createdBy: "admin@nms.gov",
    createdDate: "2025-09-05",
    approvalAuthority: "MCIT",
    approvalDate: "2025-09-10",
  },
];

const SenderIDPage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSenderID, setEditingSenderID] = useState<typeof mockSenderIDs[0] | null>(null);

  const getStatusBadge = (status: string) => {
    const colors: Record<string, string> = {
      Approved: "bg-success text-success-foreground",
      Pending: "bg-warning text-warning-foreground",
      Rejected: "bg-destructive text-destructive-foreground",
      Suspended: "bg-muted text-muted-foreground",
    };
    return <Badge className={colors[status] || "bg-muted text-muted-foreground"}>{status}</Badge>;
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Short Code":
        return <Hash className="h-4 w-4" />;
      case "Long Number":
        return <Phone className="h-4 w-4" />;
      case "Alphanumeric":
        return <MessageSquare className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const openEditDialog = (senderID: typeof mockSenderIDs[0] | null = null) => {
    setEditingSenderID(senderID);
    setIsDialogOpen(true);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/">Dashboard</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink>Settings</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Sender ID Management</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <h1 className="text-2xl font-bold text-foreground mt-2">Sender ID Management</h1>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search sender IDs..." className="pl-9 w-64" />
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => openEditDialog(null)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Sender ID
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>
                    {editingSenderID ? "Edit Sender ID" : "Add New Sender ID"}
                  </DialogTitle>
                  <DialogDescription>
                    Configure sender ID settings and submit for approval
                  </DialogDescription>
                </DialogHeader>
                
                <div className="space-y-6 py-4">
                  {/* Basic Information */}
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="senderValue">Sender ID Value *</Label>
                        <Input 
                          id="senderValue" 
                          defaultValue={editingSenderID?.value || ""}
                          placeholder="e.g., MYCOMPANY or 8585"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Sender ID Type *</Label>
                        <Select defaultValue={editingSenderID?.type || ""}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Short Code">Short Code</SelectItem>
                            <SelectItem value="Long Number">Long Number</SelectItem>
                            <SelectItem value="Alphanumeric">Alphanumeric</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description">Intended Use / Description *</Label>
                      <Textarea 
                        id="description"
                        placeholder="Describe the purpose and use case for this sender ID..."
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Associated Operator(s)</Label>
                        <Select defaultValue={editingSenderID?.defaultOperator || ""}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select operator" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="All Operators">All Operators</SelectItem>
                            <SelectItem value="Ethio Telecom">Ethio Telecom</SelectItem>
                            <SelectItem value="Safaricom">Safaricom Ethiopia</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Default Routing Rule</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select routing rule" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="default">Default Priority</SelectItem>
                            <SelectItem value="cost">Cost Optimized</SelectItem>
                            <SelectItem value="speed">Speed Optimized</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Language Support</Label>
                      <div className="flex gap-4">
                        <div className="flex items-center gap-2">
                          <Checkbox id="lang-en" defaultChecked />
                          <Label htmlFor="lang-en" className="font-normal">English</Label>
                        </div>
                        <div className="flex items-center gap-2">
                          <Checkbox id="lang-am" defaultChecked />
                          <Label htmlFor="lang-am" className="font-normal">Amharic</Label>
                        </div>
                        <div className="flex items-center gap-2">
                          <Checkbox id="lang-or" />
                          <Label htmlFor="lang-or" className="font-normal">Oromiffa</Label>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Approval Status (for editing) */}
                  {editingSenderID && (
                    <>
                      <Separator />
                      <div className="space-y-4">
                        <h3 className="font-semibold">Approval & Compliance</h3>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">Regulatory Approval Status</p>
                            <p className="font-medium">{getStatusBadge(editingSenderID.status)}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Approval Authority</p>
                            <p className="font-medium">{editingSenderID.approvalAuthority || "—"}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Approval Timestamp</p>
                            <p className="font-medium">{editingSenderID.approvalDate || "—"}</p>
                          </div>
                          {editingSenderID.status === "Rejected" && (
                            <div className="col-span-2">
                              <p className="text-muted-foreground">Rejection Reason</p>
                              <p className="font-medium text-destructive">
                                {(editingSenderID as typeof mockSenderIDs[0] & { rejectionReason?: string }).rejectionReason}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </>
                  )}
                </div>

                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  {!editingSenderID && (
                    <Button variant="secondary">
                      <Send className="h-4 w-4 mr-2" />
                      Submit for Approval
                    </Button>
                  )}
                  <Button onClick={() => setIsDialogOpen(false)}>
                    {editingSenderID ? "Update" : "Save as Draft"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Sender ID List Table */}
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Sender ID</th>
                    <th>Type</th>
                    <th>Status</th>
                    <th>Default Operator</th>
                    <th>Created By</th>
                    <th>Created Date</th>
                    <th className="w-12">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {mockSenderIDs.map((senderID) => (
                    <tr key={senderID.id}>
                      <td className="font-mono font-medium">{senderID.value}</td>
                      <td>
                        <div className="flex items-center gap-2">
                          {getTypeIcon(senderID.type)}
                          {senderID.type}
                        </div>
                      </td>
                      <td>{getStatusBadge(senderID.status)}</td>
                      <td>{senderID.defaultOperator}</td>
                      <td className="text-sm">{senderID.createdBy}</td>
                      <td className="text-xs text-muted-foreground">{senderID.createdDate}</td>
                      <td>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            {senderID.status === "Pending" && (
                              <DropdownMenuItem onClick={() => openEditDialog(senderID)}>
                                <Pencil className="h-4 w-4 mr-2" />
                                Edit
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuSeparator />
                            {senderID.status === "Approved" && (
                              <DropdownMenuItem>
                                <Power className="h-4 w-4 mr-2" />
                                Deactivate
                              </DropdownMenuItem>
                            )}
                            {senderID.status === "Suspended" && (
                              <DropdownMenuItem>
                                <CheckCircle className="h-4 w-4 mr-2" />
                                Reactivate
                              </DropdownMenuItem>
                            )}
                            {senderID.status === "Pending" && (
                              <DropdownMenuItem>
                                <Send className="h-4 w-4 mr-2" />
                                Submit for Approval
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default SenderIDPage;
