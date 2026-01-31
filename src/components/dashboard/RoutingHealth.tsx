import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertTriangle, XCircle, Route } from "lucide-react";

interface RouteStatus {
  name: string;
  status: "active" | "standby" | "error";
  type: "primary" | "fallback";
  lastCheck: string;
}

const routes: RouteStatus[] = [
  {
    name: "Ethio Telecom SMPP",
    status: "active",
    type: "primary",
    lastCheck: "2 min ago",
  },
  {
    name: "Safaricom HTTP API",
    status: "active",
    type: "primary",
    lastCheck: "1 min ago",
  },
  {
    name: "Ethio Backup Gateway",
    status: "standby",
    type: "fallback",
    lastCheck: "5 min ago",
  },
];

const alerts = [
  { message: "High latency on Safaricom route", severity: "warning" },
];

const RoutingHealth = () => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="h-4 w-4 text-success" />;
      case "standby":
        return <AlertTriangle className="h-4 w-4 text-warning" />;
      case "error":
        return <XCircle className="h-4 w-4 text-destructive" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-success/10 text-success border-success/20">Active</Badge>;
      case "standby":
        return <Badge className="bg-warning/10 text-warning border-warning/20">Standby</Badge>;
      case "error":
        return <Badge variant="destructive">Error</Badge>;
      default:
        return null;
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <Route className="h-5 w-5 text-primary" />
          <CardTitle className="text-base font-semibold">
            Routing Health
          </CardTitle>
        </div>
        <p className="text-xs text-muted-foreground">
          SMS gateway and route status
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Routes List */}
        <div className="space-y-3">
          {routes.map((route) => (
            <div
              key={route.name}
              className="flex items-center justify-between p-3 bg-muted/30 border border-border"
            >
              <div className="flex items-center gap-3">
                {getStatusIcon(route.status)}
                <div>
                  <p className="text-sm font-medium">{route.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {route.type === "primary" ? "Primary Route" : "Fallback Route"} •
                    Last check: {route.lastCheck}
                  </p>
                </div>
              </div>
              {getStatusBadge(route.status)}
            </div>
          ))}
        </div>

        {/* Throttling Alerts */}
        {alerts.length > 0 && (
          <div className="pt-3 border-t border-border">
            <p className="text-xs font-medium text-muted-foreground mb-2">
              THROTTLING ALERTS
            </p>
            {alerts.map((alert, index) => (
              <div
                key={index}
                className="flex items-center gap-2 p-2 bg-warning/10 border border-warning/20"
              >
                <AlertTriangle className="h-4 w-4 text-warning" />
                <span className="text-sm">{alert.message}</span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RoutingHealth;
