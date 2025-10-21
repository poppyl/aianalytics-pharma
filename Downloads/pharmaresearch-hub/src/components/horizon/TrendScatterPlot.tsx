import { useState } from 'react';
import { TrendDataPoint, TrendFilters } from '@/types/horizon';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface TrendScatterPlotProps {
  data: TrendDataPoint[];
  filters: TrendFilters;
  onBubbleClick: (trend: TrendDataPoint) => void;
}

const getColorForStage = (stage: string) => {
  const colors = {
    nascent: 'hsl(240, 70%, 62%)',
    emerging: 'hsl(45, 95%, 55%)',
    growing: 'hsl(25, 95%, 53%)',
    established: 'hsl(0, 72%, 51%)',
  };
  return colors[stage as keyof typeof colors] || colors.nascent;
};

const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.[0]) return null;
  const data = payload[0].payload as TrendDataPoint;
  
  return (
    <div className="bg-popover border border-border rounded-lg p-4 shadow-xl max-w-sm">
      <h4 className="font-semibold text-sm mb-2">{data.name}</h4>
      <div className="space-y-1 text-xs text-muted-foreground mb-2">
        <p>📄 {data.publicationActivity} papers/month</p>
        <p>📈 {data.citationVelocity} citations/month</p>
        <p>👥 {data.activeResearchers} active researchers</p>
        <p>🏷️ {data.maturityStage}</p>
      </div>
      <p className="text-xs italic text-foreground/80 border-t pt-2 border-border">
        {data.aiSummary}
      </p>
    </div>
  );
};

export const TrendScatterPlot = ({ data, filters, onBubbleClick }: TrendScatterPlotProps) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Scale bubble size based on active researchers (20-80px diameter range)
  const minResearchers = Math.min(...data.map(d => d.activeResearchers));
  const maxResearchers = Math.max(...data.map(d => d.activeResearchers));
  
  const getBubbleSize = (researchers: number) => {
    const normalized = (researchers - minResearchers) / (maxResearchers - minResearchers);
    return 300 + normalized * 1700; // Area in pixels (20-80px diameter approximately)
  };

  return (
    <div className="card-elevated p-4">
      <ResponsiveContainer width="100%" height={500}>
        <ScatterChart margin={{ top: 20, right: 30, bottom: 60, left: 60 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
          
          <XAxis
            type="number"
            dataKey="publicationActivity"
            name="Publication Activity"
            domain={[0, 50]}
            ticks={[0, 10, 20, 30, 40, 50]}
            label={{
              value: 'Publication Activity (papers/month)',
              position: 'bottom',
              offset: 40,
              style: { fontSize: 14, fontWeight: 600, fill: 'hsl(var(--foreground))' }
            }}
            stroke="hsl(var(--foreground))"
          />
          
          <YAxis
            type="number"
            dataKey="citationVelocity"
            name="Citation Velocity"
            domain={[0, 200]}
            ticks={[0, 50, 100, 150, 200]}
            label={{
              value: 'Citation Velocity (citations/month)',
              angle: -90,
              position: 'left',
              offset: 40,
              style: { fontSize: 14, fontWeight: 600, fill: 'hsl(var(--foreground))' }
            }}
            stroke="hsl(var(--foreground))"
          />
          
          <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3' }} />
          
          <Scatter
            data={data}
            onClick={(data) => onBubbleClick(data)}
            onMouseEnter={(data) => setHoveredId(data.id)}
            onMouseLeave={() => setHoveredId(null)}
            style={{ cursor: 'pointer' }}
          >
            {data.map((entry) => {
              const isHovered = hoveredId === entry.id;
              return (
                <Cell
                  key={entry.id}
                  fill={getColorForStage(entry.maturityStage)}
                  fillOpacity={isHovered ? 1 : 0.7}
                  stroke={getColorForStage(entry.maturityStage)}
                  strokeWidth={2}
                  r={Math.sqrt(getBubbleSize(entry.activeResearchers) / Math.PI)}
                  style={{
                    transform: isHovered ? 'scale(1.1)' : 'scale(1)',
                    transformOrigin: 'center',
                    transition: 'all 0.2s ease-out',
                    filter: isHovered ? `drop-shadow(0 0 20px ${getColorForStage(entry.maturityStage)}40)` : 'none',
                  }}
                />
              );
            })}
          </Scatter>
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
};
