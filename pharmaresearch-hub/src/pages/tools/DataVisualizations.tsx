import { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Upload, 
  BarChart3, 
  LineChart, 
  PieChart, 
  Map, 
  Filter, 
  Download, 
  Share2, 
  MessageSquare, 
  History, 
  Brain, 
  Eye, 
  Settings,
  Plus,
  FileSpreadsheet,
  Database,
  CloudUpload
} from 'lucide-react';
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart as RechartsPieChart, Pie, Cell } from 'recharts';

// Sample data for demonstrations
const sampleTimeSeriesData = [
  { date: '2024-01', value: 400, category: 'A' },
  { date: '2024-02', value: 300, category: 'B' },
  { date: '2024-03', value: 600, category: 'A' },
  { date: '2024-04', value: 800, category: 'C' },
  { date: '2024-05', value: 500, category: 'B' },
  { date: '2024-06', value: 700, category: 'A' },
];

const sampleDistributionData = [
  { name: 'Group A', value: 400, color: '#8884d8' },
  { name: 'Group B', value: 300, color: '#82ca9d' },
  { name: 'Group C', value: 300, color: '#ffc658' },
  { name: 'Group D', value: 200, color: '#ff7300' },
];

const DataVisualizations = () => {
  const [activeTab, setActiveTab] = useState('upload');
  const [selectedChartType, setSelectedChartType] = useState('line');
  const [dataSource, setDataSource] = useState('upload');
  const [filters, setFilters] = useState({});
  const [aiQuery, setAiQuery] = useState('');
  const [collaborationComments, setCollaborationComments] = useState([]);
  const [versionHistory, setVersionHistory] = useState([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Handle file upload logic here
      console.log('File uploaded:', file.name);
    }
  };

  const handleAIQuery = () => {
    // Handle AI query processing
    console.log('AI Query:', aiQuery);
  };

  const addComment = (comment: string) => {
    setCollaborationComments([...collaborationComments, {
      id: Date.now(),
      text: comment,
      author: 'You',
      timestamp: new Date().toISOString(),
    }]);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Data & Visualizations</h1>
          <p className="text-muted-foreground">
            Create interactive charts, explore data, and collaborate on insights
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
          <TabsTrigger value="upload">Data Sources</TabsTrigger>
          <TabsTrigger value="visualize">Visualize</TabsTrigger>
          <TabsTrigger value="collaborate">Collaborate</TabsTrigger>
          <TabsTrigger value="ai">AI Assistant</TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="w-5 h-5" />
                  Upload Files
                </CardTitle>
                <CardDescription>
                  Upload CSV, Excel, or JSON files
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div 
                  className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-gray-400"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <CloudUpload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                  <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                  <p className="text-xs text-gray-500">CSV, Excel, JSON supported</p>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".csv,.xlsx,.json"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <Button className="w-full" variant="outline">
                  <FileSpreadsheet className="w-4 h-4 mr-2" />
                  Sample Dataset
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="w-5 h-5" />
                  Database Connection
                </CardTitle>
                <CardDescription>
                  Connect to external databases
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="db-type">Database Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select database" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="postgresql">PostgreSQL</SelectItem>
                      <SelectItem value="mysql">MySQL</SelectItem>
                      <SelectItem value="mongodb">MongoDB</SelectItem>
                      <SelectItem value="sqlite">SQLite</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="connection-string">Connection String</Label>
                  <Input placeholder="postgresql://user:pass@host:port/db" />
                </div>
                <Button className="w-full">Connect</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Data Quality
                </CardTitle>
                <CardDescription>
                  Analyze data quality and completeness
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Completeness</span>
                    <span>92%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '92%' }}></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Consistency</span>
                    <span>87%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '87%' }}></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Accuracy</span>
                    <span>95%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '95%' }}></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="visualize" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-1 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Chart Type</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button
                    variant={selectedChartType === 'line' ? 'default' : 'outline'}
                    className="w-full justify-start"
                    onClick={() => setSelectedChartType('line')}
                  >
                    <LineChart className="w-4 h-4 mr-2" />
                    Time Series
                  </Button>
                  <Button
                    variant={selectedChartType === 'bar' ? 'default' : 'outline'}
                    className="w-full justify-start"
                    onClick={() => setSelectedChartType('bar')}
                  >
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Bar Chart
                  </Button>
                  <Button
                    variant={selectedChartType === 'pie' ? 'default' : 'outline'}
                    className="w-full justify-start"
                    onClick={() => setSelectedChartType('pie')}
                  >
                    <PieChart className="w-4 h-4 mr-2" />
                    Distribution
                  </Button>
                  <Button
                    variant={selectedChartType === 'map' ? 'default' : 'outline'}
                    className="w-full justify-start"
                    onClick={() => setSelectedChartType('map')}
                  >
                    <Map className="w-4 h-4 mr-2" />
                    Geographic
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Filters</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <Label>Date Range</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="last7days">Last 7 days</SelectItem>
                        <SelectItem value="last30days">Last 30 days</SelectItem>
                        <SelectItem value="last90days">Last 90 days</SelectItem>
                        <SelectItem value="custom">Custom range</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Category</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="All categories" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="A">Category A</SelectItem>
                        <SelectItem value="B">Category B</SelectItem>
                        <SelectItem value="C">Category C</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button className="w-full" variant="outline">
                    <Filter className="w-4 h-4 mr-2" />
                    Apply Filters
                  </Button>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-3">
              <Card>
                <CardHeader>
                  <CardTitle>Interactive Visualization</CardTitle>
                  <CardDescription>
                    Click and drag to explore data points
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-96">
                    {selectedChartType === 'line' && (
                      <ResponsiveContainer width="100%" height="100%">
                        <RechartsLineChart data={sampleTimeSeriesData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="date" />
                          <YAxis />
                          <Tooltip />
                          <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} />
                        </RechartsLineChart>
                      </ResponsiveContainer>
                    )}
                    {selectedChartType === 'bar' && (
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={sampleTimeSeriesData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="date" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="value" fill="#8884d8" />
                        </BarChart>
                      </ResponsiveContainer>
                    )}
                    {selectedChartType === 'pie' && (
                      <ResponsiveContainer width="100%" height="100%">
                        <RechartsPieChart>
                          <Pie
                            data={sampleDistributionData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {sampleDistributionData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </RechartsPieChart>
                      </ResponsiveContainer>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="collaborate" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Comments & Annotations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {collaborationComments.map((comment) => (
                    <div key={comment.id} className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-medium text-sm">{comment.author}</span>
                        <span className="text-xs text-gray-500">
                          {new Date(comment.timestamp).toLocaleString()}
                        </span>
                      </div>
                      <p className="text-sm">{comment.text}</p>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input 
                    placeholder="Add a comment..." 
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        addComment(e.currentTarget.value);
                        e.currentTarget.value = '';
                      }
                    }}
                  />
                  <Button size="sm">Post</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <History className="w-5 h-5" />
                  Version History
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-primary/5 rounded-lg border border-primary/10">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">Current Version</p>
                      <p className="text-xs text-muted-foreground">Applied filters and added annotations</p>
                    </div>
                    <Button size="sm" variant="outline">Restore</Button>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg border border-border">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">Version 1.2</p>
                      <p className="text-xs text-muted-foreground">Initial data upload</p>
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
                AI Research Assistant
              </CardTitle>
              <CardDescription>
                Ask questions about your data and get intelligent insights
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="p-4 bg-muted/50 rounded-lg border border-border">
                  <p className="text-sm text-foreground">
                    <strong>AI:</strong> I notice a 15% increase in Category A values over the last quarter. 
                    This trend appears to correlate with the seasonal patterns we've observed in previous years.
                  </p>
                </div>
                <div className="p-4 bg-primary/5 rounded-lg border border-primary/10">
                  <p className="text-sm text-foreground">
                    <strong>You:</strong> What are the key outliers in this dataset?
                  </p>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg border border-border">
                  <p className="text-sm text-foreground">
                    <strong>AI:</strong> I've identified 3 significant outliers: 
                    <br />• March 2024: 600 (expected ~450)
                    <br />• April 2024: 800 (expected ~520)
                    <br />• June 2024: 700 (expected ~580)
                    <br /><br />These outliers might indicate external factors or data collection anomalies.
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Input 
                  placeholder="Ask about your data..." 
                  value={aiQuery}
                  onChange={(e) => setAiQuery(e.target.value)}
                />
                <Button onClick={handleAIQuery}>
                  <Brain className="w-4 h-4 mr-2" />
                  Ask AI
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">Show correlations</Badge>
                <Badge variant="outline">Find patterns</Badge>
                <Badge variant="outline">Predict trends</Badge>
                <Badge variant="outline">Explain anomalies</Badge>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DataVisualizations;