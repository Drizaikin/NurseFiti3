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
  // BUG 4: Guard env vars before doing anything else
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return NextResponse.json({ error: 'Server configuration error.' }, { status: 500 });
  }

  try {
    const formData = await request.formData();

    // BUG 1: Store raw values first, then conditionally parse / coerce
    const cadresTaughtRaw = formData.get('cadresTaught');
    const specialtiesRaw = formData.get('specialties');
    const bioRaw = formData.get('bio');
    const sessionRateRaw = formData.get('sessionRate');
    const mpesaNumberRaw = formData.get('mpesaNumber');
    const whatsappNumberRaw = formData.get('whatsappNumber');

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
      cadresTaught: cadresTaughtRaw ? JSON.parse(cadresTaughtRaw as string) : undefined,
      specialties: specialtiesRaw ? JSON.parse(specialtiesRaw as string) : undefined,
      bio: bioRaw && bioRaw !== '' ? (bioRaw as string) : undefined,
      sessionRate: sessionRateRaw ? Number(sessionRateRaw) : undefined,
      mpesaNumber: mpesaNumberRaw && mpesaNumberRaw !== '' ? (mpesaNumberRaw as string) : undefined,
      whatsappNumber: whatsappNumberRaw && whatsappNumberRaw !== '' ? (whatsappNumberRaw as string) : undefined,
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

    // Validate files — only if provided (optional in 2-step signup)
    const hasFiles = nckCertificate && academicQualification && nationalId;

    if (hasFiles) {
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
    }

    const supabase = getAdminClient();

    // Helper to get file extension
    const ext = (f: File) => f.name.split('.').pop() ?? 'bin';

    // BUG 3: Use maybeSingle() so a missing row does not throw an error
    const { data: existingUser } = await supabase
      .from('profiles')
      .select('id')
      .eq('email', validatedData.email)
      .maybeSingle();

    if (existingUser) {
      return NextResponse.json(
        { error: 'An account with this email already exists' },
        { status: 409 }
      );
    }

    // BUG 2: Set email_confirm to true so tutors can log in immediately
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: validatedData.email,
      password: validatedData.password,
      email_confirm: true,
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
      let paths = {
        nck: null as string | null,
        academic: null as string | null,
        id: null as string | null,
      };

      // Upload documents only if provided
      if (hasFiles) {
        paths = {
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
      }

      // Create profile record
      const { error: profileError } = await supabase.from('profiles').insert({
        id: userId,
        email: validatedData.email,
        full_name: validatedData.fullName,
        phone: validatedData.phone,
        role: 'tutor',
      });
      if (profileError) {
        console.error('profiles insert error:', JSON.stringify(profileError));
        throw new Error(`Failed to create profile: ${profileError.message}`);
      }

      // Create tutor_profile record — uses defaults for optional fields
      // rate_per_hour and cadres_taught may be null/empty at this stage;
      // the tutor completes them in the complete-profile flow.
      const tutorProfilePayload: Record<string, unknown> = {
        id: userId,
        nck_reg_number:     validatedData.nckRegNumber,
        professional_title: validatedData.professionalTitle,
        years_experience:   validatedData.yearsExperience,
        current_employer:   validatedData.currentEmployer,
        cadres_taught:      validatedData.cadresTaught ?? [],
        specialties:        validatedData.specialties ?? [],
        bio:                validatedData.bio ?? null,
        mpesa_number:       validatedData.mpesaNumber ?? null,
        whatsapp_number:    validatedData.whatsappNumber ?? null,
        nck_certificate_url:        paths.nck,
        academic_qualification_url: paths.academic,
        national_id_url:            paths.id,
        verification_status: 'pending',
        session_platform:   ['Zoom', 'Google Meet', 'WhatsApp'],
      };

      // Only include rate_per_hour if provided — avoids NOT NULL violation
      if (validatedData.sessionRate != null) {
        tutorProfilePayload.rate_per_hour = validatedData.sessionRate;
      }

      const { error: tutorProfileError } = await supabase.from('tutor_profiles').insert(tutorProfilePayload);
      if (tutorProfileError) {
        console.error('tutor_profiles insert error:', JSON.stringify(tutorProfileError));
        throw new Error(`Failed to create tutor profile: ${tutorProfileError.message}`);
      }

      return NextResponse.json(
        { message: 'Application submitted successfully', userId },
        { status: 201 }
      );
    } catch (error: any) {
      // Best-effort cleanup
      await supabase.auth.admin.deleteUser(userId).catch(() => {});
      if (hasFiles) {
        await supabase.storage
          .from('documents')
          .remove([
            `tutor-documents/${userId}/nck-certificate-${timestamp}.${ext(nckCertificate!)}`,
            `tutor-documents/${userId}/academic-qualification-${timestamp}.${ext(academicQualification!)}`,
            `tutor-documents/${userId}/national-id-${timestamp}.${ext(nationalId!)}`,
          ])
          .catch(() => {});
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
