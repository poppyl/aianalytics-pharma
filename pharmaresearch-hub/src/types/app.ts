export type AppMode = 'pharma' | 'researcher' | 'funder';

export interface AppConfig {
  mode: AppMode;
  name: string;
  description: string;
  icon: string;
  accentColor: string;
  terminology: {
    assets: string;
    workspace: string;
    insights: string;
  };
}

export const APP_CONFIGS: Record<AppMode, AppConfig> = {
  pharma: {
    mode: 'pharma',
    name: 'Pharma Intelligence',
    description: 'Pipeline & competitive insights for biotech companies',
    icon: '🏢',
    accentColor: 'hsl(250, 70%, 60%)',
    terminology: {
      assets: 'Pipeline Assets',
      workspace: 'BioCure Therapeutics',
      insights: 'Competitive Intelligence',
    },
  },
  researcher: {
    mode: 'researcher',
    name: 'Researcher Hub',
    description: 'Literature discovery for academic scientists',
    icon: '🔬',
    accentColor: 'hsl(150, 60%, 50%)',
    terminology: {
      assets: 'Research Projects',
      workspace: 'Research Lab',
      insights: 'Research Landscape',
    },
  },
  funder: {
    mode: 'funder',
    name: 'Funder Insights',
    description: 'Grant intelligence for funding organizations',
    icon: '💰',
    accentColor: 'hsl(30, 80%, 55%)',
    terminology: {
      assets: 'Investment Portfolio',
      workspace: 'Funding Organization',
      insights: 'Funding Opportunities',
    },
  },
};
