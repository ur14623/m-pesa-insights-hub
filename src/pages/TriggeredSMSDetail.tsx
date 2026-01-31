import { Link, useParams } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  ArrowLeft,
  CheckCircle2,
  XCircle,
  Clock,
  AlertTriangle,
  ChevronDown,
  User,
  Calendar,
  MessageSquare,
  Smartphone,
  Globe,
  Brain,
  Route,
  Users,
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useState } from "react";

const mockMessage = {
  id: "MSG-2026-001234",
  createdBy: "Abebe Kebede",
  createdAt: new Date("2026-01-28T09:25:00"),
  senderId: "DAIRY-GOV",
  language: "English",
  deliveryMode: "Bulk",
  status: "Delivered",
  originalMessage: "Dear farmer, your dairy collection payment of ETB 2,500 has been processed successfully. Your next collection is scheduled for Monday. Thank you for your contribution to Ethiopia's dairy sector.",
  finalMessage: "Dear farmer, your dairy collection payment of ETB 2,500 has been processed successfully. Your next collection is scheduled for Monday. Thank you for your contribution to Ethiopia's dairy sector.",
  characterCount: 215,
  segmentCount: 2,
  encodingType: "GSM-7",
  aiValidation: {
    result: "Approved",
    issues: [],
    recommendations: [],
    userOverride: false,
    timestamp: new Date("2026-01-28T09:26:00"),
  },
  recipients: {
    total: 1250,
    delivered: 1230,
    failed: 15,
    pending: 5,
  },
  recipientDetails: [
    { number: "+251911***234", operator: "Ethio Telecom", status: "Delivered", timestamp: new Date("2026-01-28T09:30:12"), failureReason: null },
    { number: "+251922***567", operator: "Safaricom Ethiopia", status: "Delivered", timestamp: new Date("2026-01-28T09:30:15"), failureReason: null },
    { number: "+251933***890", operator: "Ethio Telecom", status: "Failed", timestamp: new Date("2026-01-28T09:30:18"), failureReason: "Number not reachable" },
    { number: "+251944***123", operator: "Ethio Telecom", status: "Delivered", timestamp: new Date("2026-01-28T09:30:22"), failureReason: null },
    { number: "+251955***456", operator: "Safaricom Ethiopia", status: "Pending", timestamp: null, failureReason: null },
  ],
  routing: {
    primaryOperator: "Ethio Telecom (SMPP Gateway)",
    fallbackOperator: "Safaricom Ethiopia (HTTP API)",
    fallbackUsed: true,
    averageLatency: "1.2s",
  },
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "Delivered":
      return <CheckCircle2 className="h-5 w-5 text-green-600" />;
    case "Failed":
      return <XCircle className="h-5 w-5 text-red-600" />;
    case "Pending":
      return <Clock className="h-5 w-5 text-amber-600" />;
    default:
      return <Clock className="h-5 w-5 text-muted-foreground" />;
  }
};

const getAIResultBadge = (result: string) => {
  const variants: Record<string, { className: string; icon: React.ReactNode }> = {
    Approved: { className: "bg-green-100 text-green-800 border-green-200", icon: <CheckCircle2 className="h-3 w-3" /> },
    Warning: { className: "bg-amber-100 text-amber-800 border-amber-200", icon: <AlertTriangle className="h-3 w-3" /> },
    Blocked: { className: "bg-red-100 text-red-800 border-red-200", icon: <XCircle className="h-3 w-3" /> },
  };
  const variant = variants[result] || variants["Approved"];
  return (
    <Badge className={cn("gap-1 font-medium", variant.className)}>
      {variant.icon}
      {result}
    </Badge>
  );
};

const TriggeredSMSDetail = () => {
  const { id } = useParams();
  const [recipientsExpanded, setRecipientsExpanded] = useState(false);

  const deliveredPercent = (mockMessage.recipients.delivered / mockMessage.recipients.total) * 100;
  const failedPercent = (mockMessage.recipients.failed / mockMessage.recipients.total) * 100;
  const pendingPercent = (mockMessage.recipients.pending / mockMessage.recipients.total) * 100;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground transition-colors">Dashboard</Link>
          <span>/</span>
          <span>Messaging</span>
          <span>/</span>
          <Link to="/messaging/triggered" className="hover:text-foreground transition-colors">Triggered SMS</Link>
          <span>/</span>
          <span className="text-foreground font-medium">{id || mockMessage.id}</span>
        </div>

        {/* Header */}
        <div className="flex items-center gap-4">
          <Link to="/messaging/triggered">
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
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">Created By</p>
                    <div className="flex items-center gap-1">
                      <User className="h-3 w-3 text-muted-foreground" />
                      <p className="text-sm font-medium">{mockMessage.createdBy}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">Created Date</p>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3 text-muted-foreground" />
                      <p className="text-sm font-medium">{format(mockMessage.createdAt, "MMM d, yyyy HH:mm")}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">Sender ID</p>
                    <p className="text-sm font-medium">{mockMessage.senderId}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">Language</p>
                    <div className="flex items-center gap-1">
                      <Globe className="h-3 w-3 text-muted-foreground" />
                      <p className="text-sm font-medium">{mockMessage.language}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">Delivery Mode</p>
                    <Badge variant="secondary" className="font-medium">{mockMessage.deliveryMode}</Badge>
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
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">Original Message</p>
                  <div className="bg-muted/50 p-4 border text-sm">
                    {mockMessage.originalMessage}
                  </div>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">Final Sent Message</p>
                  <div className="bg-green-50 border border-green-200 p-4 text-sm">
                    {mockMessage.finalMessage}
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 pt-2">
                  <div className="text-center p-3 bg-muted/30 border">
                    <p className="text-2xl font-bold text-foreground">{mockMessage.characterCount}</p>
                    <p className="text-xs text-muted-foreground">Characters</p>
                  </div>
                  <div className="text-center p-3 bg-muted/30 border">
                    <p className="text-2xl font-bold text-foreground">{mockMessage.segmentCount}</p>
                    <p className="text-xs text-muted-foreground">SMS Segments</p>
                  </div>
                  <div className="text-center p-3 bg-muted/30 border">
                    <p className="text-2xl font-bold text-foreground">{mockMessage.encodingType}</p>
                    <p className="text-xs text-muted-foreground">Encoding</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recipient & Delivery Breakdown */}
            <Card>
              <CardHeader className="py-4">
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Recipient & Delivery Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-4 gap-4">
                  <div className="text-center p-4 border bg-muted/20">
                    <p className="text-3xl font-bold text-foreground">{mockMessage.recipients.total.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">Total Recipients</p>
                  </div>
                  <div className="text-center p-4 border bg-green-50">
                    <p className="text-3xl font-bold text-green-600">{mockMessage.recipients.delivered.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">Delivered</p>
                  </div>
                  <div className="text-center p-4 border bg-red-50">
                    <p className="text-3xl font-bold text-red-600">{mockMessage.recipients.failed}</p>
                    <p className="text-xs text-muted-foreground">Failed</p>
                  </div>
                  <div className="text-center p-4 border bg-amber-50">
                    <p className="text-3xl font-bold text-amber-600">{mockMessage.recipients.pending}</p>
                    <p className="text-xs text-muted-foreground">Pending</p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="h-3 w-full flex overflow-hidden border">
                  <div className="bg-green-500 h-full" style={{ width: `${deliveredPercent}%` }} />
                  <div className="bg-red-500 h-full" style={{ width: `${failedPercent}%` }} />
                  <div className="bg-amber-500 h-full" style={{ width: `${pendingPercent}%` }} />
                </div>

                <Collapsible open={recipientsExpanded} onOpenChange={setRecipientsExpanded}>
                  <CollapsibleTrigger asChild>
                    <Button variant="outline" className="w-full justify-between">
                      View Recipient Details
                      <ChevronDown className={cn("h-4 w-4 transition-transform", recipientsExpanded && "rotate-180")} />
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="pt-4">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-muted/50">
                          <TableHead className="font-semibold">Recipient Number</TableHead>
                          <TableHead className="font-semibold">Operator</TableHead>
                          <TableHead className="font-semibold">Status</TableHead>
                          <TableHead className="font-semibold">Timestamp</TableHead>
                          <TableHead className="font-semibold">Failure Reason</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {mockMessage.recipientDetails.map((recipient, idx) => (
                          <TableRow key={idx}>
                            <TableCell className="font-mono text-sm">{recipient.number}</TableCell>
                            <TableCell className="text-sm">{recipient.operator}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                {getStatusIcon(recipient.status)}
                                <span className="text-sm">{recipient.status}</span>
                              </div>
                            </TableCell>
                            <TableCell className="text-sm">
                              {recipient.timestamp ? format(recipient.timestamp, "HH:mm:ss") : "—"}
                            </TableCell>
                            <TableCell className="text-sm text-red-600">
                              {recipient.failureReason || "—"}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CollapsibleContent>
                </Collapsible>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Current Status */}
            <Card>
              <CardHeader className="py-4">
                <CardTitle className="text-base font-semibold">Current Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-8 w-8 text-green-600" />
                  <div>
                    <p className="text-xl font-bold text-green-600">{mockMessage.status}</p>
                    <p className="text-sm text-muted-foreground">
                      {((mockMessage.recipients.delivered / mockMessage.recipients.total) * 100).toFixed(1)}% success rate
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* AI Content Review */}
            <Card>
              <CardHeader className="py-4">
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                  <Brain className="h-4 w-4" />
                  AI Content Review
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Validation Result</span>
                  {getAIResultBadge(mockMessage.aiValidation.result)}
                </div>
                <Separator />
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">Identified Issues</p>
                  {mockMessage.aiValidation.issues.length > 0 ? (
                    <ul className="text-sm space-y-1">
                      {mockMessage.aiValidation.issues.map((issue, idx) => (
                        <li key={idx} className="text-amber-600">• {issue}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-green-600">No issues detected</p>
                  )}
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">Recommendations</p>
                  {mockMessage.aiValidation.recommendations.length > 0 ? (
                    <ul className="text-sm space-y-1">
                      {mockMessage.aiValidation.recommendations.map((rec, idx) => (
                        <li key={idx}>• {rec}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-muted-foreground">None</p>
                  )}
                </div>
                <Separator />
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">User Override</span>
                  <span className="font-medium">{mockMessage.aiValidation.userOverride ? "Yes" : "No"}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Review Time</span>
                  <span className="font-medium">{format(mockMessage.aiValidation.timestamp, "HH:mm:ss")}</span>
                </div>
              </CardContent>
            </Card>

            {/* Operator Routing */}
            <Card>
              <CardHeader className="py-4">
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                  <Route className="h-4 w-4" />
                  Operator Routing
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">Primary Route</p>
                  <p className="text-sm font-medium">{mockMessage.routing.primaryOperator}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">Fallback Route</p>
                  <p className="text-sm font-medium">{mockMessage.routing.fallbackOperator}</p>
                </div>
                <Separator />
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Fallback Used</span>
                  <Badge variant={mockMessage.routing.fallbackUsed ? "destructive" : "secondary"}>
                    {mockMessage.routing.fallbackUsed ? "Yes" : "No"}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Avg. Latency</span>
                  <span className="font-medium">{mockMessage.routing.averageLatency}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TriggeredSMSDetail;
