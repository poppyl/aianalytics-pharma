import { RadarFilters, TherapeuticArea, TechnologyQuadrant } from '@/types/techRadar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getTherapeuticAreaColor } from '@/services/mockTechRadarData';

interface RadarFiltersProps {
  filters: RadarFilters;
  onFiltersChange: (filters: RadarFilters) => void;
}

export const RadarFiltersComponent = ({ filters, onFiltersChange }: RadarFiltersProps) => {
  const therapeuticAreas: TherapeuticArea[] = [
    'oncology',
    'neurology',
    'immunology',
    'cardiovascular',
    'rare-diseases',
    'infectious-diseases',
    'metabolic',
    'cross-therapeutic',
  ];
  
  const quadrants: { value: TechnologyQuadrant; label: string }[] = [
    { value: 'drug-modalities', label: 'Drug Modalities' },
    { value: 'technology-platforms', label: 'Technology Platforms' },
    { value: 'therapeutic-approaches', label: 'Therapeutic Approaches' },
    { value: 'enabling-tools', label: 'Enabling Tools' },
  ];
  
  const toggleTherapeuticArea = (area: TherapeuticArea) => {
    const newAreas = new Set(filters.therapeuticAreas);
    if (newAreas.has(area)) {
      newAreas.delete(area);
    } else {
      newAreas.add(area);
    }
    onFiltersChange({ ...filters, therapeuticAreas: newAreas });
  };
  
  const toggleConfidence = (level: 'high' | 'medium' | 'low') => {
    const newLevels = new Set(filters.confidenceLevels);
    if (newLevels.has(level)) {
      newLevels.delete(level);
    } else {
      newLevels.add(level);
    }
    onFiltersChange({ ...filters, confidenceLevels: newLevels });
  };
  
  const toggleQuadrant = (quadrant: TechnologyQuadrant) => {
    const newQuadrants = new Set(filters.quadrants);
    if (newQuadrants.has(quadrant)) {
      newQuadrants.delete(quadrant);
    } else {
      newQuadrants.add(quadrant);
    }
    onFiltersChange({ ...filters, quadrants: newQuadrants });
  };
  
  const resetFilters = () => {
    onFiltersChange({
      therapeuticAreas: new Set(therapeuticAreas),
      timeRange: 'current',
      confidenceLevels: new Set(['high', 'medium', 'low']),
      quadrants: new Set<TechnologyQuadrant>(['drug-modalities', 'technology-platforms', 'therapeutic-approaches', 'enabling-tools']),
    });
  };
  
  return (
    <Card className="p-4 bg-slate-900 border-slate-700">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Therapeutic Areas */}
        <div>
          <Label className="text-slate-300 mb-3 block">Therapeutic Areas</Label>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {therapeuticAreas.map((area) => (
              <div key={area} className="flex items-center space-x-2">
                <Checkbox
                  id={`area-${area}`}
                  checked={filters.therapeuticAreas.has(area)}
                  onCheckedChange={() => toggleTherapeuticArea(area)}
                />
                <label
                  htmlFor={`area-${area}`}
                  className="flex items-center gap-2 text-sm text-slate-300 cursor-pointer"
                >
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: getTherapeuticAreaColor(area) }}
                  />
                  {area.replace('-', ' ')}
                </label>
              </div>
            ))}
          </div>
        </div>
        
        {/* Quadrants */}
        <div>
          <Label className="text-slate-300 mb-3 block">Quadrants</Label>
          <div className="space-y-2">
            {quadrants.map((q) => (
              <div key={q.value} className="flex items-center space-x-2">
                <Checkbox
                  id={`quadrant-${q.value}`}
                  checked={filters.quadrants.has(q.value)}
                  onCheckedChange={() => toggleQuadrant(q.value)}
                />
                <label
                  htmlFor={`quadrant-${q.value}`}
                  className="text-sm text-slate-300 cursor-pointer"
                >
                  {q.label}
                </label>
              </div>
            ))}
          </div>
        </div>
        
        {/* Confidence Levels */}
        <div>
          <Label className="text-slate-300 mb-3 block">Confidence</Label>
          <div className="space-y-2">
            {(['high', 'medium', 'low'] as const).map((level) => (
              <div key={level} className="flex items-center space-x-2">
                <Checkbox
                  id={`confidence-${level}`}
                  checked={filters.confidenceLevels.has(level)}
                  onCheckedChange={() => toggleConfidence(level)}
                />
                <label
                  htmlFor={`confidence-${level}`}
                  className="text-sm text-slate-300 cursor-pointer capitalize"
                >
                  {level}
                </label>
              </div>
            ))}
          </div>
        </div>
        
        {/* Time Range & Reset */}
        <div>
          <Label className="text-slate-300 mb-3 block">Time Range</Label>
          <Select value={filters.timeRange} onValueChange={(value) => onFiltersChange({ ...filters, timeRange: value as any })}>
            <SelectTrigger className="bg-slate-800 border-slate-700 text-slate-300">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="current">Current</SelectItem>
              <SelectItem value="6-months-ago">6 months ago</SelectItem>
              <SelectItem value="1-year-ago">1 year ago</SelectItem>
              <SelectItem value="2-years-ago">2 years ago</SelectItem>
            </SelectContent>
          </Select>
          
          <Button
            variant="outline"
            onClick={resetFilters}
            className="w-full mt-4 bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700"
          >
            Reset Filters
          </Button>
        </div>
      </div>
    </Card>
  );
};
