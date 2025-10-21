import { Mechanism } from "@/types/knowledge";
import { FileText, Shield, FlaskConical, CheckCircle, HelpCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface MiniTimelineProps {
  timeline: Mechanism['timeline'];
}

export const MiniTimeline = ({ timeline }: MiniTimelineProps) => {
  if (!timeline || timeline.milestones.length === 0) return null;

  const getIcon = (type: string) => {
    switch (type) {
      case 'publication': return <FileText className="h-3 w-3" />;
      case 'patent': return <Shield className="h-3 w-3" />;
      case 'trial': return <FlaskConical className="h-3 w-3" />;
      case 'approval': return <CheckCircle className="h-3 w-3" />;
      case 'prediction': return <HelpCircle className="h-3 w-3" />;
      default: return null;
    }
  };

  const getConfidenceStyle = (confidence?: 'high' | 'medium' | 'low') => {
    if (!confidence) return '';
    if (confidence === 'high') return 'opacity-100';
    if (confidence === 'medium') return 'opacity-70';
    return 'opacity-50';
  };

  return (
    <div className="space-y-2">
      <h4 className="text-xs font-semibold text-muted-foreground">Timeline</h4>
      <TooltipProvider>
        <div className="relative pt-2 pb-6">
          {/* Timeline line */}
          <div className="absolute top-4 left-0 right-0 h-0.5 bg-border" />
          
          {/* Milestones */}
          <div className="relative flex justify-between items-center">
            {timeline.milestones.map((milestone, index) => {
              const isPrediction = milestone.isPrediction;
              const isLast = index === timeline.milestones.length - 1;
              
              return (
                <div key={index} className="flex flex-col items-center relative" style={{ width: `${100 / timeline.milestones.length}%` }}>
                  {/* Connecting line to next milestone */}
                  {!isLast && (
                    <div 
                      className={`absolute top-4 left-1/2 h-0.5 bg-primary ${
                        isPrediction || timeline.milestones[index + 1]?.isPrediction 
                          ? 'border-t-2 border-dashed border-primary bg-transparent' 
                          : ''
                      }`}
                      style={{ width: `${100}%` }}
                    />
                  )}
                  
                  {/* Milestone dot */}
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div 
                        className={`relative z-10 flex items-center justify-center rounded-full border-2 bg-background transition-all ${
                          isPrediction
                            ? `border-dashed border-primary/60 ${getConfidenceStyle(timeline.predictedNextMilestone?.confidence)} w-3 h-3`
                            : 'border-primary bg-primary w-3 h-3'
                        } ${
                          index === timeline.milestones.length - 2 && !isPrediction
                            ? 'animate-pulse w-4 h-4'
                            : ''
                        }`}
                      >
                        {isPrediction && (
                          <HelpCircle className="h-2 w-2 text-primary" />
                        )}
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          {getIcon(milestone.type)}
                          <span className="font-semibold">{milestone.label}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {milestone.date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                        </p>
                        {milestone.description && (
                          <p className="text-xs max-w-xs">{milestone.description}</p>
                        )}
                        {isPrediction && timeline.predictedNextMilestone && (
                          <div className="mt-2 pt-2 border-t">
                            <p className="text-xs font-semibold text-primary">
                              Confidence: {timeline.predictedNextMilestone.confidence}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {timeline.predictedNextMilestone.rationale}
                            </p>
                          </div>
                        )}
                      </div>
                    </TooltipContent>
                  </Tooltip>
                  
                  {/* Label below */}
                  <div className="absolute top-6 w-20 text-center">
                    <p className={`text-[10px] leading-tight ${
                      isPrediction ? 'text-muted-foreground italic' : 'text-foreground'
                    }`}>
                      {milestone.date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </TooltipProvider>
      
      {/* Predicted milestone callout */}
      {timeline.predictedNextMilestone && (
        <div className="flex items-start gap-2 p-2 bg-primary/5 rounded-md border border-primary/20">
          <HelpCircle className={`h-4 w-4 text-primary mt-0.5 flex-shrink-0 ${
            getConfidenceStyle(timeline.predictedNextMilestone.confidence)
          }`} />
          <div className="space-y-1 flex-1">
            <p className="text-xs font-semibold text-foreground">
              Predicted: {timeline.predictedNextMilestone.label}
            </p>
            <p className="text-[10px] text-muted-foreground">
              {timeline.predictedNextMilestone.predictedDate.toLocaleDateString('en-US', { 
                month: 'short', 
                year: 'numeric' 
              })} • {timeline.predictedNextMilestone.confidence} confidence
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
