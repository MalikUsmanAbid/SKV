import { createHmac, timingSafeEqual } from 'node:crypto';

type RequestLike = { method?: string; headers: Record<string, string | string[] | undefined>; body?: unknown };
type ResponseLike = {
  status: (statusCode: number) => ResponseLike;
  json: (body: unknown) => void;
  setHeader: (name: string, value: string) => void;
};

const COOKIE_NAME = 'skv_admin_session';
const SESSION_TTL_SECONDS = 60 * 60 * 8;

function requiredEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`${name} is not configured`);
  return value;
}

function base64url(value: string): string {
  return Buffer.from(value).toString('base64url');
}

function sign(value: string): string {
  return createHmac('sha256', requiredEnv('ADMIN_SESSION_SECRET')).update(value).digest('base64url');
}

export function json(res: ResponseLike, status: number, body: unknown): void {
  res.status(status).json(body);
}

export function methodNotAllowed(res: ResponseLike): void {
  json(res, 405, { error: 'Method not allowed' });
}

export function createSession(res: ResponseLike): void {
  const payload = base64url(JSON.stringify({ exp: Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS }));
  const token = `${payload}.${sign(payload)}`;
  res.setHeader('Set-Cookie', `${COOKIE_NAME}=${token}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${SESSION_TTL_SECONDS}`);
}

export function clearSession(res: ResponseLike): void {
  res.setHeader('Set-Cookie', `${COOKIE_NAME}=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0`);
}

export function isAdmin(req: RequestLike): boolean {
  const cookie = typeof req.headers.cookie === 'string' ? req.headers.cookie : '';
  const token = cookie.split('; ').find((part) => part.startsWith(`${COOKIE_NAME}=`))?.slice(COOKIE_NAME.length + 1);
  if (!token) return false;
  const [payload, signature] = token.split('.');
  if (!payload || !signature) return false;
  const expected = sign(payload);
  if (signature.length !== expected.length || !timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) return false;
  try {
    return JSON.parse(Buffer.from(payload, 'base64url').toString()).exp > Math.floor(Date.now() / 1000);
  } catch {
    return false;
  }
}

export function validAdminPassword(password: unknown): boolean {
  if (typeof password !== 'string') return false;
  const expected = requiredEnv('ADMIN_PASSWORD');
  return password.length === expected.length && timingSafeEqual(Buffer.from(password), Buffer.from(expected));
}

export function cleanText(value: unknown, maxLength: number): string {
  return typeof value === 'string' ? value.trim().replace(/[<>]/g, '').slice(0, maxLength) : '';
}

export async function supabase(path: string, init: RequestInit = {}): Promise<Response> {
  const url = requiredEnv('SUPABASE_URL').replace(/\/$/, '');
  const key = requiredEnv('SUPABASE_SERVICE_ROLE_KEY');
  return fetch(`${url}/rest/v1/${path}`, {
    ...init,
    headers: { apikey: key, Authorization: `Bearer ${key}`, 'Content-Type': 'application/json', ...(init.headers || {}) },
  });
}
