import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SystemMode } from "@/types/knowledge";
import { Edit, Copy, Trash2, Star } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface SystemModeCardProps {
  mode: SystemMode;
  onEdit: () => void;
  onDuplicate: () => void;
  onDelete: () => void;
  onSetDefault: () => void;
}

export const SystemModeCard = ({
  mode,
  onEdit,
  onDuplicate,
  onDelete,
  onSetDefault,
}: SystemModeCardProps) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <Card 
        className="hover:shadow-md transition-shadow cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-xl font-semibold">{mode.name}</h3>
                {mode.isDefault && (
                  <Badge variant="default" className="text-xs">
                    DEFAULT
                  </Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground">{mode.description}</p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Data Sources */}
          <div>
            <p className="text-xs font-medium text-muted-foreground mb-2">
              Data Sources
            </p>
            <div className="flex flex-wrap gap-1">
              {mode.preferredDataSources.length > 0 ? (
                mode.preferredDataSources.slice(0, 3).map((sourceId, idx) => (
                  <Badge key={idx} variant="secondary" className="text-xs">
                    {sourceId}
                  </Badge>
                ))
              ) : (
                <span className="text-xs text-muted-foreground">None configured</span>
              )}
              {mode.preferredDataSources.length > 3 && (
                <Badge variant="secondary" className="text-xs">
                  +{mode.preferredDataSources.length - 3} more
                </Badge>
              )}
            </div>
          </div>

          {/* Active Workflows */}
          <div>
            <p className="text-xs font-medium text-muted-foreground mb-2">
              Active Workflows
            </p>
            <div className="flex flex-wrap gap-1">
              {mode.activeWorkflows.length > 0 ? (
                mode.activeWorkflows.slice(0, 2).map((workflowId, idx) => (
                  <Badge key={idx} variant="outline" className="text-xs">
                    {workflowId}
                  </Badge>
                ))
              ) : (
                <span className="text-xs text-muted-foreground">None</span>
              )}
              {mode.activeWorkflows.length > 2 && (
                <Badge variant="outline" className="text-xs">
                  +{mode.activeWorkflows.length - 2} more
                </Badge>
              )}
            </div>
          </div>

          {/* Output Format */}
          {mode.outputFormat && (
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-2">
                Output Format
              </p>
              <Badge variant="secondary" className="text-xs capitalize">
                {mode.outputFormat.replace("-", " ")}
              </Badge>
            </div>
          )}

          {/* Expanded System Prompt */}
          {expanded && (
            <div className="pt-4 border-t">
              <p className="text-xs font-medium text-muted-foreground mb-2">
                System Prompt
              </p>
              <div className="bg-muted p-3 rounded-md text-xs font-mono whitespace-pre-wrap max-h-40 overflow-y-auto">
                {mode.systemPrompt}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-2 pt-2" onClick={(e) => e.stopPropagation()}>
            <Button
              variant="outline"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onEdit();
              }}
            >
              <Edit className="h-3 w-3 mr-1" />
              Edit
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onDuplicate();
              }}
            >
              <Copy className="h-3 w-3 mr-1" />
              Duplicate
            </Button>
            {!mode.isDefault ? (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSetDefault();
                  }}
                >
                  <Star className="h-3 w-3 mr-1" />
                  Set as Default
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowDeleteDialog(true);
                  }}
                >
                  <Trash2 className="h-3 w-3 mr-1" />
                  Delete
                </Button>
              </>
            ) : (
              <Button
                variant="outline"
                size="sm"
                disabled
                className="ml-auto"
              >
                <Star className="h-3 w-3 mr-1 fill-current" />
                Default Mode
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete System Mode</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{mode.name}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                onDelete();
                setShowDeleteDialog(false);
              }}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
