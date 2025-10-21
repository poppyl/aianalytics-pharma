import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppContextProvider } from "@/contexts/AppContext";
import { NavigationProvider } from "@/contexts/NavigationContext";
import { NavigationLayout } from "@/components/navigation/NavigationLayout";
import Index from "./pages/Index";
import Notifications from "./pages/Notifications";
import QuickActions from "./pages/QuickActions";
import AllTools from "./pages/tools/AllTools";
import Chat from "./pages/tools/Chat";
import Notebooks from "./pages/tools/Notebooks";
import Documents from "./pages/tools/Documents";
import DataVisualizations from "./pages/tools/DataVisualizations";
import HorizonScanning from "./pages/insights/HorizonScanning";
import PipelineIntelligence from "./pages/insights/PipelineIntelligence";
import Analytics from "./pages/insights/Analytics";
import CompetitiveIntelligence from "./pages/insights/CompetitiveIntelligence";
import MarketLandscape from "./pages/insights/MarketLandscape";
import TechnologyRadar from "./pages/insights/TechnologyRadar";
import KnowledgeHub from "./pages/knowledge/KnowledgeHub";
import DataSources from "./pages/knowledge/DataSources";
import KnowledgeGraph from "./pages/knowledge/KnowledgeGraph";
import Workflows from "./pages/knowledge/Workflows";
import Library from "./pages/Library";
import SharedWithMe from "./pages/community/SharedWithMe";
import MyShares from "./pages/community/MyShares";
import Teams from "./pages/community/Teams";
import Discover from "./pages/community/Discover";
import Profile from "./pages/settings/Profile";
import Integrations from "./pages/settings/Integrations";
import Preferences from "./pages/settings/Preferences";
import Security from "./pages/settings/Security";
import SystemInstructions from "./pages/settings/SystemInstructions";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AppContextProvider>
      <BrowserRouter>
        <NavigationProvider>
          <div className="app-container">
            <NavigationLayout>
              <Routes>
                {/* Home Section */}
                <Route path="/" element={<Index />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/quick-actions" element={<QuickActions />} />

                {/* Tools Section */}
                <Route path="/tools" element={<AllTools />} />
                <Route path="/tools/chat" element={<Chat />} />
                <Route path="/tools/notebooks" element={<Notebooks />} />
                <Route path="/tools/documents" element={<Documents />} />
                <Route path="/tools/data-viz" element={<DataVisualizations />} />

                {/* Intelligence Section */}
                <Route path="/insights/horizon" element={<HorizonScanning />} />
                <Route path="/insights/pipeline" element={<PipelineIntelligence />} />
                <Route path="/insights/analytics" element={<Analytics />} />
                <Route path="/insights/competitive" element={<CompetitiveIntelligence />} />
                <Route path="/insights/market" element={<MarketLandscape />} />
                <Route path="/insights/tech-radar" element={<TechnologyRadar />} />

                {/* Knowledge Section */}
                <Route path="/knowledge" element={<KnowledgeHub />} />
                <Route path="/knowledge/data-sources" element={<DataSources />} />
                <Route path="/knowledge/graph" element={<KnowledgeGraph />} />
                <Route path="/knowledge/workflows" element={<Workflows />} />
                <Route path="/library" element={<Library />} />

                {/* Community Section */}
                <Route path="/community/shared-with-me" element={<SharedWithMe />} />
                <Route path="/community/my-shares" element={<MyShares />} />
                <Route path="/community/teams" element={<Teams />} />
                <Route path="/community/discover" element={<Discover />} />

                {/* Settings Section */}
                <Route path="/settings/profile" element={<Profile />} />
                <Route path="/settings/integrations" element={<Integrations />} />
                <Route path="/settings/preferences" element={<Preferences />} />
                <Route path="/settings/security" element={<Security />} />
                <Route path="/settings/system-instructions" element={<SystemInstructions />} />

                <Route path="*" element={<NotFound />} />
              </Routes>
            </NavigationLayout>
          </div>
        </NavigationProvider>
      </BrowserRouter>
    </AppContextProvider>
  </QueryClientProvider>
);

export default App;