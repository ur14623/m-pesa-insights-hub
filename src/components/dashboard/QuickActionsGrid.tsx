import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Send,
  Upload,
  FileBarChart,
  ShieldAlert,
  Settings,
  Zap,
} from "lucide-react";

interface QuickAction {
  label: string;
  icon: React.ElementType;
  description: string;
  variant?: "default" | "outline";
}

const actions: QuickAction[] = [
  {
    label: "Send New SMS",
    icon: Send,
    description: "Compose and send message",
    variant: "default",
  },
  {
    label: "Upload Bulk Contacts",
    icon: Upload,
    description: "Import contact list",
    variant: "outline",
  },
  {
    label: "View Delivery Report",
    icon: FileBarChart,
    description: "Check message status",
    variant: "outline",
  },
  {
    label: "AI Blocked Messages",
    icon: ShieldAlert,
    description: "Review flagged content",
    variant: "outline",
  },
  {
    label: "System Settings",
    icon: Settings,
    description: "Configure platform",
    variant: "outline",
  },
];

const QuickActionsGrid = () => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-primary" />
          <CardTitle className="text-base font-semibold">Quick Actions</CardTitle>
        </div>
        <p className="text-xs text-muted-foreground">
          Frequently used operations
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {actions.map((action) => (
            <Button
              key={action.label}
              variant={action.variant}
              className="h-auto flex-col gap-2 p-4 text-center"
            >
              <action.icon className="h-6 w-6" />
              <div>
                <p className="text-sm font-medium">{action.label}</p>
                <p className="text-xs text-muted-foreground font-normal mt-0.5">
                  {action.description}
                </p>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActionsGrid;
