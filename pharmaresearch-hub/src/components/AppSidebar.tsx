import { MessageSquarePlus, Library, Compass, Settings, Users, BookOpen, Zap, BarChart3, Database, ChevronRight, Telescope, TrendingUp, Shield, LineChart, Radar } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { useState } from "react";
import { useAppContext } from "@/contexts/AppContext";
import { AppSwitcher } from "@/components/AppSwitcher";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const mainItems = [
  { title: "New Chat", url: "/", icon: MessageSquarePlus, primary: true },
];

  const pharmaInsightsItems = [
    { title: "Pipeline Intelligence", url: "/insights/pipeline", icon: TrendingUp },
    { title: "Analytics", url: "/insights/analytics", icon: BarChart3 },
    { title: "Competitive Intelligence", url: "/insights/competitive", icon: Shield },
    { title: "Market Landscape", url: "/insights/market", icon: LineChart },
    { title: "Horizon Scanning", url: "/insights/horizon", icon: Telescope },
    { title: "Technology Radar", url: "/insights/tech-radar", icon: Radar },
  ];

const knowledgeItems = [
  { title: "Workflows", url: "/knowledge/workflows", icon: Zap },
  { title: "Data Sources", url: "/knowledge/data-sources", icon: Database },
];

const navigationItems = [
  { title: "Library", url: "/library", icon: Library },
  { title: "Browse", url: "/browse", icon: Compass },
  { title: "Community", url: "/community", icon: Users },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";
  const { currentMode } = useAppContext();
  const location = useLocation();
  
  const isInsightsRoute = location.pathname.startsWith('/insights');
  const isKnowledgeRoute = location.pathname.startsWith('/knowledge');
  const [insightsOpen, setInsightsOpen] = useState(isInsightsRoute);
  const [knowledgeOpen, setKnowledgeOpen] = useState(isKnowledgeRoute);

  return (
    <Sidebar collapsible="icon" className="border-sidebar-border">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/70 uppercase text-xs font-semibold tracking-wider px-4">
            Actions
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="data-[active=true]:bg-primary data-[active=true]:text-primary-foreground hover:bg-sidebar-accent">
                    <NavLink to={item.url} end>
                      <item.icon className={isCollapsed ? "" : "mr-2"} />
                      {!isCollapsed && <span className="font-medium">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/70 uppercase text-xs font-semibold tracking-wider px-4">
            Navigate
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {/* Pharma Mode: Insights Section */}
              {currentMode === 'pharma' && (
                <Collapsible open={insightsOpen} onOpenChange={setInsightsOpen}>
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton className="hover:bg-sidebar-accent">
                        <Telescope className={isCollapsed ? "" : "mr-2"} />
                        {!isCollapsed && <span>Insights</span>}
                        {!isCollapsed && (
                          <ChevronRight className={`ml-auto h-4 w-4 transition-transform ${insightsOpen ? 'rotate-90' : ''}`} />
                        )}
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                  </SidebarMenuItem>
                  {!isCollapsed && (
                    <CollapsibleContent>
                      <SidebarMenu className="ml-4 border-l border-sidebar-border pl-2">
                        {pharmaInsightsItems.map((item) => (
                          <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton asChild className="data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-primary hover:bg-sidebar-accent">
                              <NavLink to={item.url}>
                                <item.icon className="mr-2 h-4 w-4" />
                                <span className="text-sm">{item.title}</span>
                              </NavLink>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        ))}
                      </SidebarMenu>
                    </CollapsibleContent>
                  )}
                </Collapsible>
              )}

              {/* Knowledge - Collapsible Parent */}
              <Collapsible open={knowledgeOpen} onOpenChange={setKnowledgeOpen}>
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton className="hover:bg-sidebar-accent">
                      <BookOpen className={isCollapsed ? "" : "mr-2"} />
                      {!isCollapsed && <span>Knowledge</span>}
                      {!isCollapsed && (
                        <ChevronRight className={`ml-auto h-4 w-4 transition-transform ${knowledgeOpen ? 'rotate-90' : ''}`} />
                      )}
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                </SidebarMenuItem>
                {!isCollapsed && (
                  <CollapsibleContent>
                    <SidebarMenu className="ml-4 border-l border-sidebar-border pl-2">
                      {knowledgeItems.map((item) => (
                        <SidebarMenuItem key={item.title}>
                          <SidebarMenuButton asChild className="data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-primary hover:bg-sidebar-accent">
                            <NavLink to={item.url}>
                              <item.icon className="mr-2 h-4 w-4" />
                              <span className="text-sm">{item.title}</span>
                            </NavLink>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </CollapsibleContent>
                )}
              </Collapsible>

              {/* Other Navigation Items */}
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-primary hover:bg-sidebar-accent">
                    <NavLink to={item.url}>
                      <item.icon className={isCollapsed ? "" : "mr-2"} />
                      {!isCollapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      {!isCollapsed && (
        <div className="p-4 border-t border-sidebar-border">
          <AppSwitcher />
        </div>
      )}
    </Sidebar>
  );
}
