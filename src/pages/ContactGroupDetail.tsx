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
import { Checkbox } from "@/components/ui/checkbox";
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
  ChevronLeft,
  ChevronRight,
  Trash2,
} from "lucide-react";

const mockContacts = [
  { id: "C-001", phone: "+251911***234", name: "Alemayehu Bekele", region: "Oromia", farmSize: "Large", selected: true },
  { id: "C-002", phone: "+251912***567", name: "Tigist Haile", region: "Oromia", farmSize: "Large", selected: true },
  { id: "C-003", phone: "+251913***890", name: "Dawit Mengistu", region: "Oromia", farmSize: "Large", selected: false },
  { id: "C-004", phone: "+251914***123", name: "Sara Bekele", region: "Oromia", farmSize: "Medium", selected: false },
  { id: "C-005", phone: "+251915***456", name: "Yohannes Tadesse", region: "Oromia", farmSize: "Large", selected: true },
];

const ContactGroupDetail = () => {
  const { id } = useParams();
  const isNew = id === "new";

  const [groupName, setGroupName] = useState(isNew ? "" : "Large Scale Farms");
  const [description, setDescription] = useState(isNew ? "" : "Dairy farmers with large scale operations (>50 cattle)");
  const [parentList, setParentList] = useState(isNew ? "" : "Dairy Farmers - Oromia");
  const [membershipTab, setMembershipTab] = useState("manual");
  const [searchTerm, setSearchTerm] = useState("");
  const [contacts, setContacts] = useState(mockContacts);

  const toggleContact = (contactId: string) => {
    setContacts(contacts.map(c => 
      c.id === contactId ? { ...c, selected: !c.selected } : c
    ));
  };

  const selectedCount = contacts.filter(c => c.selected).length;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-sm text-muted-foreground mb-1">
              Dashboard &gt; Contacts &gt; Groups &gt; {isNew ? "Create New" : "Edit"}
            </div>
            <div className="flex items-center gap-3">
              <Link to="/contacts/groups">
                <Button variant="ghost" size="icon" className="rounded-none">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <h1 className="text-2xl font-semibold text-foreground">
                {isNew ? "Create New Group" : "Edit Group"}
              </h1>
            </div>
          </div>
          <div className="flex gap-2">
            <Link to="/contacts/groups">
              <Button variant="outline" className="rounded-none">
                Cancel
              </Button>
            </Link>
            <Button className="rounded-none gap-2 bg-primary">
              <Save className="h-4 w-4" />
              {isNew ? "Create Group" : "Save Changes"}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Group Details */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="rounded-none border">
              <CardHeader className="border-b">
                <CardTitle className="text-lg">Group Details</CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="groupName">Group Name *</Label>
                  <Input
                    id="groupName"
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                    placeholder="Enter group name"
                    className="rounded-none"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter group description"
                    className="rounded-none min-h-[80px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="parentList">Parent Contact List *</Label>
                  <Select value={parentList} onValueChange={setParentList}>
                    <SelectTrigger className="rounded-none">
                      <SelectValue placeholder="Select parent list" />
                    </SelectTrigger>
                    <SelectContent className="rounded-none">
                      <SelectItem value="Dairy Farmers - Oromia">Dairy Farmers - Oromia</SelectItem>
                      <SelectItem value="Dairy Farmers - Amhara">Dairy Farmers - Amhara</SelectItem>
                      <SelectItem value="Cooperative Leaders">Cooperative Leaders</SelectItem>
                      <SelectItem value="Extension Workers">Extension Workers</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Group Summary */}
            <Card className="rounded-none border">
              <CardHeader className="border-b">
                <CardTitle className="text-lg">Group Summary</CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Selected Contacts</span>
                  <Badge className="rounded-none bg-primary text-primary-foreground">{selectedCount}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Parent List</span>
                  <span className="text-sm font-medium">{parentList || "—"}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Selection */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="rounded-none border">
              <CardHeader className="border-b">
                <CardTitle className="text-lg">Group Membership</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <Tabs value={membershipTab} onValueChange={setMembershipTab}>
                  <TabsList className="rounded-none w-full justify-start mb-4 bg-muted">
                    <TabsTrigger value="manual" className="rounded-none">Manual Selection</TabsTrigger>
                    <TabsTrigger value="import" className="rounded-none">Import from Excel</TabsTrigger>
                    <TabsTrigger value="segments" className="rounded-none">From Segments</TabsTrigger>
                  </TabsList>

                  <TabsContent value="manual" className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Search contacts in parent list..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10 rounded-none"
                        />
                      </div>
                      <Select>
                        <SelectTrigger className="w-40 rounded-none">
                          <SelectValue placeholder="Farm Size" />
                        </SelectTrigger>
                        <SelectContent className="rounded-none">
                          <SelectItem value="all">All Sizes</SelectItem>
                          <SelectItem value="large">Large</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="small">Small</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Table>
                      <TableHeader>
                        <TableRow className="border-b">
                          <TableHead className="w-12">
                            <Checkbox className="rounded-none" />
                          </TableHead>
                          <TableHead className="font-semibold">Phone Number</TableHead>
                          <TableHead className="font-semibold">Name</TableHead>
                          <TableHead className="font-semibold">Region</TableHead>
                          <TableHead className="font-semibold">Farm Size</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {contacts.map((contact) => (
                          <TableRow key={contact.id} className="border-b">
                            <TableCell>
                              <Checkbox 
                                checked={contact.selected}
                                onCheckedChange={() => toggleContact(contact.id)}
                                className="rounded-none"
                              />
                            </TableCell>
                            <TableCell className="font-mono text-sm">{contact.phone}</TableCell>
                            <TableCell>{contact.name}</TableCell>
                            <TableCell>{contact.region}</TableCell>
                            <TableCell>
                              <Badge className="rounded-none bg-muted text-muted-foreground">
                                {contact.farmSize}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>

                    <div className="flex items-center justify-between pt-2">
                      <div className="text-sm text-muted-foreground">
                        {selectedCount} of {contacts.length} selected
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="rounded-none" disabled>
                          <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="rounded-none bg-primary text-primary-foreground">
                          1
                        </Button>
                        <Button variant="outline" size="sm" className="rounded-none" disabled>
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="import" className="space-y-4">
                    <div className="border-2 border-dashed border-muted-foreground/25 p-8 text-center">
                      <Upload className="h-10 w-10 mx-auto text-muted-foreground mb-4" />
                      <p className="text-sm text-muted-foreground mb-2">
                        Upload an Excel file with phone numbers to add to this group
                      </p>
                      <p className="text-xs text-muted-foreground mb-4">
                        Numbers must exist in the parent contact list
                      </p>
                      <Button variant="outline" className="rounded-none">
                        Browse Files
                      </Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="segments" className="space-y-4">
                    <div className="space-y-2">
                      <Label>Select a Segment</Label>
                      <Select>
                        <SelectTrigger className="rounded-none">
                          <SelectValue placeholder="Select segment to import" />
                        </SelectTrigger>
                        <SelectContent className="rounded-none">
                          <SelectItem value="seg-001">Large Farms - Oromia (2,500 contacts)</SelectItem>
                          <SelectItem value="seg-002">AI Service Users (1,890 contacts)</SelectItem>
                          <SelectItem value="seg-003">Highland Zone Farmers (3,200 contacts)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button className="rounded-none gap-2">
                      <Plus className="h-4 w-4" />
                      Import Segment Members
                    </Button>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ContactGroupDetail;
