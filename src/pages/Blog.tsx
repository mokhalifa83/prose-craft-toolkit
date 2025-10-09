import { useState, useEffect, useMemo } from "react";
import { SEO } from "@/components/SEO";
import { Header } from "@/components/Layout/Header";
import { Footer } from "@/components/Layout/Footer";
import { BlogCard } from "@/components/Blog/BlogCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Search } from "lucide-react";
import { getAllBlogPosts, getAllCategories } from "@/services/contentful";
import type { BlogPost } from "@/types/contentful";

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const [postsData, categoriesData] = await Promise.all([
        getAllBlogPosts(),
        getAllCategories(),
      ]);
      setPosts(postsData);
      setCategories(categoriesData);
      setLoading(false);
    };

    fetchData();
  }, []);

  // Filter posts based on category and search query
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesCategory =
        selectedCategory === "All" || post.category === selectedCategory;
      const matchesSearch =
        searchQuery === "" ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [posts, selectedCategory, searchQuery]);

  return (
    <>
      <SEO
        title="Blog - TextToolbox"
        description="Explore articles, tutorials, and insights about text manipulation, SEO tools, and productivity tips for writers and developers."
        canonical="/blog"
        keywords="text tools blog, SEO tutorials, productivity tips, text manipulation guides"
      />
      <Header />
      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-16 lg:py-24">
          <div className="max-w-3xl mx-auto text-center animate-fade-in-up">
            <h1 className="text-4xl lg:text-6xl font-extrabold gradient-text mb-6">
              TextToolbox Blog
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Discover tips, tutorials, and insights to help you work smarter with text.
              From SEO strategies to productivity hacks, we've got you covered.
            </p>
          </div>
        </section>

        {/* Filters Section */}
        <section className="container mx-auto px-4 mb-12">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search Bar */}
            <div className="relative w-full lg:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2 justify-center">
              <Button
                variant={selectedCategory === "All" ? "default" : "outline"}
                onClick={() => setSelectedCategory("All")}
                size="sm"
              >
                All
              </Button>
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                  size="sm"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Posts Grid */}
        <section className="container mx-auto px-4 pb-24">
          {/* Post Count */}
          <p className="text-sm text-muted-foreground mb-6">
            Showing {filteredPosts.length} {filteredPosts.length === 1 ? 'post' : 'posts'}
          </p>

          {/* Loading State */}
          {loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="h-48 w-full rounded-lg" />
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                </div>
              ))}
            </div>
          )}

          {/* Posts Grid */}
          {!loading && filteredPosts.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in">
              {filteredPosts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          )}

          {/* Empty State */}
          {!loading && filteredPosts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-xl text-muted-foreground mb-4">
                No posts found matching your criteria.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSelectedCategory("All");
                  setSearchQuery("");
                }}
              >
                Clear filters
              </Button>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
