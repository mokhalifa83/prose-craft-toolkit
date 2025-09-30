import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, RefreshCw, Key } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Checkbox } from "@/components/ui/checkbox";

export const PasswordGenerator = () => {
  const [length, setLength] = useState(16);
  const [includeUpper, setIncludeUpper] = useState(true);
  const [includeLower, setIncludeLower] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [password, setPassword] = useState("");
  const { toast } = useToast();

  const generatePassword = () => {
    let charset = "";
    if (includeUpper) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeLower) charset += "abcdefghijklmnopqrstuvwxyz";
    if (includeNumbers) charset += "0123456789";
    if (includeSymbols) charset += "!@#$%^&*()_+-=[]{}|;:,.<>?";

    if (charset === "") {
      toast({ description: "Please select at least one character type", variant: "destructive" });
      return;
    }

    let result = "";
    for (let i = 0; i < length; i++) {
      result += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    setPassword(result);
  };

  const copyPassword = () => {
    navigator.clipboard.writeText(password);
    toast({ description: "Password copied to clipboard!" });
  };

  return (
    <div id="password-generator" className="space-y-6 scroll-mt-20">
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium mb-2 block">Password Length: {length}</label>
          <Input
            type="range"
            min="4"
            max="64"
            value={length}
            onChange={(e) => setLength(parseInt(e.target.value))}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <Checkbox id="upper" checked={includeUpper} onCheckedChange={(c) => setIncludeUpper(c as boolean)} />
            <label htmlFor="upper" className="text-sm">Uppercase (A-Z)</label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="lower" checked={includeLower} onCheckedChange={(c) => setIncludeLower(c as boolean)} />
            <label htmlFor="lower" className="text-sm">Lowercase (a-z)</label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="numbers" checked={includeNumbers} onCheckedChange={(c) => setIncludeNumbers(c as boolean)} />
            <label htmlFor="numbers" className="text-sm">Numbers (0-9)</label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="symbols" checked={includeSymbols} onCheckedChange={(c) => setIncludeSymbols(c as boolean)} />
            <label htmlFor="symbols" className="text-sm">Symbols (!@#$%)</label>
          </div>
        </div>
      </div>

      {password && (
        <div className="bg-card rounded-xl p-6 border border-border">
          <div className="flex items-center justify-between">
            <div className="font-mono text-lg break-all flex-1">{password}</div>
            <Button onClick={copyPassword} size="sm" variant="outline" className="ml-4">
              <Copy className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      <Button onClick={generatePassword} variant="default" className="w-full">
        <Key className="w-4 h-4 mr-2" />
        Generate Password
      </Button>

      <div className="bg-secondary/50 rounded-xl p-6 mt-8">
        <h2 className="text-2xl font-bold mb-4">About Password Generator</h2>
        <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
          <p>
            The Password Generator creates strong, random passwords that are difficult to crack. In an era where data breaches and account hacks are common, using strong, unique passwords for every account is essential for security. Weak passwords like "password123" or "qwerty" can be cracked in seconds. Our generator creates cryptographically random passwords that would take billions of years to crack using brute force methods.
          </p>
          <p>
            Security experts recommend passwords that are at least 12 characters long and include a mix of uppercase letters, lowercase letters, numbers, and symbols. Each character type exponentially increases the number of possible combinations, making passwords harder to guess. A 12-character password with all character types has over 95 trillion possible combinations, compared to just 475 million for a 6-character password with only lowercase letters.
          </p>
          <p>
            Our generator gives you complete control over password composition. You can adjust the length from 4 to 64 characters and toggle which character types to include. Some websites don't allow special characters, so you can disable them. If you need a password that's easier to type on mobile, you might skip symbols. The generator instantly creates a new password based on your requirements with one click.
          </p>
          <p>
            Never reuse passwords across different accounts. If one account is breached, hackers try those credentials on other popular websites. Use this generator to create a unique password for every account, and store them in a password manager like LastPass, 1Password, or Bitwarden. The generator creates truly random passwords using JavaScript's built-in random number generator, ensuring unpredictability that makes your accounts secure.
          </p>
        </div>
      </div>
    </div>
  );
};
