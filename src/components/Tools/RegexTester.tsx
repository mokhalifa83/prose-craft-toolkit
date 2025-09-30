import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Code } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

export const RegexTester = () => {
  const [pattern, setPattern] = useState("");
  const [flags, setFlags] = useState({ g: true, i: false, m: false });
  const [testString, setTestString] = useState("");
  const [matches, setMatches] = useState<string[]>([]);

  const testRegex = () => {
    try {
      const flagString = Object.entries(flags)
        .filter(([_, v]) => v)
        .map(([k, _]) => k)
        .join('');
      
      const regex = new RegExp(pattern, flagString);
      const found = testString.match(regex) || [];
      setMatches(Array.from(found));
    } catch (error) {
      setMatches(['Invalid regex pattern']);
    }
  };

  return (
    <div id="regex-tester" className="space-y-6 scroll-mt-20">
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium mb-2 block">Regular Expression</label>
          <Input
            value={pattern}
            onChange={(e) => setPattern(e.target.value)}
            placeholder="Enter regex pattern (e.g., \d{3}-\d{4})"
            className="font-mono"
          />
        </div>

        <div className="flex gap-4">
          <div className="flex items-center space-x-2">
            <Checkbox id="g" checked={flags.g} onCheckedChange={(c) => setFlags({...flags, g: c as boolean})} />
            <label htmlFor="g" className="text-sm">Global (g)</label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="i" checked={flags.i} onCheckedChange={(c) => setFlags({...flags, i: c as boolean})} />
            <label htmlFor="i" className="text-sm">Ignore Case (i)</label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="m" checked={flags.m} onCheckedChange={(c) => setFlags({...flags, m: c as boolean})} />
            <label htmlFor="m" className="text-sm">Multiline (m)</label>
          </div>
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">Test String</label>
          <Textarea
            value={testString}
            onChange={(e) => setTestString(e.target.value)}
            placeholder="Enter text to test against the pattern..."
            className="min-h-[100px] font-mono text-sm"
          />
        </div>

        <Button onClick={testRegex} variant="default" className="w-full">
          <Code className="w-4 h-4 mr-2" />
          Test Regex
        </Button>
      </div>

      {matches.length > 0 && (
        <div className="bg-card rounded-xl p-6 border border-border">
          <h3 className="text-lg font-bold mb-4">Matches ({matches.length})</h3>
          <div className="space-y-2">
            {matches.map((match, i) => (
              <div key={i} className="font-mono text-sm p-2 bg-secondary/50 rounded">
                {match}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="bg-secondary/50 rounded-xl p-6 mt-8">
        <h2 className="text-2xl font-bold mb-4">About Regex Tester</h2>
        <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
          <p>
            Regular expressions (regex) are powerful patterns used to match, search, and manipulate text. The Regex Tester lets you test regex patterns against sample text to see what they match before using them in code. Regular expressions are notoriously tricky to get right - a small mistake can match nothing, match too much, or cause performance issues. Testing patterns interactively saves hours of debugging and ensures your regex works as intended.
          </p>
          <p>
            Developers use regex testers constantly when writing validation rules, parsing logs, extracting data, or performing text transformations. Regex is essential for validating email addresses, phone numbers, URLs, and other formatted data. It's used in search-and-replace operations, data cleaning, log analysis, and text processing. Any programmer working with strings needs to understand and test regex patterns regularly.
          </p>
          <p>
            Our tester supports common regex flags: Global (g) finds all matches instead of stopping at the first, Ignore Case (i) makes matching case-insensitive, and Multiline (m) allows ^ and $ to match line starts and ends rather than just string boundaries. These flags dramatically change regex behavior, so testing with different flag combinations ensures your pattern works in all scenarios.
          </p>
          <p>
            The tool shows all matches found in your test string, helping you verify your pattern catches everything it should and nothing it shouldn't. This visual feedback is invaluable when learning regex or debugging complex patterns. Common regex uses include validating emails (/^\S+@\S+\.\S+$/), phone numbers (/\d{3}-\d{3}-\d{4}/), dates, URLs, and extracting specific data from text. Master regex and you'll save countless hours on text processing tasks.
          </p>
        </div>
      </div>
    </div>
  );
};
