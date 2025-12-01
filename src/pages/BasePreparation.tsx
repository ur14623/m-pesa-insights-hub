import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Link, Calendar, Users, Clock, DollarSign, Target, Rocket, Gift, Smartphone, CreditCard } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface TableStatus {
  name: string;
  status: "pending" | "running" | "completed" | "error";
  time: number;
  parameters: string;
}

export default function BasePreparation() {
  const { toast } = useToast();
  const [basePrepType, setBasePrepType] = useState("existing-pinreset");
  const [postfix, setPostfix] = useState("NOV29");
  const [isGenerating, setIsGenerating] = useState(false);
  const [startTime, setStartTime] = useState<number>(0);
  const [elapsedTime, setElapsedTime] = useState(0);

  // Table selection states
  const [enableVlr, setEnableVlr] = useState(true);
  const [enableRegistered, setEnableRegistered] = useState(true);
  const [enableActive, setEnableActive] = useState(true);
  const [enableInactive, setEnableInactive] = useState(true);
  const [enableBalance, setEnableBalance] = useState(true);
  const [enableTargeted, setEnableTargeted] = useState(true);
  const [enableRewarded, setEnableRewarded] = useState(false);
  const [enableGsm, setEnableGsm] = useState(false);
  const [enableTopUp, setEnableTopUp] = useState(false);

  // VLR Attachment
  const [vlrStartDay, setVlrStartDay] = useState("0");
  const [vlrEndDay, setVlrEndDay] = useState("30");

  // Registered Before
  const [regStartDate, setRegStartDate] = useState("2024-01-01");
  const [regEndDate, setRegEndDate] = useState("2024-11-29");

  // Active Users
  const [activePeriod, setActivePeriod] = useState("90");
  const [activeUntil, setActiveUntil] = useState("2024-11-29");

  // Inactive Users
  const [inactivePeriod, setInactivePeriod] = useState("30");
  const [inactiveUntil, setInactiveUntil] = useState("2024-11-29");

  // Balance Threshold
  const [balanceLimit, setBalanceLimit] = useState("100.00");

  // Targeted Users
  const [targetedLookback, setTargetedLookback] = useState("90");
  const [targetedAnalysis, setTargetedAnalysis] = useState("2024-11-29");

  // Rewarded
  const [rewardedField1, setRewardedField1] = useState("");
  const [rewardedField2, setRewardedField2] = useState("");

  // GSM Usage
  const [gsmField1, setGsmField1] = useState("");
  const [gsmField2, setGsmField2] = useState("");

  // MPESA Top Up
  const [topUpField1, setTopUpField1] = useState("");
  const [topUpField2, setTopUpField2] = useState("");

  const getAllTables = () => {
    const tables: TableStatus[] = [];
    if (enableVlr) tables.push({ name: `VLR_ATTCH_${postfix}`, status: "pending", time: 0, parameters: `vlr_from: ${vlrStartDay}, vlr_to: ${vlrEndDay}` });
    if (enableRegistered) tables.push({ name: `REGISTERED_BEFORE_${postfix}`, status: "pending", time: 0, parameters: `start: ${regStartDate}, end: ${regEndDate}` });
    if (enableActive) tables.push({ name: `DAY_ACTIVE_${postfix}`, status: "pending", time: 0, parameters: `range: ${activePeriod}, end: ${activeUntil}` });
    if (enableInactive) tables.push({ name: `DAY_NOT_ACTIVE_${postfix}`, status: "pending", time: 0, parameters: `range: ${inactivePeriod}, end: ${inactiveUntil}` });
    if (enableBalance) tables.push({ name: `BALANCE_THRESH_${postfix}`, status: "pending", time: 0, parameters: `threshold: ${balanceLimit} ETB` });
    if (enableTargeted) tables.push({ name: `TARGETED_${postfix}`, status: "pending", time: 0, parameters: `range: ${targetedLookback}, end: ${targetedAnalysis}` });
    if (enableRewarded) tables.push({ name: `REWARDED_${postfix}`, status: "pending", time: 0, parameters: `field1: ${rewardedField1}, field2: ${rewardedField2}` });
    if (enableGsm) tables.push({ name: `GSM_USAGE_${postfix}`, status: "pending", time: 0, parameters: `field1: ${gsmField1}, field2: ${gsmField2}` });
    if (enableTopUp) tables.push({ name: `MPESA_TOPUP_${postfix}`, status: "pending", time: 0, parameters: `field1: ${topUpField1}, field2: ${topUpField2}` });
    tables.push({ name: `PIN_RESET_BASE_${postfix}`, status: "pending", time: 0, parameters: "All pre-requisite tables" });
    return tables;
  };

  const [tableStatuses, setTableStatuses] = useState<TableStatus[]>(getAllTables());

  const handleGenerate = () => {
    const selectedTables = getAllTables();
    setTableStatuses(selectedTables);
    setIsGenerating(true);
    setStartTime(Date.now());
    
    toast({
      title: "Starting Generation",
      description: `Generating ${selectedTables.length} base tables...`,
    });

    // Simulate table generation process
    simulateTableGeneration(selectedTables.length);
  };

  const simulateTableGeneration = (tableCount: number) => {
    // This would be replaced with actual API calls in production
    const completionTimes = Array(tableCount).fill(0).map(() => Math.floor(Math.random() * 10000) + 5000);
    
    completionTimes.forEach((time, index) => {
      setTimeout(() => {
        setTableStatuses(prev => {
          const updated = [...prev];
          updated[index] = { ...updated[index], status: "running", time: 0 };
          return updated;
        });

        // Update running time
        const interval = setInterval(() => {
          setTableStatuses(prev => {
            const updated = [...prev];
            if (updated[index].status === "running") {
              updated[index] = { ...updated[index], time: updated[index].time + 1 };
            }
            return updated;
          });
        }, 1000);

        setTimeout(() => {
          clearInterval(interval);
          setTableStatuses(prev => {
            const updated = [...prev];
            updated[index] = { ...updated[index], status: "completed", time: time / 1000 };
            return updated;
          });

          if (index === completionTimes.length - 1) {
            setIsGenerating(false);
            toast({
              title: "Generation Complete",
              description: "All base tables have been successfully created!",
            });
          }
        }, time);
      }, index * 2000);
    });
  };

  const getStatusBadge = (status: TableStatus["status"]) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-500 hover:bg-green-600">🟢 Completed</Badge>;
      case "running":
        return <Badge className="bg-yellow-500 hover:bg-yellow-600">🟡 Running</Badge>;
      case "pending":
        return <Badge variant="secondary">⚪ Pending</Badge>;
      case "error":
        return <Badge variant="destructive">🔴 Error</Badge>;
    }
  };

  const completedTables = tableStatuses.filter(t => t.status === "completed").length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Base Preparation Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">Configure and generate base tables</p>
        </div>

        <div className="space-y-6">
          {/* Configuration Card */}
          <Card className="border-2 shadow-elegant">
            <CardHeader className="border-b bg-gradient-to-r from-primary/5 to-transparent">
              <CardTitle className="flex items-center gap-2">
                ⚙️ BASE TABLE CONFIGURATION
              </CardTitle>
              <CardDescription>Configure parameters for all base tables</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              {/* Base Prep Type Selector */}
              <div className="mb-6">
                <Label htmlFor="basePrepType" className="text-base font-semibold">Base Preparation Type</Label>
                <Select value={basePrepType} onValueChange={setBasePrepType}>
                  <SelectTrigger className="mt-2 max-w-xs bg-background">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-background z-50">
                    <SelectItem value="existing-pinreset">Existing PINRESET</SelectItem>
                    <SelectItem value="ga-pinreset">GA PINRESET</SelectItem>
                    <SelectItem value="cbe-bank">CBE BANK</SelectItem>
                    <SelectItem value="winback-churner">Winback Churner</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground mt-1">Select the type of base preparation</p>
              </div>

              {/* Postfix Input */}
              <div className="mb-6">
                <Label htmlFor="postfix" className="text-base font-semibold">Table Postfix</Label>
                <Input 
                  id="postfix"
                  type="text" 
                  value={postfix} 
                  onChange={(e) => setPostfix(e.target.value.toUpperCase())} 
                  placeholder="e.g., NOV29"
                  className="mt-2 max-w-xs"
                />
                <p className="text-xs text-muted-foreground mt-1">This postfix will be appended to all generated table names</p>
              </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  {/* VLR Attachment Card */}
                  <Card className="border-l-4 border-l-blue-500">
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between text-base">
                        <div className="flex items-center gap-2">
                          <Link className="h-4 w-4" />
                          VLR ATTACHMENT
                        </div>
                        <div className="flex items-center gap-2">
                          <Checkbox checked={enableVlr} onCheckedChange={(checked) => setEnableVlr(checked as boolean)} />
                          <Label className="text-xs">Enable</Label>
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label>Start Day</Label>
                        <Input type="number" value={vlrStartDay} onChange={(e) => setVlrStartDay(e.target.value)} disabled={!enableVlr} />
                      </div>
                      <div>
                        <Label>End Day</Label>
                        <Input type="number" value={vlrEndDay} onChange={(e) => setVlrEndDay(e.target.value)} disabled={!enableVlr} />
                      </div>
                    </CardContent>
                  </Card>

                  {/* Registered Before Card */}
                  <Card className="border-l-4 border-l-purple-500">
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between text-base">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          REGISTERED BEFORE
                        </div>
                        <div className="flex items-center gap-2">
                          <Checkbox checked={enableRegistered} onCheckedChange={(checked) => setEnableRegistered(checked as boolean)} />
                          <Label className="text-xs">Enable</Label>
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label>Start Date</Label>
                        <Input type="date" value={regStartDate} onChange={(e) => setRegStartDate(e.target.value)} disabled={!enableRegistered} />
                      </div>
                      <div>
                        <Label>End Date</Label>
                        <Input type="date" value={regEndDate} onChange={(e) => setRegEndDate(e.target.value)} disabled={!enableRegistered} />
                      </div>
                    </CardContent>
                  </Card>

                  {/* Active Users Card */}
                  <Card className="border-l-4 border-l-green-500">
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between text-base">
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4" />
                          ACTIVE USERS
                        </div>
                        <div className="flex items-center gap-2">
                          <Checkbox checked={enableActive} onCheckedChange={(checked) => setEnableActive(checked as boolean)} />
                          <Label className="text-xs">Enable</Label>
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label>Period</Label>
                        <Select value={activePeriod} onValueChange={setActivePeriod} disabled={!enableActive}>
                          <SelectTrigger className="bg-background">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-background z-50">
                            <SelectItem value="30">30 days</SelectItem>
                            <SelectItem value="60">60 days</SelectItem>
                            <SelectItem value="90">90 days</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Until</Label>
                        <Input type="date" value={activeUntil} onChange={(e) => setActiveUntil(e.target.value)} disabled={!enableActive} />
                      </div>
                    </CardContent>
                  </Card>

                  {/* Inactive Users Card */}
                  <Card className="border-l-4 border-l-orange-500">
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between text-base">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          INACTIVE USERS
                        </div>
                        <div className="flex items-center gap-2">
                          <Checkbox checked={enableInactive} onCheckedChange={(checked) => setEnableInactive(checked as boolean)} />
                          <Label className="text-xs">Enable</Label>
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label>Period</Label>
                        <Select value={inactivePeriod} onValueChange={setInactivePeriod} disabled={!enableInactive}>
                          <SelectTrigger className="bg-background">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-background z-50">
                            <SelectItem value="15">15 days</SelectItem>
                            <SelectItem value="30">30 days</SelectItem>
                            <SelectItem value="60">60 days</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Until</Label>
                        <Input type="date" value={inactiveUntil} onChange={(e) => setInactiveUntil(e.target.value)} disabled={!enableInactive} />
                      </div>
                    </CardContent>
                  </Card>

                  {/* Balance Threshold Card */}
                  <Card className="border-l-4 border-l-yellow-500">
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between text-base">
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4" />
                          BALANCE THRESHOLD
                        </div>
                        <div className="flex items-center gap-2">
                          <Checkbox checked={enableBalance} onCheckedChange={(checked) => setEnableBalance(checked as boolean)} />
                          <Label className="text-xs">Enable</Label>
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label>Limit (ETB)</Label>
                        <Input type="number" step="0.01" value={balanceLimit} onChange={(e) => setBalanceLimit(e.target.value)} disabled={!enableBalance} />
                      </div>
                    </CardContent>
                  </Card>

                  {/* Targeted Users Card */}
                  <Card className="border-l-4 border-l-red-500">
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between text-base">
                        <div className="flex items-center gap-2">
                          <Target className="h-4 w-4" />
                          TARGETED USERS
                        </div>
                        <div className="flex items-center gap-2">
                          <Checkbox checked={enableTargeted} onCheckedChange={(checked) => setEnableTargeted(checked as boolean)} />
                          <Label className="text-xs">Enable</Label>
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label>Lookback</Label>
                        <Select value={targetedLookback} onValueChange={setTargetedLookback} disabled={!enableTargeted}>
                          <SelectTrigger className="bg-background">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-background z-50">
                            <SelectItem value="30">30 days</SelectItem>
                            <SelectItem value="60">60 days</SelectItem>
                            <SelectItem value="90">90 days</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Analysis Date</Label>
                        <Input type="date" value={targetedAnalysis} onChange={(e) => setTargetedAnalysis(e.target.value)} disabled={!enableTargeted} />
                      </div>
                    </CardContent>
                  </Card>

                  {/* Rewarded Card */}
                  <Card className="border-l-4 border-l-pink-500">
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between text-base">
                        <div className="flex items-center gap-2">
                          <Gift className="h-4 w-4" />
                          REWARDED
                        </div>
                        <div className="flex items-center gap-2">
                          <Checkbox checked={enableRewarded} onCheckedChange={(checked) => setEnableRewarded(checked as boolean)} />
                          <Label className="text-xs">Enable</Label>
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label>Field 1</Label>
                        <Input type="text" value={rewardedField1} onChange={(e) => setRewardedField1(e.target.value)} disabled={!enableRewarded} placeholder="Enter field 1" />
                      </div>
                      <div>
                        <Label>Field 2</Label>
                        <Input type="text" value={rewardedField2} onChange={(e) => setRewardedField2(e.target.value)} disabled={!enableRewarded} placeholder="Enter field 2" />
                      </div>
                    </CardContent>
                  </Card>

                  {/* GSM Usage Card */}
                  <Card className="border-l-4 border-l-cyan-500">
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between text-base">
                        <div className="flex items-center gap-2">
                          <Smartphone className="h-4 w-4" />
                          GSM USAGE
                        </div>
                        <div className="flex items-center gap-2">
                          <Checkbox checked={enableGsm} onCheckedChange={(checked) => setEnableGsm(checked as boolean)} />
                          <Label className="text-xs">Enable</Label>
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label>Field 1</Label>
                        <Input type="text" value={gsmField1} onChange={(e) => setGsmField1(e.target.value)} disabled={!enableGsm} placeholder="Enter field 1" />
                      </div>
                      <div>
                        <Label>Field 2</Label>
                        <Input type="text" value={gsmField2} onChange={(e) => setGsmField2(e.target.value)} disabled={!enableGsm} placeholder="Enter field 2" />
                      </div>
                    </CardContent>
                  </Card>

                  {/* MPESA Top Up Card */}
                  <Card className="border-l-4 border-l-indigo-500">
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between text-base">
                        <div className="flex items-center gap-2">
                          <CreditCard className="h-4 w-4" />
                          MPESA TOP UP
                        </div>
                        <div className="flex items-center gap-2">
                          <Checkbox checked={enableTopUp} onCheckedChange={(checked) => setEnableTopUp(checked as boolean)} />
                          <Label className="text-xs">Enable</Label>
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label>Field 1</Label>
                        <Input type="text" value={topUpField1} onChange={(e) => setTopUpField1(e.target.value)} disabled={!enableTopUp} placeholder="Enter field 1" />
                      </div>
                      <div>
                        <Label>Field 2</Label>
                        <Input type="text" value={topUpField2} onChange={(e) => setTopUpField2(e.target.value)} disabled={!enableTopUp} placeholder="Enter field 2" />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Button 
                  onClick={handleGenerate} 
                  className="w-full h-14 text-lg gap-2"
                  disabled={isGenerating}
                >
                  <Rocket className="h-5 w-5" />
                  {isGenerating ? "GENERATING..." : "GENERATE ALL BASE TABLES"}
                </Button>
                <p className="text-center text-sm text-muted-foreground mt-2">
                  Create tables with specified parameters
                </p>
              </CardContent>
            </Card>

            {/* Progress Tracking Card */}
            {isGenerating && (
              <Card className="border-2 shadow-elegant animate-fade-in">
                <CardHeader className="border-b bg-gradient-to-r from-blue-500/5 to-transparent">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      📊 PROGRESS TRACKING
                    </CardTitle>
                    <Badge variant="outline" className="text-base">
                      {completedTables}/{tableStatuses.length} Tables
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-6 space-y-6">
                  {/* Overall Status */}
                  <div className="grid grid-cols-3 gap-4">
                    <Card>
                      <CardContent className="pt-4">
                        <p className="text-sm text-muted-foreground">Overall Status</p>
                        <p className="text-lg font-semibold mt-1">
                          {completedTables === tableStatuses.length ? "🟢 Complete" : "🟡 Running"}
                        </p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-4">
                        <p className="text-sm text-muted-foreground">Elapsed Time</p>
                        <p className="text-lg font-semibold mt-1">{Math.floor((Date.now() - startTime) / 1000)}s</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-4">
                        <p className="text-sm text-muted-foreground">Total Execution</p>
                        <p className="text-lg font-semibold mt-1">
                          {completedTables === tableStatuses.length 
                            ? `${Math.floor((Date.now() - startTime) / 1000)}s` 
                            : "-"}
                        </p>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Table Status List */}
                  <div className="space-y-3">
                    {tableStatuses.map((table, idx) => (
                      <Card key={idx} className="overflow-hidden">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between gap-4">
                            <div className="flex-1 min-w-0">
                              <p className="font-medium truncate">{table.name}</p>
                              <p className="text-xs text-muted-foreground mt-1">{table.parameters}</p>
                            </div>
                            <div className="flex items-center gap-3">
                              {getStatusBadge(table.status)}
                              <p className="text-sm font-mono min-w-[60px] text-right">
                                {table.status === "completed" && `${table.time}s`}
                                {table.status === "running" && `${table.time}s...`}
                                {table.status === "pending" && "-"}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                   </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    );
  }
