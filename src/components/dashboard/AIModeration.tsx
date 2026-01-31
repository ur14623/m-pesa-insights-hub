import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Brain, ShieldCheck, ShieldAlert, AlertTriangle } from "lucide-react";

interface ContentIssue {
  type: string;
  count: number;
  percentage: number;
}

const contentIssues: ContentIssue[] = [
  { type: "Inappropriate Language", count: 12, percentage: 52 },
  { type: "Policy Violation", count: 7, percentage: 30 },
  { type: "Spam Detection", count: 3, percentage: 13 },
  { type: "Personal Data", count: 1, percentage: 5 },
];

const AIModeration = () => {
  const totalReviewed = 182450;
  const blocked = 23;
  const modified = 45;
  const passRate = ((totalReviewed - blocked) / totalReviewed) * 100;

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-primary" />
          <CardTitle className="text-base font-semibold">
            AI Content Moderation
          </CardTitle>
        </div>
        <p className="text-xs text-muted-foreground">
          Automated content review summary
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-3">
          <div className="p-3 bg-muted/30 border border-border text-center">
            <ShieldCheck className="h-5 w-5 text-success mx-auto mb-1" />
            <p className="text-lg font-bold text-foreground">
              {totalReviewed.toLocaleString()}
            </p>
            <p className="text-xs text-muted-foreground">Reviewed</p>
          </div>
          <div className="p-3 bg-destructive/5 border border-destructive/20 text-center">
            <ShieldAlert className="h-5 w-5 text-destructive mx-auto mb-1" />
            <p className="text-lg font-bold text-destructive">{blocked}</p>
            <p className="text-xs text-muted-foreground">Blocked</p>
          </div>
          <div className="p-3 bg-warning/5 border border-warning/20 text-center">
            <AlertTriangle className="h-5 w-5 text-warning mx-auto mb-1" />
            <p className="text-lg font-bold text-warning">{modified}</p>
            <p className="text-xs text-muted-foreground">Modified</p>
          </div>
        </div>

        {/* Pass Rate */}
        <div className="p-3 bg-success/5 border border-success/20">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Content Pass Rate</span>
            <Badge className="bg-success/10 text-success border-success/20">
              {passRate.toFixed(2)}%
            </Badge>
          </div>
          <Progress value={passRate} className="h-2" />
        </div>

        {/* Common Issues */}
        <div>
          <p className="text-xs font-medium text-muted-foreground mb-2">
            MOST COMMON CONTENT ISSUES
          </p>
          <div className="space-y-2">
            {contentIssues.map((issue) => (
              <div
                key={issue.type}
                className="flex items-center justify-between p-2 bg-muted/20 border border-border"
              >
                <div className="flex items-center gap-2">
                  <div
                    className="w-2 h-2 bg-destructive"
                    style={{
                      opacity: issue.percentage / 100 + 0.3,
                    }}
                  />
                  <span className="text-sm">{issue.type}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{issue.count}</span>
                  <span className="text-xs text-muted-foreground">
                    ({issue.percentage}%)
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIModeration;
