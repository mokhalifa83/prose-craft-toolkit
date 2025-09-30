import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy, User, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const UsernameGenerator = () => {
  const [usernames, setUsernames] = useState<string[]>([]);
  const { toast } = useToast();

  const adjectives = ["Cool", "Swift", "Brave", "Dark", "Golden", "Silent", "Epic", "Mystic", "Thunder", "Crystal", "Shadow", "Cosmic", "Turbo", "Neon", "Cyber"];
  const nouns = ["Tiger", "Dragon", "Phoenix", "Wolf", "Eagle", "Ninja", "Wizard", "Knight", "Hunter", "Warrior", "Legend", "Master", "Champion", "Hero", "Storm"];

  const generateUsernames = () => {
    const generated = [];
    for (let i = 0; i < 10; i++) {
      const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
      const noun = nouns[Math.floor(Math.random() * nouns.length)];
      const num = Math.floor(Math.random() * 999);
      generated.push(`${adj}${noun}${num}`);
    }
    setUsernames(generated);
  };

  const copyUsername = (username: string) => {
    navigator.clipboard.writeText(username);
    toast({ description: "Username copied!" });
  };

  return (
    <div id="username-generator" className="space-y-6 scroll-mt-20">
      <Button onClick={generateUsernames} variant="default" className="w-full">
        <RefreshCw className="w-4 h-4 mr-2" />
        Generate Usernames
      </Button>

      {usernames.length > 0 && (
        <div className="bg-card rounded-xl p-6 border border-border">
          <h3 className="text-lg font-bold mb-4">Generated Usernames</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {usernames.map((username, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                <span className="font-mono">{username}</span>
                <Button onClick={() => copyUsername(username)} size="sm" variant="ghost">
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="bg-secondary/50 rounded-xl p-6 mt-8">
        <h2 className="text-2xl font-bold mb-4">About Username Generator</h2>
        <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
          <p>
            The Username Generator creates unique, memorable usernames for social media accounts, gaming profiles, forums, and online services. Coming up with a good username can be surprisingly difficult - the names you want are often taken, and you need something that's both memorable and represents you well. This tool generates creative username suggestions by combining cool adjectives with powerful nouns and optional numbers.
          </p>
          <p>
            Gamers use username generators when creating new gaming accounts across platforms like Xbox, PlayStation, Steam, or Discord. Social media users use them when their preferred username is taken and they need alternatives. Developers use them to create test accounts during application development. Parents use them to help kids create appropriate usernames for safe online experiences. Content creators use them when establishing a brand identity across multiple platforms.
          </p>
          <p>
            Our generator creates usernames that are easy to remember, pronounce, and type. The combination of an adjective and noun creates a mental image that sticks in people's minds - names like "CrystalWolf" or "ThunderNinja" are much more memorable than random letter combinations. Adding numbers at the end helps ensure uniqueness while keeping the name recognizable. All generated usernames follow platform naming conventions and avoid special characters that might not be allowed.
          </p>
          <p>
            Each generation creates 10 unique username suggestions, giving you plenty of options to choose from. If you don't like the first batch, simply generate again for 10 more completely different options. The tool uses a curated selection of words that sound good together and create usernames with personality. Whether you need something cool, mysterious, powerful, or unique, the generator creates options that fit various styles and preferences.
          </p>
        </div>
      </div>
    </div>
  );
};
