import { Card, CardContent } from "@/components/ui/card";
import { FileText, Zap, Database, Clock, AlertTriangle, Lightbulb, Shield, Activity } from "lucide-react";
import { AnalyticsSnapshot, PharmaMetrics } from "@/types/knowledge";
import { Skeleton } from "@/components/ui/skeleton";

interface OverviewStatsProps {
  analytics: AnalyticsSnapshot | PharmaMetrics | undefined;
  isLoading?: boolean;
  isPharmaMode?: boolean;
}

export const OverviewStats = ({ analytics, isLoading, isPharmaMode }: OverviewStatsProps) => {
  const pharmaStats = isPharmaMode && analytics && 'competitiveThreats' in analytics ? [
    {
      label: "Competitive Threats Detected",
      value: analytics.competitiveThreats,
      icon: AlertTriangle,
      trend: "12 new this month",
      color: "text-destructive",
    },
    {
      label: "Pipeline Opportunities",
      value: analytics.pipelineOpportunities,
      icon: Lightbulb,
      trend: "4 high-priority targets",
      color: "text-amber-500",
    },
    {
      label: "Patents Monitored",
      value: analytics.patentsMonitored,
      icon: Shield,
      trend: "8 new filings detected",
      color: "text-blue-500",
    },
    {
      label: "Market Signals",
      value: analytics.marketSignals,
      icon: Activity,
      trend: "3 regulatory updates",
      color: "text-green-500",
    },
  ] : null;

  const researcherStats = !isPharmaMode && analytics && 'totalPapersProcessed' in analytics ? [
    {
      label: "Papers Processed",
      value: analytics.totalPapersProcessed,
      icon: FileText,
      trend: "+12% vs last month",
      color: "text-blue-500",
    },
    {
      label: "Workflows Executed",
      value: analytics.workflowsExecuted,
      icon: Zap,
      trend: "+5 this week",
      color: "text-green-500",
    },
    {
      label: "Sources Queried",
      value: analytics.dataSourcesQueried,
      icon: Database,
      trend: "4 active",
      color: "text-purple-500",
    },
    {
      label: "Time Saved",
      value: `${analytics.timeSavedHours}h`,
      icon: Clock,
      trend: "Estimated",
      color: "text-orange-500",
    },
  ] : null;

  const stats = pharmaStats || researcherStats || [];

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <Skeleton className="h-12 w-12 mb-4" />
              <Skeleton className="h-8 w-20 mb-2" />
              <Skeleton className="h-4 w-32 mb-1" />
              <Skeleton className="h-3 w-24" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.label} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-lg bg-muted ${stat.color}`}>
                  <Icon className="h-6 w-6" />
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-3xl font-bold">{stat.value}</p>
                <p className="text-sm font-medium text-foreground">{stat.label}</p>
                <p className="text-xs text-muted-foreground">{stat.trend}</p>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
