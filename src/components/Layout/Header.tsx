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
    { name: "Word Counter", path: "/" },
    { name: "Character Counter", path: "/" },
    { name: "Reading Time", path: "/" },
    { name: "Keyword Density", path: "/" },
    { name: "Word Frequency", path: "/" },
    { name: "Sentence Counter", path: "/" },
  ],
  "Text Formatting": [
    { name: "Case Converter", path: "/" },
    { name: "Text Cleaner", path: "/" },
    { name: "Line Sorter", path: "/" },
    { name: "Reverse Text", path: "/" },
    { name: "Find & Replace", path: "/" },
    { name: "Duplicate Remover", path: "/" },
  ],
  "Generators": [
    { name: "Lorem Ipsum", path: "/" },
    { name: "Password Generator", path: "/" },
    { name: "Random Text", path: "/" },
    { name: "Username Generator", path: "/" },
    { name: "Hashtag Generator", path: "/" },
  ],
  "Encoders & Decoders": [
    { name: "Base64 Encoder", path: "/" },
    { name: "URL Encoder", path: "/" },
    { name: "HTML Encoder", path: "/" },
    { name: "Morse Code", path: "/" },
    { name: "Hash Generator", path: "/" },
  ],
  "SEO Tools": [
    { name: "Meta Generator", path: "/" },
    { name: "Slug Generator", path: "/" },
    { name: "Readability Score", path: "/" },
    { name: "Title Analyzer", path: "/" },
  ],
  "Developer Tools": [
    { name: "JSON Formatter", path: "/" },
    { name: "CSS Minifier", path: "/" },
    { name: "Regex Tester", path: "/" },
    { name: "Text Extractor", path: "/" },
    { name: "Text Diff", path: "/" },
    { name: "Text Summarizer", path: "/" },
  ],
};

export const Header = () => {
  const { theme, setTheme } = useTheme();
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

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
                        <Link
                          key={tool.name}
                          to={tool.path}
                          className="block select-none space-y-1 rounded-lg p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">
                            {tool.name}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ))}
              
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