import { TechnologyPoint } from '@/types/techRadar';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { BookOpen, FileText, FlaskConical, Star, TrendingUp, AlertTriangle, ExternalLink } from 'lucide-react';
import { getTherapeuticAreaColor } from '@/services/mockTechRadarData';

interface TechnologyDetailModalProps {
  technology: TechnologyPoint | null;
  isOpen: boolean;
  onClose: () => void;
}

export const TechnologyDetailModal = ({ technology, isOpen, onClose }: TechnologyDetailModalProps) => {
  if (!technology) return null;
  
  const getRingColor = (ring: string) => {
    const colors = {
      adopt: '#10b981',
      trial: '#3b82f6',
      assess: '#f59e0b',
      monitor: '#ef4444',
    };
    return colors[ring as keyof typeof colors] || '#6366f1';
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-slate-900 border-slate-700 text-slate-100">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <DialogTitle className="text-2xl text-white mb-2">{technology.name}</DialogTitle>
              <DialogDescription className="text-slate-400">
                {technology.shortDescription}
              </DialogDescription>
            </div>
            <div className="flex flex-col gap-2 items-end">
              <Badge
                style={{
                  backgroundColor: getRingColor(technology.ring),
                  color: '#fff',
                }}
              >
                {technology.ring.toUpperCase()}
              </Badge>
              <Badge variant="outline" className="border-slate-600 text-slate-300">
                {technology.quadrant.replace('-', ' ')}
              </Badge>
            </div>
          </div>
        </DialogHeader>
        
        <div className="space-y-6 mt-4">
          {/* Metadata */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <div className="text-xs text-slate-500 mb-1">Therapeutic Area</div>
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: getTherapeuticAreaColor(technology.therapeuticArea) }}
                />
                <span className="text-sm text-slate-300 capitalize">
                  {technology.therapeuticArea.replace('-', ' ')}
                </span>
              </div>
            </div>
            <div>
              <div className="text-xs text-slate-500 mb-1">Opportunity Size</div>
              <div className="text-sm text-slate-300 capitalize">{technology.opportunitySize}</div>
            </div>
            <div>
              <div className="text-xs text-slate-500 mb-1">Confidence</div>
              <div className="text-sm text-slate-300 capitalize">{technology.confidence}</div>
            </div>
          </div>
          
          <Separator className="bg-slate-700" />
          
          {/* Assessment Rationale */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Assessment Rationale
            </h3>
            <p className="text-slate-300 leading-relaxed">
              {technology.detailedAssessment.rationale}
            </p>
          </div>
          
          {/* Strategic Recommendation */}
          <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-primary mb-2 flex items-center gap-2">
              <Star className="w-5 h-5" />
              Strategic Recommendation
            </h3>
            <p className="text-slate-300 leading-relaxed">
              {technology.detailedAssessment.recommendation}
            </p>
          </div>
          
          {/* Market Potential & Timeline */}
          {(technology.detailedAssessment.marketPotential || technology.detailedAssessment.timeToImpact) && (
            <div className="grid grid-cols-2 gap-4">
              {technology.detailedAssessment.marketPotential && (
                <div>
                  <div className="text-xs text-slate-500 mb-1">Market Potential</div>
                  <div className="text-sm text-slate-300">{technology.detailedAssessment.marketPotential}</div>
                </div>
              )}
              {technology.detailedAssessment.timeToImpact && (
                <div>
                  <div className="text-xs text-slate-500 mb-1">Time to Impact</div>
                  <div className="text-sm text-slate-300">{technology.detailedAssessment.timeToImpact}</div>
                </div>
              )}
            </div>
          )}
          
          {/* Risks */}
          {technology.detailedAssessment.risks && technology.detailedAssessment.risks.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-slate-400 mb-2 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                Risk Factors
              </h3>
              <ul className="list-disc list-inside space-y-1">
                {technology.detailedAssessment.risks.map((risk, idx) => (
                  <li key={idx} className="text-sm text-slate-300">{risk}</li>
                ))}
              </ul>
            </div>
          )}
          
          <Separator className="bg-slate-700" />
          
          {/* Key Players */}
          <div>
            <h3 className="text-sm font-semibold text-slate-400 mb-2">Key Players</h3>
            <div className="flex flex-wrap gap-2">
              {technology.detailedAssessment.keyPlayers.map((player) => (
                <Badge key={player} variant="outline" className="border-slate-600 text-slate-300">
                  {player}
                </Badge>
              ))}
            </div>
          </div>
          
          {/* Publications */}
          {technology.detailedAssessment.publications.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-slate-400 mb-3 flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                Key Publications
              </h3>
              <div className="space-y-3">
                {technology.detailedAssessment.publications.map((pub, idx) => (
                  <div key={idx} className="border border-slate-700 rounded-lg p-3 bg-slate-800/50">
                    <div className="font-medium text-slate-200 mb-1">{pub.title}</div>
                    <div className="text-xs text-slate-400 mb-2">
                      {pub.authors} • {pub.journal} • {pub.year}
                    </div>
                    {pub.pmid && (
                      <a
                        href={`https://pubmed.ncbi.nlm.nih.gov/${pub.pmid}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-primary hover:underline inline-flex items-center gap-1"
                      >
                        View on PubMed <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Patents */}
          {technology.detailedAssessment.patents.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-slate-400 mb-3 flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Patents
              </h3>
              <div className="space-y-2">
                {technology.detailedAssessment.patents.map((patent, idx) => (
                  <div key={idx} className="text-sm border border-slate-700 rounded p-2 bg-slate-800/50">
                    <div className="font-medium text-slate-300">{patent.number} - {patent.title}</div>
                    <div className="text-xs text-slate-500">
                      {patent.assignee} • Filed {new Date(patent.filingDate).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Clinical Trials */}
          {technology.detailedAssessment.clinicalTrials.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-slate-400 mb-3 flex items-center gap-2">
                <FlaskConical className="w-4 h-4" />
                Active Clinical Trials
              </h3>
              <div className="space-y-2">
                {technology.detailedAssessment.clinicalTrials.map((trial, idx) => (
                  <div key={idx} className="text-sm border border-slate-700 rounded p-3 bg-slate-800/50">
                    <div className="flex items-start justify-between mb-1">
                      <div className="font-medium text-slate-300">{trial.title}</div>
                      <Badge variant="outline" className="border-primary text-primary text-xs">
                        {trial.phase}
                      </Badge>
                    </div>
                    <div className="text-xs text-slate-500 mb-2">
                      {trial.sponsor} • {trial.indication}
                    </div>
                    <a
                      href={`https://clinicaltrials.gov/study/${trial.nctId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-primary hover:underline inline-flex items-center gap-1"
                    >
                      {trial.nctId} <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button className="flex-1">
              Move to Watchlist
            </Button>
            <Button variant="outline" className="flex-1">
              Create Workflow
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
