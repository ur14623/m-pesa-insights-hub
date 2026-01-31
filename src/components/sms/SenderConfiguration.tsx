import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Signal } from "lucide-react";

interface SenderConfigurationProps {
  senderId: string;
  onSenderIdChange: (value: string) => void;
  language: string;
  onLanguageChange: (value: string) => void;
}

const senderIds = [
  { id: "DAIRY-GOV", type: "Alphanumeric", route: "Primary" },
  { id: "8008", type: "Short Code", route: "Primary" },
  { id: "+251911000001", type: "Long Number", route: "Fallback" },
];

const languages = [
  { id: "auto", label: "Auto-detect" },
  { id: "en", label: "English" },
  { id: "am", label: "አማርኛ (Amharic)" },
  { id: "om", label: "Afaan Oromo" },
  { id: "ti", label: "ትግርኛ (Tigrinya)" },
];

export function SenderConfiguration({
  senderId,
  onSenderIdChange,
  language,
  onLanguageChange,
}: SenderConfigurationProps) {
  const selectedSender = senderIds.find((s) => s.id === senderId);

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-foreground flex items-center gap-2">
        <Signal className="h-4 w-4" />
        Sender Configuration
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Sender ID */}
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">
            Sender ID <span className="text-destructive">*</span>
          </label>
          <Select value={senderId} onValueChange={onSenderIdChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select sender ID" />
            </SelectTrigger>
            <SelectContent>
              {senderIds.map((sender) => (
                <SelectItem key={sender.id} value={sender.id}>
                  <div className="flex items-center gap-2">
                    <span>{sender.id}</span>
                    <Badge variant="outline" className="text-xs">
                      {sender.type}
                    </Badge>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {selectedSender && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>Route:</span>
              <Badge
                variant={selectedSender.route === "Primary" ? "default" : "secondary"}
                className="text-xs"
              >
                {selectedSender.route}
              </Badge>
            </div>
          )}
        </div>

        {/* Language */}
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">
            Message Language
          </label>
          <Select value={language} onValueChange={onLanguageChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              {languages.map((lang) => (
                <SelectItem key={lang.id} value={lang.id}>
                  {lang.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
