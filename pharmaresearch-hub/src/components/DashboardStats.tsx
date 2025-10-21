import { TrendingUp, FileText, Bookmark, Clock } from "lucide-react";

const stats = [
  { label: "New Publications", value: "24", change: "+12%", icon: FileText },
  { label: "Articles Saved", value: "156", change: "+8%", icon: Bookmark },
  { label: "Reading Time", value: "18h", change: "+4h", icon: Clock },
  { label: "Topics Tracked", value: "8", change: "+2", icon: TrendingUp },
];

export function DashboardStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
      {stats.map((stat) => (
        <div key={stat.label} className="card-elevated rounded-xl p-6 gradient-bg">
          <div className="flex items-center justify-between mb-4">
            <stat.icon className="h-5 w-5 text-accent" />
            <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded-full">
              {stat.change}
            </span>
          </div>
          <p className="text-2xl font-bold text-foreground mb-1">{stat.value}</p>
          <p className="text-sm text-muted-foreground">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
