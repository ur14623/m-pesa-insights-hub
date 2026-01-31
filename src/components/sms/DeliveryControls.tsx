import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Settings, Gauge, Route, Bell, DollarSign } from "lucide-react";

interface DeliveryControlsProps {
  throttling: string;
  onThrottlingChange: (value: string) => void;
  routing: string;
  onRoutingChange: (value: string) => void;
  confirmationEnabled: boolean;
  onConfirmationEnabledChange: (enabled: boolean) => void;
  recipientCount: number;
  segmentCount: number;
}

const throttlingOptions = [
  { id: "auto", label: "Auto (Recommended)", description: "Optimized based on operator limits" },
  { id: "fast", label: "Fast (500/min)", description: "Maximum throughput" },
  { id: "moderate", label: "Moderate (200/min)", description: "Balanced delivery" },
  { id: "slow", label: "Slow (50/min)", description: "Reduced load" },
];

const routingOptions = [
  { id: "auto", label: "Auto Route", description: "Automatic operator selection" },
  { id: "ethio-primary", label: "Ethio Telecom Primary", description: "Primary route" },
  { id: "safaricom-primary", label: "Safaricom Primary", description: "Alternative route" },
  { id: "failover", label: "Failover Enabled", description: "Auto-switch on failure" },
];

export function DeliveryControls({
  throttling,
  onThrottlingChange,
  routing,
  onRoutingChange,
  confirmationEnabled,
  onConfirmationEnabledChange,
  recipientCount,
  segmentCount,
}: DeliveryControlsProps) {
  // Cost estimation (mock calculation)
  const costPerSegment = 0.25; // ETB
  const estimatedCost = recipientCount * segmentCount * costPerSegment;

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-foreground flex items-center gap-2">
        <Settings className="h-4 w-4" />
        Delivery Controls
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Throttling */}
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground flex items-center gap-2">
            <Gauge className="h-4 w-4" />
            Message Throttling
          </label>
          <Select value={throttling} onValueChange={onThrottlingChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select throttling" />
            </SelectTrigger>
            <SelectContent>
              {throttlingOptions.map((option) => (
                <SelectItem key={option.id} value={option.id}>
                  <div>
                    <div>{option.label}</div>
                    <div className="text-xs text-muted-foreground">{option.description}</div>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Routing */}
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground flex items-center gap-2">
            <Route className="h-4 w-4" />
            Operator Routing
          </label>
          <Select value={routing} onValueChange={onRoutingChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select routing" />
            </SelectTrigger>
            <SelectContent>
              {routingOptions.map((option) => (
                <SelectItem key={option.id} value={option.id}>
                  <div>
                    <div>{option.label}</div>
                    <div className="text-xs text-muted-foreground">{option.description}</div>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Delivery Confirmation Toggle */}
      <div className="flex items-center justify-between p-3 border bg-muted/30">
        <div className="flex items-center gap-3">
          <Bell className="h-5 w-5 text-muted-foreground" />
          <div>
            <div className="text-sm font-medium">Delivery Confirmation</div>
            <div className="text-xs text-muted-foreground">
              Receive notification when delivery completes
            </div>
          </div>
        </div>
        <Switch
          checked={confirmationEnabled}
          onCheckedChange={onConfirmationEnabledChange}
        />
      </div>

      {/* Cost Estimation */}
      <div className="p-4 border bg-primary/5 border-primary/20">
        <div className="flex items-center gap-2 mb-3">
          <DollarSign className="h-5 w-5 text-primary" />
          <span className="font-medium">Cost Estimation</span>
        </div>
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div>
            <div className="text-muted-foreground">Recipients</div>
            <div className="text-lg font-bold">{recipientCount.toLocaleString()}</div>
          </div>
          <div>
            <div className="text-muted-foreground">Segments</div>
            <div className="text-lg font-bold">{segmentCount}</div>
          </div>
          <div>
            <div className="text-muted-foreground">Est. Cost</div>
            <div className="text-lg font-bold text-primary">
              {estimatedCost.toLocaleString()} ETB
            </div>
          </div>
        </div>
        <div className="text-xs text-muted-foreground mt-2">
          Rate: {costPerSegment} ETB per segment • Total segments: {(recipientCount * segmentCount).toLocaleString()}
        </div>
      </div>
    </div>
  );
}
