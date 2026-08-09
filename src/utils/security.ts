import DOMPurify from 'dompurify';

/**
 * Security & Sanitization Utilities for SKV Construction
 */

// Max input length constants to prevent buffer/payload inflation attacks
export const INPUT_LIMITS = {
  NAME: 100,
  EMAIL: 100,
  PHONE: 30,
  COMPANY: 120,
  LOCATION: 150,
  BUDGET: 50,
  MESSAGE: 2000,
  PROJECT_TYPE: 80,
};

/**
 * Sanitizes input strings using DOMPurify to prevent XSS and script injection.
 */
export function sanitizeInput(input: string, maxLength?: number): string {
  if (!input) return '';
  
  // Trim leading/trailing whitespace
  let clean = input.trim();
  
  // Enforce length limit if specified
  if (maxLength && clean.length > maxLength) {
    clean = clean.substring(0, maxLength);
  }

  // Sanitize HTML/Script tags completely
  return DOMPurify.sanitize(clean, {
    ALLOWED_TAGS: [], // Disallow all HTML tags for plain text fields
    ALLOWED_ATTR: [],
  });
}

/**
 * Validates email format using strict RFC-compliant regex
 */
export function isValidEmail(email: string): boolean {
  if (!email || email.length > INPUT_LIMITS.EMAIL) return false;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email.trim());
}

/**
 * Validates international/national phone numbers
 */
export function isValidPhone(phone: string): boolean {
  if (!phone) return true; // Phone is optional in some forms unless required
  if (phone.length > INPUT_LIMITS.PHONE) return false;
  // Allows +, digits, spaces, hyphens, parentheses
  const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/;
  return phoneRegex.test(phone.trim());
}

/**
 * Client-Side Rate Limiter helper (prevents rapid automated form spamming)
 */
const submissionTracker = new Map<string, number>();

export function isRateLimited(formKey: string, cooldownMs: number = 10000): boolean {
  const lastSubmit = submissionTracker.get(formKey);
  const now = Date.now();
  if (lastSubmit && now - lastSubmit < cooldownMs) {
    return true;
  }
  submissionTracker.set(formKey, now);
  return false;
}

/**
 * Safe Logger wrapper to ensure debug details are stripped in production environments
 */
export function safeLog(message: string, ...args: unknown[]): void {
  if (import.meta.env.DEV) {
    console.log(`[SKV-Security] ${message}`, ...args);
  }
}

export function safeError(message: string, error?: unknown): void {
  if (import.meta.env.DEV) {
    console.error(`[SKV-Security-Error] ${message}`, error);
  }
}
