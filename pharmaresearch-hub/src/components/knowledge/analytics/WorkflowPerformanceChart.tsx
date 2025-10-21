import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { WorkflowPerformance } from "@/types/knowledge";

interface WorkflowPerformanceChartProps {
  data: WorkflowPerformance[] | undefined;
}

export const WorkflowPerformanceChart = ({ data }: WorkflowPerformanceChartProps) => {
  if (!data || data.length === 0) {
    return (
      <div className="h-[300px] flex items-center justify-center text-muted-foreground">
        No workflow performance data available
      </div>
    );
  }

  const chartData = data.map((wf) => ({
    name: wf.workflowName.length > 20 ? wf.workflowName.substring(0, 20) + "..." : wf.workflowName,
    successRate: wf.successRate,
    totalRuns: wf.totalRuns,
    avgTime: wf.avgExecutionTime,
  }));

  const getColor = (successRate: number) => {
    if (successRate >= 95) return "hsl(var(--chart-1))"; // green
    if (successRate >= 90) return "hsl(var(--chart-3))"; // yellow
    return "hsl(var(--chart-5))"; // red
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData} margin={{ top: 10, right: 10, left: 10, bottom: 40 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
        <XAxis 
          dataKey="name" 
          angle={-45} 
          textAnchor="end" 
          height={80}
          tick={{ fill: "hsl(var(--foreground))", fontSize: 12 }}
        />
        <YAxis 
          domain={[0, 100]}
          tick={{ fill: "hsl(var(--foreground))" }}
          label={{ value: "Success Rate (%)", angle: -90, position: "insideLeft", fill: "hsl(var(--foreground))" }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "hsl(var(--popover))",
            border: "1px solid hsl(var(--border))",
            borderRadius: "8px",
            color: "hsl(var(--popover-foreground))",
          }}
          formatter={(value: number, name: string) => {
            if (name === "successRate") return [`${value}%`, "Success Rate"];
            return [value, name];
          }}
        />
        <Bar dataKey="successRate" radius={[8, 8, 0, 0]}>
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={getColor(entry.successRate)} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};
