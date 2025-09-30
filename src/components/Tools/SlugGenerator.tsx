import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, Link } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const SlugGenerator = () => {
  const [text, setText] = useState("");
  const [slug, setSlug] = useState("");
  const { toast } = useToast();

  const generateSlug = () => {
    const generated = text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
    setSlug(generated);
  };

  const copySlug = () => {
    navigator.clipboard.writeText(slug);
    toast({ description: "Slug copied!" });
  };

  return (
    <div id="slug-generator" className="space-y-6 scroll-mt-20">
      <div className="space-y-4">
        <Input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text to convert to URL slug..."
        />
        <Button onClick={generateSlug} variant="default" className="w-full">
          <Link className="w-4 h-4 mr-2" />
          Generate Slug
        </Button>
      </div>

      {slug && (
        <div className="bg-card rounded-xl p-6 border border-border">
          <div className="flex items-center justify-between">
            <div className="font-mono text-lg flex-1">{slug}</div>
            <Button onClick={copySlug} size="sm" variant="outline" className="ml-4">
              <Copy className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      <div className="bg-secondary/50 rounded-xl p-6 mt-8">
        <h2 className="text-2xl font-bold mb-4">About Slug Generator</h2>
        <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
          <p>
            A slug is the URL-friendly version of a page title or headline, used to create clean, readable URLs. Instead of "example.com/page?id=123", a slug creates "example.com/best-chocolate-chip-cookies". Good slugs are lowercase, use hyphens instead of spaces, contain no special characters, and clearly describe the page content. Search engines prefer readable URLs, and users trust them more than cryptic parameter-based URLs.
          </p>
          <p>
            Content management systems like WordPress automatically generate slugs from post titles, but they often need manual cleanup. Bloggers use slug generators to create SEO-friendly URLs for articles. E-commerce sites use them for product pages. News websites use them for article URLs. Any website with multiple pages benefits from well-crafted slugs. They improve SEO, make URLs shareable, and help users understand page content before clicking.
          </p>
          <p>
            Our generator converts any text into a proper slug by converting to lowercase, replacing spaces with hyphens, removing special characters, and consolidating multiple hyphens. This creates clean, consistent URLs that follow SEO best practices. The tool handles punctuation, apostrophes, and other problematic characters automatically, ensuring your slugs work properly in browsers and don't break links.
          </p>
          <p>
            Good slug practices include keeping them short (3-5 words ideal), including target keywords, avoiding stop words (the, a, an) when possible, and never changing slugs after publication since it breaks existing links. The slug is one of the first things search engines look at to understand page content, so include your primary keyword. Use this tool whenever creating new web pages, blog posts, or products to ensure your URLs are optimized from the start.
          </p>
        </div>
      </div>
    </div>
  );
};
