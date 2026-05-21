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

    // Extract files
    const nckCertificate = formData.get('nckCertificate') as File;
    const academicQualification = formData.get('academicQualification') as File;
    const nationalId = formData.get('nationalId') as File;

    // Validate form data
    const validationResult = tutorSignupSchema.safeParse(data);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Invalid form data', details: validationResult.error.flatten().fieldErrors },
        { status: 400 }
      );
    }
    const validatedData = validationResult.data;

    // Validate files
    if (!nckCertificate || !academicQualification || !nationalId) {
      return NextResponse.json(
        { error: 'All document uploads are required' },
        { status: 400 }
      );
    }

    for (const [label, file] of [
      ['NCK certificate', nckCertificate],
      ['Academic qualification', academicQualification],
      ['National ID', nationalId],
    ] as [string, File][]) {
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

    try {
      // Upload documents to Supabase Storage
      const paths = {
        nck: `tutor-documents/${userId}/nck-certificate-${timestamp}.${ext(nckCertificate)}`,
        academic: `tutor-documents/${userId}/academic-qualification-${timestamp}.${ext(academicQualification)}`,
        id: `tutor-documents/${userId}/national-id-${timestamp}.${ext(nationalId)}`,
      };

      for (const [path, file] of [
        [paths.nck, nckCertificate],
        [paths.academic, academicQualification],
        [paths.id, nationalId],
      ] as [string, File][]) {
        const { error: uploadError } = await supabase.storage
          .from('documents')
          .upload(path, await file.arrayBuffer(), { contentType: file.type, upsert: false });
        if (uploadError) throw new Error(`Failed to upload document: ${uploadError.message}`);
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

      // Create tutor_profile record — uses `id` as FK (matches schema)
      const { error: tutorProfileError } = await supabase.from('tutor_profiles').insert({
        id: userId,
        nck_reg_number: validatedData.nckRegNumber,
        professional_title: validatedData.professionalTitle,
        years_experience: validatedData.yearsExperience,
        current_employer: validatedData.currentEmployer,
        cadres_taught: validatedData.cadresTaught,
        specialties: validatedData.specialties || [],
        bio: validatedData.bio,
        rate_per_hour: validatedData.sessionRate,
        mpesa_number: validatedData.mpesaNumber,
        whatsapp_number: validatedData.whatsappNumber,
        nck_certificate_url: paths.nck,
        academic_qualification_url: paths.academic,
        national_id_url: paths.id,
        verification_status: 'pending',
        session_platform: ['Zoom', 'Google Meet', 'WhatsApp'],
      });
      if (tutorProfileError) throw new Error(`Failed to create tutor profile: ${tutorProfileError.message}`);

      return NextResponse.json(
        { message: 'Application submitted successfully', userId },
        { status: 201 }
      );
    } catch (error: any) {
      // Best-effort cleanup
      await supabase.auth.admin.deleteUser(userId).catch(() => {});
      await supabase.storage
        .from('documents')
        .remove([
          `tutor-documents/${userId}/nck-certificate-${timestamp}.${ext(nckCertificate)}`,
          `tutor-documents/${userId}/academic-qualification-${timestamp}.${ext(academicQualification)}`,
          `tutor-documents/${userId}/national-id-${timestamp}.${ext(nationalId)}`,
        ])
        .catch(() => {});

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
