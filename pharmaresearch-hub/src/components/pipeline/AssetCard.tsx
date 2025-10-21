import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PharmaAsset } from "@/types/knowledge";
import { AlertTriangle, CheckCircle2, Clock } from "lucide-react";

interface AssetCardProps {
  asset: PharmaAsset;
}

const getRiskColor = (risk: number) => {
  if (risk < 4) return "text-green-500";
  if (risk < 7) return "text-yellow-500";
  return "text-red-500";
};

const getRiskBadgeVariant = (risk: number) => {
  if (risk < 4) return "default";
  if (risk < 7) return "secondary";
  return "destructive";
};

export const AssetCard = ({ asset }: AssetCardProps) => {
  return (
    <Card className="p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-semibold text-lg">{asset.compoundId}</h3>
          <p className="text-sm text-muted-foreground">{asset.indication}</p>
        </div>
        <Badge variant={getRiskBadgeVariant(asset.riskScore)}>
          {asset.phase}
        </Badge>
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm">
          <span className="text-muted-foreground">MOA:</span>
          <span className="font-medium">{asset.moa}</span>
        </div>
        
        <div className="flex items-center gap-2">
          <AlertTriangle className={`h-4 w-4 ${getRiskColor(asset.riskScore)}`} />
          <span className="text-sm">Risk: {asset.riskScore}/10</span>
        </div>
        
        {asset.nextMilestone && (
          <div className="flex items-start gap-2 mt-3 pt-3 border-t">
            <Clock className="h-4 w-4 text-muted-foreground mt-0.5" />
            <div className="flex-1">
              <p className="text-xs text-muted-foreground">Next Milestone</p>
              <p className="text-sm font-medium">{asset.nextMilestone}</p>
            </div>
          </div>
        )}
        
        {asset.trialIds && asset.trialIds.length > 0 && (
          <div className="flex items-center gap-1 flex-wrap mt-2">
            {asset.trialIds.slice(0, 2).map(id => (
              <Badge key={id} variant="outline" className="text-xs">
                {id}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
};
