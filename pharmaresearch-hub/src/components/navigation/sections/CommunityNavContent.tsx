import { Share2, Upload, Users, Compass } from 'lucide-react';
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

export const CommunityNavContent = () => {
  return (
    <nav className="space-y-1">
      <NavLink to="/community/shared-with-me" className={navLinkClasses}>
        <Share2 className="mr-2 h-4 w-4" />
        Shared with Me
      </NavLink>
      <NavLink to="/community/my-shares" className={navLinkClasses}>
        <Upload className="mr-2 h-4 w-4" />
        My Shares
      </NavLink>
      <NavLink to="/community/teams" className={navLinkClasses}>
        <Users className="mr-2 h-4 w-4" />
        Teams
      </NavLink>
      <Separator className="my-2 bg-slate-700" />
      <NavLink to="/community/discover" className={navLinkClasses}>
        <Compass className="mr-2 h-4 w-4" />
        Discover
      </NavLink>
    </nav>
  );
};
