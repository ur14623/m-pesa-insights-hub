import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Moon, Upload, CalendarIcon, Table, Users, TrendingUp, BarChart3 } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

export default function DormantList() {
  const { toast } = useToast();
  const [tablePostfix, setTablePostfix] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [fromDate, setFromDate] = useState<Date>();
  const [toDate, setToDate] = useState<Date>();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleCreateActiveCustomerTable = () => {
    if (!fromDate || !toDate) {
      toast({ title: "Error", description: "Please select both From and To dates", variant: "destructive" });
      return;
    }
    toast({ title: "Creating Active Customer Table", description: `From ${format(fromDate, "PPP")} to ${format(toDate, "PPP")}` });
  };

  const handleCreateStillOnDormantTable = () => {
    if (!tablePostfix) {
      toast({ title: "Error", description: "Please enter table name postfix", variant: "destructive" });
      return;
    }
    toast({ title: "Creating Still on Dormant Table", description: `Table: dormant_still_${tablePostfix}` });
  };

  const handleCreateBackToActiveTable = () => {
    if (!tablePostfix) {
      toast({ title: "Error", description: "Please enter table name postfix", variant: "destructive" });
      return;
    }
    toast({ title: "Creating Back to Active Table", description: `Table: back_to_active_${tablePostfix}` });
  };

  const handleCreatePerformanceTable = () => {
    if (!tablePostfix) {
      toast({ title: "Error", description: "Please enter table name postfix", variant: "destructive" });
      return;
    }
    toast({ title: "Creating Performance Table", description: `Table: performance_${tablePostfix}` });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Dormant List
          </h1>
          <p className="text-muted-foreground mt-1">Manage dormant accounts and users</p>
        </div>

        {/* Configuration Card */}
        <Card className="border-2 shadow-elegant">
          <CardHeader className="border-b bg-gradient-to-r from-primary/5 to-transparent">
            <CardTitle className="flex items-center gap-2">
              <Moon className="h-5 w-5" />
              Configuration
            </CardTitle>
            <CardDescription>Set up table postfix and upload file</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="tablePostfix">Table Name Postfix</Label>
                <Input
                  id="tablePostfix"
                  placeholder="Enter postfix (e.g., dec_2024)"
                  value={tablePostfix}
                  onChange={(e) => setTablePostfix(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fileInput">File Input</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="fileInput"
                    type="file"
                    onChange={handleFileChange}
                    className="cursor-pointer"
                  />
                  {file && (
                    <span className="text-sm text-muted-foreground truncate max-w-[150px]">
                      {file.name}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Create Active Customer Table Card */}
        <Card className="border-2 shadow-elegant">
          <CardHeader className="border-b bg-gradient-to-r from-primary/5 to-transparent">
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Create Active Customer Table
            </CardTitle>
            <CardDescription>Select date range to create active customer table</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="flex flex-wrap items-end gap-4">
              <div className="space-y-2">
                <Label>From Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-[200px] justify-start text-left font-normal",
                        !fromDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {fromDate ? format(fromDate, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={fromDate}
                      onSelect={setFromDate}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <Label>To Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-[200px] justify-start text-left font-normal",
                        !toDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {toDate ? format(toDate, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={toDate}
                      onSelect={setToDate}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <Button onClick={handleCreateActiveCustomerTable} className="gap-2">
                <Table className="h-4 w-4" />
                Create Active Customer Table
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Table Creation Actions Card */}
        <Card className="border-2 shadow-elegant">
          <CardHeader className="border-b bg-gradient-to-r from-primary/5 to-transparent">
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Table Creation Actions
            </CardTitle>
            <CardDescription>Create analysis tables based on dormant data</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="flex flex-wrap gap-4">
              <Button onClick={handleCreateStillOnDormantTable} variant="secondary" className="gap-2">
                <Moon className="h-4 w-4" />
                Create Still on Dormant Table
              </Button>
              <Button onClick={handleCreateBackToActiveTable} variant="secondary" className="gap-2">
                <TrendingUp className="h-4 w-4" />
                Create Back to Active Table
              </Button>
              <Button onClick={handleCreatePerformanceTable} variant="secondary" className="gap-2">
                <BarChart3 className="h-4 w-4" />
                Create Performance Table
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
