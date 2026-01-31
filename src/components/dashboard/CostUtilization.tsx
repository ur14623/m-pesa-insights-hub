import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { DollarSign, TrendingUp, TrendingDown, AlertTriangle } from "lucide-react";

interface CostBreakdown {
  name: string;
  amount: number;
  percentage: number;
}

const costByOperator: CostBreakdown[] = [
  { name: "Ethio Telecom", amount: 89500, percentage: 71.6 },
  { name: "Safaricom Ethiopia", amount: 35500, percentage: 28.4 },
];

const costBySenderId: CostBreakdown[] = [
  { name: "DAIRY-INFO", amount: 65000, percentage: 52 },
  { name: "FARM-ALERT", amount: 38000, percentage: 30.4 },
  { name: "MKT-PRICE", amount: 22000, percentage: 17.6 },
];

const CostUtilization = () => {
  const totalCost = 125000;
  const costTrend = 8.5; // percentage increase
  const creditBalance = 450000;
  const creditUsed = 125000;
  const creditPercentage = (creditUsed / (creditBalance + creditUsed)) * 100;
  const warningThreshold = 80;

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <DollarSign className="h-5 w-5 text-primary" />
          <CardTitle className="text-base font-semibold">
            Cost & Credit Utilization
          </CardTitle>
        </div>
        <p className="text-xs text-muted-foreground">
          Financial overview for current period
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Total Cost & Credit Balance */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 bg-muted/30 border border-border">
            <p className="text-xs text-muted-foreground mb-1">Total Cost (MTD)</p>
            <p className="text-2xl font-bold text-foreground">
              ETB {(totalCost / 1000).toFixed(0)}K
            </p>
            <div className="flex items-center gap-1 mt-1">
              {costTrend > 0 ? (
                <>
                  <TrendingUp className="h-3 w-3 text-destructive" />
                  <span className="text-xs text-destructive">
                    +{costTrend}% vs last month
                  </span>
                </>
              ) : (
                <>
                  <TrendingDown className="h-3 w-3 text-success" />
                  <span className="text-xs text-success">
                    {costTrend}% vs last month
                  </span>
                </>
              )}
            </div>
          </div>
          <div className="p-3 bg-muted/30 border border-border">
            <p className="text-xs text-muted-foreground mb-1">Credit Balance</p>
            <p className="text-2xl font-bold text-success">
              ETB {(creditBalance / 1000).toFixed(0)}K
            </p>
            <div className="flex items-center gap-1 mt-1">
              {creditPercentage >= warningThreshold ? (
                <Badge variant="destructive" className="text-xs">
                  <AlertTriangle className="h-3 w-3 mr-1" />
                  Low Balance
                </Badge>
              ) : (
                <span className="text-xs text-muted-foreground">
                  {(100 - creditPercentage).toFixed(1)}% remaining
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Credit Usage Progress */}
        <div>
          <div className="flex justify-between text-xs mb-2">
            <span className="text-muted-foreground">Credit Usage</span>
            <span className="font-medium">{creditPercentage.toFixed(1)}%</span>
          </div>
          <Progress value={creditPercentage} className="h-2" />
        </div>

        {/* Cost by Operator */}
        <div>
          <p className="text-xs font-medium text-muted-foreground mb-2">
            COST BY OPERATOR
          </p>
          <div className="space-y-2">
            {costByOperator.map((item) => (
              <div
                key={item.name}
                className="flex items-center justify-between p-2 bg-muted/20 border border-border"
              >
                <span className="text-sm">{item.name}</span>
                <div className="text-right">
                  <span className="text-sm font-medium">
                    ETB {item.amount.toLocaleString()}
                  </span>
                  <span className="text-xs text-muted-foreground ml-2">
                    ({item.percentage}%)
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cost by Sender ID */}
        <div>
          <p className="text-xs font-medium text-muted-foreground mb-2">
            COST BY SENDER ID
          </p>
          <div className="space-y-2">
            {costBySenderId.map((item) => (
              <div key={item.name} className="flex items-center gap-3">
                <div className="flex-1">
                  <div className="flex justify-between text-xs mb-1">
                    <span>{item.name}</span>
                    <span>ETB {item.amount.toLocaleString()}</span>
                  </div>
                  <Progress value={item.percentage} className="h-1.5" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CostUtilization;
