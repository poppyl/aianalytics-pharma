import { useState } from "react";
import { useSystemModes } from "@/hooks/useKnowledge";
import { SystemMode } from "@/types/knowledge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Plus } from "lucide-react";
import { SystemModeCard } from "@/components/settings/SystemModeCard";
import { ModeEditorDialog } from "@/components/settings/ModeEditorDialog";
import { useToast } from "@/hooks/use-toast";

const SystemInstructions = () => {
  const { data: modes, isLoading } = useSystemModes();
  const [editorOpen, setEditorOpen] = useState(false);
  const [selectedMode, setSelectedMode] = useState<SystemMode | undefined>();
  const { toast } = useToast();

  const handleSave = (mode: SystemMode) => {
    // TODO: Save to Supabase
    console.log("Saving mode:", mode);
    toast({
      title: "Mode saved",
      description: `"${mode.name}" has been ${selectedMode ? "updated" : "created"} successfully.`,
    });
    setEditorOpen(false);
    setSelectedMode(undefined);
  };

  const handleSetDefault = (modeId: string) => {
    // TODO: Update Supabase
    console.log("Setting default mode:", modeId);
    toast({
      title: "Default mode updated",
      description: "This mode is now your default AI behavior.",
    });
  };

  const handleDelete = (modeId: string) => {
    // TODO: Delete from Supabase
    console.log("Deleting mode:", modeId);
    toast({
      title: "Mode deleted",
      description: "The system mode has been removed.",
    });
  };

  const handleDuplicate = (mode: SystemMode) => {
    const duplicate: SystemMode = {
      ...mode,
      id: `mode-${Date.now()}`,
      name: `${mode.name} (Copy)`,
      isDefault: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    handleSave(duplicate);
  };

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-3">
              System Instructions
            </h1>
            <p className="text-lg text-muted-foreground">
              Configure AI behavior modes for different contexts
            </p>
          </div>
          <Button
            onClick={() => {
              setSelectedMode(undefined);
              setEditorOpen(true);
            }}
          >
            <Plus className="mr-2 h-4 w-4" />
            Create Mode
          </Button>
        </div>

        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton className="h-6 w-1/3 mb-2" />
                  <Skeleton className="h-4 w-2/3 mb-4" />
                  <Skeleton className="h-10 w-full" />
                </CardHeader>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {modes && modes.length > 0 ? (
              modes.map((mode) => (
                <SystemModeCard
                  key={mode.id}
                  mode={mode}
                  onEdit={() => {
                    setSelectedMode(mode);
                    setEditorOpen(true);
                  }}
                  onDuplicate={() => handleDuplicate(mode)}
                  onDelete={() => handleDelete(mode.id)}
                  onSetDefault={() => handleSetDefault(mode.id)}
                />
              ))
            ) : (
              <Card className="p-12 text-center">
                <p className="text-muted-foreground mb-4">
                  No system modes configured yet
                </p>
                <Button
                  onClick={() => {
                    setSelectedMode(undefined);
                    setEditorOpen(true);
                  }}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Create Your First Mode
                </Button>
              </Card>
            )}
          </div>
        )}

        <ModeEditorDialog
          mode={selectedMode}
          open={editorOpen}
          onClose={() => {
            setEditorOpen(false);
            setSelectedMode(undefined);
          }}
          onSave={handleSave}
        />
      </div>
    </div>
  );
};

export default SystemInstructions;
