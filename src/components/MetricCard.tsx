import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface MetricCardProps {
  title: string;
  period: "daily" | "30-day" | "90-day";
  onNavigate?: () => void;
}

const generateMockValue = (period: "daily" | "30-day" | "90-day") => {
  if (period === "daily") {
    return Math.floor(Math.random() * 5000) + 10000;
  } else if (period === "30-day") {
    return Math.floor(Math.random() * 150000) + 300000;
  } else {
    return Math.floor(Math.random() * 450000) + 900000;
  }
};

export function MetricCard({ title, period, onNavigate }: MetricCardProps) {
  const value = generateMockValue(period);
  const periodLabel = period === "daily" ? "Daily" : period === "30-day" ? "30-Day" : "90-Day";

  return (
    <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={onNavigate}>
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="bg-secondary rounded-lg p-6 text-center">
          <p className="text-sm text-muted-foreground mb-2">{periodLabel}</p>
          <p className="text-3xl font-bold text-primary">{value.toLocaleString()}</p>
        </div>
      </CardContent>
    </Card>
  );
}
