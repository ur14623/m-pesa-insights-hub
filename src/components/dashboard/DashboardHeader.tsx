import { useState } from "react";
import { RefreshCw, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface DashboardHeaderProps {
  lastUpdated: Date;
  onRefresh: () => void;
}

const DashboardHeader = ({ lastUpdated, onRefresh }: DashboardHeaderProps) => {
  const [dateRange, setDateRange] = useState("today");
  const [autoRefresh, setAutoRefresh] = useState(true);

  return (
    <div className="bg-card border border-border p-4">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        {/* Title */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">System Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-1">
            National SMS Platform – Dairy Sector Operations
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap items-center gap-4">
          {/* Date Range Selector */}
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Select range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="7days">Last 7 Days</SelectItem>
                <SelectItem value="30days">Last 30 Days</SelectItem>
                <SelectItem value="custom">Custom Range</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Auto-refresh Toggle */}
          <div className="flex items-center gap-2">
            <Switch
              id="auto-refresh"
              checked={autoRefresh}
              onCheckedChange={setAutoRefresh}
            />
            <Label htmlFor="auto-refresh" className="text-sm">
              Auto-refresh {autoRefresh ? "On" : "Off"}
            </Label>
          </div>

          {/* Refresh Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={onRefresh}
            className="gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>

          {/* Last Updated */}
          <div className="text-xs text-muted-foreground border-l border-border pl-4">
            Last updated:{" "}
            <span className="font-medium">
              {lastUpdated.toLocaleTimeString("en-ET", {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              })}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
