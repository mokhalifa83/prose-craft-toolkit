import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface CategoryBadgeProps {
  category: string;
  className?: string;
}

const getCategoryColor = (category: string): string => {
  const colors: Record<string, string> = {
    'Text Manipulation': 'bg-[hsl(var(--category-blue)/0.1)] text-[hsl(var(--category-blue))] border-[hsl(var(--category-blue)/0.2)]',
    'SEO': 'bg-[hsl(var(--category-green)/0.1)] text-[hsl(var(--category-green))] border-[hsl(var(--category-green)/0.2)]',
    'Tools': 'bg-[hsl(var(--category-purple)/0.1)] text-[hsl(var(--category-purple))] border-[hsl(var(--category-purple)/0.2)]',
    'Productivity': 'bg-[hsl(var(--category-orange)/0.1)] text-[hsl(var(--category-orange))] border-[hsl(var(--category-orange)/0.2)]',
    'Tutorial': 'bg-[hsl(var(--category-cyan)/0.1)] text-[hsl(var(--category-cyan))] border-[hsl(var(--category-cyan)/0.2)]',
    'Writing': 'bg-[hsl(var(--category-pink)/0.1)] text-[hsl(var(--category-pink))] border-[hsl(var(--category-pink)/0.2)]',
    'Tips': 'bg-[hsl(var(--category-yellow)/0.1)] text-[hsl(var(--category-yellow))] border-[hsl(var(--category-yellow)/0.2)]',
    'Development': 'bg-[hsl(var(--category-indigo)/0.1)] text-[hsl(var(--category-indigo))] border-[hsl(var(--category-indigo)/0.2)]',
    'Design': 'bg-[hsl(var(--category-teal)/0.1)] text-[hsl(var(--category-teal))] border-[hsl(var(--category-teal)/0.2)]',
    'Marketing': 'bg-[hsl(var(--category-red)/0.1)] text-[hsl(var(--category-red))] border-[hsl(var(--category-red)/0.2)]',
  };
  
  // Generate a consistent color for unknown categories based on hash
  if (!colors[category]) {
    const colorOptions = [
      'bg-[hsl(var(--category-blue)/0.1)] text-[hsl(var(--category-blue))] border-[hsl(var(--category-blue)/0.2)]',
      'bg-[hsl(var(--category-purple)/0.1)] text-[hsl(var(--category-purple))] border-[hsl(var(--category-purple)/0.2)]',
      'bg-[hsl(var(--category-pink)/0.1)] text-[hsl(var(--category-pink))] border-[hsl(var(--category-pink)/0.2)]',
      'bg-[hsl(var(--category-indigo)/0.1)] text-[hsl(var(--category-indigo))] border-[hsl(var(--category-indigo)/0.2)]',
      'bg-[hsl(var(--category-teal)/0.1)] text-[hsl(var(--category-teal))] border-[hsl(var(--category-teal)/0.2)]',
    ];
    const hash = category.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colorOptions[hash % colorOptions.length];
  }
  
  return colors[category];
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
