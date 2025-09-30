import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Minimize } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const CSSMinifier = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const { toast } = useToast();

  const minifyCSS = () => {
    const minified = input
      .replace(/\/\*[\s\S]*?\*\//g, '') // Remove comments
      .replace(/\s+/g, ' ') // Replace multiple spaces with single space
      .replace(/\s*([{}:;,])\s*/g, '$1') // Remove spaces around special characters
      .replace(/;}/g, '}') // Remove last semicolon in block
      .trim();
    
    setOutput(minified);
    
    const originalSize = new Blob([input]).size;
    const minifiedSize = new Blob([minified]).size;
    const saved = originalSize - minifiedSize;
    const percent = ((saved / originalSize) * 100).toFixed(1);
    
    toast({ description: `Reduced by ${saved} bytes (${percent}%)` });
  };

  const copyOutput = () => {
    navigator.clipboard.writeText(output);
    toast({ description: "Minified CSS copied!" });
  };

  return (
    <div id="css-minifier" className="space-y-6 scroll-mt-20">
      <div>
        <label className="text-sm font-medium mb-2 block">Input CSS</label>
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste your CSS here..."
          className="min-h-[200px] font-mono text-sm"
        />
      </div>

      <Button onClick={minifyCSS} variant="default" className="w-full">
        <Minimize className="w-4 h-4 mr-2" />
        Minify CSS
      </Button>

      {output && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium">Minified CSS</label>
            <Button onClick={copyOutput} size="sm" variant="outline">
              <Copy className="w-4 h-4 mr-2" />
              Copy
            </Button>
          </div>
          <Textarea
            value={output}
            readOnly
            className="min-h-[200px] font-mono text-sm bg-secondary"
          />
        </div>
      )}

      <div className="bg-secondary/50 rounded-xl p-6 mt-8">
        <h2 className="text-2xl font-bold mb-4">About CSS Minifier</h2>
        <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
          <p>
            CSS minification removes unnecessary characters from CSS files without changing functionality. It eliminates whitespace, removes comments, shortens color codes, and optimizes syntax to create the smallest possible file size. Smaller CSS files load faster, reducing page load times and bandwidth usage. For high-traffic websites, even small file size reductions can translate to significant savings in bandwidth costs and improved user experience.
          </p>
          <p>
            Web developers minify CSS before deploying to production servers. Performance optimization specialists use it to reduce page load times. Frontend engineers use it as part of build processes. Anyone optimizing website performance benefits from minified CSS. While modern build tools often handle minification automatically, this manual tool is useful for quick optimization of small files, testing performance improvements, or working with legacy projects.
          </p>
          <p>
            The minifier removes all comments, collapses whitespace, removes unnecessary semicolons, and compresses the code into the most compact form possible while maintaining functionality. A typical CSS file can be reduced by 20-40% through minification. The tool shows exactly how many bytes were saved and the percentage reduction, helping you understand the performance impact. Every byte saved means faster page loads for users.
          </p>
          <p>
            While minified CSS is harder for humans to read, that's intentional - production code should prioritize performance over readability. Always keep your original, formatted CSS files for development and editing. Use the minified version only for production deployment. The tool processes CSS entirely in your browser, so your code stays private. This is important when working with proprietary designs or client projects that shouldn't be exposed to external servers.
          </p>
        </div>
      </div>
    </div>
  );
};
