import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";
import { Mechanism } from "@/types/knowledge";
import { BookOpen, FlaskConical, ChevronDown, ChevronUp, Beaker, Building2, DollarSign, TrendingUp } from "lucide-react";
import { MiniTimeline } from "./MiniTimeline";
import { EvidenceSparkline } from "./EvidenceSparkline";
import { CompetitivePositioning } from "./CompetitivePositioning";

interface MechanismCardProps {
  mechanism: Mechanism;
}

export const MechanismCard = ({ mechanism }: MechanismCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const priorityColors = {
    high: "bg-red-500/10 text-red-500 border-red-500/20",
    medium: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
    low: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  };

  return (
    <Card className="hover:shadow-md transition-all">
      <div className="p-4">
        <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
          <div className="space-y-4">
            {/* Header */}
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Beaker className="h-4 w-4 text-primary" />
                  <h3 className="font-semibold text-sm">{mechanism.target}</h3>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2">{mechanism.title}</p>
              </div>
              <Badge 
                variant="outline" 
                className={`text-[10px] uppercase ${priorityColors[mechanism.priority]}`}
              >
                {mechanism.priority}
              </Badge>
            </div>

            {/* Mini Timeline */}
            {mechanism.timeline && (
              <MiniTimeline timeline={mechanism.timeline} />
            )}

            {/* Evidence Sparkline */}
            {mechanism.evidenceTrajectory && (
              <EvidenceSparkline 
                trajectory={mechanism.evidenceTrajectory} 
                currentScore={mechanism.evidenceScore}
              />
            )}

            {/* Competitive Positioning */}
            {mechanism.competitivePositioning && (
              <CompetitivePositioning positioning={mechanism.competitivePositioning} />
            )}

            {/* Basic Stats */}
            <div className="flex items-center gap-4 text-xs text-muted-foreground pt-2 border-t">
              <div className="flex items-center gap-1">
                <BookOpen className="h-3 w-3" />
                {mechanism.publicationCount} pubs
              </div>
              <div className="flex items-center gap-1">
                <FlaskConical className="h-3 w-3" />
                {mechanism.trialCount} trials
              </div>
            </div>

            {/* Evidence Score Bar */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Evidence Score</span>
                <span className="font-semibold text-primary">{mechanism.evidenceScore}/10</span>
              </div>
              <Progress value={mechanism.evidenceScore * 10} className="h-2" />
            </div>

            {/* Journal Info */}
            <div className="flex items-center justify-between text-[10px] text-muted-foreground">
              <span>{mechanism.journal}</span>
              <span>{mechanism.publishedDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
            </div>

            {/* Expand/Collapse Trigger */}
            {mechanism.detailedAnalysis && (
              <CollapsibleTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="w-full justify-between text-primary hover:bg-primary/10"
                >
                  <span className="text-xs font-medium">
                    {isExpanded ? 'Hide' : 'View'} detailed analysis
                  </span>
                  {isExpanded ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </Button>
              </CollapsibleTrigger>
            )}

            {/* Expandable Detailed Analysis */}
            {mechanism.detailedAnalysis && (
              <CollapsibleContent className="animate-accordion-down">
                <div className="mt-3 space-y-4 p-4 bg-muted/30 rounded-lg border-l-2 border-primary">
                  {/* Pathway Analysis */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Beaker className="h-4 w-4 text-primary" />
                      <h4 className="text-sm font-semibold">Pathway Analysis</h4>
                    </div>
                    <p className="text-xs text-foreground/90 leading-relaxed">
                      {mechanism.detailedAnalysis.pathwayAnalysis}
                    </p>
                  </div>

                  {/* Key Publications */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <BookOpen className="h-4 w-4 text-primary" />
                      <h4 className="text-sm font-semibold">Key Publications</h4>
                    </div>
                    <ul className="space-y-2">
                      {mechanism.detailedAnalysis.keyPublications.slice(0, 3).map((pub, idx) => (
                        <li key={idx} className="text-xs space-y-0.5">
                          <p className="font-medium text-foreground">{pub.title}</p>
                          <p className="text-muted-foreground">
                            {pub.authors} • {pub.journal} ({pub.year})
                          </p>
                          <p className="text-primary italic">Finding: {pub.keyFinding}</p>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Active Competitors */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Building2 className="h-4 w-4 text-primary" />
                      <h4 className="text-sm font-semibold">Active Competitors</h4>
                    </div>
                    <div className="space-y-2">
                      {mechanism.detailedAnalysis.activeCompetitors.slice(0, 3).map((comp, idx) => (
                        <div key={idx} className="p-2 bg-background rounded border text-xs">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <p className="font-semibold text-foreground">{comp.company}</p>
                              <p className="text-muted-foreground">{comp.asset} • {comp.phase}</p>
                              <p className="text-muted-foreground">{comp.indication}</p>
                            </div>
                          </div>
                          {comp.differentiator && (
                            <p className="text-primary mt-1 text-[10px] italic">
                              {comp.differentiator}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Commercial Potential */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <DollarSign className="h-4 w-4 text-primary" />
                      <h4 className="text-sm font-semibold">Commercial Potential</h4>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">Market Size:</span>
                        <span className="font-semibold">{mechanism.detailedAnalysis.commercialPotential.marketSize}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">Growth Rate:</span>
                        <span className="font-semibold flex items-center gap-1">
                          <TrendingUp className="h-3 w-3 text-green-500" />
                          {mechanism.detailedAnalysis.commercialPotential.growthRate}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">Competition:</span>
                        <Badge 
                          variant={
                            mechanism.detailedAnalysis.commercialPotential.competitiveIntensity === 'high' 
                              ? 'destructive' 
                              : mechanism.detailedAnalysis.commercialPotential.competitiveIntensity === 'medium'
                              ? 'secondary'
                              : 'default'
                          }
                          className="text-[10px]"
                        >
                          {mechanism.detailedAnalysis.commercialPotential.competitiveIntensity}
                        </Badge>
                      </div>
                      <p className="text-xs text-foreground/90 leading-relaxed pt-2 border-t">
                        <span className="font-semibold text-primary">AI Assessment:</span>{' '}
                        {mechanism.detailedAnalysis.commercialPotential.aiAssessment}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-2 border-t">
                    <Button variant="outline" size="sm" className="flex-1 text-xs">
                      View Details
                    </Button>
                    <Button variant="default" size="sm" className="flex-1 text-xs">
                      Create Workflow
                    </Button>
                  </div>
                </div>
              </CollapsibleContent>
            )}

            {/* Basic Create Workflow (collapsed state only) */}
            {!isExpanded && (
              <Button variant="outline" size="sm" className="w-full text-xs">
                Create Workflow
              </Button>
            )}
          </div>
        </Collapsible>
      </div>
    </Card>
  );
};
