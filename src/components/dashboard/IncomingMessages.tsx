import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Inbox, TrendingUp } from "lucide-react";

const topKeywords = [
  { keyword: "MILK", count: 234 },
  { keyword: "PRICE", count: 189 },
  { keyword: "HELP", count: 156 },
  { keyword: "STOP", count: 87 },
  { keyword: "INFO", count: 65 },
];

const IncomingMessages = () => {
  const totalToday = 1420;
  const unreadCount = 47;

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-primary" />
            <CardTitle className="text-base font-semibold">
              Incoming Messages (MO)
            </CardTitle>
          </div>
          {unreadCount > 0 && (
            <Badge variant="destructive" className="animate-pulse">
              {unreadCount} new
            </Badge>
          )}
        </div>
        <p className="text-xs text-muted-foreground">
          Two-way communication activity
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 bg-muted/30 border border-border">
            <div className="flex items-center gap-2 mb-1">
              <Inbox className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Total Today</span>
            </div>
            <p className="text-2xl font-bold text-foreground">
              {totalToday.toLocaleString()}
            </p>
            <div className="flex items-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3 text-success" />
              <span className="text-xs text-success">+12.4% vs yesterday</span>
            </div>
          </div>
          <div className="p-3 bg-muted/30 border border-border">
            <div className="flex items-center gap-2 mb-1">
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Unread</span>
            </div>
            <p className="text-2xl font-bold text-warning">{unreadCount}</p>
            <span className="text-xs text-muted-foreground">
              Pending review
            </span>
          </div>
        </div>

        {/* Top Keywords */}
        <div>
          <p className="text-xs font-medium text-muted-foreground mb-2">
            TOP KEYWORDS RECEIVED
          </p>
          <div className="flex flex-wrap gap-2">
            {topKeywords.map((item) => (
              <Badge
                key={item.keyword}
                variant="outline"
                className="font-mono text-xs"
              >
                {item.keyword}
                <span className="ml-1 text-muted-foreground">({item.count})</span>
              </Badge>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <Button variant="outline" className="w-full gap-2">
          <Inbox className="h-4 w-4" />
          View Inbox
        </Button>
      </CardContent>
    </Card>
  );
};

export default IncomingMessages;
