import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { tutorSignupSchema } from '@/lib/validations/auth';

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
      specialties: formData.get('specialties') ? JSON.parse(formData.get('specialties') as string) : undefined,
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
    const validatedData = tutorSignupSchema.parse(data);

    // Validate files
    if (!nckCertificate || !academicQualification || !nationalId) {
      return NextResponse.json(
        { error: 'All document uploads are required' },
        { status: 400 }
      );
    }

    // Validate file sizes
    if (nckCertificate.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: 'NCK certificate file size must be less than 5MB' },
        { status: 400 }
      );
    }
    if (academicQualification.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: 'Academic qualification file size must be less than 5MB' },
        { status: 400 }
      );
    }
    if (nationalId.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: 'National ID file size must be less than 5MB' },
        { status: 400 }
      );
    }

    // Validate file types
    if (!ALLOWED_FILE_TYPES.includes(nckCertificate.type)) {
      return NextResponse.json(
        { error: 'NCK certificate must be PDF, JPG, or PNG' },
        { status: 400 }
      );
    }
    if (!ALLOWED_FILE_TYPES.includes(academicQualification.type)) {
      return NextResponse.json(
        { error: 'Academic qualification must be PDF, JPG, or PNG' },
        { status: 400 }
      );
    }
    if (!ALLOWED_FILE_TYPES.includes(nationalId.type)) {
      return NextResponse.json(
        { error: 'National ID must be PDF, JPG, or PNG' },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    // Check if email already exists
    const { data: existingUser } = await supabase
      .from('profiles')
      .select('id')
      .eq('email', validatedData.email)
      .single();

    if (existingUser) {
      return NextResponse.json(
        { error: 'An account with this email already exists' },
        { status: 400 }
      );
    }

    // Create auth user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: validatedData.email,
      password: validatedData.password,
      options: {
        data: {
          full_name: validatedData.fullName,
          role: 'tutor',
        },
      },
    });

    if (authError || !authData.user) {
      console.error('Auth error:', authError);
      return NextResponse.json(
        { error: authError?.message || 'Failed to create account' },
        { status: 400 }
      );
    }

    const userId = authData.user.id;

    try {
      // Upload documents to Supabase Storage
      const timestamp = Date.now();
      const nckCertPath = `tutor-documents/${userId}/nck-certificate-${timestamp}.${nckCertificate.name.split('.').pop()}`;
      const academicQualPath = `tutor-documents/${userId}/academic-qualification-${timestamp}.${academicQualification.name.split('.').pop()}`;
      const nationalIdPath = `tutor-documents/${userId}/national-id-${timestamp}.${nationalId.name.split('.').pop()}`;

      // Convert files to ArrayBuffer
      const nckCertBuffer = await nckCertificate.arrayBuffer();
      const academicQualBuffer = await academicQualification.arrayBuffer();
      const nationalIdBuffer = await nationalId.arrayBuffer();

      // Upload NCK certificate
      const { error: nckUploadError } = await supabase.storage
        .from('documents')
        .upload(nckCertPath, nckCertBuffer, {
          contentType: nckCertificate.type,
          upsert: false,
        });

      if (nckUploadError) {
        throw new Error('Failed to upload NCK certificate');
      }

      // Upload academic qualification
      const { error: academicUploadError } = await supabase.storage
        .from('documents')
        .upload(academicQualPath, academicQualBuffer, {
          contentType: academicQualification.type,
          upsert: false,
        });

      if (academicUploadError) {
        throw new Error('Failed to upload academic qualification');
      }

      // Upload national ID
      const { error: idUploadError } = await supabase.storage
        .from('documents')
        .upload(nationalIdPath, nationalIdBuffer, {
          contentType: nationalId.type,
          upsert: false,
        });

      if (idUploadError) {
        throw new Error('Failed to upload national ID');
      }

      // Create profile record
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: userId,
          email: validatedData.email,
          full_name: validatedData.fullName,
          phone: validatedData.phone,
          role: 'tutor',
        });

      if (profileError) {
        throw new Error('Failed to create profile');
      }

      // Create tutor_profile record
      const { error: tutorProfileError } = await supabase
        .from('tutor_profiles')
        .insert({
          user_id: userId,
          nck_reg_number: validatedData.nckRegNumber,
          professional_title: validatedData.professionalTitle,
          years_experience: validatedData.yearsExperience,
          current_employer: validatedData.currentEmployer,
          cadres_taught: validatedData.cadresTaught,
          specialties: validatedData.specialties || [],
          bio: validatedData.bio,
          session_rate: validatedData.sessionRate,
          mpesa_number: validatedData.mpesaNumber,
          whatsapp_number: validatedData.whatsappNumber,
          nck_certificate_url: nckCertPath,
          academic_qualification_url: academicQualPath,
          national_id_url: nationalIdPath,
          verification_status: 'pending',
        });

      if (tutorProfileError) {
        throw new Error('Failed to create tutor profile');
      }

      // TODO: Send admin notification email
      // TODO: Send confirmation email to tutor

      return NextResponse.json(
        {
          message: 'Application submitted successfully',
          userId,
        },
        { status: 201 }
      );
    } catch (error: any) {
      // Cleanup: Delete auth user if profile creation failed
      await supabase.auth.admin.deleteUser(userId);

      // Cleanup: Delete uploaded files
      await supabase.storage.from('documents').remove([
        `tutor-documents/${userId}/nck-certificate-${timestamp}.${nckCertificate.name.split('.').pop()}`,
        `tutor-documents/${userId}/academic-qualification-${timestamp}.${academicQualification.name.split('.').pop()}`,
        `tutor-documents/${userId}/national-id-${timestamp}.${nationalId.name.split('.').pop()}`,
      ]);

      console.error('Profile creation error:', error);
      return NextResponse.json(
        { error: error.message || 'Failed to create tutor profile' },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error('Tutor signup error:', error);
    
    if (error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Invalid form data', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: error.message || 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
