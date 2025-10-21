import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Combination } from "@/types/knowledge";
import { ArrowUpDown, ExternalLink } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface CombinationTableProps {
  combinations: Combination[];
}

export const CombinationTable = ({ combinations }: CombinationTableProps) => {
  const [sortBy, setSortBy] = useState<'evidenceScore' | 'publicationCount'>('evidenceScore');
  const [sortDesc, setSortDesc] = useState(true);

  const handleSort = (field: typeof sortBy) => {
    if (sortBy === field) {
      setSortDesc(!sortDesc);
    } else {
      setSortBy(field);
      setSortDesc(true);
    }
  };

  const sortedCombinations = [...combinations].sort((a, b) => {
    const aVal = a[sortBy];
    const bVal = b[sortBy];
    return sortDesc ? bVal - aVal : aVal - bVal;
  });

  return (
    <Card>
      <div className="p-4 border-b">
        <h2 className="text-xl font-semibold">Combination Opportunities</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Drug pairs with strong synergy evidence
        </p>
      </div>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Drug Pair</TableHead>
            <TableHead>Indication</TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort('evidenceScore')}>
              <div className="flex items-center gap-1">
                Evidence Score
                <ArrowUpDown className="h-3.5 w-3.5" />
              </div>
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort('publicationCount')}>
              <div className="flex items-center gap-1">
                Publications
                <ArrowUpDown className="h-3.5 w-3.5" />
              </div>
            </TableHead>
            <TableHead>Active Trials</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedCombinations.map((combo, idx) => (
            <TableRow key={idx}>
              <TableCell className="font-medium">{combo.drugPair}</TableCell>
              <TableCell>{combo.indication}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <div className="w-16 bg-secondary rounded-full h-2">
                    <div 
                      className="bg-primary rounded-full h-2"
                      style={{ width: `${combo.evidenceScore * 10}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium">{combo.evidenceScore.toFixed(1)}</span>
                </div>
              </TableCell>
              <TableCell>{combo.publicationCount}</TableCell>
              <TableCell>
                <div className="flex gap-1 flex-wrap">
                  {combo.activeTrials.slice(0, 2).map(trial => (
                    <Badge key={trial} variant="outline" className="text-xs">
                      {trial}
                    </Badge>
                  ))}
                  {combo.activeTrials.length > 2 && (
                    <Badge variant="outline" className="text-xs">
                      +{combo.activeTrials.length - 2}
                    </Badge>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <Button variant="ghost" size="sm">
                  <ExternalLink className="h-3.5 w-3.5" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};
