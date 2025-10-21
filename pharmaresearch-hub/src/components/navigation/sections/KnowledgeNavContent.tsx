import { Database, Network, Library as LibraryIcon, Zap } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';

const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
  cn(
    "flex items-center px-3 py-2 text-sm rounded-md transition-colors",
    isActive
      ? "bg-primary text-primary-foreground font-medium"
      : "text-slate-300 hover:bg-slate-700 hover:text-white"
  );

export const KnowledgeNavContent = () => {
  return (
    <nav className="space-y-1">
      <NavLink to="/knowledge/data-sources" className={navLinkClasses}>
        <Database className="mr-2 h-4 w-4" />
        Data Sources
      </NavLink>
      <NavLink to="/knowledge/graph" className={navLinkClasses}>
        <Network className="mr-2 h-4 w-4" />
        Knowledge Graph
      </NavLink>
      <NavLink to="/library" className={navLinkClasses}>
        <LibraryIcon className="mr-2 h-4 w-4" />
        Library
      </NavLink>
      <NavLink to="/knowledge/workflows" className={navLinkClasses}>
        <Zap className="mr-2 h-4 w-4" />
        Workflows
      </NavLink>
    </nav>
  );
};
