import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  Plus, 
  Search, 
  MoreHorizontal,
  Eye,
  Pencil,
  Copy,
  Power,
  Trash2,
  Shield,
  Users
} from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { Textarea } from "@/components/ui/textarea";

// Mock roles data
const mockRoles = [
  {
    id: "ROLE-001",
    name: "Administrator",
    description: "Full system access with all permissions",
    userCount: 3,
    type: "System",
    status: "Active",
    lastUpdated: "2026-01-15",
  },
  {
    id: "ROLE-002",
    name: "Operator",
    description: "Message sending, contact management, and basic reporting",
    userCount: 12,
    type: "System",
    status: "Active",
    lastUpdated: "2026-01-20",
  },
  {
    id: "ROLE-003",
    name: "Viewer",
    description: "Read-only access to dashboards and reports",
    userCount: 8,
    type: "System",
    status: "Active",
    lastUpdated: "2026-01-10",
  },
  {
    id: "ROLE-004",
    name: "API Developer",
    description: "API access for system integrations",
    userCount: 5,
    type: "Custom",
    status: "Active",
    lastUpdated: "2026-01-25",
  },
  {
    id: "ROLE-005",
    name: "Message Approver",
    description: "Can approve/reject messages before sending",
    userCount: 2,
    type: "Custom",
    status: "Inactive",
    lastUpdated: "2026-01-05",
  },
];

// Permission categories
const permissionCategories = [
  {
    name: "Dashboard",
    permissions: [
      { id: "dashboard_view", label: "View", checked: true },
      { id: "dashboard_export", label: "Export", checked: true },
    ],
  },
  {
    name: "Messaging",
    permissions: [
      { id: "messaging_view", label: "View", checked: true },
      { id: "messaging_create", label: "Create", checked: true },
      { id: "messaging_edit", label: "Edit", checked: true },
      { id: "messaging_delete", label: "Delete", checked: false },
      { id: "messaging_approve", label: "Approve", checked: false },
    ],
  },
  {
    name: "Inbox & Replies",
    permissions: [
      { id: "inbox_view", label: "View", checked: true },
      { id: "inbox_reply", label: "Reply", checked: true },
      { id: "inbox_delete", label: "Delete", checked: false },
    ],
  },
  {
    name: "Contacts",
    permissions: [
      { id: "contacts_view", label: "View", checked: true },
      { id: "contacts_create", label: "Create", checked: true },
      { id: "contacts_edit", label: "Edit", checked: true },
      { id: "contacts_delete", label: "Delete", checked: false },
      { id: "contacts_export", label: "Export", checked: true },
    ],
  },
  {
    name: "Reports",
    permissions: [
      { id: "reports_view", label: "View", checked: true },
      { id: "reports_create", label: "Create", checked: false },
      { id: "reports_export", label: "Export", checked: true },
    ],
  },
  {
    name: "Settings",
    permissions: [
      { id: "settings_view", label: "View", checked: false },
      { id: "settings_edit", label: "Edit", checked: false },
    ],
  },
  {
    name: "Audit & Compliance",
    permissions: [
      { id: "audit_view", label: "View", checked: true },
      { id: "audit_export", label: "Export", checked: false },
    ],
  },
  {
    name: "Users & Roles",
    permissions: [
      { id: "users_view", label: "View", checked: false },
      { id: "users_create", label: "Create", checked: false },
      { id: "users_edit", label: "Edit", checked: false },
      { id: "users_delete", label: "Delete", checked: false },
    ],
  },
  {
    name: "API Access",
    permissions: [
      { id: "api_view", label: "View Keys", checked: false },
      { id: "api_create", label: "Create Keys", checked: false },
      { id: "api_revoke", label: "Revoke Keys", checked: false },
    ],
  },
];

const RolesPage = () => {
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingRole, setEditingRole] = useState<typeof mockRoles[0] | null>(null);
  const [permissions, setPermissions] = useState(permissionCategories);

  const getTypeBadge = (type: string) => {
    return type === "System" ? (
      <Badge variant="outline" className="border-primary text-primary">System</Badge>
    ) : (
      <Badge variant="outline">Custom</Badge>
    );
  };

  const getStatusBadge = (status: string) => {
    return status === "Active" ? (
      <Badge className="bg-success text-success-foreground">Active</Badge>
    ) : (
      <Badge className="bg-muted text-muted-foreground">Inactive</Badge>
    );
  };

  const handlePermissionChange = (categoryIndex: number, permissionIndex: number) => {
    setPermissions(prev => {
      const updated = [...prev];
      updated[categoryIndex].permissions[permissionIndex].checked = 
        !updated[categoryIndex].permissions[permissionIndex].checked;
      return updated;
    });
  };

  const openEditDialog = (role: typeof mockRoles[0] | null = null) => {
    setEditingRole(role);
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
                  <BreadcrumbLink>Administration</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Roles & Permissions</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <h1 className="text-2xl font-bold text-foreground mt-2">Roles & Permissions</h1>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search roles..." className="pl-9 w-64" />
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => openEditDialog(null)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create New Role
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>
                    {editingRole ? "Edit Role" : "Create New Role"}
                  </DialogTitle>
                  <DialogDescription>
                    Define the role and its permissions
                  </DialogDescription>
                </DialogHeader>
                
                <div className="space-y-6 py-4">
                  {/* Role Definition */}
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="roleName">Role Name *</Label>
                        <Input 
                          id="roleName" 
                          defaultValue={editingRole?.name || ""}
                          placeholder="e.g., Content Manager"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Role Type</Label>
                        <Input 
                          value="Custom" 
                          disabled 
                          className="bg-muted"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea 
                        id="description"
                        defaultValue={editingRole?.description || ""}
                        placeholder="Describe the purpose of this role..."
                      />
                    </div>
                  </div>

                  {/* Permission Matrix */}
                  <div className="space-y-4">
                    <h3 className="font-semibold flex items-center gap-2">
                      <Shield className="h-5 w-5" />
                      Permission Matrix
                    </h3>
                    <div className="border border-border">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="bg-muted">
                            <th className="text-left p-3 font-medium">Category</th>
                            <th className="text-center p-3 font-medium">View</th>
                            <th className="text-center p-3 font-medium">Create</th>
                            <th className="text-center p-3 font-medium">Edit</th>
                            <th className="text-center p-3 font-medium">Delete</th>
                            <th className="text-center p-3 font-medium">Approve</th>
                            <th className="text-center p-3 font-medium">Export</th>
                          </tr>
                        </thead>
                        <tbody>
                          {permissions.map((category, catIndex) => (
                            <tr key={category.name} className="border-t border-border">
                              <td className="p-3 font-medium">{category.name}</td>
                              {["view", "create", "edit", "delete", "approve", "export"].map((action) => {
                                const permission = category.permissions.find(p => 
                                  p.id.includes(action)
                                );
                                const permIndex = category.permissions.findIndex(p => 
                                  p.id.includes(action)
                                );
                                return (
                                  <td key={action} className="text-center p-3">
                                    {permission ? (
                                      <Checkbox
                                        checked={permission.checked}
                                        onCheckedChange={() => 
                                          handlePermissionChange(catIndex, permIndex)
                                        }
                                      />
                                    ) : (
                                      <span className="text-muted-foreground">—</span>
                                    )}
                                  </td>
                                );
                              })}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => setIsDialogOpen(false)}>
                    {editingRole ? "Update Role" : "Create Role"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Roles List Table */}
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Role Name</th>
                    <th>Description</th>
                    <th>Users Assigned</th>
                    <th>Role Type</th>
                    <th>Status</th>
                    <th>Last Updated</th>
                    <th className="w-12">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {mockRoles.map((role) => (
                    <tr key={role.id}>
                      <td className="font-medium">
                        <div className="flex items-center gap-2">
                          <Shield className="h-4 w-4 text-muted-foreground" />
                          {role.name}
                        </div>
                      </td>
                      <td className="max-w-xs truncate text-muted-foreground">
                        {role.description}
                      </td>
                      <td>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          {role.userCount}
                        </div>
                      </td>
                      <td>{getTypeBadge(role.type)}</td>
                      <td>{getStatusBadge(role.status)}</td>
                      <td className="text-xs text-muted-foreground">{role.lastUpdated}</td>
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
                              View Role
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => openEditDialog(role)}>
                              <Pencil className="h-4 w-4 mr-2" />
                              Edit Role
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Copy className="h-4 w-4 mr-2" />
                              Duplicate Role
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <Power className="h-4 w-4 mr-2" />
                              {role.status === "Active" ? "Deactivate" : "Activate"}
                            </DropdownMenuItem>
                            {role.type === "Custom" && role.userCount === 0 && (
                              <>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-destructive">
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Delete Role
                                </DropdownMenuItem>
                              </>
                            )}
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

export default RolesPage;
