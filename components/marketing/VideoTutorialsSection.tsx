import Link from 'next/link';
import { VIDEO_TUTORIALS, formatVideoDuration } from '@/lib/videoTutorials';

export function VideoTutorialsSection() {
  return (
    <section id="tutorials" className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 text-center">
          <h2 className="mb-4 text-3xl font-heading font-bold text-[var(--color-text)] sm:text-4xl">
            Watch how NurseFiti works
          </h2>
          <p className="mx-auto max-w-2xl text-neutral-mid">
            Short video walkthroughs of the core features, from creating an account to practising NCK questions.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {VIDEO_TUTORIALS.map((video) => (
            <Link
              key={video.slug}
              href={`/tutorials/${video.slug}`}
              className="group overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] text-left transition-shadow hover:shadow-card-hover"
              aria-label={`Watch video: ${video.title}`}
            >
              <div className="relative aspect-video bg-primary-light dark:bg-dark-mid">
                {/* A real image element makes the thumbnail discoverable and usable without CSS. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={video.poster} alt="" className="h-full w-full object-cover" loading="lazy" />
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 transition-colors group-hover:bg-black/35">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-primary shadow-lg transition-transform group-hover:scale-110" aria-hidden="true">
                    <svg className="ml-0.5 h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M6.3 2.8A1 1 0 004.8 3.7v12.6a1 1 0 001.5.9l10.6-6.3a1 1 0 000-1.8L6.3 2.8z" />
                    </svg>
                  </span>
                </div>
                <span className="absolute bottom-2 right-2 rounded-md bg-black/70 px-2 py-0.5 text-xs font-semibold text-white">
                  {formatVideoDuration(video.durationSeconds)}
                </span>
              </div>
              <div className="p-5">
                <div className="mb-2 text-2xl" aria-hidden="true">{video.icon}</div>
                <h3 className="mb-1.5 font-heading font-bold text-[var(--color-text)]">{video.title}</h3>
                <p className="text-sm leading-relaxed text-neutral-mid">{video.cardDescription}</p>
                <span className="mt-4 inline-flex font-semibold text-primary">Watch tutorial <span className="ml-1" aria-hidden="true">→</span></span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
