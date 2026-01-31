import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
  Phone,
  Calendar,
  Globe,
  Brain,
  MessageSquare,
  Send,
  Clock,
  Ban,
  AlertOctagon,
  UserPlus,
  ArrowUpRight,
  ArrowDownLeft,
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const mockMessage = {
  id: "INB-2026-005678",
  senderNumber: "+251911234567",
  senderNumberMasked: "+251911***234",
  operator: "Ethio Telecom",
  shortCode: "8080",
  receivedAt: new Date("2026-01-28T10:15:00"),
  messageType: "Keyword",
  readStatus: "Read",
  fullMessage: "HELP I need information about dairy collection schedule for next week. My cooperative ID is DC-4521. Please send me the timing details.",
  characterCount: 142,
  encodingType: "GSM-7",
  detectedLanguage: "English",
  aiAnalysis: {
    classification: "Request",
    sentiment: "Neutral",
    riskScore: 12,
    flaggedKeywords: [],
    recommendedTone: "Polite",
    complianceAlerts: [],
  },
  conversationHistory: [
    {
      direction: "inbound",
      message: "REGISTER DC-4521 farmer name Kebede Alemu",
      timestamp: new Date("2026-01-20T08:30:00"),
    },
    {
      direction: "outbound",
      message: "Welcome to National Dairy SMS Service! Your registration is confirmed. Cooperative ID: DC-4521. Reply HELP for assistance.",
      timestamp: new Date("2026-01-20T08:31:00"),
    },
    {
      direction: "inbound",
      message: "HELP I need information about dairy collection schedule for next week. My cooperative ID is DC-4521. Please send me the timing details.",
      timestamp: new Date("2026-01-28T10:15:00"),
    },
  ],
  suggestedReplies: [
    "Dear farmer, dairy collection for DC-4521 is scheduled for Monday 8AM, Wednesday 8AM, and Friday 8AM at your local collection center.",
    "Thank you for your inquiry. Collection schedule for your cooperative: Mon/Wed/Fri at 8:00 AM. For more details, visit your local center.",
  ],
};

const getClassificationBadge = (classification: string) => {
  const variants: Record<string, { className: string; icon: React.ReactNode }> = {
    Normal: { className: "bg-slate-100 text-slate-700 border-slate-200", icon: <CheckCircle2 className="h-3 w-3" /> },
    Complaint: { className: "bg-amber-100 text-amber-700 border-amber-200", icon: <AlertTriangle className="h-3 w-3" /> },
    Request: { className: "bg-blue-100 text-blue-700 border-blue-200", icon: <MessageSquare className="h-3 w-3" /> },
    "Abuse / Threat": { className: "bg-red-100 text-red-700 border-red-200", icon: <AlertOctagon className="h-3 w-3" /> },
    Spam: { className: "bg-orange-100 text-orange-700 border-orange-200", icon: <AlertCircle className="h-3 w-3" /> },
  };
  const variant = variants[classification] || variants["Normal"];
  return (
    <Badge className={cn("gap-1 font-medium", variant.className)}>
      {variant.icon}
      {classification}
    </Badge>
  );
};

const getSentimentBadge = (sentiment: string) => {
  const variants: Record<string, string> = {
    Positive: "bg-green-100 text-green-700 border-green-200",
    Neutral: "bg-slate-100 text-slate-700 border-slate-200",
    Negative: "bg-red-100 text-red-700 border-red-200",
  };
  return <Badge className={cn("font-medium", variants[sentiment])}>{sentiment}</Badge>;
};

const getRiskColor = (score: number) => {
  if (score <= 30) return "text-green-600";
  if (score <= 60) return "text-amber-600";
  return "text-red-600";
};

const InboxDetail = () => {
  const { id } = useParams();
  const [replyText, setReplyText] = useState("");
  const [selectedSenderId, setSelectedSenderId] = useState("dairy-gov");
  const [selectedSuggestion, setSelectedSuggestion] = useState<number | null>(null);

  const handleSuggestionClick = (index: number) => {
    setSelectedSuggestion(index);
    setReplyText(mockMessage.suggestedReplies[index]);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground transition-colors">Dashboard</Link>
          <span>/</span>
          <span>Messaging</span>
          <span>/</span>
          <Link to="/messaging/inbox" className="hover:text-foreground transition-colors">Inbox</Link>
          <span>/</span>
          <span className="text-foreground font-medium">{id || mockMessage.id}</span>
        </div>

        {/* Header */}
        <div className="flex items-center gap-4">
          <Link to="/messaging/inbox">
            <Button variant="outline" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Message Details</h1>
            <p className="text-sm text-muted-foreground font-mono">{id || mockMessage.id}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Message Summary */}
            <Card>
              <CardHeader className="py-4">
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  Message Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">Message ID</p>
                    <p className="font-mono text-sm font-medium">{mockMessage.id}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">Sender Number</p>
                    <div className="flex items-center gap-1">
                      <Phone className="h-3 w-3 text-muted-foreground" />
                      <p className="font-mono text-sm font-medium">{mockMessage.senderNumberMasked}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">Operator</p>
                    <p className="text-sm font-medium">{mockMessage.operator}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">Short Code</p>
                    <p className="text-sm font-medium">{mockMessage.shortCode}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">Received At</p>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3 text-muted-foreground" />
                      <p className="text-sm font-medium">{format(mockMessage.receivedAt, "MMM d, yyyy HH:mm")}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">Message Type</p>
                    <Badge variant="secondary" className="font-medium">{mockMessage.messageType}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Message Content */}
            <Card>
              <CardHeader className="py-4">
                <CardTitle className="text-base font-semibold">Message Content</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 p-4">
                  <p className="text-sm leading-relaxed">{mockMessage.fullMessage}</p>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-3 bg-muted/30 border">
                    <p className="text-2xl font-bold text-foreground">{mockMessage.characterCount}</p>
                    <p className="text-xs text-muted-foreground">Characters</p>
                  </div>
                  <div className="text-center p-3 bg-muted/30 border">
                    <p className="text-2xl font-bold text-foreground">{mockMessage.encodingType}</p>
                    <p className="text-xs text-muted-foreground">Encoding</p>
                  </div>
                  <div className="text-center p-3 bg-muted/30 border flex flex-col items-center justify-center">
                    <div className="flex items-center gap-1">
                      <Globe className="h-4 w-4 text-muted-foreground" />
                      <p className="text-lg font-bold text-foreground">{mockMessage.detectedLanguage}</p>
                    </div>
                    <p className="text-xs text-muted-foreground">Detected Language</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Conversation History */}
            <Card>
              <CardHeader className="py-4">
                <CardTitle className="text-base font-semibold">Conversation History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockMessage.conversationHistory.map((msg, idx) => (
                    <div
                      key={idx}
                      className={cn(
                        "flex gap-3",
                        msg.direction === "outbound" && "flex-row-reverse"
                      )}
                    >
                      <div
                        className={cn(
                          "w-8 h-8 flex items-center justify-center border",
                          msg.direction === "inbound" 
                            ? "bg-blue-100 text-blue-600" 
                            : "bg-green-100 text-green-600"
                        )}
                      >
                        {msg.direction === "inbound" ? (
                          <ArrowDownLeft className="h-4 w-4" />
                        ) : (
                          <ArrowUpRight className="h-4 w-4" />
                        )}
                      </div>
                      <div
                        className={cn(
                          "flex-1 p-3 border",
                          msg.direction === "inbound" 
                            ? "bg-blue-50 border-blue-200" 
                            : "bg-green-50 border-green-200"
                        )}
                      >
                        <p className="text-sm">{msg.message}</p>
                        <p className="text-xs text-muted-foreground mt-2">
                          {format(msg.timestamp, "MMM d, yyyy HH:mm")}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Response Panel */}
            <Card>
              <CardHeader className="py-4">
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                  <Send className="h-4 w-4" />
                  Response Panel
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* AI Suggestions */}
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">AI-Suggested Replies</p>
                  <div className="space-y-2">
                    {mockMessage.suggestedReplies.map((suggestion, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSuggestionClick(idx)}
                        className={cn(
                          "w-full text-left p-3 border text-sm hover:bg-muted/50 transition-colors",
                          selectedSuggestion === idx && "border-primary bg-primary/5"
                        )}
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Reply Composer */}
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">Compose Reply</p>
                  <Textarea
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Type your reply message..."
                    className="min-h-[100px]"
                  />
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-muted-foreground">
                      {replyText.length} characters | {Math.ceil(replyText.length / 160) || 0} segment(s)
                    </span>
                  </div>
                </div>

                {/* Sender ID Selection */}
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">Sender ID</p>
                    <Select value={selectedSenderId} onValueChange={setSelectedSenderId}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-popover">
                        <SelectItem value="dairy-gov">DAIRY-GOV</SelectItem>
                        <SelectItem value="vet-eth">VET-ETH</SelectItem>
                        <SelectItem value="8080">8080 (Short Code)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-3">
                  <Button className="gap-2">
                    <Send className="h-4 w-4" />
                    Send Now
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <Clock className="h-4 w-4" />
                    Schedule Reply
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* AI Content Analysis */}
            <Card>
              <CardHeader className="py-4">
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                  <Brain className="h-4 w-4" />
                  AI Content Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Classification</span>
                  {getClassificationBadge(mockMessage.aiAnalysis.classification)}
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Sentiment</span>
                  {getSentimentBadge(mockMessage.aiAnalysis.sentiment)}
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Risk Score</span>
                  <span className={cn("text-xl font-bold", getRiskColor(mockMessage.aiAnalysis.riskScore))}>
                    {mockMessage.aiAnalysis.riskScore}/100
                  </span>
                </div>
                <Separator />
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">Flagged Keywords</p>
                  {mockMessage.aiAnalysis.flaggedKeywords.length > 0 ? (
                    <div className="flex flex-wrap gap-1">
                      {mockMessage.aiAnalysis.flaggedKeywords.map((kw, idx) => (
                        <Badge key={idx} variant="destructive" className="text-xs">{kw}</Badge>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-green-600">No flagged keywords</p>
                  )}
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Recommended Tone</span>
                  <Badge variant="secondary">{mockMessage.aiAnalysis.recommendedTone}</Badge>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">Compliance Alerts</p>
                  {mockMessage.aiAnalysis.complianceAlerts.length > 0 ? (
                    <ul className="text-sm space-y-1">
                      {mockMessage.aiAnalysis.complianceAlerts.map((alert, idx) => (
                        <li key={idx} className="text-amber-600">• {alert}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-green-600">No compliance issues</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader className="py-4">
                <CardTitle className="text-base font-semibold">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Ban className="h-4 w-4" />
                  Block Sender
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2">
                  <AlertOctagon className="h-4 w-4" />
                  Escalate to Support
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2">
                  <UserPlus className="h-4 w-4" />
                  Assign to Department
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default InboxDetail;
