import { AppMode } from './app';

export type WorkflowStatus = 'active' | 'paused' | 'error';
export type TriggerType = 'time' | 'execution' | 'mcp';
export type DataSourceType = 'academic' | 'web' | 'institutional' | 'custom' | 'clinical' | 'patent' | 'regulatory' | 'commercial' | 'market';
export type DataSourceStatus = 'connected' | 'available' | 'suggested';
export type AuthType = 'oauth' | 'api-key' | 'sso' | 'none';
export type NodeType = 'trigger' | 'search' | 'filter' | 'action' | 'notification';
export type InsightType = 'trend' | 'recommendation' | 'alert' | 'competitive-threat' | 'pipeline-opportunity' | 'market-shift' | 'biomarker-discovery';

export interface WorkflowNode {
  id: string;
  type: NodeType;
  data: {
    label: string;
    config: any;
  };
  position: { x: number; y: number };
}

export interface WorkflowEdge {
  id: string;
  source: string;
  target: string;
  type?: string;
}

export interface WorkflowTrigger {
  type: TriggerType;
  config: {
    cron?: string;
    interval?: number;
    dependsOn?: string;
    mcpConfig?: any;
  };
}

export interface AgenticWorkflow {
  id: string;
  name: string;
  description: string;
  status: WorkflowStatus;
  trigger: WorkflowTrigger;
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
  lastRun?: Date;
  nextRun?: Date;
  stats: {
    totalRuns: number;
    successRate: number;
    papersProcessed: number;
  };
  createdAt: Date;
  updatedAt: Date;
  appMode?: AppMode;
}

export interface DataSource {
  id: string;
  name: string;
  type: DataSourceType;
  status: DataSourceStatus;
  category: string;
  icon: string;
  authType: AuthType;
  isAuthenticated: boolean;
  isPrimary?: boolean;
  lastSync?: Date;
  stats?: {
    papersIndexed?: number;
    datasetsAvailable?: number;
    queryLimit?: { used: number; total: number };
  };
  features: string[];
  trending?: {
    datasets?: TrendingDataset[];
    papers?: TrendingPaper[];
  };
  appMode?: AppMode;
}

export interface TrendingDataset {
  id: string;
  name: string;
  source: string;
  downloads: number;
  relevanceScore: number;
}

export interface TrendingPaper {
  id: string;
  title: string;
  authors: string[];
  citations: number;
  publishedAt: Date;
}

export interface WorkflowPerformance {
  workflowId: string;
  workflowName: string;
  successRate: number;
  avgExecutionTime: number;
  totalRuns: number;
  lastRun: Date;
  errorCount: number;
}

export interface ResearchInsight {
  id: string;
  type: InsightType;
  title: string;
  description: string;
  actionLabel?: string;
  actionUrl?: string;
  priority: 'low' | 'medium' | 'high';
  createdAt: Date;
  appMode?: AppMode;
  
  // Strategic Analysis Fields
  strategicAnalysis?: {
    whyMatters: string;
    competitiveContext: string;
    marketOpportunity: {
      description: string;
      marketSize?: string;
      unmetNeed?: string;
    };
    recommendedActions: Array<{
      action: string;
      priority: 'immediate' | 'near-term' | 'monitor';
      owner?: string;
    }>;
    timelineImpact: {
      description: string;
      milestoneEffect?: 'accelerates' | 'delays' | 'neutral' | 'critical-path';
      estimatedImpact?: string;
    };
  };
  
  // Visual Indicators
  scores?: {
    opportunityScore: number;
    urgency: 'high' | 'medium' | 'low';
    competitiveThreat: 'critical' | 'high' | 'moderate' | 'low';
  };
}

export interface AnalyticsSnapshot {
  totalPapersProcessed: number;
  workflowsExecuted: number;
  dataSourcesQueried: number;
  timeSavedHours: number;
  periodStart: Date;
  periodEnd: Date;
}

export interface SystemMode {
  id: string;
  name: string;
  description: string;
  systemPrompt: string;
  preferredDataSources: string[];
  activeWorkflows: string[];
  outputFormat?: 'detailed' | 'summary' | 'bullet-points';
  isDefault: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface WorkflowTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: string;
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
  estimatedTime?: string;
  popularity?: number;
}

// Pharma-specific types
export interface PharmaAsset {
  id: string;
  compoundId: string;
  name: string;
  phase: 'discovery' | 'preclinical' | 'phase-1' | 'phase-2' | 'phase-3' | 'filed' | 'approved';
  indication: string;
  moa: string;
  riskScore: number;
  nextMilestone?: string;
  milestoneDate?: Date;
  trialIds?: string[];
}

export interface Mechanism {
  id: string;
  title: string;
  target: string;
  journal: string;
  publishedDate: Date;
  evidenceScore: number;
  publicationCount: number;
  trialCount: number;
  priority: 'low' | 'medium' | 'high';
  
  // Timeline Data
  timeline?: {
    milestones: Array<{
      type: 'publication' | 'patent' | 'trial' | 'approval' | 'prediction';
      date: Date;
      label: string;
      description?: string;
      isPrediction?: boolean;
    }>;
    predictedNextMilestone?: {
      type: string;
      label: string;
      predictedDate: Date;
      confidence: 'high' | 'medium' | 'low';
      rationale: string;
    };
  };
  
  // Evidence Trajectory
  evidenceTrajectory?: Array<{
    date: Date;
    score: number;
    publicationCount: number;
    trialCount: number;
  }>;
  
  // Competitive Positioning
  competitivePositioning?: {
    yourPosition: 'leader' | 'fast-follower' | 'follower' | 'emerging';
    competitors: Array<{
      company: string;
      position: 'leader' | 'fast-follower' | 'follower' | 'emerging';
      assets: string[];
      phase: string;
    }>;
    marketGaps: string[];
    competitiveAdvantage?: string;
  };
  
  // Detailed Analysis
  detailedAnalysis?: {
    pathwayAnalysis: string;
    keyPublications: Array<{
      title: string;
      authors: string;
      journal: string;
      year: number;
      pmid?: string;
      keyFinding: string;
    }>;
    activeCompetitors: Array<{
      company: string;
      asset: string;
      phase: string;
      indication: string;
      differentiator?: string;
    }>;
    commercialPotential: {
      marketSize: string;
      growthRate: string;
      competitiveIntensity: 'low' | 'medium' | 'high';
      aiAssessment: string;
    };
  };
}

export interface Combination {
  id: string;
  drugPair: string;
  indication: string;
  evidenceScore: number;
  publicationCount: number;
  activeTrials: string[];
  synergy?: string;
}

export interface Biomarker {
  id: string;
  name: string;
  relatedAsset: string;
  application: string;
  evidenceCount: number;
  priority: 'low' | 'medium' | 'high';
}

export interface CompetitorAlert {
  id: string;
  company: string;
  event: string;
  details: string;
  impact: 'low' | 'medium' | 'high';
  date: Date;
  relatedAssets?: string[];
  trialId?: string;
  patentNumber?: string;
}

export interface PharmaMetrics {
  competitiveThreats: number;
  pipelineOpportunities: number;
  patentsMonitored: number;
  marketSignals: number;
}
