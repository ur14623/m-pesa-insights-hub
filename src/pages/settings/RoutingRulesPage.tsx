import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Plus, 
  Search, 
  MoreHorizontal,
  Eye,
  Pencil,
  Power,
  Trash2,
  GripVertical,
  Route,
  Play,
  ArrowRight,
  AlertTriangle,
  Clock,
  DollarSign
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
import { Slider } from "@/components/ui/slider";

// Mock routing rules data
const mockRoutingRules = [
  {
    id: "RR-001",
    name: "Primary Ethio Telecom Route",
    priority: 1,
    conditions: "All domestic traffic",
    primaryOperator: "Ethio Telecom",
    fallbackOperator: "Safaricom",
    status: "Active",
    lastModified: "2026-01-28",
  },
  {
    id: "RR-002",
    name: "High Priority Messages",
    priority: 2,
    conditions: "Message type: Urgent, Time: 08:00-18:00",
    primaryOperator: "Safaricom",
    fallbackOperator: "Ethio Telecom",
    status: "Active",
    lastModified: "2026-01-25",
  },
  {
    id: "RR-003",
    name: "Cost Optimized Bulk",
    priority: 3,
    conditions: "Message type: Bulk, Volume: >1000",
    primaryOperator: "MTN",
    fallbackOperator: "Ethio Telecom",
    status: "Active",
    lastModified: "2026-01-20",
  },
  {
    id: "RR-004",
    name: "Night Time Route",
    priority: 4,
    conditions: "Time: 22:00-06:00",
    primaryOperator: "Ethio Telecom",
    fallbackOperator: null,
    status: "Inactive",
    lastModified: "2026-01-15",
  },
];

const RoutingRulesPage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingRule, setEditingRule] = useState<typeof mockRoutingRules[0] | null>(null);
  const [simulationResult, setSimulationResult] = useState<{
    path: string[];
    cost: string;
    latency: string;
  } | null>(null);

  const getStatusBadge = (status: string) => {
    return status === "Active" ? (
      <Badge className="bg-success text-success-foreground">Active</Badge>
    ) : (
      <Badge className="bg-muted text-muted-foreground">Inactive</Badge>
    );
  };

  const openEditDialog = (rule: typeof mockRoutingRules[0] | null = null) => {
    setEditingRule(rule);
    setSimulationResult(null);
    setIsDialogOpen(true);
  };

  const handleSimulate = () => {
    setSimulationResult({
      path: ["Ethio Telecom (Primary)", "Safaricom (Fallback if needed)"],
      cost: "$0.015 per SMS",
      latency: "~2.5 seconds",
    });
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
                  <BreadcrumbPage>Routing Rules</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <h1 className="text-2xl font-bold text-foreground mt-2">Routing Rules</h1>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search rules..." className="pl-9 w-64" />
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => openEditDialog(null)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create New Rule
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>
                    {editingRule ? "Edit Routing Rule" : "Create New Routing Rule"}
                  </DialogTitle>
                  <DialogDescription>
                    Define conditions and routing logic for SMS delivery
                  </DialogDescription>
                </DialogHeader>
                
                <div className="space-y-6 py-4">
                  {/* Rule Definition */}
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="ruleName">Rule Name *</Label>
                        <Input 
                          id="ruleName" 
                          defaultValue={editingRule?.name || ""}
                          placeholder="e.g., High Priority Route"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Priority Order</Label>
                        <Select defaultValue={editingRule?.priority.toString() || "1"}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">1 (Highest)</SelectItem>
                            <SelectItem value="2">2</SelectItem>
                            <SelectItem value="3">3</SelectItem>
                            <SelectItem value="4">4</SelectItem>
                            <SelectItem value="5">5 (Lowest)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Conditions */}
                  <div className="space-y-4">
                    <h3 className="font-semibold flex items-center gap-2">
                      <Route className="h-5 w-5" />
                      Conditions
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Operator Availability</Label>
                        <Select defaultValue="any">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="any">Any Available</SelectItem>
                            <SelectItem value="ethio">Ethio Telecom Available</SelectItem>
                            <SelectItem value="safari">Safaricom Available</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Failure Rate Threshold</Label>
                        <Select defaultValue="5">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">&lt; 1%</SelectItem>
                            <SelectItem value="5">&lt; 5%</SelectItem>
                            <SelectItem value="10">&lt; 10%</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Time of Day</Label>
                        <Select defaultValue="all">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Day</SelectItem>
                            <SelectItem value="business">Business Hours (08:00-18:00)</SelectItem>
                            <SelectItem value="night">Night (22:00-06:00)</SelectItem>
                            <SelectItem value="custom">Custom Range</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Message Type</Label>
                        <Select defaultValue="all">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Types</SelectItem>
                            <SelectItem value="single">Single</SelectItem>
                            <SelectItem value="bulk">Bulk</SelectItem>
                            <SelectItem value="scheduled">Scheduled</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Sender ID</Label>
                        <Select defaultValue="all">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">Any Sender ID</SelectItem>
                            <SelectItem value="ethdairy">ETHDAIRY</SelectItem>
                            <SelectItem value="8585">8585</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Message Language</Label>
                        <Select defaultValue="all">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">Any Language</SelectItem>
                            <SelectItem value="en">English</SelectItem>
                            <SelectItem value="am">Amharic</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Routing Logic */}
                  <div className="space-y-4">
                    <h3 className="font-semibold">Routing Logic</h3>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label>Primary Route *</Label>
                        <Select defaultValue={editingRule?.primaryOperator || ""}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select operator" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Ethio Telecom">Ethio Telecom</SelectItem>
                            <SelectItem value="Safaricom">Safaricom Ethiopia</SelectItem>
                            <SelectItem value="MTN">MTN</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>First Fallback</Label>
                        <Select defaultValue={editingRule?.fallbackOperator || ""}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select operator" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="none">None</SelectItem>
                            <SelectItem value="Ethio Telecom">Ethio Telecom</SelectItem>
                            <SelectItem value="Safaricom">Safaricom Ethiopia</SelectItem>
                            <SelectItem value="MTN">MTN</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Second Fallback</Label>
                        <Select defaultValue="">
                          <SelectTrigger>
                            <SelectValue placeholder="Select operator" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="none">None</SelectItem>
                            <SelectItem value="Ethio Telecom">Ethio Telecom</SelectItem>
                            <SelectItem value="Safaricom">Safaricom Ethiopia</SelectItem>
                            <SelectItem value="MTN">MTN</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Failover Delay Threshold (seconds): 30</Label>
                      <Slider defaultValue={[30]} max={120} step={5} />
                    </div>
                  </div>

                  <Separator />

                  {/* Simulation Panel */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">Simulation & Testing</h3>
                      <Button variant="outline" size="sm" onClick={handleSimulate}>
                        <Play className="h-4 w-4 mr-2" />
                        Simulate Route
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Test Recipient</Label>
                        <Input placeholder="+251911123456" />
                      </div>
                      <div className="space-y-2">
                        <Label>Test Message Type</Label>
                        <Select defaultValue="single">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="single">Single SMS</SelectItem>
                            <SelectItem value="bulk">Bulk SMS</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {simulationResult && (
                      <Card className="bg-muted/50">
                        <CardContent className="p-4 space-y-3">
                          <div>
                            <p className="text-sm font-medium mb-1">Expected Delivery Path</p>
                            <div className="flex items-center gap-2 text-sm">
                              {simulationResult.path.map((step, index) => (
                                <span key={index} className="flex items-center gap-2">
                                  <Badge variant="outline">{step}</Badge>
                                  {index < simulationResult.path.length - 1 && (
                                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                                  )}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div className="flex gap-6 text-sm">
                            <div className="flex items-center gap-2">
                              <DollarSign className="h-4 w-4 text-muted-foreground" />
                              <span>Cost: {simulationResult.cost}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              <span>Latency: {simulationResult.latency}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </div>

                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => setIsDialogOpen(false)}>
                    {editingRule ? "Update Rule" : "Create Rule"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Monitoring & Alerts */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="kpi-card kpi-card-success">
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Active Rules</p>
              <p className="text-2xl font-bold text-foreground">3</p>
            </CardContent>
          </Card>
          <Card className="kpi-card kpi-card-warning">
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Fallback Usage (Today)</p>
              <p className="text-2xl font-bold text-foreground">2.3%</p>
            </CardContent>
          </Card>
          <Card className="kpi-card kpi-card-primary">
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Avg Delivery Latency</p>
              <p className="text-2xl font-bold text-foreground">2.4s</p>
            </CardContent>
          </Card>
        </div>

        {/* Routing Rules Table */}
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="data-table">
                <thead>
                  <tr>
                    <th className="w-8"></th>
                    <th>Priority</th>
                    <th>Rule Name</th>
                    <th>Conditions</th>
                    <th>Primary Operator</th>
                    <th>Fallback Operator</th>
                    <th>Status</th>
                    <th>Last Modified</th>
                    <th className="w-12">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {mockRoutingRules.map((rule) => (
                    <tr key={rule.id}>
                      <td>
                        <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab" />
                      </td>
                      <td>
                        <Badge variant="outline" className="font-mono">
                          #{rule.priority}
                        </Badge>
                      </td>
                      <td className="font-medium">{rule.name}</td>
                      <td className="text-sm text-muted-foreground max-w-xs truncate">
                        {rule.conditions}
                      </td>
                      <td>{rule.primaryOperator}</td>
                      <td>{rule.fallbackOperator || "—"}</td>
                      <td>{getStatusBadge(rule.status)}</td>
                      <td className="text-xs text-muted-foreground">{rule.lastModified}</td>
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
                              View Rule
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => openEditDialog(rule)}>
                              <Pencil className="h-4 w-4 mr-2" />
                              Edit Rule
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <Power className="h-4 w-4 mr-2" />
                              {rule.status === "Active" ? "Disable" : "Enable"}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete Rule
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

        {/* Alert Section */}
        <Card>
          <CardHeader>
            <CardTitle>Active Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3 p-3 bg-warning/10 border border-warning/20">
              <AlertTriangle className="h-5 w-5 text-warning flex-shrink-0" />
              <div>
                <p className="font-medium text-sm">Elevated Fallback Usage</p>
                <p className="text-xs text-muted-foreground">
                  Fallback route usage is higher than normal (2.3% vs 1.5% baseline) - Check Ethio Telecom performance
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default RoutingRulesPage;
