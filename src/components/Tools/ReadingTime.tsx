import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Clock, Book, Zap, Coffee } from "lucide-react";

export const ReadingTime = () => {
  const [text, setText] = useState("");

  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const avgReadingTime = Math.ceil(wordCount / 200);
  const slowReadingTime = Math.ceil(wordCount / 150);
  const fastReadingTime = Math.ceil(wordCount / 250);

  return (
    <div id="reading-time" className="space-y-6 scroll-mt-20">
      <div>
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste your article or text here..."
          className="min-h-[200px] font-mono text-sm"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card rounded-xl p-6 border border-border">
          <div className="flex items-center gap-3 mb-2">
            <Zap className="w-5 h-5 text-primary" />
            <div className="text-sm text-muted-foreground">Fast Reader</div>
          </div>
          <div className="text-3xl font-bold text-primary">{fastReadingTime} min</div>
          <div className="text-xs text-muted-foreground mt-1">250 words/min</div>
        </div>
        
        <div className="bg-card rounded-xl p-6 border border-border ring-2 ring-primary/20">
          <div className="flex items-center gap-3 mb-2">
            <Book className="w-5 h-5 text-primary" />
            <div className="text-sm text-muted-foreground">Average Reader</div>
          </div>
          <div className="text-3xl font-bold text-primary">{avgReadingTime} min</div>
          <div className="text-xs text-muted-foreground mt-1">200 words/min</div>
        </div>
        
        <div className="bg-card rounded-xl p-6 border border-border">
          <div className="flex items-center gap-3 mb-2">
            <Coffee className="w-5 h-5 text-primary" />
            <div className="text-sm text-muted-foreground">Slow Reader</div>
          </div>
          <div className="text-3xl font-bold text-primary">{slowReadingTime} min</div>
          <div className="text-xs text-muted-foreground mt-1">150 words/min</div>
        </div>
      </div>

      <div className="bg-secondary/50 rounded-xl p-6 mt-8">
        <h2 className="text-2xl font-bold mb-4">About Reading Time Calculator</h2>
        <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
          <p>
            The Reading Time Calculator estimates how long it will take readers to finish your content. This metric has become crucial for content creators, bloggers, and digital publishers who want to set proper expectations for their audience. Medium, one of the largest blogging platforms, popularized reading time estimates by displaying them prominently at the top of every article.
          </p>
          <p>
            Research shows that displaying reading time increases engagement and completion rates. Readers appreciate knowing upfront whether an article is a quick 2-minute read or a deep 15-minute dive. This allows them to decide if they have time to read now or should save it for later. Publishers who add reading time estimates see higher completion rates and better user satisfaction scores.
          </p>
          <p>
            Our calculator provides three estimates based on different reading speeds. The average adult reads at approximately 200 words per minute, which we use as the standard estimate. Fast readers who skim content can process around 250 words per minute, while careful readers or those reading complex technical content might read at 150 words per minute. Providing all three estimates helps you understand the range of reading experiences.
          </p>
          <p>
            Content strategists use this tool to plan article lengths that match reader attention spans. Email marketers use it to craft newsletters that respect subscribers' time. Technical writers use it to break long documentation into digestible chunks. Teachers use it to estimate homework reading loads. The tool is particularly valuable when you're trying to hit specific time targets, like creating a "5-minute read" or a "quick tip" that takes under 2 minutes.
          </p>
        </div>
      </div>
    </div>
  );
};
