import { memo } from "react";
import { Handle, Position, NodeProps } from "reactflow";
import { Search } from "lucide-react";

export const SearchNode = memo(({ data, selected }: NodeProps) => {
  const sourceCount = data.dataSourceIds?.length || 0;

  return (
    <div
      className={`px-4 py-3 rounded-lg border-2 bg-card shadow-sm min-w-[180px] ${
        selected ? "border-primary" : "border-green-500/50"
      }`}
    >
      <Handle
        type="target"
        position={Position.Left}
        className="!bg-green-500 !w-3 !h-3 !border-2 !border-background"
      />
      <div className="flex items-center gap-2 mb-2">
        <div className="p-1.5 rounded bg-green-500/10">
          <Search className="h-4 w-4 text-green-500" />
        </div>
        <div className="font-semibold text-sm">Search</div>
      </div>
      <div className="text-xs text-muted-foreground">
        {sourceCount > 0
          ? `${sourceCount} source${sourceCount > 1 ? "s" : ""}`
          : "Select sources"}
      </div>
      <Handle
        type="source"
        position={Position.Right}
        className="!bg-green-500 !w-3 !h-3 !border-2 !border-background"
      />
    </div>
  );
});

SearchNode.displayName = "SearchNode";
