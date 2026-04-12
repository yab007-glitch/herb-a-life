"use client";

import { ExternalLink, BookOpen, FileText, Globe } from "lucide-react";
import { cn } from "@/lib/utils";

interface Citation {
  source: string;
  title?: string;
  url?: string;
  year?: number;
  pmid?: string;
}

interface CitationsListProps {
  citations: Citation[];
  className?: string;
}

const sourceIcons: Record<string, React.ReactNode> = {
  "WHO": <Globe className="size-3" />,
  "PubMed": <FileText className="size-3" />,
  "Commission E": <BookOpen className="size-3" />,
  "NCCIH": <Globe className="size-3" />,
  "EMA": <Globe className="size-3" />,
  "default": <BookOpen className="size-3" />,
};

export function CitationsList({ citations, className }: CitationsListProps) {
  if (!citations || citations.length === 0) {
    return (
      <div className={cn("text-sm text-muted-foreground italic", className)}>
        Citations pending review. Information based on traditional use and preliminary research.
      </div>
    );
  }

  return (
    <ul className={cn("space-y-2", className)}>
      {citations.map((citation, index) => {
        const icon = sourceIcons[citation.source] || sourceIcons.default;
        const hasUrl = citation.url || citation.pmid;
        const linkUrl = citation.url || (citation.pmid ? `https://pubmed.ncbi.nlm.nih.gov/${citation.pmid}/` : null);
        
        return (
          <li key={index} className="flex items-start gap-2 text-sm">
            <span className="mt-0.5 shrink-0 text-muted-foreground">{icon}</span>
            <div className="flex-1">
              <span className="font-medium">{citation.source}</span>
              {citation.title && (
                <>{" "}· {citation.title}</>
              )}
              {citation.year && (
                <span className="text-muted-foreground">{" "}({citation.year})</span>
              )}
              {hasUrl && linkUrl && (
                <a
                  href={linkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-1 inline-flex items-center gap-0.5 text-primary hover:underline"
                >
                  <ExternalLink className="size-3" />
                </a>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
}

// Component for a single inline citation
export function InlineCitation({ source, url, pmid }: Omit<Citation, 'year' | 'title'>) {
  const linkUrl = url || (pmid ? `https://pubmed.ncbi.nlm.nih.gov/${pmid}/` : null);
  
  if (!linkUrl) {
    return <span className="text-muted-foreground">[{source}]</span>;
  }

  return (
    <a
      href={linkUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-0.5 text-xs text-primary hover:underline"
    >
      [{source}]
      <ExternalLink className="size-3" />
    </a>
  );
}

// Component for source attribution block
interface SourceAttributionProps {
  reviewedBy?: string;
  reviewerCredentials?: string;
  lastReviewed?: string;
  sources?: string[];
  className?: string;
}

export function SourceAttribution({
  reviewedBy,
  reviewerCredentials,
  lastReviewed,
  sources,
  className,
}: SourceAttributionProps) {
  return (
    <div className={cn("rounded-lg border bg-muted/50 p-4 text-sm", className)}>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        {reviewedBy && (
          <div>
            <span className="text-muted-foreground">Reviewed by: </span>
            <span className="font-medium">{reviewedBy}</span>
            {reviewerCredentials && (
              <span className="text-muted-foreground">, {reviewerCredentials}</span>
            )}
          </div>
        )}
        {lastReviewed && (
          <div>
            <span className="text-muted-foreground">Last updated: </span>
            <span className="font-medium">{lastReviewed}</span>
          </div>
        )}
      </div>
      
      {sources && sources.length > 0 && (
        <div className="mt-2 pt-2 border-t"
        >
          <span className="text-muted-foreground">Sources: </span>
          <span className="text-muted-foreground">{sources.join(" · ")}</span>
        </div>
      )}
    </div>
  );
}
