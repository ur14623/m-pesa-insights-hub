import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Activity,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Clock,
  Shield,
} from "lucide-react";

type SystemStatus = "operational" | "degraded" | "down";

interface Alert {
  id: string;
  message: string;
  severity: "error" | "warning" | "info";
  time: string;
}

interface Incident {
  date: string;
  description: string;
  status: "resolved" | "investigating" | "monitoring";
}

const systemStatus: SystemStatus = "operational";
const slaUptime = 99.87;

const activeAlerts: Alert[] = [
  {
    id: "1",
    message: "High delivery failure rate detected on Safaricom route",
    severity: "warning",
    time: "12 min ago",
  },
  {
    id: "2",
    message: "AI content filter blocked 23 messages",
    severity: "info",
    time: "1 hour ago",
  },
];

const lastIncident: Incident = {
  date: "Jan 24, 2026",
  description: "Ethio Telecom gateway timeout - 15 min outage",
  status: "resolved",
};

const SystemHealth = () => {
  const getStatusConfig = (status: SystemStatus) => {
    switch (status) {
      case "operational":
        return {
          icon: CheckCircle,
          color: "text-success",
          bg: "bg-success/10",
          border: "border-success/20",
          label: "Operational",
        };
      case "degraded":
        return {
          icon: AlertTriangle,
          color: "text-warning",
          bg: "bg-warning/10",
          border: "border-warning/20",
          label: "Degraded",
        };
      case "down":
        return {
          icon: XCircle,
          color: "text-destructive",
          bg: "bg-destructive/10",
          border: "border-destructive/20",
          label: "Down",
        };
    }
  };

  const statusConfig = getStatusConfig(systemStatus);
  const StatusIcon = statusConfig.icon;

  const getAlertIcon = (severity: string) => {
    switch (severity) {
      case "error":
        return <XCircle className="h-4 w-4 text-destructive" />;
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-warning" />;
      default:
        return <Activity className="h-4 w-4 text-primary" />;
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          <CardTitle className="text-base font-semibold">
            System Health & Alerts
          </CardTitle>
        </div>
        <p className="text-xs text-muted-foreground">
          Platform status and active notifications
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* System Status */}
        <div
          className={`p-4 ${statusConfig.bg} border ${statusConfig.border} flex items-center justify-between`}
        >
          <div className="flex items-center gap-3">
            <StatusIcon className={`h-6 w-6 ${statusConfig.color}`} />
            <div>
              <p className="font-semibold">{statusConfig.label}</p>
              <p className="text-xs text-muted-foreground">
                All systems functioning normally
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-foreground">{slaUptime}%</p>
            <p className="text-xs text-muted-foreground">SLA Uptime</p>
          </div>
        </div>

        {/* Active Alerts */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-medium text-muted-foreground">
              ACTIVE ALERTS
            </p>
            <Badge variant="outline" className="text-xs">
              {activeAlerts.length} active
            </Badge>
          </div>
          <div className="space-y-2">
            {activeAlerts.map((alert) => (
              <div
                key={alert.id}
                className={`p-3 border ${
                  alert.severity === "error"
                    ? "bg-destructive/5 border-destructive/20"
                    : alert.severity === "warning"
                      ? "bg-warning/5 border-warning/20"
                      : "bg-muted/30 border-border"
                }`}
              >
                <div className="flex items-start gap-2">
                  {getAlertIcon(alert.severity)}
                  <div className="flex-1">
                    <p className="text-sm">{alert.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      <Clock className="h-3 w-3 inline mr-1" />
                      {alert.time}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Last Incident */}
        <div className="pt-3 border-t border-border">
          <p className="text-xs font-medium text-muted-foreground mb-2">
            LAST INCIDENT
          </p>
          <div className="p-3 bg-muted/20 border border-border">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium">{lastIncident.date}</span>
              <Badge
                className={
                  lastIncident.status === "resolved"
                    ? "bg-success/10 text-success border-success/20"
                    : "bg-warning/10 text-warning border-warning/20"
                }
              >
                {lastIncident.status.charAt(0).toUpperCase() +
                  lastIncident.status.slice(1)}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              {lastIncident.description}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SystemHealth;
