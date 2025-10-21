import { LucideIcon, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";

interface MetricCardProps {
  title: string;
  count: number;
  change?: number;
  icon: LucideIcon;
}

export const MetricCard = ({ title, count, change, icon: Icon }: MetricCardProps) => (
  <Card className="p-6">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm text-muted-foreground mb-1">{title}</p>
        <p className="text-3xl font-bold">{count}</p>
        {change !== undefined && (
          <div className="flex items-center gap-1 mt-2">
            <TrendingUp className="h-4 w-4 text-green-500" />
            <span className="text-sm font-medium text-green-500">+{change}%</span>
          </div>
        )}
      </div>
      <div className="p-3 bg-primary/10 rounded-lg">
        <Icon className="h-6 w-6 text-primary" />
      </div>
    </div>
  </Card>
);
