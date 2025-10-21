import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart3, 
  FileText, 
  BookOpen, 
  MessageSquare, 
  Brain, 
  Database, 
  Code, 
  Search, 
  Upload, 
  Download, 
  Share2, 
  Users, 
  History, 
  Settings,
  ArrowRight,
  Star,
  Clock,
  TrendingUp,
  Lightbulb,
  Zap
} from 'lucide-react';

const Tools = () => {
  const navigate = useNavigate();
  const [selectedTool, setSelectedTool] = useState<string | null>(null);

  const tools = [
    {
      id: 'data-visualizations',
      title: 'Data & Visualizations',
      description: 'Create interactive charts, explore data, and collaborate on insights',
      icon: BarChart3,
      features: [
        'Interactive chart creation from uploaded datasets',
        'Real-time data transformation and filtering',
        'Multiple visualization types (time series, distributions, correlations, maps)',
        'Drill-down functionality for data exploration',
        'Export options for charts and data',
        'Collaborative annotations and comments',
        'Version history for data transformations',
        'AI assistant for natural language queries',
        'Custom dashboard views',
        'Data quality indicators and missing data visualization'
      ],
      color: 'blue',
      status: 'Available',
      lastUsed: '2 hours ago',
      isStarred: true,
    },
    {
      id: 'documents',
      title: 'Documents',
      description: 'Organize, search, and collaborate on research documents',
      icon: FileText,
      features: [
        'Multiple document formats (PDF, Word, text files, research papers)',
        'Full-text search with semantic understanding',
        'Document tagging and categorization',
        'Citation extraction and management',
        'Collaborative commenting and discussion threads',
        'Version control and change tracking',
        'Document comparison tools',
        'AI-powered summarization',
        'Cross-document reference linking',
        'Bulk import and organization tools',
        'Permission controls for sharing and collaboration'
      ],
      color: 'green',
      status: 'Available',
      lastUsed: '1 day ago',
      isStarred: true,
    },
    {
      id: 'notebooks',
      title: 'Notebooks',
      description: 'Create, collaborate, and share interactive research notebooks',
      icon: BookOpen,
      features: [
        'Mixed content blocks: text, code, visualizations, embedded documents',
        'AI-assisted content generation and completion',
        'Citation management integrated with document library',
        'Real-time collaboration with multiple users',
        'Code execution for data analysis (multiple languages)',
        'Rich text editing with formatting options',
        'Link to and reference other notebooks, documents, and data',
        'Template library for common research workflows',
        'Export to multiple formats (PDF, HTML, markdown)',
        'Notebook versioning and branching',
        'Search across all notebook content'
      ],
      color: 'purple',
      status: 'Available',
      lastUsed: '3 hours ago',
      isStarred: false,
    },
    {
      id: 'chat',
      title: 'AI Research Assistant',
      description: 'Conversational AI for research insights, data analysis, and collaboration',
      icon: MessageSquare,
      features: [
        'Conversational querying of all platform content',
        'Context-aware responses that cite specific sources',
        'Multi-turn conversations with memory',
        'Request data analysis, visualizations, and summaries',
        'Code generation for data analysis tasks',
        'Literature review assistance across document library',
        'Question suggestion based on research context',
        'Conversation history and search',
        'Save useful responses as notebook entries',
        'Integration with all platform features',
        'Support for uploading files directly in chat',
        'Export conversation threads'
      ],
      color: 'orange',
      status: 'Available',
      lastUsed: '30 minutes ago',
      isStarred: true,
    },
  ];

  const handleToolSelect = (toolId: string) => {
    setSelectedTool(toolId);
    // Navigate to the specific tool page using React Router
    navigate(`/tools/${toolId}`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Available':
        return 'bg-green-100 text-green-800';
      case 'In Use':
        return 'bg-yellow-100 text-yellow-800';
      case 'Maintenance':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue':
        return 'bg-primary/10 border-primary/20 text-primary';
      case 'green':
        return 'bg-accent/10 border-accent/20 text-accent';
      case 'purple':
        return 'bg-secondary/10 border-secondary/20 text-secondary';
      case 'orange':
        return 'bg-orange-500/10 border-orange-500/20 text-orange-600';
      default:
        return 'bg-muted border-border text-muted-foreground';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Research Tools</h1>
          <p className="text-muted-foreground">
            Comprehensive suite of AI-powered tools for pharmaceutical research
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
          <Button variant="outline" size="sm">
            <History className="w-4 h-4 mr-2" />
            History
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card-elevated rounded-xl p-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <BarChart3 className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Active Visualizations</p>
              <p className="text-2xl font-bold text-foreground">12</p>
            </div>
          </div>
        </div>
        <div className="card-elevated rounded-xl p-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-accent/10 rounded-lg">
              <FileText className="w-5 h-5 text-accent" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Documents</p>
              <p className="text-2xl font-bold text-foreground">47</p>
            </div>
          </div>
        </div>
        <div className="card-elevated rounded-xl p-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-secondary/10 rounded-lg">
              <BookOpen className="w-5 h-5 text-secondary" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Notebooks</p>
              <p className="text-2xl font-bold text-foreground">8</p>
            </div>
          </div>
        </div>
        <div className="card-elevated rounded-xl p-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-500/10 rounded-lg">
              <MessageSquare className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">AI Conversations</p>
              <p className="text-2xl font-bold text-foreground">23</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tools Grid - Improved 3-card layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {tools.map((tool, index) => {
          const IconComponent = tool.icon;
          const isPrimary = index === 0; // First tool gets primary treatment
          const isSecondary = index === 1; // Second tool gets secondary treatment
          
          return (
            <div 
              key={tool.id} 
              className={`card-elevated rounded-xl cursor-pointer transition-all duration-300 hover:scale-105 ${
                isPrimary ? 'lg:col-span-2' : ''
              }`}
              onClick={() => handleToolSelect(tool.id)}
            >
              <div className={`${isPrimary ? 'p-8' : 'p-6'} pb-4`}>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-xl ${getColorClasses(tool.color)} ${
                      isPrimary ? 'scale-110' : ''
                    }`}>
                      <IconComponent className={`${isPrimary ? 'w-8 h-8' : 'w-6 h-6'}`} />
                    </div>
                    <div>
                      <h3 className={`${isPrimary ? 'text-2xl' : 'text-xl'} font-bold text-foreground`}>
                        {tool.title}
                      </h3>
                      <p className={`text-muted-foreground mt-1 ${isPrimary ? 'text-base' : 'text-sm'}`}>
                        {tool.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {tool.isStarred && <Star className="w-4 h-4 text-yellow-500 fill-current" />}
                    <Badge className={getStatusColor(tool.status)}>
                      {tool.status}
                    </Badge>
                  </div>
                </div>
              </div>
              
              <div className={`${isPrimary ? 'px-8 pb-8' : 'px-6 pb-6'} space-y-4`}>
                <div className="space-y-3">
                  <h4 className={`font-medium ${isPrimary ? 'text-base' : 'text-sm'} text-foreground`}>
                    Key Features:
                  </h4>
                  <div className={`grid ${isPrimary ? 'grid-cols-2' : 'grid-cols-1'} gap-2`}>
                    {tool.features.slice(0, isPrimary ? 6 : 4).map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <div className="w-1 h-1 bg-muted-foreground rounded-full mt-2 flex-shrink-0"></div>
                        <span className="leading-relaxed">{feature}</span>
                      </div>
                    ))}
                    {tool.features.length > (isPrimary ? 6 : 4) && (
                      <div className="text-sm text-muted-foreground font-medium">
                        +{tool.features.length - (isPrimary ? 6 : 4)} more features
                      </div>
                    )}
                  </div>
                </div>

                <div className={`flex items-center justify-between pt-4 border-t border-border ${
                  isPrimary ? 'pt-6' : 'pt-4'
                }`}>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {tool.lastUsed}
                    </span>
                  </div>
                  <Button size={isPrimary ? 'default' : 'sm'} variant="outline" className="group">
                    <ArrowRight className={`${isPrimary ? 'w-4 h-4' : 'w-3 h-3'} mr-1 group-hover:translate-x-1 transition-transform`} />
                    Open
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="card-elevated rounded-xl">
        <div className="p-6 pb-3">
          <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Recent Activity
          </h2>
        </div>
        <div className="px-6 pb-6">
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-primary/5 rounded-lg border border-primary/10">
              <BarChart3 className="w-4 h-4 text-primary" />
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">Created new visualization: Patient Outcomes Dashboard</p>
                <p className="text-xs text-muted-foreground">2 hours ago • Data & Visualizations</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-accent/5 rounded-lg border border-accent/10">
              <FileText className="w-4 h-4 text-accent" />
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">Uploaded document: Clinical Trial Results - Phase II</p>
                <p className="text-xs text-muted-foreground">1 day ago • Documents</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-secondary/5 rounded-lg border border-secondary/10">
              <BookOpen className="w-4 h-4 text-secondary" />
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">Created notebook: Drug Interaction Analysis</p>
                <p className="text-xs text-muted-foreground">3 hours ago • Notebooks</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-orange-500/5 rounded-lg border border-orange-500/10">
              <MessageSquare className="w-4 h-4 text-orange-600" />
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">AI conversation: Statistical analysis assistance</p>
                <p className="text-xs text-muted-foreground">30 minutes ago • AI Assistant</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Insights */}
      <div className="card-elevated rounded-xl">
        <div className="p-6 pb-3">
          <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
            <Lightbulb className="w-5 h-5" />
            AI Insights & Recommendations
          </h2>
        </div>
        <div className="px-6 pb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-primary/5 rounded-lg border border-primary/10">
              <div className="flex items-center gap-2 mb-2">
                <Brain className="w-4 h-4 text-primary" />
                <h4 className="font-medium text-foreground">Data Analysis</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                Your clinical trial data shows promising patterns. Consider creating a 
                comprehensive dashboard to track patient outcomes over time.
              </p>
            </div>
            <div className="p-4 bg-accent/5 rounded-lg border border-accent/10">
              <div className="flex items-center gap-2 mb-2">
                <Search className="w-4 h-4 text-accent" />
                <h4 className="font-medium text-foreground">Literature Review</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                I found 12 new papers related to your research. Would you like me to 
                create a summary of the key findings?
              </p>
            </div>
            <div className="p-4 bg-secondary/5 rounded-lg border border-secondary/10">
              <div className="flex items-center gap-2 mb-2">
                <Code className="w-4 h-4 text-secondary" />
                <h4 className="font-medium text-foreground">Code Generation</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                I can help you write Python code for statistical analysis of your 
                patient data. What specific analysis would you like to perform?
              </p>
            </div>
            <div className="p-4 bg-orange-500/5 rounded-lg border border-orange-500/10">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-4 h-4 text-orange-600" />
                <h4 className="font-medium text-foreground">Workflow Optimization</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                Based on your usage patterns, I suggest creating a template for 
                your regular research workflows to save time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tools;
