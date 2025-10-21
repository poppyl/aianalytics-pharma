import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  BookOpen, 
  Plus, 
  Search, 
  Code, 
  FileText, 
  BarChart3, 
  Image, 
  Link, 
  Share2, 
  Download, 
  Save, 
  Play, 
  Brain, 
  Users, 
  History, 
  GitBranch, 
  Copy, 
  Edit, 
  Trash2, 
  Star,
  Clock,
  MessageSquare,
  FileSpreadsheet,
  Video,
  Music,
  Archive,
  Tag,
  Filter,
  SortAsc,
  Grid,
  List,
  CheckCircle
} from 'lucide-react';

// Sample notebook data
const sampleNotebooks = [
  {
    id: 1,
    title: 'Clinical Trial Analysis',
    description: 'Comprehensive analysis of Phase II clinical trial results',
    author: 'Dr. Sarah Johnson',
    lastModified: '2024-01-20',
    blocks: 15,
    collaborators: 3,
    isStarred: true,
    tags: ['Clinical Trial', 'Analysis', 'Research'],
    template: 'Clinical Research',
  },
  {
    id: 2,
    title: 'Drug Interaction Study',
    description: 'Investigation of potential drug interactions in oncology treatments',
    author: 'Research Team',
    lastModified: '2024-01-18',
    blocks: 8,
    collaborators: 5,
    isStarred: false,
    tags: ['Drug Safety', 'Interactions', 'Oncology'],
    template: 'Safety Analysis',
  },
  {
    id: 3,
    title: 'Literature Review Notes',
    description: 'Comprehensive notes from recent literature review on cancer treatments',
    author: 'Dr. Michael Chen',
    lastModified: '2024-01-15',
    blocks: 22,
    collaborators: 2,
    isStarred: true,
    tags: ['Literature Review', 'Cancer', 'Treatment'],
    template: 'Literature Review',
  },
];

const Notebooks = () => {
  const [activeTab, setActiveTab] = useState('browse');
  const [selectedNotebook, setSelectedNotebook] = useState<any>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [aiPrompt, setAiPrompt] = useState('');
  const [collaborationComments, setCollaborationComments] = useState([]);
  const [versionHistory, setVersionHistory] = useState([]);

  const handleCreateNotebook = () => {
    // Handle notebook creation
    console.log('Creating new notebook...');
  };

  const handleAICompletion = () => {
    // Handle AI content generation
    console.log('AI completion:', aiPrompt);
  };

  const addComment = (comment: string) => {
    setCollaborationComments([...collaborationComments, {
      id: Date.now(),
      text: comment,
      author: 'You',
      timestamp: new Date().toISOString(),
      block: 'Analysis Block 3',
    }]);
  };

  const templates = [
    { id: 'clinical-research', name: 'Clinical Research', description: 'Template for clinical trial documentation' },
    { id: 'literature-review', name: 'Literature Review', description: 'Template for systematic literature reviews' },
    { id: 'data-analysis', name: 'Data Analysis', description: 'Template for statistical analysis workflows' },
    { id: 'safety-analysis', name: 'Safety Analysis', description: 'Template for drug safety assessments' },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Research Notebooks</h1>
          <p className="text-muted-foreground">
            Create, collaborate, and share interactive research notebooks
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="browse">Browse</TabsTrigger>
          <TabsTrigger value="create">Create</TabsTrigger>
          <TabsTrigger value="collaborate">Collaborate</TabsTrigger>
          <TabsTrigger value="ai">AI Assistant</TabsTrigger>
        </TabsList>

        <TabsContent value="browse" className="space-y-6">
          {/* Search and Filters */}
          <Card>
            <CardContent className="p-6">
              <div className="flex gap-4 items-center">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Search notebooks..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="date">Last Modified</SelectItem>
                    <SelectItem value="name">Name</SelectItem>
                    <SelectItem value="author">Author</SelectItem>
                    <SelectItem value="blocks">Number of Blocks</SelectItem>
                  </SelectContent>
                </Select>
                <div className="flex gap-1">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                  >
                    <Grid className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notebooks Grid/List */}
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
            {sampleNotebooks.map((notebook, index) => {
              // Add subtle visual emphasis for important items
              const isImportant = notebook.isStarred || notebook.template === 'Active Research';
              
              return (
                <Card 
                  key={notebook.id} 
                  className={`hover:shadow-lg transition-all duration-300 cursor-pointer ${
                    isImportant ? 'ring-1 ring-secondary/20 bg-gradient-to-br from-card to-secondary/5' : ''
                  }`}
                >
                  <div className="p-6 flex flex-col h-full">
                    {/* Header Section */}
                    <div className="flex items-start justify-between mb-5">
                      <div className="flex items-start gap-3 flex-1 min-w-0">
                        <div className="min-w-0 flex-1">
                          <h3 className="text-lg font-semibold text-foreground leading-tight line-clamp-2">
                            {notebook.title}
                          </h3>
                          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                            {notebook.description}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0 ml-3">
                        <BookOpen className="w-5 h-5 text-blue-500" />
                      </div>
                    </div>


                    {/* Stats Row */}
                    <div className="mb-5">
                      <div className="flex items-center gap-6 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5" />
                          <span className="font-medium">{notebook.lastModified}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <FileText className="w-3.5 h-3.5" />
                          <span className="font-medium">{notebook.blocks} blocks</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Users className="w-3.5 h-3.5" />
                          <span className="font-medium">{notebook.collaborators}</span>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 mt-auto">
                      <Button size="sm" variant="outline" className="flex-1 h-8">
                        <BookOpen className="w-3.5 h-3.5 mr-1.5" />
                        Open
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1 h-8">
                        <Edit className="w-3.5 h-3.5 mr-1.5" />
                        Edit
                      </Button>
                      <Button size="sm" variant="outline" className="h-8 px-3">
                        <Share2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="create" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Create New Notebook</CardTitle>
                <CardDescription>
                  Start with a template or create from scratch
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="notebook-title">Notebook Title</Label>
                  <Input placeholder="Enter notebook title..." />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notebook-description">Description</Label>
                  <Textarea placeholder="Describe your notebook..." />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="template">Template</Label>
                  <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a template" />
                    </SelectTrigger>
                    <SelectContent>
                      {templates.map(template => (
                        <SelectItem key={template.id} value={template.id}>
                          {template.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button className="w-full" onClick={handleCreateNotebook}>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Notebook
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Template Library</CardTitle>
                <CardDescription>
                  Choose from pre-built templates for common workflows
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {templates.map(template => (
                  <div key={template.id} className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">{template.name}</h4>
                        <p className="text-sm text-gray-600">{template.description}</p>
                      </div>
                      <Button size="sm" variant="outline">Use</Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Notebook Editor Preview */}
          <Card>
            <CardHeader>
              <CardTitle>Notebook Editor</CardTitle>
              <CardDescription>
                Mixed content blocks with text, code, and visualizations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {/* Text Block */}
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="w-4 h-4 text-blue-500" />
                    <span className="text-sm font-medium">Text Block</span>
                  </div>
                  <p className="text-sm">
                    This is a sample text block where you can write your research notes, 
                    observations, and analysis. The AI assistant can help complete your thoughts 
                    and suggest improvements.
                  </p>
                </div>

                {/* Code Block */}
                <div className="p-4 border rounded-lg bg-gray-50">
                  <div className="flex items-center gap-2 mb-2">
                    <Code className="w-4 h-4 text-green-500" />
                    <span className="text-sm font-medium">Code Block</span>
                    <Badge variant="outline" className="text-xs">Python</Badge>
                  </div>
                  <pre className="text-sm text-gray-700">
{`import pandas as pd
import matplotlib.pyplot as plt

# Load clinical trial data
data = pd.read_csv('trial_results.csv')
print(data.describe())`}
                  </pre>
                </div>

                {/* Visualization Block */}
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <BarChart3 className="w-4 h-4 text-purple-500" />
                    <span className="text-sm font-medium">Visualization Block</span>
                  </div>
                  <div className="h-32 bg-gray-100 rounded flex items-center justify-center">
                    <BarChart3 className="w-8 h-8 text-gray-400" />
                  </div>
                </div>

                {/* Link Block */}
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Link className="w-4 h-4 text-orange-500" />
                    <span className="text-sm font-medium">Reference Link</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-red-500" />
                    <div>
                      <p className="text-sm font-medium">Clinical Trial Results - Phase II</p>
                      <p className="text-xs text-gray-500">PDF • 2.4 MB • Dr. Sarah Johnson</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="collaborate" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Real-time Collaboration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="p-3 bg-primary/5 rounded-lg border border-primary/10">
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-medium text-sm text-foreground">Dr. Sarah Johnson</span>
                      <Badge variant="outline" className="text-xs">Online</Badge>
                    </div>
                    <p className="text-sm text-foreground">Currently editing: Analysis Block 3</p>
                  </div>
                  <div className="p-3 bg-accent/5 rounded-lg border border-accent/10">
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-medium text-sm text-foreground">Research Team</span>
                      <Badge variant="outline" className="text-xs">Viewing</Badge>
                    </div>
                    <p className="text-sm text-foreground">Currently viewing: Methodology Section</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Add Collaborator</Label>
                  <div className="flex gap-2">
                    <Input placeholder="Enter email address..." />
                    <Button size="sm">Invite</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Comments & Discussions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="p-3 bg-muted/50 rounded-lg border border-border">
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-medium text-sm text-foreground">Dr. Michael Chen</span>
                      <span className="text-xs text-muted-foreground">1 hour ago</span>
                    </div>
                    <p className="text-sm mb-2 text-foreground">Great analysis! Consider adding more statistical details in the methodology section.</p>
                    <div className="text-xs text-muted-foreground">Block: Analysis Block 3</div>
                  </div>
                  <div className="p-3 bg-muted/50 rounded-lg border border-border">
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-medium text-sm text-foreground">Research Team</span>
                      <span className="text-xs text-muted-foreground">2 hours ago</span>
                    </div>
                    <p className="text-sm mb-2 text-foreground">The visualization looks good. Should we add error bars to the chart?</p>
                    <div className="text-xs text-muted-foreground">Block: Visualization Block 2</div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Input placeholder="Add a comment..." />
                  <Button size="sm">Post</Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GitBranch className="w-5 h-5" />
                Version Control & Branching
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-accent/5 rounded-lg border border-accent/10">
                  <CheckCircle className="w-4 h-4 text-accent" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">Main Branch (Current)</p>
                    <p className="text-xs text-muted-foreground">Latest changes: Added statistical analysis section</p>
                    <p className="text-xs text-muted-foreground">Modified by: Dr. Sarah Johnson</p>
                  </div>
                  <Button size="sm" variant="outline">View</Button>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg border border-border">
                  <GitBranch className="w-4 h-4 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">Feature: Enhanced Visualizations</p>
                    <p className="text-xs text-muted-foreground">Experimental: Adding interactive charts</p>
                    <p className="text-xs text-muted-foreground">Created by: Research Team</p>
                  </div>
                  <Button size="sm" variant="outline">Merge</Button>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg border border-border">
                  <GitBranch className="w-4 h-4 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">Feature: AI Integration</p>
                    <p className="text-xs text-muted-foreground">Experimental: Adding AI-powered content generation</p>
                    <p className="text-xs text-muted-foreground">Created by: Dr. Michael Chen</p>
                  </div>
                  <Button size="sm" variant="outline">Merge</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ai" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5" />
                AI Research Assistant
              </CardTitle>
              <CardDescription>
                Get AI assistance with content generation, analysis, and research tasks
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="p-4 bg-muted/50 rounded-lg border border-border">
                  <p className="text-sm text-foreground">
                    <strong>AI Suggestion:</strong> Based on your clinical trial data, I suggest adding a 
                    statistical significance test to strengthen your methodology section. Here's a code block 
                    that could help:
                  </p>
                  <pre className="text-xs mt-2 bg-card p-2 rounded border border-border text-foreground">
{`from scipy import stats
# Perform t-test for statistical significance
t_stat, p_value = stats.ttest_ind(group_a, group_b)
print(f"t-statistic: {t_stat}, p-value: {p_value}")`}
                  </pre>
                </div>
                <div className="p-4 bg-primary/5 rounded-lg border border-primary/10">
                  <p className="text-sm text-foreground">
                    <strong>Content Generation:</strong> I can help you write the introduction section. 
                    Based on your research focus, here's a suggested opening paragraph...
                  </p>
                </div>
                <div className="p-4 bg-accent/5 rounded-lg border border-accent/10">
                  <p className="text-sm text-foreground">
                    <strong>Citation Help:</strong> I found 3 relevant papers that support your methodology:
                    <br />• Smith et al. (2023) - Similar statistical approach
                    <br />• Johnson et al. (2022) - Clinical trial methodology
                    <br />• Chen et al. (2023) - Data analysis techniques
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Ask AI for help</Label>
                <div className="flex gap-2">
                  <Input 
                    placeholder="What would you like me to help you with?" 
                    value={aiPrompt}
                    onChange={(e) => setAiPrompt(e.target.value)}
                  />
                  <Button onClick={handleAICompletion}>
                    <Brain className="w-4 h-4 mr-2" />
                    Ask AI
                  </Button>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm">
                  <Brain className="w-3 h-3 mr-1" />
                  Generate Content
                </Button>
                <Button variant="outline" size="sm">
                  <Code className="w-3 h-3 mr-1" />
                  Write Code
                </Button>
                <Button variant="outline" size="sm">
                  <BarChart3 className="w-3 h-3 mr-1" />
                  Create Visualization
                </Button>
                <Button variant="outline" size="sm">
                  <Link className="w-3 h-3 mr-1" />
                  Find References
                </Button>
                <Button variant="outline" size="sm">
                  <FileText className="w-3 h-3 mr-1" />
                  Summarize
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Notebooks;