import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { usePharmaAssets, useMechanisms, useCombinations, useBiomarkers } from "@/hooks/usePharmaData";
import { AssetCard } from "@/components/pipeline/AssetCard";
import { MechanismCard } from "@/components/pipeline/MechanismCard";
import { CombinationTable } from "@/components/pipeline/CombinationTable";
import { BiomarkerCard } from "@/components/pipeline/BiomarkerCard";
import { Lightbulb, TrendingUp } from "lucide-react";

const PipelineIntelligence = () => {
  const { data: assets, isLoading: assetsLoading } = usePharmaAssets();
  const { data: mechanisms, isLoading: mechanismsLoading } = useMechanisms();
  const { data: combinations, isLoading: combinationsLoading } = useCombinations();
  const { data: biomarkers, isLoading: biomarkersLoading } = useBiomarkers();

  // Calculate phase distribution
  const phaseDistribution = assets?.reduce((acc, asset) => {
    acc[asset.phase] = (acc[asset.phase] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Hero Section */}
        <div>
          <h1 className="text-4xl font-bold mb-3">Pipeline Intelligence Dashboard</h1>
          <p className="text-lg text-muted-foreground">
            BioCure Therapeutics • {assets?.length || 12} Active Assets • Last updated: Oct 2, 2025 9:42 AM
          </p>
        </div>

        {/* Top Opportunities */}
        <Alert className="border-primary/50 bg-primary/5">
          <Lightbulb className="h-5 w-5 text-primary" />
          <AlertDescription className="ml-2">
            <div className="space-y-1">
              <p className="font-medium">Top Pipeline Opportunities:</p>
              <ul className="text-sm space-y-0.5 mt-2">
                <li>• BCT-301: Indication expansion to gastric cancer - 14 supporting publications</li>
                <li>• BCT-402: Combo with radiation therapy - Phase I trial NCT05678901 shows 73% ORR</li>
                <li>• BCT-508: Pediatric solid tumors - Orphan drug designation opportunity</li>
              </ul>
            </div>
          </AlertDescription>
        </Alert>

        {/* Portfolio Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Portfolio Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-6 mb-6">
              {phaseDistribution && Object.entries(phaseDistribution).map(([phase, count]) => (
                <div key={phase} className="text-center">
                  <div className="text-2xl font-bold">{count}</div>
                  <div className="text-sm text-muted-foreground">{phase}</div>
                </div>
              ))}
            </div>
            
            {assetsLoading ? (
              <div className="text-muted-foreground">Loading assets...</div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {assets?.map((asset) => (
                  <AssetCard key={asset.compoundId} asset={asset} />
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Mechanism Intelligence */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Mechanism Intelligence</h2>
          {mechanismsLoading ? (
            <div className="text-muted-foreground">Loading mechanisms...</div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {mechanisms?.map((mechanism) => (
                <MechanismCard key={mechanism.target} mechanism={mechanism} />
              ))}
            </div>
          )}
        </div>

        {/* Combination Opportunities */}
        {combinationsLoading ? (
          <div className="text-muted-foreground">Loading combinations...</div>
        ) : (
          combinations && <CombinationTable combinations={combinations} />
        )}

        {/* Biomarker Discovery */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Biomarker Discovery</h2>
          {biomarkersLoading ? (
            <div className="text-muted-foreground">Loading biomarkers...</div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {biomarkers?.map((biomarker) => (
                <BiomarkerCard key={biomarker.name} biomarker={biomarker} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PipelineIntelligence;
