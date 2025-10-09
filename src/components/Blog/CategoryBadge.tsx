import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface CategoryBadgeProps {
  category: string;
  className?: string;
}

const getCategoryColor = (category: string): string => {
  const colors: Record<string, string> = {
    'Text Manipulation': 'bg-blue-500/10 text-blue-400 border-blue-500/30 dark:text-blue-400',
    'SEO': 'bg-emerald-500/10 text-emerald-500 border-emerald-500/30 dark:text-emerald-400',
    'Tools': 'bg-violet-500/10 text-violet-500 border-violet-500/30 dark:text-violet-400',
    'Productivity': 'bg-orange-500/10 text-orange-500 border-orange-500/30 dark:text-orange-400',
    'Productivity Tools': 'bg-amber-500/10 text-amber-500 border-amber-500/30 dark:text-amber-400',
    'Tutorial': 'bg-cyan-500/10 text-cyan-500 border-cyan-500/30 dark:text-cyan-400',
    'Writing': 'bg-pink-500/10 text-pink-500 border-pink-500/30 dark:text-pink-400',
    'Writing Tips': 'bg-fuchsia-500/10 text-fuchsia-500 border-fuchsia-500/30 dark:text-fuchsia-400',
    'Tips': 'bg-yellow-500/10 text-yellow-600 border-yellow-500/30 dark:text-yellow-400',
    'Developer Tools': 'bg-indigo-500/10 text-indigo-500 border-indigo-500/30 dark:text-indigo-400',
    'Development': 'bg-purple-500/10 text-purple-500 border-purple-500/30 dark:text-purple-400',
    'Design': 'bg-teal-500/10 text-teal-500 border-teal-500/30 dark:text-teal-400',
    'Marketing': 'bg-rose-500/10 text-rose-500 border-rose-500/30 dark:text-rose-400',
  };
  
  // Generate a consistent color for unknown categories based on hash
  if (!colors[category]) {
    const colorOptions = [
      'bg-sky-500/10 text-sky-500 border-sky-500/30 dark:text-sky-400',
      'bg-lime-500/10 text-lime-600 border-lime-500/30 dark:text-lime-400',
      'bg-purple-500/10 text-purple-500 border-purple-500/30 dark:text-purple-400',
      'bg-red-500/10 text-red-500 border-red-500/30 dark:text-red-400',
      'bg-green-500/10 text-green-600 border-green-500/30 dark:text-green-400',
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
