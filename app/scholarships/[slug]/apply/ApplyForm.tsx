"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { toast } from 'react-hot-toast';

export default function ApplyForm({ campaignId, initialData }: { campaignId: string, initialData: any }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    full_name: initialData.full_name || '',
    email: initialData.email || '',
    phone_number: '',
    institution: '',
    course: '',
    exam_date: '',
    county: '',
    sub_county: '',
    national_id: '',
    student_id_number: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/scholarships/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          campaign_id: campaignId,
          ...formData
        })
      });

      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit application');
      }

      toast.success('Application submitted successfully!');
      router.refresh(); // This will trigger the server component to show the "Application Received" state
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="shadow-lg border-none">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-primary">Full Name *</label>
            <input required name="full_name" value={formData.full_name} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] focus:outline-none focus:border-primary transition-colors" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-primary">Email Address *</label>
            <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] focus:outline-none focus:border-primary transition-colors" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-primary">Phone Number *</label>
            <input required name="phone_number" value={formData.phone_number} onChange={handleChange} placeholder="07XX XXX XXX" className="w-full px-4 py-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] focus:outline-none focus:border-primary transition-colors" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-primary">National ID Number</label>
            <input name="national_id" value={formData.national_id} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] focus:outline-none focus:border-primary transition-colors" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-primary">Institution / University *</label>
            <input required name="institution" value={formData.institution} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] focus:outline-none focus:border-primary transition-colors" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-primary">Course / Program *</label>
            <input required name="course" value={formData.course} onChange={handleChange} placeholder="e.g. BScN, KRCHN" className="w-full px-4 py-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] focus:outline-none focus:border-primary transition-colors" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-primary">Student ID / Admission No.</label>
            <input name="student_id_number" value={formData.student_id_number} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] focus:outline-none focus:border-primary transition-colors" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-primary">Expected NCK Exam Date</label>
            <input type="month" name="exam_date" value={formData.exam_date} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] focus:outline-none focus:border-primary transition-colors" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-primary">County of Origin *</label>
            <input required name="county" value={formData.county} onChange={handleChange} placeholder="e.g. Samburu" className="w-full px-4 py-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] focus:outline-none focus:border-primary transition-colors" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-primary">Sub-County</label>
            <input name="sub_county" value={formData.sub_county} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] focus:outline-none focus:border-primary transition-colors" />
          </div>
        </div>

        <div className="pt-4 border-t border-[var(--color-border)]">
          <Button type="submit" className="w-full py-3" disabled={isSubmitting}>
            {isSubmitting ? <span className="flex items-center gap-2 justify-center"><div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin"></div> Submitting...</span> : 'Submit Scholarship Application'}
          </Button>
          <p className="text-xs text-center text-neutral-mid mt-4">
            By submitting this application, you confirm that all details provided are accurate and truthful.
          </p>
        </div>
      </form>
    </Card>
  );
}
