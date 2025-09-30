import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Copy, RotateCcw, Filter } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const DuplicateRemover = () => {
  const [text, setText] = useState("");
  const { toast } = useToast();

  const removeDuplicates = () => {
    const lines = text.split('\n');
    const unique = [...new Set(lines)];
    const removed = lines.length - unique.length;
    setText(unique.join('\n'));
    toast({ description: `Removed ${removed} duplicate line(s)` });
  };

  const copyText = () => {
    navigator.clipboard.writeText(text);
    toast({ description: "Text copied to clipboard!" });
  };

  return (
    <div id="duplicate-remover" className="space-y-6 scroll-mt-20">
      <div>
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text with duplicates (one item per line)..."
          className="min-h-[200px] font-mono text-sm"
        />
      </div>

      <div className="flex gap-3">
        <Button onClick={removeDuplicates} variant="default">
          <Filter className="w-4 h-4 mr-2" />
          Remove Duplicates
        </Button>
        <Button onClick={copyText} variant="outline">
          <Copy className="w-4 h-4 mr-2" />
          Copy Text
        </Button>
        <Button onClick={() => setText("")} variant="outline">
          <RotateCcw className="w-4 h-4 mr-2" />
          Clear
        </Button>
      </div>

      <div className="bg-secondary/50 rounded-xl p-6 mt-8">
        <h2 className="text-2xl font-bold mb-4">About Duplicate Remover Tool</h2>
        <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
          <p>
            The Duplicate Remover identifies and eliminates duplicate lines from your text, keeping only unique entries. When working with lists of names, email addresses, URLs, or any line-based data, duplicates often creep in through merging multiple sources or data entry errors. Manually finding and removing duplicates is tedious and error-prone. This tool does it instantly, no matter how large your list.
          </p>
          <p>
            Email marketers use this tool to clean mailing lists before sending campaigns, ensuring each subscriber only receives one copy. Data analysts use it to deduplicate records before processing. Researchers use it to consolidate sources and citations. Web developers use it to clean up lists of URLs or page paths. Anyone combining multiple lists needs this tool to eliminate redundancy and maintain clean data.
          </p>
          <p>
            The tool works line by line, treating each line as a separate entry. It preserves the first occurrence of each unique line and removes all subsequent duplicates. This means your original order is maintained as much as possible - the tool doesn't rearrange your list, it just removes the extras. Empty lines are treated as entries too, so multiple blank lines will be reduced to one.
          </p>
          <p>
            After removing duplicates, the tool tells you exactly how many duplicate lines were found and removed. This helps you understand the extent of duplication in your original data. The process is completely automatic and handles thousands of lines instantly. Whether you're cleaning a small list of 20 items or processing a massive data file with thousands of entries, the Duplicate Remover handles it with ease.
          </p>
        </div>
      </div>
    </div>
  );
};
