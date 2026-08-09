import { createSession, json, methodNotAllowed, validAdminPassword } from '../_lib';

export default function handler(req: any, res: any) {
  if (req.method !== 'POST') return methodNotAllowed(res);
  try {
    if (!validAdminPassword(req.body?.password)) return json(res, 401, { error: 'Invalid passcode' });
    createSession(res);
    return json(res, 200, { ok: true });
  } catch {
    return json(res, 503, { error: 'Admin login is not configured' });
  }
}
