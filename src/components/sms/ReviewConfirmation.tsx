import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Send,
  Clock,
  Save,
  X,
  CheckCircle,
  AlertTriangle,
  MessageSquare,
  Users,
  DollarSign,
  Calendar,
} from "lucide-react";
import { format } from "date-fns";

type DeliveryMode = "single" | "bulk" | "scheduled";
type SendOption = "now" | "scheduled";
type AIStatus = "approved" | "warning" | "blocked" | "pending";

interface ReviewConfirmationProps {
  deliveryMode: DeliveryMode;
  senderId: string;
  message: string;
  recipientCount: number;
  segmentCount: number;
  estimatedCost: number;
  sendOption: SendOption;
  scheduledDate?: Date;
  scheduledTime?: string;
  aiStatus: AIStatus;
  onSend: () => void;
  onSaveDraft: () => void;
  onCancel: () => void;
  isSubmitting?: boolean;
}

export function ReviewConfirmation({
  deliveryMode,
  senderId,
  message,
  recipientCount,
  segmentCount,
  estimatedCost,
  sendOption,
  scheduledDate,
  scheduledTime,
  aiStatus,
  onSend,
  onSaveDraft,
  onCancel,
  isSubmitting = false,
}: ReviewConfirmationProps) {
  const getDeliveryModeLabel = (mode: DeliveryMode) => {
    switch (mode) {
      case "single":
        return "Single SMS";
      case "bulk":
        return "Bulk SMS";
      case "scheduled":
        return "Scheduled SMS";
    }
  };

  const getAIStatusBadge = (status: AIStatus) => {
    switch (status) {
      case "approved":
        return (
          <Badge className="bg-success text-success-foreground">
            <CheckCircle className="h-3 w-3 mr-1" /> Approved
          </Badge>
        );
      case "warning":
        return (
          <Badge className="bg-warning text-warning-foreground">
            <AlertTriangle className="h-3 w-3 mr-1" /> Warning
          </Badge>
        );
      case "blocked":
        return (
          <Badge variant="destructive">
            <X className="h-3 w-3 mr-1" /> Blocked
          </Badge>
        );
      default:
        return <Badge variant="secondary">Pending</Badge>;
    }
  };

  const canSend = aiStatus !== "blocked" && recipientCount > 0 && message.length > 0;

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-foreground flex items-center gap-2">
        <CheckCircle className="h-4 w-4" />
        Review & Confirm
      </h3>

      {/* Summary Panel */}
      <div className="border bg-muted/30">
        <div className="p-4 space-y-4">
          {/* Delivery Mode & Sender */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-xs text-muted-foreground mb-1">Delivery Mode</div>
              <Badge variant="outline">{getDeliveryModeLabel(deliveryMode)}</Badge>
            </div>
            <div>
              <div className="text-xs text-muted-foreground mb-1">Sender ID</div>
              <span className="font-mono text-sm">{senderId || "Not selected"}</span>
            </div>
          </div>

          <Separator />

          {/* Message Preview */}
          <div>
            <div className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
              <MessageSquare className="h-3 w-3" />
              Message Preview
            </div>
            <div className="p-3 bg-background border text-sm max-h-[100px] overflow-y-auto">
              {message || <span className="text-muted-foreground italic">No message entered</span>}
            </div>
          </div>

          <Separator />

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-2 bg-background border">
              <Users className="h-4 w-4 mx-auto mb-1 text-muted-foreground" />
              <div className="text-lg font-bold">{recipientCount.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">Recipients</div>
            </div>
            <div className="text-center p-2 bg-background border">
              <MessageSquare className="h-4 w-4 mx-auto mb-1 text-muted-foreground" />
              <div className="text-lg font-bold">{segmentCount}</div>
              <div className="text-xs text-muted-foreground">Segments</div>
            </div>
            <div className="text-center p-2 bg-background border">
              <DollarSign className="h-4 w-4 mx-auto mb-1 text-muted-foreground" />
              <div className="text-lg font-bold text-primary">{estimatedCost.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">Est. Cost (ETB)</div>
            </div>
            <div className="text-center p-2 bg-background border">
              <CheckCircle className="h-4 w-4 mx-auto mb-1 text-muted-foreground" />
              <div className="mt-1">{getAIStatusBadge(aiStatus)}</div>
              <div className="text-xs text-muted-foreground mt-1">AI Review</div>
            </div>
          </div>

          {/* Schedule Info */}
          {(sendOption === "scheduled" || deliveryMode === "scheduled") && scheduledDate && (
            <>
              <Separator />
              <div className="flex items-center gap-2 p-2 bg-primary/5 border border-primary/20">
                <Calendar className="h-4 w-4 text-primary" />
                <span className="text-sm">
                  Scheduled for:{" "}
                  <span className="font-medium">
                    {format(scheduledDate, "EEEE, MMMM d, yyyy")} at {scheduledTime}
                  </span>
                </span>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3">
        <Button
          variant="outline"
          onClick={onSaveDraft}
          disabled={isSubmitting}
        >
          <Save className="h-4 w-4 mr-2" />
          Save as Draft
        </Button>
        
        <Button
          variant="outline"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          <X className="h-4 w-4 mr-2" />
          Cancel
        </Button>

        <div className="flex-1" />

        {sendOption === "scheduled" || deliveryMode === "scheduled" ? (
          <Button
            onClick={onSend}
            disabled={!canSend || isSubmitting}
            className="min-w-[150px]"
          >
            {isSubmitting ? (
              <>Scheduling...</>
            ) : (
              <>
                <Clock className="h-4 w-4 mr-2" />
                Schedule SMS
              </>
            )}
          </Button>
        ) : (
          <Button
            onClick={onSend}
            disabled={!canSend || isSubmitting}
            className="min-w-[150px]"
          >
            {isSubmitting ? (
              <>Sending...</>
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                Send Now
              </>
            )}
          </Button>
        )}
      </div>

      {/* Validation Warnings */}
      {!canSend && (
        <div className="p-3 border border-destructive/30 bg-destructive/5 text-sm">
          <div className="font-medium text-destructive mb-1">Cannot send message:</div>
          <ul className="list-disc list-inside text-muted-foreground space-y-1">
            {message.length === 0 && <li>Message content is empty</li>}
            {recipientCount === 0 && <li>No recipients selected</li>}
            {aiStatus === "blocked" && <li>Message blocked by AI content review</li>}
          </ul>
        </div>
      )}
    </div>
  );
}
