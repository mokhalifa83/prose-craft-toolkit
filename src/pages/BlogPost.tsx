import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { Header } from "@/components/Layout/Header";
import { Footer } from "@/components/Layout/Footer";
import { BlogHero } from "@/components/Blog/BlogHero";
import { BlogContent } from "@/components/Blog/BlogContent";
import { RelatedPosts } from "@/components/Blog/RelatedPosts";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft } from "lucide-react";
import { getBlogPostBySlug, getAllBlogPosts } from "@/services/contentful";
import type { BlogPost } from "@/types/contentful";

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [allPosts, setAllPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!slug) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      setLoading(true);
      const [postData, allPostsData] = await Promise.all([
        getBlogPostBySlug(slug),
        getAllBlogPosts(),
      ]);

      if (!postData) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      setPost(postData);
      setAllPosts(allPostsData);
      setLoading(false);
    };

    fetchData();
  }, [slug]);

  // 404 State
  if (notFound) {
    return (
      <>
        <SEO
          title="Post Not Found - TextToolbox"
          description="The blog post you're looking for doesn't exist."
        />
        <Header />
        <main className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center space-y-6 px-4">
            <h1 className="text-6xl font-bold text-muted-foreground">404</h1>
            <h2 className="text-2xl font-bold gradient-text">Post Not Found</h2>
            <p className="text-muted-foreground">
              The blog post you're looking for doesn't exist or has been removed.
            </p>
            <Button onClick={() => navigate("/blog")}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Button>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  // Loading State
  if (loading) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-background">
          <div className="h-[400px] lg:h-[500px] bg-muted animate-pulse" />
          <div className="container mx-auto px-4 py-12 max-w-4xl">
            <Skeleton className="h-12 w-3/4 mb-6" />
            <Skeleton className="h-6 w-full mb-4" />
            <Skeleton className="h-6 w-full mb-4" />
            <Skeleton className="h-6 w-5/6 mb-4" />
          </div>
        </main>
        <Footer />
      </>
    );
  }

  // Blog Post Schema for SEO
  const blogPostSchema = post
    ? {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: post.title,
        description: post.excerpt,
        image: post.featuredImage
          ? `https:${post.featuredImage.url}`
          : undefined,
        datePublished: post.publishedDate,
        dateModified: post.publishedDate,
        author: {
          "@type": "Organization",
          name: "TextToolbox",
        },
        publisher: {
          "@type": "Organization",
          name: "TextToolbox",
          logo: {
            "@type": "ImageObject",
            url: "https://texttoolbox.com/logo.png",
          },
        },
      }
    : undefined;

  return (
    <>
      {post && (
        <SEO
          title={`${post.title} - TextToolbox Blog`}
          description={post.excerpt}
          canonical={`/blog/${post.slug}`}
          ogType="article"
          keywords={`${post.category}, text tools, ${post.title}`}
          schema={blogPostSchema}
        />
      )}
      <Header />
      <main className="min-h-screen bg-background">
        {post && (
          <>
            {/* Hero Section */}
            <BlogHero post={post} />

            {/* Content Section */}
            <article className="container mx-auto px-4 py-12 max-w-4xl">
              {/* Back Button */}
              <Button
                variant="ghost"
                onClick={() => navigate("/blog")}
                className="mb-8"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blog
              </Button>

              {/* Blog Content */}
              <BlogContent content={post.content} />

              {/* Related Posts */}
              <RelatedPosts
                posts={allPosts}
                currentPostId={post.id}
                category={post.category}
              />
            </article>
          </>
        )}
      </main>
      <Footer />
    </>
  );
}
