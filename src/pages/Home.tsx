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
  Sparkles, ArrowDownUp, Repeat, SearchX, Filter, Link2, 
  GitCompare, FileText, Key, Shuffle, User, Code, 
  Link, Radio, GraduationCap, FileCode, Tag, Heading, 
  Braces, Minimize, ShieldCheck, Code2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const tools = [
  { id: "word-counter", name: "Word Counter", icon: Calculator, component: WordCounter, category: "Text Analysis" },
  { id: "case-converter", name: "Case Converter", icon: Type, component: CaseConverter, category: "Text Formatting" },
  { id: "character-counter", name: "Character Counter", icon: Type, component: CharacterCounter, category: "Text Analysis" },
  { id: "reading-time", name: "Reading Time", icon: Clock, component: ReadingTime, category: "Text Analysis" },
  { id: "keyword-density", name: "Keyword Density", icon: Search, component: KeywordDensity, category: "Text Analysis" },
  { id: "word-frequency", name: "Word Frequency", icon: BarChart3, component: WordFrequency, category: "Writing Tools" },
  { id: "text-cleaner", name: "Text Cleaner", icon: Sparkles, component: TextCleaner, category: "Text Formatting" },
  { id: "line-sorter", name: "Line Sorter", icon: ArrowDownUp, component: LineSorter, category: "Text Formatting" },
  { id: "reverse-text", name: "Reverse Text", icon: Repeat, component: ReverseText, category: "Text Formatting" },
  { id: "find-replace", name: "Find & Replace", icon: SearchX, component: FindReplace, category: "Text Manipulation" },
  { id: "duplicate-remover", name: "Remove Duplicates", icon: Filter, component: DuplicateRemover, category: "Text Manipulation" },
  { id: "text-extractor", name: "Extract Emails/URLs", icon: Link2, component: TextExtractor, category: "Text Manipulation" },
  { id: "text-diff", name: "Text Compare", icon: GitCompare, component: TextDiff, category: "Text Manipulation" },
  { id: "lorem-generator", name: "Lorem Ipsum", icon: FileText, component: LoremGenerator, category: "Generators" },
  { id: "password-generator", name: "Password Generator", icon: Key, component: PasswordGenerator, category: "Generators" },
  { id: "random-text", name: "Random Text", icon: Shuffle, component: RandomText, category: "Generators" },
  { id: "username-generator", name: "Username Generator", icon: User, component: UsernameGenerator, category: "Generators" },
  { id: "base64-encoder", name: "Base64 Encoder", icon: Code, component: Base64Encoder, category: "Encoders & Decoders" },
  { id: "url-encoder", name: "URL Encoder", icon: Link, component: URLEncoder, category: "Encoders & Decoders" },
  { id: "html-encoder", name: "HTML Encoder", icon: Code2, component: HTMLEncoder, category: "Encoders & Decoders" },
  { id: "morse-code", name: "Morse Code", icon: Radio, component: MorseCode, category: "Encoders & Decoders" },
  { id: "readability-score", name: "Readability Score", icon: GraduationCap, component: ReadabilityScore, category: "Writing Tools" },
  { id: "text-summarizer", name: "Text Summarizer", icon: FileCode, component: TextSummarizer, category: "Writing Tools" },
  { id: "sentence-counter", name: "Sentence Counter", icon: Calculator, component: SentenceCounter, category: "Text Analysis" },
  { id: "meta-generator", name: "Meta Tag Generator", icon: Tag, component: MetaGenerator, category: "SEO Tools" },
  { id: "slug-generator", name: "Slug Generator", icon: Link, component: SlugGenerator, category: "SEO Tools" },
  { id: "hashtag-generator", name: "Hashtag Generator", icon: Hash, component: HashtagGenerator, category: "SEO Tools" },
  { id: "title-analyzer", name: "Title Analyzer", icon: Heading, component: TitleAnalyzer, category: "SEO Tools" },
  { id: "json-formatter", name: "JSON Formatter", icon: Braces, component: JSONFormatter, category: "Developer Tools" },
  { id: "css-minifier", name: "CSS Minifier", icon: Minimize, component: CSSMinifier, category: "Developer Tools" },
  { id: "regex-tester", name: "Regex Tester", icon: Code, component: RegexTester, category: "Developer Tools" },
  { id: "hash-generator", name: "Hash Generator", icon: ShieldCheck, component: HashGenerator, category: "Developer Tools" },
];

const categories = Array.from(new Set(tools.map(t => t.category)));

const Home = () => {
  const location = useLocation();
  const [selectedTool, setSelectedTool] = useState<string | null>(null);

  // Open via header dropdown or URL ?tool= (on mount)
  useEffect(() => {
    const handleOpenTool = (event: CustomEvent) => {
      setSelectedTool(event.detail.toolId as string);
    };
    window.addEventListener('openTool' as any, handleOpenTool);

    const urlParams = new URLSearchParams(window.location.search);
    const toolParam = urlParams.get('tool');
    if (toolParam) setSelectedTool(toolParam);

    return () => window.removeEventListener('openTool' as any, handleOpenTool);
  }, []);

  // React to URL ?tool= changes while staying on Home
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tool = params.get('tool');
    setSelectedTool(tool);
  }, [location.search]);

  // Preserve existing hash scroll behavior for other anchors
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
                        <button
                          key={tool.id}
                          type="button"
                          onClick={() => setSelectedTool(tool.id)}
                          className="flex items-center gap-2 p-2 rounded-lg hover:bg-primary/10 transition-colors text-sm w-full text-left"
                        >
                          <ToolIcon className="w-4 h-4 text-primary" />
                          {tool.name}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Modal: render only when a tool is selected */}
        {selectedTool && (() => {
          const current = tools.find(t => t.id === selectedTool);
          if (!current) return null;
          const ToolComponent = current.component;
          return (
            <div 
              className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fade-in"
              onClick={() => setSelectedTool(null)}
            >
              <div 
                className="glass-card rounded-3xl p-8 max-w-6xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border-primary/30 animate-scale-in"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-start mb-6 pb-4 border-b border-primary/20">
                  <div className="flex items-center gap-3">
                    <current.icon className="w-7 h-7 text-primary" />
                    <h2 className="text-2xl font-bold gradient-text">{current.name}</h2>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => setSelectedTool(null)}
                    className="rounded-full hover:bg-primary/10 hover:text-primary"
                  >
                    <span className="text-2xl">✕</span>
                  </Button>
                </div>
                <div className="rounded-2xl bg-background/30 p-4 md:p-6">
                  <ToolComponent />
                </div>
              </div>
            </div>
          );
        })()}

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

        {/* FAQ Section */}
        <section className="mt-20 mb-16">
          <div className="glass-card rounded-3xl p-8 md:p-12">
            <h2 className="text-3xl font-bold mb-8 text-center gradient-text">
              Frequently Asked Questions
            </h2>
            <Accordion type="single" collapsible className="w-full space-y-4">
              {/* General Questions */}
              <AccordionItem value="what-is-texttoolbox" className="border-border bg-card/50 rounded-lg px-6">
                <AccordionTrigger className="text-lg font-semibold hover:text-primary">
                  What is TextToolbox and how does it work?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  TextToolbox is a free online platform offering 32+ professional text manipulation and analysis tools. All tools run directly in your browser using JavaScript, meaning your text never leaves your device. No installation, no registration, no data collection - just instant, secure text processing for writers, developers, SEO specialists, and content creators.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="is-free" className="border-border bg-card/50 rounded-lg px-6">
                <AccordionTrigger className="text-lg font-semibold hover:text-primary">
                  Is TextToolbox really free to use?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  Yes, absolutely! All 32+ tools on TextToolbox are completely free with no hidden costs, premium tiers, or paywalls. You can use any tool unlimited times without creating an account. We believe essential text tools should be accessible to everyone - students, professionals, and businesses alike.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="account-required" className="border-border bg-card/50 rounded-lg px-6">
                <AccordionTrigger className="text-lg font-semibold hover:text-primary">
                  Do I need to create an account to use TextToolbox?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  No account needed! All tools work instantly without registration. Simply visit TextToolbox, choose your tool, paste your text, and get results immediately. This design ensures maximum privacy and the fastest possible workflow for all users.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="data-privacy" className="border-border bg-card/50 rounded-lg px-6">
                <AccordionTrigger className="text-lg font-semibold hover:text-primary">
                  Is my text data safe and private?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  Your privacy is our priority. All text processing happens locally in your browser - your data never touches our servers. We don't store, transmit, or analyze your text. You can even use TextToolbox offline once the page loads. Perfect for handling sensitive documents, confidential content, or personal information.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="offline-use" className="border-border bg-card/50 rounded-lg px-6">
                <AccordionTrigger className="text-lg font-semibold hover:text-primary">
                  Can I use TextToolbox offline?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  Yes! Once TextToolbox loads in your browser, most tools work offline since all processing is client-side. This makes it perfect for working on planes, in areas with poor connectivity, or when handling sensitive data you don't want transmitted online.
                </AccordionContent>
              </AccordionItem>

              {/* Tool-Specific Questions */}
              <AccordionItem value="word-counter-accuracy" className="border-border bg-card/50 rounded-lg px-6">
                <AccordionTrigger className="text-lg font-semibold hover:text-primary">
                  How accurate is the word counter tool?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  Our word counter uses industry-standard algorithms that match Microsoft Word and Google Docs counting methods. It accurately counts words separated by spaces, handles hyphenated words correctly, and provides separate counts for characters with/without spaces. Ideal for meeting essay requirements, social media limits, and content writing goals.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="character-limits" className="border-border bg-card/50 rounded-lg px-6">
                <AccordionTrigger className="text-lg font-semibold hover:text-primary">
                  What are the character limits for social media platforms?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  Common social media character limits: Twitter/X (280 characters), Facebook posts (63,206 but optimal ~40-80), Instagram captions (2,200), LinkedIn posts (3,000), and meta descriptions (155-160). Use our Character Counter tool to ensure your content fits platform requirements and maximizes engagement.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="reading-time-calculation" className="border-border bg-card/50 rounded-lg px-6">
                <AccordionTrigger className="text-lg font-semibold hover:text-primary">
                  How is reading time calculated?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  Our Reading Time Calculator uses the average adult reading speed of 200-250 words per minute. This industry-standard metric helps bloggers, content marketers, and publishers display accurate read times, improving user experience and engagement. The tool accounts for text complexity and can be customized for different audiences.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="keyword-density" className="border-border bg-card/50 rounded-lg px-6">
                <AccordionTrigger className="text-lg font-semibold hover:text-primary">
                  What is a good keyword density for SEO?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  SEO experts recommend a keyword density of 1-2% for optimal search engine rankings. Our Keyword Density Checker helps you avoid keyword stuffing (which Google penalizes) while ensuring your target keywords appear enough for relevance. Use it to optimize blog posts, product descriptions, and landing pages for better Google rankings.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="readability-score" className="border-border bg-card/50 rounded-lg px-6">
                <AccordionTrigger className="text-lg font-semibold hover:text-primary">
                  How are readability scores calculated?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  Our Readability Score tool uses proven formulas like Flesch-Kincaid Grade Level and Flesch Reading Ease. These analyze sentence length, word complexity, and syllable count to determine reading difficulty. Aim for 60-70 (Plain English) for general audiences, 50-60 for technical content. Higher scores mean easier reading - crucial for accessibility and SEO.
                </AccordionContent>
              </AccordionItem>

              {/* SEO & Professional Questions */}
              <AccordionItem value="seo-benefits" className="border-border bg-card/50 rounded-lg px-6">
                <AccordionTrigger className="text-lg font-semibold hover:text-primary">
                  How can TextToolbox improve my SEO rankings?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  TextToolbox offers specialized SEO tools including Keyword Density Checker (optimize keyword usage), Meta Tag Generator (create perfect title/description tags), Slug Generator (create SEO-friendly URLs), Readability Score (improve content quality), and Title Analyzer (optimize headlines). Together, these help you create content that ranks higher on Google, Bing, and other search engines.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="meta-tags" className="border-border bg-card/50 rounded-lg px-6">
                <AccordionTrigger className="text-lg font-semibold hover:text-primary">
                  Why are meta tags important for SEO?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  Meta tags (title and description) are crucial for SEO as they appear in Google search results and affect click-through rates. Our Meta Tag Generator helps you create optimized tags with proper length (titles under 60 characters, descriptions under 160) and keyword placement. Well-crafted meta tags can dramatically improve your search visibility and organic traffic.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="password-security" className="border-border bg-card/50 rounded-lg px-6">
                <AccordionTrigger className="text-lg font-semibold hover:text-primary">
                  Are generated passwords truly secure and random?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  Yes! Our Password Generator uses cryptographically secure random number generation (CSPRNG) to create truly random passwords. You can customize length (8-128 characters) and include uppercase, lowercase, numbers, and symbols. Generated passwords are never stored or transmitted - they exist only in your browser. Perfect for creating strong, unique passwords for all your accounts.
                </AccordionContent>
              </AccordionItem>

              {/* Technical Questions */}
              <AccordionItem value="browsers-supported" className="border-border bg-card/50 rounded-lg px-6">
                <AccordionTrigger className="text-lg font-semibold hover:text-primary">
                  Which browsers support TextToolbox?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  TextToolbox works on all modern browsers: Chrome, Firefox, Safari, Edge, Opera, and Brave. We also support mobile browsers on iOS and Android. The tools are optimized for performance and work seamlessly on desktop, tablet, and smartphone devices. No plugins or extensions required - just open and use!
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="mobile-friendly" className="border-border bg-card/50 rounded-lg px-6">
                <AccordionTrigger className="text-lg font-semibold hover:text-primary">
                  Is TextToolbox mobile-friendly?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  Absolutely! TextToolbox features a fully responsive design optimized for smartphones and tablets. All 32+ tools work perfectly on mobile devices with touch-friendly interfaces. Whether you're on iPhone, Android, or tablet, you get the same powerful features and instant results. Perfect for on-the-go content creation and text editing.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="json-formatter" className="border-border bg-card/50 rounded-lg px-6">
                <AccordionTrigger className="text-lg font-semibold hover:text-primary">
                  What can I do with the JSON Formatter tool?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  Our JSON Formatter validates, formats, and beautifies JSON data with syntax highlighting. Perfect for developers debugging APIs, working with configuration files, or analyzing API responses. It detects errors, properly indents nested objects/arrays, and makes complex JSON structures readable. Essential for web developers, API testing, and data analysis.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="regex-tester" className="border-border bg-card/50 rounded-lg px-6">
                <AccordionTrigger className="text-lg font-semibold hover:text-primary">
                  How does the Regex Tester help developers?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  The Regex Tester lets developers test regular expressions in real-time with instant match highlighting and capture group display. Perfect for validating email addresses, phone numbers, URLs, or creating custom text patterns. Supports all JavaScript regex features including flags (g, i, m) and provides helpful error messages for debugging complex patterns.
                </AccordionContent>
              </AccordionItem>

              {/* Content Creation Questions */}
              <AccordionItem value="lorem-ipsum" className="border-border bg-card/50 rounded-lg px-6">
                <AccordionTrigger className="text-lg font-semibold hover:text-primary">
                  When should I use the Lorem Ipsum Generator?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  Lorem Ipsum is the industry-standard placeholder text for designers and developers. Use our generator when creating website mockups, designing layouts, testing typography, or developing content templates. Generate any amount of paragraphs, words, or sentences instantly. Essential for web designers, UI/UX professionals, and content managers.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="case-converter" className="border-border bg-card/50 rounded-lg px-6">
                <AccordionTrigger className="text-lg font-semibold hover:text-primary">
                  What text case formats does the Case Converter support?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  Our Case Converter supports all major formats: UPPERCASE, lowercase, Title Case, Sentence case, aLtErNaTiNg cAsE, and camelCase. Perfect for formatting headings, fixing ALL CAPS text, preparing code variables, or creating consistent document formatting. Save time and ensure professional-looking content across all your writing projects.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="text-summarizer" className="border-border bg-card/50 rounded-lg px-6">
                <AccordionTrigger className="text-lg font-semibold hover:text-primary">
                  How does the Text Summarizer work?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  Our Text Summarizer uses advanced algorithms to identify key sentences and important information in your text, creating concise summaries while preserving core meaning. Ideal for summarizing articles, research papers, long emails, or reports. Perfect for students, researchers, journalists, and busy professionals who need to extract main points quickly.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="duplicate-remover" className="border-border bg-card/50 rounded-lg px-6">
                <AccordionTrigger className="text-lg font-semibold hover:text-primary">
                  What does the Remove Duplicates tool do?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  The Duplicate Remover instantly finds and eliminates duplicate lines from any text. Perfect for cleaning up email lists, removing duplicate URLs, organizing data sets, or preparing unique content. It preserves the original order and offers case-sensitive/insensitive options. Essential for data cleaning, list management, and content organization.
                </AccordionContent>
              </AccordionItem>

              {/* Business & Professional Use */}
              <AccordionItem value="business-use" className="border-border bg-card/50 rounded-lg px-6">
                <AccordionTrigger className="text-lg font-semibold hover:text-primary">
                  Can I use TextToolbox for commercial projects?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  Yes! TextToolbox is completely free for personal and commercial use. Use our tools for client work, business content, marketing campaigns, product descriptions, technical documentation, or any professional project. No attribution required, no licensing fees, unlimited usage. Perfect for agencies, freelancers, and enterprise teams.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="team-use" className="border-border bg-card/50 rounded-lg px-6">
                <AccordionTrigger className="text-lg font-semibold hover:text-primary">
                  Can my team use TextToolbox?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  Absolutely! TextToolbox is perfect for teams of any size. Share the link with colleagues, bookmark specific tools for quick access, or integrate it into your workflow. Since everything runs in the browser, there's no installation or IT setup required. Ideal for content teams, development departments, marketing agencies, and educational institutions.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="api-available" className="border-border bg-card/50 rounded-lg px-6">
                <AccordionTrigger className="text-lg font-semibold hover:text-primary">
                  Do you offer an API for TextToolbox tools?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  Currently, TextToolbox is a web-based platform optimized for browser use. While we don't offer a public API yet, all tools are built with modern JavaScript and run efficiently in any browser. For automated workflows, consider using browser automation tools or contact us to discuss custom integration solutions for enterprise needs.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="updates-frequency" className="border-border bg-card/50 rounded-lg px-6">
                <AccordionTrigger className="text-lg font-semibold hover:text-primary">
                  How often is TextToolbox updated?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  We continuously improve TextToolbox with new features, tool additions, and performance enhancements. Updates are deployed automatically - you always use the latest version without any downloads or installations. Follow our blog or social media for announcements about new tools, features, and improvements based on user feedback.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Home;