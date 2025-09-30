import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { GitCompare } from "lucide-react";

export const TextDiff = () => {
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");

  const getDifferences = () => {
    const lines1 = text1.split('\n');
    const lines2 = text2.split('\n');
    const maxLines = Math.max(lines1.length, lines2.length);
    
    const diffs = [];
    for (let i = 0; i < maxLines; i++) {
      const line1 = lines1[i] || '';
      const line2 = lines2[i] || '';
      if (line1 !== line2) {
        diffs.push({ line: i + 1, text1: line1, text2: line2 });
      }
    }
    return diffs;
  };

  const differences = getDifferences();

  return (
    <div id="text-diff" className="space-y-6 scroll-mt-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium mb-2 block">Original Text</label>
          <Textarea
            value={text1}
            onChange={(e) => setText1(e.target.value)}
            placeholder="Paste original text..."
            className="min-h-[200px] font-mono text-sm"
          />
        </div>
        <div>
          <label className="text-sm font-medium mb-2 block">Modified Text</label>
          <Textarea
            value={text2}
            onChange={(e) => setText2(e.target.value)}
            placeholder="Paste modified text..."
            className="min-h-[200px] font-mono text-sm"
          />
        </div>
      </div>

      {differences.length > 0 ? (
        <div className="bg-card rounded-xl p-6 border border-border">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <GitCompare className="w-5 h-5 text-primary" />
            Found {differences.length} difference(s)
          </h3>
          <div className="space-y-4">
            {differences.map((diff, i) => (
              <div key={i} className="border border-border rounded-lg p-4">
                <div className="text-sm text-muted-foreground mb-2">Line {diff.line}</div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div className="bg-red-500/10 border border-red-500/20 rounded p-2">
                    <div className="text-xs text-red-500 mb-1">Original</div>
                    <div className="font-mono text-sm">{diff.text1 || '(empty)'}</div>
                  </div>
                  <div className="bg-green-500/10 border border-green-500/20 rounded p-2">
                    <div className="text-xs text-green-500 mb-1">Modified</div>
                    <div className="font-mono text-sm">{diff.text2 || '(empty)'}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : text1 || text2 ? (
        <div className="bg-card rounded-xl p-6 border border-border text-center">
          <p className="text-muted-foreground">No differences found. The texts are identical!</p>
        </div>
      ) : null}

      <div className="bg-secondary/50 rounded-xl p-6 mt-8">
        <h2 className="text-2xl font-bold mb-4">About Text Compare Tool</h2>
        <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
          <p>
            The Text Compare tool (also called a diff tool) highlights the differences between two versions of text. It compares them line by line and shows you exactly what changed, what was added, and what was removed. This is essential for reviewing edits, tracking document changes, comparing versions, or verifying that text was copied correctly. Instead of reading through both versions manually, you see the differences instantly highlighted.
          </p>
          <p>
            Writers use this tool to see what changes editors made to their work. Developers use it to compare code snippets or configuration files. Content managers use it to track changes in website copy or product descriptions. Legal professionals use it to compare contract versions. Students use it to see how they revised their essays. Anyone who needs to understand what changed between two text versions benefits from this tool.
          </p>
          <p>
            The tool displays differences in an easy-to-understand format with color coding. Lines that differ are shown side by side, with the original on the left in red and the modified version on the right in green. This makes it immediately obvious what content was changed. Empty lines are clearly marked so you can see where content was added or removed. The line numbers help you reference specific changes.
          </p>
          <p>
            Text comparison is particularly valuable when multiple people are working on the same document. You can paste the original version and the edited version to see exactly what contributions were made. The tool handles documents of any length and finds every single difference, no matter how minor. This ensures nothing slips through the cracks when reviewing changes to important documents.
          </p>
        </div>
      </div>
    </div>
  );
};
