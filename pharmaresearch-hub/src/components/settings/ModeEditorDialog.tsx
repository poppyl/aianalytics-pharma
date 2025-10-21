import { useState, useEffect } from "react";
import { SystemMode } from "@/types/knowledge";
import { useDataSources, useWorkflows } from "@/hooks/useKnowledge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SystemPromptPreview } from "./SystemPromptPreview";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ModeEditorDialogProps {
  mode?: SystemMode;
  open: boolean;
  onClose: () => void;
  onSave: (mode: SystemMode) => void;
}

export const ModeEditorDialog = ({
  mode,
  open,
  onClose,
  onSave,
}: ModeEditorDialogProps) => {
  const { data: dataSources } = useDataSources();
  const { data: workflows } = useWorkflows();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [systemPrompt, setSystemPrompt] = useState("");
  const [selectedDataSources, setSelectedDataSources] = useState<string[]>([]);
  const [selectedWorkflows, setSelectedWorkflows] = useState<string[]>([]);
  const [outputFormat, setOutputFormat] = useState<"detailed" | "summary" | "bullet-points">("detailed");
  const [isDefault, setIsDefault] = useState(false);

  // Initialize form with mode data if editing
  useEffect(() => {
    if (mode) {
      setName(mode.name);
      setDescription(mode.description);
      setSystemPrompt(mode.systemPrompt);
      setSelectedDataSources(mode.preferredDataSources);
      setSelectedWorkflows(mode.activeWorkflows);
      setOutputFormat(mode.outputFormat || "detailed");
      setIsDefault(mode.isDefault);
    } else {
      // Reset for new mode
      setName("");
      setDescription("");
      setSystemPrompt("");
      setSelectedDataSources([]);
      setSelectedWorkflows([]);
      setOutputFormat("detailed");
      setIsDefault(false);
    }
  }, [mode, open]);

  const handleSave = () => {
    const newMode: SystemMode = {
      id: mode?.id || `mode-${Date.now()}`,
      name,
      description,
      systemPrompt,
      preferredDataSources: selectedDataSources,
      activeWorkflows: selectedWorkflows,
      outputFormat,
      isDefault,
      createdAt: mode?.createdAt || new Date(),
      updatedAt: new Date(),
    };

    onSave(newMode);
    onClose();
  };

  const toggleDataSource = (sourceId: string) => {
    setSelectedDataSources((prev) =>
      prev.includes(sourceId)
        ? prev.filter((id) => id !== sourceId)
        : [...prev, sourceId]
    );
  };

  const toggleWorkflow = (workflowId: string) => {
    setSelectedWorkflows((prev) =>
      prev.includes(workflowId)
        ? prev.filter((id) => id !== workflowId)
        : [...prev, workflowId]
    );
  };

  const isValid = name.trim() && systemPrompt.trim();

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>
            {mode ? "Edit System Mode" : "Create New System Mode"}
          </DialogTitle>
          <DialogDescription>
            Configure how the AI behaves in different contexts
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="config" className="flex-1">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="config">Configuration</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>

          <TabsContent value="config" className="space-y-4">
            <ScrollArea className="h-[500px] pr-4">
              <div className="space-y-4">
                {/* Name */}
                <div className="space-y-2">
                  <Label htmlFor="name">Mode Name</Label>
                  <Input
                    id="name"
                    placeholder="e.g., Research Mode"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Brief description of this mode's purpose..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={2}
                  />
                </div>

                {/* System Prompt */}
                <div className="space-y-2">
                  <Label htmlFor="prompt">System Prompt</Label>
                  <Textarea
                    id="prompt"
                    placeholder="You are a helpful AI assistant..."
                    value={systemPrompt}
                    onChange={(e) => setSystemPrompt(e.target.value)}
                    rows={8}
                    className="font-mono text-sm"
                  />
                  <p className="text-xs text-muted-foreground">
                    {systemPrompt.length} characters
                  </p>
                </div>

                {/* Data Sources */}
                <div className="space-y-2">
                  <Label>Preferred Data Sources</Label>
                  <div className="border rounded-md p-3 space-y-2 max-h-40 overflow-y-auto">
                    {dataSources?.slice(0, 5).map((source) => (
                      <div key={source.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={`source-${source.id}`}
                          checked={selectedDataSources.includes(source.id)}
                          onCheckedChange={() => toggleDataSource(source.id)}
                        />
                        <label
                          htmlFor={`source-${source.id}`}
                          className="text-sm cursor-pointer flex-1"
                        >
                          {source.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Workflows */}
                <div className="space-y-2">
                  <Label>Active Workflows</Label>
                  <div className="border rounded-md p-3 space-y-2 max-h-40 overflow-y-auto">
                    {workflows?.slice(0, 5).map((workflow) => (
                      <div key={workflow.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={`workflow-${workflow.id}`}
                          checked={selectedWorkflows.includes(workflow.id)}
                          onCheckedChange={() => toggleWorkflow(workflow.id)}
                        />
                        <label
                          htmlFor={`workflow-${workflow.id}`}
                          className="text-sm cursor-pointer flex-1"
                        >
                          {workflow.name}
                        </label>
                      </div>
                    ))}
                    {(!workflows || workflows.length === 0) && (
                      <p className="text-sm text-muted-foreground">No workflows available</p>
                    )}
                  </div>
                </div>

                {/* Output Format */}
                <div className="space-y-2">
                  <Label>Output Format</Label>
                  <RadioGroup value={outputFormat} onValueChange={(v: any) => setOutputFormat(v)}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="detailed" id="detailed" />
                      <Label htmlFor="detailed" className="font-normal cursor-pointer">
                        Detailed - Comprehensive responses with full context
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="summary" id="summary" />
                      <Label htmlFor="summary" className="font-normal cursor-pointer">
                        Summary - Concise overview of key points
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="bullet-points" id="bullet-points" />
                      <Label htmlFor="bullet-points" className="font-normal cursor-pointer">
                        Bullet Points - Quick, scannable format
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Set as Default */}
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="is-default"
                    checked={isDefault}
                    onCheckedChange={(checked) => setIsDefault(checked as boolean)}
                  />
                  <label htmlFor="is-default" className="text-sm cursor-pointer">
                    Set as default mode
                  </label>
                </div>
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="preview" className="space-y-4">
            <ScrollArea className="h-[500px]">
              <SystemPromptPreview content={systemPrompt} />
            </ScrollArea>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!isValid}>
            {mode ? "Save Changes" : "Create Mode"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
