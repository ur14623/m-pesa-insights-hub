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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowLeft,
  Save,
  Upload,
  Plus,
  Search,
  AlertTriangle,
  CheckCircle,
  XCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const mockContacts = [
  { id: "C-001", phone: "+251911***234", name: "Alemayehu Bekele", region: "Oromia", status: "Active" },
  { id: "C-002", phone: "+251912***567", name: "Tigist Haile", region: "Oromia", status: "Active" },
  { id: "C-003", phone: "+251913***890", name: "Dawit Mengistu", region: "Amhara", status: "Active" },
  { id: "C-004", phone: "+251914***123", name: "Sara Bekele", region: "Oromia", status: "Inactive" },
  { id: "C-005", phone: "+251915***456", name: "Yohannes Tadesse", region: "Tigray", status: "Active" },
];

const ContactListDetail = () => {
  const { id } = useParams();
  const isNew = id === "new";

  const [listName, setListName] = useState(isNew ? "" : "Dairy Farmers - Oromia");
  const [description, setDescription] = useState(isNew ? "" : "Master contact list for dairy farmers in the Oromia region");
  const [language, setLanguage] = useState(isNew ? "" : "oromo");
  const [status, setStatus] = useState(isNew ? "Active" : "Active");
  const [importTab, setImportTab] = useState("manual");
  const [manualNumbers, setManualNumbers] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const [validationResults, setValidationResults] = useState<{
    valid: number;
    invalid: number;
    duplicates: number;
    blacklisted: number;
  } | null>(null);

  const handleValidate = () => {
    // Simulate validation
    setValidationResults({
      valid: 45,
      invalid: 3,
      duplicates: 2,
      blacklisted: 1,
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-sm text-muted-foreground mb-1">
              Dashboard &gt; Contacts &gt; Lists &gt; {isNew ? "Create New" : "Edit"}
            </div>
            <div className="flex items-center gap-3">
              <Link to="/contacts/lists">
                <Button variant="ghost" size="icon" className="rounded-none">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <h1 className="text-2xl font-semibold text-foreground">
                {isNew ? "Create New Contact List" : "Edit Contact List"}
              </h1>
            </div>
          </div>
          <div className="flex gap-2">
            <Link to="/contacts/lists">
              <Button variant="outline" className="rounded-none">
                Cancel
              </Button>
            </Link>
            <Button className="rounded-none gap-2 bg-primary">
              <Save className="h-4 w-4" />
              {isNew ? "Create List" : "Save Changes"}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* List Details */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="rounded-none border">
              <CardHeader className="border-b">
                <CardTitle className="text-lg">List Details</CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="listName">List Name *</Label>
                  <Input
                    id="listName"
                    value={listName}
                    onChange={(e) => setListName(e.target.value)}
                    placeholder="Enter list name"
                    className="rounded-none"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter list description"
                    className="rounded-none min-h-[80px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="language">Default Language</Label>
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger className="rounded-none">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent className="rounded-none">
                      <SelectItem value="amharic">Amharic</SelectItem>
                      <SelectItem value="oromo">Oromo</SelectItem>
                      <SelectItem value="tigrinya">Tigrinya</SelectItem>
                      <SelectItem value="english">English</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select value={status} onValueChange={setStatus}>
                    <SelectTrigger className="rounded-none">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent className="rounded-none">
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Import Summary */}
            {validationResults && (
              <Card className="rounded-none border">
                <CardHeader className="border-b">
                  <CardTitle className="text-lg">Validation Results</CardTitle>
                </CardHeader>
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-emerald-600" />
                      <span className="text-sm">Valid Numbers</span>
                    </div>
                    <Badge className="rounded-none bg-emerald-600 text-white">{validationResults.valid}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <XCircle className="h-4 w-4 text-destructive" />
                      <span className="text-sm">Invalid Numbers</span>
                    </div>
                    <Badge className="rounded-none bg-destructive text-destructive-foreground">{validationResults.invalid}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-amber-600" />
                      <span className="text-sm">Duplicates</span>
                    </div>
                    <Badge className="rounded-none bg-amber-600 text-white">{validationResults.duplicates}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-destructive" />
                      <span className="text-sm">Blacklisted</span>
                    </div>
                    <Badge className="rounded-none bg-destructive text-destructive-foreground">{validationResults.blacklisted}</Badge>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Contact Import */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="rounded-none border">
              <CardHeader className="border-b">
                <CardTitle className="text-lg">Add Contacts</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <Tabs value={importTab} onValueChange={setImportTab}>
                  <TabsList className="rounded-none w-full justify-start mb-4 bg-muted">
                    <TabsTrigger value="manual" className="rounded-none">Manual Entry</TabsTrigger>
                    <TabsTrigger value="upload" className="rounded-none">Excel/CSV Upload</TabsTrigger>
                    <TabsTrigger value="existing" className="rounded-none">From Existing Lists</TabsTrigger>
                  </TabsList>

                  <TabsContent value="manual" className="space-y-4">
                    <div className="space-y-2">
                      <Label>Phone Numbers (one per line or comma-separated)</Label>
                      <Textarea
                        value={manualNumbers}
                        onChange={(e) => setManualNumbers(e.target.value)}
                        placeholder="+251911234567&#10;+251912345678&#10;+251913456789"
                        className="rounded-none min-h-[150px] font-mono text-sm"
                      />
                    </div>
                    <Button onClick={handleValidate} className="rounded-none">
                      Validate Numbers
                    </Button>
                  </TabsContent>

                  <TabsContent value="upload" className="space-y-4">
                    <div className="border-2 border-dashed border-muted-foreground/25 p-8 text-center">
                      <Upload className="h-10 w-10 mx-auto text-muted-foreground mb-4" />
                      <p className="text-sm text-muted-foreground mb-2">
                        Drag and drop your Excel or CSV file here
                      </p>
                      <p className="text-xs text-muted-foreground mb-4">
                        Supported formats: .xlsx, .csv
                      </p>
                      <Button variant="outline" className="rounded-none">
                        Browse Files
                      </Button>
                    </div>
                    <div className="space-y-2">
                      <Label>Column Mapping</Label>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label className="text-sm text-muted-foreground">Phone Number Column</Label>
                          <Select>
                            <SelectTrigger className="rounded-none">
                              <SelectValue placeholder="Select column" />
                            </SelectTrigger>
                            <SelectContent className="rounded-none">
                              <SelectItem value="phone">Phone</SelectItem>
                              <SelectItem value="mobile">Mobile</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-sm text-muted-foreground">Name Column (Optional)</Label>
                          <Select>
                            <SelectTrigger className="rounded-none">
                              <SelectValue placeholder="Select column" />
                            </SelectTrigger>
                            <SelectContent className="rounded-none">
                              <SelectItem value="name">Name</SelectItem>
                              <SelectItem value="full_name">Full Name</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="existing" className="space-y-4">
                    <div className="space-y-2">
                      <Label>Select Source Lists</Label>
                      <Select>
                        <SelectTrigger className="rounded-none">
                          <SelectValue placeholder="Select a list" />
                        </SelectTrigger>
                        <SelectContent className="rounded-none">
                          <SelectItem value="cl-002">Dairy Farmers - Amhara (8,750 contacts)</SelectItem>
                          <SelectItem value="cl-003">Cooperative Leaders (450 contacts)</SelectItem>
                          <SelectItem value="cl-005">Extension Workers (890 contacts)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button className="rounded-none gap-2">
                      <Plus className="h-4 w-4" />
                      Add Selected Contacts
                    </Button>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Current Contacts */}
            {!isNew && (
              <Card className="rounded-none border">
                <CardHeader className="border-b">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Current Contacts</CardTitle>
                    <div className="relative w-64">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search contacts..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 rounded-none"
                      />
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-b">
                        <TableHead className="font-semibold">Phone Number</TableHead>
                        <TableHead className="font-semibold">Name</TableHead>
                        <TableHead className="font-semibold">Region</TableHead>
                        <TableHead className="font-semibold">Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockContacts.map((contact) => (
                        <TableRow key={contact.id} className="border-b">
                          <TableCell className="font-mono text-sm">{contact.phone}</TableCell>
                          <TableCell>{contact.name}</TableCell>
                          <TableCell>{contact.region}</TableCell>
                          <TableCell>
                            <Badge
                              className={`rounded-none ${
                                contact.status === "Active"
                                  ? "bg-emerald-600 text-white"
                                  : "bg-muted text-muted-foreground"
                              }`}
                            >
                              {contact.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>

                  <div className="flex items-center justify-between p-4 border-t">
                    <div className="text-sm text-muted-foreground">
                      Showing 1-5 of 12,500 contacts
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" className="rounded-none" disabled>
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="rounded-none bg-primary text-primary-foreground">
                        1
                      </Button>
                      <Button variant="outline" size="sm" className="rounded-none">
                        2
                      </Button>
                      <Button variant="outline" size="sm" className="rounded-none">
                        3
                      </Button>
                      <Button variant="outline" size="sm" className="rounded-none">
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ContactListDetail;
