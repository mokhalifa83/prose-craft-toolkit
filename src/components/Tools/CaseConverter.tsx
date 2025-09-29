import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Copy, RotateCcw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const CaseConverter = () => {
  const [text, setText] = useState("");
  const { toast } = useToast();

  const convertCase = (type: string) => {
    let result = text;
    switch (type) {
      case "upper":
        result = text.toUpperCase();
        break;
      case "lower":
        result = text.toLowerCase();
        break;
      case "title":
        result = text.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
        break;
      case "sentence":
        result = text.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase());
        break;
      case "camel":
        result = text.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
        break;
      case "snake":
        result = text.toLowerCase().replace(/\s+/g, '_');
        break;
      case "kebab":
        result = text.toLowerCase().replace(/\s+/g, '-');
        break;
      case "alternate":
        result = text.split('').map((c, i) => i % 2 === 0 ? c.toLowerCase() : c.toUpperCase()).join('');
        break;
    }
    setText(result);
  };

  const copyText = () => {
    navigator.clipboard.writeText(text);
    toast({ description: "Text copied to clipboard!" });
  };

  return (
    <div id="case-converter" className="space-y-6 scroll-mt-20">
      <div>
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text to convert..."
          className="min-h-[200px] font-mono text-sm"
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Button onClick={() => convertCase("upper")} variant="outline">UPPERCASE</Button>
        <Button onClick={() => convertCase("lower")} variant="outline">lowercase</Button>
        <Button onClick={() => convertCase("title")} variant="outline">Title Case</Button>
        <Button onClick={() => convertCase("sentence")} variant="outline">Sentence case</Button>
        <Button onClick={() => convertCase("camel")} variant="outline">camelCase</Button>
        <Button onClick={() => convertCase("snake")} variant="outline">snake_case</Button>
        <Button onClick={() => convertCase("kebab")} variant="outline">kebab-case</Button>
        <Button onClick={() => convertCase("alternate")} variant="outline">aLtErNaTe</Button>
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
        <h2 className="text-2xl font-bold mb-4">About Case Converter Tool</h2>
        <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
          <p>
            The Case Converter is an essential tool for anyone working with text. It instantly converts your text between different letter cases with a single click. Perfect for fixing text that was accidentally written in caps lock, formatting code variable names, or preparing content that needs specific capitalization styles.
          </p>
          <p>
            This tool supports eight different case styles: UPPERCASE (all capitals), lowercase (all small letters), Title Case (first letter of each word capitalized), Sentence case (first letter of sentences capitalized), camelCase (programming style with no spaces), snake_case (underscores between words), kebab-case (hyphens between words), and aLtErNaTe case (alternating between upper and lower).
          </p>
          <p>
            Developers frequently use this tool to convert between naming conventions - for example, converting a title to camelCase for a JavaScript variable, or to snake_case for a Python function. Writers use it to fix text formatting issues, especially when pasting content from different sources. Social media managers use it to create attention-grabbing headlines or to fix posts written in all caps.
          </p>
          <p>
            The tool works instantly as you type, with no page refreshes needed. It handles special characters, numbers, and punctuation correctly while preserving the overall structure of your text. Like all our tools, it's completely client-side, meaning your text stays private and never gets sent to any server.
          </p>
        </div>
      </div>
    </div>
  );
};