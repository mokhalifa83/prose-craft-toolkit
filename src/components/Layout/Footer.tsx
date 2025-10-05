import { Link } from "react-router-dom";

const footerLinks = {
  "Text Analysis Tools": [
    { name: "Word Counter", href: "/#word-counter" },
    { name: "Character Counter", href: "/#character-counter" },
    { name: "Reading Time Calculator", href: "/#reading-time" },
    { name: "Keyword Density Checker", href: "/#keyword-density" },
    { name: "Word Frequency Counter", href: "/#word-frequency" },
    { name: "Sentence Counter", href: "/#sentence-counter" },
  ],
  "Text Formatting Tools": [
    { name: "Case Converter", href: "/#case-converter" },
    { name: "Text Cleaner", href: "/#text-cleaner" },
    { name: "Line Sorter", href: "/#line-sorter" },
    { name: "Reverse Text", href: "/#reverse-text" },
  ],
  "Text Manipulation": [
    { name: "Find & Replace", href: "/#find-replace" },
    { name: "Remove Duplicates", href: "/#duplicate-remover" },
    { name: "Extract Emails/URLs", href: "/#text-extractor" },
    { name: "Text Compare", href: "/#text-diff" },
  ],
  "Generators": [
    { name: "Lorem Ipsum", href: "/#lorem-generator" },
    { name: "Password Generator", href: "/#password-generator" },
    { name: "Username Generator", href: "/#username-generator" },
    { name: "Random Text", href: "/#random-text" },
  ],
  "Encoders & Decoders": [
    { name: "Base64 Encoder", href: "/#base64-encoder" },
    { name: "URL Encoder", href: "/#url-encoder" },
    { name: "HTML Encoder", href: "/#html-encoder" },
    { name: "Morse Code", href: "/#morse-code" },
  ],
  "SEO Tools": [
    { name: "Meta Tag Generator", href: "/#meta-generator" },
    { name: "Slug Generator", href: "/#slug-generator" },
    { name: "Hashtag Generator", href: "/#hashtag-generator" },
    { name: "Title Analyzer", href: "/#title-analyzer" },
  ],
  "Developer Tools": [
    { name: "JSON Formatter", href: "/#json-formatter" },
    { name: "CSS Minifier", href: "/#css-minifier" },
    { name: "Regex Tester", href: "/#regex-tester" },
    { name: "Hash Generator", href: "/#hash-generator" },
  ],
  "Writing Tools": [
    { name: "Readability Score", href: "/#readability-score" },
    { name: "Text Summarizer", href: "/#text-summarizer" },
  ],
  "Company": [
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
  ],
};

export const Footer = () => {
  return (
    <footer className="border-t border-border bg-card mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-8">
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-semibold text-sm mb-4 text-foreground">
                {category}
              </h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    {link.href.startsWith("/#") ? (
                      <button
                        onClick={() => {
                          const toolId = link.href.replace("/#", "");
                          window.dispatchEvent(new CustomEvent('openTool', { detail: { toolId } }));
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors text-left"
                      >
                        {link.name}
                      </button>
                    ) : (
                      <Link
                        to={link.href}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        {link.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>
            Crafted by{" "}
            <a
              href="https://www.facebook.com/moekhalifa8"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline font-medium"
            >
              Mohamed Khalifa
            </a>
            {" "} | © 2025 TextToolbox. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};