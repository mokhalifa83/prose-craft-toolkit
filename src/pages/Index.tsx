import { useState, useEffect } from "react";
import { 
  FileText, 
  Type, 
  Clock, 
  Hash, 
  BarChart3, 
  FileDigit,
  Sparkles,
  ListOrdered,
  ArrowDownUp,
  Shuffle,
  Search,
  Copy,
  FileCode,
  Key,
  Dices,
  UserCircle,
  TagIcon,
  Lock,
  Link2,
  Code2,
  Radio,
  Fingerprint,
  Globe,
  Heading,
  Target,
  FileJson,
  Minimize2,
  TestTube,
  FileSearch,
  GitCompare,
  BookOpen
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { WordCounter } from "@/components/Tools/WordCounter";
import { CaseConverter } from "@/components/Tools/CaseConverter";
import { CharacterCounter } from "@/components/Tools/CharacterCounter";
import { ReadingTime } from "@/components/Tools/ReadingTime";
import { KeywordDensity } from "@/components/Tools/KeywordDensity";
import { WordFrequency } from "@/components/Tools/WordFrequency";
import { TextCleaner } from "@/components/Tools/TextCleaner";
import { LineSorter } from "@/components/Tools/LineSorter";
import { ReverseText } from "@/components/Tools/ReverseText";
import { FindReplace } from "@/components/Tools/FindReplace";
import { DuplicateRemover } from "@/components/Tools/DuplicateRemover";
import { TextExtractor } from "@/components/Tools/TextExtractor";
import { TextDiff } from "@/components/Tools/TextDiff";
import { LoremGenerator } from "@/components/Tools/LoremGenerator";
import { PasswordGenerator } from "@/components/Tools/PasswordGenerator";
import { RandomText } from "@/components/Tools/RandomText";
import { UsernameGenerator } from "@/components/Tools/UsernameGenerator";
import { Base64Encoder } from "@/components/Tools/Base64Encoder";
import { URLEncoder } from "@/components/Tools/URLEncoder";
import { HTMLEncoder } from "@/components/Tools/HTMLEncoder";
import { MorseCode } from "@/components/Tools/MorseCode";
import { ReadabilityScore } from "@/components/Tools/ReadabilityScore";
import { TextSummarizer } from "@/components/Tools/TextSummarizer";
import { SentenceCounter } from "@/components/Tools/SentenceCounter";
import { MetaGenerator } from "@/components/Tools/MetaGenerator";
import { SlugGenerator } from "@/components/Tools/SlugGenerator";
import { HashtagGenerator } from "@/components/Tools/HashtagGenerator";
import { TitleAnalyzer } from "@/components/Tools/TitleAnalyzer";
import { JSONFormatter } from "@/components/Tools/JSONFormatter";
import { CSSMinifier } from "@/components/Tools/CSSMinifier";
import { RegexTester } from "@/components/Tools/RegexTester";
import { HashGenerator } from "@/components/Tools/HashGenerator";

const Index = () => {
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Listen for tool opening events from header
  useEffect(() => {
    const handleOpenTool = (event: CustomEvent) => {
      setSelectedTool(event.detail.toolId);
      // Scroll to tools section
      setTimeout(() => {
        document.getElementById('tools-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    };

    window.addEventListener('openTool' as any, handleOpenTool);
    
    // Check URL for tool parameter
    const urlParams = new URLSearchParams(window.location.search);
    const toolParam = urlParams.get('tool');
    if (toolParam) {
      setSelectedTool(toolParam);
    }

    return () => {
      window.removeEventListener('openTool' as any, handleOpenTool);
    };
  }, []);

  const tools = [
    { id: "word-counter", name: "Word Counter", icon: FileText, category: "Text Analysis", description: "Count words, characters, and sentences", component: WordCounter },
    { id: "case-converter", name: "Case Converter", icon: Type, category: "Text Formatting", description: "Convert text case (upper, lower, title)", component: CaseConverter },
    { id: "character-counter", name: "Character Counter", icon: Hash, category: "Text Analysis", description: "Count characters with and without spaces", component: CharacterCounter },
    { id: "reading-time", name: "Reading Time", icon: Clock, category: "Text Analysis", description: "Estimate reading time for your text", component: ReadingTime },
    { id: "keyword-density", name: "Keyword Density", icon: BarChart3, category: "Text Analysis", description: "Analyze keyword frequency and density", component: KeywordDensity },
    { id: "word-frequency", name: "Word Frequency", icon: FileDigit, category: "Text Analysis", description: "Find most common words in text", component: WordFrequency },
    { id: "text-cleaner", name: "Text Cleaner", icon: Sparkles, category: "Text Formatting", description: "Remove extra spaces and special characters", component: TextCleaner },
    { id: "line-sorter", name: "Line Sorter", icon: ListOrdered, category: "Text Formatting", description: "Sort lines alphabetically or numerically", component: LineSorter },
    { id: "reverse-text", name: "Reverse Text", icon: ArrowDownUp, category: "Text Formatting", description: "Reverse your text or flip it", component: ReverseText },
    { id: "find-replace", name: "Find & Replace", icon: Search, category: "Text Formatting", description: "Find and replace text patterns", component: FindReplace },
    { id: "duplicate-remover", name: "Duplicate Remover", icon: Copy, category: "Text Formatting", description: "Remove duplicate lines from text", component: DuplicateRemover },
    { id: "text-extractor", name: "Text Extractor", icon: FileSearch, category: "Developer Tools", description: "Extract text from HTML or code", component: TextExtractor },
    { id: "text-diff", name: "Text Diff", icon: GitCompare, category: "Developer Tools", description: "Compare two texts and see differences", component: TextDiff },
    { id: "lorem-generator", name: "Lorem Ipsum", icon: FileCode, category: "Generators", description: "Generate lorem ipsum placeholder text", component: LoremGenerator },
    { id: "password-generator", name: "Password Generator", icon: Key, category: "Generators", description: "Generate secure random passwords", component: PasswordGenerator },
    { id: "random-text", name: "Random Text", icon: Dices, category: "Generators", description: "Generate random text and strings", component: RandomText },
    { id: "username-generator", name: "Username Generator", icon: UserCircle, category: "Generators", description: "Create unique usernames", component: UsernameGenerator },
    { id: "base64-encoder", name: "Base64 Encoder", icon: Lock, category: "Encoders & Decoders", description: "Encode/decode Base64 strings", component: Base64Encoder },
    { id: "url-encoder", name: "URL Encoder", icon: Link2, category: "Encoders & Decoders", description: "Encode/decode URL strings", component: URLEncoder },
    { id: "html-encoder", name: "HTML Encoder", icon: Code2, category: "Encoders & Decoders", description: "Encode/decode HTML entities", component: HTMLEncoder },
    { id: "morse-code", name: "Morse Code", icon: Radio, category: "Encoders & Decoders", description: "Convert text to Morse code", component: MorseCode },
    { id: "readability-score", name: "Readability Score", icon: Target, category: "SEO Tools", description: "Check text readability level", component: ReadabilityScore },
    { id: "text-summarizer", name: "Text Summarizer", icon: BookOpen, category: "SEO Tools", description: "Summarize long text content", component: TextSummarizer },
    { id: "sentence-counter", name: "Sentence Counter", icon: FileDigit, category: "Text Analysis", description: "Count sentences in your text", component: SentenceCounter },
    { id: "meta-generator", name: "Meta Generator", icon: Globe, category: "SEO Tools", description: "Generate SEO meta tags", component: MetaGenerator },
    { id: "slug-generator", name: "Slug Generator", icon: Link2, category: "SEO Tools", description: "Create URL-friendly slugs", component: SlugGenerator },
    { id: "hashtag-generator", name: "Hashtag Generator", icon: TagIcon, category: "Generators", description: "Generate hashtags for social media", component: HashtagGenerator },
    { id: "title-analyzer", name: "Title Analyzer", icon: Heading, category: "SEO Tools", description: "Analyze and optimize page titles", component: TitleAnalyzer },
    { id: "json-formatter", name: "JSON Formatter", icon: FileJson, category: "Developer Tools", description: "Format and validate JSON", component: JSONFormatter },
    { id: "css-minifier", name: "CSS Minifier", icon: Minimize2, category: "Developer Tools", description: "Minify and compress CSS code", component: CSSMinifier },
    { id: "regex-tester", name: "Regex Tester", icon: TestTube, category: "Developer Tools", description: "Test regular expressions", component: RegexTester },
    { id: "hash-generator", name: "Hash Generator", icon: Fingerprint, category: "Encoders & Decoders", description: "Generate MD5, SHA-1, SHA-256 hashes", component: HashGenerator },
  ];

  const categories = ["all", "Text Analysis", "Text Formatting", "Generators", "Encoders & Decoders", "SEO Tools", "Developer Tools"];

  const filteredTools = tools.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         tool.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || tool.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const ToolComponent = selectedTool ? tools.find(t => t.id === selectedTool)?.component : null;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
        <div className="container mx-auto relative z-10">
          <div className="text-center space-y-6 max-w-4xl mx-auto animate-fade-in-up">
            <div className="inline-block">
              <span className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20">
                🚀 32+ Professional Tools
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              Transform Your Text with{" "}
              <span className="gradient-text">Next-Gen Tools</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Professional text manipulation, analysis, and generation tools. Lightning-fast, 
              privacy-focused, and completely free. No sign-up required.
            </p>
            <div className="flex flex-wrap gap-4 justify-center pt-4">
              <Button 
                size="lg" 
                onClick={() => document.getElementById('tools-section')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg rounded-xl"
              >
                Explore Tools
              </Button>
              <Button size="lg" variant="outline" className="px-8 py-6 text-lg rounded-xl border-2">
                View Documentation
              </Button>
            </div>
            <div className="flex flex-wrap gap-8 justify-center pt-8 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary animate-glow" />
                <span className="text-muted-foreground">Privacy First</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary animate-glow" />
                <span className="text-muted-foreground">100% Free Forever</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary animate-glow" />
                <span className="text-muted-foreground">No Data Collection</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-4 bg-card/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground text-lg">
              Get started in three simple steps
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center text-primary text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold">Choose Your Tool</h3>
              <p className="text-muted-foreground">
                Browse our collection of 32+ text tools organized by category. Find exactly what you need with our search function.
              </p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center text-primary text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold">Input Your Text</h3>
              <p className="text-muted-foreground">
                Paste or type your text directly into the tool. All processing happens instantly in your browser.
              </p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center text-primary text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold">Get Results</h3>
              <p className="text-muted-foreground">
                Copy, download, or share your results. No sign-up required, no data stored on our servers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section id="tools-section" className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Explore All Tools</h2>
            <p className="text-muted-foreground text-lg">
              Click on any tool to get started instantly
            </p>
          </div>
          
          <div className="mb-12 space-y-6">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative flex-1 max-w-md mx-auto md:mx-0">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  placeholder="Search tools..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12 rounded-xl bg-card border-border"
                />
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                  className="rounded-full"
                >
                  {category === "all" ? "All Tools" : category}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredTools.map((tool, index) => (
              <Card
                key={tool.id}
                className="glass-card hover-lift cursor-pointer p-6 space-y-4 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.05}s` }}
                onClick={() => setSelectedTool(tool.id)}
              >
                <div className="flex items-start justify-between">
                  <div className="p-3 rounded-xl bg-primary/10 text-primary">
                    <tool.icon className="w-6 h-6" />
                  </div>
                  <span className="text-xs px-2 py-1 rounded-full bg-accent/10 text-accent">
                    {tool.category}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">{tool.name}</h3>
                  <p className="text-sm text-muted-foreground">{tool.description}</p>
                </div>
                <Button className="w-full rounded-lg" variant="secondary">
                  Use Tool
                </Button>
              </Card>
            ))}
          </div>

          {selectedTool && ToolComponent && (
            <div 
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedTool(null)}
            >
              <div 
                className="glass-card rounded-2xl p-6 max-w-5xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-2xl font-bold gradient-text">
                      {tools.find(t => t.id === selectedTool)?.name}
                    </h2>
                    <p className="text-muted-foreground text-sm mt-1">
                      {tools.find(t => t.id === selectedTool)?.description}
                    </p>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => setSelectedTool(null)}
                    className="rounded-xl hover:bg-destructive/10 hover:text-destructive"
                  >
                    ✕
                  </Button>
                </div>
                <ToolComponent />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-card/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Why Choose TextToolbox?</h2>
            <p className="text-muted-foreground text-lg">
              Professional-grade tools trusted by thousands of users
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="glass-card p-6 space-y-3">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Lock className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold">100% Private</h3>
              <p className="text-sm text-muted-foreground">
                All processing happens in your browser. Your data never leaves your device.
              </p>
            </div>
            
            <div className="glass-card p-6 space-y-3">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold">Lightning Fast</h3>
              <p className="text-sm text-muted-foreground">
                Instant results with optimized algorithms. No waiting or loading screens.
              </p>
            </div>
            
            <div className="glass-card p-6 space-y-3">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Target className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold">No Sign-Up</h3>
              <p className="text-sm text-muted-foreground">
                Start using tools immediately. No accounts or email verification needed.
              </p>
            </div>
            
            <div className="glass-card p-6 space-y-3">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Globe className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold">Always Free</h3>
              <p className="text-sm text-muted-foreground">
                All tools are 100% free forever. No hidden costs or premium tiers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Perfect For Everyone</h2>
            <p className="text-muted-foreground text-lg">
              Trusted by professionals across various industries
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="glass-card p-8 space-y-4 hover-lift">
              <div className="text-4xl">✍️</div>
              <h3 className="text-xl font-semibold">Writers & Authors</h3>
              <p className="text-muted-foreground">
                Track word counts, analyze readability, and optimize your content for better engagement.
              </p>
            </div>
            
            <div className="glass-card p-8 space-y-4 hover-lift">
              <div className="text-4xl">🎓</div>
              <h3 className="text-xl font-semibold">Students</h3>
              <p className="text-muted-foreground">
                Meet essay requirements, check character limits, and improve your writing quality.
              </p>
            </div>
            
            <div className="glass-card p-8 space-y-4 hover-lift">
              <div className="text-4xl">💼</div>
              <h3 className="text-xl font-semibold">Content Creators</h3>
              <p className="text-muted-foreground">
                Optimize content length, generate meta tags, and create SEO-friendly slugs.
              </p>
            </div>
            
            <div className="glass-card p-8 space-y-4 hover-lift">
              <div className="text-4xl">👨‍💻</div>
              <h3 className="text-xl font-semibold">Developers</h3>
              <p className="text-muted-foreground">
                Format JSON, minify CSS, test regex patterns, and encode/decode text.
              </p>
            </div>
            
            <div className="glass-card p-8 space-y-4 hover-lift">
              <div className="text-4xl">📱</div>
              <h3 className="text-xl font-semibold">Social Media Managers</h3>
              <p className="text-muted-foreground">
                Generate hashtags, check character limits, and create engaging captions.
              </p>
            </div>
            
            <div className="glass-card p-8 space-y-4 hover-lift">
              <div className="text-4xl">🎯</div>
              <h3 className="text-xl font-semibold">SEO Professionals</h3>
              <p className="text-muted-foreground">
                Analyze keyword density, generate meta descriptions, and optimize titles.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Index;
