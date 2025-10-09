import { createClient } from 'contentful';
import type { BlogPost, ContentfulBlogPost, BlogPostSkeleton } from '@/types/contentful';

const client = createClient({
  space: 'f4tdax0ml2vl',
  accessToken: 'MbmfrZ19mAAyOjN2CXtCsQbuYAayvTl4zZk-hUA4-mM',
  environment: 'master',
});

// Transform Contentful entry to our BlogPost type
const transformBlogPost = (entry: any): BlogPost => {
  const fields = entry.fields;
  
  return {
    id: entry.sys.id,
    title: fields.title || '',
    slug: fields.slug || '',
    excerpt: fields.excerpt || '',
    content: fields.content,
    category: fields.category || '',
    publishedDate: fields.publishedDate || '',
    featuredImage: fields.featuredImage
      ? {
          url: fields.featuredImage.fields?.file?.url || '',
          title: fields.featuredImage.fields?.title || '',
          description: fields.featuredImage.fields?.description || '',
        }
      : undefined,
  };
};

// Fetch all blog posts
export const getAllBlogPosts = async (): Promise<BlogPost[]> => {
  try {
    const response = await client.getEntries({
      content_type: 'blogPost',
      order: ['-sys.createdAt'], // Use system created date instead
    });

    return response.items.map(transformBlogPost);
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
};

// Fetch single blog post by slug
export const getBlogPostBySlug = async (
  slug: string
): Promise<BlogPost | null> => {
  try {
    const response = await client.getEntries({
      content_type: 'blogPost',
      'fields.slug': slug,
      limit: 1,
    });

    if (response.items.length === 0) {
      return null;
    }

    return transformBlogPost(response.items[0]);
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
};

// Fetch blog posts by category
export const getBlogPostsByCategory = async (
  category: string
): Promise<BlogPost[]> => {
  try {
    const response = await client.getEntries({
      content_type: 'blogPost',
      'fields.category': category,
      order: ['-sys.createdAt'], // Use system created date instead
    });

    return response.items.map(transformBlogPost);
  } catch (error) {
    console.error('Error fetching blog posts by category:', error);
    return [];
  }
};

// Get all unique categories
export const getAllCategories = async (): Promise<string[]> => {
  try {
    const posts = await getAllBlogPosts();
    const categories = [...new Set(posts.map((post) => post.category))];
    return categories.sort();
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
};
