import { Link } from "react-router-dom";
import { 
  Calendar, 
  Download, 
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  Activity,
  TrendingUp,
  Server
} from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
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
import { Progress } from "@/components/ui/progress";

// Mock SLA metrics data
const slaMetrics = [
  {
    category: "API Availability",
    target: "99.9%",
    actual: "99.95%",
    status: "Met",
    period: "Jan 2026",
    lastUpdated: "2026-01-31 15:00",
  },
  {
    category: "SMS Delivery Success Rate",
    target: "98%",
    actual: "97.2%",
    status: "At Risk",
    period: "Jan 2026",
    lastUpdated: "2026-01-31 15:00",
  },
  {
    category: "Delivery Latency (<5s)",
    target: "95%",
    actual: "96.8%",
    status: "Met",
    period: "Jan 2026",
    lastUpdated: "2026-01-31 15:00",
  },
  {
    category: "Inbound Message Processing",
    target: "<2s",
    actual: "1.2s",
    status: "Met",
    period: "Jan 2026",
    lastUpdated: "2026-01-31 15:00",
  },
  {
    category: "Web Portal Availability",
    target: "99.5%",
    actual: "98.9%",
    status: "Breached",
    period: "Jan 2026",
    lastUpdated: "2026-01-31 15:00",
  },
];

// Mock incidents data
const incidents = [
  {
    id: "INC-001",
    category: "API Availability",
    startTime: "2026-01-28 09:15",
    endTime: "2026-01-28 09:45",
    duration: "30 min",
    impact: "Medium",
    rootCause: "Database connection pool exhaustion",
    status: "Resolved",
  },
  {
    id: "INC-002",
    category: "Web Portal Availability",
    startTime: "2026-01-25 14:00",
    endTime: "2026-01-25 16:30",
    duration: "2h 30m",
    impact: "High",
    rootCause: "Load balancer misconfiguration",
    status: "Resolved",
  },
  {
    id: "INC-003",
    category: "SMS Delivery",
    startTime: "2026-01-31 10:00",
    endTime: null,
    duration: "Ongoing",
    impact: "Low",
    rootCause: "Investigating carrier delays",
    status: "Active",
  },
];

// Mock operator SLA data
const operatorSLA = [
  {
    operator: "Ethio Telecom",
    agreedSLA: "98%",
    actualPerformance: "97.5%",
    breachCount: 2,
    fallbackRate: "1.2%",
  },
  {
    operator: "Safaricom Ethiopia",
    agreedSLA: "97%",
    actualPerformance: "98.2%",
    breachCount: 0,
    fallbackRate: "0.5%",
  },
  {
    operator: "MTN",
    agreedSLA: "96%",
    actualPerformance: "95.8%",
    breachCount: 1,
    fallbackRate: "2.1%",
  },
];

const SLAStatusPage = () => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Met":
        return <CheckCircle className="h-5 w-5 text-success" />;
      case "At Risk":
        return <AlertTriangle className="h-5 w-5 text-warning" />;
      case "Breached":
        return <XCircle className="h-5 w-5 text-destructive" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    const colors: Record<string, string> = {
      Met: "bg-success text-success-foreground",
      "At Risk": "bg-warning text-warning-foreground",
      Breached: "bg-destructive text-destructive-foreground",
      Resolved: "bg-muted text-muted-foreground",
      Active: "bg-destructive text-destructive-foreground",
    };
    return <Badge className={colors[status] || "bg-muted text-muted-foreground"}>{status}</Badge>;
  };

  const getImpactBadge = (impact: string) => {
    const colors: Record<string, string> = {
      Low: "bg-success/20 text-success border border-success/30",
      Medium: "bg-warning/20 text-warning border border-warning/30",
      High: "bg-destructive/20 text-destructive border border-destructive/30",
    };
    return <Badge className={colors[impact] || "bg-muted text-muted-foreground"}>{impact}</Badge>;
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
                  <BreadcrumbPage>SLA Status</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <h1 className="text-2xl font-bold text-foreground mt-2">SLA Status</h1>
          </div>
          <div className="flex items-center gap-2">
            <Select defaultValue="month">
              <SelectTrigger className="w-[180px]">
                <Calendar className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Date Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">Last 7 Days</SelectItem>
                <SelectItem value="month">Last 30 Days</SelectItem>
                <SelectItem value="quarter">Last Quarter</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* SLA Overview Panel */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <Card className="kpi-card kpi-card-success">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Server className="h-5 w-5 text-success" />
                <p className="text-sm text-muted-foreground">System Uptime</p>
              </div>
              <p className="text-2xl font-bold text-foreground">99.85%</p>
              <Progress value={99.85} className="mt-2 h-2" />
            </CardContent>
          </Card>
          <Card className="kpi-card kpi-card-warning">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-5 w-5 text-warning" />
                <p className="text-sm text-muted-foreground">Messaging SLA</p>
              </div>
              <p className="text-2xl font-bold text-foreground">97.2%</p>
              <Progress value={97.2} className="mt-2 h-2" />
            </CardContent>
          </Card>
          <Card className="kpi-card kpi-card-primary">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-5 w-5 text-primary" />
                <p className="text-sm text-muted-foreground">Avg Delivery Time</p>
              </div>
              <p className="text-2xl font-bold text-foreground">2.4s</p>
            </CardContent>
          </Card>
          <Card className="kpi-card kpi-card-primary">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Activity className="h-5 w-5 text-primary" />
                <p className="text-sm text-muted-foreground">Incidents (MTD)</p>
              </div>
              <p className="text-2xl font-bold text-foreground">3</p>
            </CardContent>
          </Card>
          <Card className="kpi-card kpi-card-danger">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-5 w-5 text-destructive" />
                <p className="text-sm text-muted-foreground">Active Incidents</p>
              </div>
              <p className="text-2xl font-bold text-destructive">1</p>
            </CardContent>
          </Card>
        </div>

        {/* SLA Metrics Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>SLA Metrics Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>SLA Category</th>
                    <th>Target Threshold</th>
                    <th>Actual Performance</th>
                    <th>Compliance Status</th>
                    <th>Measurement Period</th>
                    <th>Last Updated</th>
                  </tr>
                </thead>
                <tbody>
                  {slaMetrics.map((metric, index) => (
                    <tr key={index}>
                      <td className="font-medium">{metric.category}</td>
                      <td>{metric.target}</td>
                      <td className="font-mono">{metric.actual}</td>
                      <td>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(metric.status)}
                          {getStatusBadge(metric.status)}
                        </div>
                      </td>
                      <td>{metric.period}</td>
                      <td className="text-xs text-muted-foreground">{metric.lastUpdated}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Incident & Breach History */}
        <Card>
          <CardHeader>
            <CardTitle>Incident & Breach History</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Incident ID</th>
                    <th>Category</th>
                    <th>Start Time</th>
                    <th>End Time</th>
                    <th>Duration</th>
                    <th>Impact Level</th>
                    <th>Root Cause Summary</th>
                    <th>Resolution Status</th>
                  </tr>
                </thead>
                <tbody>
                  {incidents.map((incident) => (
                    <tr key={incident.id}>
                      <td className="font-mono text-xs">{incident.id}</td>
                      <td>{incident.category}</td>
                      <td className="text-xs">{incident.startTime}</td>
                      <td className="text-xs">{incident.endTime || "—"}</td>
                      <td>{incident.duration}</td>
                      <td>{getImpactBadge(incident.impact)}</td>
                      <td className="max-w-xs truncate">{incident.rootCause}</td>
                      <td>{getStatusBadge(incident.status)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Operator SLA Section */}
        <Card>
          <CardHeader>
            <CardTitle>Operator SLA Performance</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Operator Name</th>
                    <th>Agreed SLA</th>
                    <th>Actual Performance</th>
                    <th>Breach Count</th>
                    <th>Fallback Usage Rate</th>
                  </tr>
                </thead>
                <tbody>
                  {operatorSLA.map((operator, index) => (
                    <tr key={index}>
                      <td className="font-medium">{operator.operator}</td>
                      <td>{operator.agreedSLA}</td>
                      <td className="font-mono">{operator.actualPerformance}</td>
                      <td>
                        {operator.breachCount > 0 ? (
                          <span className="text-destructive font-medium">{operator.breachCount}</span>
                        ) : (
                          <span className="text-success">0</span>
                        )}
                      </td>
                      <td>{operator.fallbackRate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Alerts & Notifications */}
        <Card>
          <CardHeader>
            <CardTitle>Active Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-warning/10 border border-warning/20">
                <AlertTriangle className="h-5 w-5 text-warning flex-shrink-0" />
                <div>
                  <p className="font-medium text-sm">SMS Delivery Rate Below Threshold</p>
                  <p className="text-xs text-muted-foreground">
                    Current rate: 97.2% (Target: 98%) - Notification sent to operations team
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-destructive/10 border border-destructive/20">
                <XCircle className="h-5 w-5 text-destructive flex-shrink-0" />
                <div>
                  <p className="font-medium text-sm">Web Portal Availability SLA Breached</p>
                  <p className="text-xs text-muted-foreground">
                    Current: 98.9% (Target: 99.5%) - Escalated to management
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default SLAStatusPage;
