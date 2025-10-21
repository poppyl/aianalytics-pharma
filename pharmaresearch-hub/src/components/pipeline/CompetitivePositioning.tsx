import { Mechanism } from "@/types/knowledge";
import { Badge } from "@/components/ui/badge";
import { Building2, Target, AlertCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface CompetitivePositioningProps {
  positioning: Mechanism['competitivePositioning'];
}

export const CompetitivePositioning = ({ positioning }: CompetitivePositioningProps) => {
  if (!positioning) return null;

  const getPositionColor = (position: string) => {
    switch (position) {
      case 'leader': return 'bg-green-500';
      case 'fast-follower': return 'bg-yellow-500';
      case 'follower': return 'bg-blue-500';
      case 'emerging': return 'bg-purple-500';
      default: return 'bg-muted';
    }
  };

  const getPositionLabel = (position: string) => {
    return position.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  };

  const yourCompetitor = positioning.competitors.find(c => c.company.includes('You'));
  const otherCompetitors = positioning.competitors.filter(c => !c.company.includes('You'));

  return (
    <TooltipProvider>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-semibold text-muted-foreground">Competitive Position</h4>
          <Badge variant="outline" className="text-[10px]">
            {getPositionLabel(positioning.yourPosition)}
          </Badge>
        </div>

        {/* Your Position */}
        {yourCompetitor && (
          <div className="p-2 bg-primary/10 border border-primary/30 rounded-md">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${getPositionColor(positioning.yourPosition)}`} />
              <div className="flex-1">
                <p className="text-xs font-semibold text-foreground">{yourCompetitor.company}</p>
                <p className="text-[10px] text-muted-foreground">
                  {yourCompetitor.assets.join(', ')} • {yourCompetitor.phase}
                </p>
              </div>
            </div>
            {positioning.competitiveAdvantage && (
              <p className="text-[10px] text-primary mt-1 italic">
                <Target className="h-3 w-3 inline mr-1" />
                {positioning.competitiveAdvantage}
              </p>
            )}
          </div>
        )}

        {/* Other Competitors */}
        <div className="space-y-1">
          {otherCompetitors.slice(0, 3).map((competitor, index) => (
            <Tooltip key={index}>
              <TooltipTrigger asChild>
                <div className="flex items-center gap-2 p-1.5 hover:bg-muted/50 rounded transition-colors cursor-pointer">
                  <div className={`w-2 h-2 rounded-full flex-shrink-0 ${getPositionColor(competitor.position)}`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-foreground truncate">{competitor.company}</p>
                    <p className="text-[10px] text-muted-foreground truncate">
                      {competitor.phase}
                    </p>
                  </div>
                  <Building2 className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <div className="space-y-1">
                  <p className="font-semibold">{competitor.company}</p>
                  <p className="text-xs text-muted-foreground">
                    Position: {getPositionLabel(competitor.position)}
                  </p>
                  <p className="text-xs">Assets: {competitor.assets.join(', ')}</p>
                  <p className="text-xs">Phase: {competitor.phase}</p>
                </div>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>

        {/* Market Gaps */}
        {positioning.marketGaps.length > 0 && (
          <div className="space-y-1">
            <p className="text-[10px] font-semibold text-muted-foreground flex items-center gap-1">
              <AlertCircle className="h-3 w-3" />
              Opportunity Gaps
            </p>
            <div className="flex flex-wrap gap-1">
              {positioning.marketGaps.slice(0, 2).map((gap, index) => (
                <Badge key={index} variant="secondary" className="text-[9px] px-1.5 py-0">
                  {gap}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Summary */}
        <div className="flex items-center justify-between text-[10px] text-muted-foreground pt-1 border-t">
          <span>
            Leaders: {otherCompetitors.filter(c => c.position === 'leader').length}
          </span>
          <span>•</span>
          <span>
            Fast-followers: {otherCompetitors.filter(c => c.position === 'fast-follower').length}
          </span>
        </div>
      </div>
    </TooltipProvider>
  );
};
