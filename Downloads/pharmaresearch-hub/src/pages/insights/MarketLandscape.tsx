import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const MarketLandscape = () => {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Market Landscape</h1>
        <p className="text-muted-foreground mt-2">
          Therapeutic area trends and regulatory intelligence
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="p-6">
          <Badge className="mb-2">Coming Soon</Badge>
          <h3 className="font-semibold text-lg">Disease Area Trends</h3>
          <p className="text-sm text-muted-foreground mt-2">
            NSCLC: 89% of new trials include IO combo
          </p>
        </Card>
        <Card className="p-6">
          <Badge className="mb-2">Coming Soon</Badge>
          <h3 className="font-semibold text-lg">Technology Radar</h3>
          <p className="text-sm text-muted-foreground mt-2">
            Spatial transcriptomics adoption growing 340% YoY
          </p>
        </Card>
        <Card className="p-6">
          <Badge className="mb-2">Coming Soon</Badge>
          <h3 className="font-semibold text-lg">Regulatory Intelligence</h3>
          <p className="text-sm text-muted-foreground mt-2">
            FDA accelerated approval changes
          </p>
        </Card>
      </div>
    </div>
  );
};

export default MarketLandscape;
