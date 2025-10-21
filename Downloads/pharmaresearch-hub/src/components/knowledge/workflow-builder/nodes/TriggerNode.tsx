import { memo } from "react";
import { Handle, Position, NodeProps } from "reactflow";
import { Clock } from "lucide-react";

export const TriggerNode = memo(({ data, selected }: NodeProps) => {
  return (
    <div
      className={`px-4 py-3 rounded-lg border-2 bg-card shadow-sm min-w-[180px] ${
        selected ? "border-primary" : "border-blue-500/50"
      }`}
    >
      <div className="flex items-center gap-2 mb-2">
        <div className="p-1.5 rounded bg-blue-500/10">
          <Clock className="h-4 w-4 text-blue-500" />
        </div>
        <div className="font-semibold text-sm">Trigger</div>
      </div>
      <div className="text-xs text-muted-foreground">
        {data.config?.cron || data.config?.interval
          ? data.config.cron || `Every ${data.config.interval}m`
          : "Configure schedule"}
      </div>
      <Handle
        type="source"
        position={Position.Right}
        className="!bg-blue-500 !w-3 !h-3 !border-2 !border-background"
      />
    </div>
  );
});

TriggerNode.displayName = "TriggerNode";
