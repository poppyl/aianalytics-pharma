import { Card } from '@/components/ui/card';
import { getTherapeuticAreaColor } from '@/services/mockTechRadarData';

export const RadarLegend = () => {
  const rings = [
    { name: 'Adopt', color: '#10b981', description: 'Ready for development' },
    { name: 'Trial', color: '#3b82f6', description: 'Run POC studies' },
    { name: 'Assess', color: '#f59e0b', description: 'Watch & evaluate' },
    { name: 'Monitor', color: '#ef4444', description: 'Long-term horizon' },
  ];
  
  const sizes = [
    { name: 'Small', size: 4 },
    { name: 'Medium', size: 6 },
    { name: 'Large', size: 8 },
    { name: 'Transformative', size: 10 },
  ];
  
  const therapeuticAreas = [
    'oncology',
    'neurology',
    'immunology',
    'cardiovascular',
    'rare-diseases',
    'infectious-diseases',
    'metabolic',
    'cross-therapeutic',
  ];
  
  return (
    <Card className="bg-slate-900 border-slate-700 p-4 text-xs">
      <div className="space-y-4">
        {/* Rings */}
        <div>
          <div className="text-slate-400 font-semibold mb-2">Maturity Rings</div>
          <div className="space-y-1">
            {rings.map((ring) => (
              <div key={ring.name} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full border-2"
                  style={{ borderColor: ring.color }}
                />
                <span className="text-slate-300">{ring.name}</span>
                <span className="text-slate-500 text-[10px]">({ring.description})</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Opportunity Size */}
        <div>
          <div className="text-slate-400 font-semibold mb-2">Opportunity Size</div>
          <div className="flex gap-3">
            {sizes.map((size) => (
              <div key={size.name} className="flex items-center gap-1">
                <div
                  className="rounded-full bg-slate-500"
                  style={{ width: size.size * 2, height: size.size * 2 }}
                />
                <span className="text-slate-300 text-[10px]">{size.name}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Confidence */}
        <div>
          <div className="text-slate-400 font-semibold mb-2">Confidence</div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-slate-500" />
              <span className="text-slate-300">High (solid)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-slate-500 opacity-70" />
              <span className="text-slate-300">Medium (70%)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full border-2 border-dashed border-slate-500" />
              <span className="text-slate-300">Low (dashed)</span>
            </div>
          </div>
        </div>
        
        {/* Therapeutic Areas (compact) */}
        <div>
          <div className="text-slate-400 font-semibold mb-2">Therapeutic Areas</div>
          <div className="grid grid-cols-2 gap-1">
            {therapeuticAreas.map((area) => (
              <div key={area} className="flex items-center gap-1">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: getTherapeuticAreaColor(area) }}
                />
                <span className="text-slate-300 text-[10px] capitalize">
                  {area.replace('-', ' ')}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};
