import { Link } from "react-router-dom";
import { Calendar, Clock } from "lucide-react";
import { CategoryBadge } from "./CategoryBadge";
import { calculateReadingTime, formatReadingTime } from "@/utils/readingTime";
import type { BlogPost } from "@/types/contentful";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface BlogCardProps {
  post: BlogPost;
}

export const BlogCard = ({ post }: BlogCardProps) => {
  const readingTime = calculateReadingTime(post.content);
  const formattedDate = new Date(post.publishedDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Link to={`/blog/${post.slug}`}>
      <Card className="h-full hover-lift overflow-hidden group transition-all duration-300 border-border/50 hover:border-primary/50">
        {post.featuredImage && (
          <div className="overflow-hidden">
            <img
              src={`https:${post.featuredImage.url}?w=600&h=400&fit=fill`}
              alt={post.featuredImage.title}
              className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        )}
        <CardHeader className="space-y-3">
          <div className="flex items-center justify-between gap-2">
            <CategoryBadge category={post.category} />
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {formattedDate}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {formatReadingTime(readingTime)}
              </span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
            {post.title}
          </h3>
          <p className="text-muted-foreground text-sm line-clamp-3 leading-relaxed">
            {post.excerpt}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
};
