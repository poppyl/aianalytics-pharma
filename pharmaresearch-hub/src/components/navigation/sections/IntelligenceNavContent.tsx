import { Telescope, TrendingUp, BarChart3, Shield, LineChart, Radar } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';

const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
  cn(
    "flex items-center px-3 py-2 text-sm rounded-md transition-colors",
    isActive
      ? "bg-primary text-primary-foreground font-medium"
      : "text-slate-300 hover:bg-slate-700 hover:text-white"
  );

export const IntelligenceNavContent = () => {
  return (
    <nav className="space-y-1">
      <NavLink to="/insights/horizon" className={navLinkClasses}>
        <Telescope className="mr-2 h-4 w-4" />
        Horizon Scanning
      </NavLink>
      <NavLink to="/insights/pipeline" className={navLinkClasses}>
        <TrendingUp className="mr-2 h-4 w-4" />
        Pipeline Intelligence
      </NavLink>
      <NavLink to="/insights/analytics" className={navLinkClasses}>
        <BarChart3 className="mr-2 h-4 w-4" />
        Analytics
      </NavLink>
      <NavLink to="/insights/competitive" className={navLinkClasses}>
        <Shield className="mr-2 h-4 w-4" />
        Competitive Intelligence
      </NavLink>
      <NavLink to="/insights/market" className={navLinkClasses}>
        <LineChart className="mr-2 h-4 w-4" />
        Market Landscape
      </NavLink>
      <NavLink to="/insights/tech-radar" className={navLinkClasses}>
        <Radar className="mr-2 h-4 w-4" />
        Technology Radar
      </NavLink>
    </nav>
  );
};
