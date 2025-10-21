import { useState } from "react";
import { 
  ExternalLink, 
  Bookmark, 
  Share2, 
  Sparkles, 
  ChevronDown, 
  ChevronUp,
  Target,
  Lightbulb,
  BookOpen,
  Users,
  Check
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Collapsible, 
  CollapsibleTrigger, 
  CollapsibleContent 
} from "@/components/ui/collapsible";

const publications = [
  {
    id: 1,
    title: "Novel Mechanisms in Cardiovascular Pharmacology: Targeting Ion Channel Dysfunction",
    authors: "Chen L, Martinez R, et al.",
    journal: "Nature Pharmacology",
    date: "2 days ago",
    relevance: 95,
    tags: ["Cardiovascular", "Ion Channels"],
    aiInsights: {
      preview: "This paper introduces novel ion channel targeting approaches that align with your voltage-gated calcium channel research.",
      whyMatters: "This study demonstrates a breakthrough in selective ion channel modulation that could enhance specificity in your arrhythmia treatment research. The novel L-type calcium channel blockers show 3x higher selectivity than current clinical options, directly addressing the off-target effects you've been investigating.",
      keyFindings: [
        "Novel benzothiazepine derivatives show unprecedented Ca(v)1.2 selectivity (IC50: 2.3 nM)",
        "Reduced off-target effects on Ca(v)1.3 channels by 85% compared to nifedipine",
        "Demonstrated efficacy in reducing ventricular arrhythmias in large animal models",
        "Structural insights reveal allosteric binding site distinct from traditional DHP site"
      ],
      relatedWork: [
        { title: "Structure-based design of selective calcium channel modulators", url: "#" },
        { title: "Next-generation antiarrhythmic strategies targeting ion channel dysfunction", url: "#" }
      ],
      collaborators: [
        { name: "Dr. Lisa Chen", affiliation: "Stanford University", expertise: "Structural pharmacology & ion channel crystallography" },
        { name: "Dr. Rodriguez Martinez", affiliation: "UCSF", expertise: "Cardiac electrophysiology & translational medicine" }
      ]
    }
  },
  {
    id: 2,
    title: "Emerging Therapeutic Strategies in Neurodegenerative Disease Management",
    authors: "Kumar S, Anderson M, Lee J",
    journal: "The Lancet Neurology",
    date: "4 days ago",
    relevance: 92,
    tags: ["Neurology", "Therapeutics"],
    aiInsights: {
      preview: "This review synthesizes recent advances in tau-targeting therapies, complementing your work on protein aggregation pathways.",
      whyMatters: "The paper provides comprehensive analysis of 12 novel tau degradation strategies currently in clinical trials, offering mechanistic insights that could inform your PROTAC design work. Their comparative effectiveness data on different tau isoforms is particularly relevant to your recent findings.",
      keyFindings: [
        "Tau-directed PROTACs show superior brain penetration vs. traditional antibodies",
        "Selective degradation of phosphorylated tau reduces toxicity without affecting physiological tau",
        "Combination of autophagy enhancers + tau degraders shows synergistic effects",
        "Biomarker validation: CSF ptau217 predicts treatment response with 89% accuracy"
      ],
      relatedWork: [
        { title: "PROTAC-mediated degradation of tau aggregates", url: "#" },
        { title: "Biomarkers for tau-targeting therapy monitoring", url: "#" }
      ],
      collaborators: [
        { name: "Dr. Sanjay Kumar", affiliation: "MIT", expertise: "Protein degradation & PROTAC chemistry" },
        { name: "Dr. Michelle Anderson", affiliation: "Johns Hopkins", expertise: "Tau biology & neuroimaging" }
      ]
    }
  },
  {
    id: 3,
    title: "Precision Medicine Approaches to Cancer Pharmacotherapy",
    authors: "Williams K, Thompson D, et al.",
    journal: "Science Translational Medicine",
    date: "1 week ago",
    relevance: 88,
    tags: ["Oncology", "Precision Medicine"],
    aiInsights: {
      preview: "This study presents AI-driven biomarker discovery methods that parallel your computational pharmacology approaches.",
      whyMatters: "The machine learning framework described here successfully predicts therapeutic response across multiple cancer types, validating the computational approach you've been developing. Their multi-omic integration strategy could significantly enhance your current predictive models.",
      keyFindings: [
        "Machine learning models predict drug response with 82% accuracy using multi-omic data",
        "Identified 47 novel predictive biomarkers across 8 cancer types",
        "Real-world validation in 3,200 patient cohort demonstrates clinical utility",
        "Cost-benefit analysis shows 40% reduction in ineffective treatment cycles"
      ],
      relatedWork: [
        { title: "Multi-omic integration for precision oncology", url: "#" },
        { title: "Clinical implementation of AI-guided treatment selection", url: "#" }
      ],
      collaborators: [
        { name: "Dr. Karen Williams", affiliation: "Memorial Sloan Kettering", expertise: "Computational oncology" },
        { name: "Dr. David Thompson", affiliation: "Dana-Farber", expertise: "Precision medicine & biomarker development" }
      ]
    }
  },
];

export function RecentPublications() {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const toggleInsights = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold gradient-text">Recent Publications</h2>
        <Button variant="outline" size="sm">View All</Button>
      </div>
      
      {publications.map((pub) => (
        <div key={pub.id} className="card-elevated rounded-xl p-6">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-lg font-semibold text-foreground leading-tight">
                  {pub.title}
                </h3>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                {pub.authors} • <span className="font-medium">{pub.journal}</span>
              </p>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xs text-muted-foreground">{pub.date}</span>
                <div className="flex items-center gap-1">
                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                  <span className="text-xs font-medium text-primary">{pub.relevance}% relevant</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {pub.tags.map((tag) => (
                  <span key={tag} className="text-xs px-3 py-1 bg-muted text-muted-foreground rounded-full font-medium">
                    {tag}
                  </span>
                ))}
              </div>

              {/* AI Insights Section */}
              <Collapsible open={expandedId === pub.id}>
                <div className="text-sm italic text-muted-foreground mt-3">
                  AI: {pub.aiInsights.preview}
                </div>
                
                <CollapsibleTrigger asChild>
                  <button 
                    onClick={() => toggleInsights(pub.id)}
                    className="text-sm text-primary hover:underline flex items-center gap-1 mt-2 transition-colors"
                  >
                    {expandedId === pub.id ? (
                      <>
                        Hide insights
                        <ChevronUp className="h-3 w-3" />
                      </>
                    ) : (
                      <>
                        Show insights
                        <ChevronDown className="h-3 w-3" />
                      </>
                    )}
                  </button>
                </CollapsibleTrigger>
                
                <CollapsibleContent className="data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
                  <div className="mt-4 p-4 bg-muted/30 border-l-2 border-primary rounded-lg space-y-4">
                    {/* Why This Matters */}
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Target className="h-4 w-4 text-accent" />
                        <h4 className="text-sm font-semibold text-foreground">Why This Matters to You</h4>
                      </div>
                      <p className="text-sm text-foreground/90">{pub.aiInsights.whyMatters}</p>
                    </div>
                    
                    {/* Key Findings */}
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Lightbulb className="h-4 w-4 text-accent" />
                        <h4 className="text-sm font-semibold text-foreground">Key Findings</h4>
                      </div>
                      <ul className="space-y-1.5">
                        {pub.aiInsights.keyFindings.map((finding, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-foreground/90">
                            <Check className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                            <span>{finding}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    {/* Related Work */}
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <BookOpen className="h-4 w-4 text-accent" />
                        <h4 className="text-sm font-semibold text-foreground">Related Work You Should Know</h4>
                      </div>
                      <ul className="space-y-1.5">
                        {pub.aiInsights.relatedWork.map((work, i) => (
                          <li key={i}>
                            <a href={work.url} className="text-sm text-primary hover:underline flex items-center gap-1">
                              {work.title}
                              <ExternalLink className="h-3 w-3" />
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    {/* Potential Collaborators */}
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Users className="h-4 w-4 text-primary" />
                        <h4 className="text-sm font-semibold text-foreground">Potential Collaborators</h4>
                      </div>
                      <div className="space-y-2">
                        {pub.aiInsights.collaborators.map((collab, i) => (
                          <div key={i} className="flex items-start gap-2 text-sm bg-background/50 p-2 rounded">
                            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                              <span className="text-xs font-semibold text-primary">
                                {collab.name.split(' ').map(n => n[0]).join('')}
                              </span>
                            </div>
                            <div>
                              <p className="font-medium text-foreground">{collab.name}</p>
                              <p className="text-xs text-muted-foreground">{collab.affiliation}</p>
                              <p className="text-xs text-muted-foreground">{collab.expertise}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>
            <div className="flex gap-2 ml-4">
              <Button size="icon" variant="ghost" className="h-8 w-8">
                <Bookmark className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="ghost" className="h-8 w-8">
                <Share2 className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="ghost" className="h-8 w-8">
                <ExternalLink className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
