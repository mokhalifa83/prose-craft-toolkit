import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Link } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const URLEncoder = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const { toast } = useToast();

  const encode = () => {
    const encoded = encodeURIComponent(input);
    setOutput(encoded);
  };

  const decode = () => {
    try {
      const decoded = decodeURIComponent(input);
      setOutput(decoded);
    } catch (error) {
      toast({ description: "Decoding error. Invalid URL encoding.", variant: "destructive" });
    }
  };

  const copyOutput = () => {
    navigator.clipboard.writeText(output);
    toast({ description: "Copied to clipboard!" });
  };

  return (
    <div id="url-encoder" className="space-y-6 scroll-mt-20">
      <div>
        <label className="text-sm font-medium mb-2 block">Input</label>
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter text to encode or URL to decode..."
          className="min-h-[150px] font-mono text-sm"
        />
      </div>

      <div className="flex gap-3">
        <Button onClick={encode} variant="default">
          <Link className="w-4 h-4 mr-2" />
          Encode for URL
        </Button>
        <Button onClick={decode} variant="outline">
          Decode from URL
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
        <h2 className="text-2xl font-bold mb-4">About URL Encoder/Decoder</h2>
        <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
          <p>
            URL encoding (also called percent encoding) converts special characters into a format that can be safely used in URLs. URLs can only contain certain characters from the ASCII set - letters, numbers, and a few special characters like hyphens and underscores. Characters like spaces, ampersands, question marks, and international characters must be encoded using percent signs followed by hexadecimal values. For example, a space becomes %20, and an ampersand becomes %26.
          </p>
          <p>
            Web developers use URL encoding when building query strings, constructing API calls, or creating links with parameters. If you're passing user input as a URL parameter, it must be encoded to prevent breaking the URL structure. Search engines encode your search terms in URLs. Social media sharing buttons encode page titles and descriptions. Any time you see %20 or %2F in a URL, that's URL encoding at work.
          </p>
          <p>
            Our tool handles both encoding and decoding instantly. Paste regular text to encode it for safe use in URLs, or paste an encoded URL to decode it back into readable text. This is particularly useful when debugging APIs, understanding what data is being sent in URLs, or preparing text for URL parameters. The tool handles all special characters correctly, including international characters, emoji, and symbols.
          </p>
          <p>
            URL encoding is essential for building web applications that work reliably. Without proper encoding, special characters in URLs can break links, cause security vulnerabilities, or result in data loss. If you're building forms, search features, or any functionality that constructs URLs dynamically, always URL encode user input. This tool helps you test and understand how URL encoding works, making it easier to debug issues and build robust web applications.
          </p>
        </div>
      </div>
    </div>
  );
};
