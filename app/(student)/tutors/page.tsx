"use client";

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Spinner } from '@/components/ui/Spinner';
import { Avatar } from '@/components/ui/Avatar';

export const dynamic = 'force-dynamic';

interface Tutor {
  id: string;
  full_name: string;
  avatar_url: string | null;
  professional_title: string;
  bio: string | null;
  years_experience: number;
  cadres_taught: string[];
  specialties: string[] | null;
  rate_per_hour: number;
  verification_tier: string | null;
  average_rating: number;
  total_students: number;
  total_sessions: number;
  pass_rate: number;
  is_accepting_bookings: boolean;
  allow_instant_booking: boolean;
  allow_group_sessions: boolean;
  session_platform: string[];
}

const CADRES = ['All', 'KRCHN', 'BScN', 'Higher Diploma'];
const SORT_OPTIONS = [
  { value: 'rating', label: 'Top Rated' },
  { value: 'rate_asc', label: 'Price: Low to High' },
  { value: 'rate_desc', label: 'Price: High to Low' },
  { value: 'sessions', label: 'Most Experienced' },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(star => (
        <svg key={star} className={`w-3.5 h-3.5 ${star <= Math.round(rating) ? 'text-accent' : 'text-neutral-border'}`}
          fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      <span className="text-xs text-[var(--color-text-secondary)] ml-1">
        {rating > 0 ? rating.toFixed(1) : 'New'}
      </span>
    </div>
  );
}

function TutorCard({ tutor }: { tutor: Tutor }) {
  return (
    <Link href={`/tutors/${tutor.id}`}>
      <div className="group rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 hover:border-primary/40 hover:shadow-lg transition-all duration-200 cursor-pointer h-full flex flex-col">
        {/* Header */}
        <div className="flex items-start gap-3 mb-3">
          <Avatar name={tutor.full_name} src={tutor.avatar_url} size="md" />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-heading font-bold text-[var(--color-text)] text-sm leading-tight">{tutor.full_name}</h3>
              {tutor.verification_tier === 'gold' && (
                <Badge variant="warning" size="sm">⭐ Gold</Badge>
              )}
              {tutor.verification_tier === 'standard' && (
                <Badge variant="teal" size="sm">✓ Verified</Badge>
              )}
            </div>
            <p className="text-xs text-[var(--color-text-secondary)] mt-0.5 truncate">{tutor.professional_title}</p>
            <StarRating rating={tutor.average_rating} />
          </div>
        </div>

        {/* Bio */}
        {tutor.bio && (
          <p className="text-xs text-[var(--color-text-secondary)] line-clamp-2 mb-3 flex-1">
            {tutor.bio}
          </p>
        )}

        {/* Cadres */}
        <div className="flex flex-wrap gap-1 mb-3">
          {tutor.cadres_taught.slice(0, 3).map(c => (
            <Badge key={c} variant="secondary" size="sm">{c}</Badge>
          ))}
        </div>

        {/* Stats row */}
        <div className="flex items-center gap-3 text-xs text-[var(--color-text-secondary)] mb-3">
          <span>📚 {tutor.total_sessions} sessions</span>
          <span>👥 {tutor.total_students} students</span>
          {tutor.pass_rate > 0 && <span>✅ {tutor.pass_rate.toFixed(0)}% pass rate</span>}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-[var(--color-border)] mt-auto">
          <div>
            <span className="text-base font-bold text-accent">KSh {tutor.rate_per_hour.toLocaleString()}</span>
            <span className="text-xs text-[var(--color-text-secondary)]">/hr</span>
          </div>
          <div className="flex items-center gap-2">
            {tutor.is_accepting_bookings ? (
              <span className="text-xs text-success font-medium flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-success inline-block" />
                {tutor.allow_instant_booking ? 'Instant Book' : 'Available'}
              </span>
            ) : (
              <span className="text-xs text-neutral-mid">Unavailable</span>
            )}
            <button className="text-xs font-semibold text-primary group-hover:underline">
              View Profile →
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function TutorsPage() {
  const router = useRouter();
  const supabase = createClient();
  const [tutors, setTutors] = useState<Tutor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [cadreFilter, setCadreFilter] = useState('All');
  const [sortBy, setSortBy] = useState('rating');
  const [searchQuery, setSearchQuery] = useState('');
  const [instantOnly, setInstantOnly] = useState(false);
  const [maxRate, setMaxRate] = useState<number | ''>('');

  const fetchTutors = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push('/login'); return; }

      let query = supabase
        .from('tutor_profiles')
        .select(`
          id,
          professional_title,
          bio,
          years_experience,
          cadres_taught,
          specialties,
          rate_per_hour,
          verification_tier,
          average_rating,
          total_students,
          total_sessions,
          pass_rate,
          is_accepting_bookings,
          allow_instant_booking,
          allow_group_sessions,
          session_platform,
          profiles!inner(full_name, avatar_url)
        `)
        .eq('verification_status', 'verified');

      if (instantOnly) {
        query = query.eq('allow_instant_booking', true).eq('is_accepting_bookings', true);
      }

      if (maxRate) {
        query = query.lte('rate_per_hour', maxRate);
      }

      // Sort
      if (sortBy === 'rating') query = query.order('average_rating', { ascending: false });
      else if (sortBy === 'rate_asc') query = query.order('rate_per_hour', { ascending: true });
      else if (sortBy === 'rate_desc') query = query.order('rate_per_hour', { ascending: false });
      else if (sortBy === 'sessions') query = query.order('total_sessions', { ascending: false });

      const { data, error } = await query;
      if (error) throw error;

      let results: Tutor[] = (data ?? []).map((t: any) => ({
        id: t.id,
        full_name: t.profiles?.full_name ?? 'Tutor',
        avatar_url: t.profiles?.avatar_url ?? null,
        professional_title: t.professional_title ?? '',
        bio: t.bio ?? null,
        years_experience: t.years_experience ?? 0,
        cadres_taught: t.cadres_taught ?? [],
        specialties: t.specialties ?? null,
        rate_per_hour: t.rate_per_hour ?? 0,
        verification_tier: t.verification_tier ?? null,
        average_rating: t.average_rating ?? 0,
        total_students: t.total_students ?? 0,
        total_sessions: t.total_sessions ?? 0,
        pass_rate: t.pass_rate ?? 0,
        is_accepting_bookings: t.is_accepting_bookings ?? false,
        allow_instant_booking: t.allow_instant_booking ?? false,
        allow_group_sessions: t.allow_group_sessions ?? false,
        session_platform: t.session_platform ?? [],
      }));

      // Client-side cadre filter
      if (cadreFilter !== 'All') {
        results = results.filter(t => t.cadres_taught.includes(cadreFilter));
      }

      // Client-side search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        results = results.filter(t =>
          t.full_name.toLowerCase().includes(q) ||
          t.professional_title.toLowerCase().includes(q) ||
          (t.bio ?? '').toLowerCase().includes(q) ||
          (t.specialties ?? []).some(s => s.toLowerCase().includes(q))
        );
      }

      setTutors(results);
    } catch (err) {
      console.error('Tutors fetch error:', err);
    } finally {
      setIsLoading(false);
    }
  }, [cadreFilter, sortBy, searchQuery, instantOnly, maxRate, router, supabase]);

  useEffect(() => {
    fetchTutors();
  }, [fetchTutors]);

  return (
    <div className="space-y-5 pb-24 lg:pb-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-heading font-bold text-[var(--color-text)]">Find a Tutor</h1>
        <p className="text-sm text-[var(--color-text-secondary)] mt-1">
          Browse verified NCK nursing tutors and book a 1-on-1 session
        </p>
      </div>

      {/* Search + Filters */}
      <Card padding="sm">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-secondary)]"
              fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search by name, specialty..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="input pl-9 text-sm w-full"
            />
          </div>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            className="input text-sm min-w-[160px]"
          >
            {SORT_OPTIONS.map(o => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>

          {/* Max rate */}
          <input
            type="number"
            placeholder="Max KSh/hr"
            value={maxRate}
            onChange={e => setMaxRate(e.target.value ? Number(e.target.value) : '')}
            className="input text-sm w-32"
            min={0}
          />
        </div>

        {/* Cadre tabs + instant toggle */}
        <div className="flex items-center justify-between mt-3 flex-wrap gap-2">
          <div className="flex gap-1 flex-wrap">
            {CADRES.map(c => (
              <button
                key={c}
                onClick={() => setCadreFilter(c)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  cadreFilter === c
                    ? 'bg-primary text-white'
                    : 'bg-[var(--color-bg)] border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-primary/40'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={instantOnly}
              onChange={e => setInstantOnly(e.target.checked)}
              className="w-4 h-4 accent-primary"
            />
            <span className="text-xs font-medium text-[var(--color-text-secondary)]">Instant Book only</span>
          </label>
        </div>
      </Card>

      {/* Results */}
      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <Spinner size="lg" color="primary" />
        </div>
      ) : tutors.length === 0 ? (
        <Card className="text-center py-16">
          <div className="text-5xl mb-4">🔍</div>
          <h3 className="font-heading font-bold text-[var(--color-text)] mb-2">No tutors found</h3>
          <p className="text-sm text-[var(--color-text-secondary)] mb-4">
            Try adjusting your filters or search query
          </p>
          <Button variant="ghost" onClick={() => {
            setCadreFilter('All');
            setSearchQuery('');
            setInstantOnly(false);
            setMaxRate('');
          }}>
            Clear Filters
          </Button>
        </Card>
      ) : (
        <>
          <p className="text-sm text-[var(--color-text-secondary)]">
            {tutors.length} tutor{tutors.length !== 1 ? 's' : ''} found
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {tutors.map(tutor => (
              <TutorCard key={tutor.id} tutor={tutor} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
