import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, User, Activity, Clock } from "lucide-react";

interface TopUser {
  name: string;
  role: string;
  messagesSent: number;
}

interface AdminAction {
  user: string;
  action: string;
  time: string;
}

const topUsers: TopUser[] = [
  { name: "Abebe Kebede", role: "Operator", messagesSent: 45230 },
  { name: "Sara Hailu", role: "Admin", messagesSent: 32150 },
  { name: "Dawit Mengistu", role: "Operator", messagesSent: 28900 },
  { name: "Hana Tesfaye", role: "Operator", messagesSent: 24100 },
  { name: "Yonas Bekele", role: "Supervisor", messagesSent: 18500 },
];

const recentActions: AdminAction[] = [
  { user: "Sara Hailu", action: "Updated routing rules", time: "5 min ago" },
  { user: "Admin System", action: "Approved Sender ID: FARM-ALERT", time: "1 hour ago" },
  { user: "Dawit Mengistu", action: "Exported delivery report", time: "2 hours ago" },
];

const UserActivity = () => {
  const activeUsers = 12;

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            <CardTitle className="text-base font-semibold">
              User Activity
            </CardTitle>
          </div>
          <Badge variant="outline" className="gap-1">
            <span className="w-2 h-2 bg-success rounded-full animate-pulse" />
            {activeUsers} online
          </Badge>
        </div>
        <p className="text-xs text-muted-foreground">
          User engagement and administrative actions
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Top Users by Messages Sent */}
        <div>
          <p className="text-xs font-medium text-muted-foreground mb-2">
            TOP USERS BY MESSAGES SENT
          </p>
          <div className="space-y-2">
            {topUsers.map((user, index) => (
              <div
                key={user.name}
                className="flex items-center justify-between p-2 bg-muted/20 border border-border"
              >
                <div className="flex items-center gap-3">
                  <span className="w-5 h-5 flex items-center justify-center text-xs font-bold bg-primary/10 text-primary">
                    {index + 1}
                  </span>
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">{user.name}</p>
                      <p className="text-xs text-muted-foreground">{user.role}</p>
                    </div>
                  </div>
                </div>
                <span className="text-sm font-mono font-medium">
                  {user.messagesSent.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Administrative Actions */}
        <div className="pt-3 border-t border-border">
          <p className="text-xs font-medium text-muted-foreground mb-2">
            RECENT ADMINISTRATIVE ACTIONS
          </p>
          <div className="space-y-2">
            {recentActions.map((action, index) => (
              <div
                key={index}
                className="flex items-start gap-2 p-2 bg-muted/10 border border-border"
              >
                <Activity className="h-4 w-4 text-primary mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm">
                    <span className="font-medium">{action.user}</span>
                    <span className="text-muted-foreground"> — {action.action}</span>
                  </p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                    <Clock className="h-3 w-3" />
                    {action.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserActivity;
