import { MessageSquare, Book, FileText, BarChart, Grid } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';

const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
  cn(
    "flex items-center px-3 py-2 text-sm rounded-md transition-colors",
    isActive
      ? "bg-primary text-primary-foreground font-medium"
      : "text-slate-300 hover:bg-slate-700 hover:text-white"
  );

export const ToolsNavContent = () => {
  return (
    <nav className="space-y-1">
      <NavLink to="/tools/chat" className={navLinkClasses}>
        <MessageSquare className="mr-2 h-4 w-4" />
        Chat
      </NavLink>
      <NavLink to="/tools/notebooks" className={navLinkClasses}>
        <Book className="mr-2 h-4 w-4" />
        Notebooks
      </NavLink>
      <NavLink to="/tools/documents" className={navLinkClasses}>
        <FileText className="mr-2 h-4 w-4" />
        Documents
      </NavLink>
      <NavLink to="/tools/data-visualizations" className={navLinkClasses}>
        <BarChart className="mr-2 h-4 w-4" />
        Data & Visualizations
      </NavLink>
      <Separator className="my-2 bg-slate-700" />
      <NavLink to="/tools" end className={navLinkClasses}>
        <Grid className="mr-2 h-4 w-4" />
        All Tools
      </NavLink>
    </nav>
  );
};
