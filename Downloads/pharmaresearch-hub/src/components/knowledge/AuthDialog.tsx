import { DataSource } from "@/types/knowledge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { ExternalLink, Key, Lock, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AuthDialogProps {
  source: DataSource | null;
  open: boolean;
  onClose: () => void;
  onSuccess: (credentials: any) => void;
}

export const AuthDialog = ({ source, open, onClose, onSuccess }: AuthDialogProps) => {
  const [apiKey, setApiKey] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);
  const { toast } = useToast();

  if (!source) return null;

  const handleConnect = async () => {
    setIsConnecting(true);
    
    // Simulate connection
    setTimeout(() => {
      setIsConnecting(false);
      
      const credentials = source.authType === 'api-key' 
        ? { apiKey } 
        : { token: 'oauth-token-placeholder' };
      
      onSuccess(credentials);
      setApiKey("");
      
      toast({
        title: "Connected successfully",
        description: `${source.name} has been connected to your account.`,
      });
    }, 1000);
  };

  const renderAuthForm = () => {
    switch (source.authType) {
      case 'oauth':
        return (
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
              <Shield className="h-5 w-5 text-primary mt-0.5" />
              <div className="text-sm">
                <p className="font-medium mb-1">Secure OAuth Connection</p>
                <p className="text-muted-foreground">
                  You'll be redirected to {source.name} to authorize access. We'll never see your password.
                </p>
              </div>
            </div>
            
            <Button 
              onClick={handleConnect} 
              disabled={isConnecting}
              className="w-full"
            >
              {isConnecting ? "Connecting..." : `Connect with ${source.name}`}
            </Button>
          </div>
        );
      
      case 'api-key':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="api-key">API Key</Label>
              <div className="relative">
                <Key className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="api-key"
                  type="password"
                  placeholder="Enter your API key"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="pl-10"
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Your API key will be encrypted and stored securely.
              </p>
            </div>

            <div className="flex items-start gap-2 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
              <ExternalLink className="h-4 w-4 text-blue-500 mt-0.5" />
              <div className="text-xs">
                <p className="font-medium text-blue-500 mb-1">Where to find your API key</p>
                <a 
                  href="#" 
                  className="text-blue-500 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit {source.name} API documentation →
                </a>
              </div>
            </div>

            <Button 
              onClick={handleConnect} 
              disabled={!apiKey || isConnecting}
              className="w-full"
            >
              {isConnecting ? "Connecting..." : "Connect"}
            </Button>
          </div>
        );
      
      case 'sso':
        return (
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
              <Lock className="h-5 w-5 text-primary mt-0.5" />
              <div className="text-sm">
                <p className="font-medium mb-1">Institutional SSO</p>
                <p className="text-muted-foreground">
                  Connect using your institution's single sign-on system.
                </p>
              </div>
            </div>
            
            <Button 
              onClick={handleConnect} 
              disabled={isConnecting}
              className="w-full"
            >
              {isConnecting ? "Connecting..." : "Connect via SSO"}
            </Button>
          </div>
        );
      
      case 'none':
        return (
          <div className="space-y-4">
            <div className="p-4 bg-muted/50 rounded-lg text-sm text-muted-foreground">
              This data source is publicly available and doesn't require authentication.
            </div>
            
            <Button 
              onClick={handleConnect} 
              disabled={isConnecting}
              className="w-full"
            >
              {isConnecting ? "Connecting..." : "Add Source"}
            </Button>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Connect to {source.name}</DialogTitle>
          <DialogDescription>
            {source.category} • {source.type}
          </DialogDescription>
        </DialogHeader>
        
        {renderAuthForm()}
      </DialogContent>
    </Dialog>
  );
};
