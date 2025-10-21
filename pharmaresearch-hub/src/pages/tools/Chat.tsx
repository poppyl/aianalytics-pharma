import { useState, useRef, useEffect } from 'react';
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
  MessageSquare, 
  Send, 
  Upload, 
  Download, 
  Brain, 
  FileText, 
  BarChart3, 
  Code, 
  Link, 
  Star, 
  History, 
  Search, 
  Plus, 
  Copy, 
  Share2, 
  Settings, 
  Lightbulb, 
  BookOpen, 
  Database, 
  Image, 
  Video, 
  FileSpreadsheet,
  Archive,
  Trash2,
  Edit,
  Save,
  Play,
  Pause,
  Volume2,
  Mic,
  MicOff,
  Camera,
  Smile,
  MoreHorizontal,
  Eye
} from 'lucide-react';

// Sample chat data
const sampleConversations = [
  {
    id: 1,
    title: 'Clinical Trial Analysis Discussion',
    lastMessage: 'Can you help me analyze the statistical significance of our Phase II results?',
    timestamp: '2 hours ago',
    unread: 0,
    isStarred: true,
    participants: ['Dr. Sarah Johnson', 'AI Assistant'],
  },
  {
    id: 2,
    title: 'Drug Interaction Research',
    lastMessage: 'I need to find recent literature on drug interactions in oncology treatments.',
    timestamp: '1 day ago',
    unread: 2,
    isStarred: false,
    participants: ['Research Team', 'AI Assistant'],
  },
  {
    id: 3,
    title: 'Data Visualization Help',
    lastMessage: 'How can I create an interactive scatter plot for our patient data?',
    timestamp: '3 days ago',
    unread: 0,
    isStarred: true,
    participants: ['Dr. Michael Chen', 'AI Assistant'],
  },
];

const Chat = () => {
  const [activeTab, setActiveTab] = useState('chat');
  const [selectedConversation, setSelectedConversation] = useState<any>(null);
  const [message, setMessage] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [conversationHistory, setConversationHistory] = useState([]);
  const [suggestedQuestions, setSuggestedQuestions] = useState([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversationHistory]);

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const newMessage = {
      id: Date.now(),
      text: message,
      sender: 'user',
      timestamp: new Date().toISOString(),
      files: uploadedFiles,
    };

    setConversationHistory([...conversationHistory, newMessage]);
    setMessage('');
    setUploadedFiles([]);
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage = {
        id: Date.now() + 1,
        text: generateAIResponse(message),
        sender: 'ai',
        timestamp: new Date().toISOString(),
        citations: generateCitations(),
        suggestions: generateSuggestions(),
      };

      setConversationHistory([...conversationHistory, newMessage, aiMessage]);
      setIsTyping(false);
    }, 2000);
  };

  const generateAIResponse = (userMessage: string) => {
    const responses = [
      "Based on your clinical trial data, I can see several interesting patterns. The statistical analysis shows a 23% improvement in patient outcomes compared to the control group. Would you like me to create a visualization of these results?",
      "I've analyzed your drug interaction data and found 3 potential interactions that require attention. I can help you create a comprehensive safety report with recommendations.",
      "For your literature review, I found 12 relevant papers published in the last year. I can help you organize these by relevance and create a summary of key findings.",
      "I can help you create an interactive dashboard for your research data. What specific metrics would you like to focus on?",
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const generateCitations = () => {
    return [
      { title: 'Clinical Trial Results - Phase II', author: 'Dr. Sarah Johnson', type: 'PDF' },
      { title: 'Drug Interaction Database', author: 'Research Team', type: 'Excel' },
      { title: 'Literature Review - Oncology', author: 'Dr. Michael Chen', type: 'Word' },
    ];
  };

  const generateSuggestions = () => {
    return [
      'Create a visualization of this data',
      'Find similar studies in the literature',
      'Generate a summary report',
      'Export this analysis to a notebook',
    ];
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setUploadedFiles([...uploadedFiles, ...files]);
  };

  const handleSuggestedQuestion = (question: string) => {
    setMessage(question);
  };

  const handleExportConversation = () => {
    // Handle conversation export
    console.log('Exporting conversation...');
  };

  const handleSaveAsNotebook = () => {
    // Handle saving conversation as notebook
    console.log('Saving as notebook...');
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text">AI Research Assistant</h1>
          <p className="text-muted-foreground">
            Conversational AI for research insights, data analysis, and collaboration
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <History className="w-4 h-4 mr-2" />
            History
          </Button>
          <Button variant="outline" size="sm">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="chat">Chat</TabsTrigger>
          <TabsTrigger value="conversations">Conversations</TabsTrigger>
          <TabsTrigger value="files">Files</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="chat" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Chat Interface */}
            <div className="lg:col-span-3">
              <div className="card-elevated rounded-xl h-[600px] flex flex-col">
                <div className="p-6 pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Brain className="w-5 h-5 text-primary" />
                      <h2 className="text-xl font-bold text-foreground">AI Research Assistant</h2>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">Online</Badge>
                      <Button size="sm" variant="outline">
                        <Settings className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="px-6 pb-6 flex-1 flex flex-col">
                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                    {conversationHistory.map((msg) => (
                      <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] p-3 rounded-lg ${
                          msg.sender === 'user' 
                            ? 'bg-primary text-primary-foreground' 
                            : 'bg-muted text-foreground'
                        }`}>
                          <p className="text-sm">{msg.text}</p>
                          {msg.sender === 'ai' && msg.citations && (
                            <div className="mt-2 pt-2 border-t border-border">
                              <p className="text-xs font-medium mb-1">Sources:</p>
                              {msg.citations.map((citation, index) => (
                                <div key={index} className="text-xs flex items-center gap-1">
                                  <FileText className="w-3 h-3" />
                                  {citation.title} - {citation.author}
                                </div>
                              ))}
                            </div>
                          )}
                          {msg.sender === 'ai' && msg.suggestions && (
                            <div className="mt-2 pt-2 border-t border-border">
                              <p className="text-xs font-medium mb-1">Suggestions:</p>
                              <div className="flex flex-wrap gap-1">
                                {msg.suggestions.map((suggestion, index) => (
                                  <Button key={index} size="sm" variant="outline" className="text-xs">
                                    {suggestion}
                                  </Button>
                                ))}
                              </div>
                            </div>
                          )}
                          <p className="text-xs opacity-70 mt-1">
                            {new Date(msg.timestamp).toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    ))}
                    {isTyping && (
                      <div className="flex justify-start">
                        <div className="bg-muted p-3 rounded-lg">
                          <div className="flex items-center gap-2">
                            <div className="flex space-x-1">
                              <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                              <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                              <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                            </div>
                            <span className="text-sm text-muted-foreground">AI is thinking...</span>
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* File Uploads */}
                  {uploadedFiles.length > 0 && (
                    <div className="mb-4 p-3 bg-muted/50 rounded-lg">
                      <p className="text-sm font-medium mb-2 text-foreground">Uploaded Files:</p>
                      <div className="flex flex-wrap gap-2">
                        {uploadedFiles.map((file, index) => (
                          <div key={index} className="flex items-center gap-2 bg-card p-2 rounded border border-border">
                            <FileText className="w-4 h-4 text-primary" />
                            <span className="text-sm text-foreground">{file.name}</span>
                            <Button size="sm" variant="ghost" className="p-1">
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Message Input */}
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Ask me anything about your research..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        className="flex-1"
                      />
                      <Button size="sm" variant="outline" onClick={() => document.getElementById('file-upload')?.click()}>
                        <Upload className="w-4 h-4" />
                      </Button>
                      <Button onClick={handleSendMessage} disabled={!message.trim()}>
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                    <input
                      id="file-upload"
                      type="file"
                      multiple
                      onChange={handleFileUpload}
                      className="hidden"
                      accept=".pdf,.doc,.docx,.xlsx,.csv,.txt,.jpg,.png"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              <div className="card-elevated rounded-xl">
                <div className="p-6 pb-3">
                  <h3 className="text-lg font-bold text-foreground">Quick Actions</h3>
                </div>
                <div className="px-6 pb-6 space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Create Visualization
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="w-4 h-4 mr-2" />
                    Generate Report
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Code className="w-4 h-4 mr-2" />
                    Write Code
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Search className="w-4 h-4 mr-2" />
                    Search Literature
                  </Button>
                </div>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Suggested Questions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start text-left text-sm"
                    onClick={() => handleSuggestedQuestion('Analyze the statistical significance of our clinical trial results')}
                  >
                    Analyze clinical trial data
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start text-left text-sm"
                    onClick={() => handleSuggestedQuestion('Find recent literature on drug interactions')}
                  >
                    Find literature
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start text-left text-sm"
                    onClick={() => handleSuggestedQuestion('Create a visualization of patient outcomes')}
                  >
                    Create visualization
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start text-left text-sm"
                    onClick={() => handleSuggestedQuestion('Summarize the key findings from our research')}
                  >
                    Summarize findings
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="conversations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Conversation History</CardTitle>
              <CardDescription>
                Manage your past conversations and saved insights
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {sampleConversations.map(conversation => (
                  <div key={conversation.id} className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium">{conversation.title}</h3>
                          {conversation.isStarred && <Star className="w-4 h-4 text-yellow-500 fill-current" />}
                          {conversation.unread > 0 && (
                            <Badge variant="default" className="text-xs">{conversation.unread}</Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{conversation.lastMessage}</p>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span>{conversation.timestamp}</span>
                          <span>•</span>
                          <span>{conversation.participants.join(', ')}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Button size="sm" variant="outline">
                          <Edit className="w-3 h-3" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Share2 className="w-3 h-3" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="files" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Uploaded Files</CardTitle>
              <CardDescription>
                Files you've shared with the AI assistant for analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-red-500" />
                    <div className="flex-1">
                      <h3 className="font-medium">Clinical Trial Results.pdf</h3>
                      <p className="text-sm text-gray-600">Uploaded 2 hours ago • 2.4 MB</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button size="sm" variant="outline">
                        <Eye className="w-3 h-3" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Download className="w-3 h-3" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileSpreadsheet className="w-5 h-5 text-green-500" />
                    <div className="flex-1">
                      <h3 className="font-medium">Patient Data.xlsx</h3>
                      <p className="text-sm text-gray-600">Uploaded 1 day ago • 1.8 MB</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button size="sm" variant="outline">
                        <Eye className="w-3 h-3" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Download className="w-3 h-3" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insights" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="w-5 h-5" />
                  AI Insights
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 bg-primary/5 rounded-lg border border-primary/10">
                  <p className="text-sm text-foreground">
                    <strong>Pattern Detected:</strong> Your clinical trial data shows a consistent 
                    15% improvement in patient outcomes across all age groups. This suggests the 
                    treatment is broadly effective.
                  </p>
                </div>
                <div className="p-3 bg-accent/5 rounded-lg border border-accent/10">
                  <p className="text-sm text-foreground">
                    <strong>Recommendation:</strong> Consider expanding the study to include 
                    patients with comorbidities to validate broader applicability.
                  </p>
                </div>
                <div className="p-3 bg-orange-500/5 rounded-lg border border-orange-500/10">
                  <p className="text-sm text-foreground">
                    <strong>Alert:</strong> Three data points show significant deviations from 
                    expected values. These may indicate data collection issues or genuine outliers.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  Knowledge Base
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-medium">Recent Discoveries</h4>
                  <div className="space-y-1">
                    <div className="text-sm text-muted-foreground">• New correlation between treatment duration and outcomes</div>
                    <div className="text-sm text-muted-foreground">• Statistical significance confirmed in primary endpoints</div>
                    <div className="text-sm text-muted-foreground">• Patient satisfaction scores above industry average</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">Suggested Actions</h4>
                  <div className="space-y-1">
                    <Button size="sm" variant="outline" className="w-full justify-start">
                      <BarChart3 className="w-3 h-3 mr-2" />
                      Create outcome dashboard
                    </Button>
                    <Button size="sm" variant="outline" className="w-full justify-start">
                      <FileText className="w-3 h-3 mr-2" />
                      Generate interim report
                    </Button>
                    <Button size="sm" variant="outline" className="w-full justify-start">
                      <Search className="w-3 h-3 mr-2" />
                      Find similar studies
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download className="w-5 h-5" />
                Export & Save
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" onClick={handleExportConversation}>
                  <Download className="w-4 h-4 mr-2" />
                  Export Conversation
                </Button>
                <Button variant="outline" onClick={handleSaveAsNotebook}>
                  <BookOpen className="w-4 h-4 mr-2" />
                  Save as Notebook
                </Button>
                <Button variant="outline">
                  <FileText className="w-4 h-4 mr-2" />
                  Generate Report
                </Button>
                <Button variant="outline">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share Insights
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Chat;