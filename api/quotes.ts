import { cleanText, json, methodNotAllowed, supabase } from './_lib';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') return methodNotAllowed(res);
  const body = req.body || {};
  const email = cleanText(body.email, 100).toLowerCase();
  const quote = {
    full_name: cleanText(body.fullName, 100), email, phone: cleanText(body.phone, 30),
    company_name: cleanText(body.companyName, 120), project_type: cleanText(body.projectType, 80),
    project_location: cleanText(body.projectLocation, 150), estimated_budget: cleanText(body.estimatedBudget, 50),
    target_timeline: cleanText(body.targetTimeline, 50), project_scope_details: cleanText(body.projectScopeDetails, 2000),
    attachment_name: cleanText(body.attachmentName, 80), has_architectural_plans: Boolean(body.hasArchitecturalPlans),
  };
  if (quote.full_name.length < 2 || !/^\S+@\S+\.\S+$/.test(email) || quote.phone.length < 5 || !quote.project_location) {
    return json(res, 400, { error: 'Please provide valid contact and project details' });
  }
  try {
    const response = await supabase('quote_requests', { method: 'POST', headers: { Prefer: 'return=representation' }, body: JSON.stringify(quote) });
    if (!response.ok) throw new Error('Could not save quote');
    const [saved] = await response.json();
    return json(res, 201, { reference: `SKV-${String(saved.id).slice(0, 8).toUpperCase()}` });
  } catch {
    return json(res, 503, { error: 'Unable to submit your request. Please try again shortly.' });
  }
}
