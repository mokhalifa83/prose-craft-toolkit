import { useState } from "react";
import { Moon, Sun, Wrench, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const toolCategories = {
  "Text Analysis": [
    { name: "Word Counter", id: "word-counter" },
    { name: "Character Counter", id: "character-counter" },
    { name: "Reading Time", id: "reading-time" },
    { name: "Keyword Density", id: "keyword-density" },
    { name: "Word Frequency", id: "word-frequency" },
    { name: "Sentence Counter", id: "sentence-counter" },
  ],
  "Text Formatting": [
    { name: "Case Converter", id: "case-converter" },
    { name: "Text Cleaner", id: "text-cleaner" },
    { name: "Line Sorter", id: "line-sorter" },
    { name: "Reverse Text", id: "reverse-text" },
    { name: "Find & Replace", id: "find-replace" },
    { name: "Duplicate Remover", id: "duplicate-remover" },
  ],
  "Generators": [
    { name: "Lorem Ipsum", id: "lorem-generator" },
    { name: "Password Generator", id: "password-generator" },
    { name: "Random Text", id: "random-text" },
    { name: "Username Generator", id: "username-generator" },
    { name: "Hashtag Generator", id: "hashtag-generator" },
  ],
  "Encoders & Decoders": [
    { name: "Base64 Encoder", id: "base64-encoder" },
    { name: "URL Encoder", id: "url-encoder" },
    { name: "HTML Encoder", id: "html-encoder" },
    { name: "Morse Code", id: "morse-code" },
    { name: "Hash Generator", id: "hash-generator" },
  ],
  "SEO Tools": [
    { name: "Meta Generator", id: "meta-generator" },
    { name: "Slug Generator", id: "slug-generator" },
    { name: "Readability Score", id: "readability-score" },
    { name: "Title Analyzer", id: "title-analyzer" },
  ],
  "Developer Tools": [
    { name: "JSON Formatter", id: "json-formatter" },
    { name: "CSS Minifier", id: "css-minifier" },
    { name: "Regex Tester", id: "regex-tester" },
    { name: "Text Extractor", id: "text-extractor" },
    { name: "Text Diff", id: "text-diff" },
    { name: "Text Summarizer", id: "text-summarizer" },
  ],
};

export const Header = () => {
  const { theme, setTheme } = useTheme();

  const handleToolClick = (toolId: string) => {
    // Navigate to home if not already there
    if (window.location.pathname !== '/') {
      window.location.href = '/?tool=' + toolId;
    } else {
      // Dispatch custom event to open tool
      window.dispatchEvent(new CustomEvent('openTool', { detail: { toolId } }));
    }
  };

  return (
    <header className="sticky top-0 z-50 glass-card border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2">
            <Wrench className="w-7 h-7 text-primary" />
            <span className="text-2xl font-extrabold gradient-text">
              TextToolbox
            </span>
          </Link>
          
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              {Object.entries(toolCategories).map(([category, tools]) => (
                <NavigationMenuItem key={category}>
                  <NavigationMenuTrigger className="bg-transparent hover:bg-primary/10 text-foreground">
                    {category}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      {tools.map((tool) => (
                        <button
                          key={tool.name}
                          onClick={() => handleToolClick(tool.id)}
                          className="block select-none space-y-1 rounded-lg p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground text-left w-full"
                        >
                          <div className="text-sm font-medium leading-none">
                            {tool.name}
                          </div>
                        </button>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ))}
              
              <NavigationMenuItem>
                <Link
                  to="/blog"
                  className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-primary/10 hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                >
                  Blog
                </Link>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <Link
                  to="/about"
                  className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-primary/10 hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                >
                  About
                </Link>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <Link
                  to="/contact"
                  className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-primary/10 hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                >
                  Contact
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="rounded-xl hover:bg-primary/10 hover:text-primary transition-all"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};