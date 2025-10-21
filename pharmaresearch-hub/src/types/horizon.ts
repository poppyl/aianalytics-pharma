export interface TrendDataPoint {
  id: string;
  name: string;
  publicationActivity: number;
  citationVelocity: number;
  activeResearchers: number;
  maturityStage: 'nascent' | 'emerging' | 'growing' | 'established';
  methodology: 'experimental' | 'computational' | 'clinical' | 'theoretical' | 'translational';
  aiSummary: string;
  extendedAnalysis?: string;
  details: {
    topAuthors: string[];
    recentPapers: number;
    growthRate: number;
    relatedTrends?: string[];
  };
}

export interface TrendFilters {
  methodology: string;
  timeRange: '3mo' | '6mo' | '12mo' | '24mo';
  maturityStages: Set<string>;
}
