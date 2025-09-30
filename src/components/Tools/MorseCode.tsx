import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Radio } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const MorseCode = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const { toast } = useToast();

  const morseCode: { [key: string]: string } = {
    'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.', 
    'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
    'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
    'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
    'Y': '-.--', 'Z': '--..', '0': '-----', '1': '.----', '2': '..---',
    '3': '...--', '4': '....-', '5': '.....', '6': '-....', '7': '--...',
    '8': '---..', '9': '----.', ' ': '/'
  };

  const reverseMorse = Object.fromEntries(
    Object.entries(morseCode).map(([k, v]) => [v, k])
  );

  const encode = () => {
    const encoded = input
      .toUpperCase()
      .split('')
      .map(char => morseCode[char] || char)
      .join(' ');
    setOutput(encoded);
  };

  const decode = () => {
    const decoded = input
      .split(' ')
      .map(code => reverseMorse[code] || code)
      .join('');
    setOutput(decoded);
  };

  const copyOutput = () => {
    navigator.clipboard.writeText(output);
    toast({ description: "Copied to clipboard!" });
  };

  return (
    <div id="morse-code" className="space-y-6 scroll-mt-20">
      <div>
        <label className="text-sm font-medium mb-2 block">Input</label>
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter text to encode or Morse code to decode..."
          className="min-h-[150px] font-mono text-sm"
        />
      </div>

      <div className="flex gap-3">
        <Button onClick={encode} variant="default">
          <Radio className="w-4 h-4 mr-2" />
          Encode to Morse
        </Button>
        <Button onClick={decode} variant="outline">
          Decode from Morse
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
        <h2 className="text-2xl font-bold mb-4">About Morse Code Translator</h2>
        <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
          <p>
            Morse code is a method of encoding text characters using sequences of dots (.) and dashes (-), developed in the 1830s for telegraph communication. Each letter, number, and some punctuation marks have a unique pattern. For example, SOS - the international distress signal - is ... --- ... in Morse code. While telegraph use has declined, Morse code remains relevant in aviation, amateur radio, assistive technology, and as a fun encoding method.
          </p>
          <p>
            Amateur radio operators (ham radio enthusiasts) still use Morse code for long-distance communication, especially in poor conditions where voice wouldn't work. Pilots use Morse code identifiers for navigation beacons. People with disabilities sometimes use Morse code as an assistive communication method when other options aren't viable. The military uses it for silent communication. Escape rooms and puzzle games often incorporate Morse code challenges.
          </p>
          <p>
            Our translator handles both encoding and decoding. Type regular text to convert it into Morse code dots and dashes, or paste Morse code (with spaces between letters) to decode it back into readable text. The tool uses spaces between letters and forward slashes (/) to separate words. This standard notation makes the output easy to read and transmit, whether you're actually using it for communication or just exploring this historic encoding method.
          </p>
          <p>
            Learning Morse code can be a fun hobby and a practical skill. In emergencies, knowing even basic Morse code like SOS can be lifesaving if you need to signal for help using light, sound, or any on-off pattern. The simple binary nature of Morse code (short or long signals) makes it remarkably robust and suitable for improvised communication methods. Many people learn it as a mental exercise or to connect with the history of telecommunications.
          </p>
        </div>
      </div>
    </div>
  );
};
