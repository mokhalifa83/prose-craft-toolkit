import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Copy, RotateCcw, Repeat } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const ReverseText = () => {
  const [text, setText] = useState("");
  const { toast } = useToast();

  const reverseText = (type: string) => {
    let result = text;
    switch (type) {
      case "chars":
        result = text.split('').reverse().join('');
        break;
      case "words":
        result = text.split(' ').reverse().join(' ');
        break;
      case "lines":
        result = text.split('\n').reverse().join('\n');
        break;
    }
    setText(result);
  };

  const copyText = () => {
    navigator.clipboard.writeText(text);
    toast({ description: "Text copied to clipboard!" });
  };

  return (
    <div id="reverse-text" className="space-y-6 scroll-mt-20">
      <div>
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text to reverse..."
          className="min-h-[200px] font-mono text-sm"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <Button onClick={() => reverseText("chars")} variant="outline">
          <Repeat className="w-4 h-4 mr-2" />
          Reverse Characters
        </Button>
        <Button onClick={() => reverseText("words")} variant="outline">
          <Repeat className="w-4 h-4 mr-2" />
          Reverse Words
        </Button>
        <Button onClick={() => reverseText("lines")} variant="outline">
          <Repeat className="w-4 h-4 mr-2" />
          Reverse Lines
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
        <h2 className="text-2xl font-bold mb-4">About Reverse Text Tool</h2>
        <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
          <p>
            The Reverse Text Tool flips your text in different ways - character by character, word by word, or line by line. While it might seem like a novelty, this tool has practical applications in coding, creative writing, social media, puzzle creation, and text processing. It's also fun for creating mirror text, backwards messages, or text effects for social media posts.
          </p>
          <p>
            Developers use reverse text when working with algorithms that process text from right to left, or when testing string manipulation functions. Puzzle creators use it to generate word puzzles and cryptography exercises. Social media users create interesting text effects to make posts stand out. Teachers use it to create engaging classroom activities. Writers use it for creative effects in poetry or artistic text compositions.
          </p>
          <p>
            The tool offers three reversal methods for different needs. Reverse Characters flips the entire text backwards, turning "Hello World" into "dlroW olleH" - useful for creating mirror text or backwards messages. Reverse Words keeps each word intact but reverses their order, turning "Hello World" into "World Hello" - useful for reordering text or testing word order algorithms. Reverse Lines keeps content within lines but flips the order of lines - useful for reversing lists or changing the order of paragraphs.
          </p>
          <p>
            Beyond practical applications, reversing text can reveal interesting patterns in palindromes (words that read the same forwards and backwards) and help you spot symmetries in text. Language learners sometimes use reversed text to practice reading and comprehension skills. The tool processes text instantly without any length limits, handling everything from single words to entire documents with equal ease.
          </p>
        </div>
      </div>
    </div>
  );
};
