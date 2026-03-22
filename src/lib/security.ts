import { z } from 'zod';

// Sanitization utilities
export function sanitizeString(input: string): string {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential XSS characters
    .slice(0, 1000); // Limit length
}

export function sanitizeEmail(email: string): string {
  return email.trim().toLowerCase().slice(0, 255);
}

export function sanitizeFilename(filename: string): string {
  return filename
    .replace(/[^a-zA-Z0-9._-]/g, '_')
    .replace(/_{2,}/g, '_')
    .slice(0, 255);
}

// File validation
export const FILE_VALIDATION = {
  MAX_SIZE: 10 * 1024 * 1024, // 10MB
  ALLOWED_TYPES: ['image/png', 'image/jpeg', 'image/jpg', 'application/pdf'],
  ALLOWED_EXTENSIONS: ['.png', '.jpg', '.jpeg', '.pdf'],
} as const;

export function validateFile(file: File): { valid: boolean; error?: string } {
  // Check file size
  if (file.size > FILE_VALIDATION.MAX_SIZE) {
    return { valid: false, error: 'El archivo excede el límite de 10MB' };
  }

  // Check file type
  if (!FILE_VALIDATION.ALLOWED_TYPES.includes(file.type as any)) {
    return { valid: false, error: 'Tipo de archivo no permitido' };
  }

  return { valid: true };
}

// Zod schemas for form validation
export const loginSchema = z.object({
  email: z.string().email('Email inválido').max(255),
  password: z.string().min(1, 'Contraseña requerida').max(128),
});

export const registerSchema = z
  .object({
    full_name: z.string().min(2, 'Mínimo 2 caracteres').max(100),
    email: z.string().email('Email inválido').max(255),
    password: z
      .string()
      .min(6, 'Mínimo 6 caracteres')
      .max(128)
      .regex(/[A-Z]/, 'Al menos una mayúscula')
      .regex(/[0-9]/, 'Al menos un número'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword'],
  });

export const createApiKeySchema = z.object({
  name: z.string().min(1, 'Nombre requerido').max(50),
  description: z.string().max(200).optional(),
});

// Input sanitization hook for forms
export function sanitizeInput<T extends Record<string, any>>(data: T): T {
  const sanitized: any = {};
  for (const [key, value] of Object.entries(data)) {
    if (typeof value === 'string') {
      sanitized[key] = sanitizeString(value);
    } else {
      sanitized[key] = value;
    }
  }
  return sanitized as T;
}
