import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const data = [
  { time: "00:00", mt: 4200, mo: 280 },
  { time: "02:00", mt: 2100, mo: 150 },
  { time: "04:00", mt: 1800, mo: 120 },
  { time: "06:00", mt: 8500, mo: 420 },
  { time: "08:00", mt: 15200, mo: 890 },
  { time: "10:00", mt: 18900, mo: 1200 },
  { time: "12:00", mt: 16400, mo: 980 },
  { time: "14:00", mt: 14200, mo: 850 },
  { time: "16:00", mt: 17800, mo: 1100 },
  { time: "18:00", mt: 12500, mo: 720 },
  { time: "20:00", mt: 8900, mo: 450 },
  { time: "22:00", mt: 5200, mo: 320 },
];

const MessageVolumeChart = () => {
  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold">
          Message Volume Over Time
        </CardTitle>
        <p className="text-xs text-muted-foreground">
          MT (Outbound) vs MO (Inbound) messages - Last 24 hours
        </p>
      </CardHeader>
      <CardContent>
        <div className="h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis
                dataKey="time"
                tick={{ fontSize: 11 }}
                tickLine={false}
                axisLine={false}
                className="text-muted-foreground"
              />
              <YAxis
                tick={{ fontSize: 11 }}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) =>
                  value >= 1000 ? `${(value / 1000).toFixed(0)}K` : value
                }
                className="text-muted-foreground"
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "0px",
                }}
                labelStyle={{ color: "hsl(var(--foreground))" }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="mt"
                name="MT (Sent)"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="mo"
                name="MO (Received)"
                stroke="hsl(var(--success))"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default MessageVolumeChart;
