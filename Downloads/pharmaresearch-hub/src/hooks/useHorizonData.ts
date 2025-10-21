import { useQuery } from '@tanstack/react-query';
import {
  mockHorizonMetrics,
  mockTherapeuticLandscape,
  mockCompetitorMoves,
} from '@/services/mockHorizonData';

export const useHorizonMetrics = () => {
  return useQuery({
    queryKey: ['horizon-metrics'],
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 300));
      return mockHorizonMetrics;
    },
  });
};

export const useTherapeuticLandscape = () => {
  return useQuery({
    queryKey: ['therapeutic-landscape'],
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 400));
      return mockTherapeuticLandscape;
    },
  });
};

export const useCompetitorMoves = () => {
  return useQuery({
    queryKey: ['competitor-moves'],
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 350));
      return mockCompetitorMoves;
    },
  });
};
