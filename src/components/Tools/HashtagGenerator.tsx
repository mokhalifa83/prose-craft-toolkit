import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, Hash } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const HashtagGenerator = () => {
  const [text, setText] = useState("");
  const [hashtags, setHashtags] = useState<string[]>([]);
  const { toast } = useToast();

  const generateHashtags = () => {
    const words = text
      .toLowerCase()
      .replace(/[^\w\s]/g, '')
      .split(/\s+/)
      .filter(w => w.length > 2);
    
    const generated = words.map(word => `#${word}`);
    const combined = words.length > 1 ? `#${words.join('')}` : '';
    
    const final = combined ? [combined, ...generated] : generated;
    setHashtags([...new Set(final.slice(0, 10))]);
  };

  const copyHashtags = () => {
    navigator.clipboard.writeText(hashtags.join(' '));
    toast({ description: "Hashtags copied!" });
  };

  return (
    <div id="hashtag-generator" className="space-y-6 scroll-mt-20">
      <div className="space-y-4">
        <Input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter keywords or phrases..."
        />
        <Button onClick={generateHashtags} variant="default" className="w-full">
          <Hash className="w-4 h-4 mr-2" />
          Generate Hashtags
        </Button>
      </div>

      {hashtags.length > 0 && (
        <div className="bg-card rounded-xl p-6 border border-border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold">Generated Hashtags</h3>
            <Button onClick={copyHashtags} size="sm" variant="outline">
              <Copy className="w-4 h-4 mr-2" />
              Copy All
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {hashtags.map((tag, i) => (
              <span key={i} className="px-3 py-1 bg-primary/10 text-primary rounded-full font-mono text-sm">
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="bg-secondary/50 rounded-xl p-6 mt-8">
        <h2 className="text-2xl font-bold mb-4">About Hashtag Generator</h2>
        <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
          <p>
            Hashtags categorize content and make it discoverable on social media platforms like Instagram, Twitter, TikTok, and LinkedIn. They turn keywords into clickable links that aggregate all posts using that hashtag. The Hashtag Generator converts your keywords and phrases into properly formatted hashtags, helping you reach wider audiences and join relevant conversations. Strategic hashtag use can dramatically increase post visibility and engagement.
          </p>
          <p>
            Social media managers use hashtag generators to optimize posts for maximum reach. Influencers use them to join trending conversations and grow their following. Brands use them to create branded hashtags and participate in industry discussions. Event organizers use them to aggregate event-related content. Small businesses use them to increase local visibility. The right hashtags can make the difference between a post that gets lost and one that goes viral.
          </p>
          <p>
            Our generator creates multiple hashtag variations from your input text. It generates individual word hashtags as well as combined hashtags from multiple words. For example, "digital marketing" becomes both #digital and #marketing individually, plus #digitalmarketing combined. This gives you options for different posting strategies. The tool removes special characters and creates clean, valid hashtags that work across all major platforms.
          </p>
          <p>
            Hashtag strategy varies by platform. Instagram allows up to 30 hashtags per post (though 8-15 is often recommended). Twitter posts work best with 1-2 hashtags to maintain readability. LinkedIn recommends 3-5 hashtags. TikTok performs well with 3-5 highly relevant hashtags. Research shows that posts with at least one hashtag receive significantly more engagement than those without. Use a mix of popular hashtags for reach and niche hashtags for targeting specific communities.
          </p>
        </div>
      </div>
    </div>
  );
};
