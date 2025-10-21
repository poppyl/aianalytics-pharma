import { Mechanism } from "@/types/knowledge";
import { LineChart, Line, ResponsiveContainer, Tooltip } from "recharts";

interface EvidenceSparklineProps {
  trajectory: Mechanism['evidenceTrajectory'];
  currentScore: number;
}

export const EvidenceSparkline = ({ trajectory, currentScore }: EvidenceSparklineProps) => {
  if (!trajectory || trajectory.length === 0) return null;

  const data = trajectory.map(point => ({
    date: point.date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
    score: point.score,
    pubs: point.publicationCount,
    trials: point.trialCount,
  }));

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <h4 className="text-xs font-semibold text-muted-foreground">Evidence Trajectory</h4>
        <span className="text-xs font-bold text-primary">{currentScore}/10</span>
      </div>
      
      <div className="h-10 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <defs>
              <linearGradient id="evidenceGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
              </linearGradient>
            </defs>
            <Line 
              type="natural"
              dataKey="score" 
              stroke="hsl(var(--primary))" 
              strokeWidth={2}
              dot={false}
              fill="url(#evidenceGradient)"
            />
            <Tooltip 
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="bg-popover border rounded-lg p-2 shadow-lg">
                      <p className="text-xs font-semibold">{data.date}</p>
                      <p className="text-xs text-muted-foreground">Score: {data.score}/10</p>
                      <p className="text-xs text-muted-foreground">Pubs: {data.pubs}</p>
                      <p className="text-xs text-muted-foreground">Trials: {data.trials}</p>
                    </div>
                  );
                }
                return null;
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
