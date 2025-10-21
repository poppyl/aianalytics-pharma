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
  FileText, 
  Search, 
  Tag, 
  MessageSquare, 
  History, 
  Brain, 
  Upload, 
  Download, 
  Share2, 
  Eye, 
  Edit, 
  Trash2, 
  Plus,
  Filter,
  SortAsc,
  Grid,
  List,
  BookOpen,
  File,
  FileSpreadsheet,
  Image,
  Video,
  Archive,
  Star,
  Clock,
  Users,
  Link,
  Copy,
  CheckCircle
} from 'lucide-react';

// Sample document data
const sampleDocuments = [
  {
    id: 1,
    title: 'Clinical Trial Results - Phase II',
    type: 'PDF',
    size: '2.4 MB',
    uploadDate: '2024-01-15',
    tags: ['Clinical Trial', 'Phase II', 'Results'],
    author: 'Dr. Sarah Johnson',
    status: 'Published',
    citations: 12,
    comments: 5,
    isStarred: true,
    lastModified: '2024-01-20',
  },
  {
    id: 2,
    title: 'Drug Interaction Database',
    type: 'Excel',
    size: '1.8 MB',
    uploadDate: '2024-01-10',
    tags: ['Database', 'Interactions', 'Drug Safety'],
    author: 'Research Team',
    status: 'Draft',
    citations: 0,
    comments: 2,
    isStarred: false,
    lastModified: '2024-01-18',
  },
  {
    id: 3,
    title: 'Literature Review - Oncology',
    type: 'Word',
    size: '3.2 MB',
    uploadDate: '2024-01-08',
    tags: ['Literature Review', 'Oncology', 'Research'],
    author: 'Dr. Michael Chen',
    status: 'Under Review',
    citations: 8,
    comments: 3,
    isStarred: true,
    lastModified: '2024-01-19',
  },
];

const Documents = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('date');
  const [filterStatus, setFilterStatus] = useState('all');
  const [activeTab, setActiveTab] = useState('browse');
  const [selectedDocument, setSelectedDocument] = useState<any>(null);
  const [aiSummary, setAiSummary] = useState('');
  const [collaborationComments, setCollaborationComments] = useState([]);
  const [versionHistory, setVersionHistory] = useState([]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Implement search logic
  };

  const handleTagFilter = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleAISummary = () => {
    setAiSummary('This document contains comprehensive clinical trial results for Phase II testing of the new oncology drug. Key findings include a 23% improvement in patient outcomes compared to standard treatment, with manageable side effects. The study involved 150 patients across 12 medical centers. Statistical significance was achieved in primary endpoints with p < 0.05.');
  };

  const addComment = (comment: string) => {
    setCollaborationComments([...collaborationComments, {
      id: Date.now(),
      text: comment,
      author: 'You',
      timestamp: new Date().toISOString(),
      section: 'Abstract',
    }]);
  };

  const allTags = Array.from(new Set(sampleDocuments.flatMap(doc => doc.tags)));

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Document Management</h1>
          <p className="text-muted-foreground">
            Organize, search, and collaborate on research documents
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Upload className="w-4 h-4 mr-2" />
            Upload
          </Button>
          <Button variant="outline" size="sm">
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="browse">Browse</TabsTrigger>
          <TabsTrigger value="search">Search</TabsTrigger>
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
                      placeholder="Search documents..."
                      value={searchQuery}
                      onChange={(e) => handleSearch(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="date">Date Modified</SelectItem>
                    <SelectItem value="name">Name</SelectItem>
                    <SelectItem value="size">Size</SelectItem>
                    <SelectItem value="author">Author</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="review">Under Review</SelectItem>
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

          {/* Tags Filter */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Filter by Tags</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {allTags.map(tag => (
                  <Badge
                    key={tag}
                    variant={selectedTags.includes(tag) ? 'default' : 'outline'}
                    className="cursor-pointer"
                    onClick={() => handleTagFilter(tag)}
                  >
                    <Tag className="w-3 h-3 mr-1" />
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Documents Grid/List */}
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
            {sampleDocuments.map((doc, index) => {
              // Add subtle visual emphasis for important items
              const isImportant = doc.isStarred || doc.status === 'Published';
              
              return (
                <Card 
                  key={doc.id} 
                  className={`hover:shadow-lg transition-all duration-300 cursor-pointer ${
                    isImportant ? 'ring-1 ring-primary/20 bg-gradient-to-br from-card to-primary/5' : ''
                  }`}
                >
                  <div className="p-6 flex flex-col h-full">
                    {/* Group 1 - Header Section */}
                    <div className="flex items-start justify-between mb-5">
                      <div className="flex items-start gap-3 flex-1 min-w-0">
                        <div className="min-w-0 flex-1">
                          <h3 className="text-lg font-semibold text-foreground leading-tight line-clamp-2">
                            {doc.title}
                          </h3>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0 ml-3">
                        {doc.type === 'PDF' && <FileText className="w-5 h-5 text-red-500" />}
                        {doc.type === 'Excel' && <FileSpreadsheet className="w-5 h-5 text-green-500" />}
                        {doc.type === 'Word' && <File className="w-5 h-5 text-blue-500" />}
                      </div>
                    </div>

                    {/* Group 2 - Metadata Row */}
                    <div className="mb-5">
                      <p className="text-sm text-muted-foreground font-medium">
                        {doc.type} • {doc.size} • {doc.author}
                      </p>
                    </div>


                    {/* Group 4 - Stats Row */}
                    <div className="mb-5">
                      <div className="flex items-center gap-6 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5" />
                          <span className="font-medium">{doc.lastModified}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span className="font-medium">{doc.comments}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Link className="w-3.5 h-3.5" />
                          <span className="font-medium">{doc.citations}</span>
                        </div>
                      </div>
                    </div>

                    {/* Group 5 - Action Buttons */}
                    <div className="flex gap-2 mt-auto">
                      <Button size="sm" variant="outline" className="flex-1 h-8">
                        <Eye className="w-3.5 h-3.5 mr-1.5" />
                        View
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

        <TabsContent value="search" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Advanced Search</CardTitle>
              <CardDescription>
                Use semantic search to find documents by meaning, not just keywords
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Search Query</Label>
                <Textarea
                  placeholder="Describe what you're looking for... (e.g., 'clinical trials with positive outcomes for cancer treatment')"
                  className="min-h-20"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Document Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="All types" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="pdf">PDF</SelectItem>
                      <SelectItem value="word">Word</SelectItem>
                      <SelectItem value="excel">Excel</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Date Range</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Any time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any time</SelectItem>
                      <SelectItem value="last7days">Last 7 days</SelectItem>
                      <SelectItem value="last30days">Last 30 days</SelectItem>
                      <SelectItem value="lastyear">Last year</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button className="w-full">
                <Search className="w-4 h-4 mr-2" />
                Search Documents
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Search Results</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-medium">Clinical Trial Results - Phase II</h3>
                    <Badge>95% Match</Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    This document contains comprehensive results from Phase II clinical trials, 
                    showing positive outcomes for cancer treatment protocols...
                  </p>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span>Dr. Sarah Johnson</span>
                    <span>•</span>
                    <span>Jan 15, 2024</span>
                    <span>•</span>
                    <span>12 citations</span>
                  </div>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-medium">Literature Review - Oncology</h3>
                    <Badge>87% Match</Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    Comprehensive review of recent oncology research, including analysis of 
                    treatment efficacy and patient outcomes...
                  </p>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span>Dr. Michael Chen</span>
                    <span>•</span>
                    <span>Jan 8, 2024</span>
                    <span>•</span>
                    <span>8 citations</span>
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
                  <MessageSquare className="w-5 h-5" />
                  Comments & Discussions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="p-3 bg-primary/5 rounded-lg border border-primary/10">
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-medium text-sm text-foreground">Dr. Sarah Johnson</span>
                      <span className="text-xs text-muted-foreground">2 hours ago</span>
                    </div>
                    <p className="text-sm mb-2 text-foreground">Great findings in the methodology section. Have you considered including the control group data?</p>
                    <div className="text-xs text-muted-foreground">Section: Methodology</div>
                  </div>
                  <div className="p-3 bg-muted/50 rounded-lg border border-border">
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-medium text-sm text-foreground">Research Team</span>
                      <span className="text-xs text-muted-foreground">1 day ago</span>
                    </div>
                    <p className="text-sm mb-2 text-foreground">The statistical analysis looks solid. We should add more details about the p-value calculations.</p>
                    <div className="text-xs text-muted-foreground">Section: Results</div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Input placeholder="Add a comment..." />
                  <Button size="sm">Post</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <History className="w-5 h-5" />
                  Version Control
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-accent/5 rounded-lg border border-accent/10">
                    <CheckCircle className="w-4 h-4 text-accent" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">Version 2.1 (Current)</p>
                      <p className="text-xs text-muted-foreground">Added statistical analysis section</p>
                      <p className="text-xs text-muted-foreground">Modified by: Dr. Sarah Johnson</p>
                    </div>
                    <Button size="sm" variant="outline">View</Button>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg border border-border">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">Version 2.0</p>
                      <p className="text-xs text-muted-foreground">Updated methodology section</p>
                      <p className="text-xs text-muted-foreground">Modified by: Research Team</p>
                    </div>
                    <Button size="sm" variant="outline">Restore</Button>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg border border-border">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">Version 1.0</p>
                      <p className="text-xs text-muted-foreground">Initial document</p>
                      <p className="text-xs text-muted-foreground">Created by: Dr. Michael Chen</p>
                    </div>
                    <Button size="sm" variant="outline">Restore</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="ai" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5" />
                AI Document Assistant
              </CardTitle>
              <CardDescription>
                Get intelligent insights, summaries, and analysis of your documents
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="p-4 bg-muted/50 rounded-lg border border-border">
                  <p className="text-sm text-foreground">
                    <strong>AI Summary:</strong> This clinical trial document shows promising results for the new oncology treatment. 
                    Key findings include a 23% improvement in patient outcomes with manageable side effects. 
                    The study methodology appears robust with proper statistical controls.
                  </p>
                </div>
                <div className="p-4 bg-primary/5 rounded-lg border border-primary/10">
                  <p className="text-sm text-foreground">
                    <strong>Key Citations Found:</strong>
                    <br />• Smith et al. (2023) - Similar methodology
                    <br />• Johnson et al. (2022) - Related treatment approach
                    <br />• Chen et al. (2023) - Statistical analysis reference
                  </p>
                </div>
                <div className="p-4 bg-accent/5 rounded-lg border border-accent/10">
                  <p className="text-sm text-foreground">
                    <strong>Suggested Actions:</strong>
                    <br />• Consider adding more details about patient demographics
                    <br />• Include comparison with standard treatment protocols
                    <br />• Add discussion of potential limitations
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Ask AI about this document</Label>
                <div className="flex gap-2">
                  <Input placeholder="What are the key findings in this document?" />
                  <Button>
                    <Brain className="w-4 h-4 mr-2" />
                    Ask
                  </Button>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm">
                  <Brain className="w-3 h-3 mr-1" />
                  Summarize
                </Button>
                <Button variant="outline" size="sm">
                  <Link className="w-3 h-3 mr-1" />
                  Find Citations
                </Button>
                <Button variant="outline" size="sm">
                  <Edit className="w-3 h-3 mr-1" />
                  Suggest Improvements
                </Button>
                <Button variant="outline" size="sm">
                  <FileText className="w-3 h-3 mr-1" />
                  Extract Key Points
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Documents;