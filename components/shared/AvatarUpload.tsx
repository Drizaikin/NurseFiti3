"use client";

/**
 * AvatarUpload — reusable avatar upload widget used by students, tutors, and admin.
 * Uploads to the 'avatars' Supabase Storage bucket and returns the public URL.
 */

import { useRef, useState } from 'react';
import Image from 'next/image';
import { createClient } from '@/lib/supabase/client';
import { Spinner } from '@/components/ui/Spinner';
import toast from 'react-hot-toast';

interface AvatarUploadProps {
  userId: string;
  currentUrl: string | null;
  name?: string;
  size?: 'md' | 'lg' | 'xl';
  onUploaded: (newUrl: string) => void;
  /** If true, shows a soft nudge banner when currentUrl is null */
  showNudge?: boolean;
}

const SIZE_CLASSES = {
  md: 'w-16 h-16 text-xl',
  lg: 'w-20 h-20 text-2xl',
  xl: 'w-28 h-28 text-3xl',
};

export function AvatarUpload({ userId, currentUrl, name, size = 'lg', onUploaded, showNudge = false }: AvatarUploadProps) {
  const supabase = createClient();
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const getInitials = (n?: string) => {
    if (!n) return '?';
    const parts = n.trim().split(' ');
    return parts.length === 1
      ? parts[0][0].toUpperCase()
      : (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const handleFile = async (file: File) => {
    // Validate
    if (!['image/jpeg', 'image/png', 'image/webp', 'image/gif'].includes(file.type)) {
      toast.error('Please upload a JPG, PNG, WebP, or GIF image.');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image must be under 5 MB.');
      return;
    }

    // Show local preview immediately
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
    setUploading(true);

    try {
      const ext = file.name.split('.').pop()?.toLowerCase() ?? 'jpg';
      const path = `${userId}/avatar.${ext}`;

      // Upsert (overwrite if exists)
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(path, file, { upsert: true, contentType: file.type });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(path);

      // Add cache-buster so the browser doesn't serve the old image
      const urlWithBust = `${publicUrl}?t=${Date.now()}`;

      // Save to profiles table
      const { error: dbError } = await supabase
        .from('profiles')
        .update({ avatar_url: urlWithBust })
        .eq('id', userId);

      if (dbError) throw dbError;

      onUploaded(urlWithBust);
      toast.success('Profile picture updated!');
    } catch (err) {
      console.error('[AvatarUpload]', err);
      toast.error('Upload failed. Please try again.');
      setPreview(null);
    } finally {
      setUploading(false);
    }
  };

  const displayUrl = preview ?? currentUrl;
  const sizeClass = SIZE_CLASSES[size];

  return (
    <div className="flex flex-col items-center gap-3">
      {/* Avatar circle */}
      <div className="relative group">
        <div className={`${sizeClass} rounded-full overflow-hidden flex-shrink-0 ring-2 ring-primary/20`}>
          {displayUrl ? (
            <Image
              src={displayUrl}
              alt={name ?? 'Profile picture'}
              fill
              className="object-cover rounded-full"
            />
          ) : (
            <div className={`w-full h-full flex items-center justify-center rounded-full bg-primary text-white font-bold ${sizeClass}`}>
              {getInitials(name)}
            </div>
          )}
        </div>

        {/* Overlay on hover */}
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          aria-label="Upload profile picture"
          className="absolute inset-0 rounded-full bg-black/50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
        >
          {uploading
            ? <Spinner size="sm" color="white" />
            : <span className="text-white text-xs font-semibold px-1 text-center leading-tight">📷 Change</span>}
        </button>
      </div>

      {/* Upload button (always visible below avatar) */}
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
        className="text-xs text-primary hover:underline font-medium disabled:opacity-50"
      >
        {uploading ? 'Uploading…' : displayUrl ? 'Change photo' : 'Add photo'}
      </button>

      {/* Nudge banner */}
      {showNudge && !displayUrl && !uploading && (
        <div className="rounded-xl border border-accent/30 bg-accent/5 px-3 py-2 text-xs text-accent-dark dark:text-accent text-center max-w-[200px]">
          📸 Add a profile picture — students trust tutors they can see!
        </div>
      )}

      {/* Hidden file input */}
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        className="hidden"
        onChange={e => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
          // Reset so same file can be picked again
          e.target.value = '';
        }}
      />
    </div>
  );
}
