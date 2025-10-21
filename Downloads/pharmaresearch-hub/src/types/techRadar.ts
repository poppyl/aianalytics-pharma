export type MaturityRing = 'adopt' | 'trial' | 'assess' | 'monitor';

export type TechnologyQuadrant = 
  | 'drug-modalities'        // Top-left
  | 'technology-platforms'   // Top-right
  | 'therapeutic-approaches' // Bottom-left
  | 'enabling-tools';        // Bottom-right

export type TherapeuticArea = 
  | 'oncology' 
  | 'neurology' 
  | 'immunology' 
  | 'cardiovascular' 
  | 'rare-diseases'
  | 'infectious-diseases'
  | 'metabolic'
  | 'cross-therapeutic';

export interface TechnologyPoint {
  id: string;
  name: string;
  shortDescription: string;
  quadrant: TechnologyQuadrant;
  ring: MaturityRing;
  
  angle: number; // 0-90 degrees within quadrant
  ringOffset: number; // 0-1 (slight variation within ring)
  
  therapeuticArea: TherapeuticArea;
  opportunitySize: 'small' | 'medium' | 'large' | 'transformative';
  confidence: 'high' | 'medium' | 'low';
  
  previousRing?: MaturityRing;
  changeDate?: Date;
  
  detailedAssessment: {
    rationale: string;
    keyPlayers: string[];
    publications: Array<{
      title: string;
      authors: string;
      journal: string;
      year: number;
      pmid?: string;
    }>;
    patents: Array<{
      number: string;
      title: string;
      assignee: string;
      filingDate: Date;
    }>;
    clinicalTrials: Array<{
      nctId: string;
      title: string;
      phase: string;
      sponsor: string;
      indication: string;
    }>;
    recommendation: string;
    marketPotential?: string;
    timeToImpact?: string;
    risks?: string[];
  };
}

export interface RadarFilters {
  therapeuticAreas: Set<TherapeuticArea>;
  timeRange: 'current' | '6-months-ago' | '1-year-ago' | '2-years-ago';
  confidenceLevels: Set<'high' | 'medium' | 'low'>;
  quadrants: Set<TechnologyQuadrant>;
}
