export const ScatterLegend = () => {
  const stages = [
    { color: 'hsl(200, 80%, 60%)', label: 'Nascent', desc: 'Early stage exploration' },
    { color: 'hsl(150, 70%, 50%)', label: 'Emerging', desc: 'Gaining traction' },
    { color: 'hsl(50, 90%, 55%)', label: 'Growing', desc: 'Rapid expansion' },
    { color: 'hsl(30, 85%, 55%)', label: 'Maturing', desc: 'Consolidation' },
    { color: 'hsl(0, 75%, 55%)', label: 'Established', desc: 'Standard of care' },
  ];

  return (
    <div className="flex flex-col gap-3 p-4 card-elevated">
      <div className="flex items-center gap-2 text-sm">
        <div className="h-6 w-6 rounded-full bg-muted border-2 border-foreground/30" />
        <span className="text-muted-foreground">Bubble size = Total publications</span>
      </div>
      
      <div className="space-y-2">
        <p className="text-xs font-semibold text-muted-foreground uppercase">Maturity Stage</p>
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-2">
          {stages.map(stage => (
            <div key={stage.label} className="flex items-center gap-2">
              <div className="h-4 w-4 rounded-full flex-shrink-0" style={{ backgroundColor: stage.color }} />
              <div className="min-w-0">
                <span className="text-sm font-medium block">{stage.label}</span>
                <span className="text-xs text-muted-foreground block truncate">{stage.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
