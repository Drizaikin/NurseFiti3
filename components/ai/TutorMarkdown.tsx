'use client';

import React, { ReactNode } from 'react';

/**
 * Formats inline Markdown (*italic*, **bold**, `code`, [link](url))
 * and eliminates technical markdown syntax (*, #) for clean, human-readable clinical output.
 */
function renderInline(text: string): ReactNode[] {
  if (!text) return [];

  // Match bold-italic (***text***), bold (**text** or __text__), italic (*text* or _text_), code (`code`), or links
  const tokenPattern = /(\*\*\*[^*]+\*\*\*|\*\*[^*]+\*\*|__[^_]+__|(?<!\*)\*[^*]+(?!\*)|(?<!_)_[^_]+(?!_)|`[^`]+`|\[[^\]]+\]\([^)]+\))/g;

  return text.split(tokenPattern).filter(Boolean).map((part, index) => {
    // Bold-italic: ***text***
    if (part.startsWith('***') && part.endsWith('***') && part.length > 6) {
      return (
        <strong key={index} className="font-bold italic text-[var(--color-text)] dark:text-white">
          {part.slice(3, -3)}
        </strong>
      );
    }

    // Bold: **text** or __text__
    if ((part.startsWith('**') && part.endsWith('**') && part.length > 4) ||
        (part.startsWith('__') && part.endsWith('__') && part.length > 4)) {
      const content = part.slice(2, -2);
      return (
        <strong key={index} className="font-bold text-[var(--color-text)] dark:text-white">
          {content}
        </strong>
      );
    }

    // Italic: *text* or _text_
    if ((part.startsWith('*') && part.endsWith('*') && part.length > 2) ||
        (part.startsWith('_') && part.endsWith('_') && part.length > 2)) {
      const content = part.slice(1, -1);
      return (
        <em key={index} className="italic text-[var(--color-text)]/90">
          {content}
        </em>
      );
    }

    // Code: `code`
    if (part.startsWith('`') && part.endsWith('`') && part.length > 2) {
      return (
        <code
          key={index}
          className="px-1.5 py-0.5 rounded-md bg-neutral-200/60 dark:bg-neutral-800 text-primary-dark dark:text-primary-light font-mono text-xs border border-primary/20"
        >
          {part.slice(1, -1)}
        </code>
      );
    }

    // Link: [label](url)
    const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (linkMatch) {
      const [, label, href] = linkMatch;
      const isExternal = href.startsWith('http');
      return (
        <a
          key={index}
          href={href}
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noopener noreferrer' : undefined}
          className="text-primary hover:underline font-semibold"
        >
          {label}
        </a>
      );
    }

    // Clean any stray formatting symbols (* or #) that were unclosed or orphaned
    const sanitized = part.replace(/^[*#_]+|[*#_]+$/g, '');
    return sanitized || part;
  });
}

interface TutorMarkdownProps {
  content: string;
}

export function TutorMarkdown({ content }: TutorMarkdownProps) {
  if (!content) return null;

  const rawLines = content.replace(/\r/g, '').split('\n');
  const blocks: ReactNode[] = [];
  let blockKey = 0;

  for (let i = 0; i < rawLines.length; i++) {
    const line = rawLines[i].trim();
    if (!line) continue;

    // 1. Discrepancy Callout Detection (Explicit User Requirement)
    if (
      line.toLowerCase().includes('discrepancy') ||
      line.startsWith('⚠️') ||
      line.toLowerCase().startsWith('note on conflict')
    ) {
      const calloutLines: string[] = [line];
      while (i + 1 < rawLines.length && rawLines[i + 1].trim() && !rawLines[i + 1].trim().startsWith('#')) {
        calloutLines.push(rawLines[++i].trim());
      }
      blocks.push(
        <div
          key={blockKey++}
          className="my-3 p-3.5 sm:p-4 rounded-xl border-l-4 border-amber-500 bg-amber-500/10 dark:bg-amber-950/25 text-amber-900 dark:text-amber-200 text-sm space-y-1.5 shadow-sm"
        >
          <div className="flex items-center gap-1.5 font-bold text-amber-800 dark:text-amber-300">
            <span className="text-base">⚠️</span>
            <span className="tracking-wide uppercase text-xs">Clinical Discrepancy Protocol</span>
          </div>
          <div className="text-sm leading-relaxed text-amber-900 dark:text-amber-200 space-y-1">
            {calloutLines.map((l, lIdx) => (
              <p key={lIdx} className="leading-relaxed">
                {renderInline(l.replace(/^[>⚠️\s*#-]+/, ''))}
              </p>
            ))}
          </div>
        </div>
      );
      continue;
    }

    // 2. Clinical Pearl / High-Yield Callout Detection
    if (
      line.toLowerCase().includes('clinical pearl') ||
      line.toLowerCase().includes('nck pearl') ||
      line.toLowerCase().includes('key takeaway')
    ) {
      blocks.push(
        <div
          key={blockKey++}
          className="my-3 p-3.5 sm:p-4 rounded-xl border-l-4 border-emerald-500 bg-emerald-500/10 dark:bg-emerald-950/25 text-emerald-950 dark:text-emerald-200 text-sm shadow-sm"
        >
          <div className="flex items-center gap-1.5 font-bold text-emerald-800 dark:text-emerald-300 mb-1">
            <span className="text-base">💡</span>
            <span className="tracking-wide uppercase text-xs">NCK Clinical Pearl</span>
          </div>
          <p className="leading-relaxed">{renderInline(line.replace(/^[>💡\s*#-]+/, ''))}</p>
        </div>
      );
      continue;
    }

    // 3. Markdown Tables (| Col1 | Col2 |)
    if (line.startsWith('|') && line.endsWith('|')) {
      const tableLines: string[] = [line];
      while (i + 1 < rawLines.length && rawLines[i + 1].trim().startsWith('|') && rawLines[i + 1].trim().endsWith('|')) {
        tableLines.push(rawLines[++i].trim());
      }

      // Filter out divider lines like |---|---|
      const dataRows = tableLines.filter((l) => !/^[|\s-:]+$/.test(l));
      if (dataRows.length > 0) {
        const headerCells = dataRows[0].split('|').map((c) => c.trim()).filter((_, idx, arr) => idx > 0 && idx < arr.length - 1);
        const bodyRows = dataRows.slice(1).map((r) =>
          r.split('|').map((c) => c.trim()).filter((_, idx, arr) => idx > 0 && idx < arr.length - 1)
        );

        blocks.push(
          <div key={blockKey++} className="my-3 overflow-x-auto rounded-xl border border-[var(--color-border)] shadow-sm">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="bg-primary/10 border-b border-[var(--color-border)] text-[var(--color-text)]">
                  {headerCells.map((cell, cIdx) => (
                    <th key={cIdx} className="px-3 py-2 font-bold text-primary">
                      {renderInline(cell)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-border)]/50">
                {bodyRows.map((row, rIdx) => (
                  <tr key={rIdx} className={rIdx % 2 === 0 ? 'bg-[var(--color-card)]' : 'bg-[var(--color-bg)]/60'}>
                    {row.map((cell, cIdx) => (
                      <td key={cIdx} className="px-3 py-2 text-[var(--color-text)]">
                        {renderInline(cell)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
        continue;
      }
    }

    // 4. Headings (#, ##, ###, ####, etc.) - cleanly styled without technical syntax
    const headingMatch = line.match(/^(#{1,6})\s+(.*)$/);
    if (headingMatch) {
      const level = headingMatch[1].length;
      const headingText = headingMatch[2];

      if (level === 1) {
        blocks.push(
          <h2 key={blockKey++} className="text-base sm:text-lg font-bold text-[var(--color-text)] mt-4 mb-2">
            {renderInline(headingText)}
          </h2>
        );
      } else if (level === 2) {
        blocks.push(
          <h3 key={blockKey++} className="text-sm sm:text-base font-bold text-[var(--color-text)] mt-3.5 mb-2 pb-1 border-b border-[var(--color-border)]/50">
            {renderInline(headingText)}
          </h3>
        );
      } else {
        blocks.push(
          <h4 key={blockKey++} className="text-xs sm:text-sm font-bold text-primary mt-3 mb-1.5 uppercase tracking-wide flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            {renderInline(headingText)}
          </h4>
        );
      }
      continue;
    }

    // 5. Blockquotes (> text)
    if (line.startsWith('>')) {
      blocks.push(
        <blockquote
          key={blockKey++}
          className="my-2.5 pl-3.5 border-l-2 border-primary/50 text-[var(--color-text-secondary)] italic text-sm"
        >
          {renderInline(line.replace(/^>\s*/, ''))}
        </blockquote>
      );
      continue;
    }

    // 6. Unordered list (- item or * item)
    if (line.startsWith('- ') || line.startsWith('* ')) {
      const items: string[] = [];
      while (
        i < rawLines.length &&
        (rawLines[i].trim().startsWith('- ') || rawLines[i].trim().startsWith('* '))
      ) {
        items.push(rawLines[i].trim().replace(/^[-*]\s+/, ''));
        i++;
      }
      i--; // Step back one because outer loop will increment
      blocks.push(
        <ul key={blockKey++} className="my-2 space-y-1.5 pl-1">
          {items.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2 text-sm leading-relaxed text-[var(--color-text)]">
              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
              <span>{renderInline(item)}</span>
            </li>
          ))}
        </ul>
      );
      continue;
    }

    // 7. Ordered list (1. item)
    if (/^\d+\.\s/.test(line)) {
      const items: string[] = [];
      while (i < rawLines.length && /^\d+\.\s/.test(rawLines[i].trim())) {
        items.push(rawLines[i].trim().replace(/^\d+\.\s*/, ''));
        i++;
      }
      i--;
      blocks.push(
        <ol key={blockKey++} className="my-2 space-y-1.5 pl-1">
          {items.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2 text-sm leading-relaxed text-[var(--color-text)]">
              <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-xs font-semibold flex items-center justify-center flex-shrink-0 mt-0.5">
                {idx + 1}
              </span>
              <span>{renderInline(item)}</span>
            </li>
          ))}
        </ol>
      );
      continue;
    }

    // 8. Horizontal Divider (--- or ***)
    if (line === '---' || line === '***') {
      blocks.push(<hr key={blockKey++} className="my-3 border-[var(--color-border)]/60" />);
      continue;
    }

    // 9. Standard paragraph with clean inline rendering
    blocks.push(
      <p key={blockKey++} className="leading-relaxed text-sm text-[var(--color-text)] mb-2 last:mb-0">
        {renderInline(line)}
      </p>
    );
  }

  return <div className="space-y-1">{blocks}</div>;
}
