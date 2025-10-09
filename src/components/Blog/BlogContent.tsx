import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES } from '@contentful/rich-text-types';
import type { Document } from '@contentful/rich-text-types';

interface BlogContentProps {
  content: Document;
}

export const BlogContent = ({ content }: BlogContentProps) => {
  const options = {
    renderNode: {
      [BLOCKS.HEADING_2]: (_node: any, children: any) => (
        <h2 className="text-3xl font-bold mt-12 mb-6 gradient-text">
          {children}
        </h2>
      ),
      [BLOCKS.HEADING_3]: (_node: any, children: any) => (
        <h3 className="text-2xl font-bold mt-8 mb-4 text-foreground">
          {children}
        </h3>
      ),
      [BLOCKS.HEADING_4]: (_node: any, children: any) => (
        <h4 className="text-xl font-bold mt-6 mb-3 text-foreground">
          {children}
        </h4>
      ),
      [BLOCKS.PARAGRAPH]: (_node: any, children: any) => (
        <p className="text-muted-foreground leading-relaxed mb-6">
          {children}
        </p>
      ),
      [BLOCKS.UL_LIST]: (_node: any, children: any) => (
        <ul className="list-disc list-outside space-y-2 mb-6 text-muted-foreground ml-6 pl-2">
          {children}
        </ul>
      ),
      [BLOCKS.OL_LIST]: (_node: any, children: any) => (
        <ol className="list-decimal list-outside space-y-2 mb-6 text-muted-foreground ml-6 pl-2">
          {children}
        </ol>
      ),
      [BLOCKS.LIST_ITEM]: (_node: any, children: any) => (
        <li className="leading-relaxed pl-2">{children}</li>
      ),
      [BLOCKS.QUOTE]: (_node: any, children: any) => (
        <blockquote className="border-l-4 border-primary pl-6 py-2 my-6 italic text-muted-foreground bg-card/50 rounded-r-lg">
          {children}
        </blockquote>
      ),
      [BLOCKS.EMBEDDED_ASSET]: (node: any) => {
        const { file, title, description } = node.data.target.fields;
        return (
          <figure className="my-8">
            <img
              src={`https:${file.url}`}
              alt={description || title}
              className="w-full rounded-lg border border-border"
            />
            {description && (
              <figcaption className="text-sm text-muted-foreground text-center mt-2">
                {description}
              </figcaption>
            )}
          </figure>
        );
      },
      [INLINES.HYPERLINK]: (node: any, children: any) => (
        <a
          href={node.data.uri}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:text-primary/80 underline underline-offset-2 transition-colors"
        >
          {children}
        </a>
      ),
    },
  };

  return (
    <article className="prose prose-lg max-w-none">
      {documentToReactComponents(content, options)}
    </article>
  );
};
