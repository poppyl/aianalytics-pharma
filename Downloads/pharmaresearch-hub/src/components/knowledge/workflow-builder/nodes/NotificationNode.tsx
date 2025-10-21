import { memo } from "react";
import { Handle, Position, NodeProps } from "reactflow";
import { Bell } from "lucide-react";

export const NotificationNode = memo(({ data, selected }: NodeProps) => {
  const notificationType = data.notificationType || "email";

  return (
    <div
      className={`px-4 py-3 rounded-lg border-2 bg-card shadow-sm min-w-[180px] ${
        selected ? "border-primary" : "border-red-500/50"
      }`}
    >
      <Handle
        type="target"
        position={Position.Left}
        className="!bg-red-500 !w-3 !h-3 !border-2 !border-background"
      />
      <div className="flex items-center gap-2 mb-2">
        <div className="p-1.5 rounded bg-red-500/10">
          <Bell className="h-4 w-4 text-red-500" />
        </div>
        <div className="font-semibold text-sm">Notify</div>
      </div>
      <div className="text-xs text-muted-foreground capitalize">
        {notificationType}
      </div>
    </div>
  );
});

NotificationNode.displayName = "NotificationNode";
