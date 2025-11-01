import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string;
  subtitle: string;
  icon: LucideIcon;
  trend?: string;
}

const StatsCard = ({ title, value, subtitle, icon: Icon, trend }: StatsCardProps) => {
  return (
    <Card className="shadow-[var(--shadow-card)] border-border/50 transition-[var(--transition-smooth)] hover:shadow-lg hover:scale-105">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <Icon className="h-5 w-5 text-primary" />
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold bg-[var(--gradient-primary)] bg-clip-text text-transparent">
          {value}
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          {subtitle}
        </p>
        {trend && (
          <p className="text-xs text-primary font-medium mt-2">
            {trend}
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default StatsCard;
