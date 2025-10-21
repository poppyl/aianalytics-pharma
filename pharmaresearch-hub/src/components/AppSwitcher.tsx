import { useAppContext } from '@/contexts/AppContext';
import { APP_CONFIGS } from '@/types/app';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

export const AppSwitcher = () => {
  const { currentMode, config, switchApp } = useAppContext();
  const { toast } = useToast();

  const handleSwitch = (mode: typeof currentMode) => {
    if (mode === currentMode) return;
    switchApp(mode);
    toast({
      title: `Switched to ${APP_CONFIGS[mode].name}`,
      description: APP_CONFIGS[mode].description,
    });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full justify-start gap-2 bg-background">
          <span className="text-lg">{config.icon}</span>
          <span className="font-medium text-foreground">{config.name}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="end">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground mb-3">Switch Application</p>
          {Object.values(APP_CONFIGS).map((appConfig) => (
            <button
              key={appConfig.mode}
              onClick={() => handleSwitch(appConfig.mode)}
              className={`w-full text-left p-3 rounded-lg border transition-colors ${
                currentMode === appConfig.mode
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:bg-accent'
              }`}
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl">{appConfig.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{appConfig.name}</p>
                    <Badge variant="secondary" className="text-xs">Demo</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{appConfig.description}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};
