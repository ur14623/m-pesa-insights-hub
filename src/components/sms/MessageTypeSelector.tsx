import { cn } from "@/lib/utils";
import { Send, Users, Clock } from "lucide-react";

type DeliveryMode = "single" | "bulk" | "scheduled";

interface MessageTypeSelectorProps {
  value: DeliveryMode;
  onChange: (mode: DeliveryMode) => void;
}

const deliveryModes = [
  {
    id: "single" as const,
    label: "Single SMS",
    description: "Send to one recipient",
    icon: Send,
  },
  {
    id: "bulk" as const,
    label: "Bulk SMS",
    description: "Send to multiple recipients",
    icon: Users,
  },
  {
    id: "scheduled" as const,
    label: "Scheduled SMS",
    description: "Schedule for later delivery",
    icon: Clock,
  },
];

export function MessageTypeSelector({ value, onChange }: MessageTypeSelectorProps) {
  return (
    <div className="space-y-3">
      <label className="text-sm font-medium text-foreground">
        Delivery Mode <span className="text-destructive">*</span>
      </label>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {deliveryModes.map((mode) => {
          const Icon = mode.icon;
          const isSelected = value === mode.id;
          return (
            <button
              key={mode.id}
              type="button"
              onClick={() => onChange(mode.id)}
              className={cn(
                "flex items-center gap-3 p-4 border-2 text-left transition-colors",
                isSelected
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/50 hover:bg-muted/50"
              )}
            >
              <div
                className={cn(
                  "p-2",
                  isSelected ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                )}
              >
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <div className="font-medium text-foreground">{mode.label}</div>
                <div className="text-xs text-muted-foreground">{mode.description}</div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
