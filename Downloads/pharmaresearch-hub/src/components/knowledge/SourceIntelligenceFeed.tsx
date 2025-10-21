import { useDataSources, useResearchInsights } from "@/hooks/useKnowledge";
import { useCompetitorAlerts, usePharmaInsights } from "@/hooks/usePharmaData";
import { useAppContext } from "@/contexts/AppContext";
import { TrendingDatasetCard } from "./TrendingDatasetCard";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Flame, TrendingUp, Lightbulb, ArrowRight, AlertTriangle, Shield } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
export const SourceIntelligenceFeed = () => {
  const {
    currentMode
  } = useAppContext();
  const {
    data: sources,
    isLoading: sourcesLoading
  } = useDataSources();
  const {
    data: insights,
    isLoading: insightsLoading
  } = useResearchInsights();
  const {
    data: competitorAlerts,
    isLoading: alertsLoading
  } = useCompetitorAlerts();
  const {
    data: pharmaInsights,
    isLoading: pharmaInsightsLoading
  } = usePharmaInsights();
  const isPharma = currentMode === 'pharma';

  // Get trending datasets from connected sources (researcher mode)
  const trendingDatasets = sources?.filter(s => s.trending?.datasets).flatMap(s => s.trending!.datasets!).slice(0, 3) || [];

  // Filter insights by type (researcher mode)
  const trends = insights?.filter(i => i.type === 'trend').slice(0, 2) || [];
  const recommendations = insights?.filter(i => i.type === 'recommendation').slice(0, 2) || [];

  // Pharma mode data
  const recentAlerts = competitorAlerts?.slice(0, 3) || [];
  const patentSignals = pharmaInsights?.filter(i => i.type === 'competitive-threat').slice(0, 2) || [];
  const pipelineOpportunities = pharmaInsights?.filter(i => i.type === 'pipeline-opportunity').slice(0, 2) || [];
  if (sourcesLoading || insightsLoading || isPharma && (alertsLoading || pharmaInsightsLoading)) {
    return <div className="space-y-6">
        <Skeleton className="h-[200px]" />
        <Skeleton className="h-[150px]" />
        <Skeleton className="h-[150px]" />
      </div>;
  }
  if (isPharma) {
    return <div className="space-y-6">
        {/* Competitive Alerts */}
        {recentAlerts.length > 0 && <div>
            
            <div className="space-y-3">
              {recentAlerts.map(alert => <Card key={alert.id} className="hover:shadow-sm transition-shadow border-destructive/20">
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <p className="font-medium text-sm">{alert.event}</p>
                        <Badge variant={alert.impact === 'high' ? 'destructive' : 'default'} className="text-xs">
                          {alert.impact}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">{alert.company}</p>
                      <Button variant="link" size="sm" className="h-auto p-0 text-xs">
                        View Details <ArrowRight className="ml-1 h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>)}
            </div>
          </div>}

        {/* Patent Signals */}
        {patentSignals.length > 0 && <div>
            <div className="flex items-center gap-2 mb-4">
              <Shield className="h-5 w-5 text-blue-500" />
              <h3 className="text-lg font-semibold">Patent Signals</h3>
            </div>
            <div className="space-y-3">
              {patentSignals.map(signal => <Card key={signal.id} className="hover:shadow-sm transition-shadow">
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <p className="font-medium text-sm">{signal.title}</p>
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {signal.description}
                      </p>
                      <Button variant="link" size="sm" className="h-auto p-0 text-xs">
                        Analyze Impact <ArrowRight className="ml-1 h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>)}
            </div>
          </div>}

        {/* Pipeline Opportunities */}
        {pipelineOpportunities.length > 0 && <div>
            <div className="flex items-center gap-2 mb-4">
              <Lightbulb className="h-5 w-5 text-yellow-500" />
              <h3 className="text-lg font-semibold">Pipeline Opportunities</h3>
            </div>
            <div className="space-y-3">
              {pipelineOpportunities.map(opp => <Card key={opp.id} className="hover:shadow-sm transition-shadow border-primary/20">
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <p className="font-medium text-sm">{opp.title}</p>
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {opp.description}
                      </p>
                      <Button variant="link" size="sm" className="h-auto p-0 text-xs">
                        Explore Opportunity <ArrowRight className="ml-1 h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>)}
            </div>
          </div>}

        <Button variant="outline" className="w-full">
          View All Intelligence <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>;
  }

  // Researcher mode
  return <div className="space-y-6">
      {/* Trending Datasets */}
      {trendingDatasets.length > 0 && <div>
          <div className="flex items-center gap-2 mb-4">
            <Flame className="h-5 w-5 text-orange-500" />
            <h3 className="text-lg font-semibold">Trending Datasets</h3>
          </div>
          <div className="space-y-3">
            {trendingDatasets.map(dataset => <TrendingDatasetCard key={dataset.id} dataset={dataset} onConnect={() => {/* TODO: Navigate to dataset */}} />)}
          </div>
        </div>}

      {/* Research Trends */}
      {trends.length > 0 && <div>
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="h-5 w-5 text-green-500" />
            <h3 className="text-lg font-semibold">Research Trends</h3>
          </div>
          <div className="space-y-3">
            {trends.map(trend => <Card key={trend.id} className="hover:shadow-sm transition-shadow">
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-medium text-sm">{trend.title}</p>
                      {trend.priority === 'high' && <Badge variant="destructive" className="text-xs">Hot</Badge>}
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {trend.description}
                    </p>
                    {trend.actionLabel && <Button variant="link" size="sm" className="h-auto p-0 text-xs">
                        {trend.actionLabel} <ArrowRight className="ml-1 h-3 w-3" />
                      </Button>}
                  </div>
                </CardContent>
              </Card>)}
          </div>
        </div>}

      {/* Recommendations */}
      {recommendations.length > 0 && <div>
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb className="h-5 w-5 text-yellow-500" />
            <h3 className="text-lg font-semibold">Recommendations</h3>
          </div>
          <div className="space-y-3">
            {recommendations.map(rec => <Card key={rec.id} className="hover:shadow-sm transition-shadow border-primary/20">
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <p className="font-medium text-sm">{rec.title}</p>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {rec.description}
                    </p>
                    {rec.actionLabel && <Button variant="link" size="sm" className="h-auto p-0 text-xs">
                        {rec.actionLabel} <ArrowRight className="ml-1 h-3 w-3" />
                      </Button>}
                  </div>
                </CardContent>
              </Card>)}
          </div>
        </div>}

      <Button variant="outline" className="w-full">
        View All Insights <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>;
};