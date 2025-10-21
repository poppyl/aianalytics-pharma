import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";
import { format, subDays } from "date-fns";

export const TimeSeriesChart = () => {
  // Generate mock time series data for last 30 days
  const generateTimeSeriesData = () => {
    const data = [];
    for (let i = 29; i >= 0; i--) {
      const date = subDays(new Date(), i);
      const baseValue = 50;
      const randomVariation = Math.floor(Math.random() * 40) - 10;
      const trend = (29 - i) * 1.5; // Upward trend
      const value = Math.max(0, baseValue + randomVariation + trend);
      
      data.push({
        date: format(date, "MMM dd"),
        fullDate: format(date, "yyyy-MM-dd"),
        papers: value,
      });
    }
    return data;
  };

  const data = generateTimeSeriesData();

  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 20 }}>
        <defs>
          <linearGradient id="colorPapers" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
            <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
        <XAxis
          dataKey="date"
          tick={{ fill: "hsl(var(--foreground))", fontSize: 11 }}
          interval="preserveStartEnd"
        />
        <YAxis 
          tick={{ fill: "hsl(var(--foreground))" }}
          label={{ value: "Papers", angle: -90, position: "insideLeft", fill: "hsl(var(--foreground))" }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "hsl(var(--popover))",
            border: "1px solid hsl(var(--border))",
            borderRadius: "8px",
            color: "hsl(var(--popover-foreground))",
          }}
          labelFormatter={(label) => `Date: ${label}`}
          formatter={(value: number) => [value, "Papers Processed"]}
        />
        <Area
          type="monotone"
          dataKey="papers"
          stroke="hsl(var(--primary))"
          strokeWidth={2}
          fillOpacity={1}
          fill="url(#colorPapers)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};
