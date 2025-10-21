import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AgenticWorkflow } from '@/types/knowledge';
import { Play, Pause, Copy, Trash2, Edit, Clock, TrendingUp } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface WorkflowCardProps {
  workflow: AgenticWorkflow;
}

export const WorkflowCard = ({ workflow }: WorkflowCardProps) => {
  const statusColors = {
    active: 'default',
    paused: 'secondary',
    error: 'destructive',
  } as const;

  const statusIcons = {
    active: Play,
    paused: Pause,
    error: Trash2,
  };

  const StatusIcon = statusIcons[workflow.status];

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <CardTitle className="text-lg">{workflow.name}</CardTitle>
              <Badge variant={statusColors[workflow.status]}>
                <StatusIcon className="h-3 w-3 mr-1" />
                {workflow.status}
              </Badge>
            </div>
            <CardDescription>{workflow.description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 pb-4 border-b">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Total Runs</p>
              <p className="text-lg font-bold">{workflow.stats.totalRuns}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Success Rate</p>
              <p className="text-lg font-bold text-primary">{workflow.stats.successRate}%</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Papers</p>
              <p className="text-lg font-bold">{workflow.stats.papersProcessed}</p>
            </div>
          </div>

          {/* Timing */}
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>
                Last run: {workflow.lastRun ? formatDistanceToNow(workflow.lastRun, { addSuffix: true }) : 'Never'}
              </span>
            </div>
          </div>

          {workflow.nextRun && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <TrendingUp className="h-4 w-4" />
              <span>Next run: {formatDistanceToNow(workflow.nextRun, { addSuffix: true })}</span>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-2 pt-2">
            <Button variant="outline" size="sm" className="flex-1">
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
            <Button variant="outline" size="sm">
              {workflow.status === 'active' ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
            <Button variant="outline" size="sm">
              <Copy className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
