import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Copy, RotateCcw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const CharacterCounter = () => {
  const [text, setText] = useState("");
  const { toast } = useToast();

  const charCount = text.length;
  const charCountNoSpaces = text.replace(/\s/g, "").length;
  const charCountNoSpacesNoPunctuation = text.replace(/[^a-zA-Z0-9]/g, "").length;
  const lineCount = text.split(/\n/).length;

  const copyStats = () => {
    const stats = `Characters: ${charCount}\nCharacters (no spaces): ${charCountNoSpaces}\nCharacters (no spaces/punctuation): ${charCountNoSpacesNoPunctuation}\nLines: ${lineCount}`;
    navigator.clipboard.writeText(stats);
    toast({ description: "Stats copied to clipboard!" });
  };

  return (
    <div id="character-counter" className="space-y-6 scroll-mt-20">
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
          <div className="text-3xl font-bold text-primary">{charCount}</div>
          <div className="text-sm text-muted-foreground mt-1">Characters</div>
        </div>
        <div className="bg-card rounded-xl p-4 border border-border">
          <div className="text-3xl font-bold text-primary">{charCountNoSpaces}</div>
          <div className="text-sm text-muted-foreground mt-1">No Spaces</div>
        </div>
        <div className="bg-card rounded-xl p-4 border border-border">
          <div className="text-3xl font-bold text-primary">{charCountNoSpacesNoPunctuation}</div>
          <div className="text-sm text-muted-foreground mt-1">Alphanumeric</div>
        </div>
        <div className="bg-card rounded-xl p-4 border border-border">
          <div className="text-3xl font-bold text-primary">{lineCount}</div>
          <div className="text-sm text-muted-foreground mt-1">Lines</div>
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
        <h2 className="text-2xl font-bold mb-4">About Character Counter Tool</h2>
        <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
          <p>
            The Character Counter is an essential tool for anyone who needs to track character limits in their writing. Social media posts, meta descriptions, SMS messages, and many other forms of content have strict character limits. This tool gives you instant, accurate counts of characters with spaces, without spaces, and alphanumeric characters only.
          </p>
          <p>
            Twitter has a 280-character limit, Instagram captions allow 2,200 characters, meta descriptions should be under 160 characters, and SMS messages are limited to 160 characters. Going over these limits can result in cut-off text, poor user experience, or additional costs. Our character counter helps you stay within these boundaries while maximizing your message impact.
          </p>
          <p>
            Content creators use this tool daily to optimize social media posts for maximum engagement. SEO professionals rely on it to craft perfect meta descriptions and title tags that won't get truncated in search results. Writers use it to meet submission requirements that specify character counts rather than word counts. Customer service teams use it to ensure messages fit within platform constraints.
          </p>
          <p>
            The tool provides multiple count options: total characters including everything, characters without spaces (useful for certain coding contexts and specific platform requirements), and alphanumeric characters only (excluding punctuation and special characters). The line counter is particularly useful for formatting checks and code-related tasks. All counting happens instantly as you type, with no delays or page refreshes needed.
          </p>
        </div>
      </div>
    </div>
  );
};
