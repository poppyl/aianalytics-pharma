import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';
import { Plus, Workflow, Bell, Calendar, Tags } from 'lucide-react';
import { useWorkflows, useWorkflowTemplates } from '@/hooks/useKnowledge';
import { WorkflowCard } from '@/components/knowledge/WorkflowCard';
import { WorkflowBuilder } from '@/components/knowledge/workflow-builder/WorkflowBuilder';
import { AgenticWorkflow } from '@/types/knowledge';
import { useToast } from '@/hooks/use-toast';

const Workflows = () => {
  const { data: workflows, isLoading } = useWorkflows();
  const { data: templates, isLoading: templatesLoading } = useWorkflowTemplates();
  const [builderOpen, setBuilderOpen] = useState(false);
  const { toast } = useToast();

  const handleSaveWorkflow = (workflow: AgenticWorkflow) => {
    // TODO: Save to Supabase
    console.log('Saving workflow:', workflow);
    toast({
      title: 'Workflow saved',
      description: `"${workflow.name}" has been saved successfully.`,
    });
    setBuilderOpen(false);
  };

  const templateIcons = {
    Bell,
    Calendar,
    Tags,
    Workflow,
  };

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-3">Workflows</h1>
            <p className="text-lg text-muted-foreground">
              Manage your agentic research workflows
            </p>
          </div>
          <Button onClick={() => setBuilderOpen(true)} size="lg">
            <Plus className="h-5 w-5 mr-2" />
            Create Workflow
          </Button>
        </div>

        {/* Active Workflows */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Active Workflows</h2>
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2, 3].map((i) => (
                <Card key={i}>
                  <CardHeader>
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-full" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-24 w-full" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : workflows && workflows.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {workflows.map((workflow) => (
                <WorkflowCard key={workflow.id} workflow={workflow} />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Workflow className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-lg font-medium text-muted-foreground mb-2">No workflows yet</p>
                <p className="text-sm text-muted-foreground mb-4">Get started by creating a workflow or using a template</p>
                <Button onClick={() => setBuilderOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Your First Workflow
                </Button>
              </CardContent>
            </Card>
          )}
        </section>

        {/* Templates */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Workflow Templates</h2>
          {templatesLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <Card key={i}>
                  <CardHeader>
                    <Skeleton className="h-8 w-8 mb-2" />
                    <Skeleton className="h-5 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-full" />
                  </CardHeader>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {templates?.map((template) => {
                const Icon = templateIcons[template.icon as keyof typeof templateIcons] || Workflow;
                return (
                  <Card key={template.id} className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardHeader>
                      <Icon className="h-8 w-8 text-primary mb-2" />
                      <CardTitle className="text-base">{template.name}</CardTitle>
                      <CardDescription className="text-xs">{template.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                        <span>{template.estimatedTime}</span>
                        <span>{template.popularity} uses</span>
                      </div>
                      <Button variant="outline" size="sm" className="w-full">
                        Use Template
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </section>

        {/* Workflow Builder Dialog */}
        <Dialog open={builderOpen} onOpenChange={setBuilderOpen}>
          <DialogContent className="max-w-[95vw] max-h-[95vh] p-6">
            <WorkflowBuilder 
              onSave={handleSaveWorkflow}
              onCancel={() => setBuilderOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Workflows;
