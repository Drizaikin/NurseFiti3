"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Spinner } from '@/components/ui/Spinner';
import { ProgressBar } from '@/components/ui/ProgressBar';

export const dynamic = 'force-dynamic';

interface Review {
  id: string;
  student_name: string;
  cadre: string;
  rating: number;
  review_text: string | null;
  created_at: string;
}

interface ReviewsData {
  averageRating: number;
  totalReviews: number;
  distribution: Record<number, number>;
  reviews: Review[];
  ranking: number;
  totalTutors: number;
}

function StarRating({ rating, size = 'sm' }: { rating: number; size?: 'sm' | 'lg' }) {
  const sz = size === 'lg' ? 'w-6 h-6' : 'w-4 h-4';
  return (
    <span className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(s => (
        <svg key={s} className={`${sz} ${s <= Math.round(rating) ? 'text-accent' : 'text-neutral-border'}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </span>
  );
}

export default function TutorReviewsPage() {
  const router = useRouter();
  const supabase = createClient();
  const [data, setData] = useState<ReviewsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push('/login'); return; }
      await loadReviews(user.id);
      setIsLoading(false);
    };
    init();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadReviews = async (uid: string) => {
    const [reviewsRes, tutorRes, allTutorsRes] = await Promise.all([
      supabase.from('session_reviews')
        .select('id, rating, review_text, created_at, student_id')
        .eq('tutor_id', uid).eq('is_published', true)
        .order('created_at', { ascending: false }),
      supabase.from('tutor_profiles').select('average_rating').eq('id', uid).single(),
      supabase.from('tutor_profiles').select('id, average_rating').eq('verification_status', 'verified').order('average_rating', { ascending: false }),
    ]);

    const reviews = (reviewsRes.data ?? []) as any[];
    const studentIds = reviews.map(r => r.student_id);
    let nameMap: Record<string, { name: string; cadre: string }> = {};
    if (studentIds.length > 0) {
      const [namesRes, cadresRes] = await Promise.all([
        supabase.from('profiles').select('id, full_name').in('id', studentIds),
        supabase.from('student_profiles').select('id, cadre').in('id', studentIds),
      ]);
      const cadreMap = Object.fromEntries((cadresRes.data ?? []).map((p: any) => [p.id, p.cadre]));
      nameMap = Object.fromEntries((namesRes.data ?? []).map((n: any) => [n.id, { name: n.full_name, cadre: cadreMap[n.id] ?? '' }]));
    }

    const distribution: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    reviews.forEach(r => { distribution[r.rating] = (distribution[r.rating] ?? 0) + 1; });

    const allTutors = (allTutorsRes.data ?? []) as Array<{ id: string; average_rating: number }>;
    const ranking = allTutors.findIndex(t => t.id === uid) + 1;

    setData({
      averageRating: (tutorRes.data as any)?.average_rating ?? 0,
      totalReviews: reviews.length,
      distribution,
      reviews: reviews.map(r => ({
        id: r.id,
        student_name: nameMap[r.student_id]?.name ?? 'Student',
        cadre: nameMap[r.student_id]?.cadre ?? '',
        rating: r.rating,
        review_text: r.review_text,
        created_at: r.created_at,
      })),
      ranking: ranking || allTutors.length + 1,
      totalTutors: allTutors.length,
    });
  };

  if (isLoading) return <div className="flex items-center justify-center min-h-[60vh]"><Spinner size="lg" color="primary" /></div>;
  if (!data) return null;

  return (
    <div className="space-y-5 pb-24 lg:pb-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-heading font-bold text-[var(--color-text)]">Reviews & Ratings</h1>
        <p className="text-sm text-[var(--color-text-secondary)] mt-1">What your students say about you</p>
      </div>

      {/* Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="text-center bg-accent/5 border-accent/20">
          <p className="text-6xl font-heading font-bold text-accent">{data.averageRating.toFixed(1)}</p>
          <StarRating rating={data.averageRating} size="lg" />
          <p className="text-sm text-[var(--color-text-secondary)] mt-2">{data.totalReviews} review{data.totalReviews !== 1 ? 's' : ''}</p>
        </Card>
        <Card className="text-center">
          <p className="text-5xl font-heading font-bold text-primary">#{data.ranking}</p>
          <p className="text-sm text-[var(--color-text-secondary)] mt-2">out of {data.totalTutors} tutors</p>
          <Badge variant={data.ranking <= 10 ? 'green' : data.ranking <= 25 ? 'amber' : 'secondary'} className="mt-2">
            {data.ranking <= 10 ? 'Top 10' : data.ranking <= 25 ? 'Top 25' : 'Ranked'}
          </Badge>
        </Card>
        <Card>
          <h3 className="text-sm font-semibold text-[var(--color-text-secondary)] mb-3">Rating Distribution</h3>
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map(star => {
              const count = data.distribution[star] ?? 0;
              const pct = data.totalReviews > 0 ? Math.round((count / data.totalReviews) * 100) : 0;
              return (
                <div key={star} className="flex items-center gap-2 text-xs">
                  <span className="w-4 text-right text-[var(--color-text-secondary)]">{star}</span>
                  <span className="text-accent">★</span>
                  <div className="flex-1">
                    <ProgressBar value={pct} color="amber" size="sm" showLabel={false} />
                  </div>
                  <span className="w-6 text-right text-[var(--color-text-secondary)]">{count}</span>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      {/* Tips */}
      <Card className="bg-primary/5 border-primary/20">
        <h3 className="font-semibold text-[var(--color-text)] mb-2">💡 How to improve your rating</h3>
        <ul className="text-sm text-[var(--color-text-secondary)] space-y-1">
          <li>• Always confirm sessions promptly and add the join link before the session</li>
          <li>• Focus on NCK exam-specific content — students value exam-focused tutoring</li>
          <li>• Follow up after sessions with a summary or key points via WhatsApp</li>
          <li>• Gold badge requires 5+ reviews, 4.8+ rating, and NCK examiner background</li>
        </ul>
      </Card>

      {/* Reviews list */}
      <Card>
        <h2 className="text-lg font-heading font-bold mb-4">Student Reviews</h2>
        {data.reviews.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-4xl mb-3">⭐</p>
            <p className="text-[var(--color-text-secondary)]">No reviews yet. Complete sessions to receive reviews from students.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {data.reviews.map(r => (
              <div key={r.id} className="p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)]">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                      {r.student_name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-[var(--color-text)]">{r.student_name}</p>
                      {r.cadre && <Badge variant="teal" size="sm">{r.cadre}</Badge>}
                    </div>
                  </div>
                  <div className="text-right">
                    <StarRating rating={r.rating} />
                    <p className="text-xs text-[var(--color-text-secondary)] mt-1">
                      {new Date(r.created_at).toLocaleDateString('en-KE', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </p>
                  </div>
                </div>
                {r.review_text && (
                  <p className="text-sm text-[var(--color-text)] italic mt-2">&ldquo;{r.review_text}&rdquo;</p>
                )}
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
