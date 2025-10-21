import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Biomarker } from "@/types/knowledge";
import { Activity, BookOpen } from "lucide-react";

interface BiomarkerCardProps {
  biomarker: Biomarker;
}

const getPriorityVariant = (priority: string) => {
  if (priority.toLowerCase() === "high") return "default";
  if (priority.toLowerCase() === "medium") return "secondary";
  return "outline";
};

export const BiomarkerCard = ({ biomarker }: BiomarkerCardProps) => {
  return (
    <Card className="p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <Activity className="h-4 w-4 text-primary" />
          <h3 className="font-semibold">{biomarker.name}</h3>
        </div>
        <Badge variant={getPriorityVariant(biomarker.priority)}>
          {biomarker.priority.charAt(0).toUpperCase() + biomarker.priority.slice(1)}
        </Badge>
      </div>
      
      <p className="text-sm text-muted-foreground mb-3">{biomarker.application}</p>
      
      <div className="flex items-center gap-2 text-sm">
        <BookOpen className="h-3.5 w-3.5 text-muted-foreground" />
        <span className="text-muted-foreground">Evidence:</span>
        <span className="font-medium">{biomarker.evidenceCount} publications</span>
      </div>
    </Card>
  );
};
