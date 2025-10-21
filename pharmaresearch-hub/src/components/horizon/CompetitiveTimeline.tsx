import { CompetitorMove } from '@/types/pharmaHorizon';
import { CompetitorMoveCard } from './CompetitorMoveCard';

interface CompetitiveTimelineProps {
  moves: CompetitorMove[];
}

export const CompetitiveTimeline = ({ moves }: CompetitiveTimelineProps) => {
  const sortedMoves = [...moves].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="relative space-y-4">
      {sortedMoves.map((move) => (
        <div key={move.id}>
          <CompetitorMoveCard move={move} />
        </div>
      ))}
    </div>
  );
};
