import { z } from 'zod';

// Student signup schema
export const studentSignupSchema = z.object({
  fullName: z.string()
    .min(2, 'Full name must be at least 2 characters')
    .max(100, 'Full name must be less than 100 characters')
    .regex(/^[a-zA-Z\s]+$/, 'Full name can only contain letters and spaces'),
  
  email: z.string()
    .email('Invalid email address')
    .toLowerCase(),
  
  phone: z.string()
    .regex(/^(\+254|0)[17]\d{8}$/, 'Invalid Kenyan phone number. Use format: +254712345678 or 0712345678')
    .transform(val => val.startsWith('0') ? '+254' + val.slice(1) : val),
  
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
  
  confirmPassword: z.string(),
  
  cadre: z.enum(['KRCHN', 'BScN', 'Higher Diploma'], {
    errorMap: () => ({ message: 'Please select your nursing cadre' })
  }),
  
  specialty: z.string().optional(),
  
  institution: z.string()
    .min(2, 'Institution name is required')
    .max(200, 'Institution name is too long'),
  
  examDate: z.string()
    .refine(val => !isNaN(Date.parse(val)), 'Invalid exam date'),
  
  examCycle: z.enum(['May', 'August', 'November'], {
    errorMap: () => ({ message: 'Please select exam cycle' })
  }),
  
  agreeToTerms: z.boolean()
    .refine(val => val === true, 'You must agree to the terms and conditions'),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
}).refine(data => {
  // If Higher Diploma is selected, specialty is required
  if (data.cadre === 'Higher Diploma' && !data.specialty) {
    return false;
  }
  return true;
}, {
  message: "Specialty is required for Higher Diploma",
  path: ["specialty"],
});

export type StudentSignupInput = z.infer<typeof studentSignupSchema>;

// Tutor signup schema
export const tutorSignupSchema = z.object({
  // Step 1: Personal Information
  fullName: z.string()
    .min(2, 'Full name must be at least 2 characters')
    .max(100, 'Full name must be less than 100 characters'),
  
  email: z.string()
    .email('Invalid email address')
    .toLowerCase(),
  
  phone: z.string()
    .regex(/^(\+254|0)[17]\d{8}$/, 'Invalid Kenyan phone number'),
  
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  
  confirmPassword: z.string(),
  
  // Step 2: Professional Credentials
  nckRegNumber: z.string()
    .min(5, 'NCK registration number is required')
    .max(50, 'Invalid NCK registration number'),
  
  professionalTitle: z.string()
    .min(2, 'Professional title is required')
    .max(200, 'Professional title is too long'),
  
  yearsExperience: z.number()
    .min(0, 'Years of experience must be 0 or greater')
    .max(50, 'Years of experience seems too high'),
  
  currentEmployer: z.string()
    .min(2, 'Current or most recent employer is required')
    .max(200, 'Employer name is too long'),
  
  // Step 3: Specialization
  cadresTaught: z.array(z.enum(['KRCHN', 'BScN', 'Higher Diploma']))
    .min(1, 'Select at least one cadre you can teach'),
  
  specialties: z.array(z.string()).optional(),
  
  bio: z.string()
    .min(200, 'Bio must be at least 200 characters')
    .max(400, 'Bio must be less than 400 characters'),
  
  sessionRate: z.number()
    .min(500, 'Session rate must be at least KSh 500')
    .max(10000, 'Session rate must be less than KSh 10,000'),
  
  // Step 4: Documents (handled separately as files)
  
  // Step 5: M-Pesa
  mpesaNumber: z.string()
    .regex(/^(\+254|0)[17]\d{8}$/, 'Invalid M-Pesa number'),
  
  whatsappNumber: z.string()
    .regex(/^(\+254|0)[17]\d{8}$/, 'Invalid WhatsApp number'),
  
  agreeToTerms: z.boolean()
    .refine(val => val === true, 'You must agree to the terms and conditions'),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export type TutorSignupInput = z.infer<typeof tutorSignupSchema>;

// Login schema
export const loginSchema = z.object({
  email: z.string()
    .email('Invalid email address')
    .toLowerCase(),
  
  password: z.string()
    .min(1, 'Password is required'),
  
  rememberMe: z.boolean().optional(),
});

export type LoginInput = z.infer<typeof loginSchema>;

// Password reset schema
export const passwordResetSchema = z.object({
  email: z.string()
    .email('Invalid email address')
    .toLowerCase(),
});

export type PasswordResetInput = z.infer<typeof passwordResetSchema>;
