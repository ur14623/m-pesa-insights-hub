import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Plus, 
  Search, 
  MoreHorizontal,
  Eye,
  RefreshCw,
  XCircle,
  Copy,
  Play,
  Key,
  Webhook,
  CheckCircle,
  AlertCircle
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

// Mock API keys data
const mockAPIKeys = [
  {
    id: "KEY-001",
    name: "Production API",
    scope: ["Send SMS", "Receive SMS", "Reports"],
    status: "Active",
    createdDate: "2025-06-15",
    lastUsed: "2026-01-31 14:25",
    keyPreview: "sk_live_****7890",
  },
  {
    id: "KEY-002",
    name: "Development API",
    scope: ["Send SMS", "Reports"],
    status: "Active",
    createdDate: "2025-09-20",
    lastUsed: "2026-01-30 10:15",
    keyPreview: "sk_test_****1234",
  },
  {
    id: "KEY-003",
    name: "Old Integration Key",
    scope: ["Send SMS"],
    status: "Revoked",
    createdDate: "2024-03-10",
    lastUsed: "2025-12-15 09:30",
    keyPreview: "sk_live_****5678",
  },
];

// Mock webhooks data
const mockWebhooks = [
  {
    id: "WH-001",
    name: "Delivery Notifications",
    eventTypes: ["Delivery Receipt", "Message Sent"],
    endpointUrl: "https://api.example.com/webhooks/sms",
    status: "Active",
    lastTriggered: "2026-01-31 14:20",
  },
  {
    id: "WH-002",
    name: "Inbound Message Handler",
    eventTypes: ["Inbound Message"],
    endpointUrl: "https://api.example.com/webhooks/inbound",
    status: "Active",
    lastTriggered: "2026-01-31 13:45",
  },
  {
    id: "WH-003",
    name: "Error Alerts",
    eventTypes: ["Failure Alert"],
    endpointUrl: "https://alerts.example.com/sms-errors",
    status: "Inactive",
    lastTriggered: "2026-01-28 16:30",
  },
];

const APIWebhooksPage = () => {
  const [isApiDialogOpen, setIsApiDialogOpen] = useState(false);
  const [isWebhookDialogOpen, setIsWebhookDialogOpen] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);

  const getStatusBadge = (status: string) => {
    const colors: Record<string, string> = {
      Active: "bg-success text-success-foreground",
      Inactive: "bg-muted text-muted-foreground",
      Revoked: "bg-destructive text-destructive-foreground",
    };
    return <Badge className={colors[status] || "bg-muted text-muted-foreground"}>{status}</Badge>;
  };

  const handleTestWebhook = () => {
    // Simulate webhook test
    setTestResult({ success: true, message: "Webhook responded with 200 OK in 245ms" });
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
                  <BreadcrumbPage>API & Webhooks</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <h1 className="text-2xl font-bold text-foreground mt-2">API & Webhooks</h1>
          </div>
        </div>

        <Tabs defaultValue="api-keys" className="space-y-6">
          <TabsList>
            <TabsTrigger value="api-keys" className="flex items-center gap-2">
              <Key className="h-4 w-4" />
              API Keys
            </TabsTrigger>
            <TabsTrigger value="webhooks" className="flex items-center gap-2">
              <Webhook className="h-4 w-4" />
              Webhooks
            </TabsTrigger>
          </TabsList>

          {/* API Keys Tab */}
          <TabsContent value="api-keys" className="space-y-6">
            <div className="flex justify-between items-center">
              <p className="text-muted-foreground">
                Manage API keys for programmatic access to the SMS platform.
              </p>
              <Dialog open={isApiDialogOpen} onOpenChange={setIsApiDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Generate API Key
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Generate New API Key</DialogTitle>
                    <DialogDescription>
                      Create a new API key with specific access permissions
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="keyName">Key Name *</Label>
                      <Input id="keyName" placeholder="e.g., Production API" />
                    </div>
                    <div className="space-y-2">
                      <Label>Access Scope *</Label>
                      <div className="space-y-2 border border-border p-3">
                        <div className="flex items-center gap-2">
                          <Checkbox id="scope-send" defaultChecked />
                          <Label htmlFor="scope-send" className="font-normal">Send SMS</Label>
                        </div>
                        <div className="flex items-center gap-2">
                          <Checkbox id="scope-receive" />
                          <Label htmlFor="scope-receive" className="font-normal">Receive SMS</Label>
                        </div>
                        <div className="flex items-center gap-2">
                          <Checkbox id="scope-reports" defaultChecked />
                          <Label htmlFor="scope-reports" className="font-normal">Reports</Label>
                        </div>
                        <div className="flex items-center gap-2">
                          <Checkbox id="scope-contacts" />
                          <Label htmlFor="scope-contacts" className="font-normal">Contacts</Label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsApiDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={() => setIsApiDialogOpen(false)}>
                      Generate Key
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Key Name</th>
                        <th>Access Scope</th>
                        <th>Status</th>
                        <th>Created Date</th>
                        <th>Last Used</th>
                        <th className="w-12">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockAPIKeys.map((apiKey) => (
                        <tr key={apiKey.id}>
                          <td>
                            <div>
                              <p className="font-medium">{apiKey.name}</p>
                              <p className="text-xs text-muted-foreground font-mono">
                                {apiKey.keyPreview}
                              </p>
                            </div>
                          </td>
                          <td>
                            <div className="flex flex-wrap gap-1">
                              {apiKey.scope.map((s, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {s}
                                </Badge>
                              ))}
                            </div>
                          </td>
                          <td>{getStatusBadge(apiKey.status)}</td>
                          <td className="text-xs text-muted-foreground">{apiKey.createdDate}</td>
                          <td className="text-xs text-muted-foreground">{apiKey.lastUsed}</td>
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
                                  View Permissions
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Copy className="h-4 w-4 mr-2" />
                                  Copy Key
                                </DropdownMenuItem>
                                {apiKey.status === "Active" && (
                                  <>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>
                                      <RefreshCw className="h-4 w-4 mr-2" />
                                      Regenerate Key
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="text-destructive">
                                      <XCircle className="h-4 w-4 mr-2" />
                                      Revoke Key
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
          </TabsContent>

          {/* Webhooks Tab */}
          <TabsContent value="webhooks" className="space-y-6">
            <div className="flex justify-between items-center">
              <p className="text-muted-foreground">
                Configure webhooks to receive real-time event notifications.
              </p>
              <Dialog open={isWebhookDialogOpen} onOpenChange={setIsWebhookDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Webhook
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Add New Webhook</DialogTitle>
                    <DialogDescription>
                      Configure a webhook endpoint to receive event notifications
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="webhookName">Webhook Name *</Label>
                      <Input id="webhookName" placeholder="e.g., Delivery Notifications" />
                    </div>
                    <div className="space-y-2">
                      <Label>Event Types *</Label>
                      <div className="grid grid-cols-2 gap-2 border border-border p-3">
                        <div className="flex items-center gap-2">
                          <Checkbox id="event-sent" />
                          <Label htmlFor="event-sent" className="font-normal">Message Sent</Label>
                        </div>
                        <div className="flex items-center gap-2">
                          <Checkbox id="event-delivery" defaultChecked />
                          <Label htmlFor="event-delivery" className="font-normal">Delivery Receipt</Label>
                        </div>
                        <div className="flex items-center gap-2">
                          <Checkbox id="event-inbound" />
                          <Label htmlFor="event-inbound" className="font-normal">Inbound Message</Label>
                        </div>
                        <div className="flex items-center gap-2">
                          <Checkbox id="event-failure" />
                          <Label htmlFor="event-failure" className="font-normal">Failure Alert</Label>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="endpointUrl">Endpoint URL *</Label>
                      <Input id="endpointUrl" placeholder="https://api.example.com/webhooks" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>HTTP Method</Label>
                        <Select defaultValue="POST">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="POST">POST</SelectItem>
                            <SelectItem value="PUT">PUT</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Authentication Type</Label>
                        <Select defaultValue="none">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="none">None</SelectItem>
                            <SelectItem value="basic">Basic Auth</SelectItem>
                            <SelectItem value="bearer">Bearer Token</SelectItem>
                            <SelectItem value="hmac">HMAC Signature</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Retry Policy</Label>
                        <Select defaultValue="3">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="0">No Retries</SelectItem>
                            <SelectItem value="3">3 Retries</SelectItem>
                            <SelectItem value="5">5 Retries</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Timeout (seconds)</Label>
                        <Select defaultValue="30">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="10">10 seconds</SelectItem>
                            <SelectItem value="30">30 seconds</SelectItem>
                            <SelectItem value="60">60 seconds</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <Separator />

                    {/* Test Panel */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label>Webhook Testing</Label>
                        <Button variant="outline" size="sm" onClick={handleTestWebhook}>
                          <Play className="h-4 w-4 mr-2" />
                          Send Test Event
                        </Button>
                      </div>
                      {testResult && (
                        <div className={`p-3 border ${testResult.success ? 'border-success/30 bg-success/10' : 'border-destructive/30 bg-destructive/10'}`}>
                          <div className="flex items-center gap-2">
                            {testResult.success ? (
                              <CheckCircle className="h-4 w-4 text-success" />
                            ) : (
                              <AlertCircle className="h-4 w-4 text-destructive" />
                            )}
                            <span className="text-sm">{testResult.message}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsWebhookDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={() => setIsWebhookDialogOpen(false)}>
                      Save Webhook
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Webhook Name</th>
                        <th>Event Types</th>
                        <th>Endpoint URL</th>
                        <th>Status</th>
                        <th>Last Triggered</th>
                        <th className="w-12">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockWebhooks.map((webhook) => (
                        <tr key={webhook.id}>
                          <td className="font-medium">{webhook.name}</td>
                          <td>
                            <div className="flex flex-wrap gap-1">
                              {webhook.eventTypes.map((event, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {event}
                                </Badge>
                              ))}
                            </div>
                          </td>
                          <td className="font-mono text-xs max-w-xs truncate">
                            {webhook.endpointUrl}
                          </td>
                          <td>{getStatusBadge(webhook.status)}</td>
                          <td className="text-xs text-muted-foreground">{webhook.lastTriggered}</td>
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
                                <DropdownMenuItem>
                                  <Play className="h-4 w-4 mr-2" />
                                  Test Webhook
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-destructive">
                                  <XCircle className="h-4 w-4 mr-2" />
                                  Delete Webhook
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
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default APIWebhooksPage;
