import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Copy, RotateCcw, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const TextCleaner = () => {
  const [text, setText] = useState("");
  const { toast } = useToast();

  const cleanText = (type: string) => {
    let result = text;
    switch (type) {
      case "spaces":
        result = text.replace(/\s+/g, ' ').trim();
        break;
      case "breaks":
        result = text.replace(/\n+/g, '\n').trim();
        break;
      case "special":
        result = text.replace(/[^\w\s.!?,;:'"()-]/g, '');
        break;
      case "all":
        result = text
          .replace(/\s+/g, ' ')
          .replace(/\n+/g, '\n')
          .replace(/[^\w\s.!?,;:'"()-]/g, '')
          .trim();
        break;
    }
    setText(result);
  };

  const copyText = () => {
    navigator.clipboard.writeText(text);
    toast({ description: "Text copied to clipboard!" });
  };

  return (
    <div id="text-cleaner" className="space-y-6 scroll-mt-20">
      <div>
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste messy text here to clean it up..."
          className="min-h-[200px] font-mono text-sm"
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Button onClick={() => cleanText("spaces")} variant="outline">
          Remove Extra Spaces
        </Button>
        <Button onClick={() => cleanText("breaks")} variant="outline">
          Remove Extra Breaks
        </Button>
        <Button onClick={() => cleanText("special")} variant="outline">
          Remove Special Chars
        </Button>
        <Button onClick={() => cleanText("all")} variant="default">
          <Sparkles className="w-4 h-4 mr-2" />
          Clean All
        </Button>
      </div>

      <div className="flex gap-3">
        <Button onClick={copyText} variant="default">
          <Copy className="w-4 h-4 mr-2" />
          Copy Text
        </Button>
        <Button onClick={() => setText("")} variant="outline">
          <RotateCcw className="w-4 h-4 mr-2" />
          Clear
        </Button>
      </div>

      <div className="bg-secondary/50 rounded-xl p-6 mt-8">
        <h2 className="text-2xl font-bold mb-4">About Text Cleaner Tool</h2>
        <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
          <p>
            The Text Cleaner removes unwanted formatting, extra spaces, line breaks, and special characters from your text. When you copy text from PDFs, websites, or emails, it often comes with invisible formatting characters, multiple spaces, and inconsistent line breaks that make it messy and difficult to work with. This tool cleans all that up instantly, giving you properly formatted, clean text ready to use.
          </p>
          <p>
            Anyone who copies and pastes text regularly will appreciate this tool. Copy text from a PDF and it might have random line breaks in the middle of sentences. Copy from a website and you might get extra spaces and hidden characters. Copy from an email and the formatting might be completely inconsistent. The Text Cleaner fixes all these issues with one click, saving you from tedious manual cleanup.
          </p>
          <p>
            Content creators use this when repurposing content from various sources. Students use it to clean up text copied from research papers or e-books. Editors use it to normalize formatting before starting their work. Data entry professionals use it to prepare text for import into databases or spreadsheets. Customer service teams use it to clean up copied customer messages before processing them.
          </p>
          <p>
            The tool offers targeted cleaning options so you can fix specific issues without removing everything. Remove extra spaces to fix spacing problems without touching line breaks. Remove extra line breaks to create more compact text without removing all paragraph separations. Remove special characters to strip out emoji, symbols, and unusual characters while keeping standard punctuation. Or use "Clean All" to apply all fixes at once for comprehensive text cleanup.
          </p>
        </div>
      </div>
    </div>
  );
};
