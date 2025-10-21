import { TrendFilters } from '@/types/horizon';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

interface TrendFiltersProps {
  filters: TrendFilters;
  onFiltersChange: (filters: TrendFilters) => void;
}

export const TrendFiltersComponent = ({ filters, onFiltersChange }: TrendFiltersProps) => {
  const handleMethodologyChange = (methodology: string) => {
    onFiltersChange({ ...filters, methodology });
  };

  const handleTimeRangeChange = (timeRange: '3mo' | '6mo' | '12mo' | '24mo') => {
    onFiltersChange({ ...filters, timeRange });
  };

  const handleStageToggle = (stage: string, checked: boolean | 'indeterminate') => {
    const newStages = new Set(filters.maturityStages);
    if (checked) {
      newStages.add(stage);
    } else {
      newStages.delete(stage);
    }
    onFiltersChange({ ...filters, maturityStages: newStages });
  };

  const timeRanges: Array<{ value: '3mo' | '6mo' | '12mo' | '24mo'; label: string }> = [
    { value: '3mo', label: '3 Months' },
    { value: '6mo', label: '6 Months' },
    { value: '12mo', label: '12 Months' },
    { value: '24mo', label: '24 Months' },
  ];

  const stages = [
    { value: 'nascent', label: 'Nascent', color: 'hsl(240, 70%, 62%)' },
    { value: 'emerging', label: 'Emerging', color: 'hsl(45, 95%, 55%)' },
    { value: 'growing', label: 'Growing', color: 'hsl(25, 95%, 53%)' },
    { value: 'established', label: 'Established', color: 'hsl(0, 72%, 51%)' },
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center p-4 bg-muted/20 rounded-lg border border-border">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center flex-1 flex-wrap">
        <div className="w-full sm:w-auto">
          <Select value={filters.methodology} onValueChange={handleMethodologyChange}>
            <SelectTrigger className="w-full sm:w-[200px]">
              <SelectValue placeholder="All Methodologies" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Methodologies</SelectItem>
              <SelectItem value="experimental">Experimental</SelectItem>
              <SelectItem value="computational">Computational</SelectItem>
              <SelectItem value="clinical">Clinical</SelectItem>
              <SelectItem value="theoretical">Theoretical</SelectItem>
              <SelectItem value="translational">Translational</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-2 flex-wrap">
          {timeRanges.map(range => (
            <Button
              key={range.value}
              variant={filters.timeRange === range.value ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleTimeRangeChange(range.value)}
            >
              {range.label}
            </Button>
          ))}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
        <span className="text-sm font-medium whitespace-nowrap">Maturity:</span>
        <div className="flex gap-3 flex-wrap">
          {stages.map(stage => (
            <label key={stage.value} className="flex items-center gap-2 cursor-pointer">
              <Checkbox
                checked={filters.maturityStages.has(stage.value)}
                onCheckedChange={(checked) => handleStageToggle(stage.value, checked)}
              />
              <span className="h-3 w-3 rounded-full flex-shrink-0" style={{ backgroundColor: stage.color }} />
              <span className="text-sm">{stage.label}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};
