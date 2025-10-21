import { User, Plug, Sliders, Lock, Terminal } from 'lucide-react';
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

export const SettingsNavContent = () => {
  return (
    <nav className="space-y-1">
      <NavLink to="/settings/profile" className={navLinkClasses}>
        <User className="mr-2 h-4 w-4" />
        Profile
      </NavLink>
      <NavLink to="/settings/integrations" className={navLinkClasses}>
        <Plug className="mr-2 h-4 w-4" />
        Integrations
      </NavLink>
      <NavLink to="/settings/preferences" className={navLinkClasses}>
        <Sliders className="mr-2 h-4 w-4" />
        Preferences
      </NavLink>
      <NavLink to="/settings/security" className={navLinkClasses}>
        <Lock className="mr-2 h-4 w-4" />
        Security
      </NavLink>
      <Separator className="my-2 bg-slate-700" />
      <NavLink to="/settings/system-instructions" className={navLinkClasses}>
        <Terminal className="mr-2 h-4 w-4" />
        System Instructions
      </NavLink>
    </nav>
  );
};
