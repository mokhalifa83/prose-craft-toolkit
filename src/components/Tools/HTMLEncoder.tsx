import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Code2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const HTMLEncoder = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const { toast } = useToast();

  const encode = () => {
    const encoded = input
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
    setOutput(encoded);
  };

  const decode = () => {
    const decoded = input
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&amp;/g, '&');
    setOutput(decoded);
  };

  const copyOutput = () => {
    navigator.clipboard.writeText(output);
    toast({ description: "Copied to clipboard!" });
  };

  return (
    <div id="html-encoder" className="space-y-6 scroll-mt-20">
      <div>
        <label className="text-sm font-medium mb-2 block">Input</label>
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter text to encode or HTML entities to decode..."
          className="min-h-[150px] font-mono text-sm"
        />
      </div>

      <div className="flex gap-3">
        <Button onClick={encode} variant="default">
          <Code2 className="w-4 h-4 mr-2" />
          Encode HTML Entities
        </Button>
        <Button onClick={decode} variant="outline">
          Decode HTML Entities
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
        <h2 className="text-2xl font-bold mb-4">About HTML Encoder/Decoder</h2>
        <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
          <p>
            HTML encoding (also called HTML entity encoding) converts special characters into HTML entities that can be safely displayed on web pages. Characters like less-than (&lt;), greater-than (&gt;), and ampersand (&amp;) have special meaning in HTML. If you want to display these characters as text rather than have them interpreted as HTML code, they must be encoded. For example, &lt; becomes &amp;lt; and &gt; becomes &amp;gt;.
          </p>
          <p>
            Web developers use HTML encoding to prevent cross-site scripting (XSS) attacks, which occur when malicious code is injected into web pages. By encoding user input before displaying it, you ensure that HTML tags and JavaScript code are displayed as text rather than executed. This is crucial for any website that displays user-generated content like comments, forum posts, or reviews. Proper HTML encoding is a fundamental security practice.
          </p>
          <p>
            Content management systems automatically encode user input for security, but developers sometimes need to manually encode text when building email templates, generating HTML dynamically, or working with legacy systems. The encoder is also useful when you want to show HTML code examples on your website - you encode the HTML so visitors see the actual code rather than the rendered result. Tutorial websites and documentation platforms rely heavily on HTML encoding.
          </p>
          <p>
            Our tool handles the most common HTML entities including angle brackets, quotes, ampersands, and apostrophes. The decoder reverses the process, converting HTML entities back into their original characters. This is useful when you need to extract or process text that contains HTML entities. Both encoding and decoding happen instantly in your browser, so your data remains private and the tool works offline once loaded.
          </p>
        </div>
      </div>
    </div>
  );
};
