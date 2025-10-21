import { Node } from "reactflow";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface NodeConfigPanelProps {
  selectedNode: Node | null;
  onUpdateNode: (nodeId: string, data: any) => void;
  onClose: () => void;
}

export const NodeConfigPanel = ({
  selectedNode,
  onUpdateNode,
  onClose,
}: NodeConfigPanelProps) => {
  if (!selectedNode) return null;

  const handleUpdate = (key: string, value: any) => {
    onUpdateNode(selectedNode.id, {
      ...selectedNode.data,
      [key]: value,
    });
  };

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-base">Configure Node</CardTitle>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Trigger Node Config */}
        {selectedNode.type === "trigger" && (
          <>
            <div className="space-y-2">
              <Label htmlFor="cron">Cron Expression</Label>
              <Input
                id="cron"
                placeholder="0 9 * * *"
                value={selectedNode.data.config?.cron || ""}
                onChange={(e) =>
                  handleUpdate("config", {
                    ...selectedNode.data.config,
                    cron: e.target.value,
                  })
                }
              />
              <p className="text-xs text-muted-foreground">
                Example: "0 9 * * *" for daily at 9 AM
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="interval">Or Interval (minutes)</Label>
              <Input
                id="interval"
                type="number"
                placeholder="60"
                value={selectedNode.data.config?.interval || ""}
                onChange={(e) =>
                  handleUpdate("config", {
                    ...selectedNode.data.config,
                    interval: parseInt(e.target.value) || 0,
                  })
                }
              />
            </div>
          </>
        )}

        {/* Search Node Config */}
        {selectedNode.type === "search" && (
          <>
            <div className="space-y-2">
              <Label htmlFor="keywords">Keywords</Label>
              <Input
                id="keywords"
                placeholder="machine learning, transformers"
                value={selectedNode.data.query?.keywords?.join(", ") || ""}
                onChange={(e) =>
                  handleUpdate("query", {
                    ...selectedNode.data.query,
                    keywords: e.target.value.split(",").map((k) => k.trim()),
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="maxResults">Max Results</Label>
              <Input
                id="maxResults"
                type="number"
                placeholder="100"
                value={selectedNode.data.query?.maxResults || 100}
                onChange={(e) =>
                  handleUpdate("query", {
                    ...selectedNode.data.query,
                    maxResults: parseInt(e.target.value) || 100,
                  })
                }
              />
            </div>
          </>
        )}

        {/* Filter Node Config */}
        {selectedNode.type === "filter" && (
          <>
            <div className="space-y-2">
              <Label htmlFor="minCitations">Min Citations</Label>
              <Input
                id="minCitations"
                type="number"
                placeholder="10"
                value={selectedNode.data.criteria?.minCitations || ""}
                onChange={(e) =>
                  handleUpdate("criteria", {
                    ...selectedNode.data.criteria,
                    minCitations: parseInt(e.target.value) || 0,
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="keywordIncludes">Include Keywords</Label>
              <Input
                id="keywordIncludes"
                placeholder="deep learning, neural"
                value={selectedNode.data.criteria?.keywordIncludes?.join(", ") || ""}
                onChange={(e) =>
                  handleUpdate("criteria", {
                    ...selectedNode.data.criteria,
                    keywordIncludes: e.target.value.split(",").map((k) => k.trim()),
                  })
                }
              />
            </div>
          </>
        )}

        {/* Action Node Config */}
        {selectedNode.type === "action" && (
          <>
            <div className="space-y-2">
              <Label htmlFor="actionType">Action Type</Label>
              <select
                id="actionType"
                className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm"
                value={selectedNode.data.actionType || "save"}
                onChange={(e) => handleUpdate("actionType", e.target.value)}
              >
                <option value="save">Save to Library</option>
                <option value="tag">Tag Papers</option>
                <option value="summarize">Generate Summary</option>
                <option value="export">Export Data</option>
              </select>
            </div>
            {selectedNode.data.actionType === "tag" && (
              <div className="space-y-2">
                <Label htmlFor="tags">Tags</Label>
                <Input
                  id="tags"
                  placeholder="AI, Research, Important"
                  value={selectedNode.data.config?.tags?.join(", ") || ""}
                  onChange={(e) =>
                    handleUpdate("config", {
                      ...selectedNode.data.config,
                      tags: e.target.value.split(",").map((t) => t.trim()),
                    })
                  }
                />
              </div>
            )}
          </>
        )}

        {/* Notification Node Config */}
        {selectedNode.type === "notification" && (
          <>
            <div className="space-y-2">
              <Label htmlFor="notificationType">Notification Type</Label>
              <select
                id="notificationType"
                className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm"
                value={selectedNode.data.notificationType || "email"}
                onChange={(e) => handleUpdate("notificationType", e.target.value)}
              >
                <option value="email">Email</option>
                <option value="in-app">In-App</option>
                <option value="slack">Slack</option>
                <option value="webhook">Webhook</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="template">Message Template</Label>
              <Textarea
                id="template"
                placeholder="Found {{count}} new papers..."
                value={selectedNode.data.config?.template || ""}
                onChange={(e) =>
                  handleUpdate("config", {
                    ...selectedNode.data.config,
                    template: e.target.value,
                  })
                }
                rows={4}
              />
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};
