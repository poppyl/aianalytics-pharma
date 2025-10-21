import { Home, Wrench, Target, Database, Users, Settings } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface PrimaryNavItem {
  id: string;
  icon: LucideIcon;
  label: string;
}

const primaryNavItems: PrimaryNavItem[] = [
  { id: 'home', icon: Home, label: 'Home' },
  { id: 'tools', icon: Wrench, label: 'Tools' },
  { id: 'intelligence', icon: Target, label: 'Intelligence' },
  { id: 'knowledge', icon: Database, label: 'Knowledge' },
  { id: 'community', icon: Users, label: 'Community' },
  { id: 'settings', icon: Settings, label: 'Settings' },
];

interface PrimaryIconStripProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export const PrimaryIconStrip = ({ activeSection, onSectionChange }: PrimaryIconStripProps) => {
  return (
    <div className="w-[60px] h-screen bg-slate-900 border-r border-slate-800 flex flex-col items-center py-4 fixed left-0 top-0 z-50">
      {/* Logo/Brand */}
      <div className="mb-8">
        <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
          <span className="text-primary-foreground font-bold text-lg">P</span>
        </div>
      </div>
      
      {/* Navigation Items */}
      <nav className="flex-1 flex flex-col gap-2 w-full">
        {primaryNavItems.map((item) => (
          <Tooltip key={item.id}>
            <TooltipTrigger asChild>
              <button
                onClick={() => onSectionChange(item.id)}
                className={cn(
                  "w-12 h-12 mx-auto rounded-lg flex items-center justify-center transition-all relative",
                  "hover:bg-slate-800 hover:scale-110",
                  activeSection === item.id 
                    ? "bg-primary text-primary-foreground before:absolute before:left-0 before:w-1 before:h-full before:bg-primary-foreground before:rounded-r" 
                    : "text-slate-400"
                )}
              >
                <item.icon className="w-6 h-6" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="right">{item.label}</TooltipContent>
          </Tooltip>
        ))}
      </nav>
      
      {/* User Avatar */}
      <div className="mt-auto">
        <Avatar className="w-10 h-10">
          <AvatarFallback className="bg-slate-700 text-slate-300">U</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
};
