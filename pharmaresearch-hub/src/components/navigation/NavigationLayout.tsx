import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { useNavigation } from '@/contexts/NavigationContext';
import { PrimaryIconStrip } from './PrimaryIconStrip';
import { SecondaryNavPanel } from './SecondaryNavPanel';

interface NavigationLayoutProps {
  children: ReactNode;
}

export const NavigationLayout = ({ children }: NavigationLayoutProps) => {
  const { activeSection, setActiveSection, isSecondaryExpanded, toggleSecondary } = useNavigation();

  return (
    <div className="flex min-h-screen w-full bg-background">
      {/* Primary Icon Strip */}
      <PrimaryIconStrip 
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />
      
      {/* Secondary Navigation Panel */}
      <SecondaryNavPanel
        activeSection={activeSection}
        isExpanded={isSecondaryExpanded}
        onToggle={toggleSecondary}
      />
      
      {/* Main Content Area */}
      <main 
        className={cn(
          "flex-1 transition-all duration-300",
          isSecondaryExpanded ? "ml-[260px]" : "ml-[60px]"
        )}
      >
        <div className="min-h-screen">
          {children}
        </div>
      </main>
    </div>
  );
};
