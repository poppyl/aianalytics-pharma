import { FileText, Upload, Edit3, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const recommendations = [
  {
    id: 1,
    platform: "ReadCube",
    icon: FileText,
    action: "Import 12 new papers",
    description: "We found 12 papers matching your research interests that aren't in your library yet.",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    id: 2,
    platform: "FigShare",
    icon: Upload,
    action: "Upload recent dataset",
    description: "Your latest experimental data from the cardiovascular study is ready to share.",
    color: "text-purple-600",
    bgColor: "bg-purple-50",
  },
  {
    id: 3,
    platform: "Overleaf",
    icon: Edit3,
    action: "Start new manuscript",
    description: "Based on your recent publications, it's a good time to begin a review article.",
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
  },
];

export function ActionRecommendations() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold gradient-text mb-6">Recommended Actions</h2>
      
      {recommendations.map((rec) => (
        <div key={rec.id} className="card-elevated rounded-xl p-6">
          <div className="flex items-start gap-4">
            <div className={`${rec.bgColor} p-3 rounded-lg`}>
              <rec.icon className={`h-6 w-6 ${rec.color}`} />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  {rec.platform}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {rec.action}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                {rec.description}
              </p>
              <Button size="sm" className="bg-primary hover:bg-primary/90">
                Take Action
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
