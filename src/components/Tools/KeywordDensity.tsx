import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export const KeywordDensity = () => {
  const [text, setText] = useState("");
  const [keyword, setKeyword] = useState("");

  const words = text.toLowerCase().split(/\s+/).filter(w => w.length > 0);
  const totalWords = words.length;
  const keywordCount = keyword ? words.filter(w => w.includes(keyword.toLowerCase())).length : 0;
  const density = totalWords > 0 && keyword ? ((keywordCount / totalWords) * 100).toFixed(2) : "0.00";

  return (
    <div id="keyword-density" className="space-y-6 scroll-mt-20">
      <div className="space-y-4">
        <Input
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Enter keyword to analyze..."
          className="font-mono"
        />
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste your content here..."
          className="min-h-[200px] font-mono text-sm"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card rounded-xl p-6 border border-border">
          <div className="text-3xl font-bold text-primary">{keywordCount}</div>
          <div className="text-sm text-muted-foreground mt-1">Keyword Occurrences</div>
        </div>
        <div className="bg-card rounded-xl p-6 border border-border">
          <div className="text-3xl font-bold text-primary">{density}%</div>
          <div className="text-sm text-muted-foreground mt-1">Keyword Density</div>
        </div>
        <div className="bg-card rounded-xl p-6 border border-border">
          <div className="text-3xl font-bold text-primary">{totalWords}</div>
          <div className="text-sm text-muted-foreground mt-1">Total Words</div>
        </div>
      </div>

      <div className="bg-secondary/50 rounded-xl p-6 mt-8">
        <h2 className="text-2xl font-bold mb-4">About Keyword Density Checker</h2>
        <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
          <p>
            Keyword Density is the percentage of times a keyword appears in your content compared to the total word count. In SEO, keyword density helps search engines understand what your page is about. However, there's a delicate balance: too low and search engines might not recognize your topic; too high and you risk keyword stuffing penalties that can hurt your rankings.
          </p>
          <p>
            Most SEO experts recommend a keyword density between 1-3% for optimal results. This means your target keyword should appear 1-3 times for every 100 words. Google's algorithms have become sophisticated enough to understand context and semantics, so natural writing that happens to hit this range performs better than forced keyword insertion. The goal is to write for humans first while keeping search engines in mind.
          </p>
          <p>
            SEO professionals use keyword density checkers to optimize blog posts, landing pages, and product descriptions for search engines. Content writers use it to ensure they're mentioning their target keywords enough without overdoing it. Digital marketers use it when optimizing existing content to improve search rankings. The tool is particularly valuable when you're targeting competitive keywords where every optimization point matters.
          </p>
          <p>
            Modern SEO goes beyond exact keyword matches. Search engines now understand synonyms, related terms, and semantic variations. While you're checking your main keyword density, remember to also use related terms and natural variations. For example, if your keyword is "digital marketing," you should also naturally include terms like "online marketing," "digital advertising," and "internet marketing" throughout your content.
          </p>
        </div>
      </div>
    </div>
  );
};
