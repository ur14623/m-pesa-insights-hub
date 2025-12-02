import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Moon } from "lucide-react";

export default function DormantList() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Dormant List
          </h1>
          <p className="text-muted-foreground mt-1">Manage dormant accounts and users</p>
        </div>

        <Card className="border-2 shadow-elegant">
          <CardHeader className="border-b bg-gradient-to-r from-primary/5 to-transparent">
            <CardTitle className="flex items-center gap-2">
              <Moon className="h-5 w-5" />
              Dormant Account Management
            </CardTitle>
            <CardDescription>View and manage dormant user records</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <p className="text-muted-foreground">Dormant list management functionality coming soon.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
