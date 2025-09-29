import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Copy, RotateCcw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const WordCounter = () => {
  const [text, setText] = useState("");
  const { toast } = useToast();

  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const charCount = text.length;
  const charCountNoSpaces = text.replace(/\s/g, "").length;
  const sentenceCount = text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
  const paragraphCount = text.split(/\n\n+/).filter(p => p.trim().length > 0).length;
  const avgWordLength = wordCount > 0 ? (charCountNoSpaces / wordCount).toFixed(1) : "0";
  const readingTime = Math.ceil(wordCount / 200);

  const copyStats = () => {
    const stats = `Words: ${wordCount}\nCharacters: ${charCount}\nSentences: ${sentenceCount}\nParagraphs: ${paragraphCount}`;
    navigator.clipboard.writeText(stats);
    toast({ description: "Stats copied to clipboard!" });
  };

  return (
    <div id="word-counter" className="space-y-6 scroll-mt-20">
      <div>
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type or paste your text here..."
          className="min-h-[200px] font-mono text-sm"
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-card rounded-xl p-4 border border-border">
          <div className="text-3xl font-bold text-primary">{wordCount}</div>
          <div className="text-sm text-muted-foreground mt-1">Words</div>
        </div>
        <div className="bg-card rounded-xl p-4 border border-border">
          <div className="text-3xl font-bold text-primary">{charCount}</div>
          <div className="text-sm text-muted-foreground mt-1">Characters</div>
        </div>
        <div className="bg-card rounded-xl p-4 border border-border">
          <div className="text-3xl font-bold text-primary">{sentenceCount}</div>
          <div className="text-sm text-muted-foreground mt-1">Sentences</div>
        </div>
        <div className="bg-card rounded-xl p-4 border border-border">
          <div className="text-3xl font-bold text-primary">{readingTime}</div>
          <div className="text-sm text-muted-foreground mt-1">Min Read</div>
        </div>
      </div>

      <div className="flex gap-3">
        <Button onClick={copyStats} variant="default">
          <Copy className="w-4 h-4 mr-2" />
          Copy Stats
        </Button>
        <Button onClick={() => setText("")} variant="outline">
          <RotateCcw className="w-4 h-4 mr-2" />
          Clear
        </Button>
      </div>

      <div className="bg-secondary/50 rounded-xl p-6 mt-8">
        <h2 className="text-2xl font-bold mb-4">About Word Counter Tool</h2>
        <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
          <p>
            Our Word Counter is a powerful, free tool that gives you instant statistics about your text. Whether you're a student checking if your essay meets the 500-word requirement, a writer tracking your daily word count, or a content creator optimizing for social media limits, this tool has you covered.
          </p>
          <p>
            The tool automatically counts words, characters (with and without spaces), sentences, paragraphs, and even estimates reading time. It's perfect for academic writing, blog posts, social media content, SEO meta descriptions, and any situation where word count matters. Writers use it to track progress on novels, students use it to meet assignment requirements, and marketers use it to optimize ad copy.
          </p>
          <p>
            Unlike other word counters that only show basic stats, ours provides comprehensive analytics including average word length and reading time estimation. The reading time is calculated based on an average reading speed of 200 words per minute, which is standard for adult readers. This helps content creators estimate how long their articles will take to read, which is crucial for reader engagement.
          </p>
          <p>
            All processing happens in your browser - your text never leaves your device. This ensures complete privacy and works even without an internet connection once the page is loaded. No registration required, no data stored, completely free to use.
          </p>
        </div>
      </div>
    </div>
  );
};