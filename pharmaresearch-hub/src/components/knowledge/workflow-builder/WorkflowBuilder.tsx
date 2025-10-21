import { useState, useCallback, useRef } from "react";
import {
  Node,
  Edge,
  useNodesState,
  useEdgesState,
  Connection,
  addEdge,
  ReactFlowProvider,
} from "reactflow";
import { AgenticWorkflow } from "@/types/knowledge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { WorkflowCanvas } from "./WorkflowCanvas";
import { NodePalette } from "./NodePalette";
import { NodeConfigPanel } from "./NodeConfigPanel";
import { Play, Save, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface WorkflowBuilderProps {
  workflow?: AgenticWorkflow;
  onSave: (workflow: AgenticWorkflow) => void;
  onCancel: () => void;
}

let nodeIdCounter = 0;

export const WorkflowBuilder = ({
  workflow,
  onSave,
  onCancel,
}: WorkflowBuilderProps) => {
  const { toast } = useToast();
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);

  // Workflow metadata
  const [name, setName] = useState(workflow?.name || "");
  const [description, setDescription] = useState(workflow?.description || "");

  // React Flow state
  const [nodes, setNodes, onNodesChange] = useNodesState(workflow?.nodes || []);
  const [edges, setEdges, onEdgesChange] = useEdgesState(workflow?.edges || []);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);

  const onConnect = useCallback(
    (params: Connection) => {
      // Validate connection (e.g., trigger can only connect once)
      setEdges((eds) => addEdge(params, eds));
    },
    [setEdges]
  );

  const onNodeClick = useCallback(
    (event: React.MouseEvent, node: Node) => {
      setSelectedNode(node);
    },
    []
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      if (!reactFlowWrapper.current || !reactFlowInstance) return;

      const type = event.dataTransfer.getData("application/reactflow");
      if (!type) return;

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      const newNode: Node = {
        id: `${type}-${nodeIdCounter++}`,
        type,
        position,
        data: {
          label: type.charAt(0).toUpperCase() + type.slice(1),
          config: {},
        },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, setNodes]
  );

  const onUpdateNode = useCallback(
    (nodeId: string, newData: any) => {
      setNodes((nds) =>
        nds.map((node) =>
          node.id === nodeId ? { ...node, data: newData } : node
        )
      );
      // Update selectedNode to reflect changes
      setSelectedNode((prev) =>
        prev?.id === nodeId ? { ...prev, data: newData } : prev
      );
    },
    [setNodes]
  );

  const validateWorkflow = (): string | null => {
    if (!name.trim()) return "Workflow name is required";
    if (nodes.length === 0) return "Add at least one node to the workflow";

    const triggerNodes = nodes.filter((n) => n.type === "trigger");
    if (triggerNodes.length === 0) return "Workflow must have a trigger node";
    if (triggerNodes.length > 1) return "Workflow can only have one trigger node";

    // Check for orphaned nodes (except trigger)
    const connectedNodeIds = new Set<string>();
    edges.forEach((edge) => {
      connectedNodeIds.add(edge.source);
      connectedNodeIds.add(edge.target);
    });

    const orphanedNodes = nodes.filter(
      (n) => n.type !== "trigger" && !connectedNodeIds.has(n.id)
    );
    if (orphanedNodes.length > 0)
      return "All nodes must be connected to the workflow";

    return null;
  };

  const handleSave = () => {
    const error = validateWorkflow();
    if (error) {
      toast({
        title: "Validation Error",
        description: error,
        variant: "destructive",
      });
      return;
    }

    const triggerNode = nodes.find((n) => n.type === "trigger");
    const workflowData: AgenticWorkflow = {
      id: workflow?.id || `workflow-${Date.now()}`,
      name,
      description,
      status: workflow?.status || "paused",
      trigger: {
        type: "time",
        config: triggerNode?.data.config || {},
      },
      nodes: nodes.map((n) => ({
        id: n.id,
        type: n.type as any,
        data: n.data,
        position: n.position,
      })),
      edges: edges.map((e) => ({
        id: e.id,
        source: e.source,
        target: e.target,
        type: e.type,
      })),
      stats: workflow?.stats || {
        totalRuns: 0,
        successRate: 0,
        papersProcessed: 0,
      },
      createdAt: workflow?.createdAt || new Date(),
      updatedAt: new Date(),
    };

    onSave(workflowData);
  };

  const handleTest = () => {
    const error = validateWorkflow();
    if (error) {
      toast({
        title: "Cannot Test",
        description: error,
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Test Run Started",
      description: "Simulating workflow execution...",
    });

    // TODO: Implement actual test execution
    setTimeout(() => {
      toast({
        title: "Test Complete",
        description: "Workflow executed successfully with mock data",
      });
    }, 2000);
  };

  return (
    <ReactFlowProvider>
      <div className="h-[85vh] flex flex-col gap-4">
        {/* Header with metadata */}
        <div className="space-y-4 pb-4 border-b">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="workflow-name">Workflow Name</Label>
              <Input
                id="workflow-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., Daily arXiv Monitor"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="workflow-description">Description</Label>
              <Input
                id="workflow-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Brief description of what this workflow does"
              />
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={handleTest} variant="outline">
              <Play className="mr-2 h-4 w-4" />
              Test Run
            </Button>
            <Button onClick={handleSave}>
              <Save className="mr-2 h-4 w-4" />
              Save Workflow
            </Button>
            <Button onClick={onCancel} variant="outline" className="ml-auto">
              <X className="mr-2 h-4 w-4" />
              Cancel
            </Button>
          </div>
        </div>

        {/* Main builder layout */}
        <div className="flex-1 grid grid-cols-12 gap-4 min-h-0">
          {/* Node Palette - Left */}
          <div className="col-span-2 overflow-y-auto">
            <NodePalette />
          </div>

          {/* Canvas - Center */}
          <div
            ref={reactFlowWrapper}
            className="col-span-7 h-full"
          >
            <WorkflowCanvas
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              onNodeClick={onNodeClick}
              onDrop={onDrop}
              onDragOver={onDragOver}
            />
          </div>

          {/* Configuration Panel - Right */}
          <div className="col-span-3 overflow-y-auto">
            {selectedNode ? (
              <NodeConfigPanel
                selectedNode={selectedNode}
                onUpdateNode={onUpdateNode}
                onClose={() => setSelectedNode(null)}
              />
            ) : (
              <div className="h-full flex items-center justify-center text-muted-foreground text-sm text-center p-4">
                Select a node to configure its properties
              </div>
            )}
          </div>
        </div>
      </div>
    </ReactFlowProvider>
  );
};
