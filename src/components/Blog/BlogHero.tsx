import { Calendar, Clock, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { CategoryBadge } from "./CategoryBadge";
import { calculateReadingTime, formatReadingTime } from "@/utils/readingTime";
import type { BlogPost } from "@/types/contentful";

interface BlogHeroProps {
  post: BlogPost;
}

export const BlogHero = ({ post }: BlogHeroProps) => {
  const readingTime = calculateReadingTime(post.content);
  const formattedDate = new Date(post.publishedDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="relative w-full h-[400px] lg:h-[500px] overflow-hidden">
      {/* Background Image */}
      {post.featuredImage && (
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(https:${post.featuredImage.url}?w=1920&h=1080&fit=fill)` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
        </div>
      )}
      
      {/* Content */}
      <div className="relative container mx-auto px-4 h-full flex flex-col justify-end pb-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <ChevronRight className="w-4 h-4" />
          <Link to="/blog" className="hover:text-primary transition-colors">
            Blog
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-foreground line-clamp-1">{post.title}</span>
        </nav>

        {/* Category Badge */}
        <div className="mb-4">
          <CategoryBadge category={post.category} />
        </div>

        {/* Title */}
        <h1 className="text-4xl lg:text-5xl font-extrabold text-foreground mb-6 max-w-4xl">
          {post.title}
        </h1>

        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
          <span className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            {formattedDate}
          </span>
          <span className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            {formatReadingTime(readingTime)}
          </span>
        </div>
      </div>
    </div>
  );
};
