import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ArrowLeft,
  Save,
  Upload,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Calendar,
} from "lucide-react";

const BlacklistDetail = () => {
  const { id } = useParams();
  const isNew = id === "new";

  const [entryTab, setEntryTab] = useState("manual");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [reason, setReason] = useState("");
  const [isTemporary, setIsTemporary] = useState(false);
  const [expiryDate, setExpiryDate] = useState("");
  const [bulkNumbers, setBulkNumbers] = useState("");

  const [validationResults, setValidationResults] = useState<{
    valid: number;
    invalid: number;
    duplicates: number;
    alreadyBlocked: number;
  } | null>(null);

  const handleValidate = () => {
    // Simulate validation
    setValidationResults({
      valid: 12,
      invalid: 2,
      duplicates: 1,
      alreadyBlocked: 3,
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-sm text-muted-foreground mb-1">
              Dashboard &gt; Contacts &gt; Blacklist &gt; Add New
            </div>
            <div className="flex items-center gap-3">
              <Link to="/contacts/blacklist">
                <Button variant="ghost" size="icon" className="rounded-none">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <h1 className="text-2xl font-semibold text-foreground">Add to Blacklist</h1>
            </div>
          </div>
          <div className="flex gap-2">
            <Link to="/contacts/blacklist">
              <Button variant="outline" className="rounded-none">
                Cancel
              </Button>
            </Link>
            <Button className="rounded-none gap-2 bg-destructive">
              <Save className="h-4 w-4" />
              Add to Blacklist
            </Button>
          </div>
        </div>

        {/* Warning Banner */}
        <Card className="rounded-none border border-amber-600 bg-amber-50 dark:bg-amber-950/20">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium text-amber-800 dark:text-amber-200">Blacklist Impact</h4>
                <p className="text-sm text-amber-700 dark:text-amber-300 mt-1">
                  Numbers added to the blacklist will be automatically excluded from all SMS campaigns.
                  This action is logged for audit compliance. Regulatory blocks cannot be removed without
                  proper authorization.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Entry Method */}
          <div className="lg:col-span-2">
            <Card className="rounded-none border">
              <CardHeader className="border-b">
                <CardTitle className="text-lg">Entry Method</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <Tabs value={entryTab} onValueChange={setEntryTab}>
                  <TabsList className="rounded-none w-full justify-start mb-4 bg-muted">
                    <TabsTrigger value="manual" className="rounded-none">Single Entry</TabsTrigger>
                    <TabsTrigger value="bulk" className="rounded-none">Bulk Upload</TabsTrigger>
                    <TabsTrigger value="import" className="rounded-none">Import from Inbox</TabsTrigger>
                  </TabsList>

                  <TabsContent value="manual" className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="phoneNumber">Phone Number *</Label>
                      <Input
                        id="phoneNumber"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="+251911234567"
                        className="rounded-none font-mono"
                      />
                      <p className="text-xs text-muted-foreground">
                        Enter the full phone number with country code
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="reason">Reason for Blacklisting *</Label>
                      <Select value={reason} onValueChange={setReason}>
                        <SelectTrigger className="rounded-none">
                          <SelectValue placeholder="Select reason" />
                        </SelectTrigger>
                        <SelectContent className="rounded-none">
                          <SelectItem value="user_opt_out">User Opt-Out Request</SelectItem>
                          <SelectItem value="spam_complaint">Spam Complaint</SelectItem>
                          <SelectItem value="invalid_number">Invalid Number</SelectItem>
                          <SelectItem value="regulatory">Regulatory Compliance</SelectItem>
                          <SelectItem value="abuse">Abuse / Harassment</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="notes">Additional Notes</Label>
                      <Textarea
                        id="notes"
                        placeholder="Enter any additional details..."
                        className="rounded-none min-h-[80px]"
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="bulk" className="space-y-4">
                    <div className="space-y-2">
                      <Label>Phone Numbers (one per line)</Label>
                      <Textarea
                        value={bulkNumbers}
                        onChange={(e) => setBulkNumbers(e.target.value)}
                        placeholder="+251911234567&#10;+251912345678&#10;+251913456789"
                        className="rounded-none min-h-[150px] font-mono text-sm"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Reason for All Entries</Label>
                      <Select>
                        <SelectTrigger className="rounded-none">
                          <SelectValue placeholder="Select reason" />
                        </SelectTrigger>
                        <SelectContent className="rounded-none">
                          <SelectItem value="user_opt_out">User Opt-Out Request</SelectItem>
                          <SelectItem value="spam_complaint">Spam Complaint</SelectItem>
                          <SelectItem value="invalid_number">Invalid Number</SelectItem>
                          <SelectItem value="regulatory">Regulatory Compliance</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Button onClick={handleValidate} variant="outline" className="rounded-none">
                      Validate Numbers
                    </Button>

                    {validationResults && (
                      <div className="border p-4 space-y-2">
                        <h4 className="font-medium">Validation Results</h4>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-emerald-600" />
                            <span className="text-sm">Valid: {validationResults.valid}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <XCircle className="h-4 w-4 text-destructive" />
                            <span className="text-sm">Invalid: {validationResults.invalid}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <AlertTriangle className="h-4 w-4 text-amber-600" />
                            <span className="text-sm">Duplicates: {validationResults.duplicates}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">Already Blocked: {validationResults.alreadyBlocked}</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="import" className="space-y-4">
                    <div className="border-2 border-dashed border-muted-foreground/25 p-8 text-center">
                      <Upload className="h-10 w-10 mx-auto text-muted-foreground mb-4" />
                      <p className="text-sm text-muted-foreground mb-2">
                        Upload an Excel or CSV file with phone numbers to blacklist
                      </p>
                      <p className="text-xs text-muted-foreground mb-4">
                        Supported formats: .xlsx, .csv
                      </p>
                      <Button variant="outline" className="rounded-none">
                        Browse Files
                      </Button>
                    </div>

                    <div className="space-y-2">
                      <Label>Or Import from Recent Inbox Messages</Label>
                      <Table>
                        <TableHeader>
                          <TableRow className="border-b">
                            <TableHead className="w-12"></TableHead>
                            <TableHead className="font-semibold">Sender</TableHead>
                            <TableHead className="font-semibold">Message</TableHead>
                            <TableHead className="font-semibold">AI Flag</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow className="border-b">
                            <TableCell>
                              <input type="checkbox" className="rounded-none" />
                            </TableCell>
                            <TableCell className="font-mono text-sm">+251917***890</TableCell>
                            <TableCell className="text-sm truncate max-w-[200px]">
                              Inappropriate content detected...
                            </TableCell>
                            <TableCell>
                              <Badge className="rounded-none bg-destructive text-destructive-foreground">
                                Suspicious
                              </Badge>
                            </TableCell>
                          </TableRow>
                          <TableRow className="border-b">
                            <TableCell>
                              <input type="checkbox" className="rounded-none" />
                            </TableCell>
                            <TableCell className="font-mono text-sm">+251918***123</TableCell>
                            <TableCell className="text-sm truncate max-w-[200px]">
                              Spam message pattern identified...
                            </TableCell>
                            <TableCell>
                              <Badge className="rounded-none bg-amber-600 text-white">Warning</Badge>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Settings */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="rounded-none border">
              <CardHeader className="border-b">
                <CardTitle className="text-lg">Block Settings</CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="temporary">Temporary Block</Label>
                    <p className="text-xs text-muted-foreground mt-1">
                      Set an expiry date for this block
                    </p>
                  </div>
                  <Switch
                    id="temporary"
                    checked={isTemporary}
                    onCheckedChange={setIsTemporary}
                  />
                </div>

                {isTemporary && (
                  <div className="space-y-2">
                    <Label htmlFor="expiryDate">Expiry Date</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="expiryDate"
                        type="date"
                        value={expiryDate}
                        onChange={(e) => setExpiryDate(e.target.value)}
                        className="pl-10 rounded-none"
                      />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="rounded-none border">
              <CardHeader className="border-b">
                <CardTitle className="text-lg">Enforcement Rules</CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-3">
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-emerald-600 mt-0.5" />
                  <span className="text-sm">Automatic exclusion from all campaigns</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-emerald-600 mt-0.5" />
                  <span className="text-sm">Real-time validation during SMS creation</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-emerald-600 mt-0.5" />
                  <span className="text-sm">Full audit logging of all changes</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-emerald-600 mt-0.5" />
                  <span className="text-sm">Cross-check on all contact imports</span>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-none border">
              <CardHeader className="border-b">
                <CardTitle className="text-lg">Audit Information</CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Added By</span>
                  <span className="font-medium">Current User</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Date</span>
                  <span className="font-medium">{new Date().toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">IP Address</span>
                  <span className="font-medium font-mono">196.188.***</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default BlacklistDetail;
