import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import {
  Brain,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Loader2,
  RefreshCw,
  Edit,
  Clock,
} from "lucide-react";

interface AIContentReviewProps {
  message: string;
  onApplySuggestion: (suggestion: string) => void;
}

type AIStatus = "pending" | "scanning" | "approved" | "warning" | "blocked";

interface AIReviewResult {
  status: AIStatus;
  issues: string[];
  suggestions: string[];
  highlightedTerms: string[];
  suggestedRevision: string;
  timestamp: Date;
}

export function AIContentReview({ message, onApplySuggestion }: AIContentReviewProps) {
  const [reviewResult, setReviewResult] = useState<AIReviewResult | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [overrideChecked, setOverrideChecked] = useState(false);

  // Simulate AI review when message changes
  useEffect(() => {
    if (message.length > 10) {
      const timer = setTimeout(() => {
        runAIReview();
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setReviewResult(null);
    }
  }, [message]);

  const runAIReview = () => {
    setIsScanning(true);
    setOverrideChecked(false);

    // Simulate AI processing
    setTimeout(() => {
      const lowerMessage = message.toLowerCase();
      
      let result: AIReviewResult = {
        status: "approved",
        issues: [],
        suggestions: [],
        highlightedTerms: [],
        suggestedRevision: "",
        timestamp: new Date(),
      };

      // Check for various issues
      if (lowerMessage.includes("urgent") || lowerMessage.includes("immediately")) {
        result.status = "warning";
        result.issues.push("Message contains urgency language that may cause alarm");
        result.suggestions.push("Consider using gentler timing language");
        result.highlightedTerms.push("urgent", "immediately");
      }

      if (lowerMessage.includes("penalty") || lowerMessage.includes("fine")) {
        result.status = "warning";
        result.issues.push("Message mentions penalties - ensure compliance with regulations");
        result.highlightedTerms.push("penalty", "fine");
      }

      if (lowerMessage.includes("scam") || lowerMessage.includes("fraud") || lowerMessage.includes("fake")) {
        result.status = "blocked";
        result.issues.push("Message contains potentially harmful content");
        result.suggestions.push("Remove references to scams or fraud unless official warning");
        result.highlightedTerms.push("scam", "fraud", "fake");
      }

      if (message.length > 300) {
        result.suggestions.push("Consider shortening message for better readability and lower cost");
      }

      if (result.status === "warning" || result.status === "blocked") {
        result.suggestedRevision = message
          .replace(/urgent/gi, "timely")
          .replace(/immediately/gi, "soon")
          .replace(/penalty/gi, "adjustment")
          .replace(/fine/gi, "fee");
      }

      setReviewResult(result);
      setIsScanning(false);
    }, 1500);
  };

  const getStatusConfig = (status: AIStatus) => {
    switch (status) {
      case "approved":
        return {
          icon: CheckCircle,
          color: "text-success",
          bgColor: "bg-success/10",
          borderColor: "border-success/30",
          label: "Approved",
        };
      case "warning":
        return {
          icon: AlertTriangle,
          color: "text-warning",
          bgColor: "bg-warning/10",
          borderColor: "border-warning/30",
          label: "Warning",
        };
      case "blocked":
        return {
          icon: XCircle,
          color: "text-destructive",
          bgColor: "bg-destructive/10",
          borderColor: "border-destructive/30",
          label: "Blocked",
        };
      default:
        return {
          icon: Loader2,
          color: "text-muted-foreground",
          bgColor: "bg-muted/50",
          borderColor: "border-border",
          label: "Pending",
        };
    }
  };

  if (!message || message.length < 10) {
    return (
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-foreground flex items-center gap-2">
          <Brain className="h-4 w-4" />
          AI Content Review
        </h3>
        <div className="p-4 border bg-muted/30 text-center text-sm text-muted-foreground">
          Enter at least 10 characters to enable AI content review
        </div>
      </div>
    );
  }

  if (isScanning) {
    return (
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-foreground flex items-center gap-2">
          <Brain className="h-4 w-4" />
          AI Content Review
        </h3>
        <div className="p-6 border bg-muted/30 text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary mb-2" />
          <div className="text-sm text-muted-foreground">Scanning message content...</div>
        </div>
      </div>
    );
  }

  if (!reviewResult) return null;

  const statusConfig = getStatusConfig(reviewResult.status);
  const StatusIcon = statusConfig.icon;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-foreground flex items-center gap-2">
          <Brain className="h-4 w-4" />
          AI Content Review
        </h3>
        <Button variant="ghost" size="sm" onClick={runAIReview}>
          <RefreshCw className="h-4 w-4 mr-1" />
          Re-scan
        </Button>
      </div>

      {/* Status Banner */}
      <div className={`p-4 border ${statusConfig.bgColor} ${statusConfig.borderColor}`}>
        <div className="flex items-center gap-3">
          <StatusIcon className={`h-6 w-6 ${statusConfig.color}`} />
          <div className="flex-1">
            <div className={`font-medium ${statusConfig.color}`}>
              AI Validation: {statusConfig.label}
            </div>
            <div className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
              <Clock className="h-3 w-3" />
              Reviewed at {reviewResult.timestamp.toLocaleTimeString()}
            </div>
          </div>
          <Badge variant="outline" className={statusConfig.color}>
            {statusConfig.label}
          </Badge>
        </div>
      </div>

      {/* Issues */}
      {reviewResult.issues.length > 0 && (
        <div className="space-y-2">
          <div className="text-sm font-medium">Identified Issues</div>
          <ul className="space-y-1">
            {reviewResult.issues.map((issue, idx) => (
              <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-warning shrink-0 mt-0.5" />
                {issue}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Highlighted Terms */}
      {reviewResult.highlightedTerms.length > 0 && (
        <div className="space-y-2">
          <div className="text-sm font-medium">Flagged Terms</div>
          <div className="flex flex-wrap gap-2">
            {reviewResult.highlightedTerms.map((term, idx) => (
              <Badge key={idx} variant="destructive" className="font-mono">
                {term}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Suggestions */}
      {reviewResult.suggestions.length > 0 && (
        <div className="space-y-2">
          <div className="text-sm font-medium">Recommendations</div>
          <ul className="space-y-1">
            {reviewResult.suggestions.map((suggestion, idx) => (
              <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                <Edit className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                {suggestion}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Suggested Revision */}
      {reviewResult.suggestedRevision && (
        <div className="space-y-2">
          <div className="text-sm font-medium">Suggested Revision</div>
          <div className="p-3 border bg-muted/30 text-sm">
            {reviewResult.suggestedRevision}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onApplySuggestion(reviewResult.suggestedRevision)}
          >
            <CheckCircle className="h-4 w-4 mr-1" />
            Apply Suggestion
          </Button>
        </div>
      )}

      {/* Override Option (Role-based) */}
      {(reviewResult.status === "warning" || reviewResult.status === "blocked") && (
        <div className="p-3 border border-warning/30 bg-warning/5">
          <div className="flex items-start gap-3">
            <Checkbox
              id="override"
              checked={overrideChecked}
              onCheckedChange={(checked) => setOverrideChecked(checked === true)}
            />
            <div>
              <label htmlFor="override" className="text-sm font-medium cursor-pointer">
                Override AI recommendation (Admin only)
              </label>
              <div className="text-xs text-muted-foreground mt-1">
                I confirm this message complies with all policies and regulations.
                This action will be logged for audit purposes.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
