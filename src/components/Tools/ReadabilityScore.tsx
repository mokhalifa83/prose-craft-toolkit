import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { GraduationCap, Book, Users } from "lucide-react";

export const ReadabilityScore = () => {
  const [text, setText] = useState("");

  const calculateReadability = () => {
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
    const words = text.trim().split(/\s+/).filter(w => w.length > 0);
    const wordCount = words.length;
    const syllables = words.reduce((count, word) => {
      return count + word.toLowerCase().replace(/[^a-z]/g, '').replace(/[aeiouy]{2,}/g, 'a').replace(/[^aeiouy]/g, '').length;
    }, 0);

    if (sentences === 0 || wordCount === 0) return { score: 0, level: "No text", audience: "" };

    const avgWordsPerSentence = wordCount / sentences;
    const avgSyllablesPerWord = syllables / wordCount;
    
    // Flesch Reading Ease
    const score = Math.max(0, Math.min(100, 206.835 - 1.015 * avgWordsPerSentence - 84.6 * avgSyllablesPerWord));
    
    let level = "";
    let audience = "";
    
    if (score >= 90) {
      level = "Very Easy";
      audience = "5th grade students";
    } else if (score >= 80) {
      level = "Easy";
      audience = "6th grade students";
    } else if (score >= 70) {
      level = "Fairly Easy";
      audience = "7th grade students";
    } else if (score >= 60) {
      level = "Standard";
      audience = "8-9th grade students";
    } else if (score >= 50) {
      level = "Fairly Difficult";
      audience = "College students";
    } else if (score >= 30) {
      level = "Difficult";
      audience = "College graduates";
    } else {
      level = "Very Difficult";
      audience = "Professionals";
    }

    return { score: Math.round(score), level, audience };
  };

  const result = calculateReadability();

  return (
    <div id="readability-score" className="space-y-6 scroll-mt-20">
      <div>
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste your text to analyze readability..."
          className="min-h-[200px] font-mono text-sm"
        />
      </div>

      {text && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-card rounded-xl p-6 border border-border">
            <div className="flex items-center gap-3 mb-2">
              <GraduationCap className="w-5 h-5 text-primary" />
              <div className="text-sm text-muted-foreground">Readability Score</div>
            </div>
            <div className="text-3xl font-bold text-primary">{result.score}/100</div>
          </div>
          
          <div className="bg-card rounded-xl p-6 border border-border">
            <div className="flex items-center gap-3 mb-2">
              <Book className="w-5 h-5 text-primary" />
              <div className="text-sm text-muted-foreground">Reading Level</div>
            </div>
            <div className="text-xl font-bold text-primary">{result.level}</div>
          </div>
          
          <div className="bg-card rounded-xl p-6 border border-border">
            <div className="flex items-center gap-3 mb-2">
              <Users className="w-5 h-5 text-primary" />
              <div className="text-sm text-muted-foreground">Target Audience</div>
            </div>
            <div className="text-xl font-bold text-primary">{result.audience}</div>
          </div>
        </div>
      )}

      <div className="bg-secondary/50 rounded-xl p-6 mt-8">
        <h2 className="text-2xl font-bold mb-4">About Readability Score Tool</h2>
        <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
          <p>
            The Readability Score tool analyzes your text using the Flesch Reading Ease formula to determine how easy or difficult it is to read. The score ranges from 0 to 100, where higher scores indicate easier reading. This tool helps writers ensure their content matches their target audience's reading level. Writing that's too complex loses readers, while writing that's too simple can seem condescending. Finding the right balance is crucial for effective communication.
          </p>
          <p>
            Content creators use readability scores to optimize blog posts and articles for their audience. Technical writers use it to ensure documentation is accessible to end users. Marketers use it to craft copy that resonates with their target demographic. Teachers use it to ensure reading materials match students' grade levels. Medical professionals use it to create patient information that's understandable without oversimplifying. Government agencies are often required to write public documents at specific reading levels.
          </p>
          <p>
            The Flesch Reading Ease formula considers two main factors: average sentence length and average word length (measured in syllables). Shorter sentences and shorter words increase the score, making text easier to read. This doesn't mean dumbing down content - it means communicating clearly and efficiently. Even complex topics can be explained with simpler sentence structures and word choices. The best writers make difficult concepts accessible without sacrificing accuracy.
          </p>
          <p>
            For web content, most experts recommend targeting a score between 60-70, which corresponds to 8th-9th grade reading level. This isn't because web audiences can't read at higher levels, but because online readers scan content quickly and prefer easily digestible information. News websites typically aim for 60-70. Academic papers might score 30-50. Children's books score 90-100. Use this tool to check if your content matches your audience's needs and expectations.
          </p>
        </div>
      </div>
    </div>
  );
};
