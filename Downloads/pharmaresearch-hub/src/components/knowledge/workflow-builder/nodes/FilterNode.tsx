import { memo } from "react";
import { Handle, Position, NodeProps } from "reactflow";
import { Filter } from "lucide-react";

export const FilterNode = memo(({ data, selected }: NodeProps) => {
  const hasFilters = data.criteria && Object.keys(data.criteria).length > 0;

  return (
    <div
      className={`px-4 py-3 rounded-lg border-2 bg-card shadow-sm min-w-[180px] ${
        selected ? "border-primary" : "border-yellow-500/50"
      }`}
    >
      <Handle
        type="target"
        position={Position.Left}
        className="!bg-yellow-500 !w-3 !h-3 !border-2 !border-background"
      />
      <div className="flex items-center gap-2 mb-2">
        <div className="p-1.5 rounded bg-yellow-500/10">
          <Filter className="h-4 w-4 text-yellow-500" />
        </div>
        <div className="font-semibold text-sm">Filter</div>
      </div>
      <div className="text-xs text-muted-foreground">
        {hasFilters ? "Filters configured" : "Add criteria"}
      </div>
      <Handle
        type="source"
        position={Position.Right}
        className="!bg-yellow-500 !w-3 !h-3 !border-2 !border-background"
      />
    </div>
  );
});

FilterNode.displayName = "FilterNode";
