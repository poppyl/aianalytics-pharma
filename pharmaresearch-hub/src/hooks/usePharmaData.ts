import { useQuery } from '@tanstack/react-query';
import {
  mockPharmaAssets,
  mockMechanisms,
  mockCombinations,
  mockBiomarkers,
  mockCompetitorAlerts,
  mockPharmaDataSources,
  mockPharmaWorkflows,
  mockPharmaInsights,
  mockPharmaMetrics,
} from '@/services/mockPharmaData';

export const usePharmaAssets = () => {
  return useQuery({
    queryKey: ['pharma-assets'],
    queryFn: async () => mockPharmaAssets,
  });
};

export const useMechanisms = () => {
  return useQuery({
    queryKey: ['mechanisms'],
    queryFn: async () => mockMechanisms,
  });
};

export const useCombinations = () => {
  return useQuery({
    queryKey: ['combinations'],
    queryFn: async () => mockCombinations,
  });
};

export const useBiomarkers = () => {
  return useQuery({
    queryKey: ['biomarkers'],
    queryFn: async () => mockBiomarkers,
  });
};

export const useCompetitorAlerts = () => {
  return useQuery({
    queryKey: ['competitor-alerts'],
    queryFn: async () => mockCompetitorAlerts,
  });
};

export const usePharmaDataSources = () => {
  return useQuery({
    queryKey: ['pharma-data-sources'],
    queryFn: async () => mockPharmaDataSources,
  });
};

export const usePharmaWorkflows = () => {
  return useQuery({
    queryKey: ['pharma-workflows'],
    queryFn: async () => mockPharmaWorkflows,
  });
};

export const usePharmaInsights = () => {
  return useQuery({
    queryKey: ['pharma-insights'],
    queryFn: async () => mockPharmaInsights,
  });
};

export const usePharmaMetrics = () => {
  return useQuery({
    queryKey: ['pharma-metrics'],
    queryFn: async () => mockPharmaMetrics,
  });
};
