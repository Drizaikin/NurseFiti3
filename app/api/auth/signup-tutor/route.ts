import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { tutorSignupSchema } from '@/lib/validations/auth';

function getAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );
}

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_FILE_TYPES = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    // Extract form fields
    const data = {
      fullName: formData.get('fullName') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      password: formData.get('password') as string,
      confirmPassword: formData.get('confirmPassword') as string,
      nckRegNumber: formData.get('nckRegNumber') as string,
      professionalTitle: formData.get('professionalTitle') as string,
      yearsExperience: Number(formData.get('yearsExperience')),
      currentEmployer: formData.get('currentEmployer') as string,
      cadresTaught: JSON.parse(formData.get('cadresTaught') as string),
      specialties: formData.get('specialties')
        ? JSON.parse(formData.get('specialties') as string)
        : undefined,
      bio: formData.get('bio') as string,
      sessionRate: Number(formData.get('sessionRate')),
      mpesaNumber: formData.get('mpesaNumber') as string,
      whatsappNumber: formData.get('whatsappNumber') as string,
      agreeToTerms: formData.get('agreeToTerms') === 'true',
    };

    // Extract optional files
    const nckCertificate = formData.get('nckCertificate') as File | null;
    const academicQualification = formData.get('academicQualification') as File | null;
    const nationalId = formData.get('nationalId') as File | null;

    // Validate form data
    const validationResult = tutorSignupSchema.safeParse(data);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Invalid form data', details: validationResult.error.flatten().fieldErrors },
        { status: 400 }
      );
    }
    const validatedData = validationResult.data;

    // Validate any files that were provided
    for (const [label, file] of [
      ['NCK certificate', nckCertificate],
      ['Academic qualification', academicQualification],
      ['National ID', nationalId],
    ] as [string, File | null][]) {
      if (!file) continue;
      if (file.size > MAX_FILE_SIZE) {
        return NextResponse.json({ error: `${label} must be less than 5MB` }, { status: 400 });
      }
      if (!ALLOWED_FILE_TYPES.includes(file.type)) {
        return NextResponse.json({ error: `${label} must be PDF, JPG, or PNG` }, { status: 400 });
      }
    }

    const supabase = getAdminClient();

    // Helper to get file extension
    const ext = (f: File) => f.name.split('.').pop() ?? 'bin';

    // Check if email already exists
    const { data: existingUser } = await supabase
      .from('profiles')
      .select('id')
      .eq('email', validatedData.email)
      .single();

    if (existingUser) {
      return NextResponse.json(
        { error: 'An account with this email already exists' },
        { status: 409 }
      );
    }

    // Create auth user
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: validatedData.email,
      password: validatedData.password,
      email_confirm: false,
      user_metadata: { full_name: validatedData.fullName, role: 'tutor' },
    });

    if (authError || !authData.user) {
      return NextResponse.json(
        { error: authError?.message || 'Failed to create account' },
        { status: 400 }
      );
    }

    const userId = authData.user.id;
    const timestamp = Date.now();
    const uploadedPaths: string[] = [];

    try {
      // Upload any documents that were provided (all optional at signup)
      const docUploads: Array<[string, File, string]> = [];
      if (nckCertificate) docUploads.push([`tutor-documents/${userId}/nck-certificate-${timestamp}.${ext(nckCertificate)}`, nckCertificate, 'nck']);
      if (academicQualification) docUploads.push([`tutor-documents/${userId}/academic-qualification-${timestamp}.${ext(academicQualification)}`, academicQualification, 'academic']);
      if (nationalId) docUploads.push([`tutor-documents/${userId}/national-id-${timestamp}.${ext(nationalId)}`, nationalId, 'id']);

      const docPaths: Record<string, string> = {};
      for (const [path, file, key] of docUploads) {
        const { error: uploadError } = await supabase.storage
          .from('documents')
          .upload(path, await file.arrayBuffer(), { contentType: file.type, upsert: false });
        if (uploadError) throw new Error(`Failed to upload document: ${uploadError.message}`);
        uploadedPaths.push(path);
        docPaths[key] = path;
      }

      // Create profile record
      const { error: profileError } = await supabase.from('profiles').insert({
        id: userId,
        email: validatedData.email,
        full_name: validatedData.fullName,
        phone: validatedData.phone,
        role: 'tutor',
      });
      if (profileError) throw new Error(`Failed to create profile: ${profileError.message}`);

      // Create tutor_profile record — optional fields left null until completed from dashboard
      const { error: tutorProfileError } = await supabase.from('tutor_profiles').insert({
        id: userId,
        nck_reg_number: validatedData.nckRegNumber,
        professional_title: validatedData.professionalTitle,
        years_experience: validatedData.yearsExperience,
        current_employer: validatedData.currentEmployer,
        cadres_taught: validatedData.cadresTaught ?? [],
        specialties: validatedData.specialties ?? [],
        bio: validatedData.bio ?? null,
        rate_per_hour: validatedData.sessionRate ?? null,
        mpesa_number: validatedData.mpesaNumber ?? null,
        whatsapp_number: validatedData.whatsappNumber ?? null,
        nck_certificate_url: docPaths.nck ?? null,
        academic_qualification_url: docPaths.academic ?? null,
        national_id_url: docPaths.id ?? null,
        verification_status: 'pending',
        session_platform: ['Zoom', 'Google Meet', 'WhatsApp'],
      });
      if (tutorProfileError) throw new Error(`Failed to create tutor profile: ${tutorProfileError.message}`);

      // Notify the tutor to complete their profile from the dashboard (non-critical)
      try {
        await supabase.from('notifications').insert({
          user_id: userId,
          type: 'profile_incomplete',
          title: 'Complete your tutor profile',
          body: 'Welcome to NurseFiti! Please complete your specialization, upload your documents, and add your M-Pesa number so we can activate your profile and start paying you.',
          action_url: '/tutor-profile/complete',
        } as any);
      } catch { /* non-critical */ }

      return NextResponse.json(
        { message: 'Application submitted successfully', userId },
        { status: 201 }
      );
    } catch (error: any) {
      // Best-effort cleanup
      await supabase.auth.admin.deleteUser(userId).catch(() => {});
      if (uploadedPaths.length) {
        await supabase.storage.from('documents').remove(uploadedPaths).catch(() => {});
      }

      console.error('Tutor profile creation error:', error);
      return NextResponse.json({ error: error.message || 'Failed to create tutor profile' }, { status: 500 });
    }
  } catch (error: any) {
    console.error('Tutor signup error:', error);
    return NextResponse.json(
      { error: error.message || 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
