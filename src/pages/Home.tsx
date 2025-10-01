import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet-async";
import { ArrowRight, Zap, Shield, CheckCircle2, Sparkles } from "lucide-react";
import { Header } from "@/components/Layout/Header";
import { Footer } from "@/components/Layout/Footer";
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
import { 
  Calculator, Type, Clock, Search, Hash, BarChart3, 
  Sparkles as SparklesIcon, ArrowDownUp, Repeat, SearchX, Filter, Link2, 
  GitCompare, FileText, Key, Shuffle, User, Code, 
  Link, Radio, GraduationCap, FileCode, Tag, Heading, 
  Braces, Minimize, ShieldCheck, Code2
} from "lucide-react";

const tools = [
  { id: "word-counter", name: "Word Counter", icon: Calculator, component: WordCounter, category: "Text Analysis", description: "Count words, characters, and sentences instantly" },
  { id: "case-converter", name: "Case Converter", icon: Type, component: CaseConverter, category: "Text Formatting", description: "Convert text between different cases" },
  { id: "character-counter", name: "Character Counter", icon: Type, component: CharacterCounter, category: "Text Analysis", description: "Track character count with and without spaces" },
  { id: "reading-time", name: "Reading Time", icon: Clock, component: ReadingTime, category: "Text Analysis", description: "Estimate reading time for your content" },
  { id: "keyword-density", name: "Keyword Density", icon: Search, component: KeywordDensity, category: "Text Analysis", description: "Analyze keyword frequency and density" },
  { id: "word-frequency", name: "Word Frequency", icon: BarChart3, component: WordFrequency, category: "Writing Tools", description: "Find most frequently used words" },
  { id: "text-cleaner", name: "Text Cleaner", icon: SparklesIcon, component: TextCleaner, category: "Text Formatting", description: "Remove extra spaces and clean text" },
  { id: "line-sorter", name: "Line Sorter", icon: ArrowDownUp, component: LineSorter, category: "Text Formatting", description: "Sort lines alphabetically or by length" },
  { id: "reverse-text", name: "Reverse Text", icon: Repeat, component: ReverseText, category: "Text Formatting", description: "Reverse text, words, or characters" },
  { id: "find-replace", name: "Find & Replace", icon: SearchX, component: FindReplace, category: "Text Manipulation", description: "Search and replace text patterns" },
  { id: "duplicate-remover", name: "Remove Duplicates", icon: Filter, component: DuplicateRemover, category: "Text Manipulation", description: "Remove duplicate lines from text" },
  { id: "text-extractor", name: "Extract Emails/URLs", icon: Link2, component: TextExtractor, category: "Text Manipulation", description: "Extract emails and URLs from text" },
  { id: "text-diff", name: "Text Compare", icon: GitCompare, component: TextDiff, category: "Text Manipulation", description: "Compare two texts side by side" },
  { id: "lorem-generator", name: "Lorem Ipsum", icon: FileText, component: LoremGenerator, category: "Generators", description: "Generate placeholder Lorem Ipsum text" },
  { id: "password-generator", name: "Password Generator", icon: Key, component: PasswordGenerator, category: "Generators", description: "Create secure random passwords" },
  { id: "random-text", name: "Random Text", icon: Shuffle, component: RandomText, category: "Generators", description: "Generate random text sequences" },
  { id: "username-generator", name: "Username Generator", icon: User, component: UsernameGenerator, category: "Generators", description: "Create unique usernames" },
  { id: "base64-encoder", name: "Base64 Encoder", icon: Code, component: Base64Encoder, category: "Encoders & Decoders", description: "Encode and decode Base64" },
  { id: "url-encoder", name: "URL Encoder", icon: Link, component: URLEncoder, category: "Encoders & Decoders", description: "Encode and decode URLs" },
  { id: "html-encoder", name: "HTML Encoder", icon: Code2, component: HTMLEncoder, category: "Encoders & Decoders", description: "Encode and decode HTML entities" },
  { id: "morse-code", name: "Morse Code", icon: Radio, component: MorseCode, category: "Encoders & Decoders", description: "Convert text to Morse code" },
  { id: "readability-score", name: "Readability Score", icon: GraduationCap, component: ReadabilityScore, category: "Writing Tools", description: "Calculate readability scores" },
  { id: "text-summarizer", name: "Text Summarizer", icon: FileCode, component: TextSummarizer, category: "Writing Tools", description: "Summarize long text content" },
  { id: "sentence-counter", name: "Sentence Counter", icon: Calculator, component: SentenceCounter, category: "Text Analysis", description: "Count sentences and paragraphs" },
  { id: "meta-generator", name: "Meta Tag Generator", icon: Tag, component: MetaGenerator, category: "SEO Tools", description: "Generate SEO meta tags" },
  { id: "slug-generator", name: "Slug Generator", icon: Link, component: SlugGenerator, category: "SEO Tools", description: "Create URL-friendly slugs" },
  { id: "hashtag-generator", name: "Hashtag Generator", icon: Hash, component: HashtagGenerator, category: "SEO Tools", description: "Generate hashtags from keywords" },
  { id: "title-analyzer", name: "Title Analyzer", icon: Heading, component: TitleAnalyzer, category: "SEO Tools", description: "Analyze and optimize titles" },
  { id: "json-formatter", name: "JSON Formatter", icon: Braces, component: JSONFormatter, category: "Developer Tools", description: "Format and validate JSON" },
  { id: "css-minifier", name: "CSS Minifier", icon: Minimize, component: CSSMinifier, category: "Developer Tools", description: "Minify CSS code" },
  { id: "regex-tester", name: "Regex Tester", icon: Code, component: RegexTester, category: "Developer Tools", description: "Test regular expressions" },
  { id: "hash-generator", name: "Hash Generator", icon: ShieldCheck, component: HashGenerator, category: "Developer Tools", description: "Generate cryptographic hashes" },
];

const categories = ["All", ...Array.from(new Set(tools.map(t => t.category)))];

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeTool, setActiveTool] = useState<string | null>(null);

  const filteredTools = selectedCategory === "All" 
    ? tools 
    : tools.filter(t => t.category === selectedCategory);

  return (
    <>
      <Helmet>
        <title>TextToolbox - 30+ Free Online Text Manipulation Tools | Word Counter, Case Converter & More</title>
        <meta
          name="description"
          content="Free online text tools including word counter, character counter, case converter, and 30+ other text manipulation tools. Privacy-focused, fast, no registration required."
        />
        <meta
          name="keywords"
          content="text tools, word counter, character counter, case converter, text manipulation, online tools, free text tools, lorem ipsum generator, password generator"
        />
        <meta name="author" content="Mohamed Khalifa" />
        <link rel="canonical" href="https://texttoolbox.com/" />

        {/* Open Graph */}
        <meta property="og:title" content="TextToolbox - Free Online Text Tools" />
        <meta
          property="og:description"
          content="30+ free text manipulation tools for writers, developers, and content creators"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://texttoolbox.com/" />

        {/* Schema Markup */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "TextToolbox",
            description: "Free online text manipulation and analysis tools",
            url: "https://texttoolbox.com/",
            applicationCategory: "UtilitiesApplication",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
            creator: {
              "@type": "Person",
              name: "Mohamed Khalifa",
            },
          })}
        </script>
      </Helmet>

      <div className="min-h-screen">
        <Header />

        {/* Hero Section */}
        <section className="relative pt-32 pb-20 overflow-hidden mesh-gradient">
          <div className="absolute inset-0 bg-grid-pattern opacity-5" />
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
              <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                Your Complete{" "}
                <span className="gradient-text">Text Manipulation</span> Suite
              </h1>
              
              <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
                30+ Free Online Tools - No Sign Up Required
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                <Button size="lg" className="rounded-full px-8 group" onClick={() => document.getElementById('tools')?.scrollIntoView({ behavior: 'smooth' })}>
                  Explore Tools
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button size="lg" variant="outline" className="rounded-full px-8">
                  View Documentation
                </Button>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap items-center justify-center gap-8 pt-8">
                <div className="flex items-center gap-2 glass-card">
                  <Shield className="w-5 h-5 text-primary" />
                  <span className="text-sm font-medium">Privacy First</span>
                </div>
                <div className="flex items-center gap-2 glass-card">
                  <Zap className="w-5 h-5 text-primary" />
                  <span className="text-sm font-medium">Lightning Fast</span>
                </div>
                <div className="flex items-center gap-2 glass-card">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  <span className="text-sm font-medium">100% Free</span>
                </div>
              </div>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute top-1/4 left-0 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        </section>

        {/* Features Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="glass-card hover-lift text-center space-y-4">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center">
                  <Shield className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Privacy First</h3>
                <p className="text-muted-foreground">
                  All processing happens locally in your browser. Your data never touches our servers.
                </p>
              </div>

              <div className="glass-card hover-lift text-center space-y-4">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center">
                  <Zap className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Lightning Fast</h3>
                <p className="text-muted-foreground">
                  Instant results powered by optimized algorithms. No waiting, no loading screens.
                </p>
              </div>

              <div className="glass-card hover-lift text-center space-y-4">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center">
                  <Sparkles className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">No Sign-Up Required</h3>
                <p className="text-muted-foreground">
                  Jump straight into using any tool. No accounts, no email verification, no hassle.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Tools Section */}
        <section id="tools" className="py-20 px-4 scroll-mt-20">
          <div className="container mx-auto">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-4xl md:text-5xl font-bold">
                Explore Our <span className="gradient-text">Tools</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Professional-grade text tools for every need - all free, fast, and privacy-focused
              </p>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-3 justify-center mb-12">
              {categories.map((cat) => (
                <Button
                  key={cat}
                  variant={selectedCategory === cat ? "default" : "outline"}
                  onClick={() => setSelectedCategory(cat)}
                  className="rounded-full px-6 transition-all duration-300"
                  size="lg"
                >
                  {cat}
                </Button>
              ))}
            </div>

            {/* Tools Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              {filteredTools.map((tool) => {
                const Icon = tool.icon;
                return (
                  <div
                    key={tool.id}
                    className="glass-card hover-lift cursor-pointer group"
                    onClick={() => setActiveTool(tool.id)}
                  >
                    <div className="flex items-start gap-4">
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-xl blur-lg opacity-0 group-hover:opacity-50 transition-opacity" />
                        <div className="relative p-3 rounded-xl bg-primary/10 text-primary group-hover:scale-110 transition-transform">
                          <Icon className="w-6 h-6" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-lg mb-2 group-hover:gradient-text transition-all">
                          {tool.name}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">{tool.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Active Tool Display */}
            {activeTool && (
              <div className="mb-16 glass-card animate-fade-in">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    {(() => {
                      const tool = tools.find(t => t.id === activeTool);
                      const Icon = tool?.icon;
                      return Icon ? <Icon className="w-8 h-8 text-primary" /> : null;
                    })()}
                    <h2 className="text-3xl font-bold gradient-text">
                      {tools.find(t => t.id === activeTool)?.name}
                    </h2>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => setActiveTool(null)}>
                    ×
                  </Button>
                </div>
                {(() => {
                  const tool = tools.find(t => t.id === activeTool);
                  const ToolComponent = tool?.component;
                  return ToolComponent ? <ToolComponent /> : null;
                })()}
              </div>
            )}
          </div>
        </section>

        {/* About Section */}
        <section className="py-20 px-4 animated-gradient">
          <div className="container mx-auto max-w-4xl">
            <div className="glass-card">
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
                About <span className="gradient-text">TextToolbox</span>
              </h2>
              <div className="prose prose-lg dark:prose-invert max-w-none space-y-6 text-muted-foreground">
                <p>
                  TextToolbox is your comprehensive, privacy-focused suite of text manipulation tools, all running directly in your browser. We've built 30+ powerful tools that handle everything from basic word counting to advanced text analysis, all without ever sending your data to a server. Your text stays on your device, ensuring complete privacy and security.
                </p>
                <p>
                  Unlike traditional web tools that process data on remote servers, TextToolbox uses client-side JavaScript to perform all operations locally. This means faster processing, no data breaches, complete privacy, and the ability to work offline once the page is loaded. No registration required, no tracking cookies, no data collection - just pure functionality when you need it.
                </p>
                
                <h3 className="text-2xl font-bold mt-8 mb-4">Who Uses These Tools?</h3>
                <p>
                  Our tools serve a diverse community of professionals and students. Writers use our word counter and readability scores to craft better content. Students rely on our character counter to meet essay requirements. Content creators use our SEO tools to optimize meta tags and hashtags. Developers depend on our JSON formatter and regex tester for daily coding tasks. Social media managers leverage our case converter and hashtag generator for engaging posts.
                </p>
                <p>
                  From bloggers tracking their daily word count to marketers analyzing keyword density for SEO, from programmers formatting JSON data to students checking if their thesis meets the word limit - TextToolbox has become the go-to resource for anyone working with text.
                </p>
                
                <h3 className="text-2xl font-bold mt-8 mb-4">Why Choose TextToolbox?</h3>
                <p>
                  We built TextToolbox with three core principles: privacy, speed, and simplicity. Everything runs in your browser, so your sensitive data never leaves your device. There's no waiting for server responses or worrying about data breaches. The tools load instantly and work offline. No sign-up forms, no payment walls, no ads cluttering your workspace - just clean, focused tools that do exactly what you need.
                </p>
                <p>
                  Our interface is intuitive enough for beginners but powerful enough for professionals. Each tool is designed to solve real problems we've encountered in our own work. We've eliminated unnecessary features and focused on delivering exactly what you need, with results that are accurate, fast, and reliable.
                </p>
                
                <h3 className="text-2xl font-bold mt-8 mb-4">How It Works</h3>
                <p>
                  Every tool on TextToolbox uses client-side JavaScript, meaning all processing happens directly in your browser. When you paste text into our word counter, your browser counts the words - not our servers. When you convert case or encode Base64, the transformation happens on your device. This architectural choice means your data never travels across the internet, eliminating privacy concerns entirely.
                </p>
                <p>
                  The tools work even when you're offline. Once the page loads, you can disconnect from the internet and continue using every feature. This makes TextToolbox perfect for working on sensitive documents, using in locations with poor internet connectivity, or simply when you want complete control over your data. Your browser does all the work, we just provide the tools.
                </p>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default Home;
