import { DataSource } from "@/types/knowledge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Check, Clock, Settings, Unplug, ChevronDown, Star } from "lucide-react";
import * as Icons from "lucide-react";
import { useState } from "react";
import { formatDistanceToNow } from "date-fns";

interface DataSourceCardProps {
  source: DataSource;
  onConnect?: () => void;
  onConfigure?: () => void;
  onDisconnect?: () => void;
}

export const DataSourceCard = ({ source, onConnect, onConfigure, onDisconnect }: DataSourceCardProps) => {
  const [featuresOpen, setFeaturesOpen] = useState(false);
  
  // Dynamically get icon from lucide-react
  const IconComponent = (Icons as any)[source.icon] || Icons.Database;
  
  const statusConfig = {
    connected: { color: "bg-green-500", label: "Connected", icon: Check },
    available: { color: "bg-blue-500", label: "Available", icon: Clock },
    suggested: { color: "bg-purple-500", label: "Suggested", icon: Star }
  };
  
  const config = statusConfig[source.status];
  const StatusIcon = config.icon;

  return (
    <Card className="hover:shadow-md transition-shadow relative">
      <CardHeader>
        {/* Connected indicator - top right */}
        {source.status === 'connected' && (
          <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
            <Check className="h-3.5 w-3.5 text-white" />
          </div>
        )}
        
        <div className="flex items-start justify-between pr-8">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <IconComponent className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg">{source.name}</CardTitle>
              <Badge variant="outline" className="text-xs mt-1">{source.category}</Badge>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Features & Stats */}
        <Collapsible open={featuresOpen} onOpenChange={setFeaturesOpen}>
          <CollapsibleTrigger className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ChevronDown className={`h-4 w-4 transition-transform ${featuresOpen ? 'rotate-180' : ''}`} />
            Features & Stats ({source.features.length}{source.status === 'connected' && source.stats ? ' + stats' : ''})
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-3 space-y-3">
            {/* Features */}
            <ul className="space-y-1 text-sm">
              {source.features.map((feature, idx) => (
                <li key={idx} className="flex items-center gap-2 text-muted-foreground">
                  <Check className="h-3 w-3 text-green-500" />
                  {feature}
                </li>
              ))}
            </ul>
            
            {/* Stats for connected sources */}
            {source.status === 'connected' && source.stats && (
              <>
                <div className="border-t pt-3 space-y-2">
                  {source.lastSync && (
                    <div className="text-sm text-muted-foreground flex items-center gap-2">
                      <Clock className="h-3 w-3" />
                      Last synced {formatDistanceToNow(source.lastSync, { addSuffix: true })}
                    </div>
                  )}
                  
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    {source.stats.papersIndexed !== undefined && (
                      <div>
                        <div className="text-muted-foreground text-xs">Papers Indexed</div>
                        <div className="font-semibold">{source.stats.papersIndexed.toLocaleString()}</div>
                      </div>
                    )}
                    {source.stats.datasetsAvailable !== undefined && (
                      <div>
                        <div className="text-muted-foreground text-xs">Datasets</div>
                        <div className="font-semibold">{source.stats.datasetsAvailable.toLocaleString()}</div>
                      </div>
                    )}
                    {source.stats.queryLimit && (
                      <div className="col-span-2">
                        <div className="text-muted-foreground text-xs mb-1">
                          Query Limit: {source.stats.queryLimit.used} / {source.stats.queryLimit.total}
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary transition-all"
                            style={{ width: `${(source.stats.queryLimit.used / source.stats.queryLimit.total) * 100}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
          </CollapsibleContent>
        </Collapsible>

        {/* Actions */}
        <div className="flex gap-2 pt-2 border-t">
          {source.status === 'connected' ? (
            <>
              <Button variant="outline" size="sm" onClick={onConfigure} className="flex-1">
                <Settings className="mr-2 h-4 w-4" />
                Configure
              </Button>
              <Button variant="outline" size="sm" onClick={onDisconnect}>
                <Unplug className="h-4 w-4" />
              </Button>
            </>
          ) : (
            <Button 
              variant={source.status === 'available' ? 'default' : 'outline'} 
              size="sm" 
              onClick={onConnect}
              className="flex-1"
            >
              Connect
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
