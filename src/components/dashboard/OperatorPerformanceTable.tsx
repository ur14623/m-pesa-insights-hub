import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown } from "lucide-react";

interface OperatorData {
  name: string;
  messagesSent: number;
  deliveryRate: number;
  avgDeliveryTime: string;
  failureRate: number;
  trend: "up" | "down" | "stable";
}

const operators: OperatorData[] = [
  {
    name: "Ethio Telecom",
    messagesSent: 142350,
    deliveryRate: 98.2,
    avgDeliveryTime: "1.2s",
    failureRate: 1.8,
    trend: "up",
  },
  {
    name: "Safaricom Ethiopia",
    messagesSent: 40100,
    deliveryRate: 96.5,
    avgDeliveryTime: "1.8s",
    failureRate: 3.5,
    trend: "stable",
  },
];

const OperatorPerformanceTable = () => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold">
          Operator Performance
        </CardTitle>
        <p className="text-xs text-muted-foreground">
          Real-time delivery statistics by network operator
        </p>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Operator</TableHead>
              <TableHead className="text-right">Messages Sent</TableHead>
              <TableHead className="text-right">Delivery Rate</TableHead>
              <TableHead className="text-right">Avg. Time</TableHead>
              <TableHead className="text-right">Failure Rate</TableHead>
              <TableHead className="text-center">Trend</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {operators.map((operator) => (
              <TableRow key={operator.name}>
                <TableCell className="font-medium">{operator.name}</TableCell>
                <TableCell className="text-right">
                  {operator.messagesSent.toLocaleString()}
                </TableCell>
                <TableCell className="text-right">
                  <Badge
                    variant={
                      operator.deliveryRate >= 98
                        ? "default"
                        : operator.deliveryRate >= 95
                          ? "secondary"
                          : "destructive"
                    }
                    className="font-mono"
                  >
                    {operator.deliveryRate}%
                  </Badge>
                </TableCell>
                <TableCell className="text-right font-mono">
                  {operator.avgDeliveryTime}
                </TableCell>
                <TableCell className="text-right">
                  <span
                    className={
                      operator.failureRate <= 2
                        ? "text-success"
                        : operator.failureRate <= 5
                          ? "text-warning"
                          : "text-destructive"
                    }
                  >
                    {operator.failureRate}%
                  </span>
                </TableCell>
                <TableCell className="text-center">
                  {operator.trend === "up" ? (
                    <TrendingUp className="h-4 w-4 text-success inline" />
                  ) : operator.trend === "down" ? (
                    <TrendingDown className="h-4 w-4 text-destructive inline" />
                  ) : (
                    <span className="text-muted-foreground">—</span>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default OperatorPerformanceTable;
