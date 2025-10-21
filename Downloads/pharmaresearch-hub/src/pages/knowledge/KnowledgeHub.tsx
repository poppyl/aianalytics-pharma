import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowRight, Zap, BarChart3, Database } from 'lucide-react';
import { useWorkflows, useDataSources, useAnalyticsSnapshot } from '@/hooks/useKnowledge';

const KnowledgeHub = () => {
  const { data: workflows, isLoading: workflowsLoading } = useWorkflows();
  const { data: dataSources, isLoading: sourcesLoading } = useDataSources();
  const { data: analytics, isLoading: analyticsLoading } = useAnalyticsSnapshot();

  const activeWorkflows = workflows?.filter((wf) => wf.status === 'active').length || 0;
  const pausedWorkflows = workflows?.filter((wf) => wf.status === 'paused').length || 0;
  const totalRuns = workflows?.reduce((sum, wf) => sum + wf.stats.totalRuns, 0) || 0;

  const connectedSources = dataSources?.filter((ds) => ds.status === 'connected').length || 0;
  const availableSources = dataSources?.filter((ds) => ds.status !== 'connected').length || 0;
  const primarySource = dataSources?.find((ds) => ds.isPrimary);

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-3">Knowledge Hub</h1>
          <p className="text-lg text-muted-foreground">
            Configure your research intelligence engine
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Workflows Card */}
          <Link to="/knowledge/workflows" className="group">
            <Card className="h-full transition-all hover:shadow-lg hover:border-primary/50">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Zap className="h-8 w-8 text-accent" />
                  <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <CardTitle>Workflows</CardTitle>
                <CardDescription>Agentic workflow management</CardDescription>
              </CardHeader>
              <CardContent>
                {workflowsLoading ? (
                  <div className="space-y-2">
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-6 w-3/4" />
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Active</span>
                      <Badge variant="default">{activeWorkflows}</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Paused</span>
                      <Badge variant="secondary">{pausedWorkflows}</Badge>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t">
                      <span className="text-sm font-medium">Total Runs</span>
                      <span className="text-sm font-bold text-primary">{totalRuns.toLocaleString()}</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </Link>

          {/* Analytics Card */}
          <Link to="/knowledge/analytics" className="group">
            <Card className="h-full transition-all hover:shadow-lg hover:border-primary/50">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <BarChart3 className="h-8 w-8 text-accent" />
                  <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <CardTitle>Analytics</CardTitle>
                <CardDescription>Usage analytics and insights</CardDescription>
              </CardHeader>
              <CardContent>
                {analyticsLoading ? (
                  <div className="space-y-2">
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-6 w-3/4" />
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Papers Processed</span>
                      <span className="text-sm font-bold">{analytics?.totalPapersProcessed.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Workflows Executed</span>
                      <span className="text-sm font-bold">{analytics?.workflowsExecuted}</span>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t">
                      <span className="text-sm font-medium">Time Saved</span>
                      <span className="text-sm font-bold text-primary">{analytics?.timeSavedHours.toFixed(1)}h</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </Link>

          {/* Data Sources Card */}
          <Link to="/knowledge/data-sources" className="group">
            <Card className="h-full transition-all hover:shadow-lg hover:border-primary/50">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Database className="h-8 w-8 text-accent" />
                  <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <CardTitle>Data Sources</CardTitle>
                <CardDescription>Research databases & integrations</CardDescription>
              </CardHeader>
              <CardContent>
                {sourcesLoading ? (
                  <div className="space-y-2">
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-6 w-3/4" />
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Connected</span>
                      <Badge variant="default">{connectedSources}</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Available</span>
                      <Badge variant="secondary">{availableSources}</Badge>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t">
                      <span className="text-sm font-medium">Primary Source</span>
                      <span className="text-sm font-bold text-primary">{primarySource?.name || 'None'}</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default KnowledgeHub;
