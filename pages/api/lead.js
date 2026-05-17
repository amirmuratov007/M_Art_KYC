import { getSupabaseAdmin } from '@/lib/supabaseAdmin';

const allowedTypes = new Set([
  'counterparty',
  'employee',
  'due_diligence',
  'aml_kyc',
  'foreign_company',
  'risk_intelligence',
  'background_screening',
  'executive_screening',
  'consultation',
]);

function clean(value, max = 2000) {
  return String(value || '').trim().slice(0, max);
}

function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

async function notifyTelegram(lead) {
  const token = process.env.TG_TOKEN;
  const chatId = process.env.TG_CHAT_ID;
  if (!token || !chatId) return;

  const text = [
    '🛡️ Новая заявка M_Art_KYC',
    `Имя: ${lead.name}`,
    `Компания: ${lead.company || '—'}`,
    `Email: ${lead.email}`,
    `Телефон: ${lead.phone || '—'}`,
    `Тип проверки: ${lead.check_type || '—'}`,
    `Язык: ${lead.locale}`,
    `Комментарий: ${lead.comment || '—'}`,
  ].join('\n');

  const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text, disable_web_page_preview: true }),
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(`Telegram notification failed: ${details}`);
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  try {
    const lead = {
      name: clean(req.body.name, 120),
      company: clean(req.body.company, 160),
      email: clean(req.body.email, 160).toLowerCase(),
      phone: clean(req.body.phone, 80),
      check_type: clean(req.body.checkType, 80),
      comment: clean(req.body.comment, 2000),
      locale: clean(req.body.locale, 8) || 'ru',
      source: 'website',
    };

    if (!lead.name || !isEmail(lead.email)) {
      return res.status(400).json({ ok: false, error: 'Name and valid email are required' });
    }

    if (lead.check_type && !allowedTypes.has(lead.check_type)) {
      return res.status(400).json({ ok: false, error: 'Invalid check type' });
    }

    const supabase = getSupabaseAdmin();
    const { error } = await supabase.from('leads').insert(lead);
    if (error) throw error;

    await notifyTelegram(lead);
    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ ok: false, error: 'Lead submission failed' });
  }
}
