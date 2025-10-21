import { useQuery } from '@tanstack/react-query';
import { mockTechnologyPoints } from '@/services/mockTechRadarData';
import { RadarFilters } from '@/types/techRadar';

export const useTechnologyPoints = (filters?: RadarFilters) => {
  return useQuery({
    queryKey: ['tech-radar-points', filters],
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 300));
      
      let filtered = mockTechnologyPoints;
      
      if (filters) {
        filtered = filtered.filter(tech => {
          if (filters.therapeuticAreas.size > 0 && !filters.therapeuticAreas.has(tech.therapeuticArea)) {
            return false;
          }
          if (filters.confidenceLevels.size > 0 && !filters.confidenceLevels.has(tech.confidence)) {
            return false;
          }
          if (filters.quadrants.size > 0 && !filters.quadrants.has(tech.quadrant)) {
            return false;
          }
          return true;
        });
      }
      
      return filtered;
    },
  });
};

export const useTechnologyMovement = (timeRange: string) => {
  return useQuery({
    queryKey: ['tech-radar-movement', timeRange],
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 200));
      return mockTechnologyPoints.filter(tech => tech.previousRing && tech.changeDate);
    },
  });
};
