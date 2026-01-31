import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, FileText, Shield, Database, Clock } from "lucide-react";

interface ComplianceItem {
  name: string;
  status: "compliant" | "warning" | "non-compliant";
  description: string;
}

const complianceItems: ComplianceItem[] = [
  {
    name: "Audit Logging",
    status: "compliant",
    description: "All system activities are being recorded",
  },
  {
    name: "Data Retention Policy",
    status: "compliant",
    description: "90-day retention with automatic archival",
  },
  {
    name: "Consent Compliance",
    status: "compliant",
    description: "All recipients have valid opt-in consent",
  },
  {
    name: "GDPR Alignment",
    status: "compliant",
    description: "Personal data handling meets standards",
  },
];

const ComplianceStatus = () => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "compliant":
        return (
          <Badge className="bg-success/10 text-success border-success/20 gap-1">
            <CheckCircle className="h-3 w-3" />
            Compliant
          </Badge>
        );
      case "warning":
        return (
          <Badge className="bg-warning/10 text-warning border-warning/20">
            Review Needed
          </Badge>
        );
      case "non-compliant":
        return (
          <Badge variant="destructive">Non-Compliant</Badge>
        );
      default:
        return null;
    }
  };

  const getIcon = (name: string) => {
    switch (name) {
      case "Audit Logging":
        return <FileText className="h-4 w-4 text-muted-foreground" />;
      case "Data Retention Policy":
        return <Database className="h-4 w-4 text-muted-foreground" />;
      case "Consent Compliance":
        return <Shield className="h-4 w-4 text-muted-foreground" />;
      default:
        return <CheckCircle className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const allCompliant = complianceItems.every((item) => item.status === "compliant");

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            <CardTitle className="text-base font-semibold">
              Compliance & Audit
            </CardTitle>
          </div>
          {allCompliant && (
            <Badge className="bg-success/10 text-success border-success/20">
              All Clear
            </Badge>
          )}
        </div>
        <p className="text-xs text-muted-foreground">
          Regulatory compliance and audit status
        </p>
      </CardHeader>
      <CardContent className="space-y-3">
        {complianceItems.map((item) => (
          <div
            key={item.name}
            className="flex items-center justify-between p-3 bg-muted/20 border border-border"
          >
            <div className="flex items-center gap-3">
              {getIcon(item.name)}
              <div>
                <p className="text-sm font-medium">{item.name}</p>
                <p className="text-xs text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </div>
            {getStatusBadge(item.status)}
          </div>
        ))}

        {/* Last Audit Info */}
        <div className="pt-3 border-t border-border">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>Last Audit Review</span>
            </div>
            <span className="font-medium">Jan 15, 2026</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ComplianceStatus;
