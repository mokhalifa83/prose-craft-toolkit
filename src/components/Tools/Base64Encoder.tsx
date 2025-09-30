import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Copy, RotateCcw, Code } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const Base64Encoder = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const { toast } = useToast();

  const encode = () => {
    try {
      const encoded = btoa(input);
      setOutput(encoded);
    } catch (error) {
      toast({ description: "Encoding error. Check your input.", variant: "destructive" });
    }
  };

  const decode = () => {
    try {
      const decoded = atob(input);
      setOutput(decoded);
    } catch (error) {
      toast({ description: "Decoding error. Invalid Base64 string.", variant: "destructive" });
    }
  };

  const copyOutput = () => {
    navigator.clipboard.writeText(output);
    toast({ description: "Copied to clipboard!" });
  };

  return (
    <div id="base64-encoder" className="space-y-6 scroll-mt-20">
      <div>
        <label className="text-sm font-medium mb-2 block">Input</label>
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter text to encode or Base64 to decode..."
          className="min-h-[150px] font-mono text-sm"
        />
      </div>

      <div className="flex gap-3">
        <Button onClick={encode} variant="default">
          <Code className="w-4 h-4 mr-2" />
          Encode to Base64
        </Button>
        <Button onClick={decode} variant="outline">
          Decode from Base64
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
        <h2 className="text-2xl font-bold mb-4">About Base64 Encoder/Decoder</h2>
        <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
          <p>
            Base64 encoding converts text or binary data into a format that can be safely transmitted over systems designed to handle text. It represents binary data using 64 printable ASCII characters (A-Z, a-z, 0-9, +, /), making it possible to send images, files, and special characters through systems that only support text, like email or JSON APIs. While it increases data size by about 33%, it ensures compatibility across different systems.
          </p>
          <p>
            Developers use Base64 encoding extensively in web development. Embedding images directly in HTML or CSS using data URIs requires Base64 encoding. Sending binary files through JSON APIs requires Base64 encoding since JSON doesn't support binary data. Email attachments are often Base64 encoded for transmission. Authentication tokens and API keys are frequently Base64 encoded for safe transmission in HTTP headers.
          </p>
          <p>
            Our tool provides instant encoding and decoding in both directions. Paste regular text to encode it into Base64 format, or paste Base64 data to decode it back into readable text. The tool handles the conversion instantly without any server uploads, meaning your data stays completely private in your browser. This is especially important when encoding sensitive information like API keys or authentication tokens.
          </p>
          <p>
            It's important to note that Base64 is encoding, not encryption. It makes data unreadable at a glance, but anyone can easily decode it. Never use Base64 alone to protect sensitive information - it's for data transmission compatibility, not security. For actual encryption, use proper cryptographic methods. Base64 is perfect for embedding small images in CSS, transmitting data through APIs, or storing complex data in cookies and local storage.
          </p>
        </div>
      </div>
    </div>
  );
};
