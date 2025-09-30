import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Copy, RotateCcw, ArrowDownUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const LineSorter = () => {
  const [text, setText] = useState("");
  const { toast } = useToast();

  const sortLines = (type: string) => {
    const lines = text.split('\n');
    let sorted = [...lines];
    
    switch (type) {
      case "asc":
        sorted = lines.sort((a, b) => a.localeCompare(b));
        break;
      case "desc":
        sorted = lines.sort((a, b) => b.localeCompare(a));
        break;
      case "length":
        sorted = lines.sort((a, b) => a.length - b.length);
        break;
      case "reverse":
        sorted = lines.reverse();
        break;
    }
    
    setText(sorted.join('\n'));
  };

  const copyText = () => {
    navigator.clipboard.writeText(text);
    toast({ description: "Text copied to clipboard!" });
  };

  return (
    <div id="line-sorter" className="space-y-6 scroll-mt-20">
      <div>
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text with each item on a new line..."
          className="min-h-[200px] font-mono text-sm"
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Button onClick={() => sortLines("asc")} variant="outline">
          Sort A-Z
        </Button>
        <Button onClick={() => sortLines("desc")} variant="outline">
          Sort Z-A
        </Button>
        <Button onClick={() => sortLines("length")} variant="outline">
          Sort by Length
        </Button>
        <Button onClick={() => sortLines("reverse")} variant="outline">
          Reverse Order
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
        <h2 className="text-2xl font-bold mb-4">About Line Sorter Tool</h2>
        <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
          <p>
            The Line Sorter organizes your text by sorting each line alphabetically or by other criteria. This simple but powerful tool is perfect for organizing lists, cleaning up data, arranging names, or putting any line-based text in order. Instead of manually rearranging lines, which is time-consuming and error-prone, you can sort hundreds or thousands of lines instantly with one click.
          </p>
          <p>
            Whether you're organizing a guest list for an event, sorting product names, arranging tasks by priority, or organizing any kind of list, the Line Sorter handles it effortlessly. Teachers use it to alphabetize student names. Project managers use it to organize task lists. Developers use it to sort imports or dependencies. Writers use it to organize research notes or bibliography entries.
          </p>
          <p>
            The tool offers multiple sorting options to match your needs. Sort A-Z for standard alphabetical order, perfect for names, titles, or any text that should be alphabetical. Sort Z-A for reverse alphabetical order when you want to see items at the end of the alphabet first. Sort by length to organize lines from shortest to longest, useful for finding the briefest or longest entries. Reverse order simply flips your list upside down without alphabetizing.
          </p>
          <p>
            Data professionals find this tool invaluable when preparing data for import into spreadsheets or databases. Content creators use it to organize bullet points for articles. Researchers use it to sort reference materials. Anyone dealing with lists can benefit from instant sorting. The tool preserves the exact content of each line while reorganizing their order, ensuring your data stays intact during the sorting process.
          </p>
        </div>
      </div>
    </div>
  );
};
