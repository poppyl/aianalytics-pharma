import { useState } from "react";
import { useDataSources, useConnectedSources, useAvailableSources } from "@/hooks/useKnowledge";
import { useAppContext } from "@/contexts/AppContext";
import { DataSource } from "@/types/knowledge";
import { DataSourceCard } from "@/components/knowledge/DataSourceCard";
import { DataSourceGrid } from "@/components/knowledge/DataSourceGrid";
import { AuthDialog } from "@/components/knowledge/AuthDialog";
import { SourceIntelligenceFeed } from "@/components/knowledge/SourceIntelligenceFeed";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
const DataSources = () => {
  const {
    currentMode
  } = useAppContext();
  const {
    data: connectedSources,
    isLoading: connectedLoading
  } = useConnectedSources();
  const {
    data: availableSources,
    isLoading: availableLoading
  } = useAvailableSources();
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const [selectedSource, setSelectedSource] = useState<DataSource | null>(null);
  const {
    toast
  } = useToast();
  const isPharma = currentMode === 'pharma';
  const pageTitle = isPharma ? 'Intelligence Sources' : 'Data Sources';
  const pageSubtitle = isPharma ? 'Connect clinical, patent, and competitive intelligence feeds' : 'Manage your research databases and integrations';
  const addButtonText = isPharma ? 'Add Custom Intelligence Feed' : 'Add Custom Source';
  const handleConnect = (source: DataSource) => {
    setSelectedSource(source);
    setAuthDialogOpen(true);
  };
  const handleAuthSuccess = (credentials: any) => {
    // TODO: Save credentials to backend
    console.log("Connected with credentials:", credentials);
    setAuthDialogOpen(false);
  };
  const handleConfigure = (source: DataSource) => {
    toast({
      title: "Configuration",
      description: `Opening configuration for ${source.name}...`
    });
  };
  const handleDisconnect = (source: DataSource) => {
    toast({
      title: "Disconnected",
      description: `${source.name} has been disconnected.`,
      variant: "destructive"
    });
  };
  return <div className="p-8">
      <div className="max-w-[1600px] mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">{pageTitle}</h1>
            <p className="text-lg text-muted-foreground">
              {pageSubtitle}
            </p>
          </div>
          <Button variant="outline">
            <Plus className="mr-2 h-4 w-4" />
            {addButtonText}
          </Button>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Main Content Column - 8 columns */}
          <div className="col-span-12 lg:col-span-8 space-y-8">
            {/* Connected Sources */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Connected Sources</h2>
              {connectedLoading ? <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Skeleton className="h-[200px]" />
                  <Skeleton className="h-[200px]" />
                </div> : connectedSources && connectedSources.length > 0 ? <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {connectedSources.map(source => <DataSourceCard key={source.id} source={source} onConfigure={() => handleConfigure(source)} onDisconnect={() => handleDisconnect(source)} />)}
                </div> : <div className="p-8 text-center border-2 border-dashed rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    No connected sources yet
                  </p>
                </div>}
            </div>

            {/* Available Sources */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Available Sources</h2>
              {availableLoading ? <div className="space-y-4">
                  <Skeleton className="h-[150px]" />
                  <Skeleton className="h-[150px]" />
                  <Skeleton className="h-[150px]" />
                </div> : availableSources && availableSources.length > 0 ? <DataSourceGrid sources={availableSources} onConnect={handleConnect} /> : <div className="p-8 text-center border-2 border-dashed rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    No available sources found
                  </p>
                </div>}
            </div>
          </div>

          {/* Intelligence Sidebar - 4 columns */}
          <div className="col-span-12 lg:col-span-4">
            
            <SourceIntelligenceFeed />
          </div>
        </div>

        <AuthDialog source={selectedSource} open={authDialogOpen} onClose={() => setAuthDialogOpen(false)} onSuccess={handleAuthSuccess} />
      </div>
    </div>;
};
export default DataSources;