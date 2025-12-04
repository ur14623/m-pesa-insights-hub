import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Gavel, CalendarIcon, Search } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

export default function CourtIssue() {
  const [msisdn, setMsisdn] = useState("");
  const [fromDate, setFromDate] = useState<Date>();
  const [toDate, setToDate] = useState<Date>();

  const handleSearch = () => {
    if (!msisdn) {
      toast({
        title: "Validation Error",
        description: "Please enter MSISDN",
        variant: "destructive",
      });
      return;
    }
    if (!fromDate || !toDate) {
      toast({
        title: "Validation Error",
        description: "Please select both From and To dates",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Searching...",
      description: `Searching for MSISDN: ${msisdn} from ${format(fromDate, "PPP")} to ${format(toDate, "PPP")}`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Court Issue
          </h1>
          <p className="text-muted-foreground mt-1">Search court-related issues by MSISDN and date range</p>
        </div>

        <Card className="border-2 shadow-elegant">
          <CardHeader className="border-b bg-gradient-to-r from-primary/5 to-transparent">
            <CardTitle className="flex items-center gap-2">
              <Gavel className="h-5 w-5" />
              Court Issue Search
            </CardTitle>
            <CardDescription>Enter MSISDN and select date range to search</CardDescription>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            {/* MSISDN Input */}
            <div className="space-y-2">
              <Label htmlFor="msisdn">MSISDN</Label>
              <Input
                id="msisdn"
                placeholder="Enter MSISDN"
                value={msisdn}
                onChange={(e) => setMsisdn(e.target.value)}
              />
            </div>

            {/* Date Range Picker */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>From Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !fromDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {fromDate ? format(fromDate, "PPP") : "Select date"}
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
                        "w-full justify-start text-left font-normal",
                        !toDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {toDate ? format(toDate, "PPP") : "Select date"}
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
            </div>

            {/* Search Button */}
            <Button onClick={handleSearch} className="w-full md:w-auto">
              <Search className="mr-2 h-4 w-4" />
              Search
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
