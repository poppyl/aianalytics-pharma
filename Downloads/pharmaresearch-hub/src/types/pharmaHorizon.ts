export interface HorizonMetrics {
  emergingMechanisms: {
    count: number;
    change: number;
  };
  therapeuticModalities: {
    count: number;
    change?: number;
  };
  clinicalSignals: {
    count: number;
    change: number;
  };
  technologyShifts: {
    count: number;
    change: number;
  };
}

export interface TherapeuticLandscapePoint {
  id: string;
  name: string;
  patentActivity: number;
  clinicalProgress: number;
  totalPublications: number;
  maturityStage: 'nascent' | 'emerging' | 'growing' | 'maturing' | 'established';
  therapeuticArea: string;
  modalityType: string;
  aiInsight: string;
  details: {
    keyPlayers: string[];
    recentPatents: string[];
    activeTrials: string[];
  };
}

export interface CompetitorMove {
  id: string;
  company: string;
  action: 'IND filing' | 'Phase transition' | 'Partnership' | 'Acquisition' | 'Patent filing' | 'Clinical data';
  description: string;
  date: Date;
  therapeuticArea: string;
  impact: 'high' | 'medium' | 'low';
  aiAnalysis: string;
  relatedAssets?: string[];
  trialId?: string;
  patentNumber?: string;
}

export interface TherapeuticFilters {
  therapeuticArea: string;
  modalityType: string;
  maturityStages: Set<string>;
}
