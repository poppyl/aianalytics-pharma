import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { HomeNavContent } from './sections/HomeNavContent';
import { ToolsNavContent } from './sections/ToolsNavContent';
import { IntelligenceNavContent } from './sections/IntelligenceNavContent';
import { KnowledgeNavContent } from './sections/KnowledgeNavContent';
import { CommunityNavContent } from './sections/CommunityNavContent';
import { SettingsNavContent } from './sections/SettingsNavContent';

interface SecondaryNavPanelProps {
  activeSection: string;
  isExpanded: boolean;
  onToggle: () => void;
}

const getSectionLabel = (section: string): string => {
  const labels: Record<string, string> = {
    home: 'Home',
    tools: 'Tools',
    intelligence: 'Intelligence',
    knowledge: 'Knowledge',
    community: 'Community',
    settings: 'Settings',
  };
  return labels[section] || section;
};

export const SecondaryNavPanel = ({ activeSection, isExpanded, onToggle }: SecondaryNavPanelProps) => {
  const renderContent = () => {
    switch (activeSection) {
      case 'home':
        return <HomeNavContent />;
      case 'tools':
        return <ToolsNavContent />;
      case 'intelligence':
        return <IntelligenceNavContent />;
      case 'knowledge':
        return <KnowledgeNavContent />;
      case 'community':
        return <CommunityNavContent />;
      case 'settings':
        return <SettingsNavContent />;
      default:
        return null;
    }
  };

  return (
    <>
      <div 
        className={cn(
          "h-screen bg-slate-800 border-r border-slate-700 fixed left-[60px] top-0 z-40 transition-all duration-300 overflow-hidden",
          isExpanded ? "w-[200px]" : "w-0"
        )}
      >
        {isExpanded && (
          <div className="p-4 h-full flex flex-col overflow-y-auto">
            {/* Section Header */}
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">
                {getSectionLabel(activeSection)}
              </h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={onToggle}
                className="h-8 w-8 text-slate-400 hover:text-white hover:bg-slate-700"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
            </div>
            
            {/* Dynamic Content */}
            {renderContent()}
          </div>
        )}
      </div>
      
      {/* Expand Toggle (visible when collapsed) */}
      {!isExpanded && (
        <button
          onClick={onToggle}
          className="fixed left-[60px] top-1/2 -translate-y-1/2 w-6 h-12 bg-slate-800 border border-slate-700 border-l-0 rounded-r-md flex items-center justify-center hover:bg-slate-700 z-40 transition-colors"
        >
          <ChevronRight className="h-4 w-4 text-slate-400" />
        </button>
      )}
    </>
  );
};
