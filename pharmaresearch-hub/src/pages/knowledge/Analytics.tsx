import { useAnalyticsSnapshot, useWorkflowPerformance, useResearchInsights } from "@/hooks/useKnowledge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { OverviewStats } from "@/components/knowledge/analytics/OverviewStats";
import { WorkflowPerformanceChart } from "@/components/knowledge/analytics/WorkflowPerformanceChart";
import { ResearchInsightCard } from "@/components/knowledge/analytics/ResearchInsightCard";
import { TimeSeriesChart } from "@/components/knowledge/analytics/TimeSeriesChart";
import { SourceUsageChart } from "@/components/knowledge/analytics/SourceUsageChart";
import { ExportButton } from "@/components/knowledge/analytics/ExportButton";
import { useAppContext } from "@/contexts/AppContext";
import { usePharmaInsights, usePharmaWorkflows, usePharmaMetrics } from "@/hooks/usePharmaData";
import { toast } from "@/hooks/use-toast";
import { ResearchInsight } from "@/types/knowledge";

const Analytics = () => {
  const { currentMode } = useAppContext();
  const isPharmaMode = currentMode === 'pharma';
  
  const { data: analytics, isLoading: analyticsLoading } = useAnalyticsSnapshot();
  const { data: performance, isLoading: performanceLoading } = useWorkflowPerformance();
  const { data: insights, isLoading: insightsLoading } = useResearchInsights();
  
  const { data: pharmaInsights } = usePharmaInsights();
  const { data: pharmaWorkflows } = usePharmaWorkflows();
  const { data: pharmaMetrics } = usePharmaMetrics();
  
  const displayInsights = isPharmaMode ? pharmaInsights : insights;
  const displayPerformance = isPharmaMode ? pharmaWorkflows?.map(wf => ({
    workflowId: wf.id,
    workflowName: wf.name,
    successRate: wf.stats.successRate,
    avgExecutionTime: 0,
    totalRuns: wf.stats.totalRuns,
    lastRun: wf.lastRun || new Date(),
    errorCount: 0,
  })) : performance;

  const handleCreateWorkflow = (insight: ResearchInsight) => {
    toast({
      title: "Workflow Creation",
      description: `Creating automated workflow based on: "${insight.title}"`,
    });
  };

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-3">
              {isPharmaMode ? 'Pipeline & Competitive Analytics' : 'Analytics Dashboard'}
            </h1>
            <p className="text-lg text-muted-foreground">
              {isPharmaMode ? 'Competitive intelligence and pipeline metrics' : 'Research intelligence metrics and insights'}
            </p>
          </div>
          <ExportButton data={analytics} />
        </div>

        {/* Overview Stats */}
        <OverviewStats analytics={isPharmaMode ? pharmaMetrics : analytics} isLoading={analyticsLoading} isPharmaMode={isPharmaMode} />

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Workflow Performance (2 columns) */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Workflow Performance</CardTitle>
              </CardHeader>
              <CardContent>
                {performanceLoading ? (
                  <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                    Loading performance data...
                  </div>
                ) : (
                  <WorkflowPerformanceChart data={displayPerformance} />
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Papers Processed Over Time</CardTitle>
              </CardHeader>
              <CardContent>
                <TimeSeriesChart />
              </CardContent>
            </Card>
          </div>

          {/* Right: Insights & Source Usage (1 column) */}
          <div className="lg:col-span-1 space-y-6">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Research Insights</h2>
              </div>
              {insightsLoading ? (
                <div className="text-sm text-muted-foreground">Loading insights...</div>
              ) : (
                <div className="space-y-3">
                  {displayInsights?.slice(0, 3).map((insight) => (
                    <ResearchInsightCard 
                      key={insight.id} 
                      insight={insight}
                      onCreateWorkflow={() => handleCreateWorkflow(insight)}
                    />
                  ))}
                  <Button variant="link" className="w-full text-sm">
                    View All Insights <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Source Usage</CardTitle>
              </CardHeader>
              <CardContent>
                <SourceUsageChart />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
