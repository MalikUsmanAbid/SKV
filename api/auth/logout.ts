import { clearSession, json, methodNotAllowed } from '../_lib';

export default function handler(req: any, res: any) {
  if (req.method !== 'POST') return methodNotAllowed(res);
  clearSession(res);
  return json(res, 200, { ok: true });
}
