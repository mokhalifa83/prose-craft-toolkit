import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, RotateCcw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const LoremGenerator = () => {
  const [count, setCount] = useState(5);
  const [type, setType] = useState<'paragraphs' | 'sentences' | 'words'>('paragraphs');
  const [generated, setGenerated] = useState("");
  const { toast } = useToast();

  const loremWords = "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum".split(" ");

  const generateLorem = () => {
    let result = "";
    
    if (type === 'words') {
      const words = [];
      for (let i = 0; i < count; i++) {
        words.push(loremWords[i % loremWords.length]);
      }
      result = words.join(" ");
    } else if (type === 'sentences') {
      for (let i = 0; i < count; i++) {
        const wordCount = Math.floor(Math.random() * 10) + 8;
        const words = [];
        for (let j = 0; j < wordCount; j++) {
          words.push(loremWords[Math.floor(Math.random() * loremWords.length)]);
        }
        result += words[0].charAt(0).toUpperCase() + words[0].slice(1) + " " + words.slice(1).join(" ") + ". ";
      }
    } else {
      for (let i = 0; i < count; i++) {
        const sentenceCount = Math.floor(Math.random() * 4) + 4;
        let paragraph = "";
        for (let j = 0; j < sentenceCount; j++) {
          const wordCount = Math.floor(Math.random() * 10) + 8;
          const words = [];
          for (let k = 0; k < wordCount; k++) {
            words.push(loremWords[Math.floor(Math.random() * loremWords.length)]);
          }
          paragraph += words[0].charAt(0).toUpperCase() + words[0].slice(1) + " " + words.slice(1).join(" ") + ". ";
        }
        result += paragraph + "\n\n";
      }
    }
    
    setGenerated(result.trim());
  };

  const copyText = () => {
    navigator.clipboard.writeText(generated);
    toast({ description: "Lorem ipsum copied to clipboard!" });
  };

  return (
    <div id="lorem-generator" className="space-y-6 scroll-mt-20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Input
          type="number"
          min="1"
          max="100"
          value={count}
          onChange={(e) => setCount(parseInt(e.target.value) || 1)}
          placeholder="Count"
        />
        <select 
          value={type} 
          onChange={(e) => setType(e.target.value as any)}
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
        >
          <option value="paragraphs">Paragraphs</option>
          <option value="sentences">Sentences</option>
          <option value="words">Words</option>
        </select>
        <Button onClick={generateLorem} variant="default">
          Generate
        </Button>
      </div>

      {generated && (
        <div className="bg-card rounded-xl p-6 border border-border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold">Generated Lorem Ipsum</h3>
            <div className="flex gap-2">
              <Button onClick={copyText} size="sm" variant="outline">
                <Copy className="w-4 h-4 mr-2" />
                Copy
              </Button>
              <Button onClick={() => setGenerated("")} size="sm" variant="outline">
                <RotateCcw className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <div className="prose prose-sm dark:prose-invert max-w-none">
            <p className="whitespace-pre-wrap font-serif">{generated}</p>
          </div>
        </div>
      )}

      <div className="bg-secondary/50 rounded-xl p-6 mt-8">
        <h2 className="text-2xl font-bold mb-4">About Lorem Ipsum Generator</h2>
        <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
          <p>
            Lorem Ipsum is placeholder text used in design and publishing to fill space and demonstrate how text will look in a layout without using real content. It's been the industry standard dummy text since the 1500s, when an unknown printer scrambled type to make a specimen book. The text is intentionally meaningless, derived from sections of Cicero's "De Finibus Bonorum et Malorum" written in 45 BC.
          </p>
          <p>
            Designers use Lorem Ipsum to create mockups and prototypes without waiting for final copy. Web developers use it to build page templates before content is ready. Graphic designers use it to show clients how layouts will look with text. Print designers use it to demonstrate typography and spacing. Using Lorem Ipsum instead of "Text here, text here" makes presentations look more professional and helps stakeholders focus on design rather than placeholder content.
          </p>
          <p>
            Our Lorem Ipsum Generator gives you complete control over how much text you need. Generate full paragraphs when creating article layouts, individual sentences for shorter content blocks, or specific word counts for character-limited fields. This flexibility ensures you get placeholder text that matches your exact needs, whether you're designing a business card or a full book layout.
          </p>
          <p>
            The generator creates randomized Lorem Ipsum that looks natural and varied, not just repeating the same phrases. This gives a more realistic preview of how diverse content will flow in your design. The text follows proper sentence and paragraph structure with appropriate punctuation and capitalization, making it look authentic even though it's meaningless. Generate as much or as little as you need with just a few clicks.
          </p>
        </div>
      </div>
    </div>
  );
};
