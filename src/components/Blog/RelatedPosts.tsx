import { BlogCard } from "./BlogCard";
import type { BlogPost } from "@/types/contentful";

interface RelatedPostsProps {
  posts: BlogPost[];
  currentPostId: string;
  category: string;
}

export const RelatedPosts = ({ posts, currentPostId, category }: RelatedPostsProps) => {
  // Filter posts by same category, exclude current post, limit to 3
  const relatedPosts = posts
    .filter((post) => post.category === category && post.id !== currentPostId)
    .slice(0, 3);

  if (relatedPosts.length === 0) {
    return null;
  }

  return (
    <section className="mt-16 pt-16 border-t border-border">
      <h2 className="text-3xl font-bold gradient-text mb-8">
        You might also like
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {relatedPosts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
};
