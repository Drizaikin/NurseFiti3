import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';

const ALLOWED_IMAGE_HOSTS = ['images.unsplash.com', 'www.nursefiti.co.ke'];

/** Only renders images the CMS validator would also accept, so stored Markdown cannot hotlink. */
function allowedImageSrc(src: string) {
  if (src.startsWith('/')) return src;
  try {
    const url = new URL(src);
    if (url.protocol !== 'https:') return null;
    if (ALLOWED_IMAGE_HOSTS.includes(url.hostname)) return src;
    return url.hostname.endsWith('.supabase.co') && url.pathname.startsWith('/storage/v1/object/public/') ? src : null;
  } catch {
    return null;
  }
}

function inline(text: string): ReactNode[] {
  const tokenPattern = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g;
  return text.split(tokenPattern).filter(Boolean).map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) return <strong key={index}>{part.slice(2, -2)}</strong>;
    if (part.startsWith('*') && part.endsWith('*')) return <em key={index}>{part.slice(1, -1)}</em>;
    if (part.startsWith('`') && part.endsWith('`')) {
      return <code key={index} className="px-1.5 py-0.5 rounded-md bg-primary-light text-primary text-sm font-mono border border-primary/20">{part.slice(1, -1)}</code>;
    }
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) {
      const href = link[2];
      const safeHref = href.startsWith('/') || /^https?:\/\//.test(href) || href.startsWith('mailto:') ? href : '#';
      const className = 'text-primary font-semibold underline underline-offset-2 hover:text-primary-mid transition-colors';
      return safeHref.startsWith('/')
        ? <Link key={index} href={safeHref} className={className}>{link[1]}</Link>
        : <a key={index} href={safeHref} className={className} target="_blank" rel="noopener noreferrer">{link[1]}</a>;
    }
    return part;
  });
}

export function BlogMarkdown({ content }: { content: string }) {
  const lines = content.trim().split('\n');
  const blocks: ReactNode[] = [];
  let key = 0;

  for (let index = 0; index < lines.length; index++) {
    const line = lines[index].trim();
    if (!line) continue;
    const image = /^!\[([^\]]*)\]\(([^)\s]+)\)$/.exec(line);
    if (image) {
      const src = allowedImageSrc(image[2]);
      if (!src) continue;
      blocks.push(
        <figure key={key++} className="my-8">
          <Image src={src} alt={image[1]} width={1280} height={720} sizes="(max-width: 768px) 100vw, 768px" className="rounded-xl w-full h-auto border border-[var(--color-border)]" />
          {image[1] && <figcaption className="mt-2 text-sm text-neutral-mid text-center">{image[1]}</figcaption>}
        </figure>
      );
    } else if (line === '---') {
      blocks.push(<hr key={key++} className="my-10 border-[var(--color-border)]" />);
    } else if (line.startsWith('### ')) {
      blocks.push(<h3 key={key++} className="text-xl font-heading font-bold text-[var(--color-text)] mt-8 mb-3">{inline(line.slice(4))}</h3>);
    } else if (line.startsWith('## ')) {
      blocks.push(<h2 key={key++} className="text-2xl font-heading font-bold text-[var(--color-text)] mt-10 mb-4 pb-2 border-b-2 border-primary/20">{inline(line.slice(3))}</h2>);
    } else if (line.startsWith('> ')) {
      blocks.push(<blockquote key={key++} className="my-6 border-l-4 border-accent bg-accent-light/40 px-5 py-4 rounded-r-xl text-[var(--color-text)]">{inline(line.slice(2))}</blockquote>);
    } else if (line.startsWith('- ')) {
      const items: string[] = [];
      while (index < lines.length && lines[index].trim().startsWith('- ')) items.push(lines[index++].trim().slice(2));
      index--;
      blocks.push(<ul key={key++} className="my-5 space-y-2">{items.map((item, i) => <li key={i} className="flex items-start gap-3 leading-relaxed"><span className="w-1.5 h-1.5 mt-2.5 rounded-full bg-accent flex-shrink-0" /><span>{inline(item)}</span></li>)}</ul>);
    } else if (/^\d+\.\s/.test(line)) {
      const items: string[] = [];
      while (index < lines.length && /^\d+\.\s/.test(lines[index].trim())) items.push(lines[index++].trim().replace(/^\d+\.\s*/, ''));
      index--;
      blocks.push(<ol key={key++} className="my-5 space-y-3">{items.map((item, i) => <li key={i} className="flex items-start gap-3 leading-relaxed"><span className="w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span><span>{inline(item)}</span></li>)}</ol>);
    } else {
      blocks.push(<p key={key++} className="text-[var(--color-text)] leading-relaxed mb-4">{inline(line)}</p>);
    }
  }

  return <>{blocks}</>;
}
