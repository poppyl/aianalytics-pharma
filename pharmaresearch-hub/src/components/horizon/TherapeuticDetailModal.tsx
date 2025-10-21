import { TherapeuticLandscapePoint } from '@/types/pharmaHorizon';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Sparkles, Users, FileText, FlaskConical } from 'lucide-react';

interface TherapeuticDetailModalProps {
  point: TherapeuticLandscapePoint | null;
  isOpen: boolean;
  onClose: () => void;
}

const getMaturityColor = (stage: string) => {
  const colors = {
    nascent: 'hsl(200, 80%, 60%)',
    emerging: 'hsl(150, 70%, 50%)',
    growing: 'hsl(50, 90%, 55%)',
    maturing: 'hsl(30, 85%, 55%)',
    established: 'hsl(0, 75%, 55%)',
  };
  return colors[stage as keyof typeof colors] || colors.nascent;
};

export const TherapeuticDetailModal = ({ point, isOpen, onClose }: TherapeuticDetailModalProps) => {
  if (!point) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between gap-4">
            <DialogTitle className="text-2xl">{point.name}</DialogTitle>
            <Badge
              variant="outline"
              style={{ borderColor: getMaturityColor(point.maturityStage), color: getMaturityColor(point.maturityStage) }}
            >
              {point.maturityStage.charAt(0).toUpperCase() + point.maturityStage.slice(1)}
            </Badge>
          </div>
          <div className="flex gap-2 mt-2">
            <Badge variant="secondary">{point.therapeuticArea}</Badge>
            <Badge variant="secondary">{point.modalityType}</Badge>
          </div>
        </DialogHeader>

        <div className="grid grid-cols-3 gap-4 my-4">
          <div className="bg-muted/30 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <FileText className="h-4 w-4 text-primary" />
              <p className="text-xs text-muted-foreground">Patent Activity</p>
            </div>
            <p className="text-2xl font-bold">{point.patentActivity}</p>
            <p className="text-xs text-muted-foreground">filings/quarter</p>
          </div>
          
          <div className="bg-muted/30 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <FlaskConical className="h-4 w-4 text-primary" />
              <p className="text-xs text-muted-foreground">Clinical Progress</p>
            </div>
            <p className="text-2xl font-bold">{point.clinicalProgress}</p>
            <p className="text-xs text-muted-foreground">trials/quarter</p>
          </div>
          
          <div className="bg-muted/30 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <Users className="h-4 w-4 text-primary" />
              <p className="text-xs text-muted-foreground">Publications</p>
            </div>
            <p className="text-2xl font-bold">{point.totalPublications}</p>
            <p className="text-xs text-muted-foreground">total</p>
          </div>
        </div>

        <div className="bg-muted/30 p-4 rounded-lg border-l-2 border-primary">
          <h4 className="font-semibold mb-2 flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            AI Strategic Insight
          </h4>
          <p className="text-sm">{point.aiInsight}</p>
        </div>

        {point.details.keyPlayers.length > 0 && (
          <div>
            <h4 className="font-semibold mb-2 text-sm">Key Players</h4>
            <div className="flex flex-wrap gap-2">
              {point.details.keyPlayers.map((player) => (
                <Badge key={player} variant="outline">{player}</Badge>
              ))}
            </div>
          </div>
        )}

        {point.details.recentPatents.length > 0 && (
          <div>
            <h4 className="font-semibold mb-2 text-sm">Recent Patents</h4>
            <div className="space-y-1">
              {point.details.recentPatents.map((patent) => (
                <p key={patent} className="text-sm text-muted-foreground font-mono">{patent}</p>
              ))}
            </div>
          </div>
        )}

        {point.details.activeTrials.length > 0 && (
          <div>
            <h4 className="font-semibold mb-2 text-sm">Active Trials</h4>
            <div className="space-y-1">
              {point.details.activeTrials.map((trial) => (
                <p key={trial} className="text-sm text-muted-foreground font-mono">{trial}</p>
              ))}
            </div>
          </div>
        )}

        <Button className="w-full">Add to Watchlist</Button>
      </DialogContent>
    </Dialog>
  );
};
