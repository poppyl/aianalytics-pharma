import { DashboardStats } from "@/components/DashboardStats";
import { RecentPublications } from "@/components/RecentPublications";
import { ActionRecommendations } from "@/components/ActionRecommendations";

const Index = () => {
  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold gradient-text mb-3">
            Research Dashboard
          </h1>
          <p className="text-lg text-muted-foreground">
            Stay updated with the latest research in pharmacology
          </p>
        </div>

        <DashboardStats />

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <RecentPublications />
          </div>
          <div>
            <ActionRecommendations />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
