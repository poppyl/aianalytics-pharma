import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";
import { ResearchInsight } from "@/types/knowledge";
import { 
  Flame, TrendingUp, Lightbulb, Bell, ArrowRight, ChevronDown, ChevronUp,
  Target, Users, DollarSign, Clock, AlertTriangle, Shield, Activity,
  Zap
} from "lucide-react";

interface ResearchInsightCardProps {
  insight: ResearchInsight;
  onAction?: () => void;
  onCreateWorkflow?: () => void;
}

export const ResearchInsightCard = ({ 
  insight, 
  onAction,
  onCreateWorkflow 
}: ResearchInsightCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getIcon = () => {
    switch (insight.type) {
      case 'competitive-threat':
        return <Flame className="h-4 w-4" />;
      case 'pipeline-opportunity':
        return <TrendingUp className="h-4 w-4" />;
      case 'market-shift':
        return <Bell className="h-4 w-4" />;
      case 'biomarker-discovery':
        return <Lightbulb className="h-4 w-4" />;
      case 'trend':
        return <TrendingUp className="h-4 w-4" />;
      case 'recommendation':
        return <Lightbulb className="h-4 w-4" />;
      case 'alert':
        return <Bell className="h-4 w-4" />;
      default:
        return <Lightbulb className="h-4 w-4" />;
    }
  };

  const getColorClasses = () => {
    if (insight.type === 'pipeline-opportunity') {
      return "border-green-500/50 bg-green-500/5";
    }
    if (insight.type === 'competitive-threat') {
      return "border-red-500/50 bg-red-500/5";
    }
    if (insight.type === 'market-shift') {
      return "border-blue-500/50 bg-blue-500/5";
    }
    if (insight.type === 'biomarker-discovery') {
      return "border-purple-500/50 bg-purple-500/5";
    }
    if (insight.type === 'trend' && insight.priority === 'high') {
      return "border-red-500/50 bg-red-500/5";
    }
    if (insight.type === 'recommendation') {
      return "border-primary/50 bg-primary/5";
    }
    if (insight.type === 'alert') {
      return "border-yellow-500/50 bg-yellow-500/5";
    }
    return "border-primary/50 bg-primary/5";
  };

  const getOpportunityColor = (score: number) => {
    if (score >= 8) return { text: "text-green-600", bg: "bg-green-500" };
    if (score >= 6) return { text: "text-yellow-600", bg: "bg-yellow-500" };
    return { text: "text-orange-600", bg: "bg-orange-500" };
  };

  const getUrgencyBadge = (urgency: string) => {
    if (urgency === 'high') {
      return <Badge variant="destructive" className="text-xs">High Priority</Badge>;
    }
    if (urgency === 'medium') {
      return <Badge variant="secondary" className="text-xs">Medium Priority</Badge>;
    }
    return <Badge variant="outline" className="text-xs">Low Priority</Badge>;
  };

  const getThreatIndicator = (threat: string) => {
    const icons = {
      critical: { icon: AlertTriangle, color: "text-red-500", label: "Critical Threat" },
      high: { icon: Shield, color: "text-orange-500", label: "High Threat" },
      moderate: { icon: Activity, color: "text-yellow-500", label: "Moderate Threat" },
      low: { icon: Zap, color: "text-green-500", label: "Low Threat" },
    };
    const config = icons[threat as keyof typeof icons] || icons.low;
    const Icon = config.icon;
    return (
      <div className="flex items-center gap-1" title={config.label}>
        <Icon className={`h-4 w-4 ${config.color}`} />
        <span className={`text-xs ${config.color}`}>{config.label}</span>
      </div>
    );
  };

  const getPriorityBadge = () => {
    if (insight.priority === 'high' || insight.priority === 'medium') {
      return (
        <Badge 
          variant={insight.priority === 'high' ? 'destructive' : 'secondary'}
          className="text-xs"
        >
          {insight.priority === 'high' ? 'High' : 'Medium'} Priority
        </Badge>
      );
    }
    return null;
  };

  return (
    <Card className={`hover:shadow-md transition-all ${getColorClasses()}`}>
      <CardContent className="p-4">
        <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
          <div className="space-y-3">
            {/* Header Section */}
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2 flex-1">
                <div className="text-muted-foreground">{getIcon()}</div>
                <p className="font-semibold text-sm">{insight.title}</p>
              </div>
              {insight.scores ? getUrgencyBadge(insight.scores.urgency) : getPriorityBadge()}
            </div>

            {/* Visual Indicators Row */}
            {insight.scores && (
              <div className="space-y-2">
                {/* Opportunity Score Bar */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Opportunity Score</span>
                    <span className={`font-semibold ${getOpportunityColor(insight.scores.opportunityScore).text}`}>
                      {insight.scores.opportunityScore}/10
                    </span>
                  </div>
                  <Progress 
                    value={insight.scores.opportunityScore * 10} 
                    className="h-2"
                  />
                </div>

                {/* Competitive Threat */}
                {getThreatIndicator(insight.scores.competitiveThreat)}
              </div>
            )}

            {/* Basic Description */}
            <p className="text-xs text-muted-foreground leading-relaxed">
              {insight.description}
            </p>

            {/* Expand/Collapse Trigger */}
            {insight.strategicAnalysis && (
              <CollapsibleTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="w-full justify-between text-primary hover:bg-primary/10"
                >
                  <span className="text-xs font-medium">
                    {isExpanded ? 'Hide' : 'View'} full strategic analysis
                  </span>
                  {isExpanded ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </Button>
              </CollapsibleTrigger>
            )}

            {/* Expandable Strategic Analysis */}
            {insight.strategicAnalysis && (
              <CollapsibleContent className="data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
                <div className="mt-3 space-y-4 p-4 bg-muted/30 rounded-lg border-l-2 border-primary">
                  {/* Why This Matters */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Target className="h-4 w-4 text-primary" />
                      <h4 className="text-sm font-semibold">Why This Matters</h4>
                    </div>
                    <p className="text-xs text-foreground/90 leading-relaxed">
                      {insight.strategicAnalysis.whyMatters}
                    </p>
                  </div>

                  {/* Competitive Context */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="h-4 w-4 text-primary" />
                      <h4 className="text-sm font-semibold">Competitive Context</h4>
                    </div>
                    <p className="text-xs text-foreground/90 leading-relaxed">
                      {insight.strategicAnalysis.competitiveContext}
                    </p>
                  </div>

                  {/* Market Opportunity */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <DollarSign className="h-4 w-4 text-primary" />
                      <h4 className="text-sm font-semibold">Market Opportunity</h4>
                    </div>
                    <p className="text-xs text-foreground/90 leading-relaxed mb-2">
                      {insight.strategicAnalysis.marketOpportunity.description}
                    </p>
                    {insight.strategicAnalysis.marketOpportunity.marketSize && (
                      <div className="flex items-center gap-2 text-xs">
                        <span className="font-medium">Market Size:</span>
                        <span className="text-muted-foreground">
                          {insight.strategicAnalysis.marketOpportunity.marketSize}
                        </span>
                      </div>
                    )}
                    {insight.strategicAnalysis.marketOpportunity.unmetNeed && (
                      <div className="flex items-center gap-2 text-xs mt-1">
                        <span className="font-medium">Unmet Need:</span>
                        <span className="text-muted-foreground">
                          {insight.strategicAnalysis.marketOpportunity.unmetNeed}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Recommended Actions */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Lightbulb className="h-4 w-4 text-primary" />
                      <h4 className="text-sm font-semibold">Recommended Actions</h4>
                    </div>
                    <ul className="space-y-2">
                      {insight.strategicAnalysis.recommendedActions.map((action, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs">
                          <div className="flex-shrink-0 mt-0.5">
                            <div className={`h-5 w-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                              action.priority === 'immediate' 
                                ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400' 
                                : action.priority === 'near-term'
                                ? 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400'
                                : 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
                            }`}>
                              {idx + 1}
                            </div>
                          </div>
                          <div className="flex-1">
                            <p className="text-foreground/90 leading-relaxed">{action.action}</p>
                            {action.owner && (
                              <p className="text-muted-foreground mt-0.5">Owner: {action.owner}</p>
                            )}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Timeline Impact */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="h-4 w-4 text-primary" />
                      <h4 className="text-sm font-semibold">Timeline Impact</h4>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-foreground/90 leading-relaxed">
                        {insight.strategicAnalysis.timelineImpact.description}
                      </p>
                      {insight.strategicAnalysis.timelineImpact.milestoneEffect && (
                        <Badge 
                          variant={
                            insight.strategicAnalysis.timelineImpact.milestoneEffect === 'accelerates' 
                              ? 'default'
                              : insight.strategicAnalysis.timelineImpact.milestoneEffect === 'delays'
                              ? 'destructive'
                              : 'secondary'
                          }
                          className="text-xs"
                        >
                          {insight.strategicAnalysis.timelineImpact.milestoneEffect === 'accelerates' && '⚡ Accelerates'}
                          {insight.strategicAnalysis.timelineImpact.milestoneEffect === 'delays' && '⏱️ Delays'}
                          {insight.strategicAnalysis.timelineImpact.milestoneEffect === 'critical-path' && '🔥 Critical Path'}
                          {insight.strategicAnalysis.timelineImpact.milestoneEffect === 'neutral' && '➡️ Neutral'}
                        </Badge>
                      )}
                      {insight.strategicAnalysis.timelineImpact.estimatedImpact && (
                        <p className="text-xs text-muted-foreground italic mt-1">
                          {insight.strategicAnalysis.timelineImpact.estimatedImpact}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-2 border-t">
                    {insight.actionLabel && (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1 text-xs"
                        onClick={onAction}
                      >
                        {insight.actionLabel} <ArrowRight className="ml-1 h-3 w-3" />
                      </Button>
                    )}
                    {onCreateWorkflow && (
                      <Button 
                        variant="default" 
                        size="sm" 
                        className="flex-1 text-xs"
                        onClick={onCreateWorkflow}
                      >
                        Create Workflow
                      </Button>
                    )}
                  </div>
                </div>
              </CollapsibleContent>
            )}

            {/* Basic Action Link (collapsed state only) */}
            {!isExpanded && insight.actionLabel && (
              <Button
                variant="link"
                size="sm"
                className="h-auto p-0 text-xs"
                onClick={onAction}
              >
                {insight.actionLabel} <ArrowRight className="ml-1 h-3 w-3" />
              </Button>
            )}
          </div>
        </Collapsible>
      </CardContent>
    </Card>
  );
};
