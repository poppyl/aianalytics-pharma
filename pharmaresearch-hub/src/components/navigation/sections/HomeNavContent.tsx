import { Clock, Bell, Zap } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
  cn(
    "flex items-center px-3 py-2 text-sm rounded-md transition-colors",
    isActive
      ? "bg-primary text-primary-foreground font-medium"
      : "text-slate-300 hover:bg-slate-700 hover:text-white"
  );

export const HomeNavContent = () => {
  return (
    <nav className="space-y-1">
      <NavLink to="/" end className={navLinkClasses}>
        <Clock className="mr-2 h-4 w-4" />
        Recent Activity
      </NavLink>
    </nav>
  );
};
