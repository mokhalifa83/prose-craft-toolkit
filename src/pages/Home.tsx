import { Header } from "@/components/Layout/Header";
import { Footer } from "@/components/Layout/Footer";
import { WordCounter } from "@/components/Tools/WordCounter";
import { CaseConverter } from "@/components/Tools/CaseConverter";
import { 
  Calculator, Type, Clock, Search, Hash, BarChart3, 
  Sparkles, ArrowDownUp, Repeat, SearchX, Filter, Link2, 
  GitCompare, FileText, Key, Shuffle, User, Code, 
  Link, Radio, GraduationCap, FileCode, Tag, Heading, 
  Braces, Minimize, ShieldCheck, Code2
} from "lucide-react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const tools = [
  { id: "word-counter", name: "Word Counter", icon: Calculator, component: WordCounter, category: "Text Analysis" },
  { id: "case-converter", name: "Case Converter", icon: Type, component: CaseConverter, category: "Text Formatting" },
  { id: "character-counter", name: "Character Counter", icon: Type, category: "Text Analysis" },
  { id: "reading-time", name: "Reading Time", icon: Clock, category: "Text Analysis" },
  { id: "keyword-density", name: "Keyword Density", icon: Search, category: "Text Analysis" },
  { id: "word-frequency", name: "Word Frequency", icon: BarChart3, category: "Writing Tools" },
  { id: "text-cleaner", name: "Text Cleaner", icon: Sparkles, category: "Text Formatting" },
  { id: "line-sorter", name: "Line Sorter", icon: ArrowDownUp, category: "Text Formatting" },
  { id: "reverse-text", name: "Reverse Text", icon: Repeat, category: "Text Formatting" },
  { id: "find-replace", name: "Find & Replace", icon: SearchX, category: "Text Manipulation" },
  { id: "duplicate-remover", name: "Remove Duplicates", icon: Filter, category: "Text Manipulation" },
  { id: "text-extractor", name: "Extract Emails/URLs", icon: Link2, category: "Text Manipulation" },
  { id: "text-diff", name: "Text Compare", icon: GitCompare, category: "Text Manipulation" },
  { id: "lorem-generator", name: "Lorem Ipsum", icon: FileText, category: "Generators" },
  { id: "password-generator", name: "Password Generator", icon: Key, category: "Generators" },
  { id: "random-text", name: "Random Text", icon: Shuffle, category: "Generators" },
  { id: "username-generator", name: "Username Generator", icon: User, category: "Generators" },
  { id: "base64-encoder", name: "Base64 Encoder", icon: Code, category: "Encoders & Decoders" },
  { id: "url-encoder", name: "URL Encoder", icon: Link, category: "Encoders & Decoders" },
  { id: "html-encoder", name: "HTML Encoder", icon: Code2, category: "Encoders & Decoders" },
  { id: "morse-code", name: "Morse Code", icon: Radio, category: "Encoders & Decoders" },
  { id: "readability-score", name: "Readability Score", icon: GraduationCap, category: "Writing Tools" },
  { id: "text-summarizer", name: "Text Summarizer", icon: FileCode, category: "Writing Tools" },
  { id: "sentence-counter", name: "Sentence Counter", icon: Calculator, category: "Text Analysis" },
  { id: "meta-generator", name: "Meta Tag Generator", icon: Tag, category: "SEO Tools" },
  { id: "slug-generator", name: "Slug Generator", icon: Link, category: "SEO Tools" },
  { id: "hashtag-generator", name: "Hashtag Generator", icon: Hash, category: "SEO Tools" },
  { id: "title-analyzer", name: "Title Analyzer", icon: Heading, category: "SEO Tools" },
  { id: "json-formatter", name: "JSON Formatter", icon: Braces, category: "Developer Tools" },
  { id: "css-minifier", name: "CSS Minifier", icon: Minimize, category: "Developer Tools" },
  { id: "regex-tester", name: "Regex Tester", icon: Code, category: "Developer Tools" },
  { id: "hash-generator", name: "Hash Generator", icon: ShieldCheck, category: "Developer Tools" },
];

const categories = Array.from(new Set(tools.map(t => t.category)));

const Home = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center py-12 md:py-20 animate-fade-in-up">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
            <span className="gradient-text">TextToolbox</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Your ultimate collection of text manipulation tools. Fast, free, and privacy-focused.
          </p>
        </section>

        {/* Tool Categories */}
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => {
              const categoryTools = tools.filter(t => t.category === category);
              const CategoryIcon = categoryTools[0].icon;
              
              return (
                <div key={category} className="glass-effect border border-border rounded-2xl p-6 hover:shadow-lg transition-all hover:-translate-y-1">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center">
                      <CategoryIcon className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-lg font-bold">{category}</h2>
                  </div>
                  <div className="space-y-2">
                    {categoryTools.map((tool) => {
                      const ToolIcon = tool.icon;
                      return (
                        <a
                          key={tool.id}
                          href={`#${tool.id}`}
                          className="flex items-center gap-2 p-2 rounded-lg hover:bg-primary/10 transition-colors text-sm"
                        >
                          <ToolIcon className="w-4 h-4 text-primary" />
                          {tool.name}
                        </a>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Tool Interfaces */}
        <section className="space-y-16">
          {tools.filter(t => t.component).map((tool) => {
            const ToolComponent = tool.component;
            return (
              <div key={tool.id} className="glass-effect border border-border rounded-2xl p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <tool.icon className="w-8 h-8 text-primary" />
                  <h2 className="text-3xl font-bold">{tool.name}</h2>
                </div>
                <ToolComponent />
              </div>
            );
          })}
        </section>

        {/* About Section */}
        <section className="mt-20 mb-16 bg-secondary/50 rounded-2xl p-8 md:p-12">
          <h2 className="text-3xl font-bold mb-6">What is TextToolbox?</h2>
          <div className="prose prose-lg dark:prose-invert max-w-none space-y-6">
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
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Home;