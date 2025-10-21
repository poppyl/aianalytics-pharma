import { memo } from "react";
import { Handle, Position, NodeProps } from "reactflow";
import { Zap } from "lucide-react";

export const ActionNode = memo(({ data, selected }: NodeProps) => {
  const actionType = data.actionType || "save";

  return (
    <div
      className={`px-4 py-3 rounded-lg border-2 bg-card shadow-sm min-w-[180px] ${
        selected ? "border-primary" : "border-purple-500/50"
      }`}
    >
      <Handle
        type="target"
        position={Position.Left}
        className="!bg-purple-500 !w-3 !h-3 !border-2 !border-background"
      />
      <div className="flex items-center gap-2 mb-2">
        <div className="p-1.5 rounded bg-purple-500/10">
          <Zap className="h-4 w-4 text-purple-500" />
        </div>
        <div className="font-semibold text-sm">Action</div>
      </div>
      <div className="text-xs text-muted-foreground capitalize">
        {actionType.replace("-", " ")}
      </div>
      <Handle
        type="source"
        position={Position.Right}
        className="!bg-purple-500 !w-3 !h-3 !border-2 !border-background"
      />
    </div>
  );
});

ActionNode.displayName = "ActionNode";
