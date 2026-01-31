import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Users,
  Upload,
  Search,
  CheckCircle,
  XCircle,
  AlertCircle,
  FileSpreadsheet,
} from "lucide-react";

type DeliveryMode = "single" | "bulk" | "scheduled";

interface RecipientSelectionProps {
  deliveryMode: DeliveryMode;
  manualNumbers: string;
  onManualNumbersChange: (value: string) => void;
  selectedGroups: string[];
  onSelectedGroupsChange: (groups: string[]) => void;
}

const contactGroups = [
  { id: "all", name: "All Contacts", count: 12450 },
  { id: "oromia", name: "Oromia Region", count: 4230 },
  { id: "amhara", name: "Amhara Region", count: 3180 },
  { id: "snnpr", name: "SNNPR", count: 2840 },
  { id: "tigray", name: "Tigray Region", count: 1200 },
  { id: "large-farms", name: "Large-Scale Farms", count: 890 },
  { id: "cooperatives", name: "Dairy Cooperatives", count: 456 },
];

const sampleContacts = [
  { id: 1, name: "Abebe Tadesse", phone: "+251911***123", region: "Oromia", group: "Large-Scale" },
  { id: 2, name: "Fatuma Ibrahim", phone: "+251922***456", region: "Amhara", group: "Cooperative" },
  { id: 3, name: "Kidist Haile", phone: "+251933***789", region: "SNNPR", group: "Small-Scale" },
  { id: 4, name: "Yohannes Bekele", phone: "+251944***012", region: "Tigray", group: "Cooperative" },
];

export function RecipientSelection({
  deliveryMode,
  manualNumbers,
  onManualNumbersChange,
  selectedGroups,
  onSelectedGroupsChange,
}: RecipientSelectionProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadPreview, setUploadPreview] = useState<{ valid: number; invalid: number; duplicates: number } | null>(null);

  const parseManualNumbers = () => {
    const numbers = manualNumbers
      .split(/[,\n]/)
      .map((n) => n.trim())
      .filter((n) => n.length > 0);
    const valid = numbers.filter((n) => /^\+?[0-9]{10,13}$/.test(n));
    const invalid = numbers.filter((n) => !/^\+?[0-9]{10,13}$/.test(n));
    const unique = [...new Set(valid)];
    return { total: numbers.length, valid: unique.length, invalid: invalid.length, duplicates: valid.length - unique.length };
  };

  const numberStats = parseManualNumbers();

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      // Simulate parsing
      setTimeout(() => {
        setUploadPreview({ valid: 234, invalid: 12, duplicates: 5 });
      }, 500);
    }
  };

  const toggleGroup = (groupId: string) => {
    if (selectedGroups.includes(groupId)) {
      onSelectedGroupsChange(selectedGroups.filter((g) => g !== groupId));
    } else {
      onSelectedGroupsChange([...selectedGroups, groupId]);
    }
  };

  const totalSelectedRecipients = selectedGroups.reduce((acc, groupId) => {
    const group = contactGroups.find((g) => g.id === groupId);
    return acc + (group?.count || 0);
  }, 0);

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-foreground flex items-center gap-2">
        <Users className="h-4 w-4" />
        Recipient Selection
      </h3>

      <Tabs defaultValue={deliveryMode === "single" ? "manual" : "groups"} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="manual">Manual Entry</TabsTrigger>
          <TabsTrigger value="groups">Contact Groups</TabsTrigger>
          <TabsTrigger value="upload">Excel Upload</TabsTrigger>
        </TabsList>

        {/* Manual Entry */}
        <TabsContent value="manual" className="space-y-3">
          <Textarea
            placeholder="Enter phone numbers (comma or line-separated)&#10;Example:&#10;+251911123456&#10;+251922234567"
            value={manualNumbers}
            onChange={(e) => onManualNumbersChange(e.target.value)}
            className="min-h-[120px] font-mono text-sm"
          />
          {manualNumbers && (
            <div className="flex flex-wrap gap-3 text-sm">
              <div className="flex items-center gap-1">
                <CheckCircle className="h-4 w-4 text-success" />
                <span>{numberStats.valid} valid</span>
              </div>
              <div className="flex items-center gap-1">
                <XCircle className="h-4 w-4 text-destructive" />
                <span>{numberStats.invalid} invalid</span>
              </div>
              <div className="flex items-center gap-1">
                <AlertCircle className="h-4 w-4 text-warning" />
                <span>{numberStats.duplicates} duplicates</span>
              </div>
            </div>
          )}
        </TabsContent>

        {/* Contact Groups */}
        <TabsContent value="groups" className="space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search groups or contacts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>

          <ScrollArea className="h-[200px] border">
            <div className="p-2 space-y-1">
              {contactGroups
                .filter((g) => g.name.toLowerCase().includes(searchQuery.toLowerCase()))
                .map((group) => (
                  <div
                    key={group.id}
                    className="flex items-center gap-3 p-2 hover:bg-muted/50 cursor-pointer"
                    onClick={() => toggleGroup(group.id)}
                  >
                    <Checkbox checked={selectedGroups.includes(group.id)} />
                    <div className="flex-1">
                      <span className="text-sm font-medium">{group.name}</span>
                    </div>
                    <Badge variant="secondary">{group.count.toLocaleString()}</Badge>
                  </div>
                ))}
            </div>
          </ScrollArea>

          {selectedGroups.length > 0 && (
            <div className="p-3 bg-muted/50 border">
              <div className="text-sm">
                <span className="text-muted-foreground">Selected: </span>
                <span className="font-medium">{selectedGroups.length} groups</span>
                <span className="text-muted-foreground"> • </span>
                <span className="font-medium text-primary">{totalSelectedRecipients.toLocaleString()} recipients</span>
              </div>
            </div>
          )}
        </TabsContent>

        {/* Excel Upload */}
        <TabsContent value="upload" className="space-y-3">
          <div className="border-2 border-dashed p-6 text-center">
            <FileSpreadsheet className="h-10 w-10 mx-auto text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground mb-3">
              Upload Excel (.xlsx) or CSV file with phone numbers
            </p>
            <Input
              type="file"
              accept=".xlsx,.xls,.csv"
              onChange={handleFileUpload}
              className="max-w-xs mx-auto"
            />
          </div>

          {uploadedFile && (
            <div className="p-3 bg-muted/50 border">
              <div className="flex items-center gap-2 mb-2">
                <FileSpreadsheet className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">{uploadedFile.name}</span>
              </div>
              {uploadPreview && (
                <div className="flex flex-wrap gap-3 text-sm">
                  <div className="flex items-center gap-1">
                    <CheckCircle className="h-4 w-4 text-success" />
                    <span>{uploadPreview.valid} valid</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <XCircle className="h-4 w-4 text-destructive" />
                    <span>{uploadPreview.invalid} invalid</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <AlertCircle className="h-4 w-4 text-warning" />
                    <span>{uploadPreview.duplicates} duplicates</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {uploadPreview && (
            <div className="border">
              <div className="p-2 bg-muted text-sm font-medium">Preview (First 5 rows)</div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Region</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sampleContacts.slice(0, 4).map((contact) => (
                    <TableRow key={contact.id}>
                      <TableCell>{contact.name}</TableCell>
                      <TableCell className="font-mono">{contact.phone}</TableCell>
                      <TableCell>{contact.region}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-success border-success">
                          Valid
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Recipient Summary */}
      <div className="p-4 bg-primary/5 border border-primary/20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-foreground">
              {(numberStats.valid + totalSelectedRecipients + (uploadPreview?.valid || 0)).toLocaleString()}
            </div>
            <div className="text-xs text-muted-foreground">Total Recipients</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-success">
              {(numberStats.valid + totalSelectedRecipients + (uploadPreview?.valid || 0)).toLocaleString()}
            </div>
            <div className="text-xs text-muted-foreground">Valid</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-destructive">
              {(numberStats.invalid + (uploadPreview?.invalid || 0)).toLocaleString()}
            </div>
            <div className="text-xs text-muted-foreground">Excluded</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-foreground">
              {Math.ceil((numberStats.valid + totalSelectedRecipients + (uploadPreview?.valid || 0)) * 1.2)}
            </div>
            <div className="text-xs text-muted-foreground">Est. SMS Segments</div>
          </div>
        </div>
      </div>
    </div>
  );
}
