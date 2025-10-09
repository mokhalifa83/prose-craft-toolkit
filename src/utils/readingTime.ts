import type { Document } from '@contentful/rich-text-types';

const WORDS_PER_MINUTE = 200;

// Extract text from rich text document
const extractText = (node: any): string => {
  if (!node) return '';
  
  if (node.nodeType === 'text') {
    return node.value;
  }
  
  if (node.content && Array.isArray(node.content)) {
    return node.content.map(extractText).join(' ');
  }
  
  return '';
};

// Calculate reading time from rich text content
export const calculateReadingTime = (content: Document): number => {
  const text = extractText(content);
  const wordCount = text.trim().split(/\s+/).length;
  const minutes = Math.ceil(wordCount / WORDS_PER_MINUTE);
  
  return minutes;
};

// Format reading time for display
export const formatReadingTime = (minutes: number): string => {
  return `${minutes} min read`;
};
