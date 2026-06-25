"use client";

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { toast } from 'react-hot-toast';
import { createClient } from '@/lib/supabase/client';

export default function ApplyForm({ campaignId, initialData }: { campaignId: string, initialData: any }) {
  const router = useRouter();
  const supabase = createClient();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

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

  const [files, setFiles] = useState<{
    student_id_front: File | null;
    student_id_back: File | null;
    national_id_front: File | null;
    national_id_back: File | null;
  }>({
    student_id_front: null,
    student_id_back: null,
    national_id_front: null,
    national_id_back: null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (field: keyof typeof files, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFiles(prev => ({ ...prev, [field]: e.target.files![0] }));
    }
  };

  const uploadFile = async (file: File, path: string): Promise<string> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${path}/${fileName}`;

    const { error: uploadError, data } = await supabase.storage
      .from('scholarship_documents')
      .upload(filePath, file, { cacheControl: '3600', upsert: false });

    if (uploadError) throw uploadError;

    const { data: publicUrlData } = supabase.storage
      .from('scholarship_documents')
      .getPublicUrl(filePath);

    return publicUrlData.publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setUploadProgress(10);

    try {
      // Validate files
      if (!files.student_id_front || !files.student_id_back || !files.national_id_front || !files.national_id_back) {
        throw new Error('All 4 identification documents are strictly required.');
      }

      setUploadProgress(30);

      // Upload all 4 files
      const [
        student_id_front_url,
        student_id_back_url,
        national_id_front_url,
        national_id_back_url
      ] = await Promise.all([
        uploadFile(files.student_id_front, `${campaignId}/student_id_front`),
        uploadFile(files.student_id_back, `${campaignId}/student_id_back`),
        uploadFile(files.national_id_front, `${campaignId}/national_id_front`),
        uploadFile(files.national_id_back, `${campaignId}/national_id_back`),
      ]);

      setUploadProgress(70);

      const res = await fetch('/api/scholarships/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          campaign_id: campaignId,
          ...formData,
          student_id_front_url,
          student_id_back_url,
          national_id_front_url,
          national_id_back_url
        })
      });

      const data = await res.json();
      
      setUploadProgress(100);

      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit application');
      }

      toast.success('Application submitted successfully!');
      router.refresh(); 
    } catch (err: any) {
      toast.error(err.message);
      setIsSubmitting(false);
      setUploadProgress(0);
    }
  };

  const renderFileInput = (label: string, field: keyof typeof files, accept = "image/*,application/pdf") => (
    <div className="space-y-2">
      <label className="text-sm font-semibold text-primary">{label} *</label>
      <div className="relative group">
        <div className={`w-full flex items-center justify-center p-4 border-2 border-dashed rounded-xl transition-all duration-200 ${files[field] ? 'border-teal-500 bg-teal-50/50' : 'border-[var(--color-border)] hover:border-primary/50 hover:bg-primary/5 bg-[var(--color-bg)]'}`}>
          <div className="text-center">
            {files[field] ? (
              <div className="flex flex-col items-center">
                <span className="text-2xl mb-1">📄</span>
                <span className="text-xs font-semibold text-teal-700 truncate max-w-[150px]">{files[field]!.name}</span>
                <span className="text-[10px] text-teal-600/70">{(files[field]!.size / 1024 / 1024).toFixed(2)} MB</span>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <span className="text-2xl mb-1 opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-transform">📤</span>
                <span className="text-xs font-medium text-neutral-mid">Tap to upload</span>
              </div>
            )}
          </div>
        </div>
        <input 
          type="file" 
          accept={accept}
          onChange={(e) => handleFileChange(field, e)}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
      </div>
    </div>
  );

  return (
    <Card className="shadow-2xl border border-primary/10 overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-teal-400 via-primary to-amber-500"></div>
      
      <form onSubmit={handleSubmit} className="p-2 sm:p-6 space-y-10">
        
        {/* Section 1: Personal Info */}
        <section>
          <div className="flex items-center gap-3 mb-6 pb-2 border-b border-[var(--color-border)]">
            <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">1</div>
            <h2 className="text-xl font-heading font-bold text-primary">Personal Details</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-primary">Full Name *</label>
              <input required name="full_name" value={formData.full_name} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-primary">Email Address *</label>
              <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-primary">Phone Number *</label>
              <input required name="phone_number" value={formData.phone_number} onChange={handleChange} placeholder="07XX XXX XXX" className="w-full px-4 py-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-primary">National ID Number *</label>
              <input required name="national_id" value={formData.national_id} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-primary">County of Origin *</label>
              <input required name="county" value={formData.county} onChange={handleChange} placeholder="e.g. Samburu" className="w-full px-4 py-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-primary">Sub-County</label>
              <input name="sub_county" value={formData.sub_county} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all" />
            </div>
          </div>
        </section>

        {/* Section 2: Academic Info */}
        <section>
          <div className="flex items-center gap-3 mb-6 pb-2 border-b border-[var(--color-border)]">
            <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">2</div>
            <h2 className="text-xl font-heading font-bold text-primary">Academic Information</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-primary">Institution / University *</label>
              <input required name="institution" value={formData.institution} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-primary">Course / Program *</label>
              <input required name="course" value={formData.course} onChange={handleChange} placeholder="e.g. BScN, KRCHN" className="w-full px-4 py-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-primary">Student ID / Admission No. *</label>
              <input required name="student_id_number" value={formData.student_id_number} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-primary">Expected NCK Exam Date</label>
              <input type="month" name="exam_date" value={formData.exam_date} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all" />
            </div>
          </div>
        </section>

        {/* Section 3: Document Uploads */}
        <section>
          <div className="flex items-center gap-3 mb-6 pb-2 border-b border-[var(--color-border)]">
            <div className="w-8 h-8 rounded-full bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold">3</div>
            <h2 className="text-xl font-heading font-bold text-amber-600">Verification Documents</h2>
          </div>
          <p className="text-sm text-neutral-mid mb-6">
            Please upload clear, legible photos or scans of your identification documents. These are strictly required to verify your eligibility for the scholarship.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {renderFileInput("Student ID (Front)", "student_id_front")}
            {renderFileInput("Student ID (Back)", "student_id_back")}
            {renderFileInput("National ID (Front)", "national_id_front")}
            {renderFileInput("National ID (Back)", "national_id_back")}
          </div>
        </section>

        {/* Submit */}
        <div className="pt-8 border-t border-[var(--color-border)]">
          <Button 
            type="submit" 
            className="w-full py-4 text-lg font-bold shadow-lg hover:shadow-xl transition-all disabled:opacity-80 disabled:cursor-not-allowed" 
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="flex flex-col items-center justify-center">
                <span className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin"></div> 
                  Processing Application...
                </span>
                <span className="text-xs font-normal opacity-80 mt-1">Uploading secure documents ({uploadProgress}%)</span>
              </span>
            ) : 'Submit Scholarship Application'}
          </Button>
          <p className="text-xs text-center text-neutral-mid mt-4 max-w-lg mx-auto">
            By submitting this application, you confirm that all details and documents provided are accurate and truthful. Fraudulent applications will lead to permanent platform ban.
          </p>
        </div>
      </form>
    </Card>
  );
}
