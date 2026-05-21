"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Spinner } from '@/components/ui/Spinner';

interface ProfileData {
  full_name: string;
  email: string;
  phone: string;
  cadre: string;
  specialty?: string;
  institution: string;
  exam_date: string;
  exam_cycle: string;
}

export default function SettingsPage() {
  const router = useRouter();
  const supabase = createClient();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        router.push('/login');
        return;
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data: profileData } = await (supabase as any)
        .from('profiles')
        .select('full_name, email, phone')
        .eq('id', user.id)
        .single();

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data: studentData } = await (supabase as any)
        .from('student_profiles')
        .select('cadre, specialty, institution, exam_date, exam_cycle')
        .eq('id', user.id)
        .single();

      const pd = profileData as { full_name: string; email: string; phone: string } | null;
      const sd = studentData as { cadre: string; specialty?: string; institution: string; exam_date: string; exam_cycle: string } | null;

      if (pd && sd) {
        setProfile({
          full_name: pd.full_name,
          email: pd.email,
          phone: pd.phone,
          cadre: sd.cadre,
          specialty: sd.specialty,
          institution: sd.institution,
          exam_date: sd.exam_date,
          exam_cycle: sd.exam_cycle,
        });
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Spinner size="lg" color="primary" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-heading font-bold text-primary mb-6">
        Settings
      </h1>

      <div className="space-y-6">
        {/* Profile Information */}
        <Card>
          <h2 className="text-xl font-heading font-bold text-primary mb-4">
            Profile Information
          </h2>
          {profile && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-1">Full Name</label>
                <p className="text-neutral-dark dark:text-neutral-light">{profile.full_name}</p>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Email</label>
                <p className="text-neutral-dark dark:text-neutral-light">{profile.email}</p>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Phone</label>
                <p className="text-neutral-dark dark:text-neutral-light">{profile.phone}</p>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Cadre</label>
                <p className="text-neutral-dark dark:text-neutral-light">{profile.cadre}</p>
              </div>
              {profile.specialty && (
                <div>
                  <label className="block text-sm font-semibold mb-1">Specialty</label>
                  <p className="text-neutral-dark dark:text-neutral-light">{profile.specialty}</p>
                </div>
              )}
              <div>
                <label className="block text-sm font-semibold mb-1">Institution</label>
                <p className="text-neutral-dark dark:text-neutral-light">{profile.institution}</p>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Exam Date</label>
                <p className="text-neutral-dark dark:text-neutral-light">
                  {new Date(profile.exam_date).toLocaleDateString('en-KE', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Exam Cycle</label>
                <p className="text-neutral-dark dark:text-neutral-light">{profile.exam_cycle}</p>
              </div>
            </div>
          )}
          <div className="mt-6">
            <Button variant="outline" disabled>
              Edit Profile (Coming Soon)
            </Button>
          </div>
        </Card>

        {/* Account Settings */}
        <Card>
          <h2 className="text-xl font-heading font-bold text-primary mb-4">
            Account Settings
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Password</h3>
              <Button variant="outline" disabled>
                Change Password (Coming Soon)
              </Button>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Notifications</h3>
              <Button variant="outline" disabled>
                Manage Notifications (Coming Soon)
              </Button>
            </div>
          </div>
        </Card>

        {/* Danger Zone */}
        <Card className="border-error/20">
          <h2 className="text-xl font-heading font-bold text-error mb-4">
            Danger Zone
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Logout</h3>
              <p className="text-sm text-neutral-mid mb-3">
                Sign out of your account on this device
              </p>
              <Button variant="danger" onClick={handleLogout}>
                Logout
              </Button>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Delete Account</h3>
              <p className="text-sm text-neutral-mid mb-3">
                Permanently delete your account and all associated data
              </p>
              <Button variant="outline" disabled>
                Delete Account (Coming Soon)
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
