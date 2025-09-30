import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { FileCode, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const TextSummarizer = () => {
  const [text, setText] = useState("");
  const [sentences, setSentences] = useState(3);
  const [summary, setSummary] = useState("");
  const { toast } = useToast();

  const summarize = () => {
    const allSentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    
    if (allSentences.length === 0) {
      toast({ description: "Please enter text to summarize", variant: "destructive" });
      return;
    }

    // Simple extractive summarization: take first, middle, and last sentences
    const count = Math.min(sentences, allSentences.length);
    const step = Math.floor(allSentences.length / count);
    const selected = [];
    
    for (let i = 0; i < count; i++) {
      const index = Math.min(i * step, allSentences.length - 1);
      selected.push(allSentences[index].trim());
    }
    
    setSummary(selected.join('. ') + '.');
  };

  const copySummary = () => {
    navigator.clipboard.writeText(summary);
    toast({ description: "Summary copied!" });
  };

  return (
    <div id="text-summarizer" className="space-y-6 scroll-mt-20">
      <div>
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste long text to summarize..."
          className="min-h-[200px] font-mono text-sm"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          type="number"
          min="1"
          max="10"
          value={sentences}
          onChange={(e) => setSentences(parseInt(e.target.value) || 3)}
          placeholder="Number of sentences"
        />
        <Button onClick={summarize} variant="default">
          <FileCode className="w-4 h-4 mr-2" />
          Summarize
        </Button>
      </div>

      {summary && (
        <div className="bg-card rounded-xl p-6 border border-border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold">Summary</h3>
            <Button onClick={copySummary} size="sm" variant="outline">
              <Copy className="w-4 h-4 mr-2" />
              Copy
            </Button>
          </div>
          <p className="text-sm leading-relaxed">{summary}</p>
        </div>
      )}

      <div className="bg-secondary/50 rounded-xl p-6 mt-8">
        <h2 className="text-2xl font-bold mb-4">About Text Summarizer Tool</h2>
        <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
          <p>
            The Text Summarizer condenses long text into shorter summaries by extracting the most important sentences. In our information-overloaded world, being able to quickly grasp the main points of lengthy documents is invaluable. This tool uses extractive summarization, which means it selects key sentences from your original text rather than generating new sentences. The result is a concise summary that captures the essential information.
          </p>
          <p>
            Students use text summarizers to quickly understand research papers and textbook chapters. Professionals use them to digest lengthy reports and documents. Journalists use them to extract key points from interviews and press releases. Researchers use them to scan through multiple papers efficiently. Content creators use them to create brief descriptions from long-form content. Anyone dealing with information overload can benefit from automatic summarization.
          </p>
          <p>
            Our tool lets you control the summary length by specifying how many sentences you want. For a very brief overview, request 2-3 sentences. For a more comprehensive summary that retains more detail, request 5-7 sentences. The algorithm selects sentences distributed throughout the document to ensure the summary represents the entire text, not just the beginning. This gives you a balanced overview of the content.
          </p>
          <p>
            While automated summarization can't replace careful reading of important documents, it's extremely useful for initial screening and prioritization. Use it to decide which articles deserve full reading, to create abstracts for longer pieces, or to refresh your memory about previously read content. The tool works best with well-structured text that has clear topic sentences. News articles, blog posts, and reports typically summarize well.
          </p>
        </div>
      </div>
    </div>
  );
};
