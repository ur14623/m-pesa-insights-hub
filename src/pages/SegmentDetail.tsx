import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
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
  Plus,
  Trash2,
  RefreshCcw,
  Users,
} from "lucide-react";

interface Rule {
  id: string;
  field: string;
  operator: string;
  value: string;
  logic: "AND" | "OR";
}

const SegmentDetail = () => {
  const { id } = useParams();
  const isNew = id === "new";

  const [segmentName, setSegmentName] = useState(isNew ? "" : "Large Farms - Ethio Telecom");
  const [description, setDescription] = useState(isNew ? "" : "Farmers with large operations using Ethio Telecom network");
  const [sourceLists, setSourceLists] = useState<string[]>(isNew ? [] : ["Dairy Farmers - Oromia", "Dairy Farmers - Amhara"]);
  const [rules, setRules] = useState<Rule[]>(
    isNew
      ? [{ id: "1", field: "", operator: "", value: "", logic: "AND" }]
      : [
          { id: "1", field: "farm_size", operator: "equals", value: "Large", logic: "AND" },
          { id: "2", field: "operator", operator: "equals", value: "Ethio Telecom", logic: "AND" },
        ]
  );
  const [estimatedCount, setEstimatedCount] = useState(isNew ? 0 : 4200);

  const addRule = () => {
    setRules([
      ...rules,
      { id: Date.now().toString(), field: "", operator: "", value: "", logic: "AND" },
    ]);
  };

  const removeRule = (ruleId: string) => {
    if (rules.length > 1) {
      setRules(rules.filter((r) => r.id !== ruleId));
    }
  };

  const updateRule = (ruleId: string, field: keyof Rule, value: string) => {
    setRules(rules.map((r) => (r.id === ruleId ? { ...r, [field]: value } : r)));
  };

  const toggleSourceList = (list: string) => {
    setSourceLists((prev) =>
      prev.includes(list) ? prev.filter((l) => l !== list) : [...prev, list]
    );
  };

  const refreshEstimate = () => {
    // Simulate count calculation
    setEstimatedCount(Math.floor(Math.random() * 5000) + 1000);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-sm text-muted-foreground mb-1">
              Dashboard &gt; Contacts &gt; Segments &gt; {isNew ? "Create New" : "Edit"}
            </div>
            <div className="flex items-center gap-3">
              <Link to="/contacts/segments">
                <Button variant="ghost" size="icon" className="rounded-none">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <h1 className="text-2xl font-semibold text-foreground">
                {isNew ? "Create New Segment" : "Edit Segment"}
              </h1>
            </div>
          </div>
          <div className="flex gap-2">
            <Link to="/contacts/segments">
              <Button variant="outline" className="rounded-none">
                Cancel
              </Button>
            </Link>
            <Button className="rounded-none gap-2 bg-primary">
              <Save className="h-4 w-4" />
              {isNew ? "Create Segment" : "Save Changes"}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Segment Details */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="rounded-none border">
              <CardHeader className="border-b">
                <CardTitle className="text-lg">Segment Details</CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="segmentName">Segment Name *</Label>
                  <Input
                    id="segmentName"
                    value={segmentName}
                    onChange={(e) => setSegmentName(e.target.value)}
                    placeholder="Enter segment name"
                    className="rounded-none"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter segment description"
                    className="rounded-none min-h-[80px]"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Source Lists */}
            <Card className="rounded-none border">
              <CardHeader className="border-b">
                <CardTitle className="text-lg">Source Contact Lists</CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-3">
                {["Dairy Farmers - Oromia", "Dairy Farmers - Amhara", "Cooperative Leaders", "Extension Workers"].map(
                  (list) => (
                    <div key={list} className="flex items-center space-x-3">
                      <Checkbox
                        id={list}
                        checked={sourceLists.includes(list)}
                        onCheckedChange={() => toggleSourceList(list)}
                        className="rounded-none"
                      />
                      <Label htmlFor={list} className="text-sm font-normal cursor-pointer">
                        {list}
                      </Label>
                    </div>
                  )
                )}
              </CardContent>
            </Card>

            {/* Estimated Count */}
            <Card className="rounded-none border">
              <CardHeader className="border-b">
                <CardTitle className="text-lg">Segment Preview</CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    <span className="text-sm text-muted-foreground">Estimated Contacts</span>
                  </div>
                  <Badge className="rounded-none bg-primary text-primary-foreground text-lg px-3 py-1">
                    {estimatedCount.toLocaleString()}
                  </Badge>
                </div>
                <Button
                  onClick={refreshEstimate}
                  variant="outline"
                  className="rounded-none w-full gap-2"
                >
                  <RefreshCcw className="h-4 w-4" />
                  Refresh Estimate
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Rule Builder */}
          <div className="lg:col-span-2">
            <Card className="rounded-none border">
              <CardHeader className="border-b">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Rule Builder</CardTitle>
                  <Button onClick={addRule} variant="outline" className="rounded-none gap-2">
                    <Plus className="h-4 w-4" />
                    Add Rule
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-4 space-y-4">
                <p className="text-sm text-muted-foreground">
                  Define rules to automatically filter contacts into this segment. Rules are
                  evaluated in real-time.
                </p>

                {rules.map((rule, index) => (
                  <div key={rule.id} className="space-y-3">
                    {index > 0 && (
                      <div className="flex items-center gap-4">
                        <Select
                          value={rule.logic}
                          onValueChange={(value) =>
                            updateRule(rule.id, "logic", value as "AND" | "OR")
                          }
                        >
                          <SelectTrigger className="w-24 rounded-none">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="rounded-none">
                            <SelectItem value="AND">AND</SelectItem>
                            <SelectItem value="OR">OR</SelectItem>
                          </SelectContent>
                        </Select>
                        <div className="flex-1 border-t border-muted" />
                      </div>
                    )}

                    <div className="grid grid-cols-12 gap-3 p-4 bg-muted/30 border">
                      <div className="col-span-3">
                        <Label className="text-xs text-muted-foreground mb-1 block">Field</Label>
                        <Select
                          value={rule.field}
                          onValueChange={(value) => updateRule(rule.id, "field", value)}
                        >
                          <SelectTrigger className="rounded-none">
                            <SelectValue placeholder="Select field" />
                          </SelectTrigger>
                          <SelectContent className="rounded-none">
                            <SelectItem value="region">Region</SelectItem>
                            <SelectItem value="language">Language</SelectItem>
                            <SelectItem value="farm_size">Farm Size</SelectItem>
                            <SelectItem value="operator">Operator</SelectItem>
                            <SelectItem value="subscription_status">Subscription Status</SelectItem>
                            <SelectItem value="custom_tag">Custom Tag</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="col-span-3">
                        <Label className="text-xs text-muted-foreground mb-1 block">Operator</Label>
                        <Select
                          value={rule.operator}
                          onValueChange={(value) => updateRule(rule.id, "operator", value)}
                        >
                          <SelectTrigger className="rounded-none">
                            <SelectValue placeholder="Select operator" />
                          </SelectTrigger>
                          <SelectContent className="rounded-none">
                            <SelectItem value="equals">Equals</SelectItem>
                            <SelectItem value="not_equals">Not Equals</SelectItem>
                            <SelectItem value="contains">Contains</SelectItem>
                            <SelectItem value="in">In List</SelectItem>
                            <SelectItem value="not_in">Not In List</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="col-span-5">
                        <Label className="text-xs text-muted-foreground mb-1 block">Value</Label>
                        {rule.field === "region" ? (
                          <Select
                            value={rule.value}
                            onValueChange={(value) => updateRule(rule.id, "value", value)}
                          >
                            <SelectTrigger className="rounded-none">
                              <SelectValue placeholder="Select value" />
                            </SelectTrigger>
                            <SelectContent className="rounded-none">
                              <SelectItem value="Oromia">Oromia</SelectItem>
                              <SelectItem value="Amhara">Amhara</SelectItem>
                              <SelectItem value="Tigray">Tigray</SelectItem>
                              <SelectItem value="SNNPR">SNNPR</SelectItem>
                              <SelectItem value="Highland">Highland</SelectItem>
                            </SelectContent>
                          </Select>
                        ) : rule.field === "farm_size" ? (
                          <Select
                            value={rule.value}
                            onValueChange={(value) => updateRule(rule.id, "value", value)}
                          >
                            <SelectTrigger className="rounded-none">
                              <SelectValue placeholder="Select value" />
                            </SelectTrigger>
                            <SelectContent className="rounded-none">
                              <SelectItem value="Small">Small</SelectItem>
                              <SelectItem value="Medium">Medium</SelectItem>
                              <SelectItem value="Large">Large</SelectItem>
                            </SelectContent>
                          </Select>
                        ) : rule.field === "operator" ? (
                          <Select
                            value={rule.value}
                            onValueChange={(value) => updateRule(rule.id, "value", value)}
                          >
                            <SelectTrigger className="rounded-none">
                              <SelectValue placeholder="Select value" />
                            </SelectTrigger>
                            <SelectContent className="rounded-none">
                              <SelectItem value="Ethio Telecom">Ethio Telecom</SelectItem>
                              <SelectItem value="Safaricom Ethiopia">Safaricom Ethiopia</SelectItem>
                            </SelectContent>
                          </Select>
                        ) : rule.field === "language" ? (
                          <Select
                            value={rule.value}
                            onValueChange={(value) => updateRule(rule.id, "value", value)}
                          >
                            <SelectTrigger className="rounded-none">
                              <SelectValue placeholder="Select value" />
                            </SelectTrigger>
                            <SelectContent className="rounded-none">
                              <SelectItem value="Amharic">Amharic</SelectItem>
                              <SelectItem value="Oromo">Oromo</SelectItem>
                              <SelectItem value="Tigrinya">Tigrinya</SelectItem>
                              <SelectItem value="English">English</SelectItem>
                            </SelectContent>
                          </Select>
                        ) : rule.field === "subscription_status" ? (
                          <Select
                            value={rule.value}
                            onValueChange={(value) => updateRule(rule.id, "value", value)}
                          >
                            <SelectTrigger className="rounded-none">
                              <SelectValue placeholder="Select value" />
                            </SelectTrigger>
                            <SelectContent className="rounded-none">
                              <SelectItem value="Active">Active</SelectItem>
                              <SelectItem value="Inactive">Inactive</SelectItem>
                              <SelectItem value="Pending">Pending</SelectItem>
                            </SelectContent>
                          </Select>
                        ) : (
                          <Input
                            value={rule.value}
                            onChange={(e) => updateRule(rule.id, "value", e.target.value)}
                            placeholder="Enter value"
                            className="rounded-none"
                          />
                        )}
                      </div>

                      <div className="col-span-1 flex items-end">
                        <Button
                          onClick={() => removeRule(rule.id)}
                          variant="ghost"
                          size="icon"
                          className="rounded-none text-muted-foreground hover:text-destructive"
                          disabled={rules.length === 1}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="pt-4 border-t">
                  <h4 className="text-sm font-medium mb-2">Rule Summary</h4>
                  <div className="bg-muted/50 p-3 border font-mono text-sm">
                    {rules
                      .filter((r) => r.field && r.operator && r.value)
                      .map((r, i) => (
                        <span key={r.id}>
                          {i > 0 && <span className="text-primary font-bold"> {r.logic} </span>}
                          <span>
                            {r.field} {r.operator} "{r.value}"
                          </span>
                        </span>
                      ))}
                    {rules.every((r) => !r.field || !r.operator || !r.value) && (
                      <span className="text-muted-foreground">No rules defined</span>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SegmentDetail;
