import { Clock, Search, Filter, Zap, Bell } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const nodeDefinitions = [
  {
    type: "trigger",
    label: "Trigger",
    icon: Clock,
    description: "Start workflow on schedule or event",
    color: "bg-blue-500",
  },
  {
    type: "search",
    label: "Search Source",
    icon: Search,
    description: "Query data sources",
    color: "bg-green-500",
  },
  {
    type: "filter",
    label: "Filter Results",
    icon: Filter,
    description: "Apply criteria to narrow results",
    color: "bg-yellow-500",
  },
  {
    type: "action",
    label: "Action",
    icon: Zap,
    description: "Save, tag, or process",
    color: "bg-purple-500",
  },
  {
    type: "notification",
    label: "Notify",
    icon: Bell,
    description: "Send alerts",
    color: "bg-red-500",
  },
];

export const NodePalette = () => {
  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-base">Node Palette</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {nodeDefinitions.map((node) => {
          const Icon = node.icon;
          return (
            <div
              key={node.type}
              draggable
              onDragStart={(e) => onDragStart(e, node.type)}
              className="flex items-start gap-3 p-3 rounded-lg border bg-card hover:bg-accent cursor-move transition-colors"
            >
              <div className={`p-2 rounded ${node.color} bg-opacity-10`}>
                <Icon className="h-4 w-4" style={{ color: `var(--${node.color})` }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">{node.label}</p>
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {node.description}
                </p>
              </div>
            </div>
          );
        })}
        <div className="pt-4 text-xs text-muted-foreground">
          Drag nodes onto the canvas to build your workflow
        </div>
      </CardContent>
    </Card>
  );
};
