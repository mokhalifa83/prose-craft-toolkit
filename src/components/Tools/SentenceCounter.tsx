import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { FileText } from "lucide-react";

export const SentenceCounter = () => {
  const [text, setText] = useState("");

  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const sentenceCount = sentences.length;
  const avgWordsPerSentence = sentenceCount > 0 
    ? Math.round(text.trim().split(/\s+/).length / sentenceCount) 
    : 0;
  const longestSentence = sentences.reduce((max, s) => {
    const words = s.trim().split(/\s+/).length;
    return words > max ? words : max;
  }, 0);
  const shortestSentence = sentences.length > 0 
    ? sentences.reduce((min, s) => {
        const words = s.trim().split(/\s+/).length;
        return words < min ? words : min;
      }, 999)
    : 0;

  return (
    <div id="sentence-counter" className="space-y-6 scroll-mt-20">
      <div>
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste your text to count sentences..."
          className="min-h-[200px] font-mono text-sm"
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-card rounded-xl p-4 border border-border">
          <div className="text-3xl font-bold text-primary">{sentenceCount}</div>
          <div className="text-sm text-muted-foreground mt-1">Sentences</div>
        </div>
        <div className="bg-card rounded-xl p-4 border border-border">
          <div className="text-3xl font-bold text-primary">{avgWordsPerSentence}</div>
          <div className="text-sm text-muted-foreground mt-1">Avg Words/Sentence</div>
        </div>
        <div className="bg-card rounded-xl p-4 border border-border">
          <div className="text-3xl font-bold text-primary">{longestSentence}</div>
          <div className="text-sm text-muted-foreground mt-1">Longest Sentence</div>
        </div>
        <div className="bg-card rounded-xl p-4 border border-border">
          <div className="text-3xl font-bold text-primary">{shortestSentence > 0 ? shortestSentence : 0}</div>
          <div className="text-sm text-muted-foreground mt-1">Shortest Sentence</div>
        </div>
      </div>

      <div className="bg-secondary/50 rounded-xl p-6 mt-8">
        <h2 className="text-2xl font-bold mb-4">About Sentence Counter Tool</h2>
        <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
          <p>
            The Sentence Counter analyzes your text to count sentences and provide insights about sentence length distribution. Sentence length significantly impacts readability and writing style. Varying sentence length creates rhythm and maintains reader interest, while consistently long or short sentences can make writing feel monotonous. This tool helps writers understand and improve their sentence structure patterns.
          </p>
          <p>
            Writers use sentence counters to analyze their writing style and ensure good variety. Editors use them to identify passages that need restructuring. Teachers use them to help students understand sentence construction and variation. Content creators use them to optimize readability for different audiences. Technical writers use them to ensure documentation maintains appropriate complexity levels. The tool provides objective metrics about sentence patterns that might not be obvious from casual reading.
          </p>
          <p>
            Average sentence length is a key readability indicator. Academic writing typically averages 20-25 words per sentence. Business writing aims for 15-20 words. Marketing copy and web content work best at 12-15 words. Children's books use 8-10 words on average. Longer sentences aren't bad, but too many in a row can tire readers. The longest and shortest sentence metrics help you identify extremes that might need revision.
          </p>
          <p>
            Good writing mixes sentence lengths strategically. A short, punchy sentence after several longer ones creates emphasis. A longer sentence can provide detail and context. Too many short sentences feel choppy. Too many long sentences feel dense and exhausting. Use this tool to audit your work and ensure you're maintaining good variety. The statistics help you make informed decisions about where to combine sentences or where to break them up for better flow.
          </p>
        </div>
      </div>
    </div>
  );
};
