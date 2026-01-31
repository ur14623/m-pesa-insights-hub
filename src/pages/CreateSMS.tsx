import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { MessageTypeSelector } from "@/components/sms/MessageTypeSelector";
import { SenderConfiguration } from "@/components/sms/SenderConfiguration";
import { RecipientSelection } from "@/components/sms/RecipientSelection";
import { MessageComposition } from "@/components/sms/MessageComposition";
import { AIContentReview } from "@/components/sms/AIContentReview";
import { SchedulingSection } from "@/components/sms/SchedulingSection";
import { DeliveryControls } from "@/components/sms/DeliveryControls";
import { ReviewConfirmation } from "@/components/sms/ReviewConfirmation";
import { HelpCircle, Coins } from "lucide-react";

type DeliveryMode = "single" | "bulk" | "scheduled";
type SendOption = "now" | "scheduled";
type AIStatus = "approved" | "warning" | "blocked" | "pending";

export default function CreateSMS() {
  const navigate = useNavigate();
  const { toast } = useToast();

  // Form State
  const [deliveryMode, setDeliveryMode] = useState<DeliveryMode>("single");
  const [senderId, setSenderId] = useState("DAIRY-GOV");
  const [language, setLanguage] = useState("auto");
  const [manualNumbers, setManualNumbers] = useState("");
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const [template, setTemplate] = useState("none");
  const [sendOption, setSendOption] = useState<SendOption>("now");
  const [scheduledDate, setScheduledDate] = useState<Date | undefined>();
  const [scheduledTime, setScheduledTime] = useState("09:00");
  const [throttling, setThrottling] = useState("auto");
  const [routing, setRouting] = useState("auto");
  const [confirmationEnabled, setConfirmationEnabled] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Derived state
  const [aiStatus, setAIStatus] = useState<AIStatus>("pending");

  // Calculate recipient count
  const parseManualNumbers = () => {
    const numbers = manualNumbers
      .split(/[,\n]/)
      .map((n) => n.trim())
      .filter((n) => n.length > 0);
    const valid = numbers.filter((n) => /^\+?[0-9]{10,13}$/.test(n));
    return [...new Set(valid)].length;
  };

  const contactGroups = [
    { id: "all", count: 12450 },
    { id: "oromia", count: 4230 },
    { id: "amhara", count: 3180 },
    { id: "snnpr", count: 2840 },
    { id: "tigray", count: 1200 },
    { id: "large-farms", count: 890 },
    { id: "cooperatives", count: 456 },
  ];

  const groupRecipientCount = selectedGroups.reduce((acc, groupId) => {
    const group = contactGroups.find((g) => g.id === groupId);
    return acc + (group?.count || 0);
  }, 0);

  const recipientCount = parseManualNumbers() + groupRecipientCount;

  // Calculate segments
  const isUnicode = /[^\x00-\x7F]/.test(message);
  const maxCharsPerSegment = isUnicode ? 70 : 160;
  const segmentCount = message.length === 0 ? 1 : Math.ceil(message.length / (message.length <= maxCharsPerSegment ? maxCharsPerSegment : (isUnicode ? 67 : 153)));

  // Cost estimation
  const costPerSegment = 0.25;
  const estimatedCost = recipientCount * segmentCount * costPerSegment;

  // Update AI status based on message content
  const handleMessageChange = (newMessage: string) => {
    setMessage(newMessage);
    
    // Simple AI status simulation
    const lowerMessage = newMessage.toLowerCase();
    if (newMessage.length < 10) {
      setAIStatus("pending");
    } else if (lowerMessage.includes("scam") || lowerMessage.includes("fraud")) {
      setAIStatus("blocked");
    } else if (lowerMessage.includes("urgent") || lowerMessage.includes("penalty")) {
      setAIStatus("warning");
    } else {
      setAIStatus("approved");
    }
  };

  const handleApplySuggestion = (suggestion: string) => {
    setMessage(suggestion);
    setAIStatus("approved");
  };

  const handleSend = async () => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const isScheduled = sendOption === "scheduled" || deliveryMode === "scheduled";
    
    toast({
      title: isScheduled ? "SMS Scheduled Successfully" : "SMS Sent Successfully",
      description: `Message ${isScheduled ? "scheduled" : "sent"} to ${recipientCount.toLocaleString()} recipients. Message ID: SMS-2026-${Date.now().toString().slice(-6)}`,
    });

    setIsSubmitting(false);
    navigate("/messaging/triggered-sms");
  };

  const handleSaveDraft = () => {
    toast({
      title: "Draft Saved",
      description: "Your message has been saved as a draft.",
    });
  };

  const handleCancel = () => {
    navigate("/dashboard");
  };

  // Credit balance (mock)
  const creditBalance = 125000;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/messaging/triggered-sms">Messaging</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Create SMS</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <div className="flex items-center gap-2 mt-2">
              <h1 className="text-2xl font-bold text-foreground">Create / Send SMS</h1>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                      <HelpCircle className="h-4 w-4 text-muted-foreground" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    <p>
                      Create and send SMS messages to individual recipients, bulk contacts, or
                      schedule for later delivery. All messages are reviewed by AI for compliance.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>

          {/* Credit Balance */}
          <div className="flex items-center gap-2 p-3 border bg-muted/30">
            <Coins className="h-5 w-5 text-gold" />
            <div>
              <div className="text-xs text-muted-foreground">SMS Credit Balance</div>
              <div className="font-bold text-lg">{creditBalance.toLocaleString()} ETB</div>
            </div>
          </div>
        </div>

        {/* Main Form */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Message Type */}
            <Card>
              <CardContent className="p-6">
                <MessageTypeSelector value={deliveryMode} onChange={setDeliveryMode} />
              </CardContent>
            </Card>

            {/* Sender Configuration */}
            <Card>
              <CardContent className="p-6">
                <SenderConfiguration
                  senderId={senderId}
                  onSenderIdChange={setSenderId}
                  language={language}
                  onLanguageChange={setLanguage}
                />
              </CardContent>
            </Card>

            {/* Recipient Selection */}
            <Card>
              <CardContent className="p-6">
                <RecipientSelection
                  deliveryMode={deliveryMode}
                  manualNumbers={manualNumbers}
                  onManualNumbersChange={setManualNumbers}
                  selectedGroups={selectedGroups}
                  onSelectedGroupsChange={setSelectedGroups}
                />
              </CardContent>
            </Card>

            {/* Message Composition */}
            <Card>
              <CardContent className="p-6">
                <MessageComposition
                  message={message}
                  onMessageChange={handleMessageChange}
                  template={template}
                  onTemplateChange={setTemplate}
                />
              </CardContent>
            </Card>

            {/* Scheduling */}
            <Card>
              <CardContent className="p-6">
                <SchedulingSection
                  deliveryMode={deliveryMode}
                  sendOption={sendOption}
                  onSendOptionChange={setSendOption}
                  scheduledDate={scheduledDate}
                  onScheduledDateChange={setScheduledDate}
                  scheduledTime={scheduledTime}
                  onScheduledTimeChange={setScheduledTime}
                />
              </CardContent>
            </Card>

            {/* Delivery Controls */}
            <Card>
              <CardContent className="p-6">
                <DeliveryControls
                  throttling={throttling}
                  onThrottlingChange={setThrottling}
                  routing={routing}
                  onRoutingChange={setRouting}
                  confirmationEnabled={confirmationEnabled}
                  onConfirmationEnabledChange={setConfirmationEnabled}
                  recipientCount={recipientCount}
                  segmentCount={segmentCount}
                />
              </CardContent>
            </Card>
          </div>

          {/* Right Column - AI Review & Confirmation */}
          <div className="space-y-6">
            {/* AI Content Review */}
            <Card>
              <CardContent className="p-6">
                <AIContentReview
                  message={message}
                  onApplySuggestion={handleApplySuggestion}
                />
              </CardContent>
            </Card>

            {/* Review & Confirmation */}
            <Card className="sticky top-6">
              <CardContent className="p-6">
                <ReviewConfirmation
                  deliveryMode={deliveryMode}
                  senderId={senderId}
                  message={message}
                  recipientCount={recipientCount}
                  segmentCount={segmentCount}
                  estimatedCost={estimatedCost}
                  sendOption={sendOption}
                  scheduledDate={scheduledDate}
                  scheduledTime={scheduledTime}
                  aiStatus={aiStatus}
                  onSend={handleSend}
                  onSaveDraft={handleSaveDraft}
                  onCancel={handleCancel}
                  isSubmitting={isSubmitting}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
