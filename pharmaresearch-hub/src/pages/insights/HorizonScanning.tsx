import { useState, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { MetricCard } from '@/components/horizon/MetricCard';
import { TherapeuticScatterPlot } from '@/components/horizon/TherapeuticScatterPlot';
import { TherapeuticFiltersComponent } from '@/components/horizon/TherapeuticFilters';
import { ScatterLegend } from '@/components/horizon/ScatterLegend';
import { TherapeuticDetailModal } from '@/components/horizon/TherapeuticDetailModal';
import { CompetitiveTimeline } from '@/components/horizon/CompetitiveTimeline';
import { TherapeuticLandscapePoint, TherapeuticFilters } from '@/types/pharmaHorizon';
import { useHorizonMetrics, useTherapeuticLandscape, useCompetitorMoves } from '@/hooks/useHorizonData';
import { Zap, Layers, Activity, Rocket } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const HorizonScanning = () => {
  const { data: metrics, isLoading: metricsLoading } = useHorizonMetrics();
  const { data: landscape, isLoading: landscapeLoading } = useTherapeuticLandscape();
  const { data: moves, isLoading: movesLoading } = useCompetitorMoves();

  const [therapeuticFilters, setTherapeuticFilters] = useState<TherapeuticFilters>({
    therapeuticArea: 'all',
    modalityType: 'all',
    maturityStages: new Set(['nascent', 'emerging', 'growing', 'maturing', 'established']),
  });
  const [selectedPoint, setSelectedPoint] = useState<TherapeuticLandscapePoint | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const handleBubbleClick = (point: TherapeuticLandscapePoint) => {
    setSelectedPoint(point);
    setIsDetailModalOpen(true);
  };

  const filteredLandscape = useMemo(() => {
    if (!landscape) return [];
    
    return landscape.filter(point => {
      if (therapeuticFilters.therapeuticArea !== 'all' && 
          point.therapeuticArea !== therapeuticFilters.therapeuticArea) return false;
      if (therapeuticFilters.modalityType !== 'all' && 
          point.modalityType !== therapeuticFilters.modalityType) return false;
      if (!therapeuticFilters.maturityStages.has(point.maturityStage)) return false;
      return true;
    });
  }, [landscape, therapeuticFilters]);

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div>
          <h1 className="text-4xl font-bold mb-3">Horizon Scanning</h1>
          <p className="text-lg text-muted-foreground">
            Emerging therapeutic opportunities and competitive landscape intelligence
          </p>
        </div>

        {metricsLoading ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-[140px]" />
            ))}
          </div>
        ) : metrics ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <MetricCard
              title="Emerging Mechanisms"
              count={metrics.emergingMechanisms.count}
              change={metrics.emergingMechanisms.change}
              icon={Zap}
            />
            <MetricCard
              title="New Therapeutic Modalities"
              count={metrics.therapeuticModalities.count}
              change={metrics.therapeuticModalities.change}
              icon={Layers}
            />
            <MetricCard
              title="Early Clinical Signals"
              count={metrics.clinicalSignals.count}
              change={metrics.clinicalSignals.change}
              icon={Activity}
            />
            <MetricCard
              title="Technology Shifts"
              count={metrics.technologyShifts.count}
              change={metrics.technologyShifts.change}
              icon={Rocket}
            />
          </div>
        ) : null}

        <Card className="p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">Therapeutic Landscape</h2>
            <p className="text-muted-foreground">
              Strategic map of innovation activity across therapeutic areas and modalities
            </p>
          </div>

          {landscapeLoading ? (
            <Skeleton className="h-[500px]" />
          ) : (
            <>
              <TherapeuticFiltersComponent
                filters={therapeuticFilters}
                onFiltersChange={setTherapeuticFilters}
              />

              <div className="mt-6">
                <TherapeuticScatterPlot
                  data={filteredLandscape}
                  onBubbleClick={handleBubbleClick}
                />
              </div>

              <div className="mt-6">
                <ScatterLegend />
              </div>
            </>
          )}
        </Card>

        <div>
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">Competitive Dynamics</h2>
            <p className="text-muted-foreground">
              Recent competitor moves and strategic implications
            </p>
          </div>

          {movesLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-[180px]" />
              ))}
            </div>
          ) : moves ? (
            <CompetitiveTimeline moves={moves} />
          ) : null}
        </div>
      </div>

      <TherapeuticDetailModal
        point={selectedPoint}
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
      />
    </div>
  );
};

export default HorizonScanning;
