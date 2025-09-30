import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, Shuffle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const RandomText = () => {
  const [length, setLength] = useState(100);
  const [generated, setGenerated] = useState("");
  const { toast } = useToast();

  const words = ["the", "quick", "brown", "fox", "jumps", "over", "lazy", "dog", "and", "runs", "through", "forest", "near", "river", "under", "bright", "sun", "while", "birds", "sing", "loudly", "in", "trees", "above", "green", "grass", "below", "clear", "blue", "sky", "with", "white", "clouds", "moving", "slowly", "across", "horizon"];

  const generateText = () => {
    const result = [];
    for (let i = 0; i < length; i++) {
      result.push(words[Math.floor(Math.random() * words.length)]);
    }
    setGenerated(result.join(" "));
  };

  const copyText = () => {
    navigator.clipboard.writeText(generated);
    toast({ description: "Random text copied!" });
  };

  return (
    <div id="random-text" className="space-y-6 scroll-mt-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          type="number"
          min="1"
          max="1000"
          value={length}
          onChange={(e) => setLength(parseInt(e.target.value) || 1)}
          placeholder="Number of words"
        />
        <Button onClick={generateText} variant="default">
          <Shuffle className="w-4 h-4 mr-2" />
          Generate Random Text
        </Button>
      </div>

      {generated && (
        <div className="bg-card rounded-xl p-6 border border-border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold">Generated Text</h3>
            <Button onClick={copyText} size="sm" variant="outline">
              <Copy className="w-4 h-4 mr-2" />
              Copy
            </Button>
          </div>
          <p className="text-sm whitespace-pre-wrap">{generated}</p>
        </div>
      )}

      <div className="bg-secondary/50 rounded-xl p-6 mt-8">
        <h2 className="text-2xl font-bold mb-4">About Random Text Generator</h2>
        <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
          <p>
            The Random Text Generator creates sequences of random English words for testing, prototyping, and development purposes. Unlike Lorem Ipsum which uses Latin-derived text, this tool generates actual English words in random combinations. It's perfect for testing how interfaces handle real word patterns, creating sample data, or generating unique strings for various purposes.
          </p>
          <p>
            Developers use random text generators for unit testing and quality assurance, ensuring applications handle various text inputs correctly. UI/UX designers use them to populate prototypes with text that looks more realistic than Lorem Ipsum. Database administrators use them to create sample records for testing queries and performance. Writers use them for creative writing prompts or to break writer's block with unexpected word combinations.
          </p>
          <p>
            This tool generates truly random sequences by selecting words randomly from a diverse vocabulary pool. Each generation is unique, providing fresh text every time you click generate. You can specify exactly how many words you need, from a single word to hundreds, making it flexible for any use case. The generated text uses common English words, so it looks natural even though the combinations are random.
          </p>
          <p>
            Random text generation is particularly useful when you need placeholder content that's not as formal as Lorem Ipsum but still meaningless enough not to distract from design. It's also valuable for testing text processing algorithms, search functionality, and text analysis tools. The randomness ensures comprehensive testing coverage since you're not repeatedly using the same predictable text patterns.
          </p>
        </div>
      </div>
    </div>
  );
};
