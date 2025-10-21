import { DataSource } from "@/types/knowledge";
import { DataSourceCard } from "./DataSourceCard";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

interface DataSourceGridProps {
  sources: DataSource[];
  onConnect: (source: DataSource) => void;
}

export const DataSourceGrid = ({ sources, onConnect }: DataSourceGridProps) => {
  // Group sources by category
  const groupedSources = sources.reduce((acc, source) => {
    const category = source.type === 'academic' 
      ? 'Academic Databases' 
      : source.type === 'web' 
      ? 'Web Data Platforms'
      : source.type === 'institutional'
      ? 'Institutional'
      : 'Custom';
    
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(source);
    return acc;
  }, {} as Record<string, DataSource[]>);

  return (
    <div className="space-y-6">
      {Object.entries(groupedSources).map(([category, categorySources]) => (
        <CategorySection 
          key={category} 
          category={category} 
          sources={categorySources}
          onConnect={onConnect}
        />
      ))}
    </div>
  );
};

interface CategorySectionProps {
  category: string;
  sources: DataSource[];
  onConnect: (source: DataSource) => void;
}

const CategorySection = ({ category, sources, onConnect }: CategorySectionProps) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger className="flex items-center gap-2 w-full hover:text-primary transition-colors">
        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        <h3 className="text-lg font-semibold">{category}</h3>
        <span className="text-sm text-muted-foreground">({sources.length})</span>
      </CollapsibleTrigger>
      <CollapsibleContent className="mt-4">
        <div className="grid gap-4">
          {sources.map(source => (
            <DataSourceCard 
              key={source.id} 
              source={source}
              onConnect={() => onConnect(source)}
            />
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};
