import { TrendDataPoint } from '@/types/horizon';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Sparkles, TrendingUp, Users, FileText } from 'lucide-react';

interface TrendDetailModalProps {
  trend: TrendDataPoint | null;
  isOpen: boolean;
  onClose: () => void;
}

const getColorForStage = (stage: string) => {
  const colors = {
    nascent: 'hsl(240, 70%, 62%)',
    emerging: 'hsl(45, 95%, 55%)',
    growing: 'hsl(25, 95%, 53%)',
    established: 'hsl(0, 72%, 51%)',
  };
  return colors[stage as keyof typeof colors] || colors.nascent;
};

export const TrendDetailModal = ({ trend, isOpen, onClose }: TrendDetailModalProps) => {
  if (!trend) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between gap-4">
            <DialogTitle className="text-2xl">{trend.name}</DialogTitle>
            <Badge variant="outline" style={{ borderColor: getColorForStage(trend.maturityStage) }}>
              {trend.maturityStage}
            </Badge>
          </div>
        </DialogHeader>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-4">
          <div className="p-4 bg-muted/30 rounded-lg border border-border">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <FileText className="h-4 w-4" />
              <span className="text-xs font-medium">Publication Activity</span>
            </div>
            <p className="text-2xl font-bold">{trend.publicationActivity}</p>
            <p className="text-xs text-muted-foreground">papers/month</p>
          </div>

          <div className="p-4 bg-muted/30 rounded-lg border border-border">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <TrendingUp className="h-4 w-4" />
              <span className="text-xs font-medium">Citation Velocity</span>
            </div>
            <p className="text-2xl font-bold">{trend.citationVelocity}</p>
            <p className="text-xs text-muted-foreground">citations/month</p>
          </div>

          <div className="p-4 bg-muted/30 rounded-lg border border-border">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <Users className="h-4 w-4" />
              <span className="text-xs font-medium">Active Researchers</span>
            </div>
            <p className="text-2xl font-bold">{trend.activeResearchers}</p>
            <p className="text-xs text-muted-foreground">contributors</p>
          </div>
        </div>

        {/* AI Analysis */}
        <div className="bg-muted/30 p-4 rounded-lg border-l-2 border-primary">
          <h4 className="font-semibold mb-2 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-accent" />
            AI Analysis
          </h4>
          <p className="text-sm text-foreground/90 mb-3">{trend.aiSummary}</p>
          {trend.extendedAnalysis && (
            <p className="text-sm text-foreground/80">{trend.extendedAnalysis}</p>
          )}
        </div>

        {/* Top Authors */}
        <div className="mt-4">
          <h4 className="font-semibold mb-3 text-sm">Top Contributors</h4>
          <div className="flex flex-wrap gap-2">
            {trend.details.topAuthors.map((author, i) => (
              <Badge key={i} variant="secondary">
                {author}
              </Badge>
            ))}
          </div>
        </div>

        {/* Additional Metrics */}
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="card-elevated p-3">
            <p className="text-xs text-muted-foreground">Recent Papers</p>
            <p className="text-lg font-semibold">{trend.details.recentPapers}</p>
          </div>
          <div className="card-elevated p-3">
            <p className="text-xs text-muted-foreground">Growth Rate</p>
            <p className="text-lg font-semibold text-primary">+{trend.details.growthRate}%</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 mt-6">
          <Button className="flex-1">Add to Watchlist</Button>
          <Button variant="outline" className="flex-1">Explore Similar</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
