import { useEffect, ReactNode } from "react";
import { X, Copy, Download, Share2, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface ToolModalProps {
  isOpen: boolean;
  onClose: () => void;
  toolName: string;
  toolDescription: string;
  children: ReactNode;
  steps?: string[];
  tips?: string[];
  example?: string;
  relatedTools?: Array<{ id: string; name: string; icon: any }>;
}

export const ToolModal = ({
  isOpen,
  onClose,
  toolName,
  toolDescription,
  children,
  steps = [],
  tips = [],
  example = "",
  relatedTools = [],
}: ToolModalProps) => {
  const { toast } = useToast();

  // ESC key handler
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-6xl max-h-[90vh] overflow-y-auto glass-card animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 glass-effect border-b border-border/50 p-6 flex items-start justify-between gap-4">
          <div className="flex-1">
            <h2 className="text-2xl md:text-3xl font-bold gradient-text mb-2">
              {toolName}
            </h2>
            <p className="text-muted-foreground">{toolDescription}</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="rounded-full hover:bg-destructive/10 hover:text-destructive shrink-0"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Body - Three Column Layout */}
        <div className="p-6">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Left & Center: Tool Interface (takes 2 columns) */}
            <div className="lg:col-span-2 space-y-6">
              {children}
            </div>

            {/* Right: How to Use Sidebar */}
            <div className="space-y-6">
              {/* How to Use */}
              {steps.length > 0 && (
                <div className="glass-card space-y-4">
                  <h3 className="text-lg font-bold flex items-center gap-2">
                    <span className="text-primary">📖</span> How to Use
                  </h3>
                  <ol className="space-y-3 text-sm">
                    {steps.map((step, idx) => (
                      <li key={idx} className="flex gap-3">
                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/20 text-primary font-bold text-xs shrink-0">
                          {idx + 1}
                        </span>
                        <span className="text-muted-foreground">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              )}

              {/* Tips */}
              {tips.length > 0 && (
                <div className="glass-card space-y-4 border-l-4 border-primary">
                  <h4 className="text-lg font-bold flex items-center gap-2">
                    <span className="text-primary">💡</span> Tips
                  </h4>
                  <ul className="space-y-2 text-sm">
                    {tips.map((tip, idx) => (
                      <li key={idx} className="flex gap-2">
                        <span className="text-primary shrink-0">→</span>
                        <span className="text-muted-foreground">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Example */}
              {example && (
                <div className="glass-card space-y-4 border-l-4 border-secondary">
                  <h4 className="text-lg font-bold flex items-center gap-2">
                    <span className="text-secondary">📝</span> Example
                  </h4>
                  <p className="text-sm text-muted-foreground">{example}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer - Related Tools */}
        {relatedTools.length > 0 && (
          <div className="border-t border-border/50 p-6 space-y-4">
            <h3 className="text-lg font-bold">Related Tools</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {relatedTools.map((tool) => {
                const Icon = tool.icon;
                return (
                  <button
                    key={tool.id}
                    className="glass-card hover-lift text-left flex items-center gap-3 p-4"
                    onClick={() => {
                      // Handle tool switch
                      toast({ description: `Switching to ${tool.name}...` });
                    }}
                  >
                    <Icon className="w-5 h-5 text-primary shrink-0" />
                    <span className="text-sm font-medium truncate">{tool.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
