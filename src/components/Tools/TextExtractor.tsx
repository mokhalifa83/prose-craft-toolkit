import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Link2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const TextExtractor = () => {
  const [text, setText] = useState("");
  const [extracted, setExtracted] = useState<string[]>([]);
  const { toast } = useToast();

  const extractEmails = () => {
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
    const emails = text.match(emailRegex) || [];
    setExtracted([...new Set(emails)]);
    toast({ description: `Found ${emails.length} email(s)` });
  };

  const extractURLs = () => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const urls = text.match(urlRegex) || [];
    setExtracted([...new Set(urls)]);
    toast({ description: `Found ${urls.length} URL(s)` });
  };

  const copyExtracted = () => {
    navigator.clipboard.writeText(extracted.join('\n'));
    toast({ description: "Extracted items copied!" });
  };

  return (
    <div id="text-extractor" className="space-y-6 scroll-mt-20">
      <div>
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste text containing emails or URLs..."
          className="min-h-[200px] font-mono text-sm"
        />
      </div>

      <div className="flex gap-3">
        <Button onClick={extractEmails} variant="default">
          Extract Emails
        </Button>
        <Button onClick={extractURLs} variant="default">
          <Link2 className="w-4 h-4 mr-2" />
          Extract URLs
        </Button>
      </div>

      {extracted.length > 0 && (
        <div className="bg-card rounded-xl p-6 border border-border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold">Extracted Items ({extracted.length})</h3>
            <Button onClick={copyExtracted} size="sm" variant="outline">
              <Copy className="w-4 h-4 mr-2" />
              Copy All
            </Button>
          </div>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {extracted.map((item, i) => (
              <div key={i} className="font-mono text-sm p-2 bg-secondary/50 rounded">
                {item}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="bg-secondary/50 rounded-xl p-6 mt-8">
        <h2 className="text-2xl font-bold mb-4">About Extract Emails/URLs Tool</h2>
        <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
          <p>
            The Text Extractor automatically finds and extracts all email addresses or URLs from any text. Instead of manually searching through documents or web pages to find contact information or links, this tool instantly identifies and lists them for you. It's perfect for extracting contact information from documents, gathering links from articles, or pulling email addresses from correspondence.
          </p>
          <p>
            Marketing professionals use this tool to extract email addresses from various sources to build contact lists. Researchers use it to gather URLs from papers for citation purposes. Content creators use it to find and organize links mentioned in articles. Web developers use it to audit pages for broken links. Sales teams use it to collect contact information from business documents and proposals.
          </p>
          <p>
            The email extractor recognizes standard email formats and automatically removes duplicates, giving you a clean list of unique addresses. It handles various email formats including those with numbers, underscores, hyphens, and plus signs. The URL extractor finds both HTTP and HTTPS links, making it easy to collect web addresses from any text source. Both extractors preserve the original format while removing duplicates.
          </p>
          <p>
            The tool displays extracted items in an easy-to-read format and lets you copy all results with one click. This is much faster than manually copying each email or URL individually. The extracted list shows you exactly how many items were found, helping you verify the extraction was thorough. Whether you're processing a short paragraph or a lengthy document, the extraction happens instantly.
          </p>
        </div>
      </div>
    </div>
  );
};
