import { isAdmin, json, methodNotAllowed, supabase } from './_lib';

export default async function handler(req: any, res: any) {
  try {
    if (req.method === 'GET') {
      const response = await supabase('site_settings?id=eq.site-data&select=data');
      if (!response.ok) throw new Error('Could not load site settings');
      const rows = await response.json();
      return json(res, 200, { data: rows[0]?.data ?? null });
    }
    if (req.method !== 'PUT') return methodNotAllowed(res);
    if (!isAdmin(req)) return json(res, 401, { error: 'Admin authentication required' });
    if (!req.body || typeof req.body !== 'object' || JSON.stringify(req.body).length > 1_000_000) {
      return json(res, 400, { error: 'Invalid site data' });
    }
    const response = await supabase('site_settings?on_conflict=id', {
      method: 'POST',
      headers: { Prefer: 'resolution=merge-duplicates,return=minimal' },
      body: JSON.stringify({ id: 'site-data', data: req.body, updated_at: new Date().toISOString() }),
    });
    if (!response.ok) throw new Error('Could not save site settings');
    return json(res, 200, { ok: true });
  } catch {
    return json(res, 503, { error: 'Cloud database is unavailable' });
  }
}
