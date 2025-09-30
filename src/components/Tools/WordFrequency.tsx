import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { BarChart3 } from "lucide-react";

export const WordFrequency = () => {
  const [text, setText] = useState("");

  const getWordFrequency = () => {
    const words = text.toLowerCase()
      .replace(/[^\w\s]/g, '')
      .split(/\s+/)
      .filter(w => w.length > 2);
    
    const frequency: { [key: string]: number } = {};
    words.forEach(word => {
      frequency[word] = (frequency[word] || 0) + 1;
    });
    
    return Object.entries(frequency)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 20);
  };

  const frequencies = getWordFrequency();

  return (
    <div id="word-frequency" className="space-y-6 scroll-mt-20">
      <div>
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste your text to analyze word frequency..."
          className="min-h-[200px] font-mono text-sm"
        />
      </div>

      {frequencies.length > 0 && (
        <div className="bg-card rounded-xl p-6 border border-border">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-primary" />
            Top 20 Most Frequent Words
          </h3>
          <div className="space-y-2">
            {frequencies.map(([word, count], index) => (
              <div key={word} className="flex items-center gap-4">
                <div className="text-sm text-muted-foreground w-8">{index + 1}.</div>
                <div className="flex-1 font-mono text-sm">{word}</div>
                <div className="text-sm font-bold text-primary">{count}</div>
                <div className="flex-1 bg-secondary rounded-full h-2 overflow-hidden">
                  <div 
                    className="bg-primary h-full rounded-full transition-all"
                    style={{ width: `${(count / frequencies[0][1]) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="bg-secondary/50 rounded-xl p-6 mt-8">
        <h2 className="text-2xl font-bold mb-4">About Word Frequency Counter</h2>
        <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
          <p>
            The Word Frequency Counter analyzes your text and shows you which words appear most often. This powerful tool helps writers identify overused words, content creators optimize keyword usage, and researchers analyze text patterns. By visualizing word frequency with both numbers and bars, you can quickly spot words you might be repeating too much or keywords you should emphasize more.
          </p>
          <p>
            Writers use this tool to improve their writing by identifying crutch words they unconsciously overuse. Everyone has favorite words and phrases they lean on too heavily. Seeing these patterns clearly helps you diversify your vocabulary and make your writing more engaging. Fiction writers use it to ensure they're not overusing character names or specific descriptions. Academic writers use it to verify they're maintaining proper focus on their research topics.
          </p>
          <p>
            SEO specialists rely on word frequency analysis to understand the topical relevance of content. If you're writing about "digital marketing" but that phrase and related terms don't appear frequently enough, search engines might not understand your page's focus. The tool helps you strike the right balance between natural writing and SEO optimization. You can quickly see if your target keywords appear enough times without being stuffed unnaturally.
          </p>
          <p>
            The tool filters out very short words (under 3 characters) to focus on meaningful content words rather than common articles and prepositions like "the," "and," "it," etc. This gives you a clearer picture of the actual content themes in your text. The visual bar chart makes it easy to spot patterns at a glance. Use this tool whenever you want to understand the composition of your text or identify opportunities to improve word choice variety.
          </p>
        </div>
      </div>
    </div>
  );
};
