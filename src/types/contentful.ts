import type { Document } from '@contentful/rich-text-types';
import type { Entry, Asset as ContentfulAsset, EntrySkeletonType } from 'contentful';

export interface BlogPostSkeleton extends EntrySkeletonType {
  contentTypeId: 'blogPost';
  fields: {
    title: string;
    slug: string;
    excerpt: string;
    content: Document;
    category: string;
    publishedDat: string;
    featuredImage?: ContentfulAsset;
  };
}

export type ContentfulBlogPost = Entry<BlogPostSkeleton, 'WITHOUT_UNRESOLVABLE_LINKS', string>;

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: Document;
  category: string;
  publishedDate: string;
  featuredImage?: {
    url: string;
    title: string;
    description: string;
  };
}
