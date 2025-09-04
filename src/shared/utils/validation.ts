import { z } from 'zod';

// Validation regex constants
const PASSWORD_UPPERCASE = /[A-Z]/
const PASSWORD_LOWERCASE = /[a-z]/
const PASSWORD_NUMBER = /[0-9]/
const PASSWORD_SPECIAL = /[^A-Za-z0-9]/

// Common validation schemas
export const emailSchema = z
  .string()
  .min(1, 'Email is required')
  .email('Please enter a valid email address');

export const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .regex(PASSWORD_UPPERCASE, 'Password must contain at least one uppercase letter')
  .regex(PASSWORD_LOWERCASE, 'Password must contain at least one lowercase letter')
  .regex(PASSWORD_NUMBER, 'Password must contain at least one number')
  .regex(PASSWORD_SPECIAL, 'Password must contain at least one special character');

export const phoneSchema = z
  .string()
  .min(10, 'Phone number is required')
  .regex(/^\+?[\d\s\-()]+$/, 'Please enter a valid phone number');

export const nameSchema = z
  .string()
  .min(2, 'Name must be at least 2 characters')
  .max(50, 'Name must be less than 50 characters')
  .regex(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces');

export const otpSchema = z
  .string()
  .length(6, 'Verification code must be 6 digits')
  .regex(/^\d+$/, 'Verification code must only contain numbers');

// Form schemas
export const loginFormSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Password is required'),
});

export const registrationFormSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  confirmPassword: z.string(),
  fullName: nameSchema,
  phoneNumber: phoneSchema,
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export const phoneVerificationSchema = z.object({
  code: otpSchema,
});

export const twoFactorSchema = z.object({
  code: z.string()
    .length(6, 'Authentication code must be 6 digits')
    .regex(/^\d+$/, 'Authentication code must only contain numbers'),
});

// Validation utilities
export function validatePassword(password: string) {
  const checks = {
    length: password.length >= 8,
    uppercase: PASSWORD_UPPERCASE.test(password),
    lowercase: PASSWORD_LOWERCASE.test(password),
    number: PASSWORD_NUMBER.test(password),
    special: PASSWORD_SPECIAL.test(password),
  };

  const score = Object.values(checks).filter(Boolean).length;
  
  return {
    isValid: score === 5,
    score,
    checks,
    strength: score < 3 ? 'weak' : score < 5 ? 'medium' : 'strong'
  };
}

export function validateEmail(email: string) {
  try {
    emailSchema.parse(email);
    return { isValid: true, message: '' };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { isValid: false, message: error.errors[0].message };
    }
    return { isValid: false, message: 'Invalid email' };
  }
}

export function formatPhoneNumber(value: string): string {
  // Remove all non-digits
  const digits = value.replace(/\D/g, '');
  
  // Format as US phone number
  if (digits.length <= 3) {
    return digits;
  } else if (digits.length <= 6) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  } else {
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
  }
}

export function sanitizePhoneNumber(phoneNumber: string): string {
  // Remove formatting and add country code if not present
  const digits = phoneNumber.replace(/\D/g, '');
  
  if (digits.length === 10) {
    return `+1${digits}`;
  } else if (digits.length === 11 && digits.startsWith('1')) {
    return `+${digits}`;
  }
  
  return phoneNumber; // Return as-is if it doesn't match expected patterns
}


// Type exports for form validation
export type LoginFormData = z.infer<typeof loginFormSchema>;
export type RegistrationFormData = z.infer<typeof registrationFormSchema>;
export type PhoneVerificationData = z.infer<typeof phoneVerificationSchema>;
export type TwoFactorData = z.infer<typeof twoFactorSchema>;
