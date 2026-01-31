import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

type KPIVariant = "primary" | "success" | "warning" | "danger";

interface KPICardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  variant?: KPIVariant;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

const variantStyles: Record<KPIVariant, { card: string; icon: string }> = {
  primary: {
    card: "kpi-card kpi-card-primary",
    icon: "text-kpi-primary",
  },
  success: {
    card: "kpi-card kpi-card-success",
    icon: "text-kpi-success",
  },
  warning: {
    card: "kpi-card kpi-card-warning",
    icon: "text-kpi-warning",
  },
  danger: {
    card: "kpi-card kpi-card-danger",
    icon: "text-kpi-danger",
  },
};

const KPICard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  variant = "primary",
  trend,
}: KPICardProps) => {
  const styles = variantStyles[variant];

  return (
    <div className={cn(styles.card, "animate-fade-in")}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground mb-1">
            {title}
          </p>
          <p className="text-3xl font-bold text-foreground">{value}</p>
          {subtitle && (
            <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
          )}
          {trend && (
            <p
              className={cn(
                "text-sm font-medium mt-2",
                trend.isPositive ? "text-success" : "text-destructive"
              )}
            >
              {trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}%{" "}
              <span className="text-muted-foreground font-normal">
                vs last period
              </span>
            </p>
          )}
        </div>
        <div className={cn("p-3 bg-muted", styles.icon)}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
};

export default KPICard;
