import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Braces } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const JSONFormatter = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const { toast } = useToast();

  const formatJSON = () => {
    try {
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, 2);
      setOutput(formatted);
    } catch (error) {
      toast({ description: "Invalid JSON. Please check your input.", variant: "destructive" });
    }
  };

  const minifyJSON = () => {
    try {
      const parsed = JSON.parse(input);
      const minified = JSON.stringify(parsed);
      setOutput(minified);
    } catch (error) {
      toast({ description: "Invalid JSON. Please check your input.", variant: "destructive" });
    }
  };

  const copyOutput = () => {
    navigator.clipboard.writeText(output);
    toast({ description: "JSON copied to clipboard!" });
  };

  return (
    <div id="json-formatter" className="space-y-6 scroll-mt-20">
      <div>
        <label className="text-sm font-medium mb-2 block">Input JSON</label>
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='Paste JSON here... e.g., {"name":"John","age":30}'
          className="min-h-[150px] font-mono text-sm"
        />
      </div>

      <div className="flex gap-3">
        <Button onClick={formatJSON} variant="default">
          <Braces className="w-4 h-4 mr-2" />
          Format (Pretty Print)
        </Button>
        <Button onClick={minifyJSON} variant="outline">
          Minify (Compact)
        </Button>
      </div>

      {output && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium">Output</label>
            <Button onClick={copyOutput} size="sm" variant="outline">
              <Copy className="w-4 h-4 mr-2" />
              Copy
            </Button>
          </div>
          <Textarea
            value={output}
            readOnly
            className="min-h-[150px] font-mono text-sm bg-secondary"
          />
        </div>
      )}

      <div className="bg-secondary/50 rounded-xl p-6 mt-8">
        <h2 className="text-2xl font-bold mb-4">About JSON Formatter</h2>
        <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
          <p>
            JSON (JavaScript Object Notation) is the standard data format for APIs and web services. The JSON Formatter beautifies compressed or minified JSON, making it human-readable with proper indentation and line breaks. It also validates JSON syntax, catching errors like missing commas or brackets. Developers rely on JSON formatters daily when working with API responses, configuration files, and data exports that come in compact, difficult-to-read formats.
          </p>
          <p>
            Web developers use JSON formatters to debug API responses and understand data structures. Backend engineers use them to validate configuration files. Data analysts use them to explore exported data. DevOps teams use them to review server logs and application data. Anyone working with modern web applications encounters JSON regularly, and being able to quickly format and validate it saves significant time and prevents errors.
          </p>
          <p>
            Our formatter offers both pretty-printing (formatted with indentation and line breaks for readability) and minification (compact format with whitespace removed for smaller file sizes). Format JSON when you need to read and understand the data structure. Minify JSON when you need to reduce file size for network transmission or storage. The tool validates your JSON as it formats, immediately alerting you to syntax errors.
          </p>
          <p>
            JSON validation is crucial because even small syntax errors (like a missing comma or quote) can break applications. The formatter highlights exactly where errors occur, making debugging faster. It handles nested objects and arrays of any complexity, maintaining proper indentation at all levels. The tool processes JSON entirely in your browser without server uploads, ensuring data privacy for sensitive API keys, user data, or proprietary information.
          </p>
        </div>
      </div>
    </div>
  );
};
