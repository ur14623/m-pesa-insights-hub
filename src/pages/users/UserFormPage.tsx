import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Save, Send, ArrowLeft } from "lucide-react";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

// Mock user data for editing
const mockUserData = {
  id: "USR-001",
  fullName: "Abebe Kebede",
  username: "abebe.kebede",
  email: "abebe.kebede@nms.gov",
  phone: "+251-911-123456",
  department: "IT Operations",
  loginMethod: "password",
  roles: ["Administrator"],
  status: "Active",
  forcePasswordChange: false,
  createdBy: "System Admin",
  createdDate: "2024-06-15 10:30",
  lastModifiedBy: "Tigist Haile",
  lastModifiedDate: "2026-01-28 14:15",
};

const availableRoles = [
  { id: "admin", name: "Administrator", description: "Full system access" },
  { id: "operator", name: "Operator", description: "Message sending and contact management" },
  { id: "viewer", name: "Viewer", description: "Read-only access to reports" },
  { id: "api", name: "API Developer", description: "API access for integrations" },
  { id: "approver", name: "Approver", description: "Approve messages before sending" },
];

const UserFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = id && id !== "new";

  const [formData, setFormData] = useState({
    fullName: isEditing ? mockUserData.fullName : "",
    username: isEditing ? mockUserData.username : "",
    email: isEditing ? mockUserData.email : "",
    phone: isEditing ? mockUserData.phone : "",
    department: isEditing ? mockUserData.department : "",
    loginMethod: isEditing ? mockUserData.loginMethod : "password",
    temporaryPassword: "",
    forcePasswordChange: isEditing ? mockUserData.forcePasswordChange : true,
    roles: isEditing ? mockUserData.roles : [],
    status: isEditing ? mockUserData.status : "Active",
    accountExpiry: "",
  });

  const [selectedRoles, setSelectedRoles] = useState<string[]>(
    isEditing ? ["admin"] : []
  );

  const handleRoleToggle = (roleId: string) => {
    setSelectedRoles(prev =>
      prev.includes(roleId)
        ? prev.filter(r => r !== roleId)
        : [...prev, roleId]
    );
  };

  const handleSubmit = (e: React.FormEvent, invite: boolean = false) => {
    e.preventDefault();
    // Handle form submission
    console.log("Submitting:", formData, selectedRoles, invite);
    navigate("/users/list");
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
                  <BreadcrumbLink asChild>
                    <Link to="/users/list">Users</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{isEditing ? "Edit User" : "Create User"}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <h1 className="text-2xl font-bold text-foreground mt-2">
              {isEditing ? "Edit User" : "Create User"}
            </h1>
          </div>
          <Button variant="outline" onClick={() => navigate("/users/list")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Users
          </Button>
        </div>

        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* User Information */}
              <Card>
                <CardHeader>
                  <CardTitle>User Information</CardTitle>
                  <CardDescription>Basic profile information for the user</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name *</Label>
                      <Input
                        id="fullName"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="username">Username *</Label>
                      <Input
                        id="username"
                        value={formData.username}
                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="department">Department *</Label>
                    <Select 
                      value={formData.department} 
                      onValueChange={(value) => setFormData({ ...formData, department: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="IT Operations">IT Operations</SelectItem>
                        <SelectItem value="Customer Service">Customer Service</SelectItem>
                        <SelectItem value="Marketing">Marketing</SelectItem>
                        <SelectItem value="Finance">Finance</SelectItem>
                        <SelectItem value="Development">Development</SelectItem>
                        <SelectItem value="Management">Management</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Authentication */}
              <Card>
                <CardHeader>
                  <CardTitle>Authentication</CardTitle>
                  <CardDescription>Login method and password settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Login Method</Label>
                    <Select 
                      value={formData.loginMethod} 
                      onValueChange={(value) => setFormData({ ...formData, loginMethod: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="password">Password</SelectItem>
                        <SelectItem value="sso">SSO (Single Sign-On)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  {!isEditing && formData.loginMethod === "password" && (
                    <div className="space-y-2">
                      <Label htmlFor="tempPassword">Temporary Password</Label>
                      <Input
                        id="tempPassword"
                        type="password"
                        value={formData.temporaryPassword}
                        onChange={(e) => setFormData({ ...formData, temporaryPassword: e.target.value })}
                        placeholder="Leave blank to auto-generate"
                      />
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Force Password Change</Label>
                      <p className="text-sm text-muted-foreground">
                        Require user to change password on first login
                      </p>
                    </div>
                    <Switch
                      checked={formData.forcePasswordChange}
                      onCheckedChange={(checked) => 
                        setFormData({ ...formData, forcePasswordChange: checked })
                      }
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Role Assignment */}
              <Card>
                <CardHeader>
                  <CardTitle>Role Assignment</CardTitle>
                  <CardDescription>Select roles to assign to this user</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {availableRoles.map((role) => (
                      <div
                        key={role.id}
                        className="flex items-center space-x-3 p-3 border border-border hover:bg-muted/50"
                      >
                        <Checkbox
                          id={role.id}
                          checked={selectedRoles.includes(role.id)}
                          onCheckedChange={() => handleRoleToggle(role.id)}
                        />
                        <div className="flex-1">
                          <Label htmlFor={role.id} className="font-medium cursor-pointer">
                            {role.name}
                          </Label>
                          <p className="text-sm text-muted-foreground">{role.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Account Status */}
              <Card>
                <CardHeader>
                  <CardTitle>Account Status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Status</Label>
                    <Select 
                      value={formData.status} 
                      onValueChange={(value) => setFormData({ ...formData, status: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="Inactive">Inactive</SelectItem>
                        <SelectItem value="Locked">Locked</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="expiry">Account Expiry Date (Optional)</Label>
                    <Input
                      id="expiry"
                      type="date"
                      value={formData.accountExpiry}
                      onChange={(e) => setFormData({ ...formData, accountExpiry: e.target.value })}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Audit Information (Edit only) */}
              {isEditing && (
                <Card>
                  <CardHeader>
                    <CardTitle>Audit Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm">
                    <div>
                      <p className="text-muted-foreground">Created By</p>
                      <p className="font-medium">{mockUserData.createdBy}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Created Date</p>
                      <p className="font-medium">{mockUserData.createdDate}</p>
                    </div>
                    <Separator />
                    <div>
                      <p className="text-muted-foreground">Last Modified By</p>
                      <p className="font-medium">{mockUserData.lastModifiedBy}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Last Modified Date</p>
                      <p className="font-medium">{mockUserData.lastModifiedDate}</p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Actions */}
              <Card>
                <CardContent className="pt-6 space-y-3">
                  <Button type="submit" className="w-full">
                    <Save className="h-4 w-4 mr-2" />
                    {isEditing ? "Update User" : "Save User"}
                  </Button>
                  {!isEditing && (
                    <Button 
                      type="button" 
                      variant="secondary" 
                      className="w-full"
                      onClick={(e) => handleSubmit(e, true)}
                    >
                      <Send className="h-4 w-4 mr-2" />
                      Save & Invite User
                    </Button>
                  )}
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="w-full"
                    onClick={() => navigate("/users/list")}
                  >
                    Cancel
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default UserFormPage;
