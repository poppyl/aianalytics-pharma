import { useState, useMemo } from 'react';
import { RadarVisualization } from '@/components/tech-radar/RadarVisualization';
import { RadarFiltersComponent } from '@/components/tech-radar/RadarFilters';
import { RadarLegend } from '@/components/tech-radar/RadarLegend';
import { TechnologyDetailModal } from '@/components/tech-radar/TechnologyDetailModal';
import { Card } from '@/components/ui/card';
import { useTechnologyPoints } from '@/hooks/useTechRadarData';
import { TechnologyPoint, RadarFilters, TherapeuticArea, TechnologyQuadrant } from '@/types/techRadar';
import { Skeleton } from '@/components/ui/skeleton';

const TechnologyRadar = () => {
  const [filters, setFilters] = useState<RadarFilters>({
    therapeuticAreas: new Set<TherapeuticArea>([
      'oncology',
      'neurology',
      'immunology',
      'cardiovascular',
      'rare-diseases',
      'infectious-diseases',
      'metabolic',
      'cross-therapeutic',
    ]),
    timeRange: 'current',
    confidenceLevels: new Set(['high', 'medium', 'low']),
    quadrants: new Set<TechnologyQuadrant>([
      'drug-modalities',
      'technology-platforms',
      'therapeutic-approaches',
      'enabling-tools',
    ]),
  });
  
  const [selectedTechnology, setSelectedTechnology] = useState<TechnologyPoint | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  
  const { data: technologies, isLoading } = useTechnologyPoints(filters);
  
  const stats = useMemo(() => {
    if (!technologies) return { adopt: 0, trial: 0, assess: 0, monitor: 0 };
    
    return {
      adopt: technologies.filter(t => t.ring === 'adopt').length,
      trial: technologies.filter(t => t.ring === 'trial').length,
      assess: technologies.filter(t => t.ring === 'assess').length,
      monitor: technologies.filter(t => t.ring === 'monitor').length,
    };
  }, [technologies]);
  
  const handleTechnologyClick = (tech: TechnologyPoint) => {
    setSelectedTechnology(tech);
    setIsDetailModalOpen(true);
  };
  
  return (
    <div className="min-h-screen bg-slate-950 p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-3">Technology Radar</h1>
          <p className="text-lg text-slate-400">
            Strategic technology intelligence for pharmaceutical R&D
          </p>
        </div>
        
        {/* Filters */}
        <RadarFiltersComponent filters={filters} onFiltersChange={setFilters} />
        
        {/* Main Radar Visualization */}
        {isLoading ? (
          <Skeleton className="h-[900px] w-full bg-slate-900" />
        ) : technologies ? (
          <div className="relative">
            <RadarVisualization
              technologies={technologies}
              onTechnologyClick={handleTechnologyClick}
            />
            
            {/* Legend overlay */}
            <div className="absolute bottom-8 right-8">
              <RadarLegend />
            </div>
          </div>
        ) : null}
        
        {/* Statistics Cards */}
        <div className="grid grid-cols-4 gap-4">
          <Card className="p-6 bg-slate-900 border-slate-700">
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-500 mb-1">{stats.adopt}</div>
              <div className="text-sm text-slate-400">Ready to Adopt</div>
            </div>
          </Card>
          <Card className="p-6 bg-slate-900 border-slate-700">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-500 mb-1">{stats.trial}</div>
              <div className="text-sm text-slate-400">In Trial Phase</div>
            </div>
          </Card>
          <Card className="p-6 bg-slate-900 border-slate-700">
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-500 mb-1">{stats.assess}</div>
              <div className="text-sm text-slate-400">Under Assessment</div>
            </div>
          </Card>
          <Card className="p-6 bg-slate-900 border-slate-700">
            <div className="text-center">
              <div className="text-3xl font-bold text-red-500 mb-1">{stats.monitor}</div>
              <div className="text-sm text-slate-400">On Monitor List</div>
            </div>
          </Card>
        </div>
      </div>
      
      {/* Detail Modal */}
      <TechnologyDetailModal
        technology={selectedTechnology}
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
      />
    </div>
  );
};

export default TechnologyRadar;
