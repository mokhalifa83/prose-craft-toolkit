import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface CategoryBadgeProps {
  category: string;
  className?: string;
}

const getCategoryColor = (category: string): string => {
  const colors: Record<string, string> = {
    'Text Manipulation': 'bg-blue-500/10 text-blue-500 border-blue-500/20',
    'SEO': 'bg-green-500/10 text-green-500 border-green-500/20',
    'Tools': 'bg-purple-500/10 text-purple-500 border-purple-500/20',
    'Productivity': 'bg-orange-500/10 text-orange-500 border-orange-500/20',
    'Tutorial': 'bg-cyan-500/10 text-cyan-500 border-cyan-500/20',
  };
  
  return colors[category] || 'bg-primary/10 text-primary border-primary/20';
};

export const CategoryBadge = ({ category, className }: CategoryBadgeProps) => {
  return (
    <Badge
      variant="outline"
      className={cn(
        "font-medium border",
        getCategoryColor(category),
        className
      )}
    >
      {category}
    </Badge>
  );
};
