"use client";

import { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/Badge';
import { Spinner } from '@/components/ui/Spinner';
import toast from 'react-hot-toast';
import { getLimits } from '@/lib/planLimits';

export interface MockResult {
  id: string;
  cadre: string;
  paper: string;
  score_percentage: number;
  correct_answers: number;
  total_questions: number;
  time_used_minutes: number;
  passed: boolean;
  completed_at: string;
}

export function DownloadResultButton({ resultId, paper, completedAt }: {
  resultId: string;
  paper: string;
  completedAt: string;
}) {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      const res = await fetch('/api/mock-exam/download-result', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resultId }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: 'Download failed' }));
        throw new Error(err.error ?? 'Download failed');
      }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      const dateStr = new Date(completedAt).toISOString().split('T')[0];
      a.download = `nursefiti-${paper.replace(/\s+/g, '-').toLowerCase()}-${dateStr}.html`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      toast.success('Download ready — open the file in any browser to view.');
      
      try {
        const downloaded = JSON.parse(localStorage.getItem('downloaded_mocks') || '[]');
        if (!downloaded.includes(resultId)) {
          downloaded.push(resultId);
          localStorage.setItem('downloaded_mocks', JSON.stringify(downloaded));
          window.dispatchEvent(new Event('mock_downloaded'));
        }
      } catch (e) {
        console.error('Error tracking download', e);
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Download failed');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <button
      onClick={handleDownload}
      disabled={isDownloading}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border border-primary/30 text-primary hover:bg-primary-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
    >
      {isDownloading
        ? <><Spinner size="sm" />&nbsp;…</>
        : '⬇ HTML'}
    </button>
  );
}

export function MockExamHistoryTable({ mockExams, planTier }: { mockExams: MockResult[], planTier: string }) {
  const [downloadedMocks, setDownloadedMocks] = useState<string[]>([]);
  const limits = getLimits(planTier);

  useEffect(() => {
    const syncDownloads = () => {
      try {
        setDownloadedMocks(JSON.parse(localStorage.getItem('downloaded_mocks') || '[]'));
      } catch (e) {}
    };
    syncDownloads();
    window.addEventListener('mock_downloaded', syncDownloads);
    return () => window.removeEventListener('mock_downloaded', syncDownloads);
  }, []);

  if (mockExams.length === 0) return null;

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-[var(--color-border)]">
            <th className="text-left py-2 pr-4 text-neutral-mid font-semibold">Date</th>
            <th className="text-left py-2 pr-4 text-neutral-mid font-semibold">Paper</th>
            <th className="text-left py-2 pr-4 text-neutral-mid font-semibold">Score</th>
            <th className="text-left py-2 pr-4 text-neutral-mid font-semibold">Time</th>
            <th className="text-left py-2 pr-4 text-neutral-mid font-semibold">Result</th>
            <th className="text-left py-2 text-neutral-mid font-semibold">Download</th>
          </tr>
        </thead>
        <tbody>
          {mockExams.map((m) => (
            <tr key={m.id} className="border-b border-[var(--color-border)] last:border-0">
              <td className="py-3 pr-4 text-[var(--color-text)]">
                {new Date(m.completed_at).toLocaleDateString('en-KE', { day: 'numeric', month: 'short', year: 'numeric' })}
              </td>
              <td className="py-3 pr-4 text-[var(--color-text)]">{m.cadre} {m.paper}</td>
              <td className="py-3 pr-4 font-semibold" style={{ color: m.score_percentage >= 50 ? '#1A9E75' : '#E84545' }}>
                {m.score_percentage.toFixed(0)}%
              </td>
              <td className="py-3 pr-4 text-neutral-mid">{m.time_used_minutes}m</td>
              <td className="py-3 pr-4">
                <Badge variant={m.passed ? 'green' : 'red'} size="sm">{m.passed ? 'Pass' : 'Fail'}</Badge>
              </td>
              <td className="py-3">
                {(() => {
                  const isDownloaded = downloadedMocks.includes(m.id);
                  const canDownloadNew = downloadedMocks.length < limits.mockExamDownloads;
                  const showDownload = limits.mockExamDownloads > 0 && (limits.mockExamDownloads === Infinity || isDownloaded || canDownloadNew);

                  return showDownload ? (
                    <DownloadResultButton resultId={m.id} paper={m.paper} completedAt={m.completed_at} />
                  ) : (
                    <span className="text-xs text-neutral-mid">Limit reached</span>
                  );
                })()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
