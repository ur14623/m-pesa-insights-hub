import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Calendar, 
  Download, 
  RefreshCw, 
  ChevronDown, 
  ChevronRight,
  ExternalLink,
  Search,
  Filter
} from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

// Mock audit log data
const mockAuditLogs = [
  {
    id: "LOG-001",
    timestamp: "2026-01-31 14:32:15",
    user: "admin@nms.gov",
    role: "Administrator",
    action: "Update",
    module: "Settings",
    entity: "Routing Rule",
    entityId: "RR-045",
    result: "Success",
    source: "Web UI",
    ipAddress: "192.168.1.100",
    beforeValue: '{"priority": 1, "operator": "Ethio Telecom"}',
    afterValue: '{"priority": 2, "operator": "Safaricom"}',
    requestPayload: '{"action": "update_routing", "...": "***masked***"}',
    responseSummary: "Routing rule updated successfully",
  },
  {
    id: "LOG-002",
    timestamp: "2026-01-31 14:28:42",
    user: "operator1@nms.gov",
    role: "Operator",
    action: "Send",
    module: "Messaging",
    entity: "Bulk SMS",
    entityId: "MSG-1234",
    result: "Success",
    source: "API",
    ipAddress: "10.0.0.55",
    beforeValue: null,
    afterValue: '{"recipients": 500, "status": "queued"}',
    requestPayload: '{"message": "***masked***", "recipients": [...]}',
    responseSummary: "500 messages queued for delivery",
  },
  {
    id: "LOG-003",
    timestamp: "2026-01-31 14:15:30",
    user: "admin@nms.gov",
    role: "Administrator",
    action: "Delete",
    module: "Contacts",
    entity: "Contact List",
    entityId: "CL-089",
    result: "Success",
    source: "Web UI",
    ipAddress: "192.168.1.100",
    beforeValue: '{"name": "Old Campaign List", "contacts": 1200}',
    afterValue: null,
    requestPayload: '{"action": "delete", "id": "CL-089"}',
    responseSummary: "Contact list deleted",
  },
  {
    id: "LOG-004",
    timestamp: "2026-01-31 13:55:18",
    user: "viewer@nms.gov",
    role: "Viewer",
    action: "Login",
    module: "API",
    entity: "User Session",
    entityId: "SES-456",
    result: "Success",
    source: "Web UI",
    ipAddress: "172.16.0.22",
    beforeValue: null,
    afterValue: '{"session_id": "SES-456", "expires": "2026-01-31T18:55:18Z"}',
    requestPayload: '{"credentials": "***masked***"}',
    responseSummary: "User authenticated successfully",
  },
  {
    id: "LOG-005",
    timestamp: "2026-01-31 13:42:05",
    user: "operator2@nms.gov",
    role: "Operator",
    action: "Create",
    module: "Messaging",
    entity: "Sender ID",
    entityId: "SID-012",
    result: "Failure",
    source: "Web UI",
    ipAddress: "192.168.1.105",
    beforeValue: null,
    afterValue: null,
    requestPayload: '{"sender_id": "NEWID", "type": "alphanumeric"}',
    responseSummary: "Sender ID already exists",
    failureReason: "Duplicate sender ID value detected in system",
  },
];

const AuditLogsPage = () => {
  const [expandedRows, setExpandedRows] = useState<string[]>([]);
  const [dateRange, setDateRange] = useState("today");
  const [userFilter, setUserFilter] = useState("all");
  const [actionFilter, setActionFilter] = useState("all");
  const [moduleFilter, setModuleFilter] = useState("all");
  const [resultFilter, setResultFilter] = useState("all");

  const toggleRow = (id: string) => {
    setExpandedRows(prev => 
      prev.includes(id) ? prev.filter(r => r !== id) : [...prev, id]
    );
  };

  const getResultBadge = (result: string) => {
    return result === "Success" ? (
      <Badge className="bg-success text-success-foreground">Success</Badge>
    ) : (
      <Badge className="bg-destructive text-destructive-foreground">Failure</Badge>
    );
  };

  const getActionBadge = (action: string) => {
    const colors: Record<string, string> = {
      Create: "bg-primary text-primary-foreground",
      Update: "bg-warning text-warning-foreground",
      Delete: "bg-destructive text-destructive-foreground",
      Send: "bg-secondary text-secondary-foreground",
      Login: "bg-muted text-muted-foreground",
      Logout: "bg-muted text-muted-foreground",
    };
    return <Badge className={colors[action] || "bg-muted text-muted-foreground"}>{action}</Badge>;
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
                  <BreadcrumbLink>Audit & Compliance</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Audit Logs</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <h1 className="text-2xl font-bold text-foreground mt-2">Audit Logs</h1>
          </div>
          <div className="flex items-center gap-2">
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-[180px]">
                <Calendar className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Date Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">Last 7 Days</SelectItem>
                <SelectItem value="month">Last 30 Days</SelectItem>
                <SelectItem value="custom">Custom Range</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <RefreshCw className="h-4 w-4" />
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Filter Panel */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div>
                <label className="text-sm font-medium mb-1 block">User</label>
                <Select value={userFilter} onValueChange={setUserFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Users" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Users</SelectItem>
                    <SelectItem value="admin">admin@nms.gov</SelectItem>
                    <SelectItem value="operator1">operator1@nms.gov</SelectItem>
                    <SelectItem value="operator2">operator2@nms.gov</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Action Type</label>
                <Select value={actionFilter} onValueChange={setActionFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Actions" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Actions</SelectItem>
                    <SelectItem value="create">Create</SelectItem>
                    <SelectItem value="update">Update</SelectItem>
                    <SelectItem value="delete">Delete</SelectItem>
                    <SelectItem value="send">Send</SelectItem>
                    <SelectItem value="login">Login/Logout</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Module</label>
                <Select value={moduleFilter} onValueChange={setModuleFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Modules" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Modules</SelectItem>
                    <SelectItem value="messaging">Messaging</SelectItem>
                    <SelectItem value="contacts">Contacts</SelectItem>
                    <SelectItem value="reports">Reports</SelectItem>
                    <SelectItem value="settings">Settings</SelectItem>
                    <SelectItem value="api">API</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Result</label>
                <Select value={resultFilter} onValueChange={setResultFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Results" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Results</SelectItem>
                    <SelectItem value="success">Success</SelectItem>
                    <SelectItem value="failure">Failure</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search logs..." className="pl-9" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Retention & Compliance Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="kpi-card kpi-card-primary">
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Log Retention Period</p>
              <p className="text-xl font-bold text-foreground">90 Days</p>
            </CardContent>
          </Card>
          <Card className="kpi-card kpi-card-success">
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Oldest Available Log</p>
              <p className="text-xl font-bold text-foreground">2025-11-02</p>
            </CardContent>
          </Card>
          <Card className="kpi-card kpi-card-success">
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Compliance Status</p>
              <p className="text-xl font-bold text-success">Compliant</p>
            </CardContent>
          </Card>
        </div>

        {/* Audit Log Table */}
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="data-table">
                <thead>
                  <tr>
                    <th className="w-8"></th>
                    <th>Timestamp</th>
                    <th>User</th>
                    <th>Role</th>
                    <th>Action</th>
                    <th>Module</th>
                    <th>Entity</th>
                    <th>Entity ID</th>
                    <th>Result</th>
                    <th>Source</th>
                    <th>IP Address</th>
                  </tr>
                </thead>
                <tbody>
                  {mockAuditLogs.map((log) => (
                    <Collapsible key={log.id} open={expandedRows.includes(log.id)} asChild>
                      <>
                        <CollapsibleTrigger asChild>
                          <tr 
                            className="cursor-pointer"
                            onClick={() => toggleRow(log.id)}
                          >
                            <td>
                              {expandedRows.includes(log.id) ? (
                                <ChevronDown className="h-4 w-4" />
                              ) : (
                                <ChevronRight className="h-4 w-4" />
                              )}
                            </td>
                            <td className="font-mono text-xs">{log.timestamp}</td>
                            <td>{log.user}</td>
                            <td>{log.role}</td>
                            <td>{getActionBadge(log.action)}</td>
                            <td>{log.module}</td>
                            <td>{log.entity}</td>
                            <td className="font-mono text-xs">
                              <span className="flex items-center gap-1">
                                {log.entityId}
                                <ExternalLink className="h-3 w-3 text-muted-foreground" />
                              </span>
                            </td>
                            <td>{getResultBadge(log.result)}</td>
                            <td>{log.source}</td>
                            <td className="font-mono text-xs">{log.ipAddress}</td>
                          </tr>
                        </CollapsibleTrigger>
                        <CollapsibleContent asChild>
                          <tr className="bg-muted/30">
                            <td colSpan={11} className="p-4">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {log.beforeValue && (
                                  <div>
                                    <p className="text-sm font-medium mb-1">Before Value</p>
                                    <pre className="bg-background p-2 text-xs overflow-x-auto border border-border">
                                      {log.beforeValue}
                                    </pre>
                                  </div>
                                )}
                                {log.afterValue && (
                                  <div>
                                    <p className="text-sm font-medium mb-1">After Value</p>
                                    <pre className="bg-background p-2 text-xs overflow-x-auto border border-border">
                                      {log.afterValue}
                                    </pre>
                                  </div>
                                )}
                                <div>
                                  <p className="text-sm font-medium mb-1">Request Payload (Masked)</p>
                                  <pre className="bg-background p-2 text-xs overflow-x-auto border border-border">
                                    {log.requestPayload}
                                  </pre>
                                </div>
                                <div>
                                  <p className="text-sm font-medium mb-1">Response Summary</p>
                                  <p className="text-sm bg-background p-2 border border-border">
                                    {log.responseSummary}
                                  </p>
                                </div>
                                {log.failureReason && (
                                  <div className="md:col-span-2">
                                    <p className="text-sm font-medium mb-1 text-destructive">Failure Reason</p>
                                    <p className="text-sm bg-destructive/10 p-2 border border-destructive/20 text-destructive">
                                      {log.failureReason}
                                    </p>
                                  </div>
                                )}
                              </div>
                            </td>
                          </tr>
                        </CollapsibleContent>
                      </>
                    </Collapsible>
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

export default AuditLogsPage;
