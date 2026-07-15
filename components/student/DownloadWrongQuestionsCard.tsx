"use client";

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Spinner } from '@/components/ui/Spinner';
import toast from 'react-hot-toast';
import { getLimits } from '@/lib/planLimits';

interface Props {
  planTier: string;
}

export function DownloadWrongQuestionsCard({ planTier }: Props) {
  const [isDownloading, setIsDownloading] = useState(false);
  
  const limits = getLimits(planTier);
  const canDownload = limits.wrongQuestionsDownload;

  const handleDownload = async (mode: 'all' | 'new') => {
    if (!canDownload) {
      toast.error('This feature is only available on Weekly, Monthly, and 90-Day plans.');
      return;
    }

    setIsDownloading(true);
    try {
      const res = await fetch('/api/practice/download-wrong', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mode }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        toast.error(errorData.error || 'Failed to download practice review');
        setIsDownloading(false);
        return;
      }

      // The response is an HTML blob that we want to download
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      
      const dateStr = new Date().toISOString().split('T')[0];
      const filename = mode === 'new' 
        ? `nursefiti-new-mistakes-${dateStr}.html` 
        : `nursefiti-all-mistakes-${dateStr}.html`;
        
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      
      toast.success('Practice review generated successfully! Open the file in any browser to view and print.');
    } catch (err) {
      console.error(err);
      toast.error('An error occurred. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <Card className="mb-6 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span>📥</span> Download Questions You Got Wrong
            {!canDownload && (
              <span className="text-[10px] uppercase font-bold tracking-wider bg-amber-100 text-amber-800 px-2 py-0.5 rounded">Pro</span>
            )}
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-lg">
            Access the questions you got wrong and revise to ensure you master the concepts you initially did not understand.
          </p>
        </div>
        
        <div className="flex flex-wrap gap-3 w-full sm:w-auto">
          {isDownloading ? (
             <div className="flex items-center gap-2 text-sm text-slate-500 px-4 py-2">
               <Spinner size="sm" /> Generating PDF...
             </div>
          ) : (
            <div className="flex gap-4">
              <div className="flex flex-col gap-1 items-end sm:items-start">
                <Button 
                  variant="outline" 
                  onClick={() => handleDownload('new')}
                  disabled={!canDownload}
                  className="w-full text-sm whitespace-nowrap"
                >
                  Download New Only
                </Button>
                <span className="text-[11px] text-slate-500 max-w-[150px] leading-tight text-right sm:text-left">
                  Downloads only the new mistakes you haven't printed yet.
                </span>
              </div>
              <div className="flex flex-col gap-1 items-end sm:items-start">
                <Button 
                  variant="primary" 
                  onClick={() => handleDownload('all')}
                  disabled={!canDownload}
                  className="w-full text-sm whitespace-nowrap"
                >
                  Download All
                </Button>
                <span className="text-[11px] text-slate-500 max-w-[150px] leading-tight text-right sm:text-left">
                  Downloads every single mistake you've ever made.
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {!canDownload && (
        <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
          <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
            Unlock this feature by upgrading to a Weekly, Monthly, or 90-Day plan. Generating printable reviews of your weak areas allows you to actively revise the exact concepts you struggle with, significantly boosting your exam readiness!
          </p>
        </div>
      )}
    </Card>
  );
}
