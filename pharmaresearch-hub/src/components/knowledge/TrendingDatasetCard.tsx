import { TrendingDataset } from "@/types/knowledge";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, Download } from "lucide-react";

interface TrendingDatasetCardProps {
  dataset: TrendingDataset;
  onConnect: () => void;
}

export const TrendingDatasetCard = ({ dataset, onConnect }: TrendingDatasetCardProps) => {
  return (
    <Card className="hover:shadow-sm transition-shadow">
      <CardContent className="p-4">
        <div className="space-y-3">
          <div>
            <div className="flex items-start justify-between gap-2 mb-1">
              <h4 className="font-medium text-sm line-clamp-2">{dataset.name}</h4>
              <TrendingUp className="h-4 w-4 text-orange-500 flex-shrink-0" />
            </div>
            <Badge variant="outline" className="text-xs">{dataset.source}</Badge>
          </div>

          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1 text-muted-foreground">
              <Download className="h-3 w-3" />
              {(dataset.downloads / 1000).toFixed(1)}K downloads
            </div>
            <div className="text-primary font-medium">
              {dataset.relevanceScore}% match
            </div>
          </div>

          <Button variant="outline" size="sm" className="w-full" onClick={onConnect}>
            View Dataset
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
