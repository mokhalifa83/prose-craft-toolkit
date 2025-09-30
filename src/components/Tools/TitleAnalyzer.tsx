import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Heading, AlertCircle, CheckCircle2 } from "lucide-react";

export const TitleAnalyzer = () => {
  const [title, setTitle] = useState("");

  const length = title.length;
  const wordCount = title.trim() ? title.trim().split(/\s+/).length : 0;
  const isLengthGood = length >= 30 && length <= 60;
  const isWordCountGood = wordCount >= 4 && wordCount <= 12;
  const hasNumber = /\d/.test(title);
  const hasPowerWord = /amazing|best|essential|free|guide|proven|ultimate|top|easy|simple|quick/i.test(title);

  return (
    <div id="title-analyzer" className="space-y-6 scroll-mt-20">
      <div>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter your page title or headline..."
          className="text-lg"
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-card rounded-xl p-4 border border-border">
          <div className="text-3xl font-bold text-primary">{length}</div>
          <div className="text-sm text-muted-foreground mt-1">Characters</div>
          <div className="text-xs mt-1">{isLengthGood ? '✓ Optimal' : '⚠ ' + (length < 30 ? 'Too short' : 'Too long')}</div>
        </div>
        <div className="bg-card rounded-xl p-4 border border-border">
          <div className="text-3xl font-bold text-primary">{wordCount}</div>
          <div className="text-sm text-muted-foreground mt-1">Words</div>
          <div className="text-xs mt-1">{isWordCountGood ? '✓ Good' : '⚠ Adjust'}</div>
        </div>
        <div className="bg-card rounded-xl p-4 border border-border">
          <div className="text-3xl font-bold text-primary">{hasNumber ? '✓' : '✗'}</div>
          <div className="text-sm text-muted-foreground mt-1">Has Number</div>
          <div className="text-xs mt-1">{hasNumber ? 'Great!' : 'Consider adding'}</div>
        </div>
        <div className="bg-card rounded-xl p-4 border border-border">
          <div className="text-3xl font-bold text-primary">{hasPowerWord ? '✓' : '✗'}</div>
          <div className="text-sm text-muted-foreground mt-1">Power Word</div>
          <div className="text-xs mt-1">{hasPowerWord ? 'Excellent!' : 'Add impact'}</div>
        </div>
      </div>

      <div className="bg-card rounded-xl p-6 border border-border">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <Heading className="w-5 h-5 text-primary" />
          Title Recommendations
        </h3>
        <div className="space-y-2">
          <div className="flex items-start gap-2">
            {isLengthGood ? <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" /> : <AlertCircle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />}
            <div className="text-sm">
              <strong>Length:</strong> {isLengthGood ? 'Perfect! Your title is between 30-60 characters.' : length < 30 ? 'Make it longer (aim for 30-60 characters)' : 'Shorten it (aim for 30-60 characters)'}
            </div>
          </div>
          <div className="flex items-start gap-2">
            {hasNumber ? <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" /> : <AlertCircle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />}
            <div className="text-sm">
              <strong>Numbers:</strong> {hasNumber ? 'Good use of numbers for specificity!' : 'Consider adding a number (e.g., "7 Ways" or "2024 Guide")'}
            </div>
          </div>
          <div className="flex items-start gap-2">
            {hasPowerWord ? <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" /> : <AlertCircle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />}
            <div className="text-sm">
              <strong>Power Words:</strong> {hasPowerWord ? 'Great! Power words increase click-through rates.' : 'Add impact with words like "Best," "Ultimate," "Essential," or "Proven"'}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-secondary/50 rounded-xl p-6 mt-8">
        <h2 className="text-2xl font-bold mb-4">About Title Analyzer</h2>
        <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
          <p>
            The Title Analyzer evaluates your headlines and page titles for SEO effectiveness and click-through potential. A great title can make the difference between content that gets clicks and content that gets ignored. This tool checks character length, word count, use of numbers, and power words - all factors that research shows increase click-through rates. It provides instant feedback to help you craft titles that perform better in search results and social media.
          </p>
          <p>
            Bloggers use title analyzers to optimize article headlines before publishing. Content marketers use them to maximize click-through rates from search results. Email marketers use them to craft subject lines that get opened. YouTubers use them for video titles. SEO specialists use them when optimizing existing content. The right title dramatically impacts traffic - studies show that even small changes to titles can double or triple click-through rates.
          </p>
          <p>
            The optimal title length of 30-60 characters ensures it displays fully in search results without truncation. Titles with 4-12 words balance specificity with readability. Numbers in titles (like "7 Tips" or "2024 Guide") provide specificity and pattern interrupt that catches attention. Power words create emotional appeal and urgency that motivate clicks. Research shows titles with numbers get 36% more clicks, and power words can increase engagement by 20%.
          </p>
          <p>
            While the tool checks technical factors, remember that the best titles also clearly communicate value and match search intent. Include your target keyword naturally, promise a clear benefit, and be specific about what readers will learn. Test different title variations to see what resonates with your audience. Even great content won't get traffic if the title doesn't convince people to click. Use this tool to ensure your titles are optimized before publication.
          </p>
        </div>
      </div>
    </div>
  );
};
