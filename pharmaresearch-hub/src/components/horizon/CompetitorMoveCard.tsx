import { CompetitorMove } from '@/types/pharmaHorizon';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building2, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface CompetitorMoveCardProps {
  move: CompetitorMove;
}

const getImpactVariant = (impact: string) => {
  switch (impact) {
    case 'high':
      return 'destructive';
    case 'medium':
      return 'default';
    case 'low':
      return 'secondary';
    default:
      return 'outline';
  }
};

const getActionIcon = (action: string) => {
  switch (action) {
    case 'IND filing':
      return '🧪';
    case 'Phase transition':
      return '📊';
    case 'Partnership':
      return '🤝';
    case 'Acquisition':
      return '💼';
    case 'Patent filing':
      return '📄';
    case 'Clinical data':
      return '📈';
    default:
      return '📌';
  }
};

export const CompetitorMoveCard = ({ move }: CompetitorMoveCardProps) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card className="p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 text-2xl">{getActionIcon(move.action)}</div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="flex items-center gap-2 flex-wrap">
              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4 text-muted-foreground" />
                <span className="font-semibold">{move.company}</span>
              </div>
              <Badge variant="outline" className="text-xs">{move.action}</Badge>
              <Badge variant={getImpactVariant(move.impact)} className="text-xs">
                {move.impact.toUpperCase()} IMPACT
              </Badge>
            </div>
            <span className="text-xs text-muted-foreground whitespace-nowrap">
              {new Date(move.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </span>
          </div>

          <p className="text-sm mb-2">{move.description}</p>

          {move.relatedAssets && move.relatedAssets.length > 0 && (
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs text-muted-foreground">Related:</span>
              {move.relatedAssets.map((asset) => (
                <Badge key={asset} variant="secondary" className="text-xs">
                  {asset}
                </Badge>
              ))}
            </div>
          )}

          <div className="flex items-center gap-2 mb-2">
            {move.trialId && (
              <a
                href={`https://clinicaltrials.gov/study/${move.trialId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-primary hover:underline flex items-center gap-1"
              >
                {move.trialId}
                <ExternalLink className="h-3 w-3" />
              </a>
            )}
            {move.patentNumber && (
              <span className="text-xs text-muted-foreground font-mono">{move.patentNumber}</span>
            )}
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setExpanded(!expanded)}
            className="text-xs h-auto py-1 px-2"
          >
            {expanded ? (
              <>
                <ChevronUp className="h-3 w-3 mr-1" />
                Hide AI Analysis
              </>
            ) : (
              <>
                <ChevronDown className="h-3 w-3 mr-1" />
                Show AI Analysis
              </>
            )}
          </Button>

          {expanded && (
            <div className="mt-2 p-3 bg-primary/5 rounded-lg border-l-2 border-primary">
              <p className="text-sm text-foreground/90 italic">{move.aiAnalysis}</p>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};
