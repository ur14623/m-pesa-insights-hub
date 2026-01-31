import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Clock, Globe, Send, Repeat } from "lucide-react";

type DeliveryMode = "single" | "bulk" | "scheduled";
type SendOption = "now" | "scheduled";

interface SchedulingSectionProps {
  deliveryMode: DeliveryMode;
  sendOption: SendOption;
  onSendOptionChange: (option: SendOption) => void;
  scheduledDate: Date | undefined;
  onScheduledDateChange: (date: Date | undefined) => void;
  scheduledTime: string;
  onScheduledTimeChange: (time: string) => void;
}

const timeSlots = Array.from({ length: 48 }, (_, i) => {
  const hour = Math.floor(i / 2);
  const minute = i % 2 === 0 ? "00" : "30";
  const ampm = hour >= 12 ? "PM" : "AM";
  const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
  return {
    value: `${hour.toString().padStart(2, "0")}:${minute}`,
    label: `${displayHour}:${minute} ${ampm}`,
  };
});

export function SchedulingSection({
  deliveryMode,
  sendOption,
  onSendOptionChange,
  scheduledDate,
  onScheduledDateChange,
  scheduledTime,
  onScheduledTimeChange,
}: SchedulingSectionProps) {
  // If delivery mode is scheduled, force scheduled option
  const effectiveSendOption = deliveryMode === "scheduled" ? "scheduled" : sendOption;

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-foreground flex items-center gap-2">
        <Clock className="h-4 w-4" />
        Delivery Schedule
      </h3>

      {/* Send Option Toggle */}
      {deliveryMode !== "scheduled" && (
        <div className="flex gap-2">
          <Button
            type="button"
            variant={effectiveSendOption === "now" ? "default" : "outline"}
            onClick={() => onSendOptionChange("now")}
            className="flex-1"
          >
            <Send className="h-4 w-4 mr-2" />
            Send Immediately
          </Button>
          <Button
            type="button"
            variant={effectiveSendOption === "scheduled" ? "default" : "outline"}
            onClick={() => onSendOptionChange("scheduled")}
            className="flex-1"
          >
            <CalendarIcon className="h-4 w-4 mr-2" />
            Schedule for Later
          </Button>
        </div>
      )}

      {/* Scheduling Fields */}
      {effectiveSendOption === "scheduled" && (
        <div className="space-y-4 p-4 border bg-muted/30">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Date Picker */}
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">
                Date <span className="text-destructive">*</span>
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !scheduledDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {scheduledDate ? format(scheduledDate, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={scheduledDate}
                    onSelect={onScheduledDateChange}
                    disabled={(date) => date < new Date()}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Time Picker */}
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">
                Time <span className="text-destructive">*</span>
              </label>
              <Select value={scheduledTime} onValueChange={onScheduledTimeChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent className="max-h-[200px]">
                  {timeSlots.map((slot) => (
                    <SelectItem key={slot.value} value={slot.value}>
                      {slot.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Time Zone */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Globe className="h-4 w-4" />
            <span>Time Zone:</span>
            <Badge variant="outline">East Africa Time (EAT, UTC+3)</Badge>
          </div>

          {/* Recurring Option (Future-ready) */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground opacity-50">
            <Repeat className="h-4 w-4" />
            <span>Recurring schedule</span>
            <Badge variant="secondary">Coming Soon</Badge>
          </div>

          {/* Scheduled Summary */}
          {scheduledDate && scheduledTime && (
            <div className="p-3 bg-primary/5 border border-primary/20">
              <div className="text-sm">
                <span className="text-muted-foreground">Scheduled for: </span>
                <span className="font-medium text-primary">
                  {format(scheduledDate, "EEEE, MMMM d, yyyy")} at{" "}
                  {timeSlots.find((t) => t.value === scheduledTime)?.label || scheduledTime}
                </span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
