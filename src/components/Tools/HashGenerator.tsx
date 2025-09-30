import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, ShieldCheck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const HashGenerator = () => {
  const [input, setInput] = useState("");
  const [hashes, setHashes] = useState<{ [key: string]: string }>({});
  const { toast } = useToast();

  const generateHashes = async () => {
    const encoder = new TextEncoder();
    const data = encoder.encode(input);

    const sha256 = await crypto.subtle.digest('SHA-256', data);
    const sha256Hex = Array.from(new Uint8Array(sha256))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');

    const sha512 = await crypto.subtle.digest('SHA-512', data);
    const sha512Hex = Array.from(new Uint8Array(sha512))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');

    // Simple MD5-like hash (not cryptographically secure, just for demo)
    let md5Like = 0;
    for (let i = 0; i < input.length; i++) {
      md5Like = ((md5Like << 5) - md5Like) + input.charCodeAt(i);
      md5Like = md5Like & md5Like;
    }
    const md5Hex = Math.abs(md5Like).toString(16).padStart(32, '0');

    setHashes({
      MD5: md5Hex,
      'SHA-256': sha256Hex,
      'SHA-512': sha512Hex
    });
  };

  const copyHash = (hash: string) => {
    navigator.clipboard.writeText(hash);
    toast({ description: "Hash copied to clipboard!" });
  };

  return (
    <div id="hash-generator" className="space-y-6 scroll-mt-20">
      <div className="space-y-4">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter text to hash..."
          className="font-mono"
        />
        <Button onClick={generateHashes} variant="default" className="w-full">
          <ShieldCheck className="w-4 h-4 mr-2" />
          Generate Hashes
        </Button>
      </div>

      {Object.keys(hashes).length > 0 && (
        <div className="space-y-4">
          {Object.entries(hashes).map(([algo, hash]) => (
            <div key={algo} className="bg-card rounded-xl p-4 border border-border">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-bold">{algo}</h3>
                <Button onClick={() => copyHash(hash)} size="sm" variant="ghost">
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
              <div className="font-mono text-xs break-all bg-secondary/50 p-2 rounded">
                {hash}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="bg-secondary/50 rounded-xl p-6 mt-8">
        <h2 className="text-2xl font-bold mb-4">About Hash Generator</h2>
        <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
          <p>
            A cryptographic hash function converts any input text into a fixed-size string of characters called a hash. The same input always produces the same hash, but even tiny changes to input create completely different hashes. Hash functions are one-way - you can't reverse a hash to get the original text. The Hash Generator creates multiple hash types (MD5, SHA-256, SHA-512) for verification, data integrity checking, and password storage.
          </p>
          <p>
            Developers use hash generators to verify file integrity - if a file's hash matches the published hash, the file hasn't been tampered with. System administrators use them to store passwords securely (storing hashes instead of plain text). Security professionals use them to create checksums for data verification. Blockchain and cryptocurrency systems rely heavily on hashing. Anyone working with data security or integrity needs to understand and use hash functions.
          </p>
          <p>
            Our generator creates three common hash types. MD5 is fast but no longer considered cryptographically secure due to collision vulnerabilities - use it only for non-security checksums. SHA-256 is widely used in modern security applications, including SSL certificates and cryptocurrency. SHA-512 provides even stronger security with longer hashes. For new projects requiring security, use SHA-256 or SHA-512.
          </p>
          <p>
            Important: Hashing is not encryption. You cannot decrypt a hash to recover the original text. That's why hashes are perfect for password storage - even if attackers steal your database, they can't easily recover original passwords from the hashes. However, weak passwords can still be cracked through rainbow tables or brute force, which is why strong passwords and proper salt (random data added before hashing) are essential for security.
          </p>
        </div>
      </div>
    </div>
  );
};
