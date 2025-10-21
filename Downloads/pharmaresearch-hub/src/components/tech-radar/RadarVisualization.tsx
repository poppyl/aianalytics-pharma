import { TechnologyPoint } from '@/types/techRadar';
import { getTherapeuticAreaColor } from '@/services/mockTechRadarData';
import { useState } from 'react';

interface RadarVisualizationProps {
  technologies: TechnologyPoint[];
  onTechnologyClick: (tech: TechnologyPoint) => void;
}

export const RadarVisualization = ({ technologies, onTechnologyClick }: RadarVisualizationProps) => {
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);
  
  const size = 900;
  const center = size / 2;
  const maxRadius = 420;
  
  const ringRadii = {
    adopt: maxRadius * 0.25,
    trial: maxRadius * 0.5,
    assess: maxRadius * 0.75,
    monitor: maxRadius,
  };
  
  const ringColors = {
    adopt: '#10b981',
    trial: '#3b82f6',
    assess: '#f59e0b',
    monitor: '#ef4444',
  };
  
  const ringLabels = {
    adopt: 'ADOPT',
    trial: 'TRIAL',
    assess: 'ASSESS',
    monitor: 'MONITOR',
  };
  
  const quadrantBaseAngles = {
    'technology-platforms': 0,
    'therapeutic-approaches': 90,
    'enabling-tools': 180,
    'drug-modalities': 270,
  };
  
  const quadrantLabels = {
    'drug-modalities': 'Drug Modalities',
    'technology-platforms': 'Technology Platforms',
    'therapeutic-approaches': 'Therapeutic Approaches',
    'enabling-tools': 'Enabling Tools',
  };
  
  const polarToCartesian = (radius: number, angleInDegrees: number) => {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
    return {
      x: center + radius * Math.cos(angleInRadians),
      y: center + radius * Math.sin(angleInRadians),
    };
  };
  
  const positionTechnology = (tech: TechnologyPoint) => {
    const ringRadius = ringRadii[tech.ring];
    const radius = ringRadius + (tech.ringOffset - 0.5) * (maxRadius * 0.08);
    const baseAngle = quadrantBaseAngles[tech.quadrant];
    const angle = baseAngle + tech.angle;
    return polarToCartesian(radius, angle);
  };
  
  const getDotRadius = (size: string) => {
    const sizes = {
      small: 4,
      medium: 6,
      large: 8,
      transformative: 10,
    };
    return sizes[size as keyof typeof sizes] || 6;
  };
  
  const getDotStyle = (tech: TechnologyPoint) => {
    const color = getTherapeuticAreaColor(tech.therapeuticArea);
    const isHovered = hoveredTech === tech.id;
    
    if (tech.confidence === 'high') {
      return {
        fill: color,
        fillOpacity: 1,
        stroke: isHovered ? '#fff' : 'none',
        strokeWidth: isHovered ? 2 : 0,
        strokeDasharray: 'none',
      };
    } else if (tech.confidence === 'medium') {
      return {
        fill: color,
        fillOpacity: 0.7,
        stroke: color,
        strokeWidth: 1,
        strokeDasharray: 'none',
      };
    } else {
      return {
        fill: 'none',
        fillOpacity: 0,
        stroke: color,
        strokeWidth: 2,
        strokeDasharray: '4,2',
      };
    }
  };
  
  return (
    <div className="relative bg-slate-950 rounded-lg p-8">
      <svg width={size} height={size} className="mx-auto">
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        
        {/* Concentric rings */}
        {Object.entries(ringRadii).map(([ring, radius]) => (
          <circle
            key={ring}
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke={ringColors[ring as keyof typeof ringColors]}
            strokeWidth={2}
            opacity={0.3}
          />
        ))}
        
        {/* Quadrant dividers */}
        <line x1={center} y1={center - maxRadius} x2={center} y2={center + maxRadius} stroke="#475569" strokeWidth={2} />
        <line x1={center - maxRadius} y1={center} x2={center + maxRadius} y2={center} stroke="#475569" strokeWidth={2} />
        
        {/* Ring labels */}
        {Object.entries(ringLabels).map(([ring, label], idx) => {
          const radius = ringRadii[ring as keyof typeof ringRadii];
          const pos = polarToCartesian(radius, 45);
          return (
            <text
              key={ring}
              x={pos.x}
              y={pos.y}
              fill={ringColors[ring as keyof typeof ringColors]}
              fontSize="12"
              fontWeight="600"
              textAnchor="middle"
              dominantBaseline="middle"
            >
              {label}
            </text>
          );
        })}
        
        {/* Quadrant labels */}
        <text x={center + maxRadius * 0.6} y={center - 20} fill="#e2e8f0" fontSize="14" fontWeight="600" textAnchor="middle">
          {quadrantLabels['technology-platforms']}
        </text>
        <text x={center + maxRadius * 0.6} y={center + 35} fill="#e2e8f0" fontSize="14" fontWeight="600" textAnchor="middle">
          {quadrantLabels['therapeutic-approaches']}
        </text>
        <text x={center - maxRadius * 0.6} y={center + 35} fill="#e2e8f0" fontSize="14" fontWeight="600" textAnchor="middle">
          {quadrantLabels['enabling-tools']}
        </text>
        <text x={center - maxRadius * 0.6} y={center - 20} fill="#e2e8f0" fontSize="14" fontWeight="600" textAnchor="middle">
          {quadrantLabels['drug-modalities']}
        </text>
        
        {/* Technology dots */}
        {technologies.map((tech) => {
          const pos = positionTechnology(tech);
          const dotRadius = getDotRadius(tech.opportunitySize);
          const style = getDotStyle(tech);
          const isHovered = hoveredTech === tech.id;
          
          return (
            <g key={tech.id}>
              <circle
                cx={pos.x}
                cy={pos.y}
                r={isHovered ? dotRadius * 1.5 : dotRadius}
                {...style}
                className="cursor-pointer transition-all duration-200"
                onMouseEnter={() => setHoveredTech(tech.id)}
                onMouseLeave={() => setHoveredTech(null)}
                onClick={() => onTechnologyClick(tech)}
                filter={isHovered ? 'url(#glow)' : 'none'}
              />
              
              {/* Tooltip on hover */}
              {isHovered && (
                <g>
                  <rect
                    x={pos.x + 15}
                    y={pos.y - 35}
                    width={220}
                    height={60}
                    fill="#1e293b"
                    stroke="#475569"
                    strokeWidth={1}
                    rx={4}
                  />
                  <text x={pos.x + 25} y={pos.y - 20} fill="#fff" fontSize="12" fontWeight="600">
                    {tech.name}
                  </text>
                  <text x={pos.x + 25} y={pos.y - 5} fill="#cbd5e1" fontSize="10">
                    {tech.shortDescription.slice(0, 35)}...
                  </text>
                  <text x={pos.x + 25} y={pos.y + 10} fill="#94a3b8" fontSize="9">
                    {tech.ring.toUpperCase()} • {tech.quadrant.replace('-', ' ')}
                  </text>
                </g>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
};
