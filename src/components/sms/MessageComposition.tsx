import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, FileText, Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface MessageCompositionProps {
  message: string;
  onMessageChange: (value: string) => void;
  template: string;
  onTemplateChange: (value: string) => void;
}

const templates = [
  { id: "none", name: "No Template", content: "" },
  { id: "milk-collection", name: "Milk Collection Reminder", content: "Dear Farmer, milk collection scheduled for tomorrow at {time}. Please prepare {quantity}L. Contact your cooperative for questions." },
  { id: "price-update", name: "Price Update", content: "Milk price update: Current rate is {price} ETB/L effective {date}. Thank you for your continued partnership." },
  { id: "health-alert", name: "Animal Health Alert", content: "HEALTH ALERT: {disease} detected in {region}. Please monitor your cattle and report symptoms to local vet. Vaccination available at {location}." },
  { id: "training", name: "Training Invitation", content: "You are invited to a training on {topic} at {location} on {date}. Registration required. Reply YES to confirm." },
  { id: "payment", name: "Payment Notification", content: "Payment of {amount} ETB has been processed for {period}. Check your account. For issues, contact support." },
];

export function MessageComposition({
  message,
  onMessageChange,
  template,
  onTemplateChange,
}: MessageCompositionProps) {
  const handleTemplateSelect = (templateId: string) => {
    onTemplateChange(templateId);
    const selectedTemplate = templates.find((t) => t.id === templateId);
    if (selectedTemplate && selectedTemplate.content) {
      onMessageChange(selectedTemplate.content);
    }
  };

  // Character and segment calculations
  const charCount = message.length;
  const isUnicode = /[^\x00-\x7F]/.test(message); // Detect non-ASCII (Amharic, etc.)
  const maxCharsPerSegment = isUnicode ? 70 : 160;
  const segmentCount = charCount === 0 ? 0 : Math.ceil(charCount / (charCount <= maxCharsPerSegment ? maxCharsPerSegment : (isUnicode ? 67 : 153)));
  const encoding = isUnicode ? "Unicode (UCS-2)" : "GSM-7";

  // Character limit warning
  const charLimitWarning = charCount > (isUnicode ? 70 * 3 : 160 * 3);

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-foreground flex items-center gap-2">
        <MessageSquare className="h-4 w-4" />
        Message Composition
      </h3>

      {/* Template Selection */}
      <div className="space-y-2">
        <label className="text-sm text-muted-foreground flex items-center gap-2">
          <FileText className="h-4 w-4" />
          Message Template
        </label>
        <Select value={template} onValueChange={handleTemplateSelect}>
          <SelectTrigger>
            <SelectValue placeholder="Select a template (optional)" />
          </SelectTrigger>
          <SelectContent>
            {templates.map((t) => (
              <SelectItem key={t.id} value={t.id}>
                {t.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Message Input */}
      <div className="space-y-2">
        <label className="text-sm text-muted-foreground">
          Message Content <span className="text-destructive">*</span>
        </label>
        <Textarea
          placeholder="Type your message here...&#10;&#10;Supports English, አማርኛ (Amharic), Afaan Oromo, and ትግርኛ (Tigrinya)"
          value={message}
          onChange={(e) => onMessageChange(e.target.value)}
          className={`min-h-[150px] text-base ${charLimitWarning ? 'border-warning' : ''}`}
        />

        {/* Message Stats */}
        <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
          <div className="flex flex-wrap items-center gap-3">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className={`flex items-center gap-1 ${charLimitWarning ? 'text-warning' : 'text-muted-foreground'}`}>
                    <span className="font-mono">{charCount}</span>
                    <span>characters</span>
                    <Info className="h-3 w-3" />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{isUnicode ? '70' : '160'} chars per segment ({encoding})</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <div className="flex items-center gap-1 text-muted-foreground">
              <span className="font-mono font-medium">{segmentCount}</span>
              <span>segment{segmentCount !== 1 ? 's' : ''}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Badge variant={isUnicode ? "secondary" : "outline"}>
              {encoding}
            </Badge>
            {isUnicode && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Badge variant="outline" className="text-primary border-primary">
                      Ge'ez Script
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Message contains Ethiopic characters (Unicode)</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
        </div>

        {charLimitWarning && (
          <div className="text-sm text-warning flex items-center gap-1">
            <Info className="h-4 w-4" />
            Long messages may increase delivery cost ({segmentCount} segments)
          </div>
        )}
      </div>

      {/* Template Variables Info */}
      {template && template !== "none" && (
        <div className="p-3 bg-muted/50 border text-sm">
          <div className="font-medium mb-1">Template Variables</div>
          <div className="text-muted-foreground">
            Replace placeholders like <code className="bg-muted px-1">{'{time}'}</code>, <code className="bg-muted px-1">{'{date}'}</code>, <code className="bg-muted px-1">{'{amount}'}</code> with actual values before sending.
          </div>
        </div>
      )}
    </div>
  );
}
