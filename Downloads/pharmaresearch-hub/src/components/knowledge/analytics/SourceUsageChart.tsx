import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

export const SourceUsageChart = () => {
  const data = [
    { name: "Dimensions", value: 45, color: "hsl(var(--chart-1))" },
    { name: "arXiv", value: 30, color: "hsl(var(--chart-2))" },
    { name: "PubMed", value: 20, color: "hsl(var(--chart-3))" },
    { name: "Kaggle", value: 5, color: "hsl(var(--chart-4))" },
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            backgroundColor: "hsl(var(--popover))",
            border: "1px solid hsl(var(--border))",
            borderRadius: "8px",
            color: "hsl(var(--popover-foreground))",
          }}
          formatter={(value: number, name: string) => [`${value} queries`, name]}
        />
        <Legend
          verticalAlign="bottom"
          height={36}
          iconType="circle"
          wrapperStyle={{ fontSize: "12px" }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};
