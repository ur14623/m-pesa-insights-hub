import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Gavel } from "lucide-react";

export default function CourtIssue() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Court Issue
          </h1>
          <p className="text-muted-foreground mt-1">Manage court-related issues and cases</p>
        </div>

        <Card className="border-2 shadow-elegant">
          <CardHeader className="border-b bg-gradient-to-r from-primary/5 to-transparent">
            <CardTitle className="flex items-center gap-2">
              <Gavel className="h-5 w-5" />
              Court Issue Management
            </CardTitle>
            <CardDescription>View and manage court issue records</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <p className="text-muted-foreground">Court issue management functionality coming soon.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
