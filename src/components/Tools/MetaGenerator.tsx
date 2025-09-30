import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Tag } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const MetaGenerator = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [keywords, setKeywords] = useState("");
  const [url, setUrl] = useState("");
  const { toast } = useToast();

  const generateMeta = () => {
    return `<!-- Primary Meta Tags -->
<title>${title}</title>
<meta name="title" content="${title}">
<meta name="description" content="${description}">
<meta name="keywords" content="${keywords}">

<!-- Open Graph / Facebook -->
<meta property="og:type" content="website">
<meta property="og:url" content="${url}">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${description}">

<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image">
<meta property="twitter:url" content="${url}">
<meta property="twitter:title" content="${title}">
<meta property="twitter:description" content="${description}">`;
  };

  const copyMeta = () => {
    navigator.clipboard.writeText(generateMeta());
    toast({ description: "Meta tags copied!" });
  };

  return (
    <div id="meta-generator" className="space-y-6 scroll-mt-20">
      <div className="space-y-4">
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Page title (50-60 characters)"
          maxLength={60}
        />
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Page description (150-160 characters)"
          maxLength={160}
          className="min-h-[80px]"
        />
        <Input
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
          placeholder="Keywords (comma-separated)"
        />
        <Input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Page URL"
        />
      </div>

      {title && description && (
        <div className="bg-card rounded-xl p-6 border border-border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold">Generated Meta Tags</h3>
            <Button onClick={copyMeta} size="sm" variant="outline">
              <Copy className="w-4 h-4 mr-2" />
              Copy
            </Button>
          </div>
          <pre className="text-xs font-mono whitespace-pre-wrap bg-secondary/50 p-4 rounded overflow-x-auto">
            {generateMeta()}
          </pre>
        </div>
      )}

      <div className="bg-secondary/50 rounded-xl p-6 mt-8">
        <h2 className="text-2xl font-bold mb-4">About Meta Tag Generator</h2>
        <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
          <p>
            Meta tags are HTML elements that provide information about your web page to search engines and social media platforms. The Meta Tag Generator creates properly formatted meta tags including title tags, meta descriptions, keywords, and Open Graph tags for social media sharing. These tags don't appear on the page itself but are crucial for SEO and how your content appears in search results and social media shares.
          </p>
          <p>
            The title tag is one of the most important SEO elements, appearing as the clickable headline in search results. It should be 50-60 characters to avoid truncation. The meta description is the text snippet shown below the title in search results, influencing click-through rates. While it doesn't directly affect rankings, a compelling description increases traffic. Open Graph tags control how your page looks when shared on Facebook, LinkedIn, and other social platforms.
          </p>
          <p>
            Web developers use meta tag generators when building new websites or optimizing existing ones. Digital marketers use them to ensure every page has proper SEO metadata. Content creators use them when publishing blog posts and articles. Small business owners use them to optimize their website pages without needing deep technical knowledge. Proper meta tags are essential for any website that wants to be found through search engines.
          </p>
          <p>
            Our generator creates complete meta tag sets including social media tags for maximum compatibility. The generated code is ready to paste into the head section of your HTML. The tool reminds you of optimal character lengths for titles and descriptions, helping you stay within best practices. Remember to create unique meta tags for each page on your website - duplicate meta descriptions hurt SEO and don't help users distinguish between different pages in search results.
          </p>
        </div>
      </div>
    </div>
  );
};
