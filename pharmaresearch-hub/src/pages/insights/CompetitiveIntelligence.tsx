import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const CompetitiveIntelligence = () => {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Competitive Intelligence</h1>
        <p className="text-muted-foreground mt-2">
          Monitor competitor pipeline and IP landscape
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="p-6">
          <Badge className="mb-2">Coming Soon</Badge>
          <h3 className="font-semibold text-lg">Competitor Tracker</h3>
          <p className="text-sm text-muted-foreground mt-2">
            Real-time alerts on BMS, Merck, Roche, Pfizer, and more
          </p>
        </Card>
        <Card className="p-6">
          <Badge className="mb-2">Coming Soon</Badge>
          <h3 className="font-semibold text-lg">Patent Landscape</h3>
          <p className="text-sm text-muted-foreground mt-2">
            Freedom-to-operate analysis and citation networks
          </p>
        </Card>
        <Card className="p-6">
          <Badge className="mb-2">Coming Soon</Badge>
          <h3 className="font-semibold text-lg">Clinical Trial Monitor</h3>
          <p className="text-sm text-muted-foreground mt-2">
            Phase transition probabilities and recruitment tracking
          </p>
        </Card>
      </div>
    </div>
  );
};

export default CompetitiveIntelligence;
