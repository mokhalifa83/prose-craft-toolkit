import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Copy, RotateCcw, SearchX } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Checkbox } from "@/components/ui/checkbox";

export const FindReplace = () => {
  const [text, setText] = useState("");
  const [findText, setFindText] = useState("");
  const [replaceText, setReplaceText] = useState("");
  const [caseSensitive, setCaseSensitive] = useState(false);
  const { toast } = useToast();

  const replaceAll = () => {
    if (!findText) {
      toast({ description: "Please enter text to find", variant: "destructive" });
      return;
    }
    
    const flags = caseSensitive ? 'g' : 'gi';
    const regex = new RegExp(findText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), flags);
    const result = text.replace(regex, replaceText);
    setText(result);
    
    const count = (text.match(regex) || []).length;
    toast({ description: `Replaced ${count} occurrence(s)` });
  };

  const copyText = () => {
    navigator.clipboard.writeText(text);
    toast({ description: "Text copied to clipboard!" });
  };

  return (
    <div id="find-replace" className="space-y-6 scroll-mt-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          value={findText}
          onChange={(e) => setFindText(e.target.value)}
          placeholder="Find text..."
          className="font-mono"
        />
        <Input
          value={replaceText}
          onChange={(e) => setReplaceText(e.target.value)}
          placeholder="Replace with..."
          className="font-mono"
        />
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox 
          id="case-sensitive" 
          checked={caseSensitive}
          onCheckedChange={(checked) => setCaseSensitive(checked as boolean)}
        />
        <label htmlFor="case-sensitive" className="text-sm">Case sensitive</label>
      </div>

      <div>
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text here..."
          className="min-h-[200px] font-mono text-sm"
        />
      </div>

      <div className="flex gap-3">
        <Button onClick={replaceAll} variant="default">
          <SearchX className="w-4 h-4 mr-2" />
          Replace All
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
        <h2 className="text-2xl font-bold mb-4">About Find & Replace Tool</h2>
        <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
          <p>
            Find and Replace is one of the most powerful text manipulation tools available. It searches through your text and replaces every occurrence of a specific word or phrase with something else. This tool saves countless hours when you need to make repetitive changes across large amounts of text. Whether you're updating product names in a catalog, changing terminology in documentation, or fixing recurring typos, Find & Replace handles it instantly.
          </p>
          <p>
            Content managers use this tool when rebranding requires changing company names or product names across hundreds of pages. Editors use it to enforce consistent terminology and fix common errors. Writers use it to change character names in drafts or update repeated phrases. Developers use it to update variable names or API endpoints in documentation. Students use it to correct repeated spelling mistakes in essays before submission.
          </p>
          <p>
            The case-sensitive option gives you precise control over replacements. With case sensitivity on, "Apple" and "apple" are treated as different words, so you can replace one without affecting the other. With case sensitivity off, the tool replaces all variations regardless of capitalization. This flexibility is crucial when you need to update words that might appear with different capitalizations throughout your text.
          </p>
          <p>
            The tool shows you exactly how many replacements it made, so you can verify the operation worked as expected. It handles special characters correctly and won't break your text formatting. You can replace text with nothing (leaving it blank) to effectively delete all occurrences of specific words or phrases. The tool processes thousands of replacements instantly, making it far more efficient than manual search-and-replace operations.
          </p>
        </div>
      </div>
    </div>
  );
};
