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
    <footer className="border-t border-border/50 bg-gradient-to-b from-background to-card mt-24">
      <div className="container mx-auto px-4 py-16">
        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-bold text-foreground mb-3">TextToolbox</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Your comprehensive suite of free text manipulation and analysis tools for writers, developers, and SEO professionals.
            </p>
          </div>

          {/* Tool Categories - Organized into 3 columns */}
          <div className="lg:col-span-3 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {Object.entries(footerLinks).slice(0, -1).map(([category, links]) => (
              <div key={category}>
                <h3 className="font-semibold text-sm uppercase tracking-wider mb-4 text-foreground/90">
                  {category}
                </h3>
                <ul className="space-y-2.5">
                  {links.map((link) => (
                    <li key={link.href}>
                      {link.href.startsWith("/#") ? (
                        <Link
                          to={`/?tool=${link.href.replace("/#", "")}`}
                          className="text-sm text-muted-foreground hover:text-primary transition-colors inline-block"
                        >
                          {link.name}
                        </Link>
                      ) : (
                        <Link
                          to={link.href}
                          className="text-sm text-muted-foreground hover:text-primary transition-colors inline-block"
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
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border/50 pt-8">
          <div className="flex flex-col items-center gap-6">
            <div className="flex flex-wrap justify-center gap-6">
              {footerLinks.Company.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              © 2025 TextToolbox. All rights reserved. Crafted by{" "}
              <a
                href="https://www.facebook.com/moekhalifa8"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 font-medium transition-colors"
              >
                Mohamed Khalifa
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};