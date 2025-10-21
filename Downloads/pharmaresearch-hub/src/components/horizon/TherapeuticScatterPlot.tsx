import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { TherapeuticLandscapePoint } from '@/types/pharmaHorizon';

interface TherapeuticScatterPlotProps {
  data: TherapeuticLandscapePoint[];
  onBubbleClick: (point: TherapeuticLandscapePoint) => void;
}

const getMaturityColor = (stage: string) => {
  const colors = {
    nascent: 'hsl(200, 80%, 60%)',
    emerging: 'hsl(150, 70%, 50%)',
    growing: 'hsl(50, 90%, 55%)',
    maturing: 'hsl(30, 85%, 55%)',
    established: 'hsl(0, 75%, 55%)',
  };
  return colors[stage as keyof typeof colors] || colors.nascent;
};

const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.[0]) return null;
  const data = payload[0].payload as TherapeuticLandscapePoint;
  
  return (
    <div className="bg-popover border border-border rounded-lg p-4 shadow-xl max-w-sm">
      <h4 className="font-semibold text-sm mb-2">{data.name}</h4>
      <div className="space-y-1 text-xs text-muted-foreground mb-2">
        <p>📄 {data.patentActivity} patent filings/quarter</p>
        <p>📈 {data.clinicalProgress} trials initiated/quarter</p>
        <p>📚 {data.totalPublications} total publications</p>
        <p>🏷️ {data.maturityStage.charAt(0).toUpperCase() + data.maturityStage.slice(1)}</p>
      </div>
      <p className="text-xs italic text-foreground/80 border-t border-border pt-2">
        {data.aiInsight}
      </p>
    </div>
  );
};

export const TherapeuticScatterPlot = ({ data, onBubbleClick }: TherapeuticScatterPlotProps) => {
  return (
    <ResponsiveContainer width="100%" height={500}>
      <ScatterChart margin={{ top: 20, right: 20, bottom: 60, left: 60 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
        <XAxis
          type="number"
          dataKey="patentActivity"
          name="Patent Activity"
          domain={[0, 50]}
          label={{ value: 'Patent Activity (filings/quarter)', position: 'bottom', offset: 40, style: { fontSize: 14, fontWeight: 600 } }}
          stroke="hsl(var(--foreground))"
        />
        <YAxis
          type="number"
          dataKey="clinicalProgress"
          name="Clinical Progress"
          domain={[0, 40]}
          label={{ value: 'Clinical Progress (trials/quarter)', angle: -90, position: 'left', offset: 40, style: { fontSize: 14, fontWeight: 600 } }}
          stroke="hsl(var(--foreground))"
        />
        <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3' }} />
        <Scatter
          data={data}
          onClick={(data) => onBubbleClick(data)}
          cursor="pointer"
        >
          {data.map((entry) => (
            <Cell
              key={entry.id}
              fill={getMaturityColor(entry.maturityStage)}
              fillOpacity={0.75}
              stroke={getMaturityColor(entry.maturityStage)}
              strokeWidth={2}
              r={Math.sqrt(entry.totalPublications / 10) + 8}
            />
          ))}
        </Scatter>
      </ScatterChart>
    </ResponsiveContainer>
  );
};
