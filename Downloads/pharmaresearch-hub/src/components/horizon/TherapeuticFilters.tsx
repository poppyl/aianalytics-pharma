import { TherapeuticFilters } from '@/types/pharmaHorizon';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';

interface TherapeuticFiltersProps {
  filters: TherapeuticFilters;
  onFiltersChange: (filters: TherapeuticFilters) => void;
}

export const TherapeuticFiltersComponent = ({ filters, onFiltersChange }: TherapeuticFiltersProps) => {
  const handleTherapeuticAreaChange = (value: string) => {
    onFiltersChange({ ...filters, therapeuticArea: value });
  };

  const handleModalityChange = (value: string) => {
    onFiltersChange({ ...filters, modalityType: value });
  };

  const handleStageToggle = (stage: string, checked: boolean) => {
    const newStages = new Set(filters.maturityStages);
    if (checked) {
      newStages.add(stage);
    } else {
      newStages.delete(stage);
    }
    onFiltersChange({ ...filters, maturityStages: newStages });
  };

  const maturityStages = [
    { value: 'nascent', label: 'Nascent', color: 'hsl(200, 80%, 60%)' },
    { value: 'emerging', label: 'Emerging', color: 'hsl(150, 70%, 50%)' },
    { value: 'growing', label: 'Growing', color: 'hsl(50, 90%, 55%)' },
    { value: 'maturing', label: 'Maturing', color: 'hsl(30, 85%, 55%)' },
    { value: 'established', label: 'Established', color: 'hsl(0, 75%, 55%)' },
  ];

  return (
    <div className="flex flex-wrap gap-6 items-center p-4 bg-muted/20 rounded-lg border border-border">
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium">Therapeutic Area:</span>
        <Select value={filters.therapeuticArea} onValueChange={handleTherapeuticAreaChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All Areas" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Areas</SelectItem>
            <SelectItem value="Oncology">Oncology</SelectItem>
            <SelectItem value="Neurology">Neurology</SelectItem>
            <SelectItem value="Immunology">Immunology</SelectItem>
            <SelectItem value="Rare Disease">Rare Disease</SelectItem>
            <SelectItem value="Metabolic">Metabolic</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-sm font-medium">Modality:</span>
        <Select value={filters.modalityType} onValueChange={handleModalityChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All Modalities" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Modalities</SelectItem>
            <SelectItem value="Antibody">Antibody</SelectItem>
            <SelectItem value="Cell Therapy">Cell Therapy</SelectItem>
            <SelectItem value="Small Molecule">Small Molecule</SelectItem>
            <SelectItem value="Gene Therapy">Gene Therapy</SelectItem>
            <SelectItem value="Nucleic Acid">Nucleic Acid</SelectItem>
            <SelectItem value="Vaccine">Vaccine</SelectItem>
            <SelectItem value="Biologic">Biologic</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-3 flex-wrap">
        <span className="text-sm font-medium">Maturity:</span>
        {maturityStages.map(stage => (
          <label key={stage.value} className="flex items-center gap-2 cursor-pointer">
            <Checkbox
              checked={filters.maturityStages.has(stage.value)}
              onCheckedChange={(checked) => handleStageToggle(stage.value, !!checked)}
            />
            <span className="h-3 w-3 rounded-full" style={{ backgroundColor: stage.color }} />
            <span className="text-sm">{stage.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
};
