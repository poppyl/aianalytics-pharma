import { useQuery } from '@tanstack/react-query';
import {
  mockWorkflows,
  mockDataSources,
  mockWorkflowPerformance,
  mockResearchInsights,
  mockAnalytics,
  mockSystemModes,
  mockWorkflowTemplates,
} from '@/services/mockData';
import {
  AgenticWorkflow,
  DataSource,
  WorkflowPerformance,
  ResearchInsight,
  AnalyticsSnapshot,
  SystemMode,
  WorkflowTemplate,
} from '@/types/knowledge';
import { useAppContext } from '@/contexts/AppContext';

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Workflows
export const useWorkflows = () => {
  return useQuery<AgenticWorkflow[]>({
    queryKey: ['workflows'],
    queryFn: async () => {
      await delay(300);
      return mockWorkflows;
    },
  });
};

export const useWorkflow = (id: string) => {
  return useQuery<AgenticWorkflow | undefined>({
    queryKey: ['workflow', id],
    queryFn: async () => {
      await delay(200);
      return mockWorkflows.find((wf) => wf.id === id);
    },
  });
};

export const useActiveWorkflows = () => {
  return useQuery<AgenticWorkflow[]>({
    queryKey: ['workflows', 'active'],
    queryFn: async () => {
      await delay(250);
      return mockWorkflows.filter((wf) => wf.status === 'active');
    },
  });
};

export const useWorkflowTemplates = () => {
  return useQuery<WorkflowTemplate[]>({
    queryKey: ['workflow-templates'],
    queryFn: async () => {
      await delay(200);
      return mockWorkflowTemplates;
    },
  });
};

// Data Sources
export const useDataSources = () => {
  return useQuery<DataSource[]>({
    queryKey: ['data-sources'],
    queryFn: async () => {
      await delay(300);
      return mockDataSources;
    },
  });
};

export const useConnectedSources = () => {
  const { currentMode } = useAppContext();
  
  return useQuery<DataSource[]>({
    queryKey: ['data-sources', 'connected', currentMode],
    queryFn: async () => {
      await delay(250);
      return mockDataSources.filter((ds) => 
        ds.status === 'connected' && (!ds.appMode || ds.appMode === currentMode)
      );
    },
  });
};

export const useAvailableSources = () => {
  const { currentMode } = useAppContext();
  
  return useQuery<DataSource[]>({
    queryKey: ['data-sources', 'available', currentMode],
    queryFn: async () => {
      await delay(250);
      return mockDataSources.filter((ds) => 
        (ds.status === 'available' || ds.status === 'suggested') && 
        (!ds.appMode || ds.appMode === currentMode)
      );
    },
  });
};

// Analytics
export const useWorkflowPerformance = () => {
  return useQuery<WorkflowPerformance[]>({
    queryKey: ['workflow-performance'],
    queryFn: async () => {
      await delay(350);
      return mockWorkflowPerformance;
    },
  });
};

export const useResearchInsights = () => {
  return useQuery<ResearchInsight[]>({
    queryKey: ['research-insights'],
    queryFn: async () => {
      await delay(300);
      return mockResearchInsights;
    },
  });
};

export const useAnalyticsSnapshot = () => {
  return useQuery<AnalyticsSnapshot>({
    queryKey: ['analytics-snapshot'],
    queryFn: async () => {
      await delay(400);
      return mockAnalytics;
    },
  });
};

// System Modes
export const useSystemModes = () => {
  return useQuery<SystemMode[]>({
    queryKey: ['system-modes'],
    queryFn: async () => {
      await delay(250);
      return mockSystemModes;
    },
  });
};

export const useDefaultMode = () => {
  return useQuery<SystemMode | undefined>({
    queryKey: ['system-modes', 'default'],
    queryFn: async () => {
      await delay(200);
      return mockSystemModes.find((mode) => mode.isDefault);
    },
  });
};
